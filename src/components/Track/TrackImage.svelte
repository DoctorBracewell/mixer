<script lang="ts">
  import type { Track } from "../../tracks";

  export let track: Track;
</script>

<img
  style:opacity={track.volume < 0.5 ? 1 : (1 - track.volume) * 2}
  src={`img/outline/${track.name}.png`}
  alt={track.name}
  class="w-60 h-60 cursor-pointer absolute"
/>
<img
  style:opacity={track.volume * 2}
  src={`img/solid/${track.name}.png`}
  alt={track.name}
  class="w-60 h-60 cursor-pointer absolute"
/>
