import React, { useState } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
import './input.css';
import { Constants } from '../../utils/constant';
import Table from '../todo-table/TodoTable';
import { FormValues, Row, MyFormProps } from '../../interfaces/inputInterface/InputFieldInterface';

//creating input fields
const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='form'>
      <label className='req'>{Constants.target}</label>
      <Field type="input" name="input" className="field" />
      {touched.input && errors.input && <div className='req-mesg'>{errors.input}</div>}
      <label className='lbl'>{Constants.des}</label>
      <Field type="input" name="desc" className="field" />
      {touched.desc && errors.desc && <div>{errors.desc}</div>}
      <button type="submit" disabled={isSubmitting} className='btn'>
        {Constants.add}
      </button>
    </Form>
  );
};

//initialize the intial values of input fields
const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      input: props.initialValue || '',
      desc: props.initialValue || '',
      status: false,
    };
  },

  //handling the validation of inputfiled with yup
  validationSchema: Yup.object().shape({
    input: Yup.string()
      .required(Constants.req),
    desc: Yup.string()
      .optional(),
  }),

  handleSubmit: (values, { resetForm, setSubmitting, props }) => {
    props.onSubmit(values);
    resetForm();
    setSubmitting(false);
  },
})(InnerForm);

//main function
const InputField = () => {
  const [formData, setFormData] = useState<FormValues[]>([]);

  //function for handling Add button to add inputfield's data into the table
  const handleSubmit = (values: FormValues) => {
    console.log([...formData, values])
    setFormData([...formData, values]);
  };

  //handling table's data
  const tableData: Row[] = formData.map((data, index) => ({
    input: data.input,
    desc: data.desc,
    status: data.status,
  }));

  //Delete funtion for delete a particular row of a table
  const handleDeleteRow = (id: string) => {
    const updatedTableData = formData.filter(data => data.input !== id);
    const updatedFormData = updatedTableData.map(row => ({
      input: row.input,
      desc: row.desc,
      status: row.status,
    }));
    setFormData(updatedFormData);
  };

  return (
    <div>
      <h1>{Constants.add_to_do}</h1>
      <p>{Constants.add_items}</p>
      <MyForm onSubmit={handleSubmit} />
      <Table data={tableData} deleteRow={handleDeleteRow} setData={setFormData} />
    </div>
  );
};

export default InputField;