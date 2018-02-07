import React from "react"
import PropTypes from "prop-types"
import { List, Avatar } from "antd"

const ListItem = List.Item
const ListItemMeta = List.Item.Meta

class ProjectIndex extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.data || {}
    this.state = {
      data: {
        projects: data
      }
    }
  }

  render() {
    return (
      <div style={{padding: "25px"}}>
        <List
          itemLayout="horizontal"
          dataSource={this.state.data.projects}
          renderItem={ project => (
            <ListItem>
              <ListItemMeta
                title={<a href={"/projects/"+project.id} rel="noopener noreferrer">{project.name}</a>}
                description={project.description}
              />
            </ListItem>
          )}
        />
      </div>
    )
  }

}

ProjectIndex.propTypes = {
  data: PropTypes.array
}
export default ProjectIndex
