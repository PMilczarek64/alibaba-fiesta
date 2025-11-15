/*import { Uploader } from './components/Uploader';
import { useUploadFile } from './hooks/useUploadFile';
import { useEffect } from 'react';
import { useDeleteFile } from './hooks/useDeleteFile';
import { LoginPage } from './components/LoginPage';
import { useAuth } from './hooks/useAuth';

export const App = () => {
  const {
    currentUserId,
    isLoggedIn,
    loginStatus,
    handleLogin,
    files,
    fetchFiles,
  } = useAuth();

  const { handleDelete } = useDeleteFile(fetchFiles);
  const { file, uploadStatus, isUploading, handleUpload } = useUploadFile(fetchFiles);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFiles();
    }
  }, [isLoggedIn, fetchFiles]);
  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {currentUserId !== 0 && (
        <Uploader
          handleUpload={handleUpload}
          userId={currentUserId}
        />
      )}

      <LoginPage
        handleLogin={handleLogin}
        isLoggedIn={isLoggedIn}
      />

      <p>{loginStatus}</p>
      {currentUserId !== 0 && <>
        {file && <p>Selected: {file.name}</p>}
        {isUploading && <p>Uploading...</p>}
        {uploadStatus && <p>{uploadStatus}</p>}</>}

      {files.length > 0 && (
        <div>
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
      )}
    </div>
  );
};

*/