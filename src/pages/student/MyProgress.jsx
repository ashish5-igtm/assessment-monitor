import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';

import PieChart from '../../components/charts/PieChart';
import { assessmentService } from '../../services/assessmentService';
import { formatDate, calculatePercentage } from '../../utils/helpers';

export default function MyProgress() {
  const [assessments, setAssessments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assesData, analyticsData] = await Promise.all([
          assessmentService.getStudentAssessments('student-1'),
          assessmentService.getPerformanceAnalytics('student-1')
        ]);
        setAssessments(assesData);
        setAnalytics(analyticsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAssessments = assessments.filter(a => 
    selectedFilter === 'all' || a.status === selectedFilter
  );

  const statusData = [
    { label: 'Completed', value: assessments.filter(a => a.status === 'completed').length },
    { label: 'Pending', value: assessments.filter(a => a.status === 'pending').length },
    { label: 'Failed', value: assessments.filter(a => a.status === 'failed').length }
  ].filter(d => d.value > 0);

  const subjectData = assessments.reduce((acc, a) => {
    const existing = acc.find(x => x.label === a.subject);
    if (existing) {
      existing.scores.push(a.score);
    } else {
      acc.push({ label: a.subject, scores: [a.score] });
    }
    return acc;
  }, []).map(x => ({
    label: x.label,
    value: Math.round(x.scores.reduce((a, b) => a + b) / x.scores.length)
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Navigation */}
        <div className="mb-6 flex gap-3">
          <Link
            to="/student/dashboard"
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/student/progress"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            My Progress
          </Link>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card title="Assessment Status">
            {statusData.length > 0 ? (
              <PieChart data={statusData} />
            ) : (
              <p className="text-center text-gray-500">No assessment data</p>
            )}
          </Card>

          <Card title="Subject Performance">
            {subjectData.length > 0 ? (
              <div className="space-y-3">
                {subjectData.map((subject, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{subject.label}</span>
                      <span className="text-lg font-bold text-blue-600">{subject.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${subject.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No subject data</p>
            )}
          </Card>

          <Card title="Overall Statistics">
            {analytics && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Average Score</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {analytics.averageScore}%
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Completion Rate</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {Math.round((analytics.completedAssessments / (analytics.completedAssessments + analytics.pendingAssessments)) * 100)}%
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Detailed Assessment List */}
        <Card title="All Assessments">
          <div className="mb-6 flex flex-wrap gap-2">
            {['all', 'completed', 'pending'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg transition capitalize ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Assessment</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Percentage</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssessments.map(assessment => {
                  const percentage = calculatePercentage(assessment.score, assessment.totalPoints);
                  return (
                    <tr key={assessment.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900">{assessment.title}</td>
                      <td className="py-3 px-4 text-gray-700">{assessment.subject}</td>
                      <td className="py-3 px-4 text-gray-700">{formatDate(assessment.date)}</td>
                      <td className="py-3 px-4 text-gray-900 font-medium">
                        {assessment.score}/{assessment.totalPoints}
                      </td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">{percentage}%</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          assessment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : assessment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
}
