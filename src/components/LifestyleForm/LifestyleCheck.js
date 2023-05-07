import {Form} from 'react-bootstrap';

const LifestyleCheck = ({name, label, placeholder, formMethods}) => {
  const {
    register,
    formState: {errors},
  } = formMethods;

  return (
    <Form.Group className="mb-4">
      <Form.Text className="mb-2" as="label" htmlFor={name}>
        {label}
      </Form.Text>
      <Form.Check
        type="checkbox"
        isInvalid={!!errors[name]}
        {...register(name)}
      >
        <Form.Check.Input type="checkbox" />
        <Form.Check.Label>{placeholder}</Form.Check.Label>
      </Form.Check>
    </Form.Group>
  );
};

export default LifestyleCheck;
