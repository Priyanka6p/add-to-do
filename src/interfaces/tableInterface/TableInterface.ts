export interface Row {
  columnHeading: string;
  desc: string;
  status: boolean;
}

export interface Props {
  data: Row[];
  deleteRow: (columnHeading: string) => void;
}