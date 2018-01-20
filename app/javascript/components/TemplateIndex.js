import React from "react";
import PropTypes from "prop-types";
import { List, Avatar } from "antd";

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

class TemplateIndex extends React.Component {

  concatTemplates = (concepts) => {
    var sentence = ''
    var sep = ' | '
    for (var i = 0, len = concepts.length; i < len; i++) {
      if(i == 0) {
        sentence += concepts[i].name
      } else {
        sentence += sep + concepts[i].name
      }
    }
    return sentence
  }

  render() {
    return (
      <div style={{padding: "25px"}}>
      <List
        itemLayout="horizontal"
        dataSource={this.props.data}
        renderItem={ template => (
          <ListItem>
            <ListItemMeta
              title={<a href={"/templates/"+template.id+"/edit"} rel="noopener noreferrer">{template.name}</a>}
              description={ this.concatTemplates(template.concepts) }
            />
          </ListItem>
        )}
      />
      </div>
    )
  }

}

export default TemplateIndex
