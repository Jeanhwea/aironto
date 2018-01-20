import React from "react";
import PropTypes from "prop-types";
import { List, Avatar } from "antd";

class ConceptList extends React.Component {

  render() {
    return (
      <div style={{padding: "25px"}}>
      <List
        itemLayout="horizontal"
        dataSource={this.props.data}
        renderItem={ item => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
      </div>
    )
  }

}

export default ConceptList
