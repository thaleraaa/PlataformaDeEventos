export interface CreateEventoRequest {
    nome: string;
    data: Date;
    horario: string;
    valor: number;
    user_id: string;
}