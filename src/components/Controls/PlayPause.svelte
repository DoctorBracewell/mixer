<script lang="ts">
  import type { Track } from "../../tracks";
  import { forEachTrack } from "../../utils";
  import Icon from "./Icon.svelte";

  export let tracks: Track[];

  const handleClick = () => {
    forEachTrack(tracks, (track) => track.togglePlaying());
    tracks = tracks;
  };
</script>

<button on:click={handleClick}>
  <Icon iconName={tracks.every((track) => track.playing) ? "pause" : "play"} />
</button>
