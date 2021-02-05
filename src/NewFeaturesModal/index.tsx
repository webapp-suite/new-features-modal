import React, { useState } from "react";
import { adapt } from "webcomponents-in-react";
import "@tradeshift/elements.root";
import "@tradeshift/elements.button";
import "@tradeshift/elements.modal";

const Button = adapt("ts-button");
const Modal = adapt("ts-modal", {
    visible: "data-visible",
    size: "data-size",
    onClose: "close",
    title: "data-title",
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
    return (
        <Modal size="small" visible={visible ? true : null} title={title} onClose={onClose} noPadding>
            <div slot="main">
                <div className="img-container">
                    <img src={features?.[featCurIdx]?.img} alt={features?.[featCurIdx]?.title} />
                </div>
                <h1 className="title">{features?.[featCurIdx]?.title}</h1>
                <div className="description">{features?.[featCurIdx]?.description}</div>
                <div className="button-container">
                    {featCurIdx !== 0 && (
                        <Button type="secondary" onClick={() => setFeatCurIdx(featCurIdx - 1)}>
                            Previous
                        </Button>
                    )}
                    {featCurIdx < featMaxIdx ? (
                        <Button type="primary" onClick={() => setFeatCurIdx(featCurIdx + 1)}>
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
