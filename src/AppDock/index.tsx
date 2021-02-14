import React, { useState } from "react";
import cx from "classnames";
import data from "./data.json";
import { Button } from "../elements-react";
import Avatar from "./Avatar";
import styles from "./index.less";

export interface AppDockProps {
    logo: any;
}

const AppDock: React.FC<AppDockProps> = () => {
    const { apps, showAllAppsIcon = true, user } = data;
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
                <div className={styles.user}>
                    <Avatar
                        busy={false}
                        userName={user.userName}
                        companyName={user.companyName}
                        avatarURL={user.avatarURL}
                    />
                </div>
            </div>
            <div className={cx(styles.appBar, {
                    [styles.appBarOpen]: showAppBar
                })}>
                    <div className={styles.appBarTop}>
                        {/* <img src="/icon-all-apps.svg" alt="" className={styles.appBarTopLogoImg} /> */}
                        <div className={styles.appBarTopTitle}>
                            MY APPLICATIONS
                        </div>
                        <Button
                            icon="close-clear"
                            size="large"
                            className={cx("no-border", styles.appBarTopClose)}
                            onClick={() => setShowAppBar(false)}
                        />
                    </div>
                </div>
        </div>
    );
};

export default AppDock;
