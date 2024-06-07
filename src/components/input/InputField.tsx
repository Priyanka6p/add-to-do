import React, { useState } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';
import './input.css';
import { Constants } from '../../utils/constant';
import Table from '../table/Table';
import { FormValues, Row, MyFormProps } from '../../interfaces/inputInterface/InputFieldInterface';

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form className='form'>
      <label className='lbl'>{Constants.target}</label>
      <Field type="input" name="input" className="field" />
      {touched.input && errors.input && <div>{errors.input}</div>}
      <label className='lbl'>{Constants.des}</label>
      <Field type="input" name="desc" className="field" />
      {touched.desc && errors.desc && <div>{errors.desc}</div>}
      <button type="submit" disabled={isSubmitting} className='btn'>
        {Constants.add}
      </button>
    </Form>
  );
};

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      input: props.initialValue || '',
      desc: props.initialValue || '',
      status: false,
    };
  },

  validationSchema: Yup.object().shape({
    input: Yup.string()
      .required("This field is required"),
    desc: Yup.string()
      .optional(),
  }),

  handleSubmit: (values, { resetForm, setSubmitting, props }) => {
    props.onSubmit(values);
    resetForm();
    setSubmitting(false);
  },
})(InnerForm);

const InputField = () => {
  const [formData, setFormData] = useState<FormValues[]>([]);

  const handleSubmit = (values: FormValues) => {
    setFormData([...formData, values]);
  };

  const tableData: Row[] = formData.map((data, index) => ({
    columnHeading: data.input,
    desc: data.desc,
    status: data.status,
  }));

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
      <Table data={tableData} deleteRow={handleDeleteRow} />
    </div>
  );
};

export default InputField;