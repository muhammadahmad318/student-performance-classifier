# Student Performance Classifier Backend

This is the backend service for the Student Performance Classifier application. It provides a FastAPI-based API for making predictions using a trained machine learning model.

## Setup

1. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Train the model (first time only):
```bash
python app/train_model.py
```

2. Start the API server:
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access:
- Interactive API docs: http://localhost:8000/docs
- Alternative API docs: http://localhost:8000/redoc

## API Endpoints

### POST /api/predict
Predicts a student's performance based on input data.

Request body:
```json
{
    "study_time": 2.0,
    "failures": 0,
    "absences": 0,
    "parent_education": "secondary",
    "internet_access": true,
    "family_support": true,
    "extra_curricular": false
}
```

Response:
```json
{
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
```

## Development

- The model training script (`train_model.py`) currently uses dummy data. Replace the `load_data()` function with actual data loading from the UCI dataset.
- Model parameters can be adjusted in the `train_model()` function.
- The API endpoint in `main.py` needs to be updated to use the actual model once trained. 