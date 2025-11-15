// src/layouts/DashboardLayout.tsx
import React, { ChangeEvent } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";

import TopBar from "../components/TopBar";
import SidebarNav from "../components/SidebarNav";
import { Uploader } from "../components/Uploader";

type FileHandler = (f: File) => void;
type InputEventHandler = (event: ChangeEvent<HTMLInputElement>, userId: number) => Promise<void> | void;
type MaybeUploadHandler = FileHandler | InputEventHandler;

export default function DashboardLayout(props: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  currentUserId: number;
  files: string[];
  file: File | null;
  isUploading: boolean;
  uploadStatus?: string | null;
  handleUpload: MaybeUploadHandler;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>, fileId: string) => Promise<void> | void;
  loginStatus?: string;
  toggleColorMode?: () => void;
  handleLogin: (username: string, password: string) => void;
}) {
  const {
    collapsed,
    setCollapsed,
    currentUserId,
    files,
    file,
    isUploading,
    uploadStatus,
    handleUpload,
    handleDelete,
    loginStatus,
  } = props;

  const navigate = useNavigate();
  const SIDEBAR_WIDTH = collapsed ? 72 : 240;

  // adapter: Uploader expects (event, userId)
  const uploaderAdapter = async (event: ChangeEvent<HTMLInputElement>, userId: number) => {
    const fileFromInput = event?.target?.files?.[0] ?? null;
    if (!fileFromInput) return;
    const fn = handleUpload as MaybeUploadHandler | undefined;
    if (!fn) return;
    if (typeof fn === "function") {
      if ((fn as Function).length === 1) {
        (fn as FileHandler)(fileFromInput);
        return;
      }
      const maybePromise = (fn as InputEventHandler)(event, userId);
      if (maybePromise && typeof (maybePromise as Promise<void>).then === "function") {
        await maybePromise;
      }
    }
  };

  const NAV: any[] = [
    { kind: "page", segment: "/", title: "Dashboard", icon: undefined },
    { kind: "header", title: "Files" },
    { kind: "page", segment: "/files", title: "Files", icon: undefined },
    { kind: "page", segment: "/upload", title: "Upload", icon: undefined },
    { kind: "divider" },
    { kind: "header", title: "Administration" },
    { kind: "page", segment: "/settings", title: "Settings", icon: undefined },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <TopBar
        onUploadClick={() => navigate("/upload")}
        onToggleTheme={() => props.toggleColorMode?.()}
        isDark={false}
        onNavigate={(to) => navigate(to)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      {/* ASIDE - sidebar jest siblings z main (nie wewnątrz Container) */}
      <Box
        component="aside"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          boxSizing: "border-box",
          p: 0,
          m: 0,
          borderRight: (t) => `1px solid ${t.palette.divider}`,
          bgcolor: "background.paper",
          position: "relative",
        }}
      >
        <Box sx={{ position: "sticky", top: 0, overflow: "auto" }}>
          <SidebarNav navigation={NAV} onNavigate={(to) => navigate(to)} collapsed={collapsed} />
        </Box>
      </Box>

      {/* MAIN */}
      <Box component="main" sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* spacer odpowiadający AppBar: użyj Toolbar */}
        <Toolbar />

        {/* <-- TUTAJ JEDEN Container dla całej zawartości (ważne) */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route
              path="/"
              element={
                /* Używaj Box/Paper w route'ach, a nie dodatkowych Containerów */
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Welcome
                  </Typography>

                  {currentUserId !== 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Uploader handleUpload={uploaderAdapter} userId={currentUserId} />
                    </Box>
                  )}

                  <Typography variant="body1">Status: {loginStatus}</Typography>

                  {currentUserId !== 0 && (
                    <Box sx={{ mt: 2 }}>
                      {file && <Typography>Selected: {file.name}</Typography>}
                      {isUploading && <Typography>Uploading...</Typography>}
                      {uploadStatus && <Typography>{uploadStatus}</Typography>}
                    </Box>
                  )}

                  {files.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                      <Typography variant="h6">File List</Typography>
                      <Box component="ul" sx={{ pl: 2 }}>
                        {files.map((f) => (
                          <li key={f}>
                            {f}{" "}
                            <Button size="small" onClick={(e) => handleDelete(e as any, f)}>
                              Delete
                            </Button>
                          </li>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>
              }
            />

            <Route
              path="/dashboard"
              element={
                <Box>
                  <Typography variant="h4">Dashboard</Typography>
                  <Typography>Here you can add dashboard widgets.</Typography>
                </Box>
              }
            />

            <Route
              path="/upload"
              element={
                <Box>
                  <Typography variant="h4" gutterBottom>
                    Upload
                  </Typography>
                  {currentUserId !== 0 ? (
                    <Uploader handleUpload={uploaderAdapter} userId={currentUserId} />
                  ) : (
                    <Typography>Please login to upload files.</Typography>
                  )}
                </Box>
              }
            />

            <Route
              path="/files"
              element={
                <Box>
                  <Typography variant="h4">Files</Typography>
                  {files.length === 0 ? (
                    <Typography>No files yet</Typography>
                  ) : (
                    <Box component="ul" sx={{ pl: 2 }}>
                      {files.map((f) => (
                        <li key={f}>
                          {f} <Button size="small" onClick={(e) => handleDelete(e as any, f)}>Delete</Button>
                        </li>
                      ))}
                    </Box>
                  )}
                </Box>
              }
            />

            <Route
              path="/settings"
              element={
                <Box>
                  <Typography variant="h4">Settings</Typography>
                  <Typography>Settings page content here.</Typography>
                </Box>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
