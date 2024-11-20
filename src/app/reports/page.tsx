'use client';
import React, { useState } from 'react';
import { Card, Row, Col, Button, DatePicker, Select, Table, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots'; // For visualization charts (install ant-design-charts)
const { parse } = require('json2csv');

const { RangePicker } = DatePicker;
const { Option } = Select;

// Sample data for the reports table and chart
const initialReportData = [
  { key: '1', date: '2024-11-10', category: 'Pipe', production: 300, sales: 250, inventory: 120 },
  { key: '2', date: '2024-11-11', category: 'Tube', production: 150, sales: 100, inventory: 80 },
  { key: '3', date: '2024-11-12', category: 'Pipe', production: 200, sales: 180, inventory: 60 },
];

// Chart data format
const chartData = initialReportData.map(item => ({
  date: item.date,
  production: item.production,
  sales: item.sales,
}));

const Reports: React.FC = () => {
  const [reportData, setReportData] = useState(initialReportData);

  // Column definitions for the reports table
  const columns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Production Output', dataIndex: 'production', key: 'production' },
    { title: 'Sales', dataIndex: 'sales', key: 'sales' },
    { title: 'Current Inventory', dataIndex: 'inventory', key: 'inventory' },
  ];

  // Configuration for the line chart
  const chartConfig = {
    data: chartData,
    xField: 'date',
    yField: 'production',
    seriesField: 'date',
    point: { size: 5, shape: 'diamond' },
    tooltip: {
      showMarkers: true,
    },
    state: {
      active: {
        style: {
          shadowColor: '#FCCE39',
          shadowBlur: 4,
          stroke: '#FCCE39',
        },
      },
    },
    style: {
      height: 300,
      marginBottom: 32,
    },
  };

  // Function to export data to CSV
  const exportToCSV = () => {
    try {
      const fields = ['date', 'category', 'production', 'sales', 'inventory'];
      const csv = parse(reportData, { fields });
      
      // Create a Blob from the CSV data and download it
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'report_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Success message
      message.success('CSV file exported successfully!');
    } catch (err) {
      console.error('Error exporting CSV:', err);
      message.error('Failed to export CSV file.');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Dashboard Summary */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card title="Total Production" bordered={false}>
            650 Units
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Sales" bordered={false}>
            530 Units
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Total Inventory" bordered={false}>
            180 Units
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Pending Orders" bordered={false}>
            25 Orders
          </Card>
        </Col>
      </Row>

      {/* Filter Options */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <RangePicker style={{ width: '100%' }} />
        </Col>
        <Col span={8}>
          <Select defaultValue="Pipe" style={{ width: '100%' }}>
            <Option value="Pipe">Pipe</Option>
            <Option value="Tube">Tube</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Button type="primary" icon={<DownloadOutlined />} onClick={exportToCSV}>
            Export CSV
          </Button>
        </Col>
      </Row>

      {/* Data Visualization */}
      <Card title="Production & Sales Over Time" style={{ marginBottom: 24 }}>
        <Line {...chartConfig} />
      </Card>

      {/* Reports Table */}
      <Table
        columns={columns}
        dataSource={reportData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Reports;
