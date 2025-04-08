import React from 'react';
import '../styles/Show.css'; // Linking external CSS file

const Showcase = () => {
  return (
    <div className="showcase-container">

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-box">
          <h3>5,000+</h3>
          <p>Patients Booked</p>
        </div>
        <div className="stat-box">
          <h3>300+</h3>
          <p>Hospitals Registered</p>
        </div>
        <div className="stat-box">
          <h3>800+</h3>
          <p>Qualified Doctors</p>
        </div>
      </section>


      {/* Reviews Section */}
      <section className="reviews-section">
        <h2>What Our Users Say</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <p>"HMS simplified our hospital workflow. Highly recommended!"</p>
            <strong>- Dr. Rajiv Mehta</strong>
          </div>
          <div className="review-card">
            <p>"Easy to book appointments and manage records."</p>
            <strong>- Priya Sharma (Patient)</strong>
          </div>
          <div className="review-card">
            <p>"Best platform for managing multiple hospital chains!"</p>
            <strong>- Apollo Hospitals</strong>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Showcase;
