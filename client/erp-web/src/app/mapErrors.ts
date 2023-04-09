export const mapErrors = (error: string) => {
  return (
    {
      'User already exists!': 'Usuário já existe!',
      'The token is invalid': 'O token é inválido',
      "The 'authorization' is missing": 'Está faltando o "authorization"',
    }[error] || 'Ocorreu um erro inesperado, tente novamente mais tarde!'
  );
};
