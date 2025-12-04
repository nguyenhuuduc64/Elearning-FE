import styles from "./step.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles);


type Props = {
  total: number;
  current: number;
  answered: Record<number, number>;
};

export default function QuestionProgress({ total, current, answered }: Props) {
  const items = Array.from({ length: total }, (unknow, idx) => {
    const status: "process" | "finish" | "wait" =
      current === idx
        ? "process"
        : answered[idx + 1]
        ? "finish"
        : "wait";

    return {
      title: `Câu ${idx + 1}`,
      status,
    };
  });

  return <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
    gap: "8px",
    marginTop: "16px"
  }}>
    {items.map((item, index) => {
      const isCurrent = index === current;
      const isDone = item.status === "finish";

      return (
        <div
          key={index}
          className={cx("step-wrapper p-1 rounded text-center")}
          style={{
            backgroundColor: isCurrent
              ? "#1677ff"
              : isDone
              ? "#52c41a"
              : "#e0e0e0",
            color: isCurrent || isDone ? "#fff" : "#000"
          }}
        >
          {index + 1}
        </div>
      );
    })}
  </div>
}
