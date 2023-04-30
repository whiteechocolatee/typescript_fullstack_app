import { Form, Input } from 'antd';

type Props = {
  name: string;
  placeholder: string;
  type?: string;
};

export const CustomInput = ({
  name,
  placeholder,
  type = 'text',
}: Props) => {
  return (
    <Form.Item
      rules={[
        { required: true, message: 'Required field' },
      ]}
      name={name}
      shouldUpdate={true}>
      <Input
        placeholder={placeholder}
        type={type}
        size='large'
      />
    </Form.Item>
  );
};
