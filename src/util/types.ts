export interface ApiResponseData {
  message: string
}

export interface LoginResponseData {
  token: string;
}

export interface MedicationsProps {
  application_number: String,
  product_number: String,
  form: String,
  strength: String,
  reference_drug: String,
  drug_name: String,
  active_ingredient: String,
  reference_standard: String,
}