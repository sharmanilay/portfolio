import React, { Fragment } from 'react';
import classNames from 'classnames';
import { Transition } from 'react-transition-group';
import { Helmet } from 'react-helmet-async';
import { Button } from 'components/Button';
import { Link } from 'components/Link';
import DecoderText from 'components/DecoderText';
import { reflow } from 'utils/transition';
import notFound from 'assets/notfound.mp4';
import notFoundPoster from 'assets/notfound.jpg';
import './index.css';

function NotFound() {
  return (
    <section className="page-404">
      <Helmet>
        <title tag="title">404 | Not Found</title>
        <meta name="description" content="404 page not found. This page doesn't exist" />
      </Helmet>
      <Transition appear in={true} timeout={0} onEnter={reflow}>
        {status => (
          <Fragment>
            <div className="page-404__details">
              <div className="page-404__text">
                <h1 className={classNames('page-404__title', `page-404__title--${status}`)}>404</h1>
                <h2
                  aria-hidden
                  className={classNames('page-404__subheading', `page-404__subheading--${status}`)}
                >
                  <DecoderText
                    text="Glitch in the Matrix"
                    start={status !== 'exited'}
                    offset={100}
                  />
                </h2>
                <p
                  className={classNames(
                    'page-404__description',
                    `page-404__description--${status}`
                  )}
                >
                  You are lost
                </p>
                <Button
                  secondary
                  iconHoverShift
                  className={classNames('page-404__button', `page-404__button--${status}`)}
                  as={Link}
                  to="/"
                  icon="chevronRight"
                >
                  Wake up Neo. Go Back to homepage
                </Button>
              </div>
            </div>

            <div
              className={classNames(
                'page-404__video-container',
                `page-404__video-container--${status}`
              )}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className={classNames('page-404__video', `page-404__video--${status}`)}
                poster={notFoundPoster}
              >
                <source src={notFound} type="video/mp4" />
              </video>
            </div>
          </Fragment>
        )}
      </Transition>
    </section>
  );
}

export default NotFound;
