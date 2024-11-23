'use client';
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Select, DatePicker, Space, message, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductionLogsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState([
    {
      key: '1',
      machine: 'Tube Machine #3',
      staff: 'John Doe',
      shift: 'Morning (6 AM - 2 PM)',
      date: '2024-11-19',
      quantity: '200',
      od: '50mm',
      thickness: '3mm',
      grade: 'SS304',
    },
  ]);

  // Predefined dropdown values
  const machines = [
    'Tube Machine #1',
    'Tube Machine #2',
    'Tube Machine #3',
    'Laser Machine #1',
    'Laser Machine #2',
  ];
  const staffList = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Lee'];
  const shifts = [
    'Morning (6 AM - 2 PM)',
    'Evening (2 PM - 10 PM)',
    'Night (10 PM - 6 AM)',
  ];
  const ods = ['50mm', '75mm', '100mm', '150mm'];
  const thicknesses = ['3mm', '5mm', '8mm', '10mm'];
  const grades = ['SS304', 'SS316', 'MS', 'Aluminum'];

  // Add new log to table
  const handleAddLog = (values: any) => {
    const newLog = {
      key: `${logs.length + 1}`,
      machine: values.machine,
      staff: values.staff,
      shift: values.shift,
      date: values.date.format('YYYY-MM-DD'),
      quantity: values.quantity,
      od: values.od,
      thickness: values.thickness,
      grade: values.grade,
    };

    setLogs([...logs, newLog]);
    message.success('Production/Processing log added successfully!');
    setIsModalOpen(false);
  };

  return (
    <div>
      <Flex style={{justifyContent:'space-between'}}>
      <h2>Production/Processing Logs</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
        style={{ marginBottom: 16 }}
      >
        Add Log
      </Button>
      </Flex>
      <Table
        dataSource={logs}
        columns={[
          { title: 'Machine', dataIndex: 'machine', key: 'machine' },
          { title: 'Staff', dataIndex: 'staff', key: 'staff' },
          { title: 'Shift', dataIndex: 'shift', key: 'shift' },
          { title: 'Date', dataIndex: 'date', key: 'date' },
          { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
          { title: 'OD', dataIndex: 'od', key: 'od' },
          { title: 'Thickness', dataIndex: 'thickness', key: 'thickness' },
          { title: 'Grade', dataIndex: 'grade', key: 'grade' },
        ]}
        style={{ marginTop: 16 }}
      />
      <Modal
        title="Add Production/Processing Log"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleAddLog}>
          <Form.Item
            label="Machine"
            name="machine"
            rules={[{ required: true, message: 'Please select a machine!' }]}
          >
            <Select placeholder="Select machine">
              {machines.map((machine) => (
                <Option key={machine} value={machine}>
                  {machine}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Staff"
            name="staff"
            rules={[{ required: true, message: 'Please select staff!' }]}
          >
            <Select placeholder="Select staff">
              {staffList.map((staff) => (
                <Option key={staff} value={staff}>
                  {staff}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Shift"
            name="shift"
            rules={[{ required: true, message: 'Please select a shift!' }]}
          >
            <Select placeholder="Select shift">
              {shifts.map((shift) => (
                <Option key={shift} value={shift}>
                  {shift}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter quantity!' }]}
          >
            <Select placeholder="Select quantity">
              <Option value="100">100</Option>
              <Option value="200">200</Option>
              <Option value="500">500</Option>
              <Option value="1000">1000</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Outer Diameter (OD)"
            name="od"
            rules={[{ required: true, message: 'Please select OD!' }]}
          >
            <Select placeholder="Select OD">
              {ods.map((od) => (
                <Option key={od} value={od}>
                  {od}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Thickness"
            name="thickness"
            rules={[{ required: true, message: 'Please select thickness!' }]}
          >
            <Select placeholder="Select thickness">
              {thicknesses.map((thickness) => (
                <Option key={thickness} value={thickness}>
                  {thickness}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: 'Please select grade!' }]}
          >
            <Select placeholder="Select grade">
              {grades.map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Add Log
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductionLogsPage;
