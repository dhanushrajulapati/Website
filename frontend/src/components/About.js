import React, { useRef } from 'react';

// Import local team member photos
import ajayPhoto from '../assets/images/ajay.jpg';
import sandeepthiPhoto from '../assets/images/sandeepthi.jpg';
import rayyanPhoto from '../assets/images/rayyan.jpg';
import kushalPhoto from '../assets/images/kushal.jpg';
import srinivasaraoPhoto from '../assets/images/srinivasarao.jpg';

const About = () => {
  const team = [
    { name: 'Ajay Polavarapu', role: 'Director - Operations', linkedin: 'https://linkedin.com/in/ajay-polavarapu-04a293255', img: ajayPhoto },
    { name: 'Sandeepthi Chitturi', role: 'Clinical & Research Lead', linkedin: 'https://linkedin.com/in/sandeepthi-chitturi', img: sandeepthiPhoto },
    { name: 'Rayyan', role: 'Tech Lead - Hardware', linkedin: '#', img: rayyanPhoto },
    { name: 'Kushal Thandra', role: 'Tech Lead - Software', linkedin: 'https://linkedin.com/in/kushal-thandra-ab2465189', img: kushalPhoto },
    { name: 'Dr. Srinivasarao Gummadi', role: 'Director – Advisory', linkedin: 'https://linkedin.com/in/dr-srinivasa-rao-gummadi-542a0771', img: srinivasaraoPhoto },
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
     {/* Who We Are Section */}
      <section
        className="who-we-are-section text-white d-flex align-items-center"
        style={{
          backgroundImage: `url('https://cdn.prod.website-files.com/65f6ba266e0d7c8372e4b4cf/65fbb9bec24d0ed53521a47f_banner-image.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '220px 0', // increased padding for more space
          position: 'relative',
        }}
      >
        {/* Overlay for better text visibility */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        ></div>

        <div className="container position-relative z-2">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <h2 className="display-4 fw-bold mb-4 text-white">Who We Are</h2>
              <p className="lead fs-5 text-white">
                We’re a group of passionate innovators, engineers, and healthcare thinkers united by a common goal:
                to build meaningful solutions that improve the lives of patients and caregivers. At Pranayuv,
                empathy meets engineering to bring impactful, affordable medtech innovations to life.
              </p>
            </div>
          </div>
        </div>
      </section>


     {/* Our Story Section */}
<section className="py-5 bg-primary bg-opacity-10">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-6 order-lg-1 mb-4 mb-lg-0">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          alt="Team working"
          className="img-fluid rounded shadow"
        />
      </div>
      <div className="col-lg-6 order-lg-2">
        <h1 className="display-5 fw-bold mb-4">Our Story</h1>
        <p className="mb-4">
          Founded in April 2025 by <strong>P. S. Rama Krishna</strong>, Pranayuv is a medtech innovation startup based in Vijayawada, India. What began as a student-led initiative in the labs of the Department of Electrical and Electronics Engineering, Siddhartha Academy of Higher Education, has now evolved into a purpose-driven company creating real-world healthcare solutions.
        </p>
        <p className="mb-4">
          The journey started with a bold idea—designing a solution to reduce the daily challenges faced by bedridden patients and their caregivers. This led to the development of the <strong>Ayuv Hybrid Convertible Bed</strong>—a smart bed-to-wheelchair system that integrates IoT health monitoring, gesture control, and automated sanitation. It was more than just a project—it was a promise to improve lives through intelligent design.
        </p>
        <p className="mb-4">
          Building on this innovation, the team launched the <strong>AyuvDrop Smart Water Bottle</strong> to promote healthy hydration—each product rooted in empathy and engineered for impact.
        </p>
        <p className="mb-4">
          At Pranayuv, we envision a world where healthcare is smarter, more compassionate, and accessible to all. We're on a mission to build innovative wellness products that are both technologically advanced and affordable, making them ideal for individuals, caregivers, and medical institutions alike.
        </p>
      </div>
    </div>
  </div>
</section>

<section
  className="text-white d-flex align-items-center"
  style={{
    backgroundImage: `url('https://cdn.prod.website-files.com/65f6ba266e0d7c8372e4b4cf/65fbb9bec24d0ed53521a47f_banner-image.webp')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    minHeight: '400px',
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 1,
    }}
  ></div>

  {/* Carousel Content */}
  <div className="container position-relative z-2 text-center">
    <div id="visionMissionCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {/* Mission Slide */}
        <div className="carousel-item active">
          <h6 className="text-uppercase mb-3">Our</h6>
          <h2 className="display-4 fw-bold text-white">Mission</h2>
          <p className="lead mt-3">
            To design and deliver medtech innovations like the Ayuv Hybrid Bed and AyuvDrop Smart Bottle,
            grounded in empathy and engineered to improve daily life for those in need.
          </p>
        </div>

        {/* Vision Slide */}
        <div className="carousel-item">
          <h6 className="text-uppercase mb-3">Our</h6>
          <h2 className="display-4 fw-bold text-white">Vision</h2>
          <p className="lead mt-3">
            We envision a world where healthcare is smarter, more compassionate, and accessible to all.
            Our mission is to empower individuals, caregivers, and medical institutions with innovative,
            affordable wellness solutions.
          </p>
        </div>
      </div>

      {/* Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#visionMissionCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#visionMissionCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>

      {/* Dots */}
      <div className="carousel-indicators mt-4">
        <button
          type="button"
          data-bs-target="#visionMissionCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Mission"
        ></button>
        <button
          type="button"
          data-bs-target="#visionMissionCarousel"
          data-bs-slide-to="1"
          aria-label="Vision"
        ></button>
      </div>
    </div>
  </div>
</section>


      {/* Our Vision Detailed Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold text-primary mb-4">Our Vision</h2>
              <p>
                At Pranayuv, we envision a world where healthcare is smarter, more compassionate, and accessible to all. We're on a mission to build innovative wellness products that are both technologically advanced and affordable.
              </p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Innovation begins with empathy.
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Small teams can create a big impact.
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  Accessible healthcare is a right, not a luxury.
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1588776814546-ec7e2223b3c0?auto=format&fit=crop&w=600&q=80"
                alt="Vision"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Team Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Our Team</h2>
            <p className="lead text-muted">The passionate minds behind Pranayuv</p>
          </div>

          <div className="position-relative">
            <button
              onClick={scrollLeft}
              className="btn btn-light position-absolute start-0 top-50 translate-middle-y z-3 d-none d-md-block"
              style={{ left: '-20px' }}
            >
              <i className="bi bi-chevron-left fs-3"></i>
            </button>

            <div
              ref={teamContainerRef}
              className="team-scroll-container d-flex overflow-x-auto py-3 px-2"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {team.map((member, index) => (
                <div
                  key={index}
                  className="team-card flex-shrink-0 me-4"
                  style={{ scrollSnapAlign: 'start', minWidth: '280px', maxWidth: '280px' }}
                >
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="team-photo-container">
                      <img src={member.img} alt={member.name} className="team-photo" />
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
              style={{ right: '-20px' }}
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
