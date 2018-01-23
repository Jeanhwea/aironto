import React from "react"
import PropTypes from "prop-types"
import { List, Avatar } from "antd"

const ListItem = List.Item
const ListItemMeta = List.Item.Meta

class ConceptShow extends React.Component {

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
        <p>hello</p>
      </div>
    )
  }

}

export default ConceptShow
