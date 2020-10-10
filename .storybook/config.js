import { configure, addParameters, addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import React, { Fragment, useEffect } from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { theme } from '../src/app/theme';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GothamBook from '../src/assets/fonts/gotham-book.woff2';
import GothamMedium from '../src/assets/fonts/gotham-medium.woff2';
import { fontStyles, globalStyles, AppContext } from '../src/app';
import '../src/app/index.css';

addParameters({
  options: {
    theme: {
      ...themes.dark,
      brandImage: 'https://avatars3.githubusercontent.com/u/20474441?s=460&u=f08dab216e2319f442fabb0cc9a27c6abc0626a1&v=4',
      brandTitle: 'Nilay Sharma Components',
      brandUrl: 'https://github.com/sharmanilay',
    },
  },
});

const themeKeys = {
  Dark: 'dark',
  Light: 'light',
};

addDecorator(story => {
  const content = story();
  const themeKey = select('Theme', themeKeys, 'dark');
  const currentTheme = theme[themeKey];

  useEffect(() => {
    document.body.setAttribute('class', themeKey);
  }, [themeKey]);

  return (
    <HelmetProvider>
      <Fragment>
        <Helmet>
          <link rel="preload" href={GothamBook} as="font" crossorigin="crossorigin" />
          <link rel="preload" href={GothamMedium} as="font" crossorigin="crossorigin" />
          <style>{fontStyles}</style>
          <style>{globalStyles}</style>
        </Helmet>
        <AppContext.Provider state={{ theme: currentTheme }}>
          <div id="storyRoot" key={themeKey}>
            {content}
          </div>
        </AppContext.Provider>
      </Fragment>
    </HelmetProvider>
  );
});

addDecorator(withKnobs);
addDecorator(withA11y);
configure(require.context('../src', true, /\.stories\.js$/), module);
