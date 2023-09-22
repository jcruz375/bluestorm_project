import { useEffect, useState } from 'react';
import styles from '../../styles/medications_page.module.scss'
import { useMedicationsBloc } from '../../bloc/medications_bloc';
import { PaginationFunctionProps } from '../../util/types';
import { useRouter } from 'next/router';

const Medications = ({ }) => {
  const { getAllMedications, medicationsList, lastPage } = useMedicationsBloc()
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const router = useRouter();

  useEffect(() => {
    getAllMedications({ search: '' })
  }, []);

  const handleSearchMedication = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setCurrentPage(1)
    setRowsPerPage(20)
    await getAllMedications({ search: event.target.value })
  }

  const handlePaginate = async ({ isFirstPage = false, isLastPage = false, page = 1 }: PaginationFunctionProps) => {
    if (isFirstPage) {
      setCurrentPage(1)
      return getAllMedications({ page: 1 })
    };
    if (isLastPage) {
      setCurrentPage(lastPage)
      return getAllMedications({ page: lastPage })
    };
    
    getAllMedications({ page })
    setCurrentPage(page)
  }

  const handleChangeLinesPerPage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let rowsPerPageInputValue = parseInt(event.target.value) || 0;
    setRowsPerPage(rowsPerPageInputValue)
    if (rowsPerPageInputValue <= 0 || rowsPerPageInputValue == null) rowsPerPageInputValue = 1;
    setSearchText('')
    getAllMedications({limit: rowsPerPageInputValue})
  }

  return (
    <main className={`${styles.medications_page_main}`}>
      <header className={`flex justify-between items-center`}>
        <h1>
          Medicamentos
        </h1>
        <input
          placeholder='Pesquisar por nome'
          value={searchText}
          onChange={handleSearchMedication}
          type="text"
        />
      </header>
      <section className={`${styles.add_button_section}`}>
        <button onClick={() => {
          router.push('/medications/new')
        }}>
          + New register
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
                <td>{medication.strength.length > 50 ? medication.strength.slice(0, 10) + '...' : medication.strength}</td>
                <td>{medication.reference_drug}</td>
                <td>{medication.drug_name}</td>
                <td>{medication.active_ingredient}</td>
                <td>{medication.reference_standard}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <footer>
        <article></article>
        <article className={`${styles.pagination}`}>
          <button onClick={async () => { await handlePaginate({ isFirstPage: true }) }}>{`<<`}</button>
          <button onClick={async () => { await handlePaginate({ page: currentPage -1 }) }}>{`<`}</button>
          <div className={`${styles.current_page_box}`}>{currentPage}</div>
          <button onClick={async () => { await handlePaginate({ page: currentPage +1 }) }}>{`>`}</button>
          <button onClick={async () => { await handlePaginate({ isLastPage: true }) }}>{`>>`}</button>
        </article>
        <article className={`${styles.row_selector}`}>
          <label htmlFor="row-count">Linhas por página:</label>
          <input
            type="number"
            id="row-count"
            min="1"
            value={rowsPerPage}
            onChange={handleChangeLinesPerPage}
          />
        </article>
      </footer>
    </main>
  );
}

export default Medications;