// FormBloc.ts
import { useState } from 'react';
import { apiUrl } from '../util/constants';
import { LoginResponseData } from '../util/types';
import { useRouter } from 'next/router';

export function useLoginBloc() {
  const router = useRouter();
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

        const data: LoginResponseData = await response.json()

        if (response.status === 200) {
          localStorage.setItem('JWT', JSON.stringify(data));
          router.push('/medications')
        } else {
          if (response.status === 400) {
            alert('Login ou senha inválidos.')
          }
          console.error('Erro ao enviar o formulário:', data);
        }
      } catch (error) {
        alert('Desculpe, parece que houve um erro ao realizar o login')
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
