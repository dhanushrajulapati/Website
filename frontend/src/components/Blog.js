import React from 'react';

// Import blog images
import blog1 from '../assets/images/blog1.jpg';
import blog2 from '../assets/images/blog2.jpg';
import blog3 from '../assets/images/blog3.jpg';
import blog4 from '../assets/images/blog4.jpg';
import blog5 from '../assets/images/blog5.jpg';
import blog6 from '../assets/images/blog6.jpg';
import blog7 from '../assets/images/blog7.jpg';

const Blog = () => {
  const posts = [
    { 
      date: '15-04-2024', 
      content: 'Padma Shri awardee Chintakindi Mallesham visited our University. He appreciated our identification of societal problems.',
      icon: 'bi-award',
      image: blog1,
    },
    { 
      date: '28-04-2024', 
      content: 'Dr. B. Koteswara Rao - General Surgeon, Dr. P V Krishna Rao, and others visited. They appreciated our work and provided valuable feedback.',
      icon: 'bi-award',
      image: blog2,
    },
    { 
      date: '26-04-2024', 
      content: 'KCP Cements Quality HoDs, Bhava Narayana, V Srinivasa Rao, E&I HoDs Vara Prasad, and K Rama Koteswara Rao visited. They appreciated our work and gave valuable feedback.',
      icon: 'bi-award',
      image: blog3,
    },
    { 
      date: '03-05-2024', 
      content: 'Dr. P V Radha Devi, Outstanding Scientist and Director, ADRIN, Dept. of Space, Hyderabad, along with her team visited. They appreciated our work.',
      icon: 'bi-award',
      image: blog4,
    },
    { 
      date: '16-05-2024', 
      content: 'Sri Yendamuri Veerendranath, Writer and Director, Hyderabad, visited. He appreciated our work.',
      icon: 'bi-award',
      image: blog5,
    },
    { 
      date: '16-09-2024', 
      content: 'Sri Kondapalli Srinivas, Minister of MSME, SERP, NRI Empowerment and Relations, Govt. of A.P., visited. He appreciated our work.',
      icon: 'bi-award',
      image: blog6,
    },
    { 
      date: '2024', 
      content: (
        <a 
          href="https://youtu.be/e9LKjmj4guk?feature=shared" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-primary"
        >
          <i className="bi bi-play-circle me-2"></i>Featured on ETV Yuva
        </a>
      ),
      icon: 'bi-tv',
      image: blog7,
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Blog & Updates</h2>
          <p className="lead text-muted">Stay updated with our latest news and achievements</p>
        </div>
        <div className="row g-4">
          {posts.map((post, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm blog-card">
                <div className="square-image-container">
                  <img
                    src={post.image}
                    alt={typeof post.content === 'string' ? post.content : 'ETV Yuva Feature'}
                    className="card-img-top square-image"
                    onError={(e) => (e.target.src = 'https://via.placeholder.com/350?text=Blog+Image')}
                  />
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="blog-icon me-3">
                      <i className={`bi ${post.icon} fs-5`}></i>
                    </div>
                    <h3 className="h6 mb-0">{post.date}</h3>
                  </div>
                  <div className="card-text">{post.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;