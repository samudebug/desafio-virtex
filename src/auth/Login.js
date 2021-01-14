import React from 'react';
import 'antd/dist/antd.css';
import './login.css'
import {useAuth} from './AuthContext';
import { Row, Col, Card, Form, Input, Button } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';



function Login() {
    const history = useHistory();
    const auth = useAuth();

    const onFinish = () => {
        auth.signin(() => {
            history.replace({pathname: '/dashboard'});
        })
    }
    return (
    <Row justify="center" align="middle" className="content">
        <Col span={8}>
            <Card title="Login">
                <Form
                onFinish={onFinish}
                >
                    <Form.Item
                    label="Usuário"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Este campo é necessário'
                        }
                    ]}>
                        <Input prefix={<UserOutlined/>} placeholder="Usuário"/>
                    </Form.Item>
                    <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Este campo é necessário'
                        }
                    ]}>
                        <Input.Password prefix={<LockOutlined/>} placeholder="Senha"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Col>
    </Row>
    );
}

export default Login;