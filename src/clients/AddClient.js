import React from 'react';
import 'antd/dist/antd.css';

import { Form, InputNumber, Input, Select } from 'antd';

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    },

};

// const tailLayout = {
//     wrapperCol: {
//         offset: 8,
//         span: 16,
//       },
// }

function AddClient(props) {
    const onFinish = (values) => {
        console.log("Sucess", values);
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
      const cities = [
          {
              label: 'PICOS',
              value: 'PICOS'
          },
          {
              label: 'OEIRAS',
              value: 'OEIRAS'
          }
      ];



    return (
        <Form
        form={props.form}
        {...layout}
        name="addClient"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Nome"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Este campo é necessário'
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                label="Cidade"
                name="city"
                rules={[
                    {
                        required: true,
                        message: 'Este campo é necessário'
                    }
                ]}>
                    <Select options={cities}/>
                </Form.Item>
                <Form.Item
                label="Bairro"
                name="district"
                rules={[
                    {
                        required: true,
                        message: 'Este campo é necessário'
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                label="Telefone"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Este campo é necessário'
                    }
                ]}>
                    <InputNumber />
                </Form.Item>
        </Form>
    );
}

export default AddClient;