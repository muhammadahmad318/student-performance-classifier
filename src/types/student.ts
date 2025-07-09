export interface StudentInput {
  age: number;             // Student's age (15-22)
  Medu: number;            // Mother's education (0-4)
  Fedu: number;            // Father's education (0-4)
  traveltime: number;      // Travel time to school (1-4)
  studytime: number;       // Study time (1-4)
  failures: number;        // Number of past failures
  famrel: number;          // Family relationship quality (1-5)
  freetime: number;        // Free time after school (1-5)
  goout: number;           // Going out with friends (1-5)
  Dalc: number;            // Workday alcohol consumption (1-5)
  Walc: number;            // Weekend alcohol consumption (1-5)
  health: number;          // Current health status (1-5)
  absences: number;        // Number of school absences
  school: 'GP' | 'MS';     // School name
  sex: 'F' | 'M';          // Student's sex
  address: 'U' | 'R';      // Home address type
  famsize: 'LE3' | 'GT3';  // Family size
  Pstatus: 'T' | 'A';      // Parent's cohabitation status
  Mjob: 'teacher' | 'health' | 'services' | 'at_home' | 'other';  // Mother's job
  Fjob: 'teacher' | 'health' | 'services' | 'at_home' | 'other';  // Father's job
  reason: 'home' | 'reputation' | 'course' | 'other';  // Reason to choose school
  guardian: 'mother' | 'father' | 'other';  // Student's guardian
  schoolsup: 'yes' | 'no';  // Extra educational support
  famsup: 'yes' | 'no';     // Family educational support
  paid: 'yes' | 'no';       // Extra paid classes
  activities: 'yes' | 'no'; // Extra-curricular activities
  nursery: 'yes' | 'no';    // Attended nursery school
  higher: 'yes' | 'no';     // Wants to take higher education
  internet: 'yes' | 'no';   // Internet access at home
  romantic: 'yes' | 'no';   // With a romantic relationship
}

export interface PredictionResult {
  prediction: string;      // Predicted grade (A/B/C/F)
  probabilities: {         // Probabilities for each grade
    A: number;
    B: number;
    C: number;
    F: number;
  };
}

export type Grade = 'A' | 'B' | 'C' | 'F'; 