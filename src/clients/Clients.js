import { Table, Button, Tooltip, Modal, Form, Space } from 'antd';
import 'antd/dist/antd.css';
import React, {useState} from 'react';
import AddClient from './AddClient';

import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

function Clients() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm()
    const [editing, setEditing] = useState(false);
    const [editingId, setEditingId] = useState(0);
    const showModal = () => {
        setModalVisible(true);
    }

    const createClient = (client) => {
        const oldData = [...data];
        oldData.push(client);
        setData(oldData);
    }

    const onModalCancel = () => {
        form.resetFields();
        setModalVisible(false);
    }

    const onModalOk = () => {
        form.validateFields().then(values => {
            setModalVisible(false);
            form.resetFields();
            
            if (editing) {
                values.id = editingId;
                values.key = values.id;
                editClient(values);
                setEditing(false);
            } else {
                const oldData = [...data];
                const {id} = oldData[oldData.length - 1];
                values.id = id + 1;
                createClient(values);
            }
            
        });
    }

    const editClient = (client) => {
        const oldData = [...data];
        const oldClientIndex = oldData.findIndex((value) => value.id === client.id);
        oldData[oldClientIndex] = client;
        setData(oldData);
    }

    const onClickEdit = (id) => {
        const client = data.find((value) => value.id === id);
        form.setFieldsValue(client);
        setEditing(true);
        setEditingId(id);
        setModalVisible(true);
    }

    const onClickDelete = (id) => {
        const oldData = [...data];
        const clientIndex = oldData.findIndex((value) => value.id === id);
        oldData.splice(clientIndex, 1);
        setData(oldData);
    }

    const [data, setData] = useState([
        {   
            id: 35,
            key: 35,
            name: 'FELIPE MATIAS',
            city: 'PICOS',
            district: 'INGAZEIRA',
            phone: '(89) 3422-2173'
        },
        {   
            id: 36,
            key: 36,
            name: 'MATEUS RAMOS',
            city: 'PICOS',
            district: 'JUNCO',
            phone: '(89) 8842-7653'
        },
        {   
            id: 37,
            key: 37,
            name: 'PEDRO HENRIQUE',
            city: 'PICOS',
            district: 'CENTRO',
            phone: '(89) 9976-5412'
        }
    ]);

    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: "Nome",
            dataIndex: 'name',
            key: 'name'
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
            title: "Telefone",
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                    <Button onClick={() => {
                        onClickEdit(record.id)
                    }} type="primary" shape="circle" icon={<EditOutlined/>} />
                    </Tooltip>
                    <Tooltip title="Apagar">
                    <Button onClick={() => {
                        onClickDelete(record.id);
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
                <AddClient form={form} editing={editing}/>
            </Modal>
        </div>
        
    );
}

export default Clients;