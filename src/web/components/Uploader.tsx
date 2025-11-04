import { ChangeEventHandler } from 'react';

export type UploaderProps = {
  handleUpload: ChangeEventHandler<HTMLInputElement>;
};

export const Uploader = ({ handleUpload }: UploaderProps) => {
  return (
    <div>
      <input type="file" name="upload_input" onChange={handleUpload}/>
    </div>
  );};