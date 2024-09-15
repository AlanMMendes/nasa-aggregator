<!-- src/Modal.svelte -->
<script lang="ts">
  export let isOpen = false;
  export let onClose: any;
  export let props: any;

  let delay = 15;
  let charactersDescription: any = [];
  let charactersTitle: any = [];
  let charactersLaunchDescription: any = [];

  function splitDescription(text: any) {
    charactersDescription = text?.split("");
  }

  function splitTitle(text: any) {
    charactersTitle = text?.split("");
  }

  function splitLaunchDescription(text: any) {
    charactersLaunchDescription = text?.split("");
  }

  let line1 = "Linha 1";
  let line2 = "Linha 2";
  let text = `${line1}\n${line2}`;

  $: splitDescription(
    `${props?.mission_description}${props?.launch_description}`
  );

  function closeModal() {
    onClose();
  }
</script>

{#if isOpen}
  <button
    class="fixed inset-0 bg-zinc-950 bg-opacity-90 flex items-center justify-center cursor-auto z-50"
    on:click={closeModal}
  >
    <button
      class="relative bg-zinc-900 p-6 rounded-lg shadow-lg w-1/3 cursor-auto z-50 text-left"
      on:click|stopPropagation
    >
      <button
        class="absolute hover:text-red-600 top-2 right-2 text-white text-xl"
        on:click={closeModal}>×</button
      >
      <div class="flex flex-col gap-2">
        <h1>
          [ _MISSION DESCRIPTION... ] - {props?.date_str?.toLocaleUpperCase()}
        </h1>
        <div>
          {#each charactersDescription as char, index}
            <span class="char" style={`animation-delay: ${index * delay}ms;`}>
              {char === " " ? "\u00A0" : char.toLocaleUpperCase()}
            </span>
          {/each}
        </div>
      </div>

      <!-- <p class="text-white text-xl">{props?.name?.toLocaleUpperCase()}</p>
      <p class="text-white text-xl">
        {props?.launch_description?.toLocaleUpperCase()}
      </p>
      <p class="text-white text-xl">{props?.sort_date?.toLocaleUpperCase()}</p>
      <p class="text-white text-xl char-description">
        {props?.quicktext?.toLocaleUpperCase()}
      </p> -->
    </button>
  </button>
{/if}

<style>
  .char {
    opacity: 0;
    display: inline-block;
    animation: fadeIn 0.1s forwards;
    font-family: inherit;
    font-size: inherit;
    white-space: pre-line;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(0px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
