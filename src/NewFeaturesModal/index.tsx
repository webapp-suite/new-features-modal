import React, { useState } from "react";
import { adapt } from "webcomponents-in-react";
import "@tradeshift/elements.root";
import "@tradeshift/elements.button";
import "@tradeshift/elements.modal";
import { KEY_PREFIX } from "../constant";

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
    deprecated: boolean;
    releaseDate: string;
}

interface NewFeaturesModalProps {
    visible: boolean;
    features: Feature[];
    title?: string;
    onClose?: () => void;
}

const NewFeaturesModal: React.FC<NewFeaturesModalProps> = ({
    visible = false,
    title = "New Features",
    features,
    onClose,
}) => {
    const validFeatures = features?.filter(f => !f?.deprecated);
    const [featCurIdx, setFeatCurIdx] = useState(
        localStorage.getItem(`${KEY_PREFIX}/last-seen-step`)
            ? Number(localStorage.getItem(`${KEY_PREFIX}/last-seen-step`))
            : 0
    );
    const featMaxIdx = (validFeatures?.length ?? 0) - 1;

    const onOpen = () => {
        localStorage.setItem(`${KEY_PREFIX}/show`, "true");
        if (!localStorage.getItem(`${KEY_PREFIX}/last-seen-step`)) {
            localStorage.setItem(`${KEY_PREFIX}/last-seen-step`, "0");
        }
    };

    const onModalClose = () => {
        localStorage.setItem(`${KEY_PREFIX}/closed-date`, Date.now().toString());
        if (featCurIdx === featMaxIdx) {
            localStorage.setItem(`${KEY_PREFIX}/show`, "false");
        }
        onClose?.();
    };

    const onClickPrevious = () => {
        localStorage.setItem(`${KEY_PREFIX}/last-seen-step`, (featCurIdx - 1).toString());
        setFeatCurIdx(featCurIdx - 1);
    };

    const onClickNext = () => {
        localStorage.setItem(`${KEY_PREFIX}/last-seen-step`, (featCurIdx + 1).toString());
        setFeatCurIdx(featCurIdx + 1);
    };

    return (
        <Modal
            size="small"
            visible={visible ? true : null}
            title={title}
            onOpen={onOpen}
            onClose={onModalClose}
            noPadding
        >
            <div slot="main">
                <div className="img-container">
                    <img src={validFeatures?.[featCurIdx]?.img} alt={validFeatures?.[featCurIdx]?.title} />
                </div>
                <h1 className="title">{validFeatures?.[featCurIdx]?.title}</h1>
                <div className="description">{validFeatures?.[featCurIdx]?.description}</div>
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
