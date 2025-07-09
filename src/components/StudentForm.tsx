'use client';

import { useState } from 'react';
import type { StudentInput } from '@/types/student';

interface StudentFormProps {
  onSubmit: (data: StudentInput) => void;
  isLoading?: boolean;
}

export default function StudentForm({ onSubmit, isLoading = false }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentInput>({
    age: 16,
    Medu: 2,
    Fedu: 2,
    traveltime: 1,
    studytime: 2,
    failures: 0,
    famrel: 4,
    freetime: 3,
    goout: 2,
    Dalc: 1,
    Walc: 1,
    health: 5,
    absences: 0,
    school: 'GP',
    sex: 'F',
    address: 'U',
    famsize: 'GT3',
    Pstatus: 'T',
    Mjob: 'other',
    Fjob: 'other',
    reason: 'course',
    guardian: 'mother',
    schoolsup: 'no',
    famsup: 'yes',
    paid: 'no',
    activities: 'yes',
    nursery: 'yes',
    higher: 'yes',
    internet: 'yes',
    romantic: 'no'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="15"
              max="22"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            />
          </div>

          <div className="group">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">
              Sex
            </label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="school" className="block text-sm font-medium text-gray-700">
              School
            </label>
            <select
              id="school"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="GP">Gabriel Pereira</option>
              <option value="MS">Mousinho da Silveira</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address Type
            </label>
            <select
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="U">Urban</option>
              <option value="R">Rural</option>
            </select>
          </div>
        </div>
      </div>

      {/* Family Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Family Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="Medu" className="block text-sm font-medium text-gray-700">
              Mother&apos;s Education
            </label>
            <select
              id="Medu"
              name="Medu"
              value={formData.Medu}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="0">None</option>
              <option value="1">Primary (4th grade)</option>
              <option value="2">5th to 9th grade</option>
              <option value="3">Secondary</option>
              <option value="4">Higher</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="Fedu" className="block text-sm font-medium text-gray-700">
              Father&apos;s Education
            </label>
            <select
              id="Fedu"
              name="Fedu"
              value={formData.Fedu}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="0">None</option>
              <option value="1">Primary (4th grade)</option>
              <option value="2">5th to 9th grade</option>
              <option value="3">Secondary</option>
              <option value="4">Higher</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="Mjob" className="block text-sm font-medium text-gray-700">
              Mother&apos;s Job
            </label>
            <select
              id="Mjob"
              name="Mjob"
              value={formData.Mjob}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="teacher">Teacher</option>
              <option value="health">Health</option>
              <option value="services">Services</option>
              <option value="at_home">At Home</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="Fjob" className="block text-sm font-medium text-gray-700">
              Father&apos;s Job
            </label>
            <select
              id="Fjob"
              name="Fjob"
              value={formData.Fjob}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="teacher">Teacher</option>
              <option value="health">Health</option>
              <option value="services">Services</option>
              <option value="at_home">At Home</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="famsize" className="block text-sm font-medium text-gray-700">
              Family Size
            </label>
            <select
              id="famsize"
              name="famsize"
              value={formData.famsize}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="LE3">Less or equal to 3</option>
              <option value="GT3">Greater than 3</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="Pstatus" className="block text-sm font-medium text-gray-700">
              Parent&apos;s Cohabitation
            </label>
            <select
              id="Pstatus"
              name="Pstatus"
              value={formData.Pstatus}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="T">Living Together</option>
              <option value="A">Apart</option>
            </select>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Academic Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="studytime" className="block text-sm font-medium text-gray-700">
              Study Time
            </label>
            <select
              id="studytime"
              name="studytime"
              value={formData.studytime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Less than 2 hours</option>
              <option value="2">2 to 5 hours</option>
              <option value="3">5 to 10 hours</option>
              <option value="4">More than 10 hours</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="failures" className="block text-sm font-medium text-gray-700">
              Past Failures
            </label>
            <input
              type="number"
              id="failures"
              name="failures"
              min="0"
              max="4"
              value={formData.failures}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="absences" className="block text-sm font-medium text-gray-700">
              School Absences
            </label>
            <input
              type="number"
              id="absences"
              name="absences"
              min="0"
              max="93"
              value={formData.absences}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            />
          </div>

          <div className="group">
            <label htmlFor="traveltime" className="block text-sm font-medium text-gray-700">
              Travel Time
            </label>
            <select
              id="traveltime"
              name="traveltime"
              value={formData.traveltime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Less than 15 min</option>
              <option value="2">15 to 30 min</option>
              <option value="3">30 min to 1 hour</option>
              <option value="4">More than 1 hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lifestyle Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Lifestyle Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="famrel" className="block text-sm font-medium text-gray-700">
              Family Relationship
            </label>
            <select
              id="famrel"
              name="famrel"
              value={formData.famrel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Very Bad</option>
              <option value="2">Bad</option>
              <option value="3">Average</option>
              <option value="4">Good</option>
              <option value="5">Excellent</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="freetime" className="block text-sm font-medium text-gray-700">
              Free Time
            </label>
            <select
              id="freetime"
              name="freetime"
              value={formData.freetime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Very Low</option>
              <option value="2">Low</option>
              <option value="3">Average</option>
              <option value="4">High</option>
              <option value="5">Very High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="goout" className="block text-sm font-medium text-gray-700">
              Going Out
            </label>
            <select
              id="goout"
              name="goout"
              value={formData.goout}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Very Low</option>
              <option value="2">Low</option>
              <option value="3">Average</option>
              <option value="4">High</option>
              <option value="5">Very High</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="health" className="block text-sm font-medium text-gray-700">
              Health Status
            </label>
            <select
              id="health"
              name="health"
              value={formData.health}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Very Bad</option>
              <option value="2">Bad</option>
              <option value="3">Average</option>
              <option value="4">Good</option>
              <option value="5">Excellent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="Dalc" className="block text-sm font-medium text-gray-700">
              Workday Alcohol
            </label>
            <select
              id="Dalc"
              name="Dalc"
              value={formData.Dalc}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Very Low</option>
              <option value="2">Low</option>
              <option value="3">Average</option>
              <option value="4">High</option>
              <option value="5">Very High</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="Walc" className="block text-sm font-medium text-gray-700">
              Weekend Alcohol
            </label>
            <select
              id="Walc"
              name="Walc"
              value={formData.Walc}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="1">Very Low</option>
              <option value="2">Low</option>
              <option value="3">Average</option>
              <option value="4">High</option>
              <option value="5">Very High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for School Choice
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="home">Close to Home</option>
              <option value="reputation">School Reputation</option>
              <option value="course">Course Preference</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="guardian" className="block text-sm font-medium text-gray-700">
              Guardian
            </label>
            <select
              id="guardian"
              name="guardian"
              value={formData.guardian}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="mother">Mother</option>
              <option value="father">Father</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="schoolsup" className="block text-sm font-medium text-gray-700">
              School Support
            </label>
            <select
              id="schoolsup"
              name="schoolsup"
              value={formData.schoolsup}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="famsup" className="block text-sm font-medium text-gray-700">
              Family Support
            </label>
            <select
              id="famsup"
              name="famsup"
              value={formData.famsup}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="paid" className="block text-sm font-medium text-gray-700">
              Extra Paid Classes
            </label>
            <select
              id="paid"
              name="paid"
              value={formData.paid}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="activities" className="block text-sm font-medium text-gray-700">
              Extra-curricular Activities
            </label>
            <select
              id="activities"
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="nursery" className="block text-sm font-medium text-gray-700">
              Attended Nursery School
            </label>
            <select
              id="nursery"
              name="nursery"
              value={formData.nursery}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="higher" className="block text-sm font-medium text-gray-700">
              Wants Higher Education
            </label>
            <select
              id="higher"
              name="higher"
              value={formData.higher}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label htmlFor="internet" className="block text-sm font-medium text-gray-700">
              Internet Access
            </label>
            <select
              id="internet"
              name="internet"
              value={formData.internet}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="group">
            <label htmlFor="romantic" className="block text-sm font-medium text-gray-700">
              Romantic Relationship
            </label>
            <select
              id="romantic"
              name="romantic"
              value={formData.romantic}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-gray-400 focus:border-primary-500 focus:ring-primary-500 text-black"
              required
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded-lg bg-gradient-to-r from-primary-700 to-primary-800 px-4 py-3 text-white font-medium shadow-sm hover:from-primary-800 hover:to-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform transition-all duration-200 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Predicting...
            </span>
          ) : (
            'Predict Performance'
          )}
        </button>
      </div>
    </form>
  );
} 