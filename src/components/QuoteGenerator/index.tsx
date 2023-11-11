//
import { FC, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faGithub,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import {animateFill} from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/animations/scale.css";
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';

//
import styles from "./QuoteGenerator.module.scss";
import Button from "../Button";
import Tag from "../Tag";
import { fetchApi } from "../../services/fetchApi";
import {categogys} from "../../sideData/dataCategory";

const QuoteGenerator: FC = () => {

    //
    const [category, setCategory] = useState<string>("age");
    const [text, setText] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [randomText, setRandomText] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(true);

    //
    useEffect(() => {
        type dataType = {
            author: string;
            category: string;
            quote: string;
        };
        
        type resType = {
            data: dataType[];
        };

        const fetch = async (category: string) => {
            try {
                const res = (await fetchApi(category)) as resType;
                const data: dataType = res?.data[0];
                setText(data.quote);
                setAuthor(data.author);
                setIsloading(false);
            } catch (error) {
                setIsloading(false);
            }
        };
        setIsloading(true);
        fetch(category);
    }, [category, randomText]);

    return (
        <div className={styles["quote-container"]}>
            <div className={styles.top}></div>

            <Container className={styles.center}>
                <Row className={styles["center-row"]}>
                    <Col className={styles["center-col"]}>
                        <div className={styles.categogy}>
                            {categogys.map((item, index) => (
                                <Tag
                                    active={category}
                                    key={index}
                                    title={item}
                                    onClick={(val) => setCategory(val)}
                                />
                            ))}
                        </div>

                        <div className={styles.content}>
                            <FontAwesomeIcon
                                className={styles["icon-quote"]}
                                icon={faQuoteRight}
                            />
                            {isLoading ? (
                                <p style={{ textAlign: "center" }}>
                                    Loading...
                                </p>
                            ) : (
                                <>
                                    <p className={styles["text"]}>{text}</p>
                                    <p className={styles["author"]}>{author}</p>
                                </>
                            )}
                        </div>

                        <Container className={styles.actions}>
                            <Row className={styles["action-row"]}>
                                <Col className={styles.containerBtn}>
                                    <Button
                                        onClick={() =>
                                            setRandomText(!randomText)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            className={styles.icon}
                                            icon={faChevronLeft}
                                        />
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            setRandomText(!randomText)
                                        }
                                    >
                                        <FontAwesomeIcon
                                            className={styles.icon}
                                            icon={faChevronRight}
                                        />
                                    </Button>
                                </Col>
                                
                                <Col className={styles["container-social"]}>
                                    <Tippy
                                        content="My Github"
                                        animation="scale"
                                    >
                                        <a
                                            target="_blank"
                                            href="https://github.com/Bui-Thanh-Liem"
                                        >
                                            <FontAwesomeIcon
                                                className={
                                                    styles["icon-gitHub"]
                                                }
                                                icon={faGithub}
                                            />
                                        </a>
                                    </Tippy>
                                    <Tippy 
                                        content="My Facebook" 
                                        animateFill={true}
                                        plugins={[animateFill]}
                                    >
                                        <a
                                            className={styles["icon-facebook"]}
                                            target="_blank"
                                            href="https://www.facebook.com/profile.php?id=100010395697006"
                                        >
                                            <FontAwesomeIcon
                                                icon={faFacebook}
                                            />
                                        </a>
                                    </Tippy>
                                    <Tippy content="My Instagram">
                                        <a
                                            className={styles["icon-instagram"]}
                                            target="_blank"
                                            href="https://www.instagram.com/bui_thanh_liem8120/"
                                        >
                                            <FontAwesomeIcon
                                                className={styles["icon"]}
                                                icon={faInstagram}
                                            />
                                        </a>
                                    </Tippy>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <div className={styles.bottom}></div>
        </div>
    );
};

export default QuoteGenerator;
