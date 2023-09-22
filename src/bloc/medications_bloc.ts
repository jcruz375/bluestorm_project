import { useState } from "react";
import { apiUrl } from "../util/constants";
import { ManufacturerProps, MedicationsProps } from "../util/types";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface ApiRouteParamethers {
  page?: number;
  limit?: number;
  search?: string;
}

interface ChangeDateParamethers {
  isExpiresDate: boolean;
  date: Date;
}

export function useMedicationsBloc() {
  const [medicationsList, setMedicationsList] = useState<MedicationsProps[]>([]);
  const [lastPage, setLastPage] = useState(0);
  const [totalMedications, setTotalMedications] = useState(0);
  const [allManufacturers, setAllManufacturers] = useState<ManufacturerProps[]>([]);
  const [drugName, setDrugName] = useState('');
  const [unitsPerPackage, setUnitsPerPackage] = useState(0);
  const [issuedDate, setIssueDate] = useState(new Date());
  const [formattedIssuedDate, setFormattedIssuedDate] = useState<string | Date>(new Date());
  const [expiresDate, setExpiresDate] = useState(new Date());
  const [formattedExpiresDate, setFormattedExpiresDate] = useState<string | Date>(new Date());
  const [manufacturersByMedication, setManufacturersByMedication] = useState<string[]>([]);

  const router = useRouter();

  async function getAllManufacturers() {
    const bearer = window.localStorage.getItem('JWT');
    const { token } = bearer ? JSON.parse(bearer) : ''

    try {
      const response = await fetch(`${apiUrl}/manufacturers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        setAllManufacturers(responseData.data)
      } else {
        console.error('Erro ao buscar manufacturers:', response);
      }
    } catch (error) {
      console.error('Erro ao acessar api', error);
    }
  }

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
        setLastPage(responseData.last_page)
        setTotalMedications(responseData.total)
      } else {
        console.error('Erro ao buscar medicações:', response);
      }
    } catch (error) {
      console.error('Erro ao acessar api', error);
    }
  }

  function handleChangeDate({ isExpiresDate = false, date }: ChangeDateParamethers) {
    let oldDate = date

    const year = oldDate.getUTCFullYear();
    const month = (oldDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = oldDate.getUTCDate().toString().padStart(2, '0');
    const hour = oldDate.getUTCHours().toString().padStart(2, '0');
    const minute = oldDate.getUTCMinutes().toString().padStart(2, '0');
    const seconds = oldDate.getUTCSeconds().toString().padStart(2, '0');

    const offsetMinutos = oldDate.getTimezoneOffset();
    const offsetHoras = Math.abs(offsetMinutos / 60).toString().padStart(2, '0');
    const offsetSinal = offsetMinutos > 0 ? '-' : '+';

    const formatedDate = `${year}-${month}-${day}T${hour}:${minute}:${seconds}${offsetSinal}${offsetHoras}:00`;
    if (isExpiresDate) {
      setFormattedExpiresDate(formatedDate)
      return setExpiresDate(oldDate);
    }
    setFormattedIssuedDate(formatedDate)
    return setIssueDate(oldDate);
  }

  function isValidDates() {
    if (expiresDate > issuedDate) {
      return true;
    }
    return false;
  }

  function handleChangeManufacturers(selectedManufacturers: string[]) {
    setManufacturersByMedication([
      ...selectedManufacturers
    ])
  }

  async function handleSaveNewMedication() {
    const bearer = window.localStorage.getItem('JWT');
    const { token } = bearer ? JSON.parse(bearer) : ''
    if (isValidDates()) {
      try {
        const response = await fetch(`${apiUrl}/medications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            drug_name: drugName,
            units_per_package: unitsPerPackage,
            issued_on: formattedIssuedDate,
            expires_on: formattedExpiresDate,
            manufacturers: manufacturersByMedication
          })
        });
        if (response.ok) {
          toast.success('Medicação criada com sucesso', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          return router.push('/medications')
        } else if (response.status === 400) {
          console.error('Erro ao registrar nova medicação:', response);
          return toast.error('Erro ao registrar nova medicação. Verifique se todos os campos estão devidamente preenchidos', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          console.error('Erro ao registrar nova medicação:', response);
          return toast.error('Erro ao registrar nova medicação', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error) {
        console.error('Erro ao acessar api', error);
        return toast.error('Erro ao registrar nova medicação. Verifique se todos os campos estão devidamente preenchidos', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
    return toast.error('Expires date must be before issued date', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return {
    getAllMedications,
    medicationsList,
    lastPage,
    totalMedications,
    drugName,
    unitsPerPackage,
    issuedDate,
    expiresDate,
    manufacturersByMedication,
    setDrugName,
    setUnitsPerPackage,
    handleChangeDate,
    handleChangeManufacturers,
    getAllManufacturers,
    allManufacturers,
    handleSaveNewMedication,
  }
}