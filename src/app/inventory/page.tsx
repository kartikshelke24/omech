'use client';
import React, { useState } from 'react';
import { Button, Table, Input, Row, Col, Modal, Form, Select, InputNumber, Drawer, Flex } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Sample data for the inventory table
const initialInventoryData = [
  {
    key: '1',
    name: 'TUBE 001',
    category: 'Pipe',
    material: '304 Stainless Steel',
    size: '4 inches',
    stock: 120,
    quantity: 50,
    lastUpdated: '2024-11-15',
  },
  {
    key: '2',
    name: 'TUBE 002',
    category: 'Pipe',
    material: 'Carbon Steel',
    size: '6 inches',
    stock: 30,
    quantity: 20,
    lastUpdated: '2024-11-16',
  },
];

const Inventory: React.FC = () => {
  // Type for the inventory data
  const [inventoryData, setInventoryData] = useState<
    { key: string, name: string, category: string, material: string, size: string, stock: number, quantity: number, lastUpdated: string }[]
  >(initialInventoryData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<null | { name: string, category: string, material: string, size: string, stock: number, quantity: number, lastUpdated: string }>(null);

  const [form] = Form.useForm();

  // Handler to submit form data
  const handleFormSubmit = (values: { name: string, category: string, material: string, size: string, stock: number, quantity: number }) => {
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
    // {
    //   title: 'Item Name',
    //   dataIndex: 'name',
    //   key: 'name',
    // },
    {
      title: 'Machine Name',
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
    // {
    //   title: 'Current Stock',
    //   dataIndex: 'stock',
    //   key: 'stock',
    //   render: (stock: number) => (
    //     <span style={{ color: stock < 20 ? 'red' : 'green' }}>
    //       {stock}
    //     </span>
    //   ),
    // },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
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
      <Col style={{width:'100%'}}>

      <Form form={form} onFinish={handleFormSubmit} layout="vertical">
        <Flex justify='' align='center' gap={20}>
          {/* <Form.Item
            label="Item Name"
            name="name"
            rules={[{ required: true, message: 'Please input the item name!' }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Tube Machine"
            name="machine"
            rules={[{ required: true, message: 'Please select a Machine!' }]}
          >
            <Select>
              <Select.Option value="Tube">TUBE 001</Select.Option>
              <Select.Option value="Laser">TUBE 002</Select.Option>
              <Select.Option value="Laser">TUBE 003</Select.Option>
              <Select.Option value="Laser">TUBE 004</Select.Option>
              <Select.Option value="Laser">TUBE 005</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Material Grade"
            name="grade"
            rules={[{ required: true, message: 'Please input the material grade!' }]}
          >
            <Select style={{width:'200px'}}>
              <Select.Option value="Tube">304</Select.Option>
              <Select.Option value="Laser">441  </Select.Option>
              <Select.Option value="Laser">450</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="OD"
            name="od"
            rules={[{ required: true, message: 'Please input the size!' }]}
          >
            <Select style={{width:'200px'}}>
              <Select.Option value="Tube">38.1</Select.Option>
              <Select.Option value="Laser">52  </Select.Option>
              <Select.Option value="Laser">31.75</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Thickness"
            name="thickness"
            rules={[{ required: true, message: 'Please Select the Thickness!' }]}
          >
            <Select style={{width:'200px'}}>
              <Select.Option value="Tube">1</Select.Option>
              <Select.Option value="Laser">1.5  </Select.Option>
              <Select.Option value="Laser">2</Select.Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            label="Quantity"
            name="stock"
            rules={[{ required: true, message: 'Please input the Quantity!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
         
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add New Item
          </Button>
          </Flex>
        </Form>


         
        </Col>
      </Row>


      <Row justify="end" style={{ marginBottom: 16 }}>
        <Col>
          <Input.Search placeholder="Search Inventory" style={{ width: 300 }} />
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
            {/* <p><b>Current Stock:</b> {selectedItem.stock}</p> */}
            <p><b>Reorder Level:</b> {selectedItem.quantity}</p>
            <p><b>Last Updated:</b> {selectedItem.lastUpdated}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Inventory;
