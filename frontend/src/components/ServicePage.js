import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('https://pranayuvbackendfinal-production.up.railway.app/pran/getallcourses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Courses We Offer</h2> {/* Added Heading */}
      <div className="row">
        {courses.map((course, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{course.category}</h5>
                <p className="card-text">{course.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
