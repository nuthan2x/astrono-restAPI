import Link from "next/link";
import Image from "../Image";
import cn from "classnames";
import styles from "./Logo.module.sass";

type LogoProps = {
    className?: string;
};

const Logo = ({ className }: LogoProps) => (
    <Link href="/">
        <a className={cn(styles.logo, className)}>
            <Image
                src="/images/logo.png"
                width="152"
                height="56"
                alt="Astrono"
            />
        </a>
    </Link>
);

export default Logo;
