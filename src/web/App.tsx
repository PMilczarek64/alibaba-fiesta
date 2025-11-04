import { useState } from 'react';
import { Uploader } from './components/Uploader';

export const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event running');
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    setFile(uploadedFile);
    console.log('Uploaded file:', uploadedFile);
  };
  return (
    <div>
      <Uploader handleUpload={handleUpload}/>
    </div>
  );
};