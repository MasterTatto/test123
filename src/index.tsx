import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app/App";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {darkTheme} from "./app/themeStyle/themeStyle";
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const store = setupStore()
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);


