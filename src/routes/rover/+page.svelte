<script lang="ts">
  import { fetchRoverInformation } from "$lib/fetchRover";
  import { createQuery } from "@tanstack/svelte-query";
  import ImageTooltip from "../../components/ImageTooltip/index.svelte";
  import Loading from "../../components/Loading/index.svelte";

  let options = [
    {
      id: 1,
      name: "Curiosity",
      value: "curiosity",
      disabled: false,
    },
    {
      id: 2,
      name: "Opportunity",
      value: "opportunity",
      disabled: true,
    },
  ];

  let selectedOption: any = options[0].value;

  const handleChange = (e: any) => {
    selectedOption = e.target.value;
  };

  $: rover = createQuery<any>({
    queryKey: [`${selectedOption}-rover`, selectedOption],
    queryFn: () => fetchRoverInformation(selectedOption),
  });
</script>

<main class="w-auto h-auto min-h-full">
  <div class="w-auto h-auto flex justify-center items-center">
    <select
      bind:value={selectedOption}
      on:change={handleChange}
      class="border border-red-600 rounded-md p-2 bg-zinc-900 text-white shadow-sm focus:outline-none focus:ring focus:ring-red-600"
    >
      {#each options as option}
        <option disabled={option.disabled} value={option.value}
          >{option.name}</option
        >
      {/each}
    </select>
  </div>
  {#if !rover || $rover.isPending}
    <Loading />
  {/if}
  {#if $rover.error}
    <span>Error: {$rover.error.message}</span>
  {/if}
  {#if $rover.isSuccess}
    <div
      class="flex flex-row flex-wrap gap-2 justify-center items-center py-12"
    >
      {#each $rover.data.slice(0, 24) as photo}
        <div
          class="w-96 border border-opacity-40 border-gray-400 min-h-72 rounded-md relative"
        >
          <div class="w-full h-auto flex flex-col text-white">
            <ImageTooltip props={photo} />
            <div class="flex flex-row px-2">
              <p class="text-lg py-2">
                _[{photo.rover.name.toUpperCase()}_{photo.earth_date
                  .replace(/-/g, "_")
                  .toUpperCase()}]
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>
