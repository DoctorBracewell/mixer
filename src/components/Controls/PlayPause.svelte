<script lang="ts">
  import type { Track } from "../../tracks";
  import { forEachTrack } from "../../utils";
  import Icon from "./Icon.svelte";

  interface Props {
    tracks: Track[];
  }

  let { tracks = $bindable() }: Props = $props();

  const handleClick = () => {
    forEachTrack(tracks, (track) => track.togglePlaying());
    tracks = tracks;
  };
</script>

<div onclick={handleClick}>
  <Icon iconName={tracks.every((track) => track.playing) ? "pause" : "play"} />
</div>
