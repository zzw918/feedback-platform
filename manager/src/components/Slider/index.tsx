import * as React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

import {connect} from 'react-redux'
import {addProducts, filterPro, updateCurName } from '../../redux/Action/index'

class Slider extends React.Component<Iprops, Istate> {
	state = {
		current: '0',
		openKeys: [],
	}

	componentWillMount () {
		let that = this;
		fetch("/getAllProduct").then(function(res) {
			return res.json();
		}).then(function (data) {
			if (data.code == 200) {
				that.props.addAllProduct(data.data);
				that.props.filterProducts(data.data[0].name);
				that.props.curProName(data.data[0].name)
			} else {
				console.log(data.message);
			}
		})
	}

	handleClick = (e) => {
		console.log('Clicked: ', e.item.props.children);
		let productName =  e.item.props.children;
		this.props.filterProducts(productName)
		this.props.curProName(productName)
		this.setState({ current: e.key});
	}

	onOpenChange = (openKeys) => {
		const state = this.state;
		const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
		const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));
		let nextOpenKeys = [];
		if (latestOpenKey) {
			nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
		}
		if (latestCloseKey) {
			nextOpenKeys = this.getAncestorKeys(latestCloseKey);
		}
		this.setState({ openKeys: nextOpenKeys });
	}

	getAncestorKeys = (key) => {
		const map = {
			sub3: ['sub2'],
		};
		return map[key] || [];
	}

	render() {
		const {allProducts, curUserName} = this.props
		return (
			<Menu
				mode="inline"
				openKeys={this.state.openKeys}
				defaultOpenKeys={['sub2']}
				selectedKeys={[this.state.current]}
				style={{ width: '100%' }}
				onOpenChange={this.onOpenChange}
				onClick={this.handleClick}>
				<SubMenu key="sub1" title={<span><Icon type="heart" style={{ color: '#08c' }} /><span>我关注的产品</span></span>}>
					<Menu.Item key="666">Maxhub 1</Menu.Item>
				</SubMenu>
				<SubMenu key="sub2" title={<span><Icon type="database" style={{ color: '#08c' }} /><span>所有产品</span></span>}>
					{
						allProducts.map(function (list, index) {
							return (
								<Menu.Item key={index}>{list.name}</Menu.Item>
							)
						})
					}
				</SubMenu>
				<SubMenu key="sub3" title={<span><Icon type="plus-circle"  style={{ color: '#08c' }}/><span>我创建的产品</span></span>}>
					{
						allProducts.map(function (list, index) {
							return (
								curUserName == list.person &&
								<Menu.Item key={index + 1000}>{list.name}</Menu.Item>
							)
						})
					}
				</SubMenu>
			</Menu>
		);
		}
	}

interface Iprops {
	addAllProduct: any,
	allProducts: any,
	curUserName: string,
	filterProducts: any,
	curProName: any
}

interface Istate {
    current: string,
    openKeys: any[]
}

function mapDispatchToProps(dispatch) {
	return {
		addAllProduct: (products) => dispatch(
			addProducts(products)

		),
		filterProducts : (name) => dispatch(
			filterPro(name)
		),
		curProName: (name) => dispatch(
			updateCurName(name)
		)
	}
}

function mapStateToProps(state) {
	return {
		allProducts: state.handleProducts.allProducts,
		curUserName: state.handleUser.curUserName
	}
}

const Index = connect(
	mapStateToProps,
	mapDispatchToProps
)(Slider)


export default Index;