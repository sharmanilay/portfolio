import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectBackground, ProjectHeader, ProjectSection,
  ProjectSectionContent, ProjectImage, ProjectSectionHeading, ProjectSectionColumns,
  SidebarImageText, SidebarImage
} from 'components/ProjectLayout';
import { useScrollRestore } from 'hooks';
import { media } from 'utils/style';
import prerender from 'utils/prerender';
import modernBackground from 'assets/modern-background.png';
import modernBackgroundLarge from 'assets/modern-background-large.png';
import modernBackgroundPlaceholder from 'assets/modern-background-placeholder.png';
import modern from 'assets/modern.png';
import modernLarge from 'assets/modern-large.png';
import modernPlaceholder from 'assets/modern-placeholder.png';
import modernBranding from 'assets/modern-branding.png';
import modernBrandingLarge from 'assets/modern-branding-large.png';
import modernBrandingPlaceholder from 'assets/modern-branding-placeholder.png';
import modernLanding from 'assets/modern-landing.png';
import modernLandingLarge from 'assets/modern-landing-large.png';
import modernLandingPlaceholder from 'assets/modern-landing-placeholder.png';

const title = 'Project Modern';
const description = 'This is currently a WIP.';
const roles = [
  'Visual Identity',
  'UX and UI Design',
  'Full-stack Development',
];

function ProjectModern() {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description }]}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={`${modernBackground} 1000w, ${modernBackgroundLarge} 1920w`}
          placeholder={modernBackgroundPlaceholder}
          entered={!prerender}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://projectmodern.gg"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${modern} 800w, ${modernLarge} 1440w`}
                placeholder={modernPlaceholder}
                sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
                alt="Landing screen of the DevTech Tools website."
              />
            </ProjectImage>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <SidebarImageText>
              <ProjectSectionHeading>Visual Identity</ProjectSectionHeading>
            </SidebarImageText>
            <SidebarImage
              srcSet={`${modernBranding} 400w, ${modernBrandingLarge} 898w`}
              placeholder={modernBrandingPlaceholder}
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 100vw, 50vw`}
              alt="The DevTech Tools color palette and logo, featuring pipelines as electronic traces."
            />
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProgressiveImage
              srcSet={`${modernLanding} 800w, ${modernLandingLarge} 1440w`}
              placeholder={modernLandingPlaceholder}
              alt="A screenshot of the landing page in production."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionHeading>Full project coming soon...</ProjectSectionHeading>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}

export default ProjectModern;
