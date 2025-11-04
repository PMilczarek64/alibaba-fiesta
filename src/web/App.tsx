import { useState } from 'react';
import { Uploader } from './components/Uploader';
import { uploadFile } from '../api/clients/uploadFile';

export const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    if (!uploadedFile) return;

    setFile(uploadedFile);
    console.log('Selected file:', uploadedFile);

    // file upload
    const result = await uploadFile({
      file: uploadedFile,
      additionalData: { userId: 123 },
    });

    if (result.success) {
      setUploadStatus(`✅ Uploaded: ${result.fileUrl || 'no URL returned'}`);
    } else {
      setUploadStatus(`❌ Error ${result.status}: ${result.message}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Uploader handleUpload={handleUpload} />
      {file && <p>Selected: {file.name}</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};
