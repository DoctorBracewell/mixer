<script lang="ts">
  import type { Track } from "src/tracks";
  import { forEachTrack } from "../../utils";
  import Icon from "./Icon.svelte";

  interface Props {
    tracks: Track[];
  }

  let { tracks }: Props = $props();

  const handleClick = () => forEachTrack(tracks, (track) => track.toggle());
</script>

<div onclick={handleClick}>
  <Icon iconName="switch" />
</div>
