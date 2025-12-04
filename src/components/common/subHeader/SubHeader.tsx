import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./subHeader.module.scss"
import classNames from "classnames/bind";
import { Button } from "antd";
import { useAuthStore } from "@/src/store/authStore";
const cx = classNames.bind(styles);

type SubHeaderProps = {
    title: string | undefined;
    buttonName?: string;
    handleButtonClick?: () => void;
}

const SubHeader: React.FC<SubHeaderProps>= ({title, buttonName, handleButtonClick}) => {
    const {user} = useAuthStore();
    const handleBack = () => {
        window.history.back();
    }

    return <div className={cx("d-flex justify-content-between")}>
        <div className="d-flex align-items-center gap-3 border-bottom pb-2">
            <FontAwesomeIcon icon={faAngleLeft}  className={cx("icon-left fs-3")} onClick={handleBack}/>
            <h3 className="m-0">{title}</h3>
        </div>
        {buttonName&& user?.role == 'teacher'&& <Button type="primary"onClick={handleButtonClick} >{buttonName}</Button>}
    </div>
}

export default SubHeader;