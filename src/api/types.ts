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

export type CallServerParamsUserAdd = {
  mode: 'ADD_USER';
  method: 'POST';
  login: string;
  passwordHash: string;
}

export type CallServerParamsUserGet = {
  mode: 'GET_USER';
  method: 'GET';
  userId: number;
}

export type CallServerParamsUserDelete = {
  mode: 'DELETE_USER';
  method: 'POST';
  userId: number;
}

// Union type for all possible parameter types
export type CallServerParams = CallServerParamsUpload | CallServerParamsList | CallServerParamsDelete | CallServerParamsUserAdd | CallServerParamsUserGet | CallServerParamsUserDelete;