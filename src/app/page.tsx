'use client';

import { useState } from 'react';
import StudentForm from '@/components/StudentForm';
import type { StudentInput, PredictionResult } from '@/types/student';

export default function Home() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: StudentInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get prediction');
      }

      const result = await response.json();
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 text-primary-800">
            Student Performance Classifier
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Predict student performance using advanced machine learning algorithms
          </p>
        </header>

        <div className="space-y-8">
          {/* Form Section - Full Width */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl animate-slide-up">
            <h2 className="text-2xl font-semibold text-black mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Enter Student Information
            </h2>
            
            <StudentForm onSubmit={handleSubmit} isLoading={isLoading} />

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 animate-slide-down">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
          </div>

          {/* Results Section - Full Width */}
          {prediction && (
            <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl animate-slide-up">
              <h3 className="text-2xl font-semibold text-primary-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Prediction Results
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-primary-50 rounded-xl p-6 text-center">
                  <div className="text-sm text-primary-600 mb-2">Predicted Grade</div>
                  <div className="text-4xl font-bold text-primary-700">{prediction.prediction}</div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-4">Grade Probabilities</h4>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(prediction.probabilities).map(([grade, prob]) => (
                      <div
                        key={grade}
                        className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg p-3 text-center transform transition-transform hover:scale-105"
                      >
                        <div className="text-lg font-semibold text-primary-700">{grade}</div>
                        <div className="text-sm text-gray-600">
                          {(prob * 100).toFixed(1)}%
                        </div>
                        <div 
                          className="h-1 mt-2 bg-primary-200 rounded-full overflow-hidden"
                          style={{ width: '100%' }}
                        >
                          <div
                            className="h-full bg-primary-500 rounded-full transition-all duration-500"
                            style={{ width: `${prob * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!prediction && !isLoading && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-fade-in">
              <div className="text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Prediction Yet</h3>
              <p className="text-gray-500">
                Fill out the form to get a prediction of the student&apos;s performance
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
