import React from "react"
import PropTypes from "prop-types"
import { List, Avatar } from "antd"

const ListItem = List.Item
const ListItemMeta = List.Item.Meta

class ConceptIndex extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.data || {}
    this.state = {
      data: {
        concepts: data
      }
    }
  }

  render() {
    return (
      <div style={{padding: "25px"}}>
        <List
          itemLayout="horizontal"
          dataSource={this.state.data.concepts}
          renderItem={ concept => (
            <ListItem>
              <ListItemMeta
                title={<a href={"/concepts/"+concept.id+"/edit"} rel="noopener noreferrer">{concept.name}</a>}
                description={concept.description}
              />
            </ListItem>
          )}
        />
      </div>
    )
  }

}

ConceptIndex.propTypes = {
  data: PropTypes.array
}
export default ConceptIndex
