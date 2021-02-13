import React, { useState } from "react";
import cx from "classnames";
import data from "./data.json";
import styles from "./index.module.css";
import { Button } from "../elements-react";

export interface AppDockProps {
    logo: any;
}

const AppDock: React.FC<AppDockProps> = () => {
    const { apps, showAllAppsIcon = true } = data;
    const [activeAppName, setActiveAppName] = useState(apps[0].name);
    const [showAppBar, setShowAppBar] = useState(false);
    return (
        <div className={styles.appDock}>
            <div className={styles.appIcons}>
                <div className={styles.logo}></div>
                <div className={styles.apps}>
                    {apps.map((app: any) => (
                        <div
                            className={cx(styles.appIcon, {
                                [styles.appIconActive]:
                                    app.name === activeAppName,
                            })}
                            onClick={() => {
                                setActiveAppName(app.name);
                                setShowAppBar(false);
                            }}
                        >
                            <img
                                src={app.img}
                                alt=""
                                className={styles.appIconImg}
                            />
                        </div>
                    ))}
                    {showAllAppsIcon && (
                        <div
                            className={cx(styles.appIcon, styles.iconAllApps)}
                            onClick={() => setShowAppBar(!showAppBar)}
                        >
                            <img src="/icon-all-apps.svg" alt="" />
                        </div>
                    )}
                </div>
                <div className={styles.user}></div>
            </div>
            {showAppBar && (
                <div className={styles.appBar}>
                    <div className={styles.appBarTop}>
                        {/* <img src="/icon-all-apps.svg" alt="" className={styles.appBarTopLogoImg} /> */}
                        <div className={styles.appBarTopTitle}>
                            APPLICATIONS
                        </div>
                        <Button
                            icon="close-clear"
                            size="large"
                            className={cx("no-border", styles.appBarTopClose)}
                            onClick={() => setShowAppBar(false)}
                        ></Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppDock;
