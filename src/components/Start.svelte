<script lang="ts">
  import { appStarted } from "../stores";

  const handleClick = () => appStarted.set(true);
</script>

<div onclick={handleClick} class="flex h-screen w-full">
  <p class="text-5xl md:text-9xl m-auto cursor-pointer">Click To Start</p>
</div>
