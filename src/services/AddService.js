import React, {useState} from 'react';
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

function AddService(props) {
    const [requests, setRequests] = useState([]);
    const [city, setCity] = useState('');
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

      const categories = [
        {
            label: 'Suporte',
            value: 'Suporte'
        },
        {
            label: 'Mudança de Endereço',
            value: 'Mudança de Endereço'
        },
        {
            label: 'Ativação',
            value: 'Ativação'
        }
    ];

    const onChangeCategory = (category) => {
        const supportRequests = [
            {
                label: '[CS]Internet Banda Larga - Sem Conexão',
                value: '[CS]Internet Banda Larga - Sem Conexão'
            },
            {
                label: '[CS]Rede Interna',
                value: '[CS]Rede Interna'
            },
            {
                label: '[CS]Troca de Equipamento',
                value: '[CS]Troca de Equipamento'
            }
        ];

        const activationRequestsPicos = [
            {
                label: '[AF] Ativação - Fibra Picos',
                value: '[AF] Ativação - Fibra Picos'
            },
        ];

        const activationRequestsOeiras = [
            {
                label: '[AF] Ativação - Fibra Picos',
                value: '[AF] Ativação - Fibra Oeiras'
            },
        ];

        const changeAddressRequests = [
            {
                label: '[ME] Mudança de Endereço',
                value: '[ME] Mudança de Endereço'
            },
        ]
        if (category === 'Suporte') {
            setRequests(supportRequests);
        }
        if (category === 'Ativação') {
            if (city === 'PICOS') setRequests(activationRequestsPicos);
            if (city === 'OEIRAS') setRequests(activationRequestsOeiras);
            if (city === '') setRequests([]);
        }

        if (category === 'Mudança de Endereço') setRequests(changeAddressRequests);
    };

    return (
        <Form
        form={props.form}
        {...layout}
        name="addService"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        defaultValue={{
            category: 'Suporte'
        }}
        >
            <Form.Item
                label="Protocolo"
                name="protocol"
                rules={[
                    {
                        required: true,
                        message: 'Este campo é necessário'
                    }
                ]}>
                    <InputNumber disabled={props.editing} />
                </Form.Item>
             
                <Form.Item
                label="Técnico"
                name="technician"
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
                    <Select options={cities} onChange={setCity}/>
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
                label="Categoria"
                name="category"
                rules={[
                    {
                        required: true,
                        message: 'Este campo é necessário'
                    }
                ]}>
                    <Select value="Suporte" options={categories} onChange={onChangeCategory}/>
                </Form.Item>
                <Form.Item
                label="Solicitação"
                name="request"
                rules={[
                    {
                        required: true,
                        message: 'Este campo é necessário'
                    }
                ]}>
                    <Select options={requests}/>
                </Form.Item>
        </Form>
    );
}

export default AddService;