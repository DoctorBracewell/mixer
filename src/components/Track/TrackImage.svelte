<script lang="ts">
  import { currentSong } from "../../stores";

  export let name: string;
  export let volume: number;

  const outlineUrl = new URL(
    `../../../assets/imgs/outline/${$currentSong.source}/${name}.png`,
    import.meta.url
  ).href;

  const solidUrl = new URL(
    `../../../assets/imgs/solid/${$currentSong.source}/${name}.png`,
    import.meta.url
  ).href;
</script>

<div class="flex flex-col h-full relative justify-end">
  <img src={outlineUrl} alt={name} class="w-60 h-60 cursor-pointer absolute" />
  <img
    style:opacity={volume * 2}
    src={solidUrl}
    alt={name}
    class="w-60 h-60 cursor-pointer absolute"
  />
</div>
