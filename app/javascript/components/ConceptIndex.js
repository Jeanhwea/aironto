import React from "react";
import PropTypes from "prop-types";
import { List, Avatar } from "antd";

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

class ConceptIndex extends React.Component {

  render() {
    return (
      <div style={{padding: "25px"}}>
      <List
        itemLayout="horizontal"
        dataSource={this.props.data}
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

export default ConceptIndex
