'use client';
import React, { useState } from 'react';
import { Button, Table, Input, Row, Col, Modal, Form, Select, InputNumber, Drawer } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Sample data for the inventory table
const initialInventoryData = [
  {
    key: '1',
    name: 'Stainless Steel Pipe',
    category: 'Pipe',
    material: '304 Stainless Steel',
    size: '4 inches',
    stock: 120,
    reorderLevel: 50,
    lastUpdated: '2024-11-15',
  },
  {
    key: '2',
    name: 'Carbon Steel Tube',
    category: 'Tube',
    material: 'Carbon Steel',
    size: '6 inches',
    stock: 30,
    reorderLevel: 20,
    lastUpdated: '2024-11-16',
  },
];

const Inventory: React.FC = () => {
  // Type for the inventory data
  const [inventoryData, setInventoryData] = useState<
    { key: string, name: string, category: string, material: string, size: string, stock: number, reorderLevel: number, lastUpdated: string }[]
  >(initialInventoryData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | { name: string, category: string, material: string, size: string, stock: number, reorderLevel: number, lastUpdated: string }>(null);

  const [form] = Form.useForm();

  // Handler to submit form data
  const handleFormSubmit = (values: { name: string, category: string, material: string, size: string, stock: number, reorderLevel: number }) => {
    const newData = {
      key: `${inventoryData.length + 1}`,
      ...values,
      lastUpdated: new Date().toISOString().split('T')[0], // Current Date
    };
    setInventoryData([...inventoryData, newData]);
    setIsModalVisible(false);
  };

  // Column definitions for the inventory table
  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Material Grade',
      dataIndex: 'material',
      key: 'material',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Current Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => (
        <span style={{ color: stock < 20 ? 'red' : 'green' }}>
          {stock}
        </span>
      ),
    },
    {
      title: 'Reorder Level',
      dataIndex: 'reorderLevel',
      key: 'reorderLevel',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <span>
          <Button
            icon={<EditOutlined />}
            style={{ marginRight: 8 }}
            onClick={() => handleEditItem(record)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteItem(record.key)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  // Handler to show modal for adding/editing items
  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  // Handle editing of an item
  const handleEditItem = (item: any) => {
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  // Handle deletion of an item
  const handleDeleteItem = (key: string) => {
    setInventoryData(inventoryData.filter((item) => item.key !== key));
  };

  // Handler to show item details drawer
  const showItemDetails = (item: any) => {
    setSelectedItem(item);
    setIsDrawerVisible(true);
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Header with Add New Item button */}
      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search placeholder="Search Inventory" style={{ width: 300 }} />
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add New Item
          </Button>
        </Col>
      </Row>

      {/* Inventory Table */}
      <Table
        columns={columns}
        dataSource={inventoryData}
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => showItemDetails(record),
        })}
        rowClassName="clickable-row"
      />

      {/* Modal for adding/editing items */}
      <Modal
        title="Add/Edit Inventory Item"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label="Item Name"
            name="name"
            rules={[{ required: true, message: 'Please input the item name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select>
              <Select.Option value="Pipe">Pipe</Select.Option>
              <Select.Option value="Tube">Tube</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Material Grade"
            name="material"
            rules={[{ required: true, message: 'Please input the material grade!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Size"
            name="size"
            rules={[{ required: true, message: 'Please input the size!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Initial Stock"
            name="stock"
            rules={[{ required: true, message: 'Please input the initial stock!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Reorder Level"
            name="reorderLevel"
            rules={[{ required: true, message: 'Please input the reorder level!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Drawer for item details */}
      <Drawer
        title="Item Details"
        placement="right"
        closable
        onClose={() => setIsDrawerVisible(false)}
        visible={isDrawerVisible}
      >
        {selectedItem && (
          <div>
            <p><b>Name:</b> {selectedItem.name}</p>
            <p><b>Category:</b> {selectedItem.category}</p>
            <p><b>Material:</b> {selectedItem.material}</p>
            <p><b>Size:</b> {selectedItem.size}</p>
            <p><b>Current Stock:</b> {selectedItem.stock}</p>
            <p><b>Reorder Level:</b> {selectedItem.reorderLevel}</p>
            <p><b>Last Updated:</b> {selectedItem.lastUpdated}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Inventory;
