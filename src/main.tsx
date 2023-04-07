import React from "react";
import "../src/index.css";
import App from "./App";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-6oycijtxqgktqwao.us.auth0.com"
			clientId="UWEeO0QyQO6iT7V5Ne6cJLk8TgyfFyPu"
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}>
			<App />
		</Auth0Provider>
	</React.StrictMode>
);
