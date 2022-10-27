import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import styles from "./ComingSoon.module.scss";

const ComingSoon = ({className, ...rest}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
    <div className={cn(styles.content, className)} {...rest} />
)

export default ComingSoon;