<script lang="ts">
  export let props: any;
  let hovering = false;
  let showModal = false;

  function handleMouseEnter() {
    hovering = true;
  }
  function handleMouseLeave() {
    hovering = false;
  }
</script>

<main>
  <div
    class="w-full h-auto relative inline-block"
    role="tooltip"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <img
      class="min-h-64 max-h-64 w-full rounded-md"
      src={props.img_src}
      alt={props.id}
    />

    {#if hovering}
      <div
        class={`absolute h-full top-0 w-full rounded-md p-2 bg-black text-white text-left opacity-90 transition-opacity duration-300 ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href={props.img_src}
          target="_blank"
          class="absolute top-2 right-2 hover:text-red-500 hover:scale-95 transition-all duration-300"
        >
          <i class="fa-solid fa-up-right-from-square"></i></a
        >
        <h1 class="text-lg w-48">_{props?.rover.name.toUpperCase()}</h1>
        <p class="text-sm">
          [_PICTURE_DATE_]_{props?.earth_date}
        </p>

        <p class="text-sm">
          {props?.rover?.status ? "_[ACTIVE]" : "_[INACTIVE]"}
        </p>
      </div>
    {/if}
  </div>
</main>
