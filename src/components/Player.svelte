<script lang="ts">
  import ControlBar from "./Controls/ControlBar.svelte";
  import TrackControls from "./Track/TrackControls.svelte";
  import type { Track } from "../tracks";

  export let tracks: Track[];
</script>

<div class="p-10 h-full w-full flex flex-col">
  <ControlBar bind:tracks />

  <div class="flex-wrap flex justify-center flex-grow">
    {#each tracks as track}
      <div class="inline-block justify-self-center p-10">
        <TrackControls bind:track />
      </div>
    {/each}
  </div>
</div>
