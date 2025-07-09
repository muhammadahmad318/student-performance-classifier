# Student Performance Classifier

A machine learning web application that predicts student performance based on various academic and demographic factors.

## Features

- **Machine Learning Models**: Multiple algorithms including Logistic Regression and Random Forest
- **Web Interface**: Modern Next.js frontend with intuitive form inputs
- **Real-time Predictions**: Instant performance predictions via API
- **Model Visualization**: Learning curves, ROC curves, and feature importance charts
- **Scalable Architecture**: Separate backend API and frontend components

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern styling
- **React Hook Form** - Form handling and validation

### Backend
- **FastAPI** - High-performance Python web framework
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation
- **Joblib** - Model serialization

## Project Structure

```
StudentPerformanceClassifier/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   └── train_model.py  # Model training script
│   ├── models/             # Trained models and visualizations
│   └── requirements.txt    # Python dependencies
├── src/                    # Next.js frontend
│   ├── app/               # App Router pages
│   ├── components/        # React components
│   └── types/            # TypeScript type definitions
└── student+performance/   # Dataset files
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StudentPerformanceClassifier
   ```

2. **Setup Backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Setup Frontend**
   ```bash
   cd ..
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   python -m uvicorn app.main:app --reload --port 8000
   ```

2. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `POST /predict` - Predict student performance
- `GET /models` - Get available model information
- `GET /health` - Health check endpoint

## Model Training

The machine learning models are trained on student performance data with features including:
- Academic background
- Study time
- Previous failures
- Family support
- And more...

To retrain the models:
```bash
cd backend
python app/train_model.py
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Dataset: Student Performance Dataset
- Icons: Various open-source icon libraries
- UI Components: Built with modern React patterns
