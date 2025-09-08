import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-title">© 2025 Home Cook Food Platform</p>

      <div className="team-section">
        <h4>👨‍🍳 Project Team Members</h4>
        <div className="team-members">
          <div className="member-card">
            <strong>Harika Bondapalli</strong><br />
            📧 <a href="mailto:harika@example.com">Harika@example.com</a><br />
            🔗 <a href="https://www.linkedin.com/in/harika" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            📸 <a href="https://www.instagram.com/harika" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className="member-card">
            <strong>Anchal Chaurasiya</strong><br />
            📧 <a href="mailto:harika@example.com">anchal@example.com</a><br />
            🔗 <a href="https://www.linkedin.com/in/anchal" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            📸 <a href="https://www.instagram.com/anchal" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className="member-card">
            <strong>Ayush Panwar</strong><br />
            📧 <a href="mailto:Ayush@example.com">Ayush@example.com</a><br />
            🔗 <a href="https://www.linkedin.com/in/Ayush" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            📸 <a href="https://www.instagram.com/ayush" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <div className="member-card">
            <strong>Siddharth Pathak </strong><br />
            📧 <a href="mailto:siddhart@example.com">siddharth@example.com</a><br />
            🔗 <a href="https://www.linkedin.com/in/siddharth" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            📸 <a href="https://www.instagram.com/siddharth" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="company-section">
        <p>📧 <a href="mailto:teamhomecook@food.com">teamhomecook@food.com</a></p>
        <p>🌐 <a href="https://www.homecookfood.com" target="_blank" rel="noopener noreferrer">www.homecookfood.com</a></p>
      </div>
    </footer>
  );
}

export default Footer;
