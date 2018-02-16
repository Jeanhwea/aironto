import React from "react"
import PropTypes from "prop-types"
import { Table, Tree, Input, Icon, Modal, Button, Popconfirm } from "antd"
import shortid from "shortid"
import RUCMTemplate from "./RUCMTemplate"
import RUCMDevice from "./RUCMDevice"

const TreeNode = Tree.TreeNode


class ProjectShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      project: this.props.data,
      ucIdx: -1,
      pdIdx: -1,
      showProject: true,
      showUseCase: false,
      showPortDefinition: false
    }
  }

  onTemplateChange = (ucIdx) => {
    return (value) => {
      if (ucIdx >= 0) {
        const target = this.state.project.usecases.find(u => u.id == ucIdx)
        target.content = JSON.stringify(value)
        this.setState({project: this.state.project})
      }
    }
  }

  onDeviceChange = (pdIdx) => {
    return (value) => {
      if (pdIdx >= 0) {
        const target = this.state.project.port_definitions.find(p => p.id == pdIdx)
        target.content = JSON.stringify(value)
        this.setState({project: this.state.project})
      }
    }
  }

  handleOnSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0 && selectedKeys[0].startsWith("project")){
      this.setState({ showProject: true, showUseCase: false, showPortDefinition: false})
    }
    if (selectedKeys.length > 0 && selectedKeys[0].startsWith("usecase")){
      var ucIdx = selectedKeys[0].split(":")[1]
      const target = this.state.project.usecases.find(u => u.id == ucIdx)
      this.setState({ showProject: false, showUseCase: true, showPortDefinition: false, ucIdx: target.id})
    }
    if (selectedKeys.length > 0 && selectedKeys[0].startsWith("port_definition")){
      var pdIdx = selectedKeys[0].split(":")[1]
      const target = this.state.project.port_definitions.find(p => p.id == pdIdx)
      this.setState({ showProject: false, showUseCase: false, showPortDefinition: true, pdIdx: target.id})
    }
  }

  handleUsecaseSubmit = (e) => {
    e.preventDefault()
    const project = this.state.project
    const usecase = project.usecases.find(u => u.id == this.state.ucIdx)
    $.ajax({
      url: "/usecases/"+usecase.id+".json",
      type: "PATCH",
      data: {
        usecase: {
          content: usecase.content,
        }
      },
      success: (res) => {
        if(res.status == "ok") {
          Modal.success({
            title: "保存提示",
            content: "修改成功",
          })
        } else {
          Modal.error({
            title: "保存提示",
            content: "修改失败：" + res.status,
          })
        }
      }
    })
  }

  handlePortDefinitionSubmit = (e) => {
    e.preventDefault()
    const project = this.state.project
    const port_definition = project.port_definitions.find(p => p.id == this.state.pdIdx)
    $.ajax({
      url: "/port_definitions/"+port_definition.id+".json",
      type: "PATCH",
      data: {
        port_definition: {
          content: port_definition.content,
        }
      },
      success: (res) => {
        if(res.status == "ok") {
          Modal.success({
            title: "保存提示",
            content: "修改成功",
          })
        } else {
          Modal.error({
            title: "保存提示",
            content: "修改失败：" + res.status,
          })
        }
      }
    })
  }

  render() {
    // console.log(this.state)
    const project = this.state.project
    const usecase = project.usecases.find(u => u.id == this.state.ucIdx)
    const port_definition = project.port_definitions.find(p => p.id == this.state.pdIdx)
    // tree nodes
    const ucTreeNodes = project.usecases.map(
      u => <TreeNode title={u.title} key={"usecase:"+u.id} />
    )
    const pdTreeNodes = project.port_definitions.map(
      p => <TreeNode title={p.name} key={"port_definition:"+p.id} />
    )
    return (
      <div className="project-show">
        <div id="project-tree" className="project-tree">
          <Tree
            defaultExpandAll
            showLine
            onSelect={this.handleOnSelect}
          >
            <TreeNode title={project.name} key={"project:"+project.id}>
              <TreeNode title={"测试需求用例"} key={"_usecases"}>
                { ucTreeNodes }
              </TreeNode>
              <TreeNode title={"测试能力定义"} key={"_port_definitions"}>
                { pdTreeNodes }
              </TreeNode>
            </TreeNode>
          </Tree>
        </div>
        <div id="detail-show" className="detail-show">
          {
            this.state.showProject &&
              <div>
                {
                  project.description.split("\n").map(line => {
                    return <p key={"project_desc:"+shortid.generate()}>{line}</p>;
                  })
                }
              </div>
          }
          {
            this.state.showUseCase &&
              <div className="usecase-show-wrapper">
                <div className="usecase-show-template">
                  <RUCMTemplate
                    key={"template:"+this.state.ucIdx}
                    usecase={usecase}
                    onChange={this.onTemplateChange(this.state.ucIdx)}
                  />
                </div>
                <div className="usecase-show-submit-btn-wrapper">
                  <Button type="primary" className="usecase-show-submit-btn" onClick={this.handleUsecaseSubmit}>
                    提交
                  </Button>
                </div>
              </div>
          }
          {
            this.state.showPortDefinition &&
              <div className="device-show-wrapper">
                <div className="device-show-template">
                  <RUCMDevice
                    key={"device:"+this.state.pdIdx}
                    port_definition={port_definition}
                    onChange={this.onDeviceChange(this.state.pdIdx)}
                  />
                </div>
                <div className="device-show-submit-btn-wrapper">
                  <Button type="primary" className="device-show-submit-btn" onClick={this.handlePortDefinitionSubmit}>
                    提交
                  </Button>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }

}

ProjectShow.propTypes = {
  data: PropTypes.object
}
export default ProjectShow
