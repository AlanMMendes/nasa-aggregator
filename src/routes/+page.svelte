<script lang="ts">
  import DateDisplay from "../components/DateDisplay/index.svelte";
  import HeroLaunch from "../components/HeroLaunch/index.svelte";
</script>

<main
  class="flex flex-col items-center justify-center h-screen bg-zinc-950 text-white p-2"
>
  <div class="flex flex-col justify-end items-end w-full">
    <DateDisplay />
  </div>
  <div class="flex flex-col w-full h-screen">
    <HeroLaunch />
  </div>
</main>
