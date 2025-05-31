import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './AdminDashboard.css'; // Import custom CSS file for responsive styles

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [userInfos, setUserInfos] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [submittedTasks, setSubmittedTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Admin Form State
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [adminMessage, setAdminMessage] = useState('');

  // Product Form State
  const [showProductForm, setShowProductForm] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    category: '',
    releaseDate: '',
    productAvailable: true,
    stockQuantity: '',
    imageFile: null,
  });
  const [productMessage, setProductMessage] = useState('');

  // Course Form State
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [courseForm, setCourseForm] = useState({
    category: '',
    description: '',
  });
  const [courseMessage, setCourseMessage] = useState('');
  const [courseLoading, setCourseLoading] = useState(false);

  // Task Form State
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    courseId: '',
    courseName: '',
    taskName: '',
    description: '',
    dueDate: '',
  });
  const [taskMessage, setTaskMessage] = useState('');
  const [taskLoading, setTaskLoading] = useState(false);

  // Search Submission State
  const [searchUsername, setSearchUsername] = useState('');
  const [userSubmission, setUserSubmission] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const credentials = localStorage.getItem('credentials');
      const role = localStorage.getItem('role');

      if (!credentials || role !== 'ROLE_ADMIN') {
        if (isMounted) {
          setError('Access denied: Admin role required');
          navigate('/login');
        }
        return;
      }

      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        };
        const [messagesResponse, productsResponse, coursesResponse, userInfoResponse, tasksResponse, submittedTasksResponse] = await Promise.all([
          api.get('/admin/getmessages', config),
          api.get('/api/products', config),
          api.get('/admin/getallcourses', config),
          api.get('/admin/getuserinfo', config),
          api.get('/admin/getalltasks', config),
          api.get('/admin/getsubmits', config),
        ]);
        if (isMounted) {
          console.log('Courses (getallcourses) response:', coursesResponse.data);
          console.log('Submitted tasks (getsubmits) response:', submittedTasksResponse.data);
          setMessages(messagesResponse.data || []);
          setProducts(productsResponse.data || []);
          setCourses(coursesResponse.data || []);
          setUserInfos(userInfoResponse.data || []);
          setTasks(tasksResponse.data || []);
          setSubmittedTasks(submittedTasksResponse.data || []);
        }
      } catch (error) {
        if (isMounted) {
          setError('Failed to load data: ' + (error.response?.data?.message || error.message));
          console.error('Data fetch error:', error);
          if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem('credentials');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            navigate('/login');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Admin Form Handlers
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/adminregister', { username: newAdminUsername, password: newAdminPassword });
      setAdminMessage('Admin added successfully!');
      setNewAdminUsername('');
      setNewAdminPassword('');
      setShowAdminForm(false);
    } catch (error) {
      setAdminMessage('Failed to add admin: ' + (error.response?.data?.message || error.message));
    }
  };

  // Product Form Handlers
  const handleProductFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (editProductId && !productForm.imageFile) {
      setProductMessage('Please upload an image to update the product.');
      return;
    }

    const formData = new FormData();
    const productData = {
      id: editProductId || undefined,
      name: productForm.name,
      description: productForm.description,
      brand: productForm.brand,
      price: parseFloat(productForm.price) || 0,
      category: productForm.category,
      releaseDate: productForm.releaseDate || null,
      productAvailable: productForm.productAvailable,
      stockQuantity: parseInt(productForm.stockQuantity) || 0,
    };
    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    if (productForm.imageFile) {
      formData.append('imageFile', productForm.imageFile);
    } else {
      if (!editProductId) {
        setProductMessage('Please upload an image to add the product.');
        return;
      }
    }

    try {
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      if (editProductId) {
        await api.put(`/api/product/${editProductId}`, formData, config);
        setProductMessage('Product updated successfully!');
      } else {
        await api.post('/api/product', formData, config);
        setProductMessage('Product added successfully!');
      }

      const productsResponse = await api.get('/api/products', config);
      setProducts(productsResponse.data || []);
      resetProductForm();
    } catch (error) {
      console.error('Product save error:', error);
      setProductMessage('Failed to save product: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEditProduct = (product) => {
    setEditProductId(product.id);
    setProductForm({
      name: product.name,
      description: product.description,
      brand: product.brand,
      price: product.price.toString(),
      category: product.category,
      releaseDate: product.releaseDate ? new Date(product.releaseDate).toISOString().split('T')[0] : '',
      productAvailable: product.productAvailable,
      stockQuantity: product.stockQuantity.toString(),
      imageFile: null,
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };
      await api.delete(`/api/product/${id}`, config);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setProductMessage('Product deleted successfully!');
    } catch (error) {
      setProductMessage('Failed to delete product: ' + (error.response?.data?.message || error.message));
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      brand: '',
      price: '',
      category: '',
      releaseDate: '',
      productAvailable: true,
      stockQuantity: '',
      imageFile: null,
    });
    setEditProductId(null);
    setShowProductForm(false);
    setProductMessage('');
  };

  // Course Form Handlers
  const handleCourseFormChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      courseId: editCourseId || undefined,
      category: courseForm.category,
      description: courseForm.description,
    };

    try {
      setCourseLoading(true);
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };
      if (editCourseId) {
        await api.put('/admin/updatecourse', courseData, config);
        setCourseMessage('Course updated successfully!');
      } else {
        await api.post('/admin/addcourse', courseData, config);
        setCourseMessage('Course added successfully!');
      }

      const coursesResponse = await api.get('/admin/getallcourses', config);
      setCourses(coursesResponse.data || []);
      resetCourseForm();
    } catch (error) {
      console.error('Course save error:', error);
      setCourseMessage('Failed to save course: ' + (error.response?.data?.message || error.message));
    } finally {
      setCourseLoading(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditCourseId(course.courseId);
    setCourseForm({
      category: course.category,
      description: course.description,
    });
    setShowCourseForm(true);
  };

  const handleDeleteCourse = async (id) => {
    try {
      setCourseLoading(true);
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };
      await api.delete(`/admin/deletecourse/${id}`, config);
      setCourses((prev) => prev.filter((c) => c.courseId !== id));
      setCourseMessage('Course deleted successfully!');
    } catch (error) {
      console.error('Delete course error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        request: error.request ? 'Request made but no response received' : 'No request made',
      });
      const message = error.response?.status === 404
        ? 'Course not found. It may have already been deleted.'
        : 'Failed to delete course: ' + (error.response?.data || error.message);
      setCourseMessage(message);
    } finally {
      setCourseLoading(false);
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      category: '',
      description: '',
    });
    setEditCourseId(null);
    setShowCourseForm(false);
    setCourseMessage('');
  };

  // Task Form Handlers
  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    if (!taskForm.courseId) {
      setTaskMessage('Please enter a Course ID.');
      return;
    }
    if (isNaN(taskForm.courseId) || parseInt(taskForm.courseId) <= 0) {
      setTaskMessage('Course ID must be a positive number.');
      return;
    }
    if (!taskForm.courseName) {
      setTaskMessage('Please enter the Category.');
      return;
    }
    if (taskForm.courseName.length > 100) {
      setTaskMessage('Category must be 100 characters or less.');
      return;
    }
    if (!taskForm.taskName) {
      setTaskMessage('Please enter a Task Name.');
      return;
    }
    if (taskForm.taskName.length > 255) {
      setTaskMessage('Task Name must be 255 characters or less.');
      return;
    }

    const taskData = {
      course_id: parseInt(taskForm.courseId),
      category: taskForm.courseName,
      title: taskForm.taskName,
      description: taskForm.description || null,
      due_date: taskForm.dueDate ? new Date(taskForm.dueDate).toISOString() : null,
    };

    try {
      setTaskLoading(true);
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };
      await api.post('/admin/addtask', taskData, config);
      setTaskMessage('Task added successfully!');

      const tasksResponse = await api.get('/admin/getalltasks', config);
      setTasks(tasksResponse.data || []);
      resetTaskForm();
    } catch (error) {
      console.error('Task save error:', error);
      setTaskMessage('Failed to save task: ' + (error.response?.data?.message || error.message));
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setTaskLoading(true);
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };
      await api.put(`/admin/deletetask/${id}`, null, config);

      const tasksResponse = await api.get('/admin/getalltasks', config);
      setTasks(tasksResponse.data || []);
      setTaskMessage('Task deleted successfully!');
    } catch (error) {
      console.error('Delete task error:', error);
      setTaskMessage('Failed to delete task: ' + (error.response?.data?.message || error.message));
    } finally {
      setTaskLoading(false);
    }
  };

  const resetTaskForm = () => {
    setTaskForm({
      courseId: '',
      courseName: '',
      taskName: '',
      description: '',
      dueDate: '',
    });
    setShowTaskForm(false);
    setTaskMessage('');
  };

  // Search Submission Handler
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchUsername) {
      setSearchMessage('Please enter a username to search.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Basic ${localStorage.getItem('credentials')}`,
        },
      };
      const response = await api.get(`/admin/getsubmitbyusername/${searchUsername}`, config);
      console.log('Search submission response:', response.data);
      setUserSubmission(
        typeof response.data === 'string'
          ? { username: searchUsername, linktogithub: response.data }
          : response.data
      );
      setSearchMessage(response.data ? 'Submission found!' : 'No submission found for this user.');
    } catch (error) {
      setSearchMessage('Failed to fetch submission: ' + (error.response?.data?.message || error.message));
      setUserSubmission(null);
    }
  };

  const resetSearchForm = () => {
    setSearchUsername('');
    setUserSubmission(null);
    setSearchMessage('');
  };

  return (
    <section className="py-3 py-md-5 bg-light">
      <div className="container">
        <h2 className="display-5 fw-bold text-center mb-3 mb-md-5">Admin Dashboard</h2>
        <div className="card p-3 p-md-4 shadow-sm">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 mb-md-4">
            <h3 className="h4 fw-semibold mb-2 mb-md-0">Welcome, Admin!</h3>
            <span className="text-muted">Role: Admin</span>
          </div>
          {error && <p className="text-danger mb-3 mb-md-4">{error}</p>}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 mb-md-4">
                <h3 className="h4 fw-semibold mb-2 mb-md-0">Management</h3>
                <div className="d-flex flex-column flex-md-row gap-2 gap-md-3">
                  <button
                    onClick={() => setShowAdminForm(!showAdminForm)}
                    className="btn btn-primary w-100 w-md-auto"
                  >
                    {showAdminForm ? 'Cancel' : 'Add New Admin'}
                  </button>
                  <button
                    onClick={() => setShowProductForm(!showProductForm)}
                    className="btn btn-primary w-100 w-md-auto"
                  >
                    {showProductForm ? 'Cancel' : 'Add New Product'}
                  </button>
                  <button
                    onClick={() => setShowCourseForm(!showCourseForm)}
                    className="btn btn-primary w-100 w-md-auto"
                  >
                    {showCourseForm ? 'Cancel' : 'Add New Course'}
                  </button>
                  <button
                    onClick={() => setShowTaskForm(!showTaskForm)}
                    className="btn btn-primary w-100 w-md-auto"
                  >
                    {showTaskForm ? 'Cancel' : 'Add New Task'}
                  </button>
                </div>
              </div>
              {showAdminForm && (
                <form onSubmit={handleAddAdmin} className="admin-form p-3 p-md-4 mb-4 mb-md-5 bg-light rounded">
                  <h4 className="h5 fw-semibold mb-3 mb-md-4">Add New Admin</h4>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="newAdminUsername" className="form-label">Username</label>
                      <input
                        type="text"
                        id="newAdminUsername"
                        value={newAdminUsername}
                        onChange={(e) => setNewAdminUsername(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="newAdminPassword" className="form-label">Password</label>
                      <input
                        type="password"
                        id="newAdminPassword"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3 mt-md-4 w-100 w-md-auto">
                    Add Admin
                  </button>
                  {adminMessage && (
                    <p className={`mt-3 ${adminMessage.includes('Failed') ? 'text-danger' : 'text-success'}`}>
                      {adminMessage}
                    </p>
                  )}
                </form>
              )}
              {showProductForm && (
                <form onSubmit={handleProductSubmit} className="admin-form p-3 p-md-4 mb-4 mb-md-5 bg-light rounded">
                  <h4 className="h5 fw-semibold mb-3 mb-md-4">{editProductId ? 'Edit Product' : 'Add New Product'}</h4>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={productForm.name}
                        onChange={handleProductFormChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="brand" className="form-label">Brand</label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={productForm.brand}
                        onChange={handleProductFormChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="category" className="form-label">Category</label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={productForm.category}
                        onChange={handleProductFormChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="price" className="form-label">Price</label>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={productForm.price}
                        onChange={handleProductFormChange}
                        className="form-control"
                        required
                        step="0.01"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="stockQuantity" className="form-label">Stock Quantity</label>
                      <input
                        type="number"
                        id="stockQuantity"
                        name="stockQuantity"
                        value={productForm.stockQuantity}
                        onChange={handleProductFormChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="releaseDate" className="form-label">Release Date</label>
                      <input
                        type="date"
                        id="releaseDate"
                        name="releaseDate"
                        value={productForm.releaseDate}
                        onChange={handleProductFormChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={productForm.description}
                        onChange={handleProductFormChange}
                        className="form-control"
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="imageFile" className="form-label">
                        Image {editProductId && <span className="text-danger">(Required for update)</span>}
                      </label>
                      <input
                        type="file"
                        id="imageFile"
                        name="imageFile"
                        accept="image/*"
                        onChange={handleProductFormChange}
                        className="form-control"
                        required={editProductId ? true : false}
                      />
                    </div>
                    <div className="col-12 col-md-6 d-flex align-items-end">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          id="productAvailable"
                          name="productAvailable"
                          checked={productForm.productAvailable}
                          onChange={handleProductFormChange}
                          className="form-check-input"
                        />
                        <label htmlFor="productAvailable" className="form-check-label">Available</label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 mt-md-4 d-flex flex-column flex-md-row gap-2 gap-md-3">
                    <button type="submit" className="btn btn-primary w-100 w-md-auto">
                      {editProductId ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="btn btn-secondary w-100 w-md-auto"
                    >
                      Cancel
                    </button>
                  </div>
                  {productMessage && (
                    <p className={`mt-3 ${productMessage.includes('Failed') ? 'text-danger' : 'text-success'}`}>
                      {productMessage}
                    </p>
                  )}
                </form>
              )}
              {showCourseForm && (
                <form onSubmit={handleCourseSubmit} className="admin-form p-3 p-md-4 mb-4 mb-md-5 bg-light rounded">
                  <h4 className="h5 fw-semibold mb-3 mb-md-4">{editCourseId ? 'Edit Course' : 'Add New Course'}</h4>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="courseCategory" className="form-label">Category</label>
                      <input
                        type="text"
                        id="courseCategory"
                        name="category"
                        value={courseForm.category}
                        onChange={handleCourseFormChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="courseDescription" className="form-label">Description</label>
                      <textarea
                        id="courseDescription"
                        name="description"
                        value={courseForm.description}
                        onChange={handleCourseFormChange}
                        className="form-control"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3 mt-md-4 d-flex flex-column flex-md-row gap-2 gap-md-3">
                    <button type="submit" className="btn btn-primary w-100 w-md-auto" disabled={courseLoading}>
                      {courseLoading ? 'Saving...' : editCourseId ? 'Update Course' : 'Add Course'}
                    </button>
                    <button
                      type="button"
                      onClick={resetCourseForm}
                      className="btn btn-secondary w-100 w-md-auto"
                      disabled={courseLoading}
                    >
                      Cancel
                    </button>
                  </div>
                  {courseMessage && (
                    <p className={`mt-3 ${courseMessage.includes('Failed') ? 'text-danger' : 'text-success'}`}>
                      {courseMessage}
                    </p>
                  )}
                </form>
              )}
              {showTaskForm && (
                <form onSubmit={handleTaskSubmit} className="admin-form p-3 p-md-4 mb-4 mb-md-5 bg-light rounded">
                  <h4 className="h5 fw-semibold mb-3 mb-md-4">Add New Task</h4>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="courseId" className="form-label">Course ID</label>
                      <input
                        type="number"
                        id="courseId"
                        name="courseId"
                        value={taskForm.courseId}
                        onChange={handleTaskFormChange}
                        className="form-control"
                        min="1"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="courseName" className="form-label">Category</label>
                      <input
                        type="text"
                        id="courseName"
                        name="courseName"
                        value={taskForm.courseName}
                        onChange={handleTaskFormChange}
                        className="form-control"
                        maxLength="100"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="taskName" className="form-label">Task Name</label>
                      <input
                        type="text"
                        id="taskName"
                        name="taskName"
                        value={taskForm.taskName}
                        onChange={handleTaskFormChange}
                        className="form-control"
                        maxLength="255"
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="dueDate" className="form-label">Due Date</label>
                      <input
                        type="datetime-local"
                        id="dueDate"
                        name="dueDate"
                        value={taskForm.dueDate}
                        onChange={handleTaskFormChange}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="taskDescription" className="form-label">Description</label>
                      <textarea
                        id="taskDescription"
                        name="description"
                        value={taskForm.description}
                        onChange={handleTaskFormChange}
                        className="form-control"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-3 mt-md-4 d-flex flex-column flex-md-row gap-2 gap-md-3">
                    <button type="submit" className="btn btn-primary w-100 w-md-auto" disabled={taskLoading}>
                      {taskLoading ? 'Saving...' : 'Add Task'}
                    </button>
                    <button
                      type="button"
                      onClick={resetTaskForm}
                      className="btn btn-secondary w-100 w-md-auto"
                      disabled={taskLoading}
                    >
                      Cancel
                    </button>
                  </div>
                  {taskMessage && (
                    <p className={`mt-3 ${taskMessage.includes('Failed') ? 'text-danger' : 'text-success'}`}>
                      {taskMessage}
                    </p>
                  )}
                </form>
              )}
              <h3 className="h4 fw-semibold mb-3 mb-md-4">Products</h3>
              <div className="table-responsive">
                <table className="table admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Available</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <img
                            src={`https://pranayuvbackendfinal-production.up.railway.app/api/product/${product.id}/image`}
                            alt={product.name}
                            className="rounded product-image"
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/80?text=No+Image')}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.stockQuantity}</td>
                        <td>{product.productAvailable ? 'Yes' : 'No'}</td>
                        <td>
                          <div className="d-flex flex-column flex-md-row gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="btn btn-warning btn-sm w-100 w-md-auto"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="btn btn-danger btn-sm w-100 w-md-auto"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3 className="h4 fw-semibold mb-3 mb-md-4 mt-4 mt-md-5">Courses</h3>
              <div className="table-responsive">
                <table className="table admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">No courses available.</td>
                      </tr>
                    ) : (
                      courses.map((course) => (
                        <tr key={course.courseId}>
                          <td>{course.courseId}</td>
                          <td>{course.category}</td>
                          <td>{course.description}</td>
                          <td>{new Date(course.createdAt).toLocaleString()}</td>
                          <td>
                            <div className="d-flex flex-column flex-md-row gap-2">
                              <button
                                onClick={() => handleEditCourse(course)}
                                className="btn btn-warning btn-sm w-100 w-md-auto"
                                disabled={courseLoading}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCourse(course.courseId)}
                                className="btn btn-danger btn-sm w-100 w-md-auto"
                                disabled={courseLoading}
                              >
                                {courseLoading ? 'Deleting...' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <h3 className="h4 fw-semibold mb-3 mb-md-4 mt-4 mt-md-5">Tasks</h3>
              <div className="table-responsive">
                <table className="table admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Course ID</th>
                      <th>Course Name</th>
                      <th>Task Name</th>
                      <th>Description</th>
                      <th>Due Date</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">No tasks available.</td>
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
                          <td>
                            <div className="d-flex flex-column flex-md-row gap-2">
                              <button
                                onClick={() => handleDeleteTask(task.task_id)}
                                className="btn btn-danger btn-sm w-100 w-md-auto"
                                disabled={taskLoading}
                              >
                                {taskLoading ? 'Deleting...' : 'Delete'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <h3 className="h4 fw-semibold mb-3 mb-md-4 mt-4 mt-md-5">User Information</h3>
              <div className="table-responsive">
                <table className="table admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Username</th>
                      <th>Email/Phone</th>
                      <th>Category</th>
                      <th>Working Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userInfos.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center">No user information available.</td>
                      </tr>
                    ) : (
                      userInfos.map((userInfo, index) => (
                        <tr key={index}>
                          <td>{userInfo.fullName}</td>
                          <td>{userInfo.username}</td>
                          <td>{userInfo.emailPhone}</td>
                          <td>{userInfo.category || 'N/A'}</td>
                          <td>{userInfo.workingHours || 'N/A'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <h3 className="h4 fw-semibold mb-3 mb-md-4 mt-4 mt-md-5">Submitted Tasks</h3>
              <div className="table-responsive">
                <table className="table admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>GitHub Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submittedTasks.length === 0 ? (
                      <tr>
                        <td colSpan="2" className="text-center">No submitted tasks available.</td>
                      </tr>
                    ) : (
                      submittedTasks.map((submission, index) => (
                        <tr key={index}>
                          <td>{submission.username}</td>
                          <td>
                            {submission.linktogithub ? (
                              <a href={submission.linktogithub} target="_blank" rel="noopener noreferrer">
                                {submission.linktogithub}
                              </a>
                            ) : (
                              'No GitHub Link'
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <h3 className="h4 fw-semibold mb-3 mb-md-4 mt-4 mt-md-5">Search User Submission</h3>
              <form onSubmit={handleSearchSubmit} className="admin-form p-3 p-md-4 mb-4 mb-md-5 bg-light rounded">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="searchUsername" className="form-label">Username</label>
                    <input
                      type="text"
                      id="searchUsername"
                      value={searchUsername}
                      onChange={(e) => setSearchUsername(e.target.value)}
                      className="form-control"
                      placeholder="Enter username to search"
                    />
                  </div>
                </div>
                <div className="mt-3 mt-md-4 d-flex flex-column flex-md-row gap-2 gap-md-3">
                  <button type="submit" className="btn btn-primary w-100 w-md-auto">
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={resetSearchForm}
                    className="btn btn-secondary w-100 w-md-auto"
                  >
                    Clear
                  </button>
                </div>
                {searchMessage && (
                  <p className={`mt-3 ${searchMessage.includes('Failed') || searchMessage.includes('No submission') ? 'text-danger' : 'text-success'}`}>
                    {searchMessage}
                  </p>
                )}
                {userSubmission && (
                  <div className="mt-3">
                    <p>
                      Username: {userSubmission.username || searchUsername}
                      <br />
                      GitHub Link:{' '}
                      {userSubmission.linktogithub ? (
                        <a href={userSubmission.linktogithub} target="_blank" rel="noopener noreferrer">
                          {userSubmission.linktogithub}
                        </a>
                      ) : (
                        'No GitHub Link'
                      )}
                    </p>
                  </div>
                )}
              </form>
              <h3 className="h4 fw-semibold mb-3 mb-md-4 mt-4 mt-md-5">Contact Messages</h3>
              <div className="table-responsive">
                <table className="table admin-table table-sm">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg, index) => (
                      <tr key={index}>
                        <td>{msg.email}</td>
                        <td>{msg.phone_number}</td>
                        <td>{msg.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;