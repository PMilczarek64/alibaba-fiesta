import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

export default function FilesPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Files
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Typography>List of files will be here.</Typography>
      </Paper>
    </Box>
  );
}
