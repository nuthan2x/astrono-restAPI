import styles from "./Advantages.module.sass";
import cn from "classnames";
import Image from "../../Image";

type AdvantagesProps = {};

const Advantages = ({}: AdvantagesProps) => (
    <div className={styles.section}>
        <div className={cn("container-md container-window", styles.container)}>
            <div className={styles.wrap}>
                <h2 className={cn("h2", styles.title)}>
                    Astrono Play-to-Earn features & benefits
                </h2>
                <ul className={styles.list}>
                    <li>Create your Characters.</li>
                    <li>Compete in Arena mode or challenge friends to earn crypto rewards for winning matches.
                    </li>
                    <li>Win to Earn ASTRONO Tokens.
                    </li>
                    <li>Make in-game purchases for NFTs, Trade, or Stake with rewards.
                    </li>
                </ul>
            </div>
            <div className={styles.preview}>
                <Image
                    src="/images/content/drone.png"
                    width="675"
                    height="523"
                    alt="Drone"
                />
            </div>
        </div>
    </div>
);

export default Advantages;
