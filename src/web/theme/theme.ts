// src/theme/theme.ts
import { createTheme } from "@mui/material/styles";

const ACCENT_FROM = "#ffac47";
const ACCENT_TO = "#ff448c";
const ACCENT_GRADIENT = `linear-gradient(135deg, ${ACCENT_FROM} 0%, ${ACCENT_TO} 100%)`;

export const theme = createTheme({
  palette: {
    primary: {
      main: ACCENT_TO,
    },
    secondary: {
      main: ACCENT_FROM,
    },
  },

  components: {
    // globalne zmienne CSS udostępniane przez CssBaseline
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--brand-accent-gradient": ACCENT_GRADIENT,
          "--brand-accent-from": ACCENT_FROM,
          "--brand-accent-to": ACCENT_TO,
        },
      },
    },

    // AppBar: gradient tła
    MuiAppBar: {
      styleOverrides: {
        colorDefault: {
          background: ACCENT_GRADIENT,
          color: "#fff",
        },
      },
    },

    // Buttons primary - gradient background
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          background: ACCENT_GRADIENT,
          color: "#fff",
          boxShadow: "none",
          "&:hover": {
            filter: "brightness(0.92)",
            boxShadow: "none",
          },
        },
      },
    },

    // SVG ICON - domyślny kolor akcentu (używają go komponenty MUI)
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: ACCENT_TO,
        },
      },
    },

    // Sidebar / ListItemButton - selected/hover states
    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: "background 200ms ease, color 200ms ease",

          "&.Mui-selected": {
            background: ACCENT_GRADIENT,
            color: "#fff",
            "& .MuiListItemIcon-root": {
              color: "#fff !important",
            },
            "& .MuiListItemText-primary": {
              color: "#fff !important",
            },
          },

          "&:hover": {
            background:
              "linear-gradient(135deg, rgba(255,196,120,0.12), rgba(255,68,140,0.08))",
          },
        },
      },
    },

    // ListItemIcon - globalny wygląd ikon w listach/sidebarze
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: ACCENT_TO,
          minWidth: 40,
          transition: "color 200ms ease",

          // ikona zmienia kolor przy hover elementu listy
          ".MuiListItemButton-root:hover &": {
            color: ACCENT_FROM,
          },

          // ikona gdy element jest wybrany — biała
          ".Mui-selected &": {
            color: "#fff",
          },
        },
      },
    },

    // Avatar - delikatne obramowanie akcentowe
    MuiAvatar: {
      styleOverrides: {
        root: {
          border: `2px solid ${ACCENT_FROM}`,
        },
      },
    },
  },
});

export default theme;
