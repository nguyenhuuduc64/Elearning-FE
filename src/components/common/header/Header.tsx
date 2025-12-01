"use client";

import { Button } from "antd";

export default function Header() {
  return (
    <header className="flex justify-end">
      <Button type="primary">Đăng nhập</Button>
      <Button type="default">Đăng ký</Button>
    </header>
  );
}
