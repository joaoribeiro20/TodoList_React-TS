import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IDataUser } from '../interfaces/IDataUser';
import '../styles/StylePattern.scss';

interface Field {
  name: string;
  label: string;
  type: string;
  exemplo: string;
  length:number
}

interface DynamicFormProps {
  fields: Field[];
  onSubmit: (formData: IDataUser) => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const initialFormData: IDataUser = {
    name: '',
    email: '',
    password: '',
    telefone: '', // Mantido como string
    apelido: '',
    cep: '', // Mantido como string
    tasks: [],
  };

  const [formData, setFormData] = useState<IDataUser>(initialFormData);

  const handleChange = (fieldName: string, value: string) => {
    // Verifica se fieldName é uma chave válida em IDataUser
    if (fieldName in formData) {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="divFormsGeNERIC" key={field.name}>
          <br />
          <label className='labelPattern' htmlFor={field.name}>{field.label}</label>
          <input
            className='inputPattern'
            type={field.type}
            id={field.name}
            name={field.name}
         /*    value={formData[field.name] || ""} */
            placeholder={field.exemplo}
            maxLength={field.length}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(field.name, e.target.value)
            }
          />
        </div>
      ))}
      <button className='btnCadastrar' type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;