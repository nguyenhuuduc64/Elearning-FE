/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  // experimental.appDir không cần thiết từ Next.js 13.4+
  // Nếu bạn dùng App Router (thư mục app/), nó được enable mặc định
};

export default nextConfig;