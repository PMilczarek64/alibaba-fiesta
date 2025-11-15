import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Props = { open: boolean; onClose: () => void; onUpload?: (file: File | null) => void };

export default function UploadDialog({ open, onClose, onUpload }: Props) {
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const [desc, setDesc] = React.useState('');

  const handleUpload = () => {
    const file = fileRef.current?.files?.[0] ?? null;
    onUpload?.(file);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload file</DialogTitle>
      <DialogContent>
        <input ref={fileRef} type="file" />
        <TextField margin="dense" label="Description" fullWidth value={desc} onChange={(e) => setDesc(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpload} variant="contained">Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
