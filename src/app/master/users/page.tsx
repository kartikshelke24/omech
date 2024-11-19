// /pages/system-user-management/index.tsx
"use client"
import { useState } from "react";
import { Table, Button, Form, Input, Tabs } from "antd";

const SystemUserManagement = () => {
  const { TabPane } = Tabs;
  const [users, setUsers] = useState<{ name: string, role : string }[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState("");

  const handleAddUser = () => {
    setUsers([...users, { name: newUserName, role: newUserRole }]);
    setNewUserName(""); // Clear input
    setNewUserRole(""); // Clear input
  };

  return (
    <div>
      <h1>System & User Management</h1>
      <Tabs defaultActiveKey="1">
        {/* Tab for Users */}
        <TabPane tab="Users" key="1">
          <Form layout="inline">
            <Form.Item>
              <Input
                placeholder="User Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Role"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleAddUser} type="primary">
                Add User
              </Button>
            </Form.Item>
          </Form>

          <Table
            columns={[{ title: 'User Name', dataIndex: 'name' }, { title: 'Role', dataIndex: 'role' }]}
            dataSource={users}
            rowKey="name"
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SystemUserManagement;
