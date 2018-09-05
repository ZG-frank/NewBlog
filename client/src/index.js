import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'antd';
// import './index.css';

console.log([1,2,3].includes(2),'test es6');
let a = () => {
    return 3;
}
console.log(a(), 'test arrow function');

ReactDOM.render(
    <div style={{ margin: 20 }}>
        <Button>Hello, world!</Button>
    </div>
    ,
    document.getElementById('root')
);