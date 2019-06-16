import React from 'react';
import {Form,Modal,Input} from 'antd'

class OrderForm extends React.Component {

  render(){
    const formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    // 父组件传递给子组件值
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    // 将表单中没有出现的值做一个双向数据绑定
    getFieldDecorator("id");
    getFieldDecorator("status");
    getFieldDecorator("photo");
    return (
      <Modal
          visible={visible}
          title="添加订单"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="订单编号" >
              {getFieldDecorator('id', {
                rules: [{ required: true, message: '请输入订单编号!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="商品价格" >
              {getFieldDecorator('total', {
                rules: [{ required: true, message: '请输入商品价格!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="订单日期" >
              {getFieldDecorator('order_time', {
                rules: [{ required: true, message: '请输入订单日期!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="服务编号">
              {getFieldDecorator('waiter_id', {
                rules: [{ required: true, message: '请输入服务编号!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="地址编号">
              {getFieldDecorator('address_id',{
                rules: [{ required: true, message: '请输入顾客编号!' }],
              })(<Input/>)}
            </Form.Item>
            <Form.Item label="顾客编号">
              {getFieldDecorator('customer_id', {
                rules: [{ required: true, message: '请输入顾客编号!' }],
              })(<Input/>)}
            </Form.Item>
           
          </Form>
        </Modal>
    );
  }
}
// 将通过props从父组件中获取的值拿出来设置到表单元素上
const mapPropsToFields = (props)=>{
  let obj = {};
  for(let key in props.initData){
    let val = props.initData[key];
    obj[key] = Form.createFormField({value:val})
  }
  return obj;
}

export default Form.create({
  mapPropsToFields
})(OrderForm);