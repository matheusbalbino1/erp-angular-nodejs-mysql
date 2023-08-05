const ENDPOINT = (isLocal: boolean) => {
  if (isLocal) {
    return 'http://localhost:3000';
  }
  return '/api/express';
};

export const BACKEND_NODE = ENDPOINT(false);
