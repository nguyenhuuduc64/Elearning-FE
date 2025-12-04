'use client'
import { Card } from "antd";
import Menu from "../menu/Menu";
import { useRouter } from 'next/navigation';
import { createSlug } from "@/src/utils";
import { useCourseStore } from "@/src/store/courseStore";
import { useAuthStore } from "@/src/store/authStore";

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
  const router = useRouter();
  const { setSelectedCourse } = useCourseStore();
  const {user} = useAuthStore()
  const handleClick = () => {
    const slug = createSlug(course.description);
    setSelectedCourse(course);
    router.push(`/courses/${slug}`);
  }
  return (
    <div className="col-md-3" onClick = {handleClick}>
      <Card
        hoverable
        cover={<img alt="course" src={link} />}
        >
        <Card.Meta
            title={course.title}
            description={course.description}
        />
        {user?.role == 'teacher' && <Menu menuItems={menuItems} />}
      </Card>

    </div>
      
  )
}

export default Course;