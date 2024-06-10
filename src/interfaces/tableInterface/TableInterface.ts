export interface Row {
  input: string;
  desc: string;
  status: boolean;
}

export interface Props {
  data: Row[];
  deleteRow: (input: string) => void;
  setData:React.Dispatch<React.SetStateAction<Row[]>>
}