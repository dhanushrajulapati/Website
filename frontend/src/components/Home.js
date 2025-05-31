import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocalHospital, MdMemory, MdAttachMoney } from "react-icons/md";


// Images
import blog1 from '../assets/images/blog1.jpg';
import blog2 from '../assets/images/blog2.jpg';
import blog3 from '../assets/images/blog3.jpg';
import blog4 from '../assets/images/blog4.jpg';
import blog5 from '../assets/images/blog5.jpg';
import blog6 from '../assets/images/blog6.jpg';

import incubated from '../assets/images/incubated.jpg';
import incubatedAmitz from '../assets/images/incubatedamitz.jpg';
import incubatedMediValley from '../assets/images/incubatedmedivalley.jpg';

import certifiedLogo1 from '../assets/images/certifiedlogo1.jpg';
import certifiedLogo2 from '../assets/images/certifiedlogo2.jpg';

const incubatedPartners = [
  { id: 1, image: incubated, alt: 'Incubated - Main' },
  { id: 2, image: incubatedAmitz, alt: 'Incubated - Amitz' },
  { id: 3, image: incubatedMediValley, alt: 'Incubated - MediValley' },
];

const certifiedPartners = [
  { id: 1, image: certifiedLogo1, alt: 'Certified Partner 1' },
  { id: 2, image: certifiedLogo2, alt: 'Certified Partner 2' },
];

const featuredBlogs = [
  {
    id: 1,
    date: '15-04-2024',
    content: 'Padma Shri awardee Chintakindi Mallesham visited our University. He appreciated our identification of societal problems.',
    icon: 'bi-award',
    image: blog1,
    link: '/blog#post1',
  },
  {
    id: 2,
    date: '28-04-2024',
    content: 'Dr. B. Koteswara Rao - General Surgeon, Dr. P V Krishna Rao, and others visited. They appreciated our work and provided valuable feedback.',
    icon: 'bi-award',
    image: blog2,
    link: '/blog#post2',
  },
  {
    id: 3,
    date: '26-04-2024',
    content: 'KCP Cements Quality HoDs, Bhava Narayana, V Srinivasa Rao, E&I HoDs Vara Prasad, and K Rama Koteswara Rao visited. They appreciated our work and gave valuable feedback.',
    icon: 'bi-award',
    image: blog3,
    link: '/blog#post3',
  },
  {
    id: 4,
    date: '03-05-2024',
    content: 'Dr. P V Radha Devi, Outstanding Scientist and Director, ADRIN, Dept. of Space, Hyderabad, along with her team visited. They appreciated our work.',
    icon: 'bi-award',
    image: blog4,
    link: '/blog#post4',
  },
  {
    id: 5,
    date: '16-05-2024',
    content: 'Sri Yendamuri Veerendranath, Writer and Director, Hyderabad, visited. He appreciated our work.',
    icon: 'bi-award',
    image: blog5,
    link: '/blog#post5',
  },
  {
    id: 6,
    date: '16-09-2024',
    content: 'Sri Kondapalli Srinivas, Minister of MSME, SERP, NRI Empowerment and Relations, Govt. of A.P., visited. He appreciated our work.',
    icon: 'bi-award',
    image: blog6,
    link: '/blog#post6',
  },
];

const Home = () => (
  <div className="home-page">

    {/* Hero Section */}
    <section className="hero-section bg-primary text-white py-5">
      <div className="container text-center py-5">
        <h1 className="display-3 text-white fw-bold mb-3">Welcome to Pranayuv</h1>
        <p className="lead mb-4">Innovating Healthcare with Empathy and Technology</p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/products" className="btn btn-primary btn-lg px-4">Explore Products</Link>
          <Link to="/about" className="btn btn-outline-light btn-lg px-4">Learn More</Link>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Healthcare Solutions</h2>
          <p className="lead text-muted">Designed with care, built for impact</p>
        </div>
        <div className="row g-4">
          <FeatureCard
            icon="bi-hospital"
            title="Patient-Centric Design"
            description="Our products prioritize patient comfort and caregiver convenience."
          />
          <FeatureCard
            icon="bi-cpu"
            title="Smart Technology"
            description="Integrated IoT solutions for modern healthcare challenges."
          />
          <FeatureCard
            icon="bi-currency-rupee"
            title="Affordable Solutions"
            description="High-quality healthcare products at accessible prices."
          />
        </div>
      </div>
    </section>

    {/* Incubated At */}
    <SectionWithLogos
      title="Incubated At"
      subtitle="Proudly supported by these institutions"
      partners={incubatedPartners}
      placeholder="Partner+Logo"
    />

    {/* Certified With */}
    <SectionWithLogos
      title="Certified With"
      subtitle="Recognized by these certifying authorities"
      partners={certifiedPartners}
      placeholder="Certified+Logo"
    />

    {/* Featured Blogs */}
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Latest Updates</h2>
          <p className="lead text-muted">Stay informed with our recent activities</p>
        </div>
        <div className="row g-4">
          {featuredBlogs.map(blog => (
            <div key={blog.id} className="col-md-4">
              <Link to={blog.link} className="text-decoration-none">
                <div className="card blog-card border-0 shadow-sm h-100">
                  <div className="square-image-container">
                    <img
                      src={blog.image}
                      alt={blog.content}
                      className="square-image"
                      onError={e => (e.target.src = 'https://via.placeholder.com/350?text=Blog+Image')}
                    />
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <i className={`bi ${blog.icon} fs-4 text-primary me-2`}></i>
                      <span className="fw-semibold">{blog.date}</span>
                    </div>
                    <p className="text-muted mb-0">{blog.content}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link to="/blog" className="btn btn-primary btn-lg px-4">View All Updates</Link>
        </div>
      </div>
    </section>
  </div>
);

// Feature card as a reusable component
const FeatureCard = ({ icon, title, description }) => (
  <div className="col-md-4">
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body text-center p-4">
        <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 d-inline-block mb-3">
          <i className={`bi ${icon} fs-3`}></i>
        </div>
        <h3 className="h5">{title}</h3>
        <p className="text-muted">{description}</p>
      </div>
    </div>
  </div>
);

// Section with logos (incubated/certified)
const SectionWithLogos = ({ title, subtitle, partners, placeholder }) => (
  <section className="py-5">
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="fw-bold">{title}</h2>
        <p className="lead text-muted">{subtitle}</p>
      </div>
      <div className="row justify-content-center g-4">
        {partners.map(partner => (
          <div key={partner.id} className="col-md-4 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="incubated-image-container d-flex align-items-center justify-content-center p-4" style={{ height: '200px' }}>
                <img
                  src={partner.image}
                  alt={partner.alt}
                  className="incubated-image"
                  style={{ maxHeight: '120px', objectFit: 'contain' }}
                  onError={e => (e.target.src = `https://via.placeholder.com/250?text=${placeholder}`)}
                />
                <div className="incubated-image-overlay">
                  <span>{partner.alt}</span>
                </div>
              </div>
              <div className="card-footer bg-white text-center border-0 py-2">
                <small className="text-muted">{partner.alt}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Home;
