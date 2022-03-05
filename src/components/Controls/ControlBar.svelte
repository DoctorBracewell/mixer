<script lang="ts">
  import { tracks as tracksStore } from "../../stores";

  let muted = false;

  interface ControlButton {
    name: string;
    click?: Function;
  }

  const mutedStack: number[] = [];

  const controlButtons: ControlButton[] = [
    {
      name: "play",
      click: () => {
        for (let track of $tracksStore.filter((t) => !t.howl.playing())) {
          track.howl.play();
        }
      },
    },

    {
      name: "pause",
      click: () => {
        for (const track of $tracksStore.filter((t) => t.howl.playing())) {
          track.howl.pause();
        }
      },
    },
    {
      name: "shuffle",
      click: () => {
        for (const [index, _] of $tracksStore.entries()) {
          $tracksStore[index].volume = Math.round(Math.random()) / 2;
        }
      },
    },
    {
      name: "mute",
      click: () => {
        for (const [index, _] of $tracksStore.entries()) {
          if (!muted) {
            mutedStack.push($tracksStore[index].volume);
            $tracksStore[index].volume = 0;
          } else {
            $tracksStore[index].volume = mutedStack.shift();
          }
        }

        muted = !muted;
      },
    },
  ];
</script>

<div class="mx-auto my-2 flex w-5/6 md:w-1/2 justify-evenly">
  {#each controlButtons as controlButton}
    <img
      on:click={() => controlButton.click()}
      alt={controlButton.name}
      src={`img/icons/${controlButton.name}.png`}
      class="control-button cursor-pointer h-9"
    />
  {/each}
</div>
