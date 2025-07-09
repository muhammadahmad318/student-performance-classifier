import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib
import os

def load_and_preprocess_data():
    # Load both datasets
    math_data = pd.read_csv('../student+performance/student/student-mat.csv', sep=';')
    por_data = pd.read_csv('../student+performance/student/student-por.csv', sep=';')
    
    # Combine both datasets for better training
    X = pd.concat([math_data, por_data], ignore_index=True)
    
    # Drop duplicates if any
    X = X.drop_duplicates()
    
    # Convert target to grade categories (A/B/C/Fail)
    # Using G3 (final grade) as our target
    def grade_to_category(grade):
        if grade >= 15:  # A grade
            return 'A'
        elif grade >= 12:  # B grade
            return 'B'
        elif grade >= 10:  # C grade
            return 'C'
        else:  # Fail
            return 'F'
    
    y = X['G3'].apply(grade_to_category)
    
    # Drop the target columns (G1, G2, G3) from features
    X = X.drop(['G1', 'G2', 'G3'], axis=1)
    
    # Handle categorical variables
    categorical_cols = ['school', 'sex', 'address', 'famsize', 'Pstatus', 'Mjob', 'Fjob', 
                       'reason', 'guardian', 'schoolsup', 'famsup', 'paid', 'activities', 
                       'nursery', 'higher', 'internet', 'romantic']
    
    # One-hot encode categorical variables
    X = pd.get_dummies(X, columns=categorical_cols)
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale numerical features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    return X_train_scaled, X_test_scaled, y_train, y_test, scaler, X.columns

def train_model(X_train, y_train):
    # Initialize and train the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test, y_test):
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate metrics
    metrics = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred, average='weighted'),
        'recall': recall_score(y_test, y_pred, average='weighted'),
        'f1': f1_score(y_test, y_pred, average='weighted')
    }
    
    return metrics

def save_model_and_scaler(model, scaler, feature_names):
    # Create models directory if it doesn't exist
    os.makedirs('models', exist_ok=True)
    
    # Save the model and scaler
    joblib.dump(model, 'models/student_performance_model.joblib')
    joblib.dump(scaler, 'models/scaler.joblib')
    joblib.dump(feature_names, 'models/feature_names.joblib')

if __name__ == "__main__":
    # Load and preprocess data
    print("Loading and preprocessing data...")
    X_train, X_test, y_train, y_test, scaler, feature_names = load_and_preprocess_data()
    
    # Train model
    print("Training model...")
    model = train_model(X_train, y_train)
    
    # Evaluate model
    print("Evaluating model...")
    metrics = evaluate_model(model, X_test, y_test)
    print("\nModel Performance Metrics:")
    for metric, value in metrics.items():
        print(f"{metric.capitalize()}: {value:.4f}")
    
    # Save model and scaler
    print("\nSaving model and scaler...")
    save_model_and_scaler(model, scaler, feature_names)
    print("Model training complete!") 