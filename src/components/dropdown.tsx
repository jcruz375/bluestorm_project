import { useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import Select from 'react-select';
import { useMedicationsBloc } from '../bloc/medications_bloc';
import { ManufacturerProps } from '../util/types';

interface DropDownProps {
  manufacturers: ManufacturerProps[];
}

interface SelectedOptions {
  label: string;
  value: string;
}

export function Dropdown({ manufacturers }: DropDownProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions[]>([]);

  const { updateField } = useMedicationsBloc();

  const handleChange = (selected: any) => {
    setSelectedOptions(selected);
    let selectedManufacturers = selectedOptions.map(manufacturer => manufacturer.label)
    updateField('manufacturers', selectedManufacturers)
  };

  const dropdownOptions = manufacturers.map(manufacturer => ({
    label: manufacturer.name,
    value: manufacturer.name,
  }))

  return (
    <div>
      <div className="flex justify-between align-center w-full">
        <Select
          className='w-full'
          isMulti
          options={dropdownOptions as any}
          value={selectedOptions}
          onChange={handleChange}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <AiOutlineDown />
        </div>
      </div>
    </div>
  );
}