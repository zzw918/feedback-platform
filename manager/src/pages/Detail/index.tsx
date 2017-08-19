import * as React from 'react'
import {message, Row,Col,Tooltip, notification, Select, Button, Radio, Icon, Table, Input,   } from 'antd'
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {connect} from 'react-redux'
import {addComment } from '../../redux/Action/index'

import { Link, browserHistory} from 'react-router'

import './style.less'

class Detail extends React.PureComponent<Iprops, Istate> {
    constructor(props) {
        super(props);
        this.state = {
           comment: '' 
        }
    }

    componentDidMount () {
        document.body.scrollTop = 0;
    }

    componentWillMount () {
        const { filteredSuggestions} = this.props
        let that = this;
        let curSugId = filteredSuggestions[this.props.location.query.type].suggestionId;
        fetch("/getSomeComments", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `suggestionId=${curSugId}`
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            switch (data.code) {
                case 200:
                    console.log(data.data);
                    that.props.addAllComment(data.data);
                    break;
                case 500: 
                    message.error('获取评论失败！');
                default: 
                    return;
            }
        })
    }

    handleChange (e) {
        this.setState({comment: e.target.value})
    }

    submitComment () {
        const {curProName, filteredSuggestions, curUserName} = this.props
        let curSug = filteredSuggestions[this.props.location.query.type];
        let comContent = this.state.comment;
        let comment = {
            suggestionId: curSug.suggestionId,
            person: curUserName,
            content: comContent
        }
        fetch("/subComment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `suggestionId=${comment.suggestionId}&person=${comment.person}&content=${comment.content}&type=1`
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            switch (data.code) {
                case 200:
                    message.success('提交评论成功！');
                    break;
                case 500: 
                    message.error('提交评论失败！');
                default: 
                    return;
            }
        })
    }


    render () {
        const {curProName, filteredSuggestions, comments} = this.props
        var curSug = filteredSuggestions[this.props.location.query.type];
        return (
            <div className='detail-wrap'>
                <Row type='flex' className='heading' justify='space-between'>
					<Col className='title' span={4}><Link to='/'>CVTE 产品反馈管理平台</Link></Col>
					<Col className='my' span={4}>详情页</Col>
				</Row>
                <Row type='flex' className='main-title'>
					<Col span={24}>
						<div className="product"> {curProName} <span className="ant-divider" /> {curSug.type}</div>
                        <Row type='flex' className='product-content' justify='space-between'>
                            <Col span={15} className='spe'>
                                <h2 className="sug-title">	{curSug.title}</h2>
                                <div className="sug-info">
                                    <span className="publisher">{curSug.username}</span>
                                    <span className="publish-time">{curSug.time}</span>
                                </div>
                                <div className="sug-detail">
                                    <p>{curSug.content}</p>
                                </div>
                                <div className="comments">
                                    <h3><Icon type="solution"/>   评论</h3>
                                    <div className="com-wrap">
                                        {
                                            comments.map(function (item, index) {
                                                return (
                                                    <div className="item-wrap" key={index}>
                                                        <div className="com-info">
                                                            <span className="person">{item.person} ({item.type == 1 ? '管理员' : '用户'}) </span>
                                                            <span className="time">{new Date(item.time).toLocaleString()}</span>
                                                        </div>
                                                        <div className="com-content">
                                                            <p>{item.content}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <TextArea rows={5} className='textarea' placeholder='评论该用户...' onChange = {(e) => this.handleChange(e)}/>
                                    <Button type='primary' onClick = {() => this.submitComment()}>发布评论</Button>
                                </div>
                            </Col>
                            <Col span={8} className='recom'>
                                <h3><Icon type='exception'/>   最近建议</h3>
                                <ul>
                                    <li>
                                        <p>max能否添加多模块书写系统？</p>
                                        <p>
                                            <span className="user">朱振伟</span> 
                                            <span className="com-number">3评论</span>
                                        </p>
                                    </li>
                                     <li>
                                        <p>max能否添加多模块书写系统？</p>
                                        <p>
                                            <span className="user">何婷婷</span> 
                                            <span className="com-number">3评论</span>
                                        </p>
                                    </li>
                                     <li>
                                        <p>max能否添加多模块书写系统？</p>
                                        <p>
                                            <span className="user">宝宝</span> 
                                            <span className="com-number">3评论</span>
                                        </p>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
					</Col>
				</Row>
            </div>
        )
    }
}



interface Iprops {
    curProName: string,
    filteredSuggestions: any,
    location: any,
    curUserName: string,
    addAllComment: any,
    comments: any
}

interface Istate {
    comment: ''
}

function mapStateToProps(state) {
	return {
        curProName: state.handleProducts.curProName,
        filteredSuggestions: state.handleSuggestions.filteredSuggestions,
        curUserName: state.handleUser.curUserName,
        comments: state.handleComments.someSuggestions
	}
}

function mapDispatchToProps(dispatch) {
    return {
        addAllComment: (comments) => dispatch(
            addComment(comments)
        ),
    }
}



const Index = connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);

export default Index;