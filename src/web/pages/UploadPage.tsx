import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import UploadDialog from '../components/UploadDialog';

export default function UploadPage() {
  const [open, setOpen] = React.useState(true); // open by default as page
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Upload</Typography>
      <Paper sx={{ p: 2 }}>
        <Typography>Use the dialog to upload a file.</Typography>
        {/*<UploadDialog open={open} onClose={() => setOpen(false)} onUpload={(file) => console.log('uploaded', file)} /> */}
      </Paper>
    </Box>
  );
}
