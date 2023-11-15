import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      // Simulate API call for authentication
      const response = await axios.post('/auth/signin', values);

      // Check the response from the server
      if (response.status === 200) {
        const { token, username, expiresIn } = response.data;
        setLoading(false);
        notification.success({ message: 'Signin successful' });

        // Save the token and its expiration time in localStorage or sessionStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username)
        localStorage.setItem('tokenExpiresAt', String(Date.now() + expiresIn * 1000));

        navigate('/auction'); // Redirect to the auction page
      } else {
        setLoading(false);
        notification.error({ message: 'Signin failed. Invalid credentials.' });
      }
    } catch (error) {
      console.error('Error during signin:', error);
      setLoading(false);
      notification.error({ message: 'Error during signin' });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '16px' }}>
      <Form
        name="signin"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        size="large"
      >
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Sign In</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="default" htmlType="submit" loading={loading} block>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signin;
