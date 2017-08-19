import * as React from 'react'
import {message, Row,Col,Tooltip, notification, Select, Button, Radio, Table, Icon, Input, Steps } from 'antd'
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {connect} from 'react-redux' 
import {filterSuggestion} from '../../redux/Action/index' 
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

    componentWillMount () {
        const suggestionId = this.props.location.query.suggestionId;
        this.props.filterSug(suggestionId);
        let that = this;

        // 在进入页面的时候，通过suggestionId向后端发送请求，然后获取到数据进行填充。
        fetch('/api/getSomeComments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `suggestionId=${suggestionId}`
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

    componentDidMount () {
        document.body.scrollTop = 0
    }

    subComment () {
        const {username} = this.props;
        let suggestionId = this.props.location.query.suggestionId;
        let content = this.state.comment;
        fetch('/api/subComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `suggestionId=${ suggestionId }&person=${ username }&content=${content}&type=2`
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

    handleChange (e) {
        this.setState({comment: e.target.value})
    }

    render () {
        const Step =   Steps.Step;
        const {filteredSug, comments} = this.props;
        let that = this;
        return (
            <div className="detail-wrap">
                <Row type="flex" className="heading" justify="space-between">
					<Col className="title" span={4}><Link to="/">CVTE FeedBack</Link></Col>
					<Col className="my" span={4}>详情页</Col>
				</Row>
                <Row type="flex" className="main-title">
					<Col span={24}>
						<div className="product">{(filteredSug.length > 0) ? filteredSug[0].productType : ''}<span className="ant-divider" /> 功能建议</div>
						<div className="progress">
                            <Steps current={(filteredSug.length > 0) ? Number(filteredSug[0].status) : 0}>
                                    <Step title="已提交" description="您的建议已提交，等待审核" />
                                    <Step title="审核通过" description="您的建议通过审核" />
                                    <Step title="已采纳" description="您的建议被我们采纳" />
                                    <Step title="已实现" description="已经解决您的问题" />
                            </Steps>
                        </div>
                        <Row type="flex" className="product-content" justify="space-between">
                            <Col span={15} className="spe">
                                {
                                    filteredSug.map(function (item, index) {
                                        return (
                                              <div key={index}>
                                                 <h2 className="sug-title">{item.title}</h2>
                                                 <div className="sug-info">
                                                    <span className="publisher">{item.username}</span>
                                                     <span className="publish-time">{new Date(item.time).toLocaleString() }</span>
                                                 </div>
                                                 <div className="sug-detail">
                                                     <p>{item.content}</p>
                                                </div>
                                                 <div className="comments">
                                                     <h3><Icon type="solution"/>   评论</h3>
                                                       <div className="com-wrap">
                                                           {
                                                               comments.map(function (item, index) {
                                                               return (
                                                                    <div className="item-wrap" key={index}>
                                                                        <div className="com-info">
                                                                           <span className="person">{item.person} ({item.type == 2 ? "我" : "管理员"}) </span>
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
                                                     <TextArea rows={5} className="textarea" placeholder="写下你的评论..." onChange = {(e) => that.handleChange(e)}/>
                                                     <Button type="primary" onClick={ () => that.subComment()}>发布评论</Button>
                                                 </div>
                                             </div> 
                                        )
                                    })
                                }
                            </Col>
                            <Col span={8} className="recom">
                                <h3><Icon type="exception"/> 我的所有建议 </h3>
                                <ul>
                                    <li>
                                        <p>如何给maxhub添加互动类游戏功能？</p>
                                        <p>
                                            <span className="time">2017-08-02</span> 
                                            <span className="com-number">3评论</span>
                                        </p>
                                    </li>
                                     <li>
                                        <p>max能否添加多模块书写系统？</p>
                                        <p>
                                            <span className="time">2017-08-02</span> 
                                            <span className="com-number">3评论</span>
                                        </p>
                                    </li>
                                     <li>
                                        <p>max能否添加多模块书写系统？</p>
                                        <p>
                                            <span className="time">2017-08-02</span> 
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
    location: any,
    filterSug: any,
    filteredSug: any,
    username: any,
    addAllComment: any,
    comments: any
}

interface Istate {
    comment: string
}

function mapDispatchToProps (dispatch) {
	return {
		filterSug: (id) => dispatch(
			filterSuggestion(id)
        ),
        addAllComment: (comments) => dispatch(
             addComment(comments)
        ),
	}
}

function mapStateToProps (state) {
	return {
        filteredSug: state.handleSuggestions.filteredSug,
        username: state.handleUser.curUserName,
        comments: state.handleComments.someSuggestions
	}
}

const Index = connect(
	mapStateToProps,
	mapDispatchToProps
)(Detail);

export default Index;