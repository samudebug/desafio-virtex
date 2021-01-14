import { Table, Tag, Button, Tooltip, Modal, Form, Space } from 'antd';
import 'antd/dist/antd.css';
import React, {useState} from 'react';
import AddService from './AddService';

import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Services() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm()
    const [editing, setEditing] = useState(false);
    const showModal = () => {
        setModalVisible(true);
    }

    const createService = (service) => {
        const oldServices = [...data];
        oldServices.push(service);
        setData(oldServices);
    }

    const onModalCancel = () => {
        form.resetFields();
        setModalVisible(false);
    }

    const onModalOk = () => {
        form.validateFields().then(values => {
            setModalVisible(false);
            form.resetFields();
            values.key = values.protocol;
            values.startedAt = new Date();
            values.tags = ['NO PRAZO', 'EM SERVIÇO']
            if (editing) {
                editService(values);
                setEditing(false);
            } else {
            createService(values);
            }
            
        });
    }

    const editService = (service) => {
        const oldData = [...data];
        const oldServiceIndex = oldData.findIndex((value) => value.protocol === service.protocol);
        oldData[oldServiceIndex] = service;
        setData(oldData);
    }

    const onClickEdit = (protocol) => {
        const service = data.find((value) => value.protocol === protocol);
        form.setFieldsValue(service);
        setEditing(true);
        setModalVisible(true);
    }

    const onClickDelete = (protocol) => {
        const oldData = [...data];
        const serviceIndex = oldData.findIndex((value) => value.protocol === protocol);
        oldData.splice(serviceIndex, 1);
        setData(oldData);
    }

    const [data, setData] = useState([
        {   
            protocol: 377227,
            key: 377227,
            technician: 'BRENO TARDELY DE SOUSA PEREIRA QUEIROZ',
            city: 'PICOS',
            district: 'INGAZEIRA',
            category: 'Suporte',
            request: '[CS]Internet Banda Larga - Sem Conexão',
            startedAt: new Date(2021, 0, 12, 8, 0, 11),
            tags: ['EM ATRASO', 'EM SERVIÇO']
        },
        {
            protocol: 377228,
            key: 377228,
            technician: 'BRENO TARDELY DE SOUSA PEREIRA QUEIROZ',
            city: 'PICOS',
            district: 'INGAZEIRA',
            category: 'Suporte',
            request: '[CS]Internet Banda Larga - Sem Conexão',
            startedAt: new Date(2021, 0, 12, 8, 0, 11),
            tags: ['EM ATRASO', 'EM SERVIÇO']
        },
        {
            protocol: 377229,
            key: 377229,
            technician: 'BRENO TARDELY DE SOUSA PEREIRA QUEIROZ',
            city: 'PICOS',
            district: 'INGAZEIRA',
            category: 'Suporte',
            request: '[CS]Internet Banda Larga - Sem Conexão',
            startedAt: new Date(2021, 0, 12, 8, 43, 14),
            tags: ['NO PRAZO', 'EM SERVIÇO']
        }
    ]);

    const columns = [
        {
            title: "Protocolo",
            dataIndex: 'protocol',
            key: 'protocol'
        },
        {
            title: "Técnico",
            dataIndex: 'technician',
            key: 'technician'
        },
        {
            title: "Cidade",
            dataIndex: 'city',
            key: 'city'
        },
        {
            title: "Bairro",
            dataIndex: 'district',
            key: 'district'
        },
        {
            title: "Categoria",
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: "Solicitação",
            dataIndex: 'request',
            key: 'request',
        },
        {
            title: "Iniciado Em",
            dataIndex: 'startedAt',
            key: 'startedAt',
            render: (startedAt) => (
                <p>{startedAt.toISOString()}</p>
            )
        },
        {
            title: "Tags",
            dataIndex: 'tags',
            key: 'tags',
            render: tags => (
                <>
                {tags.map(tag => {
                    let color = 'geekblue';
                    if (tag === "EM ATRASO" ) {
                        color = 'volcano';
                    }
                    if (tag === 'NO PRAZO') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
                </>
            )
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                    <Button onClick={() => {
                        onClickEdit(record.protocol)
                    }} type="primary" shape="circle" icon={<EditOutlined/>} />
                    </Tooltip>
                    <Tooltip title="Apagar">
                    <Button onClick={() => {
                        onClickDelete(record.protocol);
                    }} type="primary" danger shape="circle" icon={<DeleteOutlined/>} />
                    </Tooltip>
                </Space>
            )
        }
    ]
    return (
        <div>
            <Tooltip title="Adicionar">
                <Button onClick={showModal} type="primary" shape="circle" icon={<PlusOutlined/>} style={{marginBottom: 16}}/>
            </Tooltip>
            <Table dataSource={data} columns={columns}></Table>

            <Modal title="Adicionar Ordem de Serviço" visible={isModalVisible} onOk={onModalOk} onCancel={onModalCancel}>
                <AddService form={form} editing={editing}/>
            </Modal>
        </div>
        
    );
}

export default Services;