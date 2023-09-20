import { useState } from "react";
import { apiUrl } from "../util/constants";
import { MedicationsProps } from "../util/types";

interface ApiRouteParamethers {
  page?: number;
  limit?: number;
  search?: string;
}

export function useMedicationsBloc() {
  const [medicationsList, setMedicationsList] = useState<MedicationsProps[]>([]);

  async function getAllMedications({ page = 1, limit = 20, search = '' }: ApiRouteParamethers) {
    const bearer = window.localStorage.getItem('JWT');
    const { token } = bearer ? JSON.parse(bearer) : ''

    try {
      const response = await fetch(`${apiUrl}/medications?page=${page}&limit=${limit}${search.length >= 3 ? `&search=${search}` : ''}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setMedicationsList(responseData.data)
        console.log('Medicações::', responseData);
      } else {
        console.error('Erro ao buscar medicações:', response);
      }
    } catch (error) {
      console.error('Erro ao acessar api', error);
    }
  }
  return {
    getAllMedications,
    medicationsList
  }
}