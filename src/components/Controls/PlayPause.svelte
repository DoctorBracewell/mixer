<script lang="ts">
  import type { Track } from "src/tracks";
  import Icon from "./Icon.svelte";

  export let tracks: Track[];

  let paused = false;

  const handleClick = () => {
    if (paused) {
      for (let track of tracks.filter((t) => !t.howl.playing())) {
        track.howl.play();
      }
    } else {
      for (const track of tracks.filter((t) => t.howl.playing())) {
        track.howl.pause();
      }
    }

    paused = !paused;
  };
</script>

<div on:click={handleClick}>
  <Icon iconName={paused ? "play" : "pause"} />
</div>
