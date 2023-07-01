const ENDPOINT = (isLocal: boolean) => {
  if (isLocal) {
    return 'http://localhost:3000';
  }
  return '/api';
};

export const BACKEND_NODE = ENDPOINT(false);
