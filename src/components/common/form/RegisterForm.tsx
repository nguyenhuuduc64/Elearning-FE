'use client';

import { Form, Input, Button, message, Card, Radio } from 'antd';
import type { FormProps } from '@rc-component/form/lib/Form';
import { useUIStore } from '@/src/store/uiStore';
import { instance } from '@/src/config/axios';

export default function RegisterForm() {
      const { closeForm } = useUIStore();
    
    interface RegisterFormValues {
        fullName: string;
        email: string;
        password: string;
        phone?: string;
    }

    const onFinish: FormProps<RegisterFormValues>['onFinish']= async (values: RegisterFormValues) => {
        console.log('Success:', values);
        const response = await instance.post('/auth/register', values);
        console.log('Registration response:', response.data);
        closeForm();
        message.success('Đăng ký thành công!');
    };

    const onFinishFailed: FormProps<RegisterFormValues>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error('Vui lòng kiểm tra lại thông tin!');
    };
    return (
        <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
        }}
        onClick={() => closeForm()}
        >
            <Card
                title={
                <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
                    Đăng Ký
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
                    name="register"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="fullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu!' },
                            { min: 6, message: 'Mật khẩu ít nhất 6 ký tự!' }
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>
                    <Form.Item
                        label="Vai trò"
                        name="role"
                    >
                        <Radio.Group>
                            <Radio value="student">Học viên</Radio>
                            <Radio value="teacher">Giảng viên</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}