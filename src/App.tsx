import React, { useState } from "react";
import logo from "./logo.svg";
import { adapt } from "webcomponents-in-react";
import "@tradeshift/elements.button";
import "@tradeshift/elements.modal";
import "./App.css";
import "@tradeshift/elements/src/vars.css";

const Button = adapt("ts-button");
const Modal = adapt("ts-modal", {
    visible: "data-visible",
    size: "data-size",
});

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "ts-modal": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
            "ts-button": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
            "ts-aside": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; // Normal web component
            // 'xx-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLInputElement>, HTMLInputElement>; // Web component extended from input
        }
    }
}

function App() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Button onClick={() => setIsModalVisible(true)}>open modal</Button>
                {isModalVisible ? (
                    <Modal
                        size="medium"
                        visible=""
                        close={() => {
                            setIsModalVisible(false);
                        }}
                    >
                        Sample Button
                    </Modal>
                ) : (
                    <Modal
                        size="medium"
                        close={() => {
                            setIsModalVisible(false);
                        }}
                    >
                        Sample Button
                    </Modal>
                )}
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
