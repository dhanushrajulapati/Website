import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocalHospital, MdMemory, MdAttachMoney } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";


// Images (replace with your actual paths)
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

    {/* Animated & Unique Hero Section */}
    <section className="hero-section bg-primary text-white py-5 position-relative overflow-hidden">
      <div className="animated-bg"></div>
      <div className="container text-center py-5 position-relative" style={{ zIndex: 2 }}>
        <h1 className="display-3 text-white fw-bold mb-3 fade-in-up">
          Welcome to Pranayuv
        </h1>
        <p className="lead mb-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
          Innovating Healthcare with Empathy and Technology
        </p>
        <div className="d-flex justify-content-center gap-3 fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/products" className="btn btn-primary btn-lg px-4 shadow-lg scale-on-hover">
            Explore Products
          </Link>
          <Link to="/about" className="btn btn-outline-light btn-lg px-4 shadow-lg scale-on-hover">
            Learn More
          </Link>
        </div>
      </div>
      {/* Decorative SVG Wave */}
      <div className="hero-wave">
  <svg viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', height: '90px' }}>
    <defs>
      <linearGradient id="heroWaveGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#f8f9fa" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      d="M0,80 C360,160 1080,0 1440,80 L1440,150 L0,150 Z"
      fill="url(#heroWaveGradient)"
      opacity="0.9"
    />
    <path
      d="M0,100 C480,200 960,0 1440,100 L1440,150 L0,150 Z"
      fill="#fff"
      opacity="0.7"
    >
      <animate attributeName="d" dur="6s" repeatCount="indefinite"
        values="
          M0,100 C480,200 960,0 1440,100 L1440,150 L0,150 Z;
          M0,90 C400,180 1040,20 1440,90 L1440,150 L0,150 Z;
          M0,100 C480,200 960,0 1440,100 L1440,150 L0,150 Z
        "
      />
    </path>
  </svg>
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
        icon={<MdLocalHospital size={36} />}
        title="Patient-Centric Design"
        description="Our products prioritize patient comfort and caregiver convenience."
      />
      <FeatureCard
        icon={<MdMemory size={36} />}
        title="Smart Technology"
        description="Integrated IoT solutions for modern healthcare challenges."
      />
      <FeatureCard
        icon={<FaRupeeSign size={36} />}
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
      <h2 className="fw-bold">Spotlight Stories</h2>
      <p className="lead text-muted">Stay informed with our recent activities</p>
    </div>
    <div className="row g-4">
      {featuredBlogs.map(blog => (
        <div key={blog.id} className="col-md-4 d-flex align-items-stretch">
          <Link to={blog.link} className="w-100 h-100">
            <div className="card blog-card border-0 shadow-sm h-100">
              <div className="square-image-container" style={{ height: '250px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                <img
                  src={blog.image}
                  alt={blog.content}
                  className="square-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => (e.target.src = 'https://via.placeholder.com/350?text=Blog+Image')}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <i className={`bi ${blog.icon} fs-5 text-primary me-2`}></i>
                  <span className="fw-semibold" style={{ fontSize: '0.95rem' }}>
                    {blog.date}
                  </span>
                </div>
                <p className="text-muted mb-0" style={{ fontSize: '0.97rem' }}>
                  {blog.content.length > 60 ? blog.content.slice(0, 57) + '...' : blog.content}
                </p>
                <div className="mt-auto" />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
    <div className="text-center mt-5">
      <Link to="/blog" className="btn btn-primary btn-lg px-4">
        View All Updates
      </Link>
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
          {icon}
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
