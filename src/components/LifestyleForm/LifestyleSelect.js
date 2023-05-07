import {Form} from 'react-bootstrap';

const LifestyleSelect = ({
  name,
  label,
  placeholder,
  options,
  register,
  errors,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Text className="mb-1" as="label" htmlFor={name}>
        {label}
      </Form.Text>
      <Form.Select isInvalid={!!errors[name]} {...register(name)}>
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default LifestyleSelect;
