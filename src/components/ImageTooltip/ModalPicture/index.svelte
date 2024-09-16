<!-- src/Modal.svelte -->
<script lang="ts">
  import Loading from "../../Loading/index.svelte";
  export let isOpen = false;
  export let onClose: any;
  export let props: any;

  function closeModal() {
    onClose();
  }
  let isImageLoaded = false;

  function handleImageLoad() {
    isImageLoaded = true;
  }
</script>

{#if isOpen}
  <button
    class="fixed inset-0 bg-zinc-950 bg-opacity-90 flex items-center justify-center cursor-auto z-50 px-2"
    on:click={closeModal}
  >
    <button
      class={`relative bg-zinc-900 p-6 rounded-lg shadow-lg z-50 text-left h-auto w-auto min-h-[32rem] min-w-[32rem] ${props ? "" : "hidden"}`}
      on:click|stopPropagation
    >
      <button
        class="absolute top-1 right-1 text-white text-xl hover:text-red-500 hover:scale-95 transition-all duration-300"
        on:click={closeModal}>×</button
      >
      <div class="modal-content">
        {#if !isImageLoaded}
          <div
            class="max-h-[32rem] max-w-[32rem] flex items-center justify-center"
          >
            <Loading />
          </div>
        {/if}
        <img
          src={props.img_src}
          alt="Modal content"
          on:load={handleImageLoad}
          class="w-full h-96"
          style="display: {isImageLoaded ? 'block' : 'none'}"
        />
      </div>
    </button>
  </button>
{/if}

<style>
</style>
