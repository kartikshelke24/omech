'use client';
import React from 'react';
import { Row, Col, Card, Statistic, Table, Button } from 'antd';
import { Line } from '@ant-design/plots';
import {
  DatabaseOutlined,
  StockOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  // Sample data for charts and tables
  const productionData = [
    { month: 'Jan', value: 200 },
    { month: 'Feb', value: 300 },
    { month: 'Mar', value: 250 },
    { month: 'Apr', value: 400 },
    { month: 'May', value: 350 },
  ];

  const recentActivities = [
    {
      key: '1',
      action: 'New Product Added',
      status: 'Completed',
      date: '2024-11-18',
    },
    {
      key: '2',
      action: 'Production Started',
      status: 'In Progress',
      date: '2024-11-17',
    },
    {
      key: '3',
      action: 'Inventory Updated',
      status: 'Completed',
      date: '2024-11-16',
    },
  ];

  // Config for Ant Design's Line Chart (Production Stats)
  const productionConfig = {
    data: productionData,
    xField: 'month',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        {/* Metric Cards */}
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={128}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Inventory Status"
              value={512}
              prefix={<StockOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Orders"
              value={42}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Production Status"
              value="5 In Progress"
              prefix={<SettingOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts & Graphs */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Card title="Production Statistics">
            <Line {...productionConfig} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Inventory Usage">
            {/* Placeholder for another chart (e.g., pie/bar chart) */}
            <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>Chart Component Placeholder</span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities Table */}
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card
            title="Recent Activities"
            extra={<Button type="primary">View All</Button>}
          >
            <Table
              dataSource={recentActivities}
              columns={[
                {
                  title: 'Action',
                  dataIndex: 'action',
                  key: 'action',
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                },
                {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
                },
              ]}
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
