'use client';

import React, { useState } from 'react';
import { Table, Button, Input, Select, Space, Modal, Form, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;

// Inventory Data Mock (Replace with API calls)
const mockInventoryData = [
  {
    key: '1',
    productName: 'Pipe - A106 - 100mm OD - 5mm Thickness',
    category: 'Raw Pipe',
    materialGrade: 'A106',
    quantity: 20,
    od: '100mm',
    thickness: '5mm',
    length: '6m',
  },
  {
    key: '2',
    productName: 'Pipe - A106 - 100mm OD - 5mm Thickness - Polished',
    category: 'Finished Pipe',
    materialGrade: 'A106',
    quantity: 10,
    od: '100mm',
    thickness: '5mm',
    length: '3m',
  },
];

// Table Columns
const columns: ColumnsType<any> = [
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Material Grade',
    dataIndex: 'materialGrade',
    key: 'materialGrade',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'OD (Outer Diameter)',
    dataIndex: 'od',
    key: 'od',
  },
  {
    title: 'Thickness',
    dataIndex: 'thickness',
    key: 'thickness',
  },
  {
    title: 'Length',
    dataIndex: 'length',
    key: 'length',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button type="primary" onClick={() => handleProcess(record)}>
          Process Item
        </Button>
        <Button danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      </Space>
    ),
  },
];

// Handlers (Replace with backend API logic)
const handleProcess = (record: any) => {
  notification.info({
    message: `Processing ${record.productName}`,
    description: 'Redirecting to Laser Machine job creation...',
  });
  // Redirect logic here
};

const handleDelete = (record: any) => {
  Modal.confirm({
    title: 'Are you sure?',
    content: `This will delete ${record.productName} from inventory.`,
    onOk: () => {
      notification.success({ message: 'Deleted successfully!' });
      // Backend delete logic here
    },
  });
};

const InventoryPage: React.FC = () => {
  const [data, setData] = useState(mockInventoryData);

  const handleAddNew = () => {
    Modal.info({
      title: 'Add New Inventory',
      content: (
        <Form layout="vertical">
          <Form.Item label="Product Name">
            <Input />
          </Form.Item>
          <Form.Item label="Material Grade">
            <Input />
          </Form.Item>
          <Form.Item label="Category">
            <Select>
              <Option value="Raw Pipe">Raw Pipe</Option>
              <Option value="Finished Pipe">Finished Pipe</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Quantity">
            <Input type="number" />
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        notification.success({ message: 'Inventory added successfully!' });
        // Backend add logic here
      },
    });
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddNew}>
          Add Inventory
        </Button>
        <Input.Search placeholder="Search inventory..." style={{ width: 300 }} />
        <Select placeholder="Filter by Category" style={{ width: 200 }}>
          <Option value="Raw Pipe">Raw Pipe</Option>
          <Option value="Finished Pipe">Finished Pipe</Option>
        </Select>
      </Space>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default InventoryPage;
