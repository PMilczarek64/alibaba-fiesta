export type Response = {
  success: true;
  message: string;
  params: Record<string, any>;
}

export type ErrorResponse = {
  success: false;
  status: number;
  message: string;
}

// type ApiMethods = 'POST' | 'GET';

// type Modes = 'LIST_FILES' | 'DELETE_FILE' | 'UPLOAD';

export type CallServerParamsUpload = {
  mode: 'UPLOAD';
  method: 'POST';
  file: File;
  additionalData?: Record<string, string | number | boolean>;
}

// Type for 'DELETE_FILE' mode, which requires 'filename' and optional 'additionalData'
export type CallServerParamsDelete = {
  mode: 'DELETE_FILE';
  method: 'POST';
  fileName: string; // filename is required here
  additionalData?: Record<string, string | number | boolean>;
}

// Type for 'LIST_FILES' mode, which requires no additional params
export type CallServerParamsList = {
  mode: 'LIST_FILES';
  method: 'GET';
}

// Union type for all possible parameter types
export type CallServerParams = CallServerParamsUpload | CallServerParamsList | CallServerParamsDelete;

const PATHS = {
  UPLOAD: '/files/upload',
  LIST_FILES: '/files/list',
  DELETE_FILE: '/files/delete',
} as const;

export async function callServer(params: CallServerParams): Promise<Response | ErrorResponse> {
  const expressServerUrl = import.meta.env.VITE_SERVER_URL || 'https://localhost:8081';
  const { mode, method } = params;
  const url = new URL(PATHS[mode], expressServerUrl);

  // Check if file or filename is required based on mode
  if (mode === 'UPLOAD' && !params.file) {
    throw new Error('File is required for UPLOAD mode');
  }
  if (mode === 'DELETE_FILE' && !params.fileName) {
    throw new Error('Filename is required for DELETE_FILE mode');
  }

  const fetchParams: Record<string, any> = {};

  if (mode === 'UPLOAD') {
    const formData = new FormData();
    formData.append('file', params.file);
    for (const [key, value] of Object.entries(params.additionalData ?? {})) {
      formData.append(key, String(value));
    }
    fetchParams.body = formData;
  }

  if (mode === 'DELETE_FILE') {
    fetchParams.body = JSON.stringify({ filename: params.fileName });
    fetchParams.headers = {
      'Content-Type': 'application/json',
    };
  }

  if (mode === 'LIST_FILES') {
    fetchParams.body = null;
  }

  try {
    console.log(`Calling server: ${url.toString()} with params `, fetchParams);
    const response = await fetch(url, {
      method,
      headers: fetchParams.headers, // <-- add this
      body: fetchParams.body,
    });

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: `${mode} failed (${response.status} ${response.statusText})`,
      };
    }
    const data = (await response.json()) as Response;
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    return { success: false, status: 0, message };
  }
}
