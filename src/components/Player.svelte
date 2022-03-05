<script lang="ts">
  import ControlBar from "./Controls/ControlBar.svelte";
  import TrackControls from "./Track/TrackControls.svelte";
  import { tracks as tracksStore } from "../stores";
  import type { Track } from "../tracks";

  export let tracks: Track[];

  // tracksStore.set(tracks);
</script>

<div class="p-10 h-screen w-screen flex flex-col">
  <ControlBar />

  <div class="flex-wrap flex justify-center flex-grow">
    {#each tracks as _, trackIndex}
      <div class="inline-block justify-self-center p-10">
        <TrackControls {trackIndex} />
      </div>
    {/each}
  </div>
</div>
