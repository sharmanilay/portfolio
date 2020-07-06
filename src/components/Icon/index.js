import React from 'react';
import { ReactComponent as IconLinkedIn } from 'assets/icons/linkedin.svg';
import { ReactComponent as IconCode } from 'assets/icons/code.svg';
import { ReactComponent as IconArrowDown } from 'assets/icons/arrow-down.svg';
import { ReactComponent as IconGithub } from 'assets/icons/github.svg';
import { ReactComponent as IconEmail } from 'assets/icons/email.svg';
import { ReactComponent as IconMenu } from 'assets/icons/menu.svg';
import { ReactComponent as IconArrowRight } from 'assets/icons/arrow-right.svg';
import { ReactComponent as IconChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as IconClose } from 'assets/icons/close.svg';
import { ReactComponent as IconSend } from 'assets/icons/send.svg';
import { ReactComponent as IconSlideLeft } from 'assets/icons/slide-left.svg';
import { ReactComponent as IconSlideRight } from 'assets/icons/slide-right.svg';
import { ReactComponent as IconPlay } from 'assets/icons/play.svg';
import { ReactComponent as IconPause } from 'assets/icons/pause.svg';

const icons = {
  linkedin: IconLinkedIn,
  github: IconGithub,
  email: IconEmail,
  menu: IconMenu,
  code: IconCode,
  arrowDown: IconArrowDown,
  arrowRight: IconArrowRight,
  chevronRight: IconChevronRight,
  close: IconClose,
  send: IconSend,
  slideRight: IconSlideRight,
  slideLeft: IconSlideLeft,
  play: IconPlay,
  pause: IconPause,
};

const Icon = ({ icon, style, className }) => {
  const IconComponent = icons[icon];

  return (
    <IconComponent aria-hidden style={style} className={className} />
  );
};

export default Icon;
