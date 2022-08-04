import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

// https://storybook.js.org/docs/react/essentials/viewport
const customViewports = {
  xs: {
    name: "XS",
    styles: {
      width: "480px",
      height: "600px",
    },
  },
  s: {
    name: "S",
    styles: {
      width: "640px",
      height: "801px",
    },
  },
  m: {
    name: "M",
    styles: {
      width: "960px",
      height: "700px",
    },
  },
  l: {
    name: "L",
    styles: {
      width: "1200px",
      height: "800px",
    },
  },
  xl: {
    name: "XL",
    styles: {
      width: "1400px",
      height: "900px",
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
      ...customViewports,
    },
  },
};
