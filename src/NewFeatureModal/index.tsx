import '@tradeshift/elements.root';
import '@tradeshift/elements.button';
import '@tradeshift/elements.modal';
import './index.css';

import React, { Suspense, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useImage } from 'react-image';
import { adapt } from 'webcomponents-in-react';

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

interface ImageProps {
    src: string;
    alt: string;
}

const Image = (props: ImageProps) => {
    const { src } = useImage({
        srcList: props.src,
    });

    return <img src={src} alt={props.alt} />;
};

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
    localStorageId?: string;
    onClose?: () => void;
}

const NewFeaturesModal: React.FC<NewFeaturesModalProps> = ({
    visible = false,
    title = "New Features",
    features,
    localStorageId,
    onClose,
}) => {
    const LOCAL_STORAGE_PREFIX = localStorageId
        ? `${KEY_PREFIX}/${localStorageId}`
        : KEY_PREFIX;
    const validFeatures = features?.filter((f) => !f?.deprecated);
    const [featCurIdx, setFeatCurIdx] = useState(
        localStorage.getItem(`${LOCAL_STORAGE_PREFIX}/last-seen-step`)
            ? Number(
                  localStorage.getItem(`${LOCAL_STORAGE_PREFIX}/last-seen-step`)
              )
            : 0
    );
    const featMaxIdx = (validFeatures?.length ?? 0) - 1;

    const onOpen = () => {
        localStorage.setItem(`${LOCAL_STORAGE_PREFIX}/show`, "true");
        if (!localStorage.getItem(`${LOCAL_STORAGE_PREFIX}/last-seen-step`)) {
            localStorage.setItem(`${LOCAL_STORAGE_PREFIX}/last-seen-step`, "0");
        }
    };

    const onModalClose = () => {
        localStorage.setItem(
            `${LOCAL_STORAGE_PREFIX}/closed-date`,
            Date.now().toString()
        );
        if (featCurIdx === featMaxIdx) {
            localStorage.setItem(`${LOCAL_STORAGE_PREFIX}/show`, "false");
        }
        onClose?.();
    };

    const onClickPrevious = () => {
        localStorage.setItem(
            `${LOCAL_STORAGE_PREFIX}/last-seen-step`,
            (featCurIdx - 1).toString()
        );
        setFeatCurIdx(featCurIdx - 1);
    };

    const onClickNext = () => {
        localStorage.setItem(
            `${LOCAL_STORAGE_PREFIX}/last-seen-step`,
            (featCurIdx + 1).toString()
        );
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
                    <Suspense
                        fallback={
                            <ContentLoader
                                viewBox="0 0 100% 200"
                                height={250}
                                width="100%"
                                backgroundColor="#f3f3f3"
                                foregroundColor="#fff"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    rx="5"
                                    ry="5"
                                    width="100%"
                                    height="100%"
                                />
                            </ContentLoader>
                        }
                    >
                        <Image
                            src={validFeatures?.[featCurIdx]?.img}
                            alt={validFeatures?.[featCurIdx]?.title}
                        />
                    </Suspense>
                </div>
                <h1 className="title">{validFeatures?.[featCurIdx]?.title}</h1>
                <div className="description">
                    {validFeatures?.[featCurIdx]?.description}
                </div>
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
