<script lang="ts">
  import type { Track } from "src/tracks";
  import { forEachTrack } from "../../utils";
  import Icon from "./Icon.svelte";

  export let tracks: Track[];

  const handleClick = () =>
    forEachTrack(tracks, (track) =>
      track.toggle({
        random: true,
      })
    );
</script>

<div on:click={handleClick}>
  <Icon iconName="shuffle" />
</div>
