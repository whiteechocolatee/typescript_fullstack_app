import { Card, Form, Row, Space, Typography } from 'antd';
import { Layout } from '../../components/layout';
import { CustomInput } from '../../components/custom-input';
import { PasswordInput } from '../../components/password-input';
import { CustomButton } from '../../components/custom-btn';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Login = () => {
  return (
    <Layout>
      <Row align='middle' justify='center'>
        <Card title='Log In' style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput
              type='email'
              name='email'
              placeholder='E-mail'
            />
            <PasswordInput
              name='password'
              placeholder='Password'
            />
            <CustomButton type='primary' htmlType='submit'>
              Log In
            </CustomButton>
          </Form>
          <Space direction='vertical' size='large'>
            <Typography>
              New to Employee?
              <Link to={Paths.register}>Sign Up</Link>
            </Typography>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
