import { Layout, Space, Typography } from 'antd';
import styles from './index.module.css';
import { TeamOutlined } from '@ant-design/icons';
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
        <Link to={Paths.login}>
          <CustomButton type='ghost'>Log In</CustomButton>
        </Link>
        <Link to={Paths.register}>
          <CustomButton type='ghost'>Sign Up</CustomButton>
        </Link>
      </Space>
    </Layout.Header>
  );
};
