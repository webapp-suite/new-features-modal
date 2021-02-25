import "@webapp-suite/elements-react/src/fonts.css";
import "@webapp-suite/elements-react/src/vars.css";
import "./App.css";

import React, { useEffect, useState } from "react";

import features from "./data.json";
import NewFeaturesModal from "./components/NewFeaturesModal";
import AppDock from "./components/AppDock";
import { Button, Header, Root } from "@webapp-suite/elements-react";

const KEY_PREFIX = "new-features-modal";
const localStorageId = "test";

interface AppProps {
    // loading: boolean;
}

const App: React.FC<AppProps> = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(
        localStorage.getItem(`${KEY_PREFIX}/${localStorageId}/show`) !== "false"
    );
    const [curAppName, setCurAppName] = useState("Dashboard");

    const onHashChange = () => {
        setCurAppName(window.location.hash?.split(".")?.[1]);
    };

    useEffect(() => {
        window.addEventListener("hashchange", onHashChange);
        return () => {
            window.removeEventListener("hashchange", onHashChange);
        };
    }, []);

    return (
        <div className="App">
            <AppDock logo="" />
            <div className="rightContent">
                <Root>
                    <Header
                        icon={`/${curAppName.toLowerCase()}.svg`}
                        title={curAppName}
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
