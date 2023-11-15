import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      // Make an API call for signup
      const response = await axios.post('/auth/signup', values);

      // Check the response from the server
      if (response.status === 201) {
        // Handle success
        notification.success({ message: 'Signup successful' });
        navigate('/signin'); // Redirect to the signin page
      } else {
        // Handle failure
        notification.error({ message: 'Signup failed' });
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Server returned validation errors
        const validationErrors = error.response.data.errors;
        // Display validation errors to the user
        notification.error({ message: 'Validation failed', description: validationErrors.join(', ') });
      } else {
        // Other server errors
        console.error('Error during signup:', error);
        notification.error({ message: 'Error during signup' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <Form
        name="signup"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        size="large"
      >
         <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>Sign Up</h1>
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
