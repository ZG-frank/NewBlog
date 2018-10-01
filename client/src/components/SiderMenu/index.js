import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import menuConfig from '@/config/menu';
import './index.less';

const SubMenu = Menu.SubMenu;

@withRouter
class SiderMenu extends Component {
    state = {
        keys: []
    }

    selectKey = () =>{
        let keys = [];
        keys.push(this.props.history.location.pathname);
        this.setState({keys:keys});
    }

    componentWillMount() {
        this.selectKey();
    }

    onSelect = ({ key }) =>{
        this.props.history.push(key);
    }

    componentWillReceiveProps (nextProps){
        if (this.props.location.pathname != nextProps.location.pathname) {
            this.selectKey();
        }
    }
    
    render() {
        return (
            <Menu 
                mode="inline" 
                onSelect={this.onSelect} 
                selectedKeys={this.state.keys}>
                {
                    menuConfig.map(item =>
                        item.list && item.list.length > 0 ?
                        <SubMenu 
                            key={item.key} 
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                            {
                                item.list.map(listItem =>
                                    <Menu.Item key={item.key + listItem.key}>
                                        <span>{listItem.title}</span>
                                    </Menu.Item>
                                )
                            }
                        </SubMenu>
                        :
                        <Menu.Item key={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Menu.Item>
                    )
                }
            </Menu>
        )
    }
}

export default SiderMenu
