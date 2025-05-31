import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const UserDashboard = () => {
  const username = localStorage.getItem('username') || 'User';
  const [courses, setCourses] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrollFormVisible, setEnrollFormVisible] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState(new Set());
  const [enrollMessage, setEnrollMessage] = useState('');
  const [submitTaskLink, setSubmitTaskLink] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    emailPhone: '',
    category: '',
    workingHours: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (localStorage.getItem('role') !== 'ROLE_USER') {
        if (isMounted) {
          setError('Access denied: User role required');
          navigate('/login');
        }
        return;
      }

      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Basic ${localStorage.getItem('credentials')}`,
          },
        };

        const coursesResponse = await api.get('/pran/getallcourses', config);
        const tasksResponse = await api.get(`/pran/getmytasks/${username}`, config);

        if (isMounted) {
          setCourses(coursesResponse.data || []);
          setTasks(tasksResponse.data || []);
          const enrolledCourseIds = new Set(tasksResponse.data.map(task => task.course_id));
          setEnrolledCourses(enrolledCourseIds);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load data: ' + (error.response?.data?.message || error.message));
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('credentials');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            navigate('/login');
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [navigate, username]);

  const handleEnrollClick = (courseId) => {
    setSelectedCourseId(courseId);
    setEnrollFormVisible(true);
    setEnrollMessage('');
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();

    const userInfo = {
      username: username,
      fullName: formData.fullName,
      emailPhone: formData.emailPhone,
      category: formData.category,
      workingHours: formData.workingHours,
    };

    try {
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };
      await api.post('/pran/adduserdetails', userInfo, config);
      setEnrollMessage('Successfully enrolled in the course!');
      setEnrolledCourses((prev) => new Set(prev).add(selectedCourseId));

      const tasksResponse = await api.get(`/pran/getmytasks/${username}`, config);
      setTasks(tasksResponse.data || []);

      setEnrollFormVisible(false);
      setFormData({
        fullName: '',
        emailPhone: '',
        category: '',
        workingHours: '',
      });
    } catch (error) {
      setEnrollMessage('Failed to enroll: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSubmitTask = async (e) => {
    e.preventDefault();
    setSubmitMessage('');

    if (!submitTaskLink.trim()) {
      setSubmitMessage('Please enter your GitHub link.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };

      await api.post(`/pran/submittask/${username}?link=${encodeURIComponent(submitTaskLink)}`, {}, config);
      setSubmitMessage('Task submitted successfully!');
      setSubmitTaskLink('');
    } catch (error) {
      setSubmitMessage('Failed to submit task: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetEnrollForm = () => {
    setEnrollFormVisible(false);
    setSelectedCourseId(null);
    setEnrollMessage('');
    setFormData({
      fullName: '',
      emailPhone: '',
      category: '',
      workingHours: '',
    });
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-3xl fw-bold text-center mb-5">User Dashboard</h2>
        <div className="card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="h4 fw-semibold">Welcome, {username}!</h3>
            <span className="text-muted">Role: User</span>
          </div>
          {error && <p className="error-message mb-4">{error}</p>}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {enrollFormVisible && (
                <form onSubmit={handleEnrollSubmit} className="admin-form p-4 mb-5">
                  <h4 className="h5 fw-semibold mb-4">Enroll in Course</h4>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email or Phone</label>
                      <input
                        type="text"
                        name="emailPhone"
                        value={formData.emailPhone}
                        onChange={handleFormChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Preferred Working Hours</label>
                      <input
                        type="text"
                        name="workingHours"
                        value={formData.workingHours}
                        onChange={handleFormChange}
                        className="form-control"
                        placeholder="e.g., 9 AM - 5 PM"
                      />
                    </div>
                  </div>
                  <div className="mt-4 d-flex gap-3">
                    <button type="submit" className="btn btn-primary">Submit Enrollment</button>
                    <button type="button" onClick={resetEnrollForm} className="btn btn-secondary">Cancel</button>
                  </div>
                  {enrollMessage && (
                    <p className={`mt-3 ${enrollMessage.includes('Failed') ? 'text-danger' : 'text-success'}`}>
                      {enrollMessage}
                    </p>
                  )}
                </form>
              )}

              <h3 className="h4 fw-semibold mb-4">Available Courses</h3>
              <div className="table-responsive">
                <table className="table admin-table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">No courses available.</td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr key={course.courseId}>
                          <td>{course.category}</td>
                          <td>{course.description}</td>
                          <td>{new Date(course.createdAt).toLocaleString()}</td>
                          <td>
                            <button
                              onClick={() => handleEnrollClick(course.courseId)}
                              className="btn btn-success btn-sm"
                              disabled={enrolledCourses.has(course.courseId)}
                            >
                              {enrolledCourses.has(course.courseId) ? 'Enrolled' : 'Enroll'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <h3 className="h4 fw-semibold mb-4 mt-5">My Tasks</h3>
              <div className="table-responsive mb-4">
                <table className="table admin-table">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Name</th>
                      <th>Task Name</th>
                      <th>Description</th>
                      <th>Due Date</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">No tasks available.</td>
                      </tr>
                    ) : (
                      tasks.map((task) => (
                        <tr key={task.task_id}>
                          <td>{task.course_id}</td>
                          <td>{task.category}</td>
                          <td>{task.title}</td>
                          <td>{task.description || 'N/A'}</td>
                          <td>{task.due_date ? new Date(task.due_date).toLocaleString() : 'N/A'}</td>
                          <td>{new Date(task.created_at).toLocaleString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Submit GitHub Link Section */}
              <div className="card p-3">
                <h4 className="h5 mb-3">Submit Completed Task</h4>
                <form onSubmit={handleSubmitTask} className="d-flex gap-3 flex-wrap">
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Enter your GitHub link"
                    value={submitTaskLink}
                    onChange={(e) => setSubmitTaskLink(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {submitMessage && (
                  <p className={`mt-2 ${submitMessage.includes('Failed') ? 'text-danger' : 'text-success'}`}>
                    {submitMessage}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
