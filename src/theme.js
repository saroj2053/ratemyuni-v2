import { createSystem, defaultConfig } from "@chakra-ui/react";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: "Inter, system-ui, sans-serif",
        body: "Inter, system-ui, sans-serif",
      },
      colors: {
        brand: {
          50: "#E6F3FF",
          100: "#BAE3FF",
          200: "#7CC4FA",
          300: "#47A3F3",
          400: "#2B77E7",
          500: "#3182CE",
          600: "#2C5AA0",
          700: "#2A4365",
          800: "#1A365D",
          900: "#153E75",
        },
        teal: {
          50: "#E6FFFA",
          100: "#B2F5EA",
          200: "#81E6D9",
          300: "#4FD1C7",
          400: "#38B2AC",
          500: "#319795",
          600: "#2C7A7B",
          700: "#285E61",
          800: "#234E52",
          900: "#1D4044",
        },
        orange: {
          50: "#FFFAF0",
          100: "#FEEBC8",
          200: "#FBD38D",
          300: "#F6AD55",
          400: "#ED8936",
          500: "#DD6B20",
          600: "#C05621",
          700: "#9C4221",
          800: "#7B341E",
          900: "#652B19",
        },
      },
      components: {
        Button: {
          defaultProps: {
            colorScheme: "brand",
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
        },
      },
    },
  },
});
