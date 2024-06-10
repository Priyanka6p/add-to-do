import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Constants } from "../../utils/constant";
import { Row, Props } from "../../interfaces/tableInterface/TableInterface";
import swal from "sweetalert";
import { FormValues } from "../../interfaces/inputInterface/InputFieldInterface";

function Table({ data, deleteRow, setData }: Props) {
    const [isStatus, setIsStatus] = useState<boolean>()
    const deleteButton = (row: Row) => (
        <button type='button' onClick={() => deleteRow(row.input)}>Delete Data</button>
    );

    //function for checkbox which checks whether target is completed or not
    const handleCheck = (e: any, row: Row) => {
        console.log(e.target.checked)
        const updateVal = data.map((i) => {
            return i === row ? { ...i, status: e.target.checked } : i
        });
        setData(updateVal)
        if (e.target.checked) {
            swal(Constants.taskDone)
            console.log(e.target.checked, row.status, "Row Status")
        } else {
            swal(Constants.taskNotdone)
        }
    }

    //creating columns for table
    const columns: TableColumn<Row>[] = [
        {
            name: `${Constants.table.map(i => i.comp)}`,
            cell: row => <input type="checkbox" checked={row.status} onChange={(e) => handleCheck(e, row)} />,
        },
        {
            name: `${Constants.table.map(i => i.sr)}`,
            cell: (row, index) => <span>{index + 1}</span>,
        },
        {
            name: `${Constants.table.map(i => i.input)}`,
            selector: row => row['input'],
        },
        {
            name: `${Constants.table.map(i => i.desc)}`,
            selector: row => row['desc'],
        },
        {
            name: "Status",
            cell: (row) => (row.status ? "Done" : "Not Done"),
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
                title={Constants.title}
                columns={columns}
                data={data}
                pagination
            />
        </div>
    )
};

export default Table;