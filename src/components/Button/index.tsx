//
import { FC, ReactNode } from "react";

//
import styles from "./Button.module.scss";

type propTypes = {
    children: ReactNode;
    onClick: () => void;
};

const Button: FC<propTypes> = (props) => {
    const { children } = props;

    return (
        <div {...props} className={styles["button-container"]}>
            {children as ReactNode}
        </div>
    );
};

export default Button;
