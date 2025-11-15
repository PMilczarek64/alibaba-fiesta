// src/components/TopBar.tsx
import React from "react";
import { alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";

import logo from "../assets/turban2.png";
import avatarImg from "../assets/user-avatar.png";

type Props = {
  onUploadClick?: () => void;
  onToggleTheme?: () => void;
  isDark?: boolean;
  onNavigate?: (to: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

export default function TopBar({
  onUploadClick,
  onToggleTheme,
  isDark = false,
  onNavigate,
  collapsed,
  setCollapsed,
}: Props) {
  // state hook - ok (inside component)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // === COLOURS / GRADIENT (zdefiniowane wewnątrz komponentu) ===
  // Używamy dokładnych HEX, bez polegania na theme.palette,
  // by uniknąć „modyfikacji” kolorów przez MUI.
  const accentFrom = "#ffac47";
  const accentTo = "#ff448c";
  const accentGradient = `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`;
  const hoverGradient = `linear-gradient(135deg, ${alpha(accentFrom, 0.12)}, ${alpha(accentTo, 0.08)})`;

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
      sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Toggle button for collapse */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label={collapsed ? "expand sidebar" : "collapse sidebar"}
          onClick={() => setCollapsed(!collapsed)}
          sx={{ mr: 1 }}
        >
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={logo} alt="Logo Alibaba-fiesta" style={{ width: 28, height: 28 }} />
          <Typography variant="h6" component="div" sx={{ lineHeight: 1 }}>
            alibaba-fiesta
          </Typography>
        </Box>

        <Box sx={{ ml: "auto", display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<UploadFileIcon />}
            size="small"
            onClick={onUploadClick}
            sx={{
              background: accentGradient,
              color: accentGradient,
              boxShadow: "none",
              "&:hover": {
                background: hoverGradient,
                boxShadow: "none",
              },
            }}
          >
            Upload
          </Button>

          <Tooltip title="Toggle theme">
            <IconButton onClick={onToggleTheme} size="small" aria-label="toggle theme" sx={{color: accentTo, width: 40, height: 40}}>
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
              <Avatar src={avatarImg} alt="User avatar" sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onNavigate?.("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                onNavigate?.("/settings");
              }}
            >
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAnchorEl(null);
                /* logout */
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
