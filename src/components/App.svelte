<script lang="ts">
  import Start from "./Start.svelte";
  import Player from "./Player.svelte";

  import { appStarted, currentSong } from "../stores";
  import { downloadTracks } from "../tracks";
  import Loading from "./Loading.svelte";
  import Footer from "./Footer/Footer.svelte";
  import Modal from "./SongList/Modal.svelte";
</script>

<main class="bg-black h-fit min-h-screen relative">
  <div class="fixed flex w-full justify-between">
    <div class="m-2 md:m-6">
      <a
        class="w-5"
        href="https://www.buymeacoffee.com/drbracewell"
        target="_blank"
        rel="noreferrer"
        ><img
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          class="w-28 md:h-[60px] md:w-[217px]"
        /></a
      >
    </div>

    <Modal />
  </div>

  {#await downloadTracks($currentSong)}
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
