import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  colors: {
    blue: [
      "#e9efff",
      "#d1d9ff",
      "#a1b0fb",
      "#6e85f6",
      "#4461F2",
      "#2748f0",
      "#163df0",
      "#052fd6",
      "#0029c0",
      "#0023aa"
    ]
  },
  primaryColor: 'blue',
  primaryShade: 4,
  components: {
    Button: {
      defaultProps: {
        color: 'blue.4'
      }
    },
    TextInput: {
      defaultProps: {
        size: 'md'
      }
    },
    PasswordInput: {
      defaultProps: {
        size: 'md'
      }
    }
  }
});
