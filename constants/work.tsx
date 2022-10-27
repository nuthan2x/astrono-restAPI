import { ImageType } from "../types";

type ItemsType = {
    title: string;
    color: string;
    image: any;
    content: any;
};

const items: ItemsType[] = [
    {
        title: "Build your character",
        color: "#1F3D8B",
        image: {
            src: "/images/content/build-your-colony.png",
            width: 450,
            height: 450,
            alt: "Build your character",
        },
        content: (
            <>
                <p>
                    Players may create a character, embark on adventures, engage in combat, and rank up via competitive game modes in this play-to-earn game:
                </p>

            </>
        ),
    },


    {
        title: "Rank up!",
        color: "#1F3D8B",
        image: {
            src: "/images/content/characters/image-8.png",
            width: 450,
            height: 450,
            alt: "Rank up!",
        },
        content: (
            <>
                <p>
                    Players may create a character, embark on adventures, engage in combat, and rank up via competitive game modes in this play-to-earn game.

                </p>

            </>
        ),
    },
    {
        title: "Defend your base",
        color: "#1F3D8B",
        image: {
            src: "/images/content/build-your-colony.png",
            width: 450,
            height: 450,
            alt: "Defend your base",
        },
        content: (
            <>
                <p>
                    In the strategy game Astrono, players can purchase land, build bases, and engage in combat with other players for the game's token. Walls, turrets, and other defensive structures like these must be properly placed on the player's base to ward off aliens and opportunistic attackers who want to take their resources.

                </p>

            </>
        ),
    },
    {
        title: "Trade items",
        color: "#1F3D8B",
        image: {
            src: "/images/content/details-pic-2.png",
            width: 450,
            height: 450,
            alt: "Trade items",
        },
        content: (
            <>
                <p>
                    Users that have access to Defi ecosystems with their native digital assets can trade, lend, borrow, stack, or swap these tokens and NFTs into fiat currency on well-known exchanges or third-party marketplaces.
                </p>

            </>
        ),
    },
    {
        title: "Earn & Stake",
        color: "#1F3D8B",
        image: {
            src: "/images/content/details-pic-3.png",
            width: 450,
            height: 450,
            alt: "Earn & Stake",
        },
        content: (
            <>
                <p>
                    Users battle against one another or challenge friends to win native tokens (ASTRONO). You may also trade this governance token for actual money. Additionally, they may be staked to gain cryptocurrency staking rewards.

                </p>

            </>
        ),
    },

    {
        title: "Create clans",
        color: "#1F3D8B",
        image: {
            src: "/images/content/build-your-colony.png",
            width: 450,
            height: 450,
            alt: "Create clans",
        },
        content: (
            <>
                <p>
                    To earn ASTRONO Tokens, create clans and engage in an epic battle with other players. Participate in regular competitions, gain prizes, and sell them to the marketplace or use your tokens to defend your colony
                </p>

            </>
        ),
    },
];

export { items };
