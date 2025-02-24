<script lang="ts">
  interface Props {
    iconName: string;
  }

  let { iconName }: Props = $props();

  let iconUrl = $derived(new URL(`../../../assets/icons/${iconName}.png`, import.meta.url)
    .href);
</script>

<img
  alt={iconName}
  src={iconUrl}
  class="control-button cursor-pointer h-9 transition-transform hover:scale-110"
/>
