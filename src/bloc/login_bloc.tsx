// FormBloc.ts
import { useState } from 'react';
import { apiUrl } from '../util/constants';

interface LoginResponseData {
  token: string;
}

export function useLoginBloc() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const isFormValid = () => {
    return formData.username.trim() !== '' && formData.password.trim() !== '';
  };

  const updateField = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isFormValid()) {
      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data : LoginResponseData = await response.json()
          console.log('Formulário enviado com sucesso!', data);
        } else {
          // Lógica de tratamento de erro
          console.error('Erro ao enviar o formulário:', response);
        }
      } catch (error) {
        console.error('Erro ao enviar o formulário', error);
      }
    } else {
      alert('Campos obrigatórios não preenchidos')
      console.error('Campos obrigatórios não preenchidos');
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
  };
}
