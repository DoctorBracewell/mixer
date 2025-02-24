<script lang="ts">
  interface Props {
    display: string;
    url: string;
  }

  let { display, url }: Props = $props();
</script>

<a
  href={url}
  class="underline decoration-transparent hover:decoration-white transition-[text-decoration] h-fit z-50"
>
  {display}
</a>
