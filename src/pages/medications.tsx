import { useEffect } from 'react';
import styles from '../styles/medications_page.module.scss'
import { useMedicationsBloc } from '../bloc/medications_bloc';

const Medications = ({ }) => {
  const { getAllMedications, medicationsList } = useMedicationsBloc()
  
  useEffect(() => {
    getAllMedications({search: 'di'})
  }, []);

  return (
    <main className={`${styles.medications_page_main}`}>
      <header className={`flex justify-between items-center`}>
        <h1>
          Medicamentos
        </h1>
        <input
          placeholder='Pesquisar por nome'
          type="text"
        />
      </header>
      <section className={`${styles.add_button_section}`}>
        <button>
          + Novo registro
        </button>
      </section>
      <table className={`${styles.my_table}`}>
        <thead>
          <tr>
            <th>Application Number</th>
            <th>Product Number</th>
            <th>Form</th>
            <th>Strength</th>
            <th>Reference Drug</th>
            <th>Drug Name</th>
            <th>Active Ingredient</th>
            <th>Reference Standard</th>
          </tr>
        </thead>
        <tbody>
          {medicationsList.map((medication, index) => {
            return (
              <tr key={index}>
                <td>{medication.application_number}</td>
                <td>{medication.product_number}</td>
                <td>{medication.form}</td>
                <td>{medication.strength}</td>
                <td>{medication.reference_drug}</td>
                <td>{medication.drug_name}</td>
                <td>{medication.active_ingredient}</td>
                <td>{medication.reference_standard}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Medications;