<script lang="ts">
  import { tracks as tracksStore } from "../../stores";

  import { sleep } from "../../utils";
  import TrackImage from "./TrackImage.svelte";

  export let trackIndex: number;

  let track = $tracksStore[trackIndex];
  $: track = $tracksStore[trackIndex];

  // track.howl.play();
  track.volume = Math.round(Math.random()) / 2;

  const mute = async () => {
    // Rise up to 50% volume if currently at 0
    if (track.volume === 0) {
      while (track.volume < 0.5) {
        track.volume += 0.01;

        await sleep(1);
      }

      track.volume = 0.5;
    }
    // Lower to 0% volume if not currently 0%
    else {
      while (track.volume > 0) {
        track.volume -= 0.01;
        await sleep(1);
      }

      track.volume = 0;
    }
  };
</script>

<div class="flex h-full w-full justify-start">
  <div class="m-auto">
    <div on:click={mute} class="relative top-0 left-0 h-60 w-60">
      <TrackImage {track} />
    </div>

    <div class="flex flex-row mx-auto">
      <input
        class="mx-auto w-11/12 appearance-none h-[5px] rounded-md m-auto bg-white range-slider cursor-pointer"
        type="range"
        min="0"
        max="1"
        step="0.01"
        bind:value={track.volume}
      />

      <span class="pl-3 w-10 font-sans">{Math.round(track.volume * 100)}%</span>
    </div>
  </div>
</div>
