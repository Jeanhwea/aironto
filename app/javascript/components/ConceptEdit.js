import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button, message } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class ConceptEdit extends React.Component {

  constructor(props) {
    super(props);

    const data = this.props.data || {};
    this.state = {
      id: data.id,
      name: data.name,
      description: data.description,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    $.ajax({
      url: '/concepts/' + this.state.id + '.json',
      type: 'PATCH',
      data: {
        concept: {
          name: this.state.name,
          description: this.state.description,
        }
      },
      success: (res) => {
        if(res['status'] == 'ok') {
          console.log(this.state);
          message.success('修改成功')
        } else {
          message.error('修改失败：' + res['status'])
        }
      }
    });
  }

  handleNameChange = (e) => {
    const name = e.target.value || ""
    this.setState({ name });
  }

  handleDescChange = (e) => {
    const description = e.target.value || ""
    this.setState({ description });
  }

  render() {
    // console.log(this.state)
    return (
      <div style={{padding: "25px"}}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="概念名称"
          >
          <Input
            id="name"
            placeholder="概念名称"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="概念描述"
          >
          <TextArea
            id="description"
            placeholder="概念描述"
            value={this.state.description}
            onChange={this.handleDescChange}
          />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default ConceptEdit
