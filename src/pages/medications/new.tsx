import { useEffect, useState } from 'react';
import InputLabeled from '../../components/input_labeled';
import styles from '../../styles/new_medications_page.module.scss'
import DatePicker from "react-datepicker";
import { useMedicationsBloc } from '../../bloc/medications_bloc';
import { Dropdown } from '../../components/dropdown';
import { useRouter } from 'next/router';

const NewMedicationPage = () => {
  const { handleChangeDate,
    getAllManufacturers,
    allManufacturers,
    drugName,
    unitsPerPackage,
    issuedDate,
    expiresDate,
    setDrugName,
    setUnitsPerPackage,
    handleSaveNewMedication,
    } = useMedicationsBloc();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      await getAllManufacturers();
    };

    fetchData();
  }, []);

  return (
    <main className={`${styles.new_medication_page_main}`}>
      <section className={`${styles.card}`}>
        <h1>New medication</h1>
        <InputLabeled
          label='Drug name'
          id="drug_name_input"
          name="drug_name"
          value={drugName}
          onChangeFunction={(event : React.ChangeEvent<HTMLInputElement>) => { setDrugName(event.target.value)}}
          type="text"
        />
        <InputLabeled
          label='Units per package'
          id="units_per_package_input"
          name="units_per_package"
          value={String(unitsPerPackage)}
          onChangeFunction={(event : React.ChangeEvent<HTMLInputElement>) => { setUnitsPerPackage(parseInt(event.target.value))}}
          type='number'
        />
        <article className={`flex flex-col justify-between items-stretch ${styles.datePicker_container}`}>
          <label htmlFor="issued_on">Issued on</label>
          <DatePicker
            id='issued_on'
            selected={issuedDate}
            onChange={(date: any) => handleChangeDate({ isExpiresDate: false, date })}
          />
        </article>
        <article className={`flex flex-col justify-between items-stretch ${styles.datePicker_container}`}>
          <label htmlFor="expires_on">Expires on</label>
          <DatePicker
            id='expires_on'
            selected={expiresDate}
            onChange={(date: any) => handleChangeDate({ isExpiresDate: true, date })}
          />
        </article>
        <article className={`flex flex-col justify-between items-stretch ${styles.select_container}`}>
          <label htmlFor="expires_on">Manufacturers</label>
          <Dropdown manufacturers={allManufacturers} />
        </article>
        <button
          onClick={handleSaveNewMedication}
          className={styles.register_medication_button}
        >
          Registrar
        </button>
        <div className="flex justify-center items-center wfull">
          <span
            onClick={() => {
              router.push('/medications')
            }}
          >
            Voltar
          </span>
        </div>
      </section>
    </main>
  );
}

export default NewMedicationPage;