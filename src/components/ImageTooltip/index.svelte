<script lang="ts">
  let hovering = false;
  function handleMouseEnter() {
    hovering = true;
  }
  function handleMouseLeave() {
    hovering = false;
  }

  export let props;
</script>

<main>
  <div
    class="w-full h-auto relative inline-block"
    role="tooltip"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <img
      class="min-h-64 max-h-64 w-full rounded-2xl"
      src={props.img_src}
      alt={props.id}
    />

    {#if hovering}
      <div
        class={`absolute h-full top-0 w-full p-2 bg-black text-white text-left rounded-2xl opacity-90 transition-opacity duration-300 ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 class="text-lg w-48">{props?.name}</h1>
        <p class="text-sm text-gray-500">{props?.earth_date}</p>
        <p class="text-sm text-gray-500">{props?.id}</p>
        <p class="text-sm text-gray-500">{props?.status}</p>
      </div>
    {/if}
  </div>
</main>
