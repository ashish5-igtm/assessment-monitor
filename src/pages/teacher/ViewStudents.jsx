import { useState, useEffect } from 'react';
import { studentService } from '../../services/studentService';
import Header from '../../components/common/Header';
import Card from '../../components/common/Card';

export default function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await studentService.getAllStudents();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Student Directory</h1>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card title="Registered Students">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          {loading ? (
            <div className="text-gray-600 text-center py-8">Loading students...</div>
          ) : students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="py-3 px-4 font-semibold text-gray-900">ID</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Name</th>
                    <th className="py-3 px-4 font-semibold text-gray-900">Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-500">{student.id}</td>
                      <td className="py-3 px-4 text-gray-900 font-medium">{student.name}</td>
                      <td className="py-3 px-4 text-blue-600">{student.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">No students are currently registered.</div>
          )}
        </Card>
      </main>
    </div>
  );
}
