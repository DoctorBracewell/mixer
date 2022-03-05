<script lang="ts">
  import type { Track } from "src/tracks";
  import Icon from "./Icon.svelte";

  export let tracks: Track[];

  const handleClick = () => {
    for (const track of tracks) {
      track.volume = Math.round(Math.random()) / 2;
    }

    // Trigger re-render
    tracks = tracks;
  };
</script>

<div on:click={handleClick}>
  <Icon iconName="shuffle" />
</div>
