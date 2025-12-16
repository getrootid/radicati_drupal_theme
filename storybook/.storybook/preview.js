/** @type { import('@storybook/server-webpack5').Preview } */
const preview = {
  parameters: {
    server: {
      url: `https://radicati-drupal.lndo.site/storybook/stories/render`
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
