// src/components/common/form/LoginForm.tsx
'use client'

import { Form, Input, Button, Card, Divider, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useUIStore } from "@/src/store/uiStore";
import { instance } from "@/src/config/axios";
import { useAuthStore } from "@/src/store/authStore";
interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
    const [form] = Form.useForm();
    const { closeForm, openForm } = useUIStore();
    const authStore = useAuthStore();
    const onFinish = async (values: LoginFormValues) => {
        try {
            console.log("Login values:", values);
            const response = await instance.post('/auth/login', values);
            console.log("Login response:", response.data.data.accessToken);
            authStore.setAuth(response.data.data.user, response.data.data.accessToken);
            message.success("Đăng nhập thành công!");
            closeForm();
        } catch (error) {
        message.error("Đăng nhập thất bại!");
        }
    };

    return (
        <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        }}
        onClick={() => closeForm()}
        >
        <Card
            title={
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
                Đăng Nhập
            </div>
            }
            style={{
            width: 400,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <Form
            form={form}
            name="login"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            size="large"
            >
            <Form.Item
                name="email"
                label="Email"
                rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
                ]}
            >
                <Input
                prefix={<UserOutlined />}
                placeholder="Nhập email của bạn"
                />
            </Form.Item>

            <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
            >
                <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                />
            </Form.Item>

            <Form.Item>
                <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", height: "40px" }}
                >
                Đăng Nhập
                </Button>
            </Form.Item>
            </Form>

            <Divider plain>hoặc</Divider>

            <div style={{ textAlign: "center" }}>
            <span style={{ color: "#666" }}>Chưa có tài khoản? </span>
            <Button
                type="link"
                style={{ padding: 0, fontWeight: "bold" }}
                onClick={() => openForm("register")}
            >
                Đăng ký ngay
            </Button>
            </div>

            <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Button type="link" style={{ fontSize: "12px", color: "#666" }}>
                Quên mật khẩu?
            </Button>
            </div>
        </Card>
        </div>
    );
}