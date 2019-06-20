import React from 'react'
import {Button,Tabs,Table} from 'antd'
import axios from '../utils/axios';

class CustomerDetails extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      customer:{},
      address:[],
      orders:[]
    }
  }

  componentDidMount(){
    let payload = this.props.location.payload;
    if(payload){
      this.setState({customer:payload})
      this.loadAddress();
      this.loadOrders();
    } else {
      this.props.history.push("/customer")
    }
  }
  //加载地址信息
  loadAddress(){
    axios.get("/address/query",{
      params:{customerId:this.props.location.payload.id}
    })
    .then((result)=>{
      this.setState({
        address:result.data
      })
    })
  }
   //加载订单信息
   loadOrders(){
    axios.get("/order/query",{
      params:{customerId:this.props.location.payload.id}
    })
    .then((result)=>{
      this.setState({
        orders:result.data
      })
    })
  }



  render(){
    const { TabPane } = Tabs;
    
    function callback(key) {
      console.log(key);
    }
    let columnsOrders = [{
      title:'订单编号',
      width:120,
      dataIndex:'id'
      },{
      title:'订单日期',
      dataIndex:'orderTime'
      },{
      title:'顾客',
      dataIndex:'customer.realname'
      },{
      title:'服务员',
      width:140,
      dataIndex:'waiter.realname'
      },{
        title:'市',
        width:140,
        dataIndex:'address.city'
        },{
          title:'区',
          width:140,
          dataIndex:'address.area'
          },{
            title:'详细地址',
            width:140,
            dataIndex:'address.address'
            }]


    let columns = [{
      title:'地址ID',
      dataIndex:'id'
    },{
      title:'省',
      dataIndex:'province'
    },{
      title:'市',
      dataIndex:'city'
    },{
      title:'区',
      dataIndex:'area'
    },{
      title:'详细地址',
      dataIndex:'address'
    },{
      title:'电话',
      dataIndex:'telephone'
    }]

    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="基本信息" key="1">
            <tr>
              <td valign='top'>头像：<img width={100} height={100} src={"http://134.175.154.93:8888/group1/"+this.state.customer.photo}/>
</td></tr>


             <tr><td>姓名：{this.state.customer.realname}</td></tr>
           <tr> <td>电话：{this.state.customer.telephone}</td> </tr>
               
          
          </TabPane>
          <TabPane tab="服务地址" key="2">
            {/* {JSON.stringify(this.state.address)} */}
            <Table 
              bordered
              rowKey="id"
              size="small"
              loading={this.state.loading}
              columns={columns}
              dataSource={this.state.address}/>


          </TabPane>
          <TabPane tab="订单" key="3">
            {/* {JSON.stringify(this.state.orders)} */}
            <Table 
              bordered
              rowKey="id"
              size="small"
              loading={this.state.loading}
              columns={columnsOrders}
              dataSource={this.state.orders}/>

          </TabPane>
        </Tabs>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}

export default CustomerDetails;