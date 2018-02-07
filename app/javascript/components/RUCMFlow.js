import React from "react"
import PropTypes from "prop-types"
import { Icon } from 'antd'
import RUCMEditableCell from "./RUCMEditableCell"

class RUCMFlow extends React.Component {

  constructor(props) {
    super(props)
    // RUCMFlow: 1. Test Flow; 2. Global Validation; 3. Specific Validation.
    // flow : {
    //  conditionKey: "",
    //  conditionValue: "",
    //  steps: ["step 1", "step 2", "step 3"],
    //  postcondition: "",
    // }
    const flow = this.props.flow
    this.state = {
      flow: flow,
    }
  }

  update = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.flow)
    }
  }

  onCellChange = (key) => {
    return (value) => {
      const flow = this.state.flow
      if (flow) {
        if (key.startsWith("step")) {
          const stepIdx = parseInt(key.split(":")[1])
          flow.steps[stepIdx] = value
        } else {
          flow[key] = value
        }
        this.setState({ flow: this.state.flow })
        this.update()
      }
    }
  }

  stepAdd = (e) => {
    this.state.flow.steps.push("")
    this.setState({ flow: this.state.flow } )
    this.update()
  }

  stepRemove = (e) => {
    const key = e.target.id
    if (key.startsWith("step")) {
      const stepIdx = parseInt(key.split(":")[1])
      this.state.flow.steps.splice(stepIdx,1)
      this.setState({ flow: this.state.flow } )
      this.update()
    }
  }

  stepUp = (e) => {
    const key = e.target.id
    if (key.startsWith("step")) {
      const stepIdx = parseInt(key.split(":")[1])
      if (stepIdx > 0) {
        const temp = this.state.flow.steps[stepIdx-1]
        this.state.flow.steps[stepIdx-1] = this.state.flow.steps[stepIdx]
        this.state.flow.steps[stepIdx] = temp
      }
      this.setState({ flow: this.state.flow } )
      this.update()
    }
  }

  stepDown = (e) => {
    const key = e.target.id
    if (key.startsWith("step")) {
      const stepIdx = parseInt(key.split(":")[1])
      if (stepIdx < this.state.flow.steps.length-1) {
        const temp = this.state.flow.steps[stepIdx+1]
        this.state.flow.steps[stepIdx+1] = this.state.flow.steps[stepIdx]
        this.state.flow.steps[stepIdx] = temp
      }
      this.setState({ flow: this.state.flow } )
      this.update()
    }
  }

  render() {
    const showCond = this.state.flow.conditionKey != "Basic"
    const stepsRows = this.state.flow.steps.map(
      (v, i) => (
        <div className="rucm-row" key={"step:"+i+":"+v}>
          <div className="rucm-steps-title-cell">
            <div className="rucm-steps-cell-icon-wrapper">
              <Icon
                id={"step:"+i}
                type="close-circle"
                className="rucm-steps-cell-icon-operator"
                onClick={this.stepRemove}
              />
              <Icon
                id={"step:"+i}
                type="up-circle"
                className="rucm-steps-cell-icon-operator"
                onClick={this.stepUp}
              />
              <Icon
                id={"step:"+i}
                type="down-circle"
                className="rucm-steps-cell-icon-operator"
                onClick={this.stepDown}
              />
            </div>
            <div className="rucm-steps-cell-text-wrapper">
              <strong>{i}</strong>
            </div>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell value={v} onChange={this.onCellChange("step:"+i)} />
          </div>
        </div>
      )
    )
    return (
      <div className="rucm-steps">
        {
          showCond &&
            <div className="rucm-row">
              <div className="rucm-steps-title-cell">
                <strong>{this.state.flow.conditionKey}</strong>
              </div>
              <div className="rucm-content-cell">
                <RUCMEditableCell
                  value={this.state.flow.conditionValue}
                  onChange={this.onCellChange("conditionValue")}
                />
              </div>
            </div>
        }
        <div className="rucm-row">
          <div className="rucm-steps-title-cell">
            <strong>Steps</strong>
          </div>
          <div className="rucm-content-cell"></div>
        </div>
        { stepsRows }
        <div className="rucm-row">
          <div className="rucm-steps-title-cell">
            <Icon
              type="plus-circle-o"
              className="rucm-steps-cell-icon-add"
              onClick={this.stepAdd}
            />
          </div>
          <div className="rucm-content-cell">...</div>
        </div>
        <div className="rucm-row">
          <div className="rucm-steps-title-cell">
            <strong>Postcondition</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={this.state.flow.postcondition}
              onChange={this.onCellChange("postcondition")}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default RUCMFlow
