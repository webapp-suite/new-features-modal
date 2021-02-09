import { useState, useEffect } from "react";

function fetchImage(src: string) {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = resolve;
        image.onerror = image.onabort = reject;

        image.src = src;
    });
}

export function usePreloadImage({ src, srcList, fallback }: {
    src?: string;
    srcList?: string[];
    fallback?: string;
}) {
    const [source, setSource] = useState<string[]|string>(srcList ?? src ?? '');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(false);
        if (srcList?.length) {
            Promise.all(srcList.map((src: string) => fetchImage(src)))
                .then(() => {
                    // setSource(srcList);
                    setLoaded(true);
                })
                .catch(() => {
                    if (fallback) {
                        fetchImage(fallback).then(() => {
                            setSource(fallback);
                            setLoaded(true);
                        });
                    }
                });
        } else if (src) {
            fetchImage(src)
                .then(() => {
                    setSource(src);
                    setLoaded(true);
                })
                .catch(() => {
                    if (fallback) {
                        fetchImage(fallback).then(() => {
                            setSource(fallback);
                            setLoaded(true);
                        });
                    }
                });
        }
    }, [src, fallback]);

    return { loaded, source };
}
