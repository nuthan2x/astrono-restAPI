import type { NextPage } from "next";
import Layout from "../components/Layout";
import PageWishlistDetailed from "../components/PageWishlistDetailed";
import ComingSoon from "../components/ComingSoon";

const WishlistDetailed: NextPage = () => {
    return (
        <Layout>
            <PageWishlistDetailed />
            {/* <ComingSoon /> */}
        </Layout>
    );
};

export default WishlistDetailed;
