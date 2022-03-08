<script lang="ts">
  export let name: string;
  export let volume: number;
</script>

<img
  src={`img/outline/${name}.png`}
  alt={name}
  class="w-60 h-60 cursor-pointer absolute"
/>
<img
  style:opacity={volume * 2}
  src={`img/solid/${name}.png`}
  alt={name}
  class="w-60 h-60 cursor-pointer absolute"
/>
