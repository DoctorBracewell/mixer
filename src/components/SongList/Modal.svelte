<script lang="ts">
  import { currentSong, appStarted, Song } from "../../stores";
  import { capitalise } from "../../utils";

  import songs from "../../songs.json";

  import { Modal, Content, Trigger } from "sv-popup";

  import playIcon from "/assets/icons/play.png";

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
            <ul class="ml-1 text-xl flex flex-col">
              {#each Object.values(source.songs).sort( (a, b) => a.name.localeCompare(b.name) ) as song}
                <li
                  class="mb-2 cursor-pointer song transition-transform hover:scale-105 h-fit flex"
                  on:click={() => setSong(source.name, song.name)}
                  on:keypress={() => setSong(source.name, song.name)}
                >
                  <div class="h-full w-fit mx-2">
                    <img
                      src={playIcon}
                      alt="Play"
                      class="h-[1em] w-[1em] mt-[0.1em]"
                    />
                  </div>

                  <div class="">{capitalise(song.name)}</div>
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
