<script lang="ts">
  export let iconName: string;
</script>

<img
  alt={iconName}
  src={`img/icons/${iconName}.png`}
  class="control-button cursor-pointer h-9"
/>
