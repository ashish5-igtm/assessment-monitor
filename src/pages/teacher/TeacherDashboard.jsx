import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

import BarChart from '../../components/charts/BarChart';
import { assessmentService } from '../../services/assessmentService';
import { formatDate, calculatePercentage } from '../../utils/helpers';

export default function TeacherDashboard() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await assessmentService.getStudentAssessments('teacher-view');
        setAssessments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = {
    totalAssessments: assessments.length,
    activeAssessments: assessments.filter(a => a.status !== 'completed').length,
    completedAssessments: assessments.filter(a => a.status === 'completed').length,
    averageStudentScore: assessments.length > 0
      ? Math.round(assessments.reduce((sum, a) => sum + calculatePercentage(a.score, a.totalPoints), 0) / assessments.length)
      : 0
  };

  const subjectStats = assessments.reduce((acc, a) => {
    const existing = acc.find(x => x.label === a.subject);
    if (existing) {
      existing.value += calculatePercentage(a.score, a.totalPoints);
      existing.count += 1;
    } else {
      acc.push({ label: a.subject, value: calculatePercentage(a.score, a.totalPoints), count: 1 });
    }
    return acc;
  }, []).map(x => ({
    label: x.label,
    value: Math.round(x.value / x.count)
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
        <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">Total Assessments</p>
              <p className="text-4xl font-bold mt-2 text-blue-600">{stats.totalAssessments}</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-4xl font-bold mt-2 text-green-600">{stats.completedAssessments}</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">In Progress</p>
              <p className="text-4xl font-bold mt-2 text-yellow-600">{stats.activeAssessments}</p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className="text-4xl font-bold mt-2 text-purple-600">{stats.averageStudentScore}%</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Assessments */}
          <div className="lg:col-span-2">
            <Card title="Recent Assessments">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {assessments.length > 0 ? (
                  assessments.slice(0, 10).map(assessment => (
                    <div
                      key={assessment.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                          <p className="text-sm text-gray-500">{assessment.subject}</p>
                        </div>
                        <Badge status={assessment.status}>
                          {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-600">{formatDate(assessment.date)}</span>
                        <span className="text-lg font-bold text-blue-600">
                          {calculatePercentage(assessment.score, assessment.totalPoints)}%
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">No assessments found</p>
                )}
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card title="Quick Actions">
              <div className="space-y-3">
                <Link
                  to="/teacher/add-assessment"
                  className="block w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center font-medium"
                >
                  + Create Assessment
                </Link>
                <button className="w-full px-4 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium">
                  View All Students
                </button>
                <button className="w-full px-4 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium">
                  Export Results
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="mt-8">
          <Card title="Performance by Subject">
            <BarChart data={subjectStats} />
          </Card>
        </div>

        {/* Assessment Details Table */}
        <div className="mt-8">
          <Card title="All Assessments">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Subject</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Questions</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {assessments.map(assessment => (
                    <tr key={assessment.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{assessment.title}</td>
                      <td className="py-3 px-4 text-gray-700">{assessment.subject}</td>
                      <td className="py-3 px-4 text-gray-700">{formatDate(assessment.date)}</td>
                      <td className="py-3 px-4 text-gray-700">{assessment.questions}</td>
                      <td className="py-3 px-4 text-gray-900 font-semibold">
                        {calculatePercentage(assessment.score, assessment.totalPoints)}%
                      </td>
                      <td className="py-3 px-4">
                        <Badge status={assessment.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
