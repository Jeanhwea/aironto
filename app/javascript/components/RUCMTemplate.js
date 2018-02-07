import React from "react"
import PropTypes from "prop-types"
import { Icon } from "antd"
import shortid from "shortid"
import RUCMEditableCell from "./RUCMEditableCell"
import RUCMFlow from "./RUCMFlow"

class RUCMTemplate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usecase: {
        name: "",
        description: "",
        precondition: "",
        dependency: "",
        testflow: {
          conditionKey: "Basic",
          conditionValue: "",
          steps: [""],
          postcondition: "",
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
          name: "",
          description: "",
          precondition: "",
          dependency: "",
          testflow: {
            conditionKey: "Basic",
            conditionValue: "",
            steps: [""],
            postcondition: "",
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
          const idx = parseInt(key.split(":")[1])
          usecase.specificValidation[idx] = value
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

  specificValidationAppend = (e) => {
    this.state.usecase.specificValidation.push({
      conditionKey: "RFS",
      conditionValue: "",
      steps: [""],
      postcondition: "",
    })
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  specificValidationInsert = (e) => {
    const key = e.target.id
    if (key.startsWith("specific")) {
      const idx = parseInt(key.split(":")[1])
      this.state.usecase.specificValidation.splice(idx+1,0,{
        conditionKey: "RFS",
        conditionValue: "",
        steps: [""],
        postcondition: "",
      })
      this.setState({ usecase: this.state.usecase } )
      this.update()
    }
  }

  specificValidationRemove = (e) => {
    const key = e.target.id
    if (key.startsWith("specific")) {
      const idx = parseInt(key.split(":")[1])
      this.state.usecase.specificValidation.splice(idx,1)
      this.setState({ usecase: this.state.usecase } )
      this.update()
    }
  }

  specificValidationUp = (e) => {
    const key = e.target.id
    if (key.startsWith("specific")) {
      const idx = parseInt(key.split(":")[1])
      const validations = this.state.usecase.specificValidation
      if (idx > 0) {
        [validations[idx-1], validations[idx]] = [validations[idx], validations[idx-1]]
        this.setState({ usecase: this.state.usecase } )
        this.update()
      }
    }
  }

  specificValidationDown = (e) => {
    const key = e.target.id
    if (key.startsWith("specific")) {
      const idx = parseInt(key.split(":")[1])
      const validations = this.state.usecase.specificValidation
      if (idx < validations.length-1) {
        [validations[idx+1], validations[idx]] = [validations[idx], validations[idx+1]]
        this.setState({ usecase: this.state.usecase } )
        this.update()
      }
    }
  }

  globalValidationAppend = (e) => {
    this.state.usecase.globalValidation.push({
      conditionKey: "Guard Condition",
      conditionValue: "",
      steps: [""],
      postcondition: "",
    })
    this.setState({ usecase: this.state.usecase })
    this.update()
  }

  globalValidationInsert = (e) => {
    const key = e.target.id
    if (key.startsWith("global")) {
      const idx = parseInt(key.split(":")[1])
      this.state.usecase.globalValidation.splice(idx+1,0,{
        conditionKey: "Guard Condition",
        conditionValue: "",
        steps: [""],
        postcondition: "",
      })
      this.setState({ usecase: this.state.usecase } )
      this.update()
    }
  }

  globalValidationRemove = (e) => {
    const key = e.target.id
    if (key.startsWith("global")) {
      const idx = parseInt(key.split(":")[1])
      this.state.usecase.globalValidation.splice(idx,1)
      this.setState({ usecase: this.state.usecase } )
      this.update()
    }
  }

  globalValidationUp = (e) => {
    const key = e.target.id
    if (key.startsWith("global")) {
      const idx = parseInt(key.split(":")[1])
      const validations = this.state.usecase.globalValidation
      if (idx > 0) {
        [validations[idx-1], validations[idx]] = [validations[idx], validations[idx-1]]
        this.setState({ usecase: this.state.usecase } )
        this.update()
      }
    }
  }

  globalValidationDown = (e) => {
    const key = e.target.id
    if (key.startsWith("global")) {
      const idx = parseInt(key.split(":")[1])
      const validations = this.state.usecase.globalValidation
      if (idx < validations.length-1) {
        [validations[idx+1], validations[idx]] = [validations[idx], validations[idx+1]]
        this.setState({ usecase: this.state.usecase } )
        this.update()
      }
    }
  }

  componentWillMount = () => {
    this.setUsecase()
  }

  render() {
    const usecase = this.state.usecase
    const specificValidationRows = usecase.specificValidation.map(
      (v, i) => (
        <div className="rucm-row" key={"specific:"+i+":"+shortid.generate()}>
          <div className="rucm-title-cell">
            <div className="rucm-validation-title-cell">
              <div className="rucm-validation-cell-icon-wrapper">
                <Icon
                  id={"specific:"+i}
                  type="close-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.specificValidationRemove}
                />
                <Icon
                  id={"specific:"+i}
                  type="plus-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.specificValidationInsert}
                />
                <Icon
                  id={"specific:"+i}
                  type="up-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.specificValidationUp}
                />
                <Icon
                  id={"specific:"+i}
                  type="down-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.specificValidationDown}
                />
              </div>
              <div className="rucm-validation-cell-text-wrapper">
                <strong>Specific Validation</strong>
              </div>
            </div>
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
        <div className="rucm-row" key={"global:"+i+":"+shortid.generate()}>
          <div className="rucm-title-cell">
            <div className="rucm-validation-title-cell">
              <div className="rucm-validation-cell-icon-wrapper">
                <Icon
                  id={"global:"+i}
                  type="close-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.globalValidationRemove}
                />
                <Icon
                  id={"global:"+i}
                  type="plus-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.globalValidationInsert}
                />
                <Icon
                  id={"global:"+i}
                  type="up-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.globalValidationUp}
                />
                <Icon
                  id={"global:"+i}
                  type="down-circle"
                  className="rucm-validation-cell-icon-operator"
                  onClick={this.globalValidationDown}
                />
              </div>
              <div className="rucm-validation-cell-text-wrapper">
                <strong>Global Validation</strong>
              </div>
            </div>
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
                    onClick={this.specificValidationAppend}
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
                    onClick={this.globalValidationAppend}
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

RUCMTemplate.propTypes = {
  usecase: PropTypes.object,
  onChange: PropTypes.func
}
export default RUCMTemplate
