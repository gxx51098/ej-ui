import React from 'react';
import {
  message,
  Upload,
  Button,
  Icon,
  Form,
  Modal,
  Input,
  Select
} from 'antd'

class CustomerForm extends React.Component {

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
    const upload_props =  {
      name: 'file',
      action: 'http://134.175.154.93:8099/manager/file/upload',
      onChange:(info)=> {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          //后端的回应信息
          let result = info.file.response;
          // 将上传成功后的图片id保存到表单中，点击提交的时候再随着表单提交提交到后台
          if(result.status=== 200){
            let photo = result.data.id;
            // 自行将photo设置到表单中
            this.props.form.setFieldsValue({
              photo
            });
          } else {
            message.error(result.message)
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
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
})(CustomerForm);