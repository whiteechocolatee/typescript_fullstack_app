import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input';
import { CustomButton } from '../../components/custom-btn';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Register = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Sign Up' style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput name='name' placeholder='Name' />
            <CustomInput
              type='email'
              name='email'
              placeholder='E-mail'
            />
            <PasswordInput
              name='password'
              placeholder='Password'
            />
            <PasswordInput
              name='confirmPassword'
              placeholder='Confirm password'
            />
            <CustomButton type='primary' htmlType='submit'>
              Sign Up
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography>
              Already have an account?
              <Link to={Paths.login}>Log In</Link>
            </Typography>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
