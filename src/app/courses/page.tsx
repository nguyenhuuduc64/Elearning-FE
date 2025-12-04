"use client";
import { Button } from "antd";
import { Content } from "antd/es/layout/layout";
import DynamicForm from "@/src/components/common/dynamicForm/DynamicForm";
import { FieldConfig } from "@/src/components/common/dynamicForm/DynamicForm";
import styles from "./page.module.scss";
import classNames from "classnames/bind";
import { useUIStore } from "@/src/store/uiStore";
import { instance } from "@/src/config/axios";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/store/authStore";
import Course from "@/src/components/common/course/Course";
const cx = classNames.bind(styles);

type Course = {
  id: number; 
  title: string;
  description: string;
  instructor_id: number;
}

function Courses() {
  const { openForm, closeForm, currentForm, currentData } = useUIStore();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const handleAddCourse = () => {
    openForm("dynamicFormAddCourse");
  }
  const handleSubmitAddCourse = async (values: Record<string, unknown>) => {
    const requestBody = {
      title: values.title,
      description: values.description,
      instructor_id: user?.id
    };
    const response = await instance.post('/courses', requestBody);
    setCourses((prevCourses) => [...prevCourses, response.data.data]);
    closeForm();
  }

  const handleSubmitEditCourse = async (values: Record<string, unknown>) => {
    const state = useUIStore.getState()
    values.id = state.currentData?.id;
    values.instructor_id = state.currentData?.instructor_id;
    const response = await instance.put(`/courses/${state.currentData?.id}`, values);
    const newCourse = response.data.data;
    setCourses((prevCourses) => {
      const updateCourses = prevCourses.filter((course) => course.id !== newCourse.id);
      return [...updateCourses, newCourse]
    });
    closeForm();
  }

  const courseField: FieldConfig[]= [
    {
      name: "title",
      label: "Tên khóa học",
      type: "text",
    },
    {
      name: "description",
      label: "Mô tả",
      type: "textarea",
      rows: 4,
    }
  ]
  
  const getCourses = async () => {
    const response = await instance.get('/courses')
    setCourses(response.data.data)
  }

  useEffect((): void => {

    (async () => {
      await getCourses();
    })();

  }, [])


  return (
    <div>
      <h1>Courses</h1>
      <Button type="primary" onClick={handleAddCourse}>Thêm khóa học</Button>
      {/**Form hien thi khoa hoc */}
        
      <Content style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              borderRadius: "8px",
            }}>
        {currentForm == "dynamicFormAddCourse" && 
          <DynamicForm
            name="Thêm khóa học"
            fields={courseField}
            onFinish={handleSubmitAddCourse}
          />
        }
        {currentForm == "dynamicFormEditCourse" &&
          <DynamicForm
            name="Sửa khóa học"
            initialValues={currentData}
            fields={courseField}
            onFinish={handleSubmitEditCourse}
          />
        }
        <div className={cx("courses-area")}>

        {courses?.map((course) => {
          const menuItems = [
          {
            name: 'Sửa',
            action: () => {
              openForm('dynamicFormEditCourse', course);
            },
          },
          {
            name: 'Xóa',
            action: async () => {
              await instance.delete(`/courses/${course.id}`);
              await getCourses(); 
            },
          },
        ];
        return <Course key={course.id} course={course} menuItems={menuItems}/>
         
        }
        )}
        </div>
      </Content>
      
    </div>
  );
}

export default Courses;
