import React from "react"
import PropTypes from "prop-types"
import { Icon } from 'antd'
import RUCMEditableCell from "./RUCMEditableCell.js"
import RUCMFlow from "./RUCMFlow.js"

class RUCMTemplate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usecase: {
        name: "TODO",
        description: "TODO",
        precondition: "TODO",
        dependency: "TODO",
        testflow: {
          conditionKey: "Basic",
          conditionValue: "",
          steps: ["TODO"],
          postcondition: "TODO",
        },
        specificValidation: [],
        globalValidation: [],
      }
    }
  }

  setUsecase = () => {
    const usecase = this.props.usecase
    if ( usecase && usecase.content != "") {
      const content = $.parseJSON(usecase.content)
      this.setState({ usecase: content })
    } else {
      this.setState({
        usecase: {
          name: "TODO",
          description: "TODO",
          precondition: "TODO",
          dependency: "TODO",
          testflow: {
            conditionKey: "Basic",
            conditionValue: "",
            steps: ["TODO"],
            postcondition: "TODO",
          },
          specificValidation: [],
          globalValidation: [],
        }
      })
    }
  }

  update = () => {
    if (this.props.onChange) {
      this.props.onChange(this.state.usecase)
    }
  }

  onCellChange = (key) => {
    return (value) => {
      const usecase = this.state.usecase
      if (usecase) {
        if (key.startsWith("specific")) {
          const specificIdx = parseInt(key.split(":")[1])
          usecase.specificValidation[specificIdx] = value
        } else if (key.startsWith("global")) {
          const globalIdx = parseInt(key.split(":")[1])
          usecase.globalValidation[globalIdx] = value
        } else {
          usecase[key] = value
        }
        this.setState({ usecase })
        this.update()
      }
    }
  }

  addSpecificValidation = () => {
    this.state.usecase.specificValidation.push({
      conditionKey: "RFS",
      conditionValue: "TODO",
      steps: ["TODO"],
      postcondition: "TODO",
    })
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  addGlobalValidation = () => {
    this.state.usecase.globalValidation.push({
      conditionKey: "Guard Condition",
      conditionValue: "TODO",
      steps: ["TODO"],
      postcondition: "TODO",
    })
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  componentWillMount = () => {
    this.setUsecase()
  }

  render() {
    const usecase = this.state.usecase
    const specificValidationRows = usecase.specificValidation.map(
      (v, i) => (
        <div className="rucm-row" key={"specific:"+i}>
          <div className="rucm-title-cell">
            <strong>Specific Validation</strong>
          </div>
          <div className="rucm-container-cell">
            <RUCMFlow
              flow={usecase.specificValidation[i]}
              onChange={this.onCellChange('specific:'+i)}
            />
          </div>
        </div>
      )
    )
    const globalValidationRows = usecase.globalValidation.map(
      (v, i) => (
        <div className="rucm-row" key={"global:"+i}>
          <div className="rucm-title-cell">
            <strong>Global Validation</strong>
          </div>
          <div className="rucm-container-cell">
            <RUCMFlow
              flow={usecase.globalValidation[i]}
              onChange={this.onCellChange('global:'+i)}
            />
          </div>
        </div>
      )
    )
    return (
      <div className="rucm-template">
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Test Case Name</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.name}
              onChange={this.onCellChange('name')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Brief Description</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.description}
              onChange={this.onCellChange('description')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Precondition</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.precondition}
              onChange={this.onCellChange('precondition')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Dependency</strong>
          </div>
          <div className="rucm-content-cell">
            <RUCMEditableCell
              value={usecase.dependency}
              onChange={this.onCellChange('dependency')}
            />
          </div>
        </div>
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong>Test Flow</strong>
          </div>
          <div className="rucm-container-cell">
            <RUCMFlow
              flow={usecase.testflow}
              onChange={this.onCellChange('testflow')}
            />
          </div>
        </div>
        { specificValidationRows }
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong> Specific Validation </strong>
          </div>
          <div className="rucm-container-cell">
            <div className="rucm-steps">
              <div className="rucm-row">
                <div className="rucm-content-cell">
                  <Icon
                    type="plus-circle-o"
                    className="rucm-steps-cell-icon-add"
                    onClick={this.addSpecificValidation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        { globalValidationRows }
        <div className="rucm-row">
          <div className="rucm-title-cell">
            <strong> Global Validation </strong>
          </div>
          <div className="rucm-container-cell">
            <div className="rucm-steps">
              <div className="rucm-row">
                <div className="rucm-content-cell">
                  <Icon
                    type="plus-circle-o"
                    className="rucm-steps-cell-icon-add"
                    onClick={this.addGlobalValidation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default RUCMTemplate
