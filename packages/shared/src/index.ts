// Exemplo de Tipagem de DTO e Configuração Base da API
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  role: 'ATHLETE' | 'OWNER' | 'ADMIN';
}

export const API_BASE_URL = 'http://localhost:8081/api';