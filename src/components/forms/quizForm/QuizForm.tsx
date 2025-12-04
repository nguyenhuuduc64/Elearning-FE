"use client";

import { Form, Input, Button, Card, Radio } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUIStore } from "@/src/store/uiStore";
import styles from "./quizform.module.scss"
import classNames from "classnames/bind";
import { instance } from "@/src/config/axios";
import { useRef } from "react";
import { InputRef } from "antd";
import { useCourseStore } from "@/src/store/courseStore";
import { Itest } from "@/src/types";
import { useTestStore } from '../../../store/testStore';
const cx = classNames.bind(styles);

type QuizFormProps = {
  method: string;
  onSuccess?: (newTest: Itest) => void; // nhận newTest
}

const QuizForm: React.FC <QuizFormProps> = ( {method, onSuccess} ) => {
  const [form] = Form.useForm();
  const selectedCourse = useCourseStore((state) => state.selectedCourse);
  const { closeForm } = useUIStore();
  const {setSelectedTest} = useTestStore();
  const testName = useRef<InputRef>(null)
  const onFinish = async (values: Record<string, unknown>) => {
    if (method === 'post') {
      const response = await instance.post('/tests', {
      title: testName.current?.input?.value,
      ...values,
      course_id: selectedCourse?.id
    });

    const newTest: Itest = response.data.data;

    setSelectedTest(newTest); // cập nhật store nếu cần
    if (onSuccess) onSuccess(newTest);

    // reset input
    testName.current!.input!.value = '';
    form.resetFields();
  }
}


  return (
    <div
      
      onClick={() => {
        closeForm();
      }}
      className={cx("modal-overlay")}
    >


      <Card title="Tạo bài trắc nghiệm" className={cx("p-3 col-md-5 col-lg-4")} onClick={e => e.stopPropagation()} style={{maxHeight: '50vh', overflowY: 'auto'}}>
        <Input placeholder="Nhập tên bài trắc nghiệm" type="text" name = "name" className="mb-3" ref={testName}/>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    className="mb-3"
                    title={`Câu hỏi ${name + 1}`}
                    extra={
                      <Button danger onClick={() => remove(name)} icon={<DeleteOutlined />}>
                        Xóa
                      </Button>
                    }
                  >
                    {/* Nội dung câu hỏi */}
                    <Form.Item
                      {...restField}
                      name={[name, "question"]}
                      label="Nội dung câu hỏi"
                      rules={[{ required: true, message: "Nhập nội dung câu hỏi" }]}
                    >
                      <Input placeholder="VD: Thủ đô của Việt Nam là?" />
                    </Form.Item>

                    {/* 4 đáp án */}
                    <Form.Item label="Đáp án">
                      <Form.List name={[name, "answers"]}>
                        {(answerFields) => (
                          <>
                            {["A", "B", "C", "D"].map((label, index) => (
                              <Form.Item
                                key={index}
                                name={[index]}
                                rules={[{ required: true, message: "Nhập đáp án" }]}
                              >
                                <Input placeholder={`Đáp án ${label}`} />
                              </Form.Item>
                            ))}
                          </>
                        )}
                      </Form.List>
                    </Form.Item>

                    {/* Chọn đáp án đúng */}
                    <Form.Item
                      name={[name, "correct"]}
                      label="Đáp án đúng"
                      rules={[{ required: true, message: "Chọn đáp án đúng" }]}
                    >
                      <Radio.Group>
                        <Radio value={0}>A</Radio>
                        <Radio value={1}>B</Radio>
                        <Radio value={2}>C</Radio>
                        <Radio value={3}>D</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Card>
                ))}

                <Button
                  type="dashed"
                  onClick={() => add({ answers: ["", "", "", ""], correct: null })}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm câu hỏi
                </Button>
              </>
            )}
          </Form.List>

          <Button type="primary" htmlType="submit" className="mt-4" >
            Lưu bài trắc nghiệm
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default QuizForm;

//