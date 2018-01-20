import React from "react";
import PropTypes from "prop-types";
import { List, Avatar } from "antd";

class ConceptIndex extends React.Component {

  render() {
    return (
      <div style={{padding: "25px"}}>
      <List
        itemLayout="horizontal"
        dataSource={this.props.data}
        renderItem={ concept => (
          <List.Item>
            <List.Item.Meta
              title={<a href={"/concepts/"+concept.id+"/edit"} rel="noopener noreferrer">{concept.name}</a>}
              description={concept.description}
            />
          </List.Item>
        )}
      />
      </div>
    )
  }

}

export default ConceptIndex
