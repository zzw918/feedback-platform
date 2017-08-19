import * as React from 'react';
import {message, Row, Col, Tooltip, notification, Select,Button, Radio } from 'antd'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import {connect} from 'react-redux'
import {addProducts} from '../../redux/Action/index'

import { Link, browserHistory} from 'react-router'

import './style.less';

class Index extends React.PureComponent<Iprops, Istate> {

	constructor(props) {
	    super(props);
		this.state = {
			name: 'zzw',
			age: 56,
			productType: '',
			questionType: '',
			title: ''
		}
	}

	componentWillMount () { 
		let that = this;
		fetch('/api/getAllProduct', {
            method: 'GET'
        }).then(function(res) {
            return res.json();
        }).then(function (data) {
            if (data.code == 200) {
			  console.log('获取到所有产品');
			  that.props.addAllProduct( data.data)
            } else {
              console.log(data.message);
            }
        })
	}

	confirmLeave (e) {
		 const {curUserName} = this.props;
		 if (curUserName == '') {
			e.preventDefault();
			message.error('您还没有登录！无法查看"我的建议"');
		 }
	}

	handleTitleChange = (e) => {
		this.setState({title: e.target.value});
	}

	openNotification = () => {
		const args = {
			message: '输入通知',
			description: '标题最多可以输入不超过50个字符',
			duration: 3.5,
			type: 'info',
		};
		notification.open(args);
	};

	handleSubmit = () => {
		const {curUserName} = this.props;
		let content = document.querySelector('.editable-content').innerHTML.replace(/<div>|<\/div>|<br>|&nbsp;/g, "");
		let postObj = {
			productType: this.state.productType,
			questionType: this.state.questionType,
			title: this.state.title,
			content: content
		}
		if (curUserName == '') {
			message.error('还未登录，无法提交建议！');
			return;
		}
		if (postObj.productType == '') {
			message.error('请选择一个产品！');
			return;
		}
		if (postObj.productType == '') {
			message.error('请选择问题类型');
			return;
		}
		if (postObj.title == '') {
			message.error('标题不能为空！');
			return;
		}
		if (postObj.content == '') {
			message.error('建议内容不能为空！');
			return;
		}

		// 提交的status是当前建议的状态，对于刚刚提交的建议，其状态就仅仅是0，表示已提交。
		 fetch('/api/submitSug', {
                method: 'POST',
                headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				credentials: 'same-origin',
				body: `productType=${postObj.productType}&questionType=${postObj.questionType}&title=${postObj.title}&content=${content}&username=${curUserName}&status=0`
			}).then(function (res) {
				return res.json();
			}).then(function (data) {
				console.log('返回数据',data);
				if (data.code == 200) {
					message.success('提交建议成功！即将跳转到我的建议...');
					setTimeout(function () {
						browserHistory.push('/allSuggestions');
					}, 2500);
				} else {
					message.error('提交失败！确定是否为网络问题！');
				}
			})
	}

	render () {
		let that = this;
		const Option = Select.Option;
		function handleChange(value) {
			notification.open({
				message: '您选择的产品',
				description: `选中 ${value}`,
				duration: 3.5,
				type: 'success'
			});
			that.setState({productType: value});
		}
		const {returnProduct} = this.props;
		function onChangeRadio (e) {
			 console.log(`radio checked:${e.target.value}`);
			 that.setState({questionType: e.target.value});
		}
		return (
			<div className="index-wrap">
				<Row type="flex" className="heading" justify='space-between'>
					<Col className="title" span={4}><Link to="/"> CVTE FeedBack</Link></Col>
					<Col className='my' span={4}><Link to="/log">登录</Link>       <Link to="/allSuggestions" onClick={(e) => this.confirmLeave(e)}>我的建议</Link></Col>
				</Row>
				<Row type="flex" className="main-title">
					<Col span={24}>
						<div className="putforward">
							提出新建议
						</div>
					</Col>
				</Row>
				<div className="main-content">
					<Row type="flex" align="top" className="choose-type">
						<Col span={3} className="label-wrap">产品选择：</Col>
						<Col span={21} className="content-wrap" >
							  <div>
								<Select defaultValue="请选择" style={{ width: 140 }} onChange={handleChange}>

									{
										returnProduct.map(function (list, index) {
											return (
												<Option key={index} value={list.name}>{list.name}</Option>
											)
										})
									}
								</Select>
							</div>
						</Col>
					</Row>
					<Row type="flex" align="top" className="choose-type">
						<Col span={3} className="label-wrap">请选择问题类型：</Col>
						<Col span={21} className="content-wrap">
							<Row  type="flex" justify="space-between">	
								<div>
									<RadioGroup onChange={onChangeRadio} defaultValue="a">
										<RadioButton value="1">
											功能建议
										</RadioButton>
										<RadioButton value="2">
											产品建议
										</RadioButton>
										<RadioButton value="3">
											产品需求
										</RadioButton>
									</RadioGroup>
								</div>
							</Row>
						</Col>
					</Row>
					<Row type="flex" align="top" className="choose-type">
						<Col span={3} className="label-wrap">标题：</Col>
						<Col span={21} className="content-wrap" >
							<input placeholder="可最多输入40个字符" type="text" onFocus={this.openNotification} onChange={(e) => this.handleTitleChange(e)} className="question-title"/>
						</Col>
					</Row>
					<Row type="flex" align="top" className="choose-type">
						<Col span={3} className="label-wrap">内容：</Col>
						<Col span={21} className="content-wrap" >
							<div contentEditable={true}  className="editable-content">
							</div>
							<Button type="primary" className="submit-suggestion" onClick={() => this.handleSubmit()}>提交建议</Button>
						</Col>
					</Row>
				
				</div>
				<Row type="flex" className="footer">
					<Col className="footer" span={24}>@copyright 2017</Col>
				</Row>
			</div>	 
		);
	}
};

interface Iprops {
	age: number,
	school: string,
	addAllProduct: any,
	returnProduct: any,
	curUserName: string
}

interface Istate {
	name: string,
	age:number,
	productType: string,
	questionType: string,
	title: string
}

function mapDispatchToProps (dispatch) {
	return {
		addAllProduct: (data) => dispatch(
			addProducts(data)
		)
	}
}

function mapStateToProps (state) {
	return {
		returnProduct: state.handleProducts.allProducts || [],
		curUserName: state.handleUser.curUserName
	}
}

const IndexX = connect(
	mapStateToProps,
	mapDispatchToProps
)(Index);

export default IndexX;

