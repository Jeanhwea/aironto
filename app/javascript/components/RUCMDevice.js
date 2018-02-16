import React from "react"
import PropTypes from "prop-types"
import { Icon } from "antd"
import shortid from "shortid"
import RUCMEditableCell from "./RUCMEditableCell"

class RUCMDevice extends React.Component {

  constructor(props) {
    super(props)
    // RUCMDevice: 1. Test Device; 2. Global Validation; 3. Specific Validation.
    // port_definition : [{
    //  name: "",
    //  type: "",
    //  description: "",
    //  minimum: "",
    //  maximum: "",
    //  unit: "",
    // }]
    this.state = {
      port_definition : [{
        name: "",
        type: "",
        description: "",
        minimum: "",
        maximum: "",
        unit: "",
      }]
    }
  }

  setPortDefinition = () => {
    const port_definition = this.props.port_definition
    if ( port_definition && port_definition.content != "") {
      const content = $.parseJSON(port_definition.content)
      this.setState({ port_definition: content })
    } else {
      this.setState({
        port_definition: [{
          name: "",
          type: "",
          description: "",
          minimum: "",
          maximum: "",
          unit: "",
        }],
      })
    }
  }


  update = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.port_definition)
    }
  }

  onCellChange = (key) => {
    return (value) => {
      const port_definition = this.state.port_definition
      if (port_definition) {
        const field = key.split(":")[0]
        const idx = parseInt(key.split(":")[1])
        port_definition[idx][field] = value
        this.setState({ port_definition })
        this.update()
      }
    }
  }

  portDefinitioAppend = (e) => {
    this.state.port_definition.push({
      name: "",
      type: "",
      description: "",
      minimum: "",
      maximum: "",
      unit: "",
    })
    this.setState({ port_definition: this.state.port_definition })
    this.update()
  }

  componentWillMount = () => {
    this.setPortDefinition()
  }

  render() {
    const port_definition = this.state.port_definition
    const portDefinitionRows = port_definition.map(
      (pd, i) => (
        <div className="rucm-port-definition-row" key={"port:"+i+":"+shortid.generate()}>
          <div className="rucm-port-definition-cell-num">
            <strong>{ i }</strong>
          </div>
          <div className="rucm-port-definition-cell-name">
            <RUCMEditableCell
              value={pd.name}
              onChange={this.onCellChange("name:"+i)}
            />
          </div>
          <div className="rucm-port-definition-cell-type">
            <RUCMEditableCell
              value={pd.type}
              onChange={this.onCellChange("type:"+i)}
            />
          </div>
          <div className="rucm-port-definition-cell-minimum">
            <RUCMEditableCell
              value={pd.minimum}
              onChange={this.onCellChange("minimum:"+i)}
            />
          </div>
          <div className="rucm-port-definition-cell-maximum">
            <RUCMEditableCell
              value={pd.maximum}
              onChange={this.onCellChange("maximum:"+i)}
            />
          </div>
          <div className="rucm-port-definition-cell-unit">
            <RUCMEditableCell
              value={pd.unit}
              onChange={this.onCellChange("unit:"+i)}
            />
          </div>
          <div className="rucm-port-definition-cell-description">
            <RUCMEditableCell
              value={pd.description}
              onChange={this.onCellChange("description:"+i)}
            />
          </div>
        </div>
      )
    )
    return (
      <div className="rucm-port-definition">
        <div className="rucm-port-definition-row">
          <div className="rucm-port-definition-caption-num"> </div>
          <div className="rucm-port-definition-caption-name">
            <strong>Name</strong>
          </div>
          <div className="rucm-port-definition-caption-type">
            <strong>Type</strong>
          </div>
          <div className="rucm-port-definition-caption-minimum">
            <strong>Minimum</strong>
          </div>
          <div className="rucm-port-definition-caption-maximum">
            <strong>Maximum</strong>
          </div>
          <div className="rucm-port-definition-caption-unit">
            <strong>Unit</strong>
          </div>
          <div className="rucm-port-definition-caption-description">
            <strong>Description</strong>
          </div>
        </div>
        { portDefinitionRows }
        <div className="rucm-port-definition-row">
          <div className="rucm-port-definition-cell-num">
            <Icon
              type="plus-circle-o"
              onClick={this.portDefinitioAppend}
            />
          </div>
          <div className="rucm-port-definition-cell-name"> </div>
          <div className="rucm-port-definition-cell-type"> </div>
          <div className="rucm-port-definition-cell-minimum"> </div>
          <div className="rucm-port-definition-cell-maximum"> </div>
          <div className="rucm-port-definition-cell-unit"> </div>
          <div className="rucm-port-definition-cell-description"> </div>
        </div>
      </div>
    )
  }

}

RUCMDevice.propTypes = {
  port_definition: PropTypes.object,
  onChange: PropTypes.func
}
export default RUCMDevice
