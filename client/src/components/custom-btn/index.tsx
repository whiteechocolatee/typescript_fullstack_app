import { Button, Form } from 'antd';
import React from 'react';

type Props = {
  children: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  type?:
    | 'link'
    | 'text'
    | 'ghost'
    | 'default'
    | 'primary'
    | 'dashed';
  danger?: boolean;
  loading?: boolean;
  shape?: 'default' | 'circle' | 'round';
  icon?: React.ReactNode;
};

export const CustomButton = ({
  children,
  htmlType = 'button',
  onClick,
  type,
  danger,
  loading,
  shape,
  icon,
}: Props) => {
  return (
    <Form.Item>
      <Button
        type={type}
        icon={icon}
        shape={shape}
        onClick={onClick}
        htmlType={htmlType}
        danger={danger}
        loading={loading}>
        {children}
      </Button>
    </Form.Item>
  );
};
