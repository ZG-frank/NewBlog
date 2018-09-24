import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Dropdown, Menu } from 'antd';
import './index.less';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank">1st menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank">3rd menu item</a>
        </Menu.Item>
    </Menu>
  );

ReactDOM.render(
    <div className="content">
        <Dropdown overlay={menu} trigger={['click']}>
            <Button>Hello, world!</Button>
        </Dropdown>
    </div>
    ,
    document.getElementById('root')
);