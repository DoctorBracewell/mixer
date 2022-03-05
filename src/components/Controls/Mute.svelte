<script lang="ts">
  import type { Track } from "src/tracks";
  import Icon from "./Icon.svelte";

  export let tracks: Track[];

  let muted = false;
  const mutedStack: number[] = [];

  const handleClick = () => {
    for (const track of tracks) {
      if (!muted) {
        mutedStack.push(track.volume);
        track.volume = 0;
      } else {
        track.volume = mutedStack.shift();
      }
    }

    muted = !muted;

    // Trigger re-render
    tracks = tracks;
  };
</script>

<div on:click={handleClick}>
  <Icon iconName={muted ? "unmute" : "mute"} />
</div>
