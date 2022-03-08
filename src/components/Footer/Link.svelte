<script lang="ts">
  export let display: string;
  export let url: string;
</script>

<a
  href={url}
  class="underline decoration-transparent hover:decoration-white transition-[text-decoration] h-fit z-50"
>
  {display}
</a>
