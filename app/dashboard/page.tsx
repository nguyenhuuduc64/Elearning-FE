'use client'
import { Card } from "antd";
function Dashboard() {
    const link = "https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg?semt=ais_hybrid&w=740&q=80"
    return ( 
        <div>
            <h1>Dashboard</h1>
            <Card
                hoverable
                style={{ width: 300 }}
                cover={<img alt="course" src={link} />}
                >
                <Card.Meta
                    title="Khóa học JavaScript cơ bản"
                    description="Giảng viên: Nguyễn Văn A"
                />
            </Card>

        </div>
     );
}

export default Dashboard;