import React from "react"
import PropTypes from "prop-types"
import { Form, Input, Button} from "antd"

class ConceptShow extends React.Component {

  constructor(props) {
    super(props)
    const data = this.props.data || {}
    this.state = {
      data: data,
    }
  }

  render() {
    return (
      <div style={{padding: "25px"}}>
        <h2>{ this.state.data.name }</h2>
        <p>{ this.state.data.description }</p>
      </div>
    )
  }

}

export default ConceptShow
