import React from 'react';
// 引入css进行页面美化
import styles from './ProductPage.css'
// 导入组件
import {Modal,Button, Table,message,Icon} from 'antd'
import axios from '../utils/axios'
import ProductForm from './ProductForm'


// 组件类必须要继承React.Component，是一个模块，产品管理子功能
class ProductPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
    this.state = {
      ids:[], // 批量删除的时候保存的id
      list:[],
      loading:false,
      visible:false,
      product:{}
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("/product/findAll")
    .then((result)=>{
      // 将查询数据更新到state中
      //console.log()
      this.setState({list:result.data})
    })
    .finally(()=>{
      this.setState({loading:false});
    })
  }
  // 批量删除
  handleBatchDelete(){
    Modal.confirm({
      title: '确定删除这些记录吗?',
      content: '删除后数据将无法恢复',
      onOk:() => {
        axios.post("/product/batchDelete",{ids:this.state.ids})
        .then((result)=>{
          //批量删除后重载数据
          message.success(result.statusText)
          this.reloadData();
        })
      }
    });
  }

  // 单个删除
  handleDelete(id){
    Modal.confirm({
      title: '确定删除这条记录吗?',
      content: '删除后数据将无法恢复',
      onOk:() => {
        // 删除操作
        axios.get("/product/deleteById",{
          params:{
            id:id
          }
        })
        .then((result)=>{
          // 删除成功后提醒消息，并且重载数据
          message.success(result.statusText);
          this.reloadData();
        })
      }
    });
  }
  // 取消按钮的事件处理函数
  handleCancel = () => {
    this.setState({ visible: false });
  };
  // 确认按钮的事件处理函数
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // alert(JSON.stringify(values));
      // 表单校验完成后与后台通信进行保存
      axios.post("/product/saveOrUpdate",values)
      .then((result)=>{
        message.success(result.statusText)
        // 重置表单
        form.resetFields();
        // 关闭模态框
        this.setState({ visible: false });
        this.reloadData();
      })
      
    });
  };
  // 将子组件的引用在父组件中进行保存，方便后期调用
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  // 去添加
  toAdd(){
    // 将默认值置空,模态框打开
    this.setState({product:{},visible:true})
  }
  // 去更新
  toEdit(record){
    // 更前先先把要更新的数据设置到state中
    this.setState({product:record})
    // 将record值绑定表单中
    this.setState({visible:true})
  }
  // toDetails(record){
  //   console.log(record);
  //   //跳转
  //   this.props.history.push("/productDetails")
  // }

  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [{
      title:'产品名称',
      dataIndex:'name'
    },{
      title:'描述',
      dataIndex:'description'
    },{
      title:'单价',
      align:"center",
      dataIndex:'price'
    },{
      title:'图片',
      align:"center",
      dataIndex:'photo',
      render(text){
        return (
          <img width={40} height={40} src={"http://134.175.154.93:8888/group1/"+text}/>
        )
      }
    },{
      title:'操作',
      width:160,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}><Icon type="delete"></Icon></Button>
            <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}><Icon type="edit"></Icon></Button>
            {/* <Button type='link' size="small" onClick={this.toDetails.bind(this,record)}><Icon type="eye" ></Icon></Button> */}
          </div>
        )
      }
    }]
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // 当用户操作复选按钮的时候，将值获取到并且保存到state中
        this.setState({
          ids:selectedRowKeys
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
      }),
    };
    
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.product}>
        <div className={styles.title}>产品管理</div>
        <div className={styles.btns}>
          <Button onClick={this.toAdd.bind(this)}><Icon type="plus-square"></Icon></Button> &nbsp;
          <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button> &nbsp;
          <Button type="link">导出</Button>
        </div>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

        <ProductForm
          initData={this.state.product}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default ProductPage;