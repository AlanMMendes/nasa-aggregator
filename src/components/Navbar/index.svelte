<script lang="ts">
  import { onMount } from "svelte";

  let isOpen = false;
  let isOutside: any = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };

  function closeDropdown(event: any) {
    if (isOutside && !isOutside.contains(event.target)) {
      isOpen = false;
    }
  }
  onMount(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  });
</script>

<nav class="px-2 py-2 z-50 text-white" bind:this={isOutside}>
  <button
    on:click={() => {
      toggleMenu();
    }}
  >
    <i
      class="fas fa-bars text-white text-2xl hover:text-red-600 transition-all duration-300 hover:scale-110"
    ></i>
  </button>

  {#if isOpen}
    <div
      class="fixed left-0 ml-1 px-1 w-auto h-1/3 bg-opacity-90 rounded-3xl bg-zinc-950"
    >
      <div
        class="p-4 flex flex-col flex-wrap justify-between items-start gap-2"
      >
        <button
          class="flex flex-col gap-2 h-auto w-auto py-2 justify-center items-center rounded-3xl px-2 hover:text-red-600 transition-all duration-300 hover:scale-105"
        >
          <a class="text-md" href="/">_[LAUNCH_SCHEDULE_]</a>
        </button>
        <button
          class="flex flex-col gap-2 h-auto w-auto py-2 justify-center items-center rounded-3xl px-2 hover:text-red-600 transition-all duration-300 hover:scale-105"
        >
          <a class="text-md" href="/rover">_[MARS_ROVER_PHOTOS_]</a>
        </button>
      </div>
    </div>
  {/if}
</nav>
