<script lang="ts">
  import Start from "./Start.svelte";
  import Player from "./Player.svelte";

  import { appStarted } from "../stores";
  import { downloadTracks, trackNames } from "../tracks";
  import Loading from "./Loading.svelte";
  import Footer from "./Footer/Footer.svelte";
</script>

<!-- Preload images -->
<svelte:head>
  {#each trackNames as imageName}
    <link rel="preload" as="image" href={`img/solid/${imageName}.png`} />
    <link rel="preload" as="image" href={`img/outline/${imageName}.png`} />
  {/each}
</svelte:head>

<main class="bg-black h-fit min-h-screen relative">
  {#await downloadTracks()}
    <Loading />
  {:then tracks}
    {#if $appStarted}
      <Player {tracks} />
    {:else}
      <Start />
    {/if}
  {/await}

  <Footer />
</main>
