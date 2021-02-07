# New Features Modal

Show a modal to communicate new added features. Built with react.js

## Usage

```jsx
import React, { useState } from "react";
import NewFeaturesModal from "@webapp-suite/new-features-modal";

const App: React.FC = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(
        localStorage.getItem("new-features-modal/show") !== "false"
    );
    return (
        <div>
            <NewFeaturesModal
                features={features}
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
            />
        </div>
    );
};
```

## Props

| Prop            | Type       | Default        | Usage                     |
| :-------------- | :--------- | :------------- | :------------------------ |
| visible         | boolean    | false          | Whether modal should show |
| features        | Feature[]  | []             | -                         |
| title?          | string     | "New Features" | -                         |
| onClose?        | () => void | null           | -                         |
| localStorageId? | string     | null           | -                         |

## Development

```bash
npm start
```
