import { ImageType } from "../types";

type AboutType = {
    image: ImageType;
    title: string;
    content: string;
    list: string[];
};

const about: AboutType[] = [
    {
        image: {
            src: "/images/content/about-char-1.png",
            height: 633,
            width: 633,
            alt: "Astronaut",
        },
        title: "About us",
        content:
            "Astrono is a fun intergalactic NFT Play to earn game with a metaverse that enables multiple forms of player interaction, Competetive Game Modes, and Token Rewards. The game has several modes, including adventure,",
        list: [
            "arena battle, and building, to keep players engaged.",
            ,
        ],
    },

];

export { about };
