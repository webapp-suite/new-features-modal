import React from "react";
import DeferredImage from "./DeferredImage";
import styles from "./index.less";

/**x
 * Get initials for name.
 * If the name is Kimi Gao, It will return KG
 * If the name is kimi, It will return K
 */
function getInitials(name: string): string {
    const regExp = /\(([^)]+)\)/;
    if (regExp.test(name)) {
        return regExp.exec(name)?.[1].toUpperCase() ?? "";
    }
    const names = name.split(/\s+/);
    const first = names.shift() ?? "";
    const last = names.pop() ?? "";
    return (first[0] + (last[0] || "")).toUpperCase();
}

/**
 * Compute consistently pleasant color for given string.
 * @param {number} mod Darken or ligthen mod
 */
function getColor(name: string, mod = 1) {
    const base = [245, 245, 245]; // TODO: optimize for diff backgrounds
    const r = base[0];
    const g = base[1];
    const b = base[2];
    const red = (color(name, 3) + r) / 2;
    const green = (color(name, 5) + g) / 2;
    const blue = (color(name, 7) + b) / 2;
    const col = [red, green, blue].map(Math.floor);
    return "rgb(" + darken(col, mod || 0).join(",") + ")";
}

/**
 * Get computed color value.
 */
const color = (word: string, n: number): number =>
    Math.floor(parseFloat("0." + hash(word, n)) * 256);

/**
 * Get integer hashcode.
 */
function hash(word: string, n: number): number {
    let h = 0;
    for (let i = 0; i < word.length; i++) {
        h = word.charCodeAt(i) + ((h << n) - h);
    }
    return Math.abs(h);
}

/**
 * Obscurely darken or lighten a color.
 * https://gist.github.com/p01/1005192
 */
const darken = (c: any[], n: number) =>
    c.map((d) => ((d += n) < 0 ? 0 : d > 255 ? 255 : d | 0));

interface AvatarProps {
    busy: boolean;
    userName: string;
    companyName: string;
    avatarURL?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    busy,
    userName,
    companyName,
    avatarURL,
}) => {
    const name = busy ? "-" : userName || companyName || "-";
    const attrs: {
        className: string;
        [index: string]: any;
    } = {
        className: styles.userImageIcon,
    };

    if (avatarURL) {
        attrs.src = avatarURL;
        attrs.alt = name;
        // @ts-ignore TODO
        return <DeferredImage {...attrs} />;
    }

    const initials = getInitials(name);
    attrs.title = name;
    attrs.className += " " + styles.userImageFake;
    const fgColor = getColor(name, -180);
    const bgColor = getColor(name, 50);
    attrs.style = { color: fgColor, background: bgColor };
    return <div {...attrs}>{initials}</div>;
};

export default Avatar;
