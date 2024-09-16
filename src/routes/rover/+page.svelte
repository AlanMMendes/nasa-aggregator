<script lang="ts">
  import { fetchRoverInformation } from "$lib/fetchRover";
  import { createQuery } from "@tanstack/svelte-query";
  import ImageTooltip from "../../components/ImageTooltip/index.svelte";
  import Loading from "../../components/Loading/index.svelte";

  const rover: any = createQuery({
    queryKey: ["rover"],
    queryFn: fetchRoverInformation,
  });
</script>

<main class="w-full h-auto">
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
      {#each $rover.data.slice(0, 10) as photo}
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
