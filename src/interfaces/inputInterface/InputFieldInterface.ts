export interface FormValues {
  input: string;
  desc: string;
  status: boolean;
}

export interface Row {
  input: string;
  desc: string;
  status: boolean;
}

export interface MyFormProps {
  initialValue?: string;
  onSubmit: (values: FormValues) => void;
}