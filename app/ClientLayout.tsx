"use client";

import { Layout, Button, Space, Flex } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Sidebar from "@/src/components/common/sidebar/Sidebar";
import { useUIStore } from "@/src/store/uiStore";
import RegisterForm from "@/src/components/common/form/RegisterForm";
import LoginForm from "@/src/components/common/form/LoginForm";
import { useAuthStore } from "@/src/store/authStore";
import Image from "next/image";

const { Header, Sider, Content } = Layout;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const currentForm = useUIStore((state) => state.currentForm);
  const openForm = useUIStore((state) => state.openForm);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setHasMounted(true);
  }, []);


  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#fff" }}
      >
        <Flex vertical align="center" style={{ width: "100%" }}>
          <Flex align="center" justify="center" gap={0} style={{ height: 60 }}>
            <Image src="/images/logo.png" alt="Logo" width={80} height={60} />
            {!collapsed && (
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>Elearning</div>
            )}
          </Flex>
        </Flex>

        <Sidebar />
      </Sider>

      <Layout>
        {/* Header */}
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />

          <Space>
            {hasMounted && !isAuthenticated() && (
              <>
                <Button type="primary" onClick={() => openForm("login")}>
                  Đăng nhập
                </Button>
                <Button onClick={() => openForm("register")}>Đăng ký</Button>
              </>
            )}

            {hasMounted && isAuthenticated() && (
              <>
                <span>Xin chào, {user?.fullName}</span>
                <Button type="default" onClick={logout}>
                  Đăng xuất
                </Button>
              </>
            )}
          </Space>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          {currentForm === "register" && <RegisterForm />}
          {currentForm === "login" && <LoginForm />}

          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
