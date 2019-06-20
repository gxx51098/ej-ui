import React from 'react'
import {Button,Tabs} from 'antd'

class ProductDetails extends React.Component {

  render(){
    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }

    return (
      <div>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="服务详细描述" key="1">
            <p>张三</p>
            <p>18896821234</p>
            {/* <img src="https://img3.duitang.com/uploads/item/201605/03/20160503183705_KYdaZ.thumb.700_0.jpeg"/> */}
          </TabPane>
          <TabPane tab="可选服务人员简介" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="价格" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
        <Button type="link" onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}

export default ProductDetails;