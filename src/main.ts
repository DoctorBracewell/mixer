import "./app.css";
import { default as App } from "./components/App.svelte";
import "./tracks";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
