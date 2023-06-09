import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "semantic-ui-react";

const Layput = (props) => {
    return (
        <div>
            <Container>
                <Head>
                    <link
                        rel="stylesheet"
                        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
                    ></link>
                </Head>
                <Header/>
                {props.children}
                {/* <Footer /> */}
            </Container>
        </div>
    );
};

export default Layput;