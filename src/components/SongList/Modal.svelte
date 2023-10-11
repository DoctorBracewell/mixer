<script lang="ts">
  import { currentSong, appStarted, Song } from "../../stores";
  import { capitalise } from "../../utils";

  import songs from "../../songs.json";

  import { Modal, Content, Trigger } from "sv-popup";

  import playIcon from "/assets/icons/play.png";

  let closed = false;

  /* BEGIN FOCUS MANAGMENT */
  // Ideally this would be provided by sv-popup

  function focusModal() {
    // using setTimeout as a hacky way to wait for the modal to render
    setTimeout(() => {
      // @ts-expect-error
      document.querySelector("#song-selection-modal button[autofocus]").focus();
      document.getElementById("app").setAttribute("inert", "");
    });
  }

  function handleModalClose() {
    document.getElementById("app").removeAttribute("inert");
    document.getElementById("song-modal-trigger").focus();
  }

  function handleEscapeKey({ key }) {
    if (key === "Escape") {
      handleModalClose();
    }
  };

  function handleClickOutside(event) {
    if (event.target.classList.contains("modal__container")) {
      handleModalClose();
    }
  }

  /* END FOCUS MANAGMENT */

  const setSong = (source, song) => {
    $currentSong = new Song(source, song);
    $appStarted = false;
    closed = true;
    handleModalClose();
  };
</script>

<!-- Matches sv-popup https://github.com/sharu725/sv-popup/blob/master/src/lib/Content.svelte#L89 -->
<svelte:window
  on:keydown={handleEscapeKey}
  on:click={handleClickOutside}
  on:mousedown={handleClickOutside}
/>

<Modal button={false} bind:close={closed}>
  <Content
    class="bg-black border-2 border-white rounded-md p-8 flex flex-col max-w-xl"
    id="song-selection-modal"
  >
    <h1 class="text-5xl mb-3">Songs</h1>
    <div class="border-t-4 border-white p-5">
      {#each Object.values(songs) as source, sourceIndex}
        <div class="w-fit">
          <h2 class="text-3xl mb-2">{capitalise(source.name)}</h2>
          <div class="border-t-2 border-white p-3 w-full">
            <ul class="ml-1 text-xl flex flex-col">
              {#each Object.values(source.songs) as song, songIndex}
                <li
                  class="mb-2 song transition-transform hover:scale-105"
                >
                  <button
                    autofocus={sourceIndex === 0 && songIndex === 0 || null}
                    class="flex"
                    on:click={() => setSong(source.name, song.name)}
                  >
                    <div class="h-full w-fit mx-2">
                      <img
                      src={playIcon}
                      alt="Play"
                      class="h-[1em] w-[1em] mt-[0.1em]"
                      />
                    </div>
                    
                    <div class="">{capitalise(song.name)}</div>
                  </button>
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/each}
    </div>
  </Content>
  <Trigger>
    <button
      class="mr-3 mt-3 md:mr-6 md:mt-6 border-2 border-white rounded-md p-2 md:p-4"
      id="song-modal-trigger"
      on:click={focusModal}
    >
      Now Playing:
      <span class="underline">{capitalise($currentSong.song)}</span>
    </button>
  </Trigger>
</Modal>
