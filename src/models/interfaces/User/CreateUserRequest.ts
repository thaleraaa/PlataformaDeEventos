export interface CreateUserRequest {
    nome: string;
    email: string;
    senha: string;
    role: 'CLIENTE' | 'ADMINISTRADOR';
}