<script lang="ts">
  import type { Track } from "src/tracks";
  import { forEachTrack } from "../../utils";
  import Icon from "./Icon.svelte";

  interface Props {
    tracks: Track[];
  }

  let { tracks = $bindable() }: Props = $props();

  // Animation lock variable
  let muting = false;

  // Store whether or not the entire app is muted in a local variable so we can use it as an option in track.toggle(...)
  let muted = $derived(tracks.every((track) => track.muted));
  

  // Must use async/await so that the icon can update **after** all of the track volumes have been changed
  const handleClick = async () => {
    // Animation lock
    if (muting) return;
    muting = true;

    await forEachTrack(
      tracks,
      async (track) =>
        await track.toggle({
          muting: !muted,
        })
    );

    muting = false;
    tracks = tracks;
  };
</script>

<div onclick={handleClick}>
  <Icon iconName={muted ? "unmute" : "mute"} />
</div>
