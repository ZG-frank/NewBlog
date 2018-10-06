import React, { Component } from 'react';
// import Left from '../components/Left';
// import Right from '../components/Right';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import Cookies from 'js-cookie';
import SiderMenu from '@/components/SiderMenu';
import Loading from '@/components/Loading';
import routes from '@/config/routes'
import './index.less';
import { Route, Switch, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Layouts extends Component {

    state = {
        collapsed: false,
    };
    
    logout = () =>{
        Cookies.remove('JSESSIONID', { path: '/' })
        Cookies.remove('userName', { path: '/' })
        this.props.history.replace('/login')
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout className="layout-wrap">
                <Sider
                    theme="light"
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="sider-logo">
                        <i className="font icon-react" />
                        {this.state.collapsed ? '' : <span className="m-l-8">Blog Admin</span>}
                    </div>
                    <SiderMenu></SiderMenu>
                </Sider>
                <Layout>
                    <Header className="header-wrap">
                        <div className="header-btn" onClick={this.toggle}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            />
                        </div>
                        <div className="header-right-wrap">
                            <div className="header-btn">
                                <Icon type="mail" />
                            </div>
                            <Menu mode="horizontal" className="header-menu">
                                <SubMenu
                                    title={
                                    <span>
                                        <Icon className="font-18" type="user" />
                                        admin
                                    </span>}
                                >
                                    <Menu.Item key="logout" onClick={this.logout}>
                                        Sign out
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <Loading>
                            {
                                routes.map(item =>
                                    <Route 
                                        key={item.path} 
                                        path={item.path} 
                                        component={item.component} 
                                        exact
                                    />
                                )
                            }
                        </Loading>
                    </Content>
                </Layout>
            </Layout>
            // <div className='Layouts_wrap clear clearFix'>
            //     <Left />
            //     <Right logout={this.logout}/>
            // </div>
        )
    }
}

export default Layouts