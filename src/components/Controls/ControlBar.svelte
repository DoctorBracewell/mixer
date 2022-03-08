<script lang="ts">
  import type { Track } from "src/tracks";
  import Mute from "./Mute.svelte";
  import PlayPause from "./PlayPause.svelte";
  import Shuffle from "./Shuffle.svelte";
  import Switch from "./Switch.svelte";

  export let tracks: Track[];
</script>

<div class="mx-auto my-2 flex w-5/6 md:w-1/2 justify-evenly">
  <PlayPause bind:tracks />
  <Shuffle bind:tracks />
  <Switch bind:tracks />
  <Mute bind:tracks />
</div>
