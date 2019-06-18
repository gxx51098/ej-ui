import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router'
import styles from './CustomerPage.css'

const { Header, Sider, Content } = Layout;

class IndexPage extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.title} style={{ height: 64, backgroundColor: "#cccccc" }} >e洁家政</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to='customer'>
                <Icon type="user" />
                <span>客户管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to='order'>
                <Icon type="user" />
                <span>订单管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
            <Link to='product'>
              <Icon type="user" />
              <span>产品管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to='category'>
                <Icon type="user" />
                <span>分类管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to='comment'>
                <Icon type="user" />
                <span>评价管理</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to='waiter'>
                <Icon type="user" />
                <span>员工管理</span>
              </Link>
            </Menu.Item>          
       </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(IndexPage);
