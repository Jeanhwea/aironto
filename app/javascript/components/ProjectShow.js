import React from "react"
import PropTypes from "prop-types"
import { Table, Tree, Input, Icon, Button, Popconfirm } from 'antd'

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
    console.log(this.props)
    const usecase = {
      name: '测试需求用例的名称',
      description: '测试需求用例的简单描述',
      precondition: '测试需求用例的前置条件',
      dependency: '该测试需求用例的所依赖的其他用例名称',
      testflow: {
        conditionKey: "Basic",
        conditionValue: "",
        steps: ["第一步的描述", "第二步的描述", "第三步的描述"],
        postcondition: "测试需求用例的后置条件",
      },
      specificValidation: [
        {
          conditionKey: "RFS",
          conditionValue: "1,2",
          steps: [],
          postcondition: "系统工作正常",
        },
        {
          conditionKey: "RFS",
          conditionValue: "2",
          steps: ["step 1", "step 2", "step 3"],
          postcondition: "系统工作正常",
        },
      ],
      globalValidation: [
        // {
        //   conditionKey: "Guard Condition",
        //   conditionValue: "X > 2A",
        //   steps: ["step 1", "step 2", "step 3"],
        //   postcondition: "系统工作正常",
        // },
      ],
    }
    this.state = {
      usecase: usecase
    }
  }

  update = () => {
    if (this.props.onChange) {
      // this.props.onChange(this.state.usecase)
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
      }
    }
  }

  addSpecificValidation = () => {
    const specificValidationTemplate = {
      conditionKey: "RFS",
      conditionValue: "TODO",
      steps: ["TODO"],
      postcondition: "TODO",
    }
    this.state.usecase.specificValidation.push(specificValidationTemplate)
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  addGlobalValidation = () => {
    const globalValidationTemplate = {
      conditionKey: "Guard Condition",
      conditionValue: "TODO",
      steps: ["TODO"],
      postcondition: "TODO",
    }
    this.state.usecase.globalValidation.push(globalValidationTemplate)
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  render() {
    console.log("re-rending ...")
    console.log(this.state)
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
    const usecase = {
      name: '测试需求用例的名称',
      description: '测试需求用例的简单描述',
      precondition: '测试需求用例的前置条件',
      dependency: '该测试需求用例的所依赖的其他用例名称',
      testflow: {
        conditionKey: "Basic",
        conditionValue: "",
        steps: ["第一步的描述", "第二步的描述", "第三步的描述"],
        postcondition: "测试需求用例的后置条件",
      },
      specificValidation: [
        {
          conditionKey: "RFS",
          conditionValue: "1,2",
          steps: [],
          postcondition: "系统工作正常",
        },
        {
          conditionKey: "RFS",
          conditionValue: "2",
          steps: ["step 1", "step 2", "step 3"],
          postcondition: "系统工作正常",
        },
      ],
      globalValidation: [
        // {
        //   conditionKey: "Guard Condition",
        //   conditionValue: "X > 2A",
        //   steps: ["step 1", "step 2", "step 3"],
        //   postcondition: "系统工作正常",
        // },
      ],
    }

    this.state = {
      project: this.props.data,
      currentUsecaseIdx: -1,
    }
  }

  onCellChange = () => {
    return (value) => {
      const current = this.getCurrentUsecase()
      if (current) {
        this.current = value
      }
    }
  }

  getCurrentUsecase = () => {
    return this.state.project.usecases[this.state.currentUsecaseIdx]
  }

  handleOnSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0 && selectedKeys[0].startsWith("usecase")){
      var usecaseId = selectedKeys[0].split(":")[1]
      const target = this.state.project.usecases.find(u => u.id == usecaseId)
      console.log(target)
      this.setState({ currentUsecaseIdx: target.id})
    }
  }

  render() {
    const project = this.state.project
    const treeNodes = project.usecases.map(
      u => <TreeNode title={u.title} key={"usecase:"+u.id} />
    )
    console.log(this.state)
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
          <p>{this.state.currentUsecaseIdx}</p>
          <RUCMTemplate
            usecase={this.getCurrentUsecase()}
            onChange={this.onCellChange}
          />
        </div>
      </div>
    )
  }

}


export default ProjectShow
