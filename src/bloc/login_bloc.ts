// FormBloc.ts
import { useState } from 'react';
import { apiUrl } from '../util/constants';
import { LoginResponseData } from '../util/types';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

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
            toast.error('Login ou senha inválidos.', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
          console.error('Erro ao enviar o formulário:', data);
        }
      } catch (error) {
        toast.error('Desculpe, parece que houve um erro ao realizar o login', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.error('Erro ao enviar o formulário', error);
      }
    } else {
      toast.error('Campos obrigatórios não preenchidos', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Campos obrigatórios não preenchidos');
    }
  };

  return {
    formData,
    updateField,
    handleSubmit,
  };
}
