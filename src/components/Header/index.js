import React, { useRef, useState, memo } from 'react';
import { NavLink, Link } from 'components/Link';
import { Transition } from 'react-transition-group';
import Icon from 'components/Icon';
import NavToggle from './NavToggle';
import { useWindowSize, useAppContext } from 'hooks';
import { navLinks, socialLinks } from './navData';
import { reflow } from 'utils/transition';
import { msToNum } from 'utils/style';
import { tokens } from 'app/theme';
import { blurOnMouseUp } from 'utils/focus';
import './index.css';

const HeaderIcons = () => (
  <div className="header__nav-icons">
    {socialLinks.map(({ label, url, icon }) => (
      <a
        key={label}
        className="header__nav-icon-link"
        aria-label={label}
        href={url}
        onMouseUp={blurOnMouseUp}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="header__nav-icon" icon={icon} />
      </a>
    ))}
  </div>
);

function Header(props) {
  const { menuOpen, dispatch } = useAppContext();
  const { location } = props;
  const [hashKey, setHashKey] = useState();
  const headerRef = useRef();
  
  const handleNavClick = () => {
    setHashKey(Math.random().toString(32).substr(2, 8));
  };

  const handleMobileNavClick = () => {
    handleNavClick();
    if (menuOpen) dispatch({ type: 'toggleMenu' });
  };

  const isMatch = ({ match, hash = '' }) => {
    if (!match) return false;
    return `${match.url}${hash}` === `${location.pathname}${location.hash}`;
  };

  return (
    <header className="header" ref={headerRef}>
      <Link
        className="header__nav-icon-link"
        to={{ pathname: '/', hash: '#intro', state: hashKey }}
        aria-label="Nilay Sharma, Software Developer"
        onClick={handleMobileNavClick}
        onMouseUp={blurOnMouseUp}
      >
        <Icon className="header__nav-icon" icon='home'/>
      </Link>
      <NavToggle onClick={() => dispatch({ type: 'toggleMenu' })} menuOpen={menuOpen} />
      <nav className="header__nav">
        <div className="header__nav-list">
          {navLinks.map(({ label, pathname, hash }) => (
            <NavLink
              exact
              className="header__nav-link"
              activeClassName="header__nav-link--active"
              isActive={match => isMatch({ match, hash })}
              onClick={handleNavClick}
              key={label}
              to={{ pathname, hash, state: hashKey }}
              onMouseUp={blurOnMouseUp}
            >
              {label}
            </NavLink>
          ))}
        </div>
        <HeaderIcons />
      </nav>
      <Transition
        mountOnEnter
        unmountOnExit
        in={menuOpen}
        timeout={{ enter: 0, exit: msToNum(tokens.base.durationL) }}
        onEnter={reflow}
      >
        {status => (
          <nav className={`header__mobile-nav header__mobile-nav--${status}`}>
            {navLinks.map(({ label, pathname, hash }, index) => (
              <NavLink
                className={`header__mobile-nav-link header__mobile-nav-link--${status}`}
                activeClassName="header__mobile-nav-link--active"
                key={label}
                onClick={handleMobileNavClick}
                to={{ pathname, hash, state: hashKey }}
                onMouseUp={blurOnMouseUp}
                style={{
                  transitionDelay: `${
                    Number(tokens.base.durationS.replace('ms', '')) + index * 50
                  }ms`,
                }}
              >
                {label}
              </NavLink>
            ))}
            <HeaderIcons />
          </nav>
        )}
      </Transition>
    </header>
  );
}

export default memo(Header);
