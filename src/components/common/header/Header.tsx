"use client";

import { Button, Input } from "antd";

export default function Header() {
  const {Search} = Input;
  return (
    <header className="flex justify-end">
      <Search placeholder="Nhập từ khóa tìm kiếm"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={(value) => console.log("Tìm kiếm:", value)}
      />
      <div>
        <Button type="primary">Đăng nhập</Button>
        <Button type="default">Đăng ký</Button>
      </div>
    </header>
  );
}
