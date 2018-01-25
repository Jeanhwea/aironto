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
  handlePressEnter = (e) => {
    if (e.key == "Enter") {
      this.check()
    }
  }
  check = () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }
  edit = () => {
    this.setState({ editable: true })
  }
  render() {
    const { value, editable } = this.state
    return (
      <div className="rucm-editable-cell">
        {
          editable ?
            <div className="rucm-editable-cell-input-wrapper">
              <input
                value={value}
                onChange={this.handleChange}
                onKeyDown={this.handlePressEnter}
                className="rucm-editable-cell-input"
              />
              <Icon
                type="check"
                className="rucm-editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="rucm-editable-cell-text-wrapper">
              {value || ' '}
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

class RUCMSteps extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stepType: this.props.steptype,
      rfs: "1,2,3",
      postCondition: "System is well",
      steps: ["step 123", "step 124", "step 125", ],
    }
  }

  removeStep = (e) => {
    var idx = parseInt(e.target.id)
    this.state.steps.splice(idx,1)
    this.setState({ steps: this.state.steps } )
  }

  addStep = () => {
    this.setState({ steps: [...this.state.steps, ""]} )
  }

  render() {
    const showRFS = this.state.steptype == "basic"
    const stepsRows = this.state.steps.map(
      (v, i) => (
        <div id={"step"+i} className="rucm-row">
          <div className="rucm-steps-title-cell">
            <strong>{i}</strong>
          </div>
          <div className="rucm-content-cell"><RUCMEditableCell value={v} /></div>
        </div>
      )
    )
    return (
      <div className="rucm-steps">
        {
          showRFS ?
            <div className="rucm-row">
              <div className="rucm-steps-title-cell"><strong>RFS</strong></div>
              <div className="rucm-content-cell"><RUCMEditableCell value={this.state.rfs} /></div>
            </div>
          :
            <div className="rucm-row">
              <div className="rucm-steps-title-cell"><strong>Steps</strong></div>
              <div className="rucm-content-cell"></div>
            </div>
        }
        {
          stepsRows
        }
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
          <div className="rucm-steps-title-cell"><strong>PostCondition</strong></div>
          <div className="rucm-content-cell">
            <RUCMEditableCell value={this.state.postCondition} />
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
      testcase: {
        name: '测试需求用例名称',
        description: '测试需求用例的简单描述',
        preCondition: '前置条件',
        dependency: '该测试需求用例的所依赖的其他用例名称',
        testflow: {
          steps: [],
          postCondition: "",
        },
        specificValidation: [
          { rfs: "", steps: [], postCondition: "", },
        ],
      }
    }
  }

  onCellChange = (key) => {
    return (value) => {
      const testcase = this.state.testcase
      testcase[key] = value
      this.setState({ testcase })
    }
  }

  render() {
    const testcase = this.state.testcase
    console.log(this.state)
    return (
      <div className="rucm-template">
        <div className="rucm-row">
          <div className="rucm-title-cell"><strong>TestCaseName</strong></div>
          <div className="rucm-content-cell">
            <RUCMEditableCell value={testcase.name} onChange={this.onCellChange('name')} />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell"><strong>Brief Description</strong></div>
          <div className="rucm-content-cell">
            <RUCMEditableCell value={testcase.description} onChange={this.onCellChange('description')} />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell"><strong>PreCondition</strong></div>
          <div className="rucm-content-cell">
            <RUCMEditableCell value={testcase.preCondition} onChange={this.onCellChange('preCondition')} />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell"><strong>Dependency</strong></div>
          <div className="rucm-content-cell">
            <RUCMEditableCell value={testcase.dependency} onChange={this.onCellChange('dependency')}/>
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell"><strong>TestFlow</strong></div>
          <div className="rucm-container-cell">
            <RUCMSteps steptype="basic" />
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

    this.columns = [{
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell value={text} onChange={this.onCellChange(record.key, 'name')} />
      ),
    }, {
      dataIndex: 'address',
    }, {
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 1 ?
          (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
              <a href="#">Delete</a>
            </Popconfirm>
          ) : null
        )
      },
    }]

    this.state = {
      project: this.props.data,
      currentUsecaseIdx: -1,
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
    }
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource]
      const target = dataSource.find(item => item.key === key)
      if (target) {
        target[dataIndex] = value
        this.setState({ dataSource })
      }
    }
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource]
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) })
  }
  handleAdd = () => {
    const { count, dataSource } = this.state
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      address: `London, Park Lane no. ${count}`,
    }
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    })
  }

  getCurrentUsecase = () => {
    return this.state.project.usecases[this.state.currentUsecaseIdx]
  }

  updateUsecaseIdx = (usecaseId) => {
    var usecases = this.state.project.usecases
    for (var i = 0, len = usecases.length; i < len; i++) {
      if (usecases[i].id == usecaseId) {
        this.setState({currentUsecaseIdx: i})
      }
    }
  }

  handleOnSelect = (selectedKeys, info) => {
    if (selectedKeys.length > 0) {
      var treeModelName = selectedKeys[0].split(":")[0]
      var usecaseId = selectedKeys[0].split(":")[1]
      if (treeModelName == "usecase") {
        this.updateUsecaseIdx(usecaseId)
      }
    }
  }

  render() {
    const project = this.state.project
    const treeNodes = project.usecases.map(u => <TreeNode title={u.title} key={"usecase:"+u.id}/>)
    const { dataSource } = this.state
    const columns = this.columns
    return (
      <div>
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
          <RUCMTemplate />
        </div>
      </div>

    )
  }

}


export default ProjectShow
