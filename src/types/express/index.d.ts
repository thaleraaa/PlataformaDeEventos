declare namespace Express {
    export interface Request {
        user_id: string;
        user_role: 'CLIENTE' | 'ADMINISTRADOR'
    }
}