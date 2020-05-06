import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import ProgressiveImage from 'components/ProgressiveImage';
import { useScrollRestore } from 'hooks';
import Footer from 'components/Footer';
import {
  ProjectContainer, ProjectHeader, ProjectSection, ProjectSectionContent,
  ProjectImage, ProjectSectionHeading, 
} from 'components/ProjectLayout';
import { media } from 'utils/style';
import flowy from './assets/flowy.png';
import flowyLarge from './assets/flowy-large.png';
import flowyPlaceholder from './assets/flowy-placeholder.png';

const title = 'ES6-Flowy';
const description = 'The minimal JavaScript library to create flowcharts.';
const roles = [
  'Product Design',
  'UX and UI Design',
  'DevOps and Front-end Development',
];

function Flowy() {
  useScrollRestore();

  return (
    <Fragment>
      <Helmet
        title={`Projects | ${title}`}
        meta={[{ name: 'description', content: description }]}
      />
      <ProjectContainer>
        <ProjectHeader
          title={title}
          description={description}
          url="https://es6-flowy.codyb.co"
          linkLabel="Launch Demo"
          roles={roles}
        />
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectImage>
              <ProgressiveImage
                reveal
                srcSet={`${flowy} 800w, ${flowyLarge} 1440w`}
                placeholder={flowyPlaceholder}
                sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
                alt="A screenshot of a the drag-and-drop interface powered by es6-flowy."
              />
            </ProjectImage>
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

export default Flowy;
