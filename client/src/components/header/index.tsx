import { Layout, Space, Typography } from 'antd';
import styles from './index.module.css';
import {
  LoginOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { CustomButton } from '../custom-btn';
import { Link } from 'react-router-dom';
import { Paths } from '../../paths';

export const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.icon} />
        <Link to={Paths.home}>
          <CustomButton type='ghost'>
            <Typography.Title level={1}>
              Employees
            </Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      <Space>
        <Link to={Paths.register}>
          <CustomButton
            icon={<UserOutlined />}
            type='ghost'>
            Sign Up
          </CustomButton>
        </Link>
        <Link to={Paths.login}>
          <CustomButton
            icon={<LoginOutlined />}
            type='ghost'>
            Log In
          </CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
