import * as React from 'react'
import {message, Row,Col,Tooltip, notification, Select, Button, Radio, Table, Icon, Input } from 'antd'
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import { connect } from 'react-redux'
import {addCurUser} from '../../redux/Action/index.js'

import { Link, browserHistory} from 'react-router'

import './style.less'

class Log extends React.PureComponent<Iprops, Istate> {
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            ifUp: true,
            username: '',
            password: '',
            passwordAgain: ''
        }
    }

    componentWillMount () {
        if ( this.props.location.query.type == 'login') {
            this.setState({ifUp: true});
        }
    }
    
    componentDidMount () {
        // 进入页面之后，使得header部分贴近顶部
        document.body.scrollTop = 0;
    }

    handleRegister () {
        this.setState({ifUp: false});
    }

    handleLog () {
        this.setState({ifUp: true});
    }

    handleUser (e) {
        this.setState({username: e.target.value});
    }

    handlePassword (e) {
        this.setState({password: e.target.value});
    }

    handlePasswordAgain (e) {
        this.setState({passwordAgain: e.target.value});
    }

    login () {
       let logObj = {
            username: this.state.username,
            password: this.state.password,
            // type为2表示普通用户
            type: 2
        }
       console.log(logObj);
       let that = this;
       fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
			    },
                body: `userName=${logObj.username}&password=${logObj.password}&type=${logObj.type}`
			}).then(function (res) {
				return res.json();
			}).then(function (data) {
                console.log(data);
				switch (data.code) {
					case 200:
                        message.success('登录成功！');
						// 同理，登录成功之后，我们也需要将当前的用户名称添加到store中。 
						that.props.getCurUsername(data.data.name);
						browserHistory.push('/');
						break;
					case 4002: 
						message.error('密码输入有误！');
						break;
					case 2001: 
						message.error('该用户未注册！');
						break;
					case 5001:
						message.error('服务器错误，登录失败');
						break;
                    default:
                        alert('登录失败');
						return;
				}
			});
    }

    register () {
        let regObj = {
            username: this.state.username,
            password: this.state.password,
            passwordAgain: this.state.passwordAgain,
            // type为2表示普通用户
            type: 2
        }
        if (regObj.username == '') {
            message.error('请输入用户名！');
            return;
        }
        let that = this;
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${regObj.username}&password=${regObj.password}&passwordAgain=${regObj.passwordAgain}&type=${regObj.type}`
        }).then(function(res) {
            return res.json();
        }).then(function (data) {
                console.log(data);
            switch (data.code) {
                case 200:
                    message.success('注册成功！');
                    // 注册成功时，我们需要将用户的 userName 存储到 store 中
                    that.props.getCurUsername(data.data.name);
                    browserHistory.push('/');
                    break;
                case 4001: 
                    message.error('两次输入密码不一致！');
                    break;
                case 4003: 
                    message.error('此用户已经注册！');
                    break;
                case 5001:
                    message.error('服务器错误，注册失败');
                    break;
                case 500:
                    message.error('服务器出错，请稍后重试！');
                    break;
                default:
                    alert('失败');
                    return;
            }
        });
    }

    render () {
        return (
            <div className="detail-wrap">
                <Row type="flex" className="heading" justify="space-between">
					<Col className='title' span={4}><Link to="/">CVTE 产品反馈管理平台</Link></Col>
				</Row>
                <div className="main">
                   <div className="log">
                       <div className="title">
                           {
                               !!this.state.ifUp ? 
                               <span>登录</span>
                               :
                               <span>注册</span>
                           }
                       </div>
                       <div className="form">
                           <Input className="log-input" placeholder="用户名" onChange={(e) => this.handleUser(e)} />
                           <Input className="log-input" placeholder="密码" type="password"  onChange={(e) => this.handlePassword(e)} />
                           {
                               !this.state.ifUp &&
                               <Input className="log-input" placeholder="再次输入密码" type="password"  onChange={(e) => this.handlePasswordAgain(e)} />
                           }
                       </div>
                       <div className="sub-button">
                        {
                            !!this.state.ifUp ? 
                            <div> 
                                <Button type="primary" onClick={ () => this.login() } >现在登录</Button>
                                <span className="res">还没账号，<span onClick={() => this.handleRegister()}>现在注册</span>？</span>
                            </div>
                            :
                            <div> 
                                <Button type="primary" onClick={ () => this.register() } >立即注册</Button>
                                <span className="res">已有账号，<span onClick={() => this.handleLog()}>现在登录？</span></span>
                            </div>
                        }
                       </div>
                   </div>
                </div>
            </div>
        )
    }
}

interface Iprops {
    getCurUsername: any,
    location: any
}

interface Istate {
    ifUp: boolean,
    username: string,
    password: any,
    passwordAgain: any
}

function mapDispatchToProps (dispatch) {
    console.log(dispatch)
    return {
        getCurUsername: (text) => dispatch (
            addCurUser(text)
        )
    }
}

const Index = connect(
    null,
    mapDispatchToProps
)(Log);

export default Index