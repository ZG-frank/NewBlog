import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {message} from 'antd'
import CryptoJS from 'crypto-js'
import FormBox from '../components/FormBox'
import Cookies from 'js-cookie'
import * as action from '../store/action'
import * as ROOT_action from '@/store/ROOT/action'
import './index.less'

@connect(
    state => ({ ...state.Login }),
    dispatch => bindActionCreators({...ROOT_action, ...action}, dispatch)
)
class Login extends Component {
    constructor() {
        super()

    }

    submit = (form, changeLoading) => {
        form.validateFields((err, values) => {
            if (!err) {
                changeLoading(true)
                this.timer = setTimeout(() => {
                    changeLoading(false)
                    let { userName, password } = values
                    if (userName == 'admin' && password == '123456') {
                        let message = `M&${userName}&${password}`
                        let key = 'react_starter'
                        let session = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(message, key))
                        Cookies.set('JSESSIONID', session, {expires: 1, path: '/'});
                        Cookies.set('userName', userName, {expires: 1, path: '/'});
                        this.props.ROOT_ChangeUser({name: userName})
                        this.props.history.push('/home')
                    } else {
                        message.error('账号：admin ； 密码：123456')
                    }
                }, 1500)
            }
        });
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <div className='Login_wrap clear clearFix'>
                <div className='form P_auto'>
                    <span className='font icon-react'></span>
                    <FormBox submit={this.submit} {...this.props}/>
                </div>
            </div>
        )
    }
}

export default Login
