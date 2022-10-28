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
            "Astrono is a fun intergalactic NFT Play to earn game with a metaverse that enables multiple forms of player interaction, Competetive Game Modes, and Token Rewards.",
        list: [
            "Players can build and develop a sophisticated and advanced spaceship.",
            "players can protect their base from other players.",
            "Compete in Arena mode or challenge friends to earn crypto rewards for winning matches.\n",
            "Make in-game purchases for NFTs, Trade, or Stake with rewards.",
        ],
    },
    {
        image: {
            src: "/images/content/about-char-2.png",
            height: 50,
            width: 50,
            alt: "",
        },
        title: "",
        content:
            "",
        list: [
            "",
        ],
    },
];

export { about };
