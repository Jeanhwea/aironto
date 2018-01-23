import React from "react"
import PropTypes from "prop-types"
import { List, Tree } from "antd"

const TreeNode = Tree.TreeNode


class ProjectShow extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.data || {}
    this.state = {
      project: data,
      currentUsecaseIdx: -1
    }
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
      var treeModel = selectedKeys[0].split(":")[0]
      var usecaseId = selectedKeys[0].split(":")[1]
      if (treeModel == "usecase") {
        this.updateUsecaseIdx(usecaseId)
      }
    }
  }

  render() {
    console.log(this.state)
    const project = this.state.project
    const treeNodes = project.usecases.map(u => <TreeNode title={u.title} key={"usecase:"+u.id}/>)
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
          <p></p>
        </div>
      </div>

    )
  }

}


export default ProjectShow
