import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';

import { assessmentService } from '../../services/assessmentService';

export default function AddAssessment() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    questions: 10,
    timeLimit: 60,
    totalPoints: 100,
    dueDate: ''
  });

  const subjects = ['Mathematics', 'Science', 'English', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography'];

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await assessmentService.createAssessment(formData);
      console.log('Assessment created:', result);
      alert('Assessment created successfully!');
      navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Error creating assessment:', error);
      alert('Failed to create assessment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Add Assessment</h1>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card title="Create New Assessment">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assessment Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Module 1 Quiz"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Assessment description and instructions"
              />
            </div>

            {/* Grid: Questions, Time Limit, Total Points */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Questions *
                </label>
                <input
                  type="number"
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                  min="1"
                  max="200"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Limit (minutes) *
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  value={formData.timeLimit}
                  onChange={handleChange}
                  min="5"
                  max="480"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Points *
                </label>
                <input
                  type="number"
                  name="totalPoints"
                  value={formData.totalPoints}
                  onChange={handleChange}
                  min="10"
                  max="1000"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Form Summary */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Assessment Summary</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Title:</strong> {formData.title || 'Not set'}</li>
                <li>• <strong>Subject:</strong> {formData.subject || 'Not set'}</li>
                <li>• <strong>Questions:</strong> {formData.questions}</li>
                <li>• <strong>Time Limit:</strong> {formData.timeLimit} minutes</li>
                <li>• <strong>Total Points:</strong> {formData.totalPoints}</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-medium"
              >
                {loading ? 'Creating...' : 'Create Assessment'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/teacher/dashboard')}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
