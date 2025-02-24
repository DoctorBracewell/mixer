<script lang="ts">
  import type { Track } from "src/tracks";
  import Mute from "./Mute.svelte";
  import PlayPause from "./PlayPause.svelte";
  import Shuffle from "./Shuffle.svelte";
  import Switch from "./Switch.svelte";

  interface Props {
    tracks: Track[];
  }

  let { tracks = $bindable() }: Props = $props();
</script>

<div class="mx-auto my-10 md:my-2 flex w-5/6 md:w-1/2 justify-evenly z-50">
  <PlayPause bind:tracks />
  <Shuffle bind:tracks />
  <Switch bind:tracks />
  <Mute bind:tracks />
</div>
