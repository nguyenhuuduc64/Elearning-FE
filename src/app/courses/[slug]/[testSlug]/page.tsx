"use client"
import { instance } from "@/src/config/axios";
import { useTestStore } from "@/src/store/testStore"
import { useEffect, useState } from "react";
import { IQuesttion } from "@/src/types";
import TestForm from "@/src/components/forms/testForm/TestForm";
import QuestionProgress from "../../../../components/common/step/Step";
import { Button } from "antd";



type TestPageProps = {
    test: test;
}

type test = {
    id: number,
    title: string,
    create_at: string,
}





const TestPage:React.FC<TestPageProps> = () => {
    const [questions, setQuestions] = useState<IQuesttion[]>([]);
    const [answeredMap, setAnsweredMap] = useState<Record<number, number>>({});
    const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
    const [testFormState, setTestFormState] = useState<boolean>(false) 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const {selectedTest} = useTestStore();
    const getQuestions = async () => {
        const response = await instance.get(`/questions/${selectedTest?.id}`);
        const questions = response.data.data;

        const questionsWithAnswers = await Promise.all(
            questions.map(async (question: IQuesttion) => {
                const resAnswers = await instance.get(`/answers/question/${question.id}`);
                question.answers = resAnswers.data.data;
                return question;
            })
        );

        console.log("Questions with answers:", questionsWithAnswers); // đây mới là dữ liệu thực tế
        setQuestions(questionsWithAnswers);
    }
    

    const handleAnswered = (questionId: number, answerId: number, currentIndex: number) => {
        setAnsweredMap(prev => ({ ...prev, [questionId]: 1 }));
        setUserAnswers(prev => ({ ...prev, [questionId]: answerId }));
        setCurrentQuestionIndex(currentIndex + 1);
    };

    const handleSubmitTest = async (answers: Record<number, number>) => {
        try {
            const response = await instance.post(`/tests/${selectedTest?.id}/submit`, {answers, test_id: selectedTest?.id})
            console.log("sau khi gửi test", response.data)
        } catch (error) {
            console.log("Lỗi khi submit đáp án",error);
        }
    }
    useEffect((): void => {
        (async () => {
            await getQuestions();
    
        })()
    }, [])
    return <div>
        <div className="d-flex justify-content-between align-items-center">
            <h2>{selectedTest?.title}</h2>
        <Button type = "primary" onClick={() => setTestFormState(true)}>Bắt đầu làm bài</Button>
        </div>
        {testFormState && (
            <TestForm 
                questions={questions}
                onSubmit={handleSubmitTest}
                onAnswer={handleAnswered}
            />
        )}
      <QuestionProgress total={questions.length} current={currentQuestionIndex} answered={answeredMap}/>

    </div>
}

export default TestPage;
