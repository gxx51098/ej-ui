import React from 'react';
//引入css进行页面美化
import styles from './CustomerPage.css';
//组件类必须要继承React.Component，是一个模块，顾客管理子功能
import {Modal,Button, Table,message} from 'antd'
import axios from '../utils/axios';


class CustomerPage extends React.Component{
    //局部状态state
    constructor(){
    super();
    this.state = {
        ids:[],
      list:[],
      loading:false
    }
}
      componentDidMount()
      {
        this.reloadData();
      }
        reloadData()
        {
            this.setState({loading:true});
           
         axios.get("/customer/findAll").then((result)=>
        {
          
            // 将查询数据更新到state中
            
          this.setState({list:result.data})   })
          .finally(()=>{
              this.setState({loading:false});
            })
          }
          handleBatchDelete(){
          Modal.confirm({
              title: '确定删除这条记录吗?',
              
              content: '删除后数据将无法恢复',
                 
           onOk:() => {  
               axios.post("/customer/batchDelete",{ids:this.state.ids})
           .then((result)=>{
             //批量删除后重载数据
             message.success(result.statusText)
             this.reloadData();
           })
         }
       });
     }
     handleDelete(id){
   
        Modal.confirm({
          
            title: '确定删除这条记录吗?',
   
            content: '删除后数据将无法恢复',
               
         onOk:() => {
            
                
              // 删除操作
                 
             axios.get("/customer/deleteById",
           {
                
                params:{
                       id:id
                     }
               
               }) .then((result)=>{
                 
               // 删除成功后提醒消息，并且重载数据
               
                 message.success(result.statusText);
              
                  this.reloadData();
               
               })
              
              }
             
             });
            
            }
           
            
        
          // 组件类务必要重写的方法，表示页面渲染
 
//组件类务必要重写的方法，表示页面渲染
    render()
    {
        //变量定义
        let columns=[{ title: '姓名', dataIndex:'realname' },
        { title: '手机号',dataIndex:'telephone'},
        { title: '状态',  align:"center",  dataIndex:'status'},
        {title: '操作',   title:'操作', width:120, align:"center",
        render:(text,record)=>{
     
           return(
                    <div>
          <Button type='link' size="small" onClick={this.handleDelete.bind(this,record.id)}>删除</Button>
                   <Button type='link' size="small">修改</Button>

                    </div>)
                
            }
        }]
  const rowSelection = {
    onChange:(selectedRowKeys,selectedRows)=>{this.setState({ids:selectedRowKeys })
    }, getCheckboxProps:record =>
    ({disabled: record.name === 'Disabled User',
 // Column configuration not to be checked 
 name:record.name,
    }),
    };
    
//返回结果 jsx(js + xml)
        return(
    <div className={styles.customer}>
            <div className={styles.title}>顾客管理</div>
           <div className={styles.btns}>
               <Button>添加</Button> &nbsp;
               <Button onClick={this.handleBatchDelete.bind(this)}>批量删除</Button>&nbsp;
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
  
    
      </div> )
  
    }}
  

export default CustomerPage;