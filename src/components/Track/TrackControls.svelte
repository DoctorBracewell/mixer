<script lang="ts">
  import type { Track } from "src/tracks";
  import { onDestroy } from "svelte";
  import TrackImage from "./TrackImage.svelte";

  interface Props {
    // Include the track as a prop and start playing it when this component is loaded (not necesarily mounted)
    track: Track;
  }

  let { track }: Props = $props();
  track.togglePlaying();

  // Subscribe to changes in the volume store and store in a local variable
  let volume = $state();
  const unsubscribe = track.volumeStore.subscribe((value) => (volume = value));

  // Don't forget to unsubscribe!
  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  const handleVolumeChange = (event: Event) => {
    //  Set the volume to the float value of the input
    const target = event.target as HTMLInputElement;
    track.volume = parseFloat(target.value);

    // We must update the track variable to send updates up the component tree so other components can rerender
    track = track;
  };

  const handleToggleMute = async () => {
    await track.toggle();

    track = track;
  };
</script>

<div class="flex h-full w-full justify-start">
  <div class="m-auto flex flex-col">
    {#if track.type !== "solo"}
      <span class="mx-auto mb-2">{track.type}</span>
    {/if}

    <div
      onclick={handleToggleMute}
      onkeypress={handleToggleMute}
      class="relative top-0 left-0 h-60 w-60"
    >
      <TrackImage name={track.name} {volume} />
    </div>

    <div class="flex flex-row w-full">
      <input
        class="mx-auto w-11/12 appearance-none h-[5px] rounded-md m-auto bg-white range-slider cursor-pointer"
        type="range"
        min="0"
        max="1"
        step="0.01"
        oninput={handleVolumeChange}
        value={volume}
      />

      <span class="pl-3 w-10">{Math.round(volume * 100)}%</span>
    </div>
  </div>
</div>
