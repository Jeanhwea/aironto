import React from "react"
import PropTypes from "prop-types"
import { Form, Input, Button, Select, Modal } from "antd"

const Option = Select.Option
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

class UsecaseNew extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.data || {}
    this.state = {
      projects: [],
      data: data,
    }
    this.fetchProjects()
  }

  fetchProjects = () => {
    $.ajax({
      url: "/projects.json",
      type: "GET",
      success: (res) => {
        this.setState({ projects: res })
      }
    })
  }

  validateData = () => {
    const project_id = this.state.data.project_id
    if (project_id == '' || isNaN(project_id)) {
      Modal.error({
        title: '提示',
        content: '必须选择一个项目',
      })
      return false
    }
    const title = this.state.data.title
    if (title == null || title =='null' || title.trim().length <= 0) {
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
        url: "/usecases",
        type: "POST",
        data: {
          usecase: this.state.data,
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

  handleTitleChange = (e) => {
    const title = e.target.value || ""
    this.setState({
       data: Object.assign({},this.state.data,{title: title})
    })
  }

  handleProjectChange = (value) => {
    const project_id = value || 0
    this.setState({
       data: Object.assign({},this.state.data,{project_id: project_id})
    })
  }

  render() {
    const projectOptions = this.state.projects.map(p => <Option key={p.id}>{p.name}</Option>);
    return (
      <div style={{padding: "25px"}}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="项目名称"
          >
            <Select
              showSearch
              placeholder="选择一个该用例的归属项目"
              onChange={this.handleProjectChange}
            >
              {projectOptions}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="用例名称"
          >
            <Input
              id="title"
              placeholder="用例名称"
              value={this.state.data.title}
              onChange={this.handleTitleChange}
            />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" htmlType="submit">添加</Button>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default UsecaseNew
