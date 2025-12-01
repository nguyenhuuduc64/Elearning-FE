'use client'
import { Card } from "antd";
import Menu from "../menu/Menu";
const link = "https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg?semt=ais_hybrid&w=740&q=80"

type CourseType = {
  id: number;
  title: string;
  description: string;
  instructor_id: number;
}
type MenuItem = {
  name: string;
  action: () => void;
};
type CourseProps = {
  course: CourseType;
  menuItems: MenuItem[];
}



const Course: React.FC<CourseProps> = ({course, menuItems}) => {
    return (
      <div className="col-md-3">
        <Card
          hoverable
          cover={<img alt="course" src={link} />}
          >
          <Card.Meta
              title={course.title}
              description={course.description}
          />
          <Menu menuItems={menuItems} />
        </Card>

      </div>
        
    )
}

export default Course;