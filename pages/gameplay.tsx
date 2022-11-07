import type { NextPage } from "next";
import Layout from "../components/Layout";
import PageGameplay from "../components/PageGameplay";
import ComingSoon from "../components/ComingSoon";

const Apps: NextPage = () => {
    return (
        <Layout>
            <PageGameplay />
            <ComingSoon />
        </Layout>
    );
};

export default Apps;
