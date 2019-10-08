import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import { useScrollToTop } from 'utils/hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectSection, ProjectSectionContent, ProjectImage,
  ProjectSectionHeading, ProjectBackground, ProjectHeader
} from 'components/Project';
import { media } from 'utils/style';
import backgroundDTT from 'assets/DTT/background-dtt.png';
import backgroundDTTLarge from 'assets/DTT/background-dtt-large.png';
import backgroundDTTPlaceholder from 'assets/DTT/background-dtt-placeholder.png';
import imageDevTechTools from 'assets/DTT/devtech-tools.png';
import imageDevTechToolsLarge from 'assets/DTT/devtech-tools-large.png';
import imageDevTechToolsPlaceholder from 'assets/DTT/devtech-tools-placeholder.png';

const prerender = navigator.userAgent === 'ReactSnap';

const title = 'A Tool for Everything';
const description = 'I worked as the design lead on a product of DevTech Tools. We focused on creating the best tool for learning developers.';
const roles = [
  'Art Direction',
  'Visual Identity',
  'UX and UI Design',
  'Front End Development',
  'Back End Development',
];

function ProjectDTT() {
  useScrollToTop();

  return (
    <React.Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description, }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${backgroundDTT} 1000w, ${backgroundDTTLarge} 1920w`}
          placeholder={backgroundDTTPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://devtechtools.com/"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${imageDevTechTools} 800w, ${imageDevTechToolsLarge} 1440w`}
                placeholder={imageDevTechToolsPlaceholder}
                sizes={`(max-width: ${media.mobile}) 500px, (max-width: ${media.tablet}) 800px, 1000px`}
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionHeading>Full project coming soon...</ProjectSectionHeading>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </React.Fragment>
  );
}

export default ProjectDTT;
