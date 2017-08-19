import * as React from 'react';
import {message, Row,Col,Tooltip, notification, Select, Button, Radio, Table, Icon} from 'antd'
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Slider from '../../components/Slider'
import Create from '../../components/Create'

import { connect } from 'react-redux'
import {addSuggestions} from '../../redux/Action/index'

import { Link, browserHistory} from 'react-router'

import './style.less';

class Index extends React.PureComponent<Iprops, Istate> {

	constructor(props) {
	    super(props);
		this.state = {
			name: 'zzw',
			age: 56
		}
	}

	componentWillMount () {
		let that = this;
		setTimeout(function () {
			fetch("/getAllSuggestion").then(function(res) {
				return res.json();
			}).then(function (data) {
				if (data.code == 200) {
					that.props.addAllSuggestions(data.data);
				} else {
					console.log(data.message);
				}
			})
		}, 1000);
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

	render () {
		const Option = Select.Option;

		let {allSuggestions, filteredSuggestions, curProName} = this.props;

		let key = 1;

		let sugLength;
		if (filteredSuggestions) {
			sugLength = filteredSuggestions.length;
			if (filteredSuggestions.length > 0) {
				for (let i = 0; i < filteredSuggestions.length; i++) {
					filteredSuggestions[i].time = new Date(filteredSuggestions[i].time).toLocaleString()
					filteredSuggestions[i].key = key++;
				}
			}
		}

		const dataSource = filteredSuggestions;

		const columns = [{
				title: '提问人',
				dataIndex: 'username',
				key: 'username',
			}, {
				title: '问题',
				dataIndex: 'title',
				key: 'title',
			}, {
				title: '状态',
				dataIndex: 'status', 
				key: 'status'
			},
			{
				title: '提问时间',
				dataIndex: 'time',
				key: 'time'
			}, 
			 {
				title: '操作',
				key: 'action',
				render: (text, record, index) => (
					<span>
						<Link to={{ pathname: '/detail', query: { type: index } }}>查看详情</Link>
						<span className="ant-divider" />
						<Link to={{ pathname: '/detail', query: { type: index } }}>回复</Link>
					</span>
				),
			}
		];


		function handleChange(value) {
			console.log(`selected ${value}`);
		}

		return (
			<div className="index-wrap">
				<Row type='flex' className='heading' justify='space-between'>
					<Col className='title' span={6}>CVTE 产品反馈管理平台</Col>
					<Col className='my' span={4}><Link to={{ pathname: '/log', query: { type: 'login' } }} >登录</Link>   |  <Link to={{ pathname: '/log', query: { type: 'register' } }} >注册</Link></Col>
				</Row>

				<Row type='flex' className='content-wrap'>
					<Col className='content-product' span={5}>
						<div className="product">
							<h2 className="product-title">产品列表  <Create/></h2>
							<Slider/>
						</div>
					</Col>
					<Col className='content-info' span={19}>
						<div className="product-tab">
							<div className="product-name">
								<span className='spe-name'>{curProName}</span>(<span className='attention'>关注该产品</span>)
							</div>
							<div className="tab-title">
								 <div className='tab-wrap'>
									<RadioGroup defaultValue="a" size="large">
										<RadioButton value="a">功能建议</RadioButton>
										<RadioButton value="b">产品建议</RadioButton>
										<RadioButton value="c">产品需求</RadioButton>
									</RadioGroup>
								</div>
							</div>	
							<div className="tab-content">
								<Table  dataSource={dataSource} columns={columns} pagination={{ pageSize: 6, total: sugLength }} size="middle" />
							</div>
						</div>
					</Col>
				</Row>
				
				<Row type='flex' className='footer'>
					<Col className='footer' span={24}>@copyright 2017</Col>
				</Row>
			</div>	 
		);
	}
};

interface Iprops {
	age: number,
	school: string,
	addAllSuggestions: any,
	allSuggestions: any,
	filteredSuggestions: any,
	curProName: any
}

interface Istate {
	name: string,
	age:number
}

function mapDispatchToProps(dispatch) {
  return {
    addAllSuggestions: (suggestions) => dispatch(
    	addSuggestions(suggestions)
    )
  }
}

function mapStateToProps(state) {
	return {
		allSuggestions: state.handleSuggestions.allSuggestoins,
		filteredSuggestions: state.handleSuggestions.filteredSuggestions,
		curProName: state.handleProducts.curProName
	}
}

const IX = connect(
	mapStateToProps,
	mapDispatchToProps
)(Index)

export default IX