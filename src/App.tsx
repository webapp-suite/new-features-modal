import React, { useState } from "react";
import { adapt } from "webcomponents-in-react";
import "@tradeshift/elements.root";
import "@tradeshift/elements.button";
import "@tradeshift/elements/src/fonts.css";
import "@tradeshift/elements/src/vars.css";
import "./App.css";

import NewFeaturesModal from "./NewFeaturesModal";

import data from "./data.json";
import { KEY_PREFIX } from "./constant";

const Button = adapt("ts-button");

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "ts-root": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
            "ts-modal": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
            "ts-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
            "ts-aside": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
        }
    }
}

const App: React.FC = (props) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(localStorage.getItem(`${KEY_PREFIX}/show`) !== "false");
    // @ts-ignore
    const { features } = data;
    return (
        <div className="App">
            <div className="leftNavMock"></div>
            <div className="rightContent">
                <ts-root>
                    <Button onClick={() => localStorage.clear()}>Clear localStorage</Button>
                    <NewFeaturesModal
                        features={features}
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                    />
                </ts-root>
            </div>
        </div>
    );
};

export default App;
