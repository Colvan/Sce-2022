import React, {FC} from "react";

import {Provider} from "react-redux";
import {store} from "./src/store";
import AppEntry from "./src/AppEntry";


const App: FC = () => {


    return (
        <Provider store={store}>
            <AppEntry/>
        </Provider>
    )
}


export default App