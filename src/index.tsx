import { h, render } from "preact";
import { App } from "./App";
import "./style.scss";

render(<App />, document.body);

if (module.hot) {
	module.hot.accept();
}

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/service-worker.js")
			.then((registration) => {
				console.log("SW registered: ", registration);
			}).catch((registrationError) => {
				console.log("SW registration failed: ", registrationError);
			});
	});
}
