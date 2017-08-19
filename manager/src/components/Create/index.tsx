import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Modal, Button, Icon, Input, message} from 'antd';

import {connect} from 'react-redux'

class Create extends React.Component<Iprops, Istate> {
	state = {
		loading: false,
		visible: false,
    }
    showModal = () => {
		this.setState({
			visible: true,
		});
	}
	handleOk = () => {
		this.setState({ loading: true });
		setTimeout(() => {
			this.setState({ loading: false, visible: false });
			let productName = document.querySelector('#proInput').value;
			this.addNewProduct(productName);
		}, 1000);
	}

	addNewProduct (name) {
		const {curUserName}  = this.props;
		if (curUserName == '') {
			message.error('您还没有登录，无法创建新产品！');
			return;
		}
		fetch("/addNewProduct", {
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: `person=${curUserName}&product=${name}`
			}).then(function(res) {
				return res.json();
			}).then(function (data) {
				switch (data.code) {
					case 200:
						message.success('创建商品成功！');
						break;
					case 4008: 
						message.error('该商品已经创建，不可重复创建！');
						break;
					case 5001:
						message.error('服务器错误，创建失败');
						break;
					case 500:
						message.error('服务器出错，请稍后重试！');
						break;
					default:
						alert('还行啊');
						return;
				}
			});
	}

	handleCancel = () => {
		this.setState({ visible: false });
	}

    render() {
		const { visible, loading } = this.state;
		return (
			<span>
				<Icon type="plus" style={{ color: '#333', cursor: 'pointer' }} onClick={this.showModal} />  
				<Modal
					visible={visible}
					title="创建新的产品"
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					footer={[
						<Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
						<Button key="submit" type="primary" size="large" loading={loading} onClick={this.handleOk}>
							确定
						</Button>,
					]}>
					<h3>产品名称</h3> 
					<Input size="large" id='proInput' />
				</Modal>
			</span>
		);
	}
}

interface Iprops {
  curUserName: string
}

interface Istate {
}

function mapStateToProps(state) {
  return {
    curUserName: state.handleUser.curUserName
  }
}

const Index = connect(
  mapStateToProps,
  null
)(Create)

export default Index;
