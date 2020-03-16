import React from "react";
import ReactDOM from "react-dom";
import * as queryString from "query-string";
import translations from "@shopify/polaris/locales/en.json";
import { Provider } from "@shopify/app-bridge-react";
import createApp from "@shopify/app-bridge";
import { AppProvider } from "@shopify/polaris";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

import "@shopify/polaris/styles.css";

const parsed = queryString.parse(window.location.search);
const shopOrigin = parsed.shop as string;

// Assign constants
const SHOPIFY_API_KEY = "8c4f9df76d2c788625df3830b69378e0";

// Install app flow
const setup = () => {
  if (window.top === window.self) {
    const redirectUri = `https://${shopOrigin}/admin/apps/app-bridge-sampler`;
    const permissionUrl = `/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=write_script_tags&redirect_uri=${redirectUri}`;

    window.location.assign(`https://${shopOrigin}/admin${permissionUrl}`);

    return;
  }

  const config = { apiKey: SHOPIFY_API_KEY, shopOrigin };
  const app = createApp(config);

  ReactDOM.render(
    <AppProvider i18n={translations}>
      <Provider config={config}>
        <App app={app} />
      </Provider>
    </AppProvider>,
    document.getElementById("root")
  );
};
setup();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
