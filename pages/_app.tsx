import type { AppProps } from "next/app";
import ReactGA from 'react-ga';
ReactGA.initialize('UA-247622932-1');
import "../styles/app.sass";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
        </>
    );

}

export default MyApp;
