import React from "react";
export interface ApiResponseData {
  message: string,
}

export interface LoginResponseData {
  token: string,
}

export interface MedicationsProps {
  application_number: string,
  product_number: string,
  form: string,
  strength: string,
  reference_drug: string,
  drug_name: string,
  active_ingredient: string,
  reference_standard: string,
}

export interface PaginationFunctionProps {
  isFirstPage?: boolean,
  isLastPage?: boolean,
  page?: number,
}

export interface InputLabeledProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string,
  name: string,
  value: string,
  onChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void,
  label: string,
}

export interface ManufacturerProps {
  name: string;
}