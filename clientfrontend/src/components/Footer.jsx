import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px 0',
      textAlign: 'center',
      position: 'fixed',
      bottom: '0',
      width: '100%',
    }} className='mt-5'
    
    >
      <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
        
        {/* Footer Logo and Description */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#fff', fontSize: '1.5em', marginBottom: '10px' }}>Shop Cart</h2>
          <p style={{ color: '#ccc', fontSize: '0.9em' }}>
            Providing quality products and services since 2024. Your satisfaction is our priority.
          </p>
        </div>

        {/* Footer Navigation Links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
          <a href="/" style={{ color: '#ccc', textDecoration: 'none' }}>Home</a>
          <a href="/about" style={{ color: '#ccc', textDecoration: 'none' }}>About Us</a>
          <a href="/services" style={{ color: '#ccc', textDecoration: 'none' }}>Services</a>
          <a href="/contact" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</a>
          <a href="/faq" style={{ color: '#ccc', textDecoration: 'none' }}>FAQ</a>
        </div>

        {/* Social Media Links */}
        <div style={{ marginBottom: '20px' }}>
          <a href="https://facebook.com" style={{ color: '#ccc', textDecoration: 'none', margin: '0 10px' }}>Facebook</a>
          <a href="https://twitter.com" style={{ color: '#ccc', textDecoration: 'none', margin: '0 10px' }}>Twitter</a>
          <a href="https://instagram.com" style={{ color: '#ccc', textDecoration: 'none', margin: '0 10px' }}>Instagram</a>
          <a href="https://linkedin.com" style={{ color: '#ccc', textDecoration: 'none', margin: '0 10px' }}>LinkedIn</a>
        </div>

        {/* Footer Contact Information */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#ccc', fontSize: '0.9em' }}>123 Business Road, City, Country</p>
          <p style={{ color: '#ccc', fontSize: '0.9em' }}>Email: info@shopcart.com | Phone: +123 456 7890</p>
        </div>

        {/* Footer Copyright */}
        <div style={{ marginTop: '20px', borderTop: '1px solid #444', paddingTop: '10px' }}>
          <p style={{ color: '#ccc', fontSize: '0.8em' }}>&copy; 2024 ShopCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
