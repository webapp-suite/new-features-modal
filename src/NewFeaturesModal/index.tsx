import React, { useState } from "react";
import { adapt } from "webcomponents-in-react";
import "@tradeshift/elements.root";
import "@tradeshift/elements.button";
import "@tradeshift/elements.modal";

const KEY_PREFIX = "new-features-modal";

const Button = adapt("ts-button");
const Modal = adapt("ts-modal", {
    visible: "data-visible",
    title: "data-title",
    size: "data-size",
    onClose: "close",
    onOpen: "open",
    noPadding: "no-padding",
});

interface Feature {
    title: string;
    description: string;
    img: string;
}

interface NewFeaturesModalProps {
    visible: boolean;
    title: string;
    features: Feature[];
    onClose?: () => void;
}

const NewFeaturesModal: React.FC<NewFeaturesModalProps> = ({
    visible = false,
    title = "New Features",
    features,
    onClose,
}) => {
    const [featCurIdx, setFeatCurIdx] = useState(0);
    const featMaxIdx = (features?.length ?? 0) - 1;

    const onOpen = () => {
        localStorage.setItem(`${KEY_PREFIX}/show`, "true");
        if (!localStorage.getItem(`${KEY_PREFIX}/last-seen-step`)) {
            localStorage.setItem(`${KEY_PREFIX}/last-seen-step`, "0");
        }
        console.log("yes");
    };

    const onModalClose = () => {
        localStorage.setItem(`${KEY_PREFIX}/closed-date`, Date.now().toString());
        if (featCurIdx === featMaxIdx) {
            localStorage.setItem(`${KEY_PREFIX}/show`, "false");
        }
        onClose?.();
    }

    const onClickPrevious = () => {
        localStorage.setItem(`${KEY_PREFIX}/last-seen-step`, (featCurIdx - 1).toString());
        setFeatCurIdx(featCurIdx - 1);
    };

    const onClickNext = () => {
        localStorage.setItem(`${KEY_PREFIX}/last-seen-step`, (featCurIdx + 1).toString());
        setFeatCurIdx(featCurIdx + 1);
    };

    return (
        <Modal size="small" visible={visible ? true : null} title={title} onOpen={onOpen} onClose={onModalClose} noPadding>
            <div slot="main">
                <div className="img-container">
                    <img src={features?.[featCurIdx]?.img} alt={features?.[featCurIdx]?.title} />
                </div>
                <h1 className="title">{features?.[featCurIdx]?.title}</h1>
                <div className="description">{features?.[featCurIdx]?.description}</div>
                <div className="button-container">
                    {featCurIdx !== 0 && (
                        <Button type="secondary" onClick={onClickPrevious}>
                            Previous
                        </Button>
                    )}
                    {featCurIdx < featMaxIdx ? (
                        <Button type="primary" onClick={onClickNext}>
                            Next
                        </Button>
                    ) : (
                        <Button type="primary" onClick={onClose}>
                            Close
                        </Button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default NewFeaturesModal;
