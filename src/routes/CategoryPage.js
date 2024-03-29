import React from 'react';
// 引入css进行页面美化
import styles from './CustomerPage.css'
// 导入组件
import {Modal,Button,Input, Table,message,Icon} from 'antd'
import axios from '../utils/axios'
import CategoryForm from './CategoryForm'


const Search = Input.Search
// 组件类必须要继承React.Component，是一个模块，顾客管理子功能
class CategoryPage extends React.Component {
  // 局部状态state
  constructor(){
    super();
  idn:[],
    this.state = {
    
      list:[],
      loading:false,
      visible:false,
      category:{}
    }
  }
  // 在生命周期钩子函数中调用重载数据
  componentDidMount(){
    this.reloadData();
  }

  // 重载数据
  reloadData(){
    this.setState({loading:true});
    axios.get("/category/findAll")
    
    .then((result)=>{
      //console.log(result);
      // 将查询数据更新到state中
      this.setState({list:result.data})
    })
    .finally(()=>{
      this.setState({loading:false});
    })
  }
 // 单个删除
 handleDelete(id){
  Modal.confirm({
    title: '确定删除这条评论吗?',
    content: '删除后数据将无法恢复',
    onOk:() => {
      // 删除操作
      axios.post("/category/deleteById",{
          id:id
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
      console.log(values)
      // 表单校验完成后与后台通信进行保存
      axios.post('/category/saveOrUpdate',values)
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
    this.setState({category:{},visible:true})
  }
  // 去更新
  toEdit(record){
    // 更前先先把要更新的数据设置到state中
    this.setState({category:record})
    // 将record值绑定表单中
    this.setState({visible:true})
  }
  handleSearch = (value) => {
    console.log(value)
      if(value==''||value==null||value==undefined){
        this.reloadData()
      }
      axios.get('category/findById', { params: { id: value } })
        .then((result) => {
          
          if (200 === result.status) {
            let temp = [];
            if(result.data!=undefined){
              console.log(1)
              temp.push(result.data)
            }
            
        
            this.setState({ list: temp })
  
          }
        })
    }

  //
  toDetails(record){
    console.log(record);
    //跳转
    this.props.history.push("/categoryDetails")
    }
    
  // 组件类务必要重写的方法，表示页面渲染
  render(){
    // 变量定义
    let columns = [{
      title:'编号',
      dataIndex:'id'
    },{
      title:'服务项目',
      dataIndex:'name'
    },{
      title:'服务类型',
      align:"center",
      dataIndex:'parentId'
    },{
      title:'操作',
      width:120,
      align:"center",
      render:(text,record)=>{
        return (
          <div>
            <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}><Icon type="delete" ></Icon></Button>
            <Button type='link' size="small" onClick={this.toEdit.bind(this,record)}><Icon type="edit" ></Icon></Button>
            <Button type='link' size="small" onClick={this.toDetails.bind(this,record)}><Icon type="eye" ></Icon></Button>
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
    //
    // 返回结果 jsx(js + xml)
    return (
      <div className={styles.customer}>
        <div className={styles.title}>分类管理</div>
        <div className={styles.btns}>
        <Button onClick={this.toAdd.bind(this)}>添加</Button> &nbsp;
        <Search 
                       placeholder="分类ID查询"
            
                       onSearch={value => this.handleSearch(value)}
            
                       style={{ width: 200,  float:'right' }}
                     />
        </div>
        <Table 
          bordered
          rowKey="id"
          size="small"
          loading={this.state.loading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.list}/>

         <CategoryForm
          initData={this.state.category}
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}/>
      </div>
    )
  }
}

export default CategoryPage;