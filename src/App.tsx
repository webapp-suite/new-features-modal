import React, { useState } from "react";
import { adapt } from "webcomponents-in-react";
import "@tradeshift/elements.root";
import "@tradeshift/elements.button";
import "@tradeshift/elements/src/fonts.css";
import "@tradeshift/elements/src/vars.css";
import "./App.css";

import NewFeaturesModal from "./NewFeaturesModal";

import data from "./data.json";

const Button = adapt("ts-button");

const KEY_PREFIX = "new-features-modal";

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
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    // @ts-ignore
    const { title, features } = data;
    const shouldShowModal = localStorage.getItem(`${KEY_PREFIX}/show`) === 'true';
    return (
        <div className="App">
            <div className="leftNavMock"></div>
            <div className="rightContent">
                <ts-root>
                    <Button onClick={() => setIsModalVisible(true)}>open modal</Button>
                    {shouldShowModal && (
                        <NewFeaturesModal
                            title={title}
                            features={features}
                            visible={isModalVisible}
                            onClose={() => setIsModalVisible(false)}
                        />
                    )}
                </ts-root>
            </div>
        </div>
    );
};

export default App;
