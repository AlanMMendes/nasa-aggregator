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
    class="fixed inset-0 bg-zinc-950 bg-opacity-90 flex items-center justify-center cursor-auto z-50 px-2"
    on:click={closeModal}
  >
    <button
      class="relative bg-zinc-900 p-6 rounded-lg shadow-lg max-w-2/3 min-w-32 lg:w-1/3 md:w-1/3 h-auto cursor-auto z-50 text-left"
      on:click|stopPropagation
    >
      <button
        class="absolute top-2 right-2 text-white text-xl hover:text-red-500 hover:scale-95 transition-all duration-300"
        on:click={closeModal}>×</button
      >
      <div class="flex flex-col gap-2">
        <div>
          <h1 class="text-red-500">
            _MISSION_NAME_<span class="text-white"
              >{props?.slug?.toUpperCase()}</span
            >
          </h1>
          <h1 class="text-red-500">
            _MISSION_DATE_<span class="text-white"
              >{props?.date_str.toUpperCase()}</span
            >
          </h1>
          <h1 class="text-red-500">
            _PAD_<span class="text-white">{props?.pad.name.toUpperCase()}</span>
          </h1>
          <h1 class="text-red-500">
            _PAD_LOCATION_
            <span class="text-white"
              >[{props?.pad.location.slug.toUpperCase()}
              _{props?.pad.location.country.toUpperCase()}]</span
            >
          </h1>
          <h1 class="text-red-500">
            _PROVIDER_<span
              >{props?.provider?.slug?.replace(/-/g, "_")?.toUpperCase()}</span
            >
          </h1>
          <h1 class="text-red-500">
            _VEHICLE_<span class="text-white"
              >{props?.vehicle?.name.toUpperCase()}</span
            >
          </h1>
        </div>
        <div class="gap-2 max-h-72 overflow-x-auto">
          <h1 class="text-red-500">[_MISSION_DESCRIPTION_]</h1>
          {#each charactersDescription as char, index}
            <span class="char" style={`animation-delay: ${index * delay}ms;`}>
              {char === " " ? "\u00A0" : char.toLocaleUpperCase()}
            </span>
          {/each}
        </div>
        <div class="flex flex-row gap-2 justify-center items-center">
          {#each props.tags as tag}
            <button class="text-red-500">
              [_<span
                class="text-white border-b-2 border-red-500 hover:border-white transition-all duration-300"
                >{tag.text.toUpperCase()}_</span
              >]
            </button>
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
