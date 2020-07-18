import React from 'react';
import Model from 'components/Model';
import { StoryContainer } from '../../../.storybook/StoryContainer';
import deviceModels from './deviceModels';
import phoneTexture from 'assets/mystgang-mobile.png';
import phoneTextureLarge from 'assets/mystgang-mobile-large.png';
import phoneTexturePlaceholder from 'assets/mystgang-mobile-placeholder.png';
import laptopTexture from 'assets/dtt.png';
import laptopTextureLarge from 'assets/dtt-large.png';
import laptopTexturePlaceholder from 'assets/dtt-placeholder.png';

export default {
  title: 'Model',
};

const modelStyle = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 };

export const phone = () => (
  <StoryContainer fullWidth padding={32}>
    <Model
      style={modelStyle}
      cameraPosition={[0, 0, 8]}
      alt="Phone Model"
      models={[{
        ...deviceModels.phone,
        texture: {
          src: phoneTexture,
          srcSet: `${phoneTexture} 800w, ${phoneTextureLarge} 1440w`,
          placeholder: phoneTexturePlaceholder,
        },
      }]}
    />
  </StoryContainer>
);

export const laptop = () => (
  <StoryContainer fullWidth padding={32}>
    <Model
      style={modelStyle}
      cameraPosition={[0, 0, 8]}
      alt="Laptop Model"
      models={[{
        ...deviceModels.laptop,
        texture: {
          src: laptopTexture,
          srcSet: `${laptopTexture} 800w, ${laptopTextureLarge} 1440w`,
          placeholder: laptopTexturePlaceholder,
        },
      }]}
    />
  </StoryContainer>
);
