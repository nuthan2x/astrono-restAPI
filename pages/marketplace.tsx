import type { NextPage } from "next";
import Layout from "../components/Layout";
import PageMarketplace from "../components/PageMarketplace";
import ComingSoon from "../components/ComingSoon";

const Marketplace: NextPage = () => {
    return (
        <Layout>
            <PageMarketplace />
            {/* <ComingSoon /> */}
        </Layout>
    );
};

export default Marketplace;
