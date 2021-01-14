import React, {useEffect, useState} from 'react';
import { Button, Col, Layout, Menu, Row } from 'antd';
import Services from '../services/Services';
import Clients from '../clients/Clients';
import 'antd/dist/antd.css';
import './Dashboard.css'

import { ProfileOutlined, TeamOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Link, Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const { Sider, Header, Content } = Layout;

function Dashboard() {
    const match = useRouteMatch();
    const [isCollapsed, setCollapsed] = useState(false);
    const toggle = () => {
        setCollapsed(!isCollapsed);
    }
    const auth = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (auth.user === null) {
            history.replace({pathname: '/login'})
        }
    }, [auth, history])

    const logout = () => {
        auth.signout(() => {
            history.replace({pathname: '/login'})
        })
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={isCollapsed}> 
                <div className="logo">
                    <p>Invirtex</p>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    
                    <Menu.Item key="1" icon={<ProfileOutlined />}>
                    <Link to='/dashboard/services'>
                        Central de Serviços
                        </Link>
                    </Menu.Item>
                    
                    <Menu.Item key="2" icon={<TeamOutlined />}>
                        <Link to='/dashboard/clients'>
                        Clientes
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <Row justify="space-between">
                        <Col span={4}>
                        {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {className: 'trigger', onClick: toggle}) }
                        </Col>
                        <Col style={{paddingRight: 24}}>
                        <Button type="link" onClick={logout}>Sair</Button>
                        </Col>
                    </Row>
                    
                </Header>
                <Content className="site-layout-background" style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}>
                <Switch>
                    <Route path={`${match.path}/services`}>
                        <Services />
                    </Route>
                    <Route path={`${match.path}/clients`}>
                        <Clients />
                    </Route>
                    <Route path="/">
                        <Redirect to="/dashboard/services"></Redirect>
                    </Route>
                </Switch>
            </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;