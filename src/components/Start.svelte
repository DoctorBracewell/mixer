<script lang="ts">
  import { appStarted } from "../stores";

  const handleClick = () => appStarted.set(true);
</script>

<div on:click={handleClick} class="h-screen w-screen flex">
  <p class="text-5xl md:text-9xl m-auto cursor-pointer">Click To Start</p>
</div>
