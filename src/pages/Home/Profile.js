import React, { Fragment, memo } from 'react';
import styled, { css, keyframes } from 'styled-components/macro';
import { Transition } from 'react-transition-group';
import Anchor from 'components/Anchor';
import { Link } from 'components/Link';
import { RouterButton } from 'components/Button';
import DecoderText from 'components/DecoderText';
import Divider from 'components/Divider';
import ProgressiveImage from 'components/ProgressiveImage';
import { sectionPadding, media } from 'utils/style';
import { reflow } from 'utils/transition';
import profileImg from 'assets/profile.png';
import profileImgLarge from 'assets/profile-large.png';
import profileImgPlaceholder from 'assets/profile-placeholder.png';

const ProfileText = ({ status, titleId }) => (
  <Fragment>
    <ProfileTitle status={status} id={titleId}>
      <DecoderText
        text="Hi"
        start={status !== 'exited'}
        offset={140}
      />
    </ProfileTitle>
    <ProfileDescription status={status}>
      I’m Cody. Currently, I am based in Austin, working as the lead designer at <Anchor as={Link} to="/projects/dtt">DevTechTools</Anchor>. I am a designer, full-stack developer, and creator of web & mobile solutions with a focus on motion and user experience.
    </ProfileDescription>
    <ProfileDescription status={status}>
      In my spare time, I like to play guitar and <Anchor href="https://codepen.io/cbenn" target="_blank">experiment with new tech</Anchor>. I’m always interested in new projects, so feel free to drop me a line.
    </ProfileDescription>
  </Fragment>
);

function Profile(props) {
  const { id, visible, sectionRef } = props;
  const titleId = `${id}-title`;

  return (
    <ProfileSection
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition
        in={visible}
        timeout={0}
        onEnter={reflow}
      >
        {status => (
          <ProfileContent>
            <ProfileColumn>
              <ProfileText status={status} titleId={titleId} />
              <ProfileButton
                secondary
                status={status}
                to="/contact"
                icon="send"
              >
                Send me a message
              </ProfileButton>
            </ProfileColumn>
            <ProfileColumn>
              <ProfileTag aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={status !== 'entered'}
                  collapseDelay={1000}
                />
                <ProfileTagText status={status}>About Me</ProfileTagText>
              </ProfileTag>
              <ProfileImage
                reveal
                delay={100}
                visible={visible}
                placeholder={profileImgPlaceholder}
                srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                sizes={`(max-width: ${props => props.theme.mobile}px) 100vw, 480px`}
                alt=""
                width={480}
                height={560}
              />
            </ProfileColumn>
          </ProfileContent>
        )}
      </Transition>
    </ProfileSection>
  );
}

const ProfileSection = styled.section`
  width: 100vw;
  min-height: 100vh;
  margin-top: 60px;
  margin-bottom: 40px;
  padding-top: 60px;
  padding-right: 80px;
  padding-bottom: 40px;
  padding-left: 220px;
  display: flex;
  justify-content: center;
  ${sectionPadding}

  &:focus {
    outline: none;
  }

  @media (min-width: ${media.desktop}px) {
    padding-left: 120px;
  }

  @media (max-width: ${media.tablet}px) {
    padding-top: 50px;
    padding-right: 80px;
    padding-left: 160px;
    height: auto;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  @media (max-width: ${media.mobile}px) {
    margin-top: 0;
    padding-top: 90px;
    padding-left: 25px;
    padding-right: 25px;
    overflow-x: hidden;
  }

  @media (max-width: ${media.mobile}px), (max-height: ${media.mobile}px) {
    padding-right: var(--spaceOuter);
    padding-left: var(--spaceOuter);
  }

  @media ${media.mobileLS} {
    padding-right: var(--space4XL);
    padding-left: var(--space4XL);
  }
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 44% 48%;
  grid-column-gap: 8%;
  max-width: var(--maxWidthL);
  width: 100%;

  @media (max-width: ${media.tablet}px) {
    max-width: 600px;
  }

  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 100%;
  }
`;

const ProfileColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 40px;
  transform: translate3d(0, 0, 0);
`;

const ProfileTitle = styled.h2`
  font-size: var(--fontSizeH2);
  font-weight: var(--fontWeightMedium);
  color: var(--colorTextTitle);
  white-space: nowrap;
  margin: 0 0 var(--spaceL) 0;
  opacity: ${props => props.status === 'entered' ? 1 : 0};
  transition: opacity var(--durationXL) ease var(--durationM);

  @media (max-width: ${media.mobile}px) {
    margin-bottom: var(--spaceXL);
  }
`;

const ProfileDescription = styled.p`
  font-size: var(--fontSizeBodyL);
  line-height: var(--lineHeightBody);
  margin: 0 0 var(--spaceXL) 0;
  opacity: 0;
  transition: opacity var(--durationXL) ease var(--durationL);

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}
`;

const ProfileTag = styled.div`
  margin-top: 220px;
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: var(--space4XL) 1fr;
  grid-gap: 12px;
  align-items: center;

  @media (max-width: ${media.tablet}px) {
    margin-top: 30px;
  }
`;

const ProfileTagText = styled.div`
  font-size: var(--fontSizeBodyS);
  font-weight: var(--fontWeightMedium);
  color: rgb(var(--rgbPrimary));
  transform: translateX(calc(var(--spaceM) * -1));
  opacity: 0;
  transition-property: opacity, transform;
  transition-timing-function: var(--bezierFastoutSlowin);
  transition-duration: var(--durationM);
  transition-delay: 1.3s;

  ${props => props.status === 'entered' && css`
    transform: translateX(0);
    opacity: 1;
  `}
`;

const ImageReveal = keyframes`
  0% {
    background: none;
  }
  100% {
    background: rgb(var(--rgbBackgroundLight));
  }
`;

const ProfileImage = styled(ProgressiveImage)`
  height: auto;
  max-width: 100%;
  width: 960px;

  ${props => props.visible && css`
    animation: var(--durationM) ${ImageReveal} 1.4s forwards;
    background: rgb(var(--rgbBackgroundLight));
    transition-duration: var(--durationM);
    transition-property: background;
    transition-timing-function: var(--bezierFastoutSlowin);
  `}
`;

const ProfileButton = styled(RouterButton)`
  opacity: 0;
  transition: opacity var(--durationXL) ease var(--durationL);

  ${props => props.status === 'entered' && css`
    opacity: 1;
  `}
`;

export default memo(Profile);
