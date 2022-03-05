<script lang="ts">
  import Start from "./Start.svelte";
  import Player from "./Player.svelte";

  import { appStarted } from "../stores";
  import { downloadTracks } from "../tracks";
  import Loading from "./Loading.svelte";
</script>

<main>
  {#await downloadTracks()}
    <Loading />
  {:then tracks}
    {#if $appStarted}
      <Player {tracks} />
    {:else}
      <Start />
    {/if}
  {/await}
</main>
