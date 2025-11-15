import React, { ChangeEvent } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import UploadDialog from '../components/UploadDialog';

type FileHandler = (f: File) => void;
type InputEventHandler = (event: ChangeEvent<HTMLInputElement>, userId: number) => Promise<void> | void;
type MaybeUploadHandler = FileHandler | InputEventHandler;

export interface UploadPageProps {
  currentUserId: number;
  handleUpload: MaybeUploadHandler;
}

export default function UploadPage({ currentUserId, handleUpload }: UploadPageProps) {
  const [open, setOpen] = React.useState(true); // open by default as page

  // Adapter: UploadDialog gives us a File; handleUpload might expect File OR (event, userId)
  const onUploadFromDialog = async (file: File) => {
    if (!handleUpload) return;

    // jeśli handleUpload to funkcja jednoargumentowa, traktujemy ją jako FileHandler
    if ((handleUpload as Function).length === 1) {
      try {
        (handleUpload as FileHandler)(file);
      } catch (err) {
        console.error('upload error', err);
      }
      return;
    }

    // w przeciwnym razie zakładamy starszy interfejs (event, userId)
    const fakeEvent = { target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>;
    try {
      const maybePromise = (handleUpload as InputEventHandler)(fakeEvent, currentUserId);
      if (maybePromise && typeof (maybePromise as Promise<void>).then === 'function') {
        await maybePromise;
      }
    } catch (err) {
      console.error('upload error', err);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Upload
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Typography>Use the dialog to upload a file.</Typography>

        {/* UploadDialog powinien wywołać onUpload(file: File) */}
        <UploadDialog
          open={open}
          onClose={() => setOpen(false)}
        />
      </Paper>
    </Box>
  );
}
