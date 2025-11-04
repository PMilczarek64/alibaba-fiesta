export interface UploadResponse {
  success: true;
  message: string;
  fileUrl?: string;
}

export interface UploadError {
  success: false;
  status: number;
  message: string;
}

export interface UploadParams {
  file: File;
  additionalData?: Record<string, string | number | boolean>;
}

export async function uploadFile({
  file,
  additionalData = {},
}: UploadParams): Promise<UploadResponse | UploadError> {
  const expressServerUrl = import.meta.env.VITE_SERVER_URL || 'https://localhost:8081';
  const url = new URL('/files/upload', expressServerUrl);

  const formData = new FormData();
  formData.append('file', file);

  for (const [key, value] of Object.entries(additionalData)) {
    formData.append(key, String(value));
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: `Upload failed (${response.status} ${response.statusText})`,
      };
    }
    const data = (await response.json()) as UploadResponse;
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, status: 0, message };
  }
}
