import React from "react";

const CLASS_LOADED = "loaded";

const observed: any[] = [];
const observer = supports() ? new IntersectionObserver(handleIntersect) : null;

const defaultSrc =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Current browser supports the IntersectionObserver API?
 * If so, lazy-load the images as they enter the viewport
 */
function supports(): boolean {
    return false;
    // return (
    // 	'IntersectionObserver' in window &&
    // 	'IntersectionObserverEntry' in window &&
    // 	'intersectionRatio' in window.IntersectionObserverEntry.prototype
    // );
}

/**
 * Observe element, invoke callback when it's in view
 */
function observe(elem: Element, callback: () => void) {
    if (!observer) {
        return;
    }
    observed.push({
        elem,
        callback,
    });
    observer.observe(elem);
}

/**
 * Unobserve element
 */
function unobserve(elem: Element) {
    if (!observer) {
        return;
    }
    const idx = observed.findIndex((o) => o.elem === elem);
    if (idx !== -1) {
        observed.splice(idx, 1);
    }
    if (elem && elem instanceof Element) {
        observer.unobserve(elem);
    }
}

/**
 * Handle elements becoming visible
 */
function handleIntersect(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((e) => {
        const { intersectionRatio, isIntersecting, target } = e;
        const { callback } = observed.find((o) => o.elem === target);
        if (
            (isIntersecting || intersectionRatio > 0) &&
            callback &&
            typeof callback === "function"
        ) {
            callback();
        }
    });
}

interface DeferredImageProps {
    className: string;
    src: string;
    alt: string;
    onError?: () => void;
    onLoad?: () => void;
}

/**
 * Deferred image loading, with optional scroll detection on supported browsers
 */
class DeferredImage extends React.Component<DeferredImageProps> {
    constructor(
        props = {
            className: "",
            src: defaultSrc,
            alt: "",
            onError: function () {},
            onLoad: function () {},
        }
    ) {
        super(props);
        this.state = {
            src: defaultSrc,
            className: "",
            unobserved: !observer,
            onLoad: () => {
                // @ts-ignore TODO
                if (this.state.src !== defaultSrc) {
                    this.setState({
                        className: CLASS_LOADED,
                        unobserved: true,
                    });
                    // @ts-ignore TODO
                    unobserve(this.refs.img);
                    this.props.onLoad?.();
                }
            },
        };
    }
    componentDidMount() {
        if (observer) {
            // @ts-ignore TODO
            observe(this.refs.img, this.setSrc.bind(this));
        } else {
            this.setSrc(this.props.src);
        }
    }
    componentDidUpdate() {
        // @ts-ignore TODO
        if (this.state.unobserved) {
            // @ts-ignore TODO
            this.setSrc();
        }
    }
    // @ts-ignore TODO
    componentWillReceiveProps(nextProps) {
        if (this.props.src !== nextProps.src) {
            this.setSrc(nextProps.src);
        }
    }
    /**
     * Update the element with src and anything else related
     */
    setSrc(overrideSrc: string) {
        // Use overrideSrc, but fall back to props
        const src = overrideSrc || this.props.src;
        // Set the src if changed
        // @ts-ignore TODO
        if (this.state.src !== src) {
            // @ts-ignore TODO
            const cname = observer ? this.state.className : CLASS_LOADED;
            this.setState({
                className: cname,
                src,
            });
        }
    }
    render() {
        return (
            <img
                ref="img"
                // @ts-ignore TODO
                className={[this.props.className, this.state.className].join(
                    " "
                )}
                // @ts-ignore TODO
                src={this.state.src}
                alt={this.props.alt}
                onError={this.props.onError}
                // @ts-ignore TODO
                onLoad={this.state.onLoad}
            />
        );
    }
}

export default DeferredImage;
