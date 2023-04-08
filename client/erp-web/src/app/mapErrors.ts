import { IResponseCreateUser } from './interfaces/IUser';

export const mapErrorUser = (error: string) => {
  return (
    {
      'User already exists!': 'Usuário já existe!',
    }[error] || 'Ocorreu um erro inesperado, tente novamente mais tarde!'
  );
};
