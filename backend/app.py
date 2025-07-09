from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# Load the model, scaler, and feature names
model_path = os.path.join(os.path.dirname(__file__), 'models', 'student_performance_model.joblib')
scaler_path = os.path.join(os.path.dirname(__file__), 'models', 'scaler.joblib')
feature_names_path = os.path.join(os.path.dirname(__file__), 'models', 'feature_names.joblib')

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)
feature_names = joblib.load(feature_names_path)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data
        data = request.get_json()
        
        # Convert input data to DataFrame
        input_df = pd.DataFrame([data])
        
        # One-hot encode categorical variables
        input_df = pd.get_dummies(input_df)
        
        # Ensure all features from training are present
        for feature in feature_names:
            if feature not in input_df.columns:
                input_df[feature] = 0
        
        # Reorder columns to match training data
        input_df = input_df[feature_names]
        
        # Scale the input
        input_scaled = scaler.transform(input_df)
        
        # Make prediction
        prediction = model.predict(input_scaled)[0]
        probabilities = model.predict_proba(input_scaled)[0]
        
        # Create response
        response = {
            'prediction': prediction,
            'probabilities': {
                'A': float(probabilities[0]),
                'B': float(probabilities[1]),
                'C': float(probabilities[2]),
                'F': float(probabilities[3])
            }
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/features', methods=['GET'])
def get_features():
    # Return the list of required features and their types
    feature_info = {
        'numerical_features': [
            'age', 'Medu', 'Fedu', 'traveltime', 'studytime', 'failures',
            'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 'absences'
        ],
        'categorical_features': {
            'school': ['GP', 'MS'],
            'sex': ['F', 'M'],
            'address': ['U', 'R'],
            'famsize': ['LE3', 'GT3'],
            'Pstatus': ['T', 'A'],
            'Mjob': ['teacher', 'health', 'services', 'at_home', 'other'],
            'Fjob': ['teacher', 'health', 'services', 'at_home', 'other'],
            'reason': ['home', 'reputation', 'course', 'other'],
            'guardian': ['mother', 'father', 'other'],
            'schoolsup': ['yes', 'no'],
            'famsup': ['yes', 'no'],
            'paid': ['yes', 'no'],
            'activities': ['yes', 'no'],
            'nursery': ['yes', 'no'],
            'higher': ['yes', 'no'],
            'internet': ['yes', 'no'],
            'romantic': ['yes', 'no']
        }
    }
    return jsonify(feature_info)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 