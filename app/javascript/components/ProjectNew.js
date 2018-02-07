import React from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, Modal } from "antd"

const FormItem = Form.Item
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
}

class ProjectNew extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.data || {}
    this.state = {
      data: data,
    }
  }

  validateData = () => {
    const name = this.state.data.name
    if (name == null || name =='null' || name.trim().length <= 0) {
      Modal.error({
        title: '提示',
        content: '项目名称不能为空',
      })
      return false
    }
    return true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateData()) {
      $.ajax({
        url: "/projects",
        type: "POST",
        data: {
          project: {
            name: this.state.data.name,
            description: this.state.data.description,
          }
        },
        success: (res) => {
          if(res.status == "ok") {
            Modal.success({
              title: "保存提示",
              content: "添加成功",
            })
          } else {
            Modal.error({
              title: "保存提示",
              content: "添加失败：" + res.status,
            })
          }
        }
      })
    }
  }

  handleNameChange = (e) => {
    const name = e.target.value || ""
    this.setState({
       data: Object.assign({},this.state.data,{name: name})
    })
  }

  handleDescChange = (e) => {
    const description = e.target.value || ""
    this.setState({
       data: Object.assign({},this.state.data,{description: description})
    })
  }

  render() {
    return (
      <div style={{padding: "25px"}}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="项目名称"
          >
          <Input
            id="name"
            placeholder="项目名称"
            value={this.state.data.name}
            onChange={this.handleNameChange}
          />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="项目描述"
          >
          <TextArea
            id="description"
            placeholder="项目描述"
            value={this.state.data.description}
            onChange={this.handleDescChange}
          />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
          <Button type="primary" htmlType="submit">
            添加
          </Button>
          </FormItem>
        </Form>
      </div>
    )
  }

}

ProjectNew.propTypes = {
  data: PropTypes.object
}
export default ProjectNew
