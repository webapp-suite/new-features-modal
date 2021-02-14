import "@tradeshift/elements/src/fonts.css";
import "@tradeshift/elements/src/vars.css";
import "./App.css";

import React, { useState } from "react";

import features from "./data.json";
import NewFeaturesModal from "./NewFeatureModal";
import AppDock from "./AppDock";
import { Button, Header, Root } from "./elements-react";

const KEY_PREFIX = "new-features-modal";
const localStorageId = "test";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "ts-root": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            "ts-modal": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            "ts-button": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
            "ts-aside": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

const App: React.FC = (props) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(
        localStorage.getItem(`${KEY_PREFIX}/${localStorageId}/show`) !== "false"
    );
    return (
        <div className="App">
            <AppDock logo="" />
            <div className="rightContent">
                <Root>
                    <Header
                        icon="/dashboard.svg"
                        title="Dashboard"
                    >
                        <Button onClick={() => localStorage.clear()}>
                            Clear localStorage
                        </Button>
                    </Header>
                    <NewFeaturesModal
                        localStorageId={localStorageId}
                        features={features}
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                    />
                </Root>
            </div>
        </div>
    );
};

export default App;
