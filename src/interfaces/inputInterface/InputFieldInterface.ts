export interface FormValues {
  input: string;
  desc: string;
  status: boolean;
}

export interface Row {
  columnHeading: string;
  desc: string;
  status: boolean;
}

export interface MyFormProps {
  initialValue?: string;
  onSubmit: (values: FormValues) => void;
}