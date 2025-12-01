export const metadata = {
  title: "Elearning",
  description: "Elearning System",
};

import ClientLayout from "./ClientLayout";
// app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // nếu bạn có file css riêng


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
