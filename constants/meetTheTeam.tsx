import { ImageType } from "../types";

type MeetType = {
    image: ImageType;
    name: string;
    info: string;
    content: string;
    twitter: string;
    instagram: string;
};

const meet: MeetType[] = [
    {
        image: {
            src: "/images/content/avatars/large/avatar-1.jpg",
            height: 128,
            width: 128,
            alt: "Joshua Young",
        },
        name: "Joshua Young",
        info: "Founder & CEO",
        content:
            "Over 10 years in Game Development Experience.",
        twitter: "https://twitter.com/Josh_Astrono",
        Linkeldin: "https://www.linkedin.com/in/joshua-young-6b8148251/",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-2.jpg",
            height: 128,
            width: 128,
            alt: "Ida Turner",
        },
        name: "Ida Turner",
        info: "Product Specialist",
        content:
            ". ",
        twitter: "https://twitter.com/astrono_io",
        instagram: "https://twitter.com/astrono_io",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-3.jpg",
            height: 128,
            width: 128,
            alt: "Gus Haag",
        },
        name: "Gus Haag",
        info: "Infrastructure Producer",
        content:
            " ",
        twitter: "https://twitter.com/astrono_io",
        instagram: "https://twitter.com/astrono_io",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-4.jpg",
            height: 128,
            width: 128,
            alt: "Hassan Barton",
        },
        name: "Hassan Barton",
        info: "Accounts Supervisor",
        content:
            "",
        twitter: "https://twitter.com/astrono_io",
        instagram: "https://twitter.com/astrono_io",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-5.jpg",
            height: 128,
            width: 128,
            alt: "Angela Lemke",
        },
        name: "Angela Lemke",
        info: "Product Designer",
        content:
            "",
        twitter: "https://twitter.com/astrono_io",
        instagram: "https://twitter.com/astrono_io",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-6.jpg",
            height: 128,
            width: 128,
            alt: "Ewald Mann",
        },
        name: "Ewald Mann",
        info: "Brand Orchestrator",
        content:
            "",
        twitter: "https://twitter.com/astrono_io",
        instagram: "https://twitter.com/astrono_io",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-7.jpg",
            height: 128,
            width: 128,
            alt: "Marlin Considine",
        },
        name: "Marlin Considine",
        info: "Dynamic Security Supervisor",
        content:
            "",
        twitter: "https://twitter.com/astrono_io",
        instagram: "https://twitter.com/astrono_io",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-8.jpg",
            height: 128,
            width: 128,
            alt: "Nicholas Mills",
        },
        name: "Nicholas Mills",
        info: "Product Branding Representative",
        content:
            "https://twitter.com/astrono_io",
        twitter: "",
        instagram: "https://twitter.com/astrono_io/",
    },
    {
        image: {
            src: "/images/content/avatars/large/avatar-9.jpg",
            height: 128,
            width: 128,
            alt: "Joel Harvey",
        },
        name: "Joel Harvey",
        info: "Future Data Engineer",
        content:
            "",
        twitter: "https://twitter.com/astrono_io",
        instagram: "https://twitter.com/astrono_io/",
    },
];

export { meet };
