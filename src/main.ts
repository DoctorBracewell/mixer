import { mount } from "svelte";
import "./app.css";
import { default as App } from "./components/App.svelte";
import "./tracks";

mount(App, {
  target: document.getElementById("app")!,
});
