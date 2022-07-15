import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Link } from 'components/Link';
import Anchor from 'components/Anchor';
import { Button } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import Image from 'components/Image';
import Section from 'components/Section';
import { reflow } from 'utils/transition';
import { media } from 'utils/style';
import profileImg from 'assets/profile1.png';
import profileImgLarge from 'assets/profile1.png';
import profileImgPlaceholder from 'assets/profile1.png';
import './Profile.css';

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <h2
      className={classNames('profile__title', `profile__title--${status}`)}
      id={titleId}
    >
      <DecoderText text="Hi" start={status !== 'exited'} offset={140} />
    </h2>
    {/* <p className={classNames('profile__description', `profile__description--${status}`)}>
      I’m Nilay Sharma. Currently, I am based in Mumbai, working as Software Developer at{' '}
      <Anchor as={Link} to="/projects/dtt">
        Drip Capital
      </Anchor>
      . I have been developing web applications for about 3.5 years now(with 2 years of professional experience). 
      I am a quick learner and can learn new technologies on the go. 
    </p> */}
    <p className={classNames('profile__description', `profile__description--${status}`)}>
      I'm' Software Engineer Skilled in{' '}
      <Anchor href="#about">
        React JS, Vue JS, React Native, NodeJS, MongoDB, Java, Ruby on Rails, Python,
        HTML, CSS, JavaScript.
      </Anchor>{' '}
      I have been developing web applications for about 6 years now(with 4 years of
      professional experience) I am a quick learner and can learn new technologies on the
      go.
    </p>
    <p className={classNames('profile__description', `profile__description--${status}`)}>
      In my spare time, I like to play guitar and{' '}
      <Anchor href="https://github.com/sharmanilay" target="_blank">
        experiment with new tech
      </Anchor>
      . I’m always interested in new projects, so feel free to drop me a line.
    </p>
  </Fragment>
);

function Profile({ id, visible, sectionRef }) {
  const titleId = `${id}-title`;

  return (
    <Section
      className="profile"
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible} timeout={0} onEnter={reflow}>
        {status => (
          <div className="profile__content">
            <div className="profile__column">
              <ProfileText status={status} titleId={titleId} />
              <Button
                secondary
                className={classNames('profile__button', `profile__button--${status}`)}
                as="a"
                status={status}
                target="_blank"
                href={'https://twitter.com/thenaamsake'}
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className="profile__column">
              <div className="profile__tag" aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <div
                  className={classNames(
                    'profile__tag-text',
                    `profile__tag-text--${status}`
                  )}
                >
                  About Me
                </div>
              </div>
              <div className="profile__image-wrapper">
                <Image
                  reveal
                  className={classNames('profile__image', `profile__image--${status}`)}
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt=""
                  width={480}
                  height={560}
                />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
}

export default Profile;
