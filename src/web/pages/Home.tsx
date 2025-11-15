import { Container, Stack, Typography, Paper, Button, Chip } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ pt: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">Welcome to Files Manager</Typography>
        <Typography color="text.secondary">
          This dashboard is a starter layout for managing and uploading files. Use the sidebar to navigate.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Paper elevation={2} sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6">Quick actions</Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              <Button startIcon={<UploadFileIcon />} variant="contained">Upload file</Button>
              <Button startIcon={<FolderIcon />} variant="outlined">Create folder</Button>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ p: 2, flex: 2 }}>
            <Typography variant="h6">Recent files</Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {['report.pdf','photo.jpg','notes.txt'].map(n => (
                <Chip key={n} icon={<InsertDriveFileIcon />} label={n} clickable />
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </Container>
  );
}
