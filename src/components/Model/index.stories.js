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

export const phone = () => (
  <StoryContainer fullWidth padding={32}>
    <Model
      enableControls
      cameraPosition={[0, 0, 6]}
      models={[{
        ...deviceModels.phone,
        texture: {
          large: phoneTextureLarge,
          medium: phoneTexture,
          placeholder: phoneTexturePlaceholder,
        },
      }]}
    />
  </StoryContainer>
);

export const laptop = () => (
  <StoryContainer fullWidth padding={32}>
    <Model
      enableControls
      cameraPosition={[0, 0, 6]}
      models={[{
        ...deviceModels.laptop,
        texture: {
          large: laptopTextureLarge,
          medium: laptopTexture,
          placeholder: laptopTexturePlaceholder,
        },
      }]}
    />
  </StoryContainer>
);
