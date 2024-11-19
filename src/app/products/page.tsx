'use client'
import React from 'react';
import { Table, Button } from 'antd';
import LayoutComponent from '../layout';

const Products: React.FC = () => {
  const columns = [
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    { title: 'Finish', dataIndex: 'finish', key: 'finish' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    { title: 'Action', key: 'action', render: () => <Button>Edit</Button> },
  ];

  const data = [
    { key: '1', grade: 'SS304', size: '20mm', finish: 'Polished', stock: 100 },
    { key: '2', grade: 'SS316', size: '50mm', finish: 'Matte', stock: 50 },
  ];

  return (
    <LayoutComponent>
      <Button type="primary" style={{ marginBottom: 16 }}>Add Product</Button>
      <Table columns={columns} dataSource={data} />
    </LayoutComponent>
  );
};

export default Products;
