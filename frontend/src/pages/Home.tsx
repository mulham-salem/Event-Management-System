import React from "react";
import { Header } from "../components/Header.tsx";
import { Hero } from "../components/home/Hero";
import { WhyListEMO } from "../components/home/WhyListEMO";
import { CoreFeatures } from "../components/home/CoreFeatures";
import { ForWho } from "../components/home/ForWho";
import { CallToAction } from "../components/home/CallToAction";
import { Footer } from "../components/Footer.tsx";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export const Home: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <SimpleBar
                style={{ maxHeight: "100vh" }}
                className="custom-scrollbar"
            >
                <main className="flex-1">
                    <Hero />
                    <WhyListEMO />
                    <CoreFeatures />
                    <ForWho />
                    <CallToAction />
                </main>
                <Footer />
            </SimpleBar>
        </div>
    );
};