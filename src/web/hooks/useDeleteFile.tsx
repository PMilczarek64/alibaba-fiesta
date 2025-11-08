import { useCallback } from 'react';
import { callServer } from '../../api/clients/callServer';

export type useDeleteFileResult = {
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>, fileName: string) => Promise<void>;
};

export const useDeleteFile = (fetchFiles: () => Promise<void>): useDeleteFileResult => {
  const handleDelete = useCallback(async (event: React.MouseEvent<HTMLButtonElement>, filename: string) => {
    try {
      const response = await callServer({
        mode: 'DELETE_FILE',
        method: 'POST',
        filename,
      });

      if (response.success) {
        console.log(`File ${filename} deleted successfully`);
        await fetchFiles();
      } else {
        console.error('Error deleting file:', response.message);
      }
    } catch (error) {
      console.error('Delete operation failed:', error);
    }
  }, [fetchFiles]);

  return { handleDelete };
};