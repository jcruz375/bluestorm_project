import { useState } from "react";
import { apiUrl } from "../util/constants";
import { ApiResponseData } from "../util/types";

export function useGlobalBloc() {

  async function tokenChecker() {
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
        return true;
      } else {
        console.error('Erro ao verificar token:', response);
        return false;
      }
    } catch (error) {
      console.error('Erro ao acessar api', error);
    }
  }
  return {
    tokenChecker
  }
}