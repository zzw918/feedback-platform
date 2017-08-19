import * as React from 'react';
import {message,Row, Col,Tooltip,notification, Select, Button,Icon } from 'antd'

import {connect} from 'react-redux'
import {addAllSuggestions} from '../../redux/Action/index'

import { Link, browserHistory} from 'react-router'

import './style.less';

 class Allsug extends React.PureComponent<Iprops, Istate> {

	constructor(props) {
	    super(props);
		this.state = {
            
		}
		console.log('constructor', new Date().getTime());
	}
	
	componentWillMount () {

		const {curUserName} = this.props;
		let that = this;
		fetch('/api/getSomSuggestion', {
                method: 'POST',
                headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				credentials: 'same-origin',
				body: `username=${curUserName}`
			}).then(function (res) {
				return res.json();
			}).then(function (data) {
				console.log('返回数据',data);
				if (data.code == 200) {
					that.props.addSuggestions(data.data);
				} else {
					message.error('获取数据失败！确定是否为网络问题！');
				}
			})
	}
    
	render () {
		const {suggestions}  = this.props;
		return (
			<div className="all-sug-wrap">
				<Row type="flex" className="heading" justify="space-between">
					<Col className="title" span={4}><Link to="/"> CVTE FeedBack</Link></Col>
					<Col className="my" span={4}><Link to='/allSuggestions'>我的建议</Link></Col>
				</Row>
				<Row type="flex" className="main-title">
					<Col span={24}>
						<div className="putforward">
						 <Icon type="user" style={{width: 25}}/>	我的所有建议
						</div>
					</Col>
				</Row>
				 <Row type="flex" className="main-title">
					<Col span={24}>
                        <Row type="flex" className="product-content" justify="space-between">
                            <Col span={15} className="spe">
								<div className="lists">
									{
										suggestions.map(function (item, index) {
											return (
												<div className="list" key={index}>
													{
														item.status == 0 ?
														(
															<div className="status submit">
																已提交
															</div>
														) : 
														(
															item.status == 1 ? 
															(
																<div className="status pass">
																	审核通过
																</div>
															) : 
															(
																item.status == 2 ? 
																(
																	<div className="status receive">
																		已采纳
																	</div>
																): 
																(
																	<div className="status complete">
																		已实现
																	</div>
																)
															)
														)
													}
													<h2 className="sug-title"><Link to={{ pathname: "/detail", query: { suggestionId: item.suggestionId } }} >{item.title}</Link></h2>
													<div className="sug-info">
														<span className="publisher">{item.username}</span>
														<span className="publish-time">{new Date(item.time).toLocaleString()}</span>
													</div>
													<div className="sug-detail">
														<p>{item.content}</p>
													</div>
													<div className="tag">
														<Icon type="tag" /> {item.productType}
													</div>
												</div>
											)
										})
									}
									
								</div>
                            </Col>
                            <Col span={8} className="recom">
                                <h3><Icon type="exception"/>  最新回复</h3>
                                <ul>
                                    <li>
                                        <p>您好，我们已经采纳了您的所有建议。</p>
                                        <p>
                                            <span className="title">如何给maxhub添加互动类游戏功能？</span> 
                                        </p>
                                    </li>
                                     <li>
                                        <p>我们在官方教程上已经详细介绍了，推荐查看</p>
                                        <p>
                                            <span className="title">张三</span> 
                                        </p>
                                    </li>
                                     <li>
                                        <p>max能否添加多模块书写系统？</p>
                                        <p>
                                            <span className="title">张三</span> 
                                        </p>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
					</Col>
				</Row>
				<Row type="flex" className="footer-wrap">
					<Col className="footer" span={24}>@copyright 2017</Col>
				</Row>
			</div>	 
		);
	}
};

interface Iprops {
	curUserName: string,
	addSuggestions: any,
	suggestions: any
}

interface Istate {
}

function mapDispatchToProps (dispatch) {
	return {
		addSuggestions: (data) => dispatch(
			addAllSuggestions(data)
		)
	}
}

function mapStateToProps (state) {
	console.log('state', new Date().getTime());
	return {
		curUserName: state.handleUser.curUserName,
		suggestions: state.handleSuggestions.allSuggestions
	}
}

const Index = connect(
	mapStateToProps,
	mapDispatchToProps
)(Allsug);

export default Index;