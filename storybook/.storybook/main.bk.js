

/** @type { import('@storybook/server-webpack5').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.stories.@(json|yaml|yml)"
  ],
  "addons": [
    "@storybook/addon-webpack5-compiler-swc"
  ],
  "framework": {
    "name": "@storybook/server-webpack5",
    "options": {}
  }
};
export default config;