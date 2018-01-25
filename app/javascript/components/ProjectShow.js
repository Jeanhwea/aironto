import React from "react"
import PropTypes from "prop-types"
import { Table, Tree, Input, Icon, Modal, Button, Popconfirm } from 'antd'

const TreeNode = Tree.TreeNode

// RUCM Begin
class RUCMEditableCell extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      editable: false,
    }
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({ value })
  }

  update = () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }

  handlePressEnter = (e) => {
    if (e.key == "Enter") {
      this.update()
    }
  }

  edit = () => {
    this.setState({ editable: true })
  }

  render() {
    return (
      <div className="rucm-editable-cell">
        {
          this.state.editable ?
            <div className="rucm-editable-cell-input-wrapper">
              <input
                value={this.state.value}
                onChange={this.handleChange}
                onKeyDown={this.handlePressEnter}
                className="rucm-editable-cell-input"
              />
              <Icon
                type="check"
                className="rucm-editable-cell-icon-check"
                onClick={this.update}
              />
            </div>
            :
            <div className="rucm-editable-cell-text-wrapper">
              {this.state.value || ' '}
              <Icon
                type="edit"
                className="rucm-editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    )
  }

}

class RUCMFlow extends React.Component {

  constructor(props) {
    super(props)
    // RUCMFlow: 1. Test Flow; 2. Global Validation; 3. Specific Validation.
    // flow : {
    //  conditionKey: "",
    //  conditionValue: "",
    //  steps: ["step 1", "step 2", "step 3"],
    //  postcondition: "",
    // }
    const flow = this.props.flow
    this.state = {
      flow: flow,
    }
  }

  update = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.flow)
    }
  }

  onCellChange = (key) => {
    return (value) => {
      const flow = this.state.flow
      if (flow) {
        if (key.startsWith("step")) {
          const stepIdx = parseInt(key.split(":")[1])
          flow.steps[stepIdx] = value
        } else {
          flow[key] = value
        }
        this.setState({ flow: this.state.flow })
        this.update()
      }
    }
  }

  removeStep = (e) => {
    const key = e.target.id
    if (key.startsWith("step")) {
      const stepIdx = parseInt(key.split(":")[1])
      this.state.flow.steps.splice(stepIdx,1)
      this.setState({ flow: this.state.flow } )
      this.update()
    }
  }

  addStep = () => {
    this.state.flow.steps.push("")
    this.setState({ flow: this.state.flow } )
    this.update()
  }

  render() {
    const showCond = this.state.flow.conditionKey != "Basic"
    const stepsRows = this.state.flow.steps.map(
      (v, i) => (
        <div className="rucm-row" key={"step:"+i+":"+v}>
          <div className="rucm-steps-title-cell">
            <Icon
              id={"step:"+i}
              type="close-circle"
              className="rucm-steps-cell-icon-remove"
              onClick={this.removeStep}
            />
            <strong className="rucm-steps-cell-text-remove">{i}</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell value={v} onChange={this.onCellChange("step:"+i)} />
          </div>
        </div>
      )
    )
    return (
      <div className="rucm-steps">
        {
          showCond ?
            <div className="rucm-row">
              <div className="rucm-steps-title-cell">
                <strong>{this.state.flow.conditionKey}</strong>
              </div>
              <div className="rucm-content-cell">
                <RUCMEditableCell
                  value={this.state.flow.conditionValue}
                  onChange={this.onCellChange("conditionValue")}
                />
              </div>
            </div>
          :
            <div className="rucm=row"></div>
        }
        <div className="rucm-row">
          <div className="rucm-steps-title-cell">
            <strong>Steps</strong>
          </div>
          <div className="rucm-content-cell"></div>
        </div>
        { stepsRows }
        <div className="rucm-row">
          <div className="rucm-steps-title-cell">
            <Icon
              type="down-circle-o"
              className="rucm-steps-cell-icon-add"
              onClick={this.addStep}
            />
          </div>
          <div className="rucm-content-cell">...</div>
        </div>
        <div className="rucm-row">
          <div className="rucm-steps-title-cell">
            <strong>Postcondition</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={this.state.flow.postcondition}
              onChange={this.onCellChange("postcondition")}
            />
          </div>
        </div>
      </div>
    )
  }

}

class RUCMTemplate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usecase: {
        name: "TODO",
        description: "TODO",
        precondition: "TODO",
        dependency: "TODO",
        testflow: {
          conditionKey: "Basic",
          conditionValue: "",
          steps: ["TODO"],
          postcondition: "TODO",
        },
        specificValidation: [],
        globalValidation: [],
      }
    }
  }

  setUsecase = () => {
    const usecase = this.props.usecase
    if ( usecase && usecase.content != "") {
      const content = $.parseJSON(usecase.content)
      this.setState({ usecase: content })
    } else {
      this.setState({
        usecase: {
          name: "TODO",
          description: "TODO",
          precondition: "TODO",
          dependency: "TODO",
          testflow: {
            conditionKey: "Basic",
            conditionValue: "",
            steps: ["TODO"],
            postcondition: "TODO",
          },
          specificValidation: [],
          globalValidation: [],
        }
      })
    }
  }

  update = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.usecase)
    }
  }

  onCellChange = (key) => {
    return (value) => {
      const usecase = this.state.usecase
      if (usecase) {
        if (key.startsWith("specific")) {
          const specificIdx = parseInt(key.split(":")[1])
          usecase.specificValidation[specificIdx] = value
        } else if (key.startsWith("global")) {
          const globalIdx = parseInt(key.split(":")[1])
          usecase.globalValidation[globalIdx] = value
        } else {
          usecase[key] = value
        }
        this.setState({ usecase })
        this.update()
      }
    }
  }

  addSpecificValidation = () => {
    this.state.usecase.specificValidation.push({
      conditionKey: "RFS",
      conditionValue: "TODO",
      steps: ["TODO"],
      postcondition: "TODO",
    })
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  addGlobalValidation = () => {
    this.state.usecase.globalValidation.push({
      conditionKey: "Guard Condition",
      conditionValue: "TODO",
      steps: ["TODO"],
      postcondition: "TODO",
    })
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  componentWillMount = () => {
    this.setUsecase()
  }

  render() {
    const usecase = this.state.usecase
    const specificValidationRows = usecase.specificValidation.map(
      (v, i) => (
        <div className="rucm-row" key={"specific:"+i}>
          <div className="rucm-title-cell">
            <strong>Specific Validation</strong>
          </div>
          <div className="rucm-container-cell">
            <RUCMFlow
              flow={usecase.specificValidation[i]}
              onChange={this.onCellChange('specific:'+i)}
            />
          </div>
        </div>
      )
    )
    const globalValidationRows = usecase.globalValidation.map(
      (v, i) => (
        <div className="rucm-row" key={"global:"+i}>
          <div className="rucm-title-cell">
            <strong>Global Validation</strong>
          </div>
          <div className="rucm-container-cell">
            <RUCMFlow
              flow={usecase.globalValidation[i]}
              onChange={this.onCellChange('global:'+i)}
            />
          </div>
        </div>
      )
    )
    return (
      <div className="rucm-template">
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Test Case Name</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.name}
              onChange={this.onCellChange('name')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Brief Description</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.description}
              onChange={this.onCellChange('description')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Precondition</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.precondition}
              onChange={this.onCellChange('precondition')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Dependency</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.dependency}
              onChange={this.onCellChange('dependency')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Test Flow</strong>
          </div>
          <div className="rucm-container-cell">
            <RUCMFlow
              flow={usecase.testflow}
              onChange={this.onCellChange('testflow')}
            />
          </div>
        </div>
        { specificValidationRows }
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong> Specific Validation </strong>
          </div>
          <div className="rucm-container-cell">
            <div className="rucm-steps">
              <div className="rucm-row">
                <div className="rucm-content-cell">
                  <Icon
                    type="down-square-o"
                    className="rucm-steps-cell-icon-add"
                    onClick={this.addSpecificValidation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        { globalValidationRows }
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong> Global Validation </strong>
          </div>
          <div className="rucm-container-cell">
            <div className="rucm-steps">
              <div className="rucm-row">
                <div className="rucm-content-cell">
                  <Icon
                    type="down-square-o"
                    className="rucm-steps-cell-icon-add"
                    onClick={this.addGlobalValidation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

// RUCM End


class ProjectShow extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      project: this.props.data,
      ucIdx: -1,
      showProject: true,
    }
  }

  onCellChange = (ucIdx) => {
    return (value) => {
      if (ucIdx >= 0) {
        const target = this.state.project.usecases.find(u => u.id == ucIdx)
        target.content = JSON.stringify(value)
        this.setState({project: this.state.project})
      }
    }
  }

  handleOnSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0 && selectedKeys[0].startsWith("project")){
      this.setState({ showProject: true})
    }
    if (selectedKeys.length > 0 && selectedKeys[0].startsWith("usecase")){
      var ucIdx = selectedKeys[0].split(":")[1]
      const target = this.state.project.usecases.find(u => u.id == ucIdx)
      this.setState({ showProject: false, ucIdx: target.id})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const project = this.state.project
    const usecase = project.usecases.find(u => u.id == this.state.ucIdx)
    $.ajax({
      url: "/projects/"+project.id+"/usecases/"+usecase.id+".json",
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

  render() {
    // console.log(this.state)
    const project = this.state.project
    const usecase = this.state.project.usecases.find(u => u.id == this.state.ucIdx)
    const treeNodes = project.usecases.map(
      u => <TreeNode title={u.title} key={"usecase:"+u.id} />
    )
    return (
      <div className="project-show">
        <div id="project-tree" className="project-tree">
          <Tree
            showLine
            onSelect={this.handleOnSelect}
          >
            <TreeNode title={project.name} key={"project:"+project.id}>
              { treeNodes }
            </TreeNode>
          </Tree>
        </div>
        <div id="usecase-show" className="usecase-show">
          {
            this.state.showProject ?
              <h2>{project.description}</h2>
              :
              <div className="usecase-show-wrapper">
                <div className="usecase-show-template">
                  <RUCMTemplate
                    key={"template:"+this.state.ucIdx}
                    usecase={usecase}
                    onChange={this.onCellChange(this.state.ucIdx)}
                  />
                </div>
                <div className="usecase-show-submit-btn-wrapper">
                  <Button type="primary" className="usecase-show-submit-btn" onClick={this.handleSubmit}>
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


export default ProjectShow
