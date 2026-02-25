import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { LogoutButton } from '../../components/LogoutButton';
import BarChart from '../../components/charts/BarChart';
import { assessmentService } from '../../services/assessmentService';
import { formatDate, calculatePercentage, getScoreColor } from '../../utils/helpers';

export default function StudentDashboard() {
  const [assessments, setAssessments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const chartData = assessments.map(a => ({
    label: a.subject,
    value: calculatePercentage(a.score, a.totalPoints)
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <LogoutButton />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Navigation */}
        <div className="mb-6 flex gap-3">
          <Link
            to="/student/dashboard"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/student/progress"
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            My Progress
          </Link>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">Average Score</p>
              <p className={`text-4xl font-bold mt-2 ${getScoreColor(analytics?.averageScore || 0)}`}>
                {analytics?.averageScore || 0}%
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <p className="text-4xl font-bold mt-2 text-green-600">
                {analytics?.completedAssessments || 0}
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-4xl font-bold mt-2 text-yellow-600">
                {analytics?.pendingAssessments || 0}
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm font-medium">Improvement</p>
              <p className="text-4xl font-bold mt-2 text-purple-600">
                +{analytics?.improvementRate || 0}%
              </p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Assessments */}
          <div className="lg:col-span-2">
            <Card title="Recent Assessments">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {assessments.length > 0 ? (
                  assessments.map(assessment => (
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
                        <span className={`text-lg font-bold ${getScoreColor(calculatePercentage(assessment.score, assessment.totalPoints))}`}>
                          {assessment.score}/{assessment.totalPoints}
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

          {/* Performance Chart */}
          <div>
            <Card title="Performance by Subject">
              <BarChart data={chartData} />
            </Card>
          </div>
        </div>

        {/* Strong & Weak Subjects */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <Card title="Strengths">
              <div className="space-y-2">
                {analytics.strongSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-900 font-medium">{subject}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Areas for Improvement">
              <div className="space-y-2">
                {analytics.weakSubjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-600 text-xl">!</span>
                    <span className="text-gray-900 font-medium">{subject}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
