import React from 'react';
import { useRef } from 'react';

// Import local team member photos
import ajayPhoto from '../assets/images/ajay.jpg';
import sandeepthiPhoto from '../assets/images/sandeepthi.jpg';
import rayyanPhoto from '../assets/images/rayyan.jpg';
import kushalPhoto from '../assets/images/kushal.jpg';
import srinivasaraoPhoto from '../assets/images/srinivasarao.jpg';

const About = () => {
  const team = [
    { 
      name: 'Ajay Polavarapu', 
      role: 'Director - Operations', 
      linkedin: 'https://linkedin.com/in/ajay-polavarapu-04a293255',
      img: ajayPhoto
    },
    { 
      name: 'Sandeepthi Chitturi', 
      role: 'Clinical & Research Lead', 
      linkedin: 'https://linkedin.com/in/sandeepthi-chitturi',
      img: sandeepthiPhoto
    },
    { 
      name: 'Rayyan', 
      role: 'Tech Lead - Hardware', 
      linkedin: '#',
      img: rayyanPhoto
    },
    { 
      name: 'Kushal Thandra', 
      role: 'Tech Lead - Software', 
      linkedin: 'https://linkedin.com/in/kushal-thandra-ab2465189',
      img: kushalPhoto
    },
    { 
      name: 'Dr. Srinivasarao Gummadi', 
      role: 'Director – Advisory', 
      linkedin: 'https://linkedin.com/in/dr-srinivasa-rao-gummadi-542a0771',
      img: srinivasaraoPhoto
    },
  ];

  const teamContainerRef = useRef(null);

  const scrollLeft = () => {
    if (teamContainerRef.current) {
      teamContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (teamContainerRef.current) {
      teamContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="about-page">
      {/* About Hero */}
      <section className="py-5 bg-primary bg-opacity-10">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4">Our Story</h1>
              <p className="lead">
                From student project to healthcare innovator - our journey of creating impact through technology.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Team working" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm mb-5">
                <div className="card-body p-4">
                  <p className="mb-4">
                    Founded in April 2025 by P.S. Rama Krishna, Pranayuv is a medtech innovation startup based in Vijayawada, India. What began as a student-led initiative in the labs of the Department of Electrical and Electronics Engineering, Siddhartha Academy of Higher Education, has now evolved into a purpose-driven company creating real-world healthcare solutions.
                  </p>
                  <p className="mb-4">
                    The journey started with a bold idea—designing a solution to reduce the daily challenges faced by bedridden patients and their caregivers. This led to the development of the Ayuv Hybrid Convertible Bed—a smart bed-to-wheelchair system that integrates IoT health monitoring, gesture control, and automated sanitation. It was more than just a project—it was a promise to improve lives through intelligent design.
                  </p>
                  <p className="mb-4">
                    Building on this innovation, the team launched the AyuvDrop Smart Water Bottle to promote healthy hydration—each product rooted in empathy and engineered for impact.
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <h2 className="h3 fw-bold mb-4 text-primary">Our Vision</h2>
                <p className="mb-4">
                  At Pranayuv, we envision a world where healthcare is smarter, more compassionate, and accessible to all. We're on a mission to build innovative wellness products that are both technologically advanced and affordable, making them ideal for individuals, caregivers, and medical institutions alike.
                </p>
                <div className="card border-0 shadow-sm">
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-3 d-flex">
                        <i className="bi bi-check-circle-fill text-primary me-2 mt-1"></i>
                        <span>Innovation begins with empathy.</span>
                      </li>
                      <li className="mb-3 d-flex">
                        <i className="bi bi-check-circle-fill text-primary me-2 mt-1"></i>
                        <span>Small teams can create a big impact.</span>
                      </li>
                      <li className="d-flex">
                        <i className="bi bi-check-circle-fill text-primary me-2 mt-1"></i>
                        <span>Accessible healthcare is a right, not a luxury.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Team</h2>
            <p className="lead text-muted">The passionate minds behind Pranayuv</p>
          </div>
          
          <div className="position-relative">
            <button 
              onClick={scrollLeft}
              className="btn btn-light position-absolute start-0 top-50 translate-middle-y z-3 d-none d-md-block"
              style={{left: '-20px'}}
            >
              <i className="bi bi-chevron-left fs-3"></i>
            </button>
            
            <div 
              ref={teamContainerRef}
              className="team-scroll-container d-flex overflow-x-auto py-3 px-2"
              style={{scrollSnapType: 'x mandatory'}}
            >
              {team.map((member, index) => (
                <div 
                  key={index} 
                  className="team-card flex-shrink-0 me-4"
                  style={{
                    scrollSnapAlign: 'start',
                    minWidth: '280px',
                    maxWidth: '280px'
                  }}
                >
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="team-photo-container">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="team-photo"
                      />
                    </div>
                    <div className="card-body text-center">
                      <h4 className="card-title">{member.name}</h4>
                      <p className="card-text text-muted">{member.role}</p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="bi bi-linkedin me-1"></i>Connect
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={scrollRight}
              className="btn btn-light position-absolute end-0 top-50 translate-middle-y z-3 d-none d-md-block"
              style={{right: '-20px'}}
            >
              <i className="bi bi-chevron-right fs-3"></i>
            </button>
          </div>

          <div className="text-center mt-4 d-md-none">
            <small className="text-muted">Swipe to view more team members</small>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;