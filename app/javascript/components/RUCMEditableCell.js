import React from "react"
import PropTypes from "prop-types"
import { Icon } from 'antd'

class RUCMEditableCell extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: this.props.value,
      editable: false,
    }
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({ value })
  }

  update = () => {
    this.setState({ editable: false })
    if (this.props.onChange) {
      this.props.onChange(this.state.value)
    }
  }

  handlePressEnter = (e) => {
    if (e.key == "Enter") {
      this.update()
    }
  }

  edit = () => {
    this.setState({ editable: true })
  }

  render() {
    return (
      <div className="rucm-editable-cell">
        {
          this.state.editable ?
            <div className="rucm-editable-cell-input-wrapper">
              <input
                value={this.state.value}
                onChange={this.handleChange}
                onKeyDown={this.handlePressEnter}
                className="rucm-editable-cell-input"
              />
              <Icon
                type="check"
                className="rucm-editable-cell-icon-check"
                onClick={this.update}
              />
            </div>
            :
            <div className="rucm-editable-cell-text-wrapper">
              {this.state.value || ' '}
              <Icon
                type="edit"
                className="rucm-editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    )
  }

}

export default RUCMEditableCell
