'use client'
import React from 'react';
import { Table, Button } from 'antd';
import LayoutComponent from '../layout';

const Orders: React.FC = () => {
  const columns = [
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Action', key: 'action', render: () => <Button>Update Status</Button> },
  ];

  const data = [
    { key: '1', customer: 'ABC Ltd.', product: 'SS304 Pipe', quantity: 20, status: 'Pending' },
  ];

  return (
    <LayoutComponent>
      <Button type="primary" style={{ marginBottom: 16 }}>Create Order</Button>
      <Table columns={columns} dataSource={data} />
    </LayoutComponent>
  );
};

export default Orders;
