import React from 'react';
import Anchor from 'components/Anchor';
import './index.css';

const Footer = () => (
  <footer className="footer">
    <span className="footer__date">
      {`© 2016-${new Date().getFullYear()} `}
    </span>
    <Anchor className="footer__link" secondary href="/humans.txt">
      Nilay Sharma
    </Anchor>
  </footer>
);

export default Footer;
