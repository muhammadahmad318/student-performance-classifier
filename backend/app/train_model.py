import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
from pathlib import Path
import os
from ucimlrepo import fetch_ucirepo

# Create models directory if it doesn't exist
MODEL_PATH = Path(__file__).parent / "models"
MODEL_PATH.mkdir(exist_ok=True)

def load_data():
    """
    Load and preprocess the student performance dataset from UCI.
    """
    print("Fetching dataset from UCI...")
    student_performance = fetch_ucirepo(id=320)
    
    # Get features and target
    X = student_performance.data.features
    y = student_performance.data.targets
    
    # Print dataset information
    print("\nDataset Information:")
    print(student_performance.metadata)
    print("\nVariable Information:")
    print(student_performance.variables)
    
    # Combine features and target
    df = pd.concat([X, y], axis=1)
    
    # Rename columns to match our API
    column_mapping = {
        'studytime': 'study_time',
        'failures': 'failures',
        'absences': 'absences',
        'Medu': 'parent_education',  # Mother's education
        'internet': 'internet_access',
        'famsup': 'family_support',
        'activities': 'extra_curricular',
        'G3': 'grade'  # Final grade
    }
    
    # Select and rename columns
    df = df[list(column_mapping.keys())].rename(columns=column_mapping)
    
    # Convert parent education to categorical
    education_mapping = {
        0: 'none',
        1: 'primary',
        2: 'secondary',
        3: 'higher',
        4: 'higher'  # Some datasets have 4 levels
    }
    df['parent_education'] = df['parent_education'].map(education_mapping)
    
    # Convert boolean columns
    boolean_columns = ['internet_access', 'family_support', 'extra_curricular']
    for col in boolean_columns:
        df[col] = df[col].map({'yes': True, 'no': False})
    
    # Convert final grade to letter grades
    def grade_to_letter(grade):
        if grade >= 17:  # 17-20
            return 'A'
        elif grade >= 14:  # 14-16
            return 'B'
        elif grade >= 11:  # 11-13
            return 'C'
        elif grade >= 8:   # 8-10
            return 'D'
        else:             # 0-7
            return 'F'
    
    df['grade'] = df['grade'].apply(grade_to_letter)
    
    print("\nDataset shape:", df.shape)
    print("\nGrade distribution:")
    print(df['grade'].value_counts(normalize=True).sort_index())
    
    return df

def preprocess_data(df):
    """Preprocess the data for model training."""
    # Separate features and target
    X = df.drop('grade', axis=1)
    y = df['grade']
    
    # Encode categorical variables
    encoders = {}
    categorical_cols = ['parent_education']
    for col in categorical_cols:
        encoders[col] = LabelEncoder()
        X[col] = encoders[col].fit_transform(X[col])
    
    # Convert boolean columns to int
    boolean_cols = ['internet_access', 'family_support', 'extra_curricular']
    for col in boolean_cols:
        X[col] = X[col].astype(int)
    
    # Scale numerical features
    scaler = StandardScaler()
    numerical_cols = ['study_time', 'failures', 'absences']
    X[numerical_cols] = scaler.fit_transform(X[numerical_cols])
    encoders['scaler'] = scaler
    
    return X, y, encoders

def train_model(X, y):
    """Train the Random Forest model."""
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Train the model with optimized parameters
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        class_weight='balanced'
    )
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\nModel Accuracy: {accuracy:.2f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Print confusion matrix
    print("\nConfusion Matrix:")
    cm = confusion_matrix(y_test, y_pred, labels=['A', 'B', 'C', 'D', 'F'])
    cm_df = pd.DataFrame(cm, 
                        index=['True A', 'True B', 'True C', 'True D', 'True F'],
                        columns=['Pred A', 'Pred B', 'Pred C', 'Pred D', 'Pred F'])
    print(cm_df)
    
    # Feature importance
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nFeature Importance:")
    print(feature_importance)
    
    return model

def save_model_and_encoders(model, encoders):
    """Save the trained model and encoders."""
    joblib.dump(model, MODEL_PATH / "model.joblib")
    joblib.dump(encoders, MODEL_PATH / "encoders.joblib")
    print("\nModel and encoders saved successfully!")

def main():
    # Load and preprocess data
    print("Loading and preprocessing data...")
    df = load_data()
    X, y, encoders = preprocess_data(df)
    
    # Train model
    print("\nTraining model...")
    model = train_model(X, y)
    
    # Save model and encoders
    print("\nSaving model and encoders...")
    save_model_and_encoders(model, encoders)

if __name__ == "__main__":
    main() 