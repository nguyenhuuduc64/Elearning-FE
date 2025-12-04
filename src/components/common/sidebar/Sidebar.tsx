"use client";

import { Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/src/store/authStore";
const menuItems = [
  {
    key: "/dashboard",
    icon: <UserOutlined />,
    label: "Dashboard",
  },
  {
    key: "/courses",
    icon: <VideoCameraOutlined />,
    label: "Courses",
  },
  {
    key: "/upload",
    icon: <UploadOutlined />,
    label: "Upload",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  // Sử dụng useState initializer thay vì useEffect
  const [mounted, setMounted] = useState(false);
  useState(() => {
    setMounted(true);
  });

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  if (!mounted) {
    return (
      <div style={{ padding: '16px' }}>
        <div style={{ height: '32px', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '6px' }} />
        <div style={{ height: '32px', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '6px', marginTop: '8px' }} />
        <div style={{ height: '32px', background: 'rgba(0, 0, 0, 0.06)', borderRadius: '6px', marginTop: '8px' }} />
      </div>
    );
  }

  return (
    <>
      {!user && null}

      {user?.role === 'teacher' && (
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      )}

      {user?.role === 'student' && (
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname]}
          onClick={handleMenuClick}
          items={menuItems.filter(item => item.key !== '/upload')}
        />
      )}
    </>
  );
}