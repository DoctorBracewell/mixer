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
  <div class="z-[10000] fixed flex">
    <div class="m-2 md:m-6">
      <a
        class="w-5"
        href="https://www.buymeacoffee.com/drbracewell"
        target="_blank"
        ><img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          class="w-28 md:h-[60px] md:w-[217px]"
        /></a
      >
    </div>
  </div>

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
