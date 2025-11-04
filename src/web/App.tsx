import { Uploader } from './components/Uploader';
import { useUploadFile } from './hooks/useUploadFile';
import { callServer } from '../api/clients/callServer';
import { useEffect, useState } from 'react';
import { useDeleteFile } from './hooks/useDeleteFile';

export const App = () => {
  const [files, setFiles] = useState<string[]>([]);
  const fetchFiles = async () => {
    const response = await callServer({ mode: 'LIST_FILES', method: 'GET' });
    if (response.success) {
      setFiles(response.params.files);
    }
  };

  const { handleDelete } = useDeleteFile(fetchFiles);
  const { file, uploadStatus, isUploading, handleUpload } = useUploadFile(fetchFiles);

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Uploader handleUpload={handleUpload}/>
      {file && <p>Selected: {file.name}</p>}
      {isUploading && <p>Uploading...</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
      {files && (<div>
        <h1>File List</h1>
        <ul>
          {files.map((file) => (
            <li key={file}>
              {file}
              <button onClick={(e) => handleDelete(e, file)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      )
      }
    </div>
  );};
