'use client'

import { useCourseStore } from "@/src/store/courseStore";
import { useUIStore } from "@/src/store/uiStore";
import SubHeader from "@/src/components/common/subHeader/SubHeader";
import QuizForm from "@/src/components/forms/quizForm/QuizForm";
import { instance } from "@/src/config/axios";
import { useEffect, useState } from "react";
import TestCard from "@/src/components/common/testCard/TestCard";
import styles from "./page.module.scss"
import classNames from "classnames/bind";
import { Itest } from "@/src/types";

const cx = classNames.bind(styles);

const CourseDetail: React.FC = () => {
    const { selectedCourse } = useCourseStore();
    const { openForm, currentForm, closeForm } = useUIStore();
    const [tests, setTests] = useState<Itest[]>([])

    // Lấy danh sách tests từ server
    const getTests = async () => {
        if (!selectedCourse?.id) return;
        const response = await instance.get(`tests/${selectedCourse.id}`);
        setTests(response.data.data);
    }

    useEffect(() => {
        (async () => {
            await getTests();
        })();
    }, [selectedCourse?.id]);


    // Mở form thêm test
    const handleAddTest = (newTest: Itest) => {
        setTests(prev => [...prev, newTest]); // add test mới trực tiếp
        closeForm();
    }




   

    return (
        <div>
            <SubHeader
                title={selectedCourse?.title}
                buttonName="Thêm bài tập"
                handleButtonClick={() => openForm("addTestForm")}
            />
            <div className={cx("d-flex flex-wrap gap-2")}>
                {tests.map(test => 
                    <TestCard key={test.id} test={test} />
                )}
            </div>

            {currentForm === "addTestForm" && (
                <QuizForm
                    method="post"
                    onSuccess={handleAddTest}
                />
            )}
        </div>
    )
}

export default CourseDetail;
