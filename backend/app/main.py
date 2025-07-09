from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import joblib
import numpy as np
from typing import Dict, List
import os
from pathlib import Path
import pandas as pd

app = FastAPI(title="Student Performance Classifier API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input data model with validation
class StudentInput(BaseModel):
    study_time: float = Field(..., ge=0, le=24, description="Study time in hours per day")
    failures: int = Field(..., ge=0, le=4, description="Number of past failures")
    absences: int = Field(..., ge=0, le=93, description="Number of school absences")
    parent_education: str = Field(..., description="Parent's education level", 
                                pattern="^(none|primary|secondary|higher)$")
    internet_access: bool = Field(..., description="Whether the student has internet access")
    family_support: bool = Field(..., description="Whether the student has family support")
    extra_curricular: bool = Field(..., description="Whether the student participates in extra-curricular activities")

# Define the prediction response model
class PredictionResult(BaseModel):
    grade: str
    confidence: float
    probabilities: Dict[str, float]

# Load the model and encoders
MODEL_PATH = Path(__file__).parent / "models"
model = None
encoders = {}

@app.on_event("startup")
async def load_model():
    global model, encoders
    try:
        model = joblib.load(MODEL_PATH / "model.joblib")
        encoders = joblib.load(MODEL_PATH / "encoders.joblib")
        print("Model and encoders loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")
        # For development, we'll use a dummy model
        model = "dummy"

@app.get("/")
async def root():
    return {
        "message": "Student Performance Classifier API",
        "status": "Model loaded" if model != "dummy" else "Using dummy model"
    }

@app.post("/api/predict", response_model=PredictionResult)
async def predict(student_data: StudentInput):
    if model == "dummy":
        # Dummy prediction for development
        return {
            "grade": "B",
            "confidence": 0.85,
            "probabilities": {
                "A": 0.15,
                "B": 0.45,
                "C": 0.25,
                "D": 0.10,
                "F": 0.05
            }
        }
    
    try:
        # Convert input to DataFrame
        input_data = pd.DataFrame([student_data.dict()])
        
        # Preprocess the input data
        # Encode categorical variables
        input_data['parent_education'] = encoders['parent_education'].transform(input_data['parent_education'])
        
        # Convert boolean columns to int
        boolean_cols = ['internet_access', 'family_support', 'extra_curricular']
        for col in boolean_cols:
            input_data[col] = input_data[col].astype(int)
        
        # Scale numerical features
        numerical_cols = ['study_time', 'failures', 'absences']
        input_data[numerical_cols] = encoders['scaler'].transform(input_data[numerical_cols])
        
        # Make prediction
        probabilities = model.predict_proba(input_data)[0]
        predicted_class = model.classes_[np.argmax(probabilities)]
        confidence = np.max(probabilities)
        
        # Convert probabilities to dictionary
        prob_dict = dict(zip(model.classes_, probabilities))
        
        return {
            "grade": predicted_class,
            "confidence": float(confidence),
            "probabilities": {k: float(v) for k, v in prob_dict.items()}
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 