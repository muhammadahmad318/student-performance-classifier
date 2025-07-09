import { NextResponse } from 'next/server';
import type { StudentInput, PredictionResult } from '@/types/student';

const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

export async function POST(request: Request) {
  try {
    const data: StudentInput = await request.json();

    const response = await fetch(`${BACKEND_URL}/predict`, {
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
    
    // Transform the backend response to match our frontend PredictionResult type
    const predictionResult: PredictionResult = {
      prediction: result.prediction,
      probabilities: result.probabilities
    };

    return NextResponse.json(predictionResult);
  } catch (err) {
    console.error('Prediction error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to process prediction' },
      { status: 500 }
    );
  }
} 