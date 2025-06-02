import React from 'react';

// Import blog images
import blog1 from '../assets/images/blog1.jpg';
import blog2 from '../assets/images/blog2.jpg';
import blog3 from '../assets/images/blog3.jpg';
import blog4 from '../assets/images/blog4.jpg';
import blog5 from '../assets/images/blog5.jpg';
import blog6 from '../assets/images/blog6.jpg';
import blog7 from '../assets/images/blog7.jpg';

const posts = [
  { 
    date: '15-04-2024', 
    title: 'Padma Shri Chintakindi Mallesham Visits',
    content: 'Padma Shri awardee Chintakindi Mallesham visited our University. He appreciated our identification of societal problems.',
    icon: 'bi-award',
    image: blog1,
  },
  { 
    date: '28-04-2024', 
    title: 'Medical Experts Visit',
    content: 'Dr. B. Koteswara Rao - General Surgeon, Dr. P V Krishna Rao, and others visited. They appreciated our work and provided valuable feedback.',
    icon: 'bi-award',
    image: blog2,
  },
  { 
    date: '26-04-2024', 
    title: 'KCP Cements Quality HoDs Visit',
    content: 'KCP Cements Quality HoDs, Bhava Narayana, V Srinivasa Rao, E&I HoDs Vara Prasad, and K Rama Koteswara Rao visited. They appreciated our work and gave valuable feedback.',
    icon: 'bi-award',
    image: blog3,
  },
  { 
    date: '03-05-2024', 
    title: 'Space Scientist Dr. P V Radha Devi Visits',
    content: 'Dr. P V Radha Devi, Outstanding Scientist and Director, ADRIN, Dept. of Space, Hyderabad, along with her team visited. They appreciated our work.',
    icon: 'bi-award',
    image: blog4,
  },
  { 
    date: '16-05-2024', 
    title: 'Writer Yendamuri Veerendranath Visits',
    content: 'Sri Yendamuri Veerendranath, Writer and Director, Hyderabad, visited. He appreciated our work.',
    icon: 'bi-award',
    image: blog5,
  },
  { 
    date: '16-09-2024', 
    title: 'Minister Sri Kondapalli Srinivas Visits',
    content: 'Sri Kondapalli Srinivas, Minister of MSME, SERP, NRI Empowerment and Relations, Govt. of A.P., visited. He appreciated our work.',
    icon: 'bi-award',
    image: blog6,
  },
  { 
    date: '2024', 
    title: 'Featured on ETV Yuva',
    content: 'Watch our special feature on ETV Yuva highlighting our achievements and impact.',
    icon: 'bi-tv',
    image: blog7,
    link: 'https://youtu.be/e9LKjmj4guk?feature=shared',
  },
];

const Blog = () => (
  <section className="py-5 bg-light">
    <div className="container">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Blog & Updates</h2>
        <p className="lead text-muted">Stay updated with our latest news and achievements</p>
      </div>
      <div className="row g-4">
        {posts.map((post, index) => (
          <div key={index} className="col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="card h-100 border-0 shadow-sm blog-card">
              <div className="square-image-container" style={{ height: 250, overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="card-img-top square-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => (e.target.src = 'https://via.placeholder.com/350?text=Blog+Image')}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <i className={`bi ${post.icon} fs-5 text-primary me-2`}></i>
                  <span className="fw-semibold text-muted" style={{ fontSize: '0.95rem' }}>
                    {post.date}
                  </span>
                </div>
                <h5 className="card-title fw-bold mb-2">{post.title}</h5>
                <p className="card-text text-muted mb-3" style={{ fontSize: '0.97rem' }}>
                  {post.content}
                </p>
                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-auto"
                  >
                    <i className="bi bi-play-circle me-2"></i>Watch Feature
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;
