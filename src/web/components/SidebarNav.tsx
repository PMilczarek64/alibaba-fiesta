// src/components/SidebarNav.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme, alpha } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import type { NavItem } from "../nav";

type Props = {
  navigation: NavItem[];
  onNavigate: (to: string) => void;
  collapsed: boolean;
};

function normalizeSegment(seg?: string) {
  if (!seg) return "/";
  return seg.startsWith("/") ? seg : `/${seg}`;
}

export default function SidebarNav({ navigation, onNavigate, collapsed }: Props) {
  const location = useLocation();
  const theme = useTheme();

  const accentFrom = "#ffac47";
  const accentTo = "#ff448c";
  const accentGradient = `linear-gradient(135deg, ${accentFrom} 0%, ${accentTo} 100%)`;
  const hoverGradient = `linear-gradient(135deg, ${alpha(accentFrom, 0.10)}, ${alpha(accentTo, 0.06)})`;

  return (
    <List sx={{ p: 0, m: 0, width: "100%", boxSizing: "border-box" }}>
      {navigation.map((item, idx) => {
        if (item.kind === "header") {
          return !collapsed ? (
            <ListSubheader key={idx} sx={{ pl: 2 }}>
              {item.title}
            </ListSubheader>
          ) : (
            <Divider key={idx} sx={{ my: 1 }} />
          );
        }
        if (item.kind === "divider") return <Divider key={idx} />;

        const segPath = normalizeSegment((item as any).segment);
        const isActive = location.pathname === segPath;
        const iconColor = isActive ? "#fff" : accentTo;

        // wybieramy element ikony — jeśli brak, fallback
        const iconNode = (item as any).icon ?? <InsertDriveFileIcon />;

        if (collapsed) {
          return (
            <ListItem key={idx} disablePadding sx={{ display: "block" }}>
              <Tooltip title={item.title} placement="right">
                <ListItemButton
                  selected={isActive}
                  onClick={() => onNavigate(segPath)}
                  sx={{
                    px: 0,
                    justifyContent: "center",
                    height: 56,
                    ...(isActive && {
                      background: accentGradient,
                      color: "#fff",
                      "& .MuiListItemIcon-root": { color: "#fff" },
                    }),
                    "&:hover": {
                      background: hoverGradient,
                      "& .MuiListItemIcon-root": { color: accentFrom },
                    },
                    transition: "background 180ms ease",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 0, mr: 0, justifyContent: "center", color: iconColor }}>
                    {/* nie zmieniamy propsów ikony — MUI SvgIcon odziedziczy color */}
                    {iconNode}
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        }

        return (
          <ListItem key={idx} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={isActive}
              onClick={() => onNavigate(segPath)}
              sx={{
                px: 2,
                py: 1.25,
                color: theme.palette.text.secondary,
                ...(isActive && {
                  background: accentGradient,
                  color: "#fff",
                  "& .MuiListItemIcon-root": { color: "#fff" },
                  "& .MuiListItemText-root .MuiTypography-root": { color: "#fff" },
                }),
                "&:hover": {
                  background: hoverGradient,
                  color: theme.palette.text.primary,
                  "& .MuiListItemIcon-root": { color: accentFrom },
                },
                transition: "background 180ms ease, color 180ms ease",
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, mr: 2, justifyContent: "center", color: iconColor }}>
                {iconNode}
              </ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
