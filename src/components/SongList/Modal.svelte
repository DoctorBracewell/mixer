<script lang="ts">
  import { currentSong, appStarted, Song } from "../../stores";
  import { capitalise } from "../../utils";

  import songs from "../../songs.json";

  import { Modal, Content, Trigger } from "sv-popup";

  let closed = false;

  const setSong = (source, song) => {
    $currentSong = new Song(source, song);
    $appStarted = false;
    closed = true;
  };
</script>

<Modal button={false} bind:close={closed}>
  <Content
    class="bg-black border-2 border-white rounded-md p-8 flex flex-col max-w-xl"
  >
    <h1 class="text-5xl mb-3">Songs</h1>
    <div class="border-t-4 border-white p-5">
      {#each Object.values(songs) as source}
        <div class="w-fit">
          <h2 class="text-3xl mb-2">{capitalise(source.name)}</h2>
          <div class="border-t-2 border-white p-3 w-full">
            <ul class="ml-1 text-xl flex">
              {#each Object.values(source.songs) as song}
                <li
                  class="mb-2 cursor-pointer song transition-transform hover:scale-105 flex"
                  on:click={() => setSong(source.name, song.name)}
                  on:keypress={() => setSong(source.name, song.name)}
                >
                  <span class="h-[1.2em] m-auto">{capitalise(song.name)}</span>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </Content>
  <Trigger>
    <div
      class="mr-3 mt-3 md:mr-6 md:mt-6 border-2 border-white rounded-md p-2 md:p-4"
      on:click={() => (closed = false)}
      on:keypress={() => (closed = false)}
    >
      Now Playing:
      <span class="underline">{capitalise($currentSong.song)}</span>
    </div>
  </Trigger>
</Modal>

<style>
  .song::before {
    content: "";
    height: 1em;
    width: 1em;
    display: inline-block;
    margin: auto 0.5em;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url("assets/img/icons/play.png");
    vertical-align: inherit;
  }
</style>
