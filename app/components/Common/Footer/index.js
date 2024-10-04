/**
 *
 * Footer
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Newsletter from '../../../containers/Newsletter';

const Footer = () => {
  const infoLinks = [
    { id: 0, name: 'Contact Us', to: '/contact' },
    { id: 1, name: 'Sell With Us', to: '/sell' },
    { id: 2, name: 'Submit Custom Order', to: '/contact' }
  ];

  const footerBusinessLinks = (
    <ul className='support-links'>
      <li className='footer-link'>
        <Link to='/dashboard'>Account Details</Link>
      </li>
      <li className='footer-link'>
        <Link to='/dashboard/orders'>Orders</Link>
      </li>
    </ul>
  );

  const footerLinks = infoLinks.map(item => (
    <li key={item.id} className='footer-link'>
      <Link key={item.id} to={item.to}>
        {item.name}
      </Link>
    </li>
  ));

  return (
    <footer className='footer'>
      <Container>
        <div className='footer-content'>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='footer-text-uppercase'>Customer Service</h3>
            </div>
            <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='footer-text-uppercase'>Links</h3>
            </div>
            <div className='block-content'>
              <ul>{footerLinks}</ul>
            </div>
          </div>
          <div className='footer-block'>
            <div className='block-title'>
              <h3 className='footer-text-uppercase'>Newsletter</h3>
              <Newsletter/>
            </div>
          </div>
        </div>
        <div className='footer-copyright'>
          <span>Shop S6, Ground Floor, Veteran House Next to Bihi Towers, Moi Avenue, Nairobi-Kenya</span>
        </div>
        <div className='footer-copyright'>
          <span>© {new Date().getFullYear()} Young Computer Store</span>
        </div>
        <ul className='footer-social-item'>
          <li>
            <a href='https://web.facebook.com/youngcompsystem' rel='noreferrer noopener' target='_blank'>
              <span className='facebook-icon'/>
            </a>
          </li>
          <li>
            <a href='https://www.instagram.com/young_computers_ke' rel='noreferrer noopener' target='_blank'>
              <span className='instagram-icon'/>
            </a>
          </li>
          {/*<li>*/}
          {/*  <a href='/#pinterest' rel='noreferrer noopener' target='_blank'>*/}
          {/*    <span className='pinterest-icon'/>*/}
          {/*  </a>*/}
          {/*</li>*/}
          <li>
            <a href='https://x.com/young_computer' rel='noreferrer noopener' target='_blank'>
              <span className='twitter-icon'/>
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
