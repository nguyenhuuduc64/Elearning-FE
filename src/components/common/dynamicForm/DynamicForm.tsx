"use client";

import { Form, Input, Select, DatePicker, InputNumber, Button, Card } from "antd";
import { useUIStore } from "@/src/store/uiStore";
import styles from "./dynamicForm.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

type InputFieldType = 
  | "text"
  | "number"
  | "password"
  | "email"
  | "date"
  | "checkbox"
  | "radio"
  | "file"
  | "search"
  | "color"
  | "hidden";

interface Option {
  value: string | number;
  label: string; // thường là string
}

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "input" | "password" | "textarea" | "select" | "number" | "date";
  inputType?: InputFieldType;
  placeholder?: string;
  options?: Option[];
  min?: number;
  max?: number;
  rows?: number;
}


interface DynamicFormProps {
  name: string;
  fields: FieldConfig[];
  onFinish: (values: Record<string, unknown>) => void;
  initialValues?: Record<string, unknown>;
  layout?: "vertical" | "horizontal";
}
const DynamicForm = ({
  name = "",
  fields = [],
  onFinish,
  initialValues = {},
  layout = "vertical",
}: DynamicFormProps) => {
    const [form] = Form.useForm();
    const { closeForm } = useUIStore();

    const renderField = (field: FieldConfig) => {
    const commonProps = {
      placeholder: field.placeholder,
      style: { width: "100%" },
    };
    
    switch (field.type) {
      case "text":
      case "input":
        return <Input {...commonProps} />;

      case "password":
        return <Input.Password {...commonProps} />;

      case "textarea":
        return <Input.TextArea {...commonProps} rows={field.rows || 4} />;

      case "select":
        return (
          <Select {...commonProps}>
            {field.options?.map(opt => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );

      case "number":
        return <InputNumber {...commonProps} min={field.min} max={field.max} />;

      case "date":
        return <DatePicker {...commonProps} />;

      default:
        return <Input {...commonProps} />;
      
        
    }
  };


  return (
    <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
        }}
        onClick={() => closeForm()}
        >
        <Card
            title={
            <div style={{ textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>
                {name}
            </div>
            }
            style={{
            width: 400,
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
        >
          <Form
            form={form}
            layout={layout}
            initialValues={initialValues}
            onFinish={onFinish}
            name="dynamicForm"
            className={cx("dynamic-form-wrapper")}
          >

            {fields.map((field: FieldConfig) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
              >
                {renderField(field)}
              </Form.Item>
            ))}

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: "100%", height: "40px" }}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
    </div>
  );
};

export default DynamicForm;
