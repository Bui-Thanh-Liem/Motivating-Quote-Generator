//
import { FC } from "react";
import classNames from "classnames/bind";

//
import styles from "./Tag.module.scss";

//
const cx = classNames.bind(styles);

type propTypes = {
    title: string;
    active: string;
    onClick: (str: string) => void;
};

const Tag: FC<propTypes> = (props) => {
    const { title, onClick , active} = props;
    return (
        <div
            className={cx("tag-container", {
                "active": title === active
            })}
            onClick={() => onClick(title)}
        >
            {title}
        </div>
    );
};

export default Tag;
