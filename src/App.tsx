import '@tradeshift/elements.root';
import '@tradeshift/elements.button';
import '@tradeshift/elements/src/fonts.css';
import '@tradeshift/elements/src/vars.css';
import './App.css';

import React, { useState } from 'react';
import { adapt } from 'webcomponents-in-react';

import features from './data.json';
import NewFeaturesModal from './NewFeatureModal';

const KEY_PREFIX = "new-features-modal";
const localStorageId = 'test'

const Button = adapt("ts-button");

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "ts-root": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            "ts-modal": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            "ts-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
            "ts-aside": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

const App: React.FC = (props) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(localStorage.getItem(`${KEY_PREFIX}/${localStorageId}/show`) !== "false");
    return (
        <div className="App">
            <div className="leftNavMock"></div>
            <div className="rightContent">
                <ts-root>
                    <Button onClick={() => localStorage.clear()}>Clear localStorage</Button>
                    <NewFeaturesModal
                        localStorageId={localStorageId}
                        features={features}
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        preloadImage
                    />
                </ts-root>
            </div>
        </div>
    );
};

export default App;
