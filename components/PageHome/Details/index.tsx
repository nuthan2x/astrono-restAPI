import cn from "classnames";
import styles from "./Details.module.sass";
import Slider from "react-slick";
import Slide from "./Slide";
import Icon from "../../Icon";
import Image from "../../Image";

type PlacesType = {
    location: string;
    planet: string;
    content: string;
};

const places: PlacesType[] = [
    {
        location: "Astrono",
        planet: "Earth",
        content:
            "Astrono is a fun intergalactic NFT Play to earn game with a metaverse that enables multiple forms of player interaction, Competetive Game Modes, and Token Rewards. The game has several modes, including adventure, arena battle, and building, to keep players engaged\n.",
    },
    {
        location: "Lizandro",
        planet: "Mars",
        content: "It is the year 2082. After centuries of unregulated population increase and environmental degradation, the planet can no longer support human life.",
    },
];

const avatars: Array<string> = [
    "/images/content/avatars/avatar-1.jpg",
    "/images/content/avatars/avatar-2.jpg",
    "/images/content/avatars/avatar-3.jpg",
    "/images/content/avatars/avatar-4.jpg",
];

type DetailsProps = {};

const Details = ({}: DetailsProps) => {
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
    };

    return (
        <div className={styles.section}>
            <Slider className="details-slider" {...settings}>
                <Slide
                    className={styles.slide}
                    titles={[
                        "Earn together",
                        "Protect your planet",
                        "Join the battle.",
                    ]}
                    index="1"
                    subtitle="When the war begins"
                    content=""
                    imageClassName={styles.circles}
                    imageSrc="/images/content/details-pic-1.png"
                    imageWidth="582"
                    imageHeight="656"
                >
                    <div className={styles.places}>
                        {places.map((place, index) => (
                            <div className={styles.place} key={index}>
                                <div className={cn("h6", styles.location)}>
                                    {place.location}
                                </div>
                                <div className={styles.planet}>
                                    <Icon name="location" />
                                    {place.planet}
                                </div>
                                <div className={styles.content}>
                                    {place.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </Slide>
                <Slide
                    className={styles.slide}
                    titles={[
                        "Protect your planet",
                        "Join the battle.",
                        "Earn together",
                    ]}
                    index="2"
                    subtitle="Join the intergalactic battle."
                    content=""
                    imageSrc="/images/content/details-pic-2.png"
                    imageWidth="576"
                    imageHeight="570"
                >
                    <div className={cn("h6", styles.subtitle)}>Earn reward</div>
                    <div className={styles.content}>
                        By engaging in player-versus-player battles, gamers may earn in-game prizes. Playing the game will give you astrono tokens.

                    </div>
                    <div className={cn("hero", styles.counter)}>
                        10<span>x</span>
                    </div>
                </Slide>
                <Slide
                    className={styles.slide}
                    titles={[
                        "Join the battle.",
                        "Earn together",
                        "Protect your planet",
                    ]}
                    index="3"
                    subtitle="Playing real-time."
                    content="Users will be able to participate in and compete in a wide range of community-wide activities, such as quests."
                    imageSrc="/images/content/details-pic-3.png"
                    imageWidth="576"
                    imageHeight="600"
                >
                    <div className={cn("h6", styles.subtitle)}>
                        You can challenge your friends and other gamers as you create your characters.

                    </div>
                    <div className={styles.content}>
                    </div>
                    <div className={styles.avatars}>
                        {avatars.map((avatar, index) => (
                            <div className={styles.avatar} key={index}>
                                <Image
                                    src={avatar}
                                    width={48}
                                    height={48}
                                    alt="Avatar"
                                />
                            </div>
                        ))}
                    </div>
                </Slide>
            </Slider>
        </div>
    );
};

export default Details;
