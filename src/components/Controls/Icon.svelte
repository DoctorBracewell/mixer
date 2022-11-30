<script lang="ts">
  export let iconName: string;

  $: iconUrl = new URL(`../../../assets/icons/${iconName}.png`, import.meta.url)
    .href;
</script>

<img
  alt={iconName}
  src={iconUrl}
  class="control-button cursor-pointer h-9 transition-transform hover:scale-110"
/>
