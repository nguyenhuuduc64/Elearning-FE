"use client";
import { Button, Card, Form, Radio, Typography } from "antd";
import { IQuesttion } from "@/src/types";

const { Title } = Typography;

type TestFormProps = {
    questions: IQuesttion[];
    onSubmit: (answers: Record<number, number>) => void; 
    onAnswer: (questionId: number, answerId: number, currentIndex: number) => void;
    
    // key = questionId, value = answerId
};

const TestForm: React.FC<TestFormProps> = ({ questions, onSubmit, onAnswer }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: Record<string, number>) => {
        const formatted: Record<number, number> = {};

        Object.keys(values).forEach((key) => {
            const questionId = Number(key.replace("q", ""));
            formatted[questionId] = values[key];
        });

        onSubmit(formatted);
    };

    return (
        <Card style={{ width: "100%", padding: 20 }}>
            <Title level={3}>Làm bài trắc nghiệm</Title>

            <Form form={form} onFinish={handleFinish} layout="vertical">
                {questions.map((question, index) => (
                    <Card key={question.id} style={{ marginBottom: 16 }}>
                        <Title level={5}>
                            {question.content}
                        </Title>

                        <Form.Item
                            name={`q${question.id}`}
                            rules={[{ required: true, message: "Vui lòng chọn đáp án!" }]}
                        >
                            <Radio.Group
                                style={{ display: "flex", flexDirection: "column", gap: 6 }}
                                onChange={(e) => onAnswer(Number(question.id), Number(e.target.value), index )}

                            >
                                {question.answers?.map((ans) => (
                                    <Radio key={ans.id} value={ans.id}>
                                        {ans.content}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>
                    </Card>
                ))}

                <Button type="primary" htmlType="submit">Nộp bài</Button>
            </Form>
        </Card>
    );
};

export default TestForm;
