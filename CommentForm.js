import React from 'react';
import {Form,Modal,Input} from 'antd'

class CommentPage extends React.Component {

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
    
    return (
      <Modal
          visible={visible}
          title="添加评论"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical" {...formLayout}>
            <Form.Item label="评论内容" >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入您的评价' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="评价时间" >
              {getFieldDecorator('commentTime', {
                rules: [{ required: true, message: '请输入评价时间' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="订单号">
              {getFieldDecorator('orderId', {
                rules: [{ required: true, message: '请输入订单号!' }],
              })(<Input />)}
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
})(CommentPage );