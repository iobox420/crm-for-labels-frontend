// тестовый компонент
// @ts-nocheck
import { Form, Input, Select, Upload } from 'antd'
import { Button } from 'antd/lib/radio'
import React from 'react'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const normFile = e => {
  console.log('Upload event:', e)

  if (Array.isArray(e)) {
    return e
  }

  return e?.fileList
}

const TestForm = () => {
  const [form] = Form.useForm()
  const submitButton = async () => {
    const formValues = await form.validateFields()
    console.log(formValues);
  }

  const onFinish = values => {
    console.log('Received values of form: ', values)
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div>
      <Form  form={form} onFinish={() => {}}>
        <Form.Item
          name={'textInput'}
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
          <Input />
        </Form.Item>
        <Form.Item
          name="tagList"
          label="Upload"
          valuePropName="list"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Tag list is required',
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
          >
            <UploadOutlined style={{ marginRight: 5 }} />
            Upload
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={() => {
            form.resetFields()
          }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default TestForm
