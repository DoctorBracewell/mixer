<script lang="ts">
  import { currentSong } from "../../stores";

  export let name: string;
  export let volume: number;
</script>

<div class="flex flex-col h-full relative justify-end">
  <img
    src={`img/outline/${$currentSong.source}/${name}.png`}
    alt={name}
    class="w-60 h-60 cursor-pointer absolute"
  />
  <img
    style:opacity={volume * 2}
    src={`img/solid/${$currentSong.source}/${name}.png`}
    alt={name}
    class="w-60 h-60 cursor-pointer absolute"
  />
</div>
