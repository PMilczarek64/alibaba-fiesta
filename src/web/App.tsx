import { Uploader } from './components/Uploader';
import { useUploadFile } from './hooks/useUploadFile';
import { callServer } from '../api/clients/callServer';
import { useEffect, useState } from 'react';
import { useDeleteFile } from './hooks/useDeleteFile';
import { LoginPage } from './components/LoginPage';
import { useLogin } from './hooks/useLogin';

export const App = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const fetchFiles = async () => {
    const response = await callServer({ mode: 'LIST_FILES', method: 'GET' });
    if (response.success) {
      setFiles(response.data.files);
    }
  };

  const { handleDelete } = useDeleteFile(fetchFiles);
  const { file, uploadStatus, isUploading, handleUpload } = useUploadFile(fetchFiles);
  const { handleLogin, isLoggedIn, loginStatus } = useLogin(setCurrentUserId, fetchFiles, setFiles);

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {currentUserId !== 0 && <Uploader handleUpload={handleUpload} userId={currentUserId}/>}
      <LoginPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
      <p>{loginStatus}</p>
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
