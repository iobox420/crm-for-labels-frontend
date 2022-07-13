import React from 'react'
import { Button, DatePicker, Form, InputNumber } from "antd";
import moment from "moment";

const MyForm = () => {
  const [form] = Form.useForm()

  const edit = () => {
    form.setFieldsValue({
      field_1:42,
      date_f:moment()
    })
  }

  const handle = async () => {
    console.log(await form.validateFields());
  }

  return (
    <div>
      <Button
        onClick={handle}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        form validate fields
      </Button>
      <Button
        onClick={edit}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        edit
      </Button>
      <Form form={form} component={false}>
        <Form.Item
          name={'field_1'}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: false,
              message: `Please Input !`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
          <Form.Item
            name={'date_f'}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: false,
                message: `Please Input !`,
              },
            ]}
          >
            <DatePicker format={'DD.MM.YYYY'} />
          </Form.Item>
      </Form>
    </div>
  )
}

export default MyForm;
