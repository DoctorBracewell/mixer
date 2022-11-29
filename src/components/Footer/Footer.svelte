<script lang="ts">
  import Link from "./Link.svelte";
</script>

<footer class="absolute -bottom-24 md:bottom-0 w-full">
  <div class="flex flex-col md:flex-row w-full justify-between">
    <div class="flex z-50 mx-auto mt-3 md:m-0 md:p-5">
      <p class="mt-auto text-sm md:text-base">
        <Link
          display="source"
          url="https://github.com/DoctorBracewell/travelers"
        />
        │
        <Link display="svelte" url="https://svelte.dev/" /> +
        <Link display="tailwindcss" url="https://tailwindcss.com/" /> +
        <Link display="howler" url="https://howlerjs.com/" />
      </p>
    </div>

    <div
      class="flex w-full mx-auto mt-3 md:m-0 md:absolute md:bottom-0 md:pb-5"
    >
      <p class="mt-auto mx-auto text-base md:text-2xl">
        Music by <Link
          display="Andrew Prahlow"
          url="http://www.andrewprahlow.com/"
        />
      </p>
    </div>

    <div class="flex z-50 mx-auto mt-3 pb-5 md:m-0 md:p-5">
      <p class="mt-auto text-sm md:text-base">
        © {new Date().getFullYear()}
        <Link display="DrBracewell" url="https://brace.dev" />
      </p>
    </div>
  </div>
</footer>
