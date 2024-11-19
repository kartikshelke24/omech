'use client'
import React from 'react';
import { Button, Card } from 'antd';
import LayoutComponent from '../layout';

const Reports: React.FC = () => {
  return (
    <LayoutComponent>
      <Card title="Stock Report">
        <Button>Generate Report</Button>
      </Card>
      <Card title="Sales Report">
        <Button>Generate Report</Button>
      </Card>
    </LayoutComponent>
  );
};

export default Reports;
