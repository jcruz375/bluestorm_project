import { apiUrl } from "./constants";
import { ApiResponseData } from "./types";

export async function tokenChecker() {
  const bearer = window.localStorage.getItem('JWT');
  const { token } = bearer ? JSON.parse(bearer) : ''
  try {
    const response = await fetch(`${apiUrl}/token-check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      const data : ApiResponseData = await response.json();
      console.log('token valido', data);
      return true;
    } else {
      // Lógica de tratamento de erro
      console.error('Erro ao verificar token:', response);
      return false;
    }
  } catch (error) {
    console.error('Erro ao acessar api', error);
  }
}