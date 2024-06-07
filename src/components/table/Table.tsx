import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Constants } from "../../utils/constant";
import { Row, Props } from "../../interfaces/tableInterface/TableInterface";

function Table({ data, deleteRow }: Props) {
    const [isStatus, setIsStatus] = useState<boolean>(false)

    const deleteButton = (row: Row) => (
        <button type='button' onClick={() => deleteRow(row.columnHeading)}>Delete Data</button>
    );

    const handleCheck = (row: Row) => {
        setIsStatus(!isStatus)
        if (row.status === isStatus) {
            alert("Your task is done")
        }
        else {
            alert("Your task is not done yet")
        }
    }

    const columns: TableColumn<Row>[] = [
        {
            name: `${Constants.table.map(i => i.comp)}`,
            cell: row => <input type="checkbox" id="chk" onClick={() => handleCheck(row)} />,
        },
        {
            name: `${Constants.table.map(i => i.sr)}`,
            cell: (row, index) => <span>{index + 1}</span>,
        },
        {
            name: `${Constants.table.map(i => i.columnHeading)}`,
            selector: row => row['columnHeading'],
        },
        {
            name: `${Constants.table.map(i => i.desc)}`,
            selector: row => row['desc'],
        },
        {
            name: `${Constants.table.map(i => i.action)}`,
            cell: row => <div>{deleteButton(row)}</div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    return (
        <div>
            <DataTable
                title="List of add to do's"
                columns={columns}
                data={data}
                pagination
            />
        </div>
    )
};

export default Table;