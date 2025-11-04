import { callServer } from '../../api/clients/callServer';

export type useDeleteFileResult = {
  handleDelete: (event: React.MouseEvent<HTMLButtonElement>, fileName: string) => Promise<void>;
};

export const useDeleteFile = (fetchFiles: () => Promise<void>): useDeleteFileResult => {
  const deleteFile = async (event: React.MouseEvent<HTMLButtonElement>, fileName: string) => {
    const response = await callServer({ mode: 'DELETE_FILE', method: 'POST', fileName });

    if (response.success) {
      console.log(`File ${fileName} deleted successfully`);

      //   setFiles((prevFiles) => prevFiles.filter((file) => file !== fileName));
      fetchFiles();
    } else {
      console.error('Error deleting file:', response.message);
    }
  };

  return { handleDelete: deleteFile };
};