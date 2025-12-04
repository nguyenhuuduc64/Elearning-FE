
"use client"
import { Card } from "antd";
import { formatDayTime } from "@/src/utils";
import styles from "./testCard.module.scss"
import classNames from "classnames/bind";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTestStore } from "@/src/store/testStore";
const cx = classNames.bind(styles);

type ITest = {
    id: number,
    title: string,
    create_at: string,
    course_id: number
}

type TestCardProps = {
    test: ITest
}

const TestCard: React.FC<TestCardProps> = ({test})=> {
    const pathName = usePathname();
    const router = useRouter();
    const {selectedTest, setSelectedTest} = useTestStore();


    const handleClick = () => {
        console.log(test)
        setSelectedTest(test)
        router.push(`${pathName}/${test.id}`)
    }

    return <div className={cx("col-md-3")} onClick={handleClick}>
        <Card>
            <Card.Meta
                title={test.title}
                description={formatDayTime(test.create_at)}
            />
        </Card>
    </div>
}

export default TestCard;