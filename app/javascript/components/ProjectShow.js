import React from "react"
import PropTypes from "prop-types"
import { Table, Tree, Input, Icon, Button, Popconfirm } from 'antd'

const TreeNode = Tree.TreeNode

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value
    this.setState({ value })
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
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    )
  }
}


class ProjectShow extends React.Component {


  constructor(props) {
    super(props)

    this.columns = [{
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      ),
    }, {
      dataIndex: 'age',
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
      age: 32,
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
    console.log(this.getCurrentUsecase())
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
          <Table
            bordered
            showHeader={false}
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
          <Button className="editable-add-btn" type="primary" onClick={this.handleAdd}>Add</Button>
        </div>
      </div>

    )
  }

}


export default ProjectShow
