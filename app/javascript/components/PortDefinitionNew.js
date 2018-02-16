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

class PortDefinitionNew extends React.Component {

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
    if (project_id == null || project_id == '' || isNaN(project_id)) {
      Modal.error({
        title: '提示',
        content: '必须选择一个项目',
      })
      return false
    }
    const name = this.state.data.name
    if (name == null || name =='null' || name.trim().length <= 0) {
      Modal.error({
        name: '提示',
        content: '端口定义表名称不能为空',
      })
      return false
    }
    return true
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validateData()) {
      $.ajax({
        url: "/port_definitions",
        type: "POST",
        data: {
          port_definition: this.state.data,
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
              placeholder="选择一个该端口定义表的归属项目"
              onChange={this.handleProjectChange}
            >
              {projectOptions}
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="端口定义表名称"
          >
            <Input
              id="name"
              placeholder="端口定义表名称"
              value={this.state.data.name}
              onChange={this.handleNameChange}
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

PortDefinitionNew.propTypes = {
  data: PropTypes.object
}
export default PortDefinitionNew
