import React from "react";
import PropTypes from "prop-types";
import { Affix, Button, List } from "antd";

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

class TemplateShow extends React.Component {

  render() {
    return (
      <div style={{padding: "25px"}}>
        <h2>{this.props.data.name}</h2>
        <List
          itemLayout="horizontal"
          dataSource={this.props.data.concepts}
          renderItem={ concept => (
            <a href={"/concepts/"+concept.id}>{concept.name}</a>
          )}
        />
      </div>
    )
  }

}

export default TemplateShow
