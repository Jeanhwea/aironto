import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, message } from 'antd';

class ConceptShow extends React.Component {

  render() {
    return (
      <div style={{padding: "25px"}}>
        <h2>{ this.props.data.name }</h2>
        <p>{ this.props.data.description }</p>
      </div>
    )
  }

}

export default ConceptShow
