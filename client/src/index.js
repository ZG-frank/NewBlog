import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon, Dropdown, Menu } from 'antd';
import './index.less';

console.log([1,2,3].includes(2),'test es6');
let a = () => {
    return 3;
}
console.log(a(), 'test arrow function');

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
        <Icon type="right-square" />
    </div>
    ,
    document.getElementById('root')
);