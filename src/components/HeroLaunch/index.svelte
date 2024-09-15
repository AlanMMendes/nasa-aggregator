<script lang="ts">
  import { fetchLaunchInformation } from "$lib/fetchLaunch";
  import { createQuery } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import { register } from "swiper/element/bundle";
  import { formatText } from "../../utils/utils";
  import Countdown from "../Countdown/index.svelte";
  import LocationDisplay from "../LocationDisplay/index.svelte";
  import Modal from "../Modal/index.svelte";

  const launches: any = createQuery({
    queryKey: ["launches"],
    queryFn: fetchLaunchInformation,
  });

  let props: any;

  onMount(() => {
    register();
  });

  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function handleData(event: any) {
    openModal();
    props = event;
  }
</script>

<main class="w-full h-full flex flex-col justify-center items-center relative">
  {#if !launches || $launches.isPending}
    <span>Loading...</span>
  {/if}
  {#if $launches.error}
    <span>Error: {$launches.error.message}</span>
  {/if}
  {#if $launches.isSuccess}
    <div>{$launches.isFetching ? "Background Updating..." : " "}</div>
    <swiper-container
      slides-per-view="1"
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: false,
      }}
      navigation="true"
      pagination={{
        hideOnClick: false,
      }}
      class="w-full h-full"
    >
      {#each $launches?.data?.result as launch}
        <swiper-slide
          class="flex flex-col w-full h-full justify-center items-left min-w-full"
        >
          <div class="flex flex-col px-[18rem]">
            <div class="w-1/3 flex flex-row">
              <div class="flex flex-col">
                <p class="text-md font-extralight">_PAD</p>
                <p class="text-9xl font-bold text-red-600">
                  {formatText(launch.slug ? launch.slug : "NO-NAME-MISSION")}
                </p>
              </div>
              <div class="flex flex-row h-24 w-auto items-left">
                <p class="text-3xl font-semibold">
                  {launch.pad.name ? launch.pad.name?.toUpperCase() : ""}
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <div class="flex flex-row">
                  <p>_OBJECTIVE</p>
                </div>
              </div>
              <div class="flex flex-row items-center justify-left gap-2">
                <div class="flex flex-col items-start justify-center gap-2">
                  <hr class=" h-[3px] opacity-100 w-32" />
                  <p class="text-sm font-extralight max-w-72 opacity-70">
                    {launch.mission_description
                      ? launch.mission_description.toUpperCase()
                      : ""}
                  </p>
                  <p class="text-sm font-extralight max-w-72 opacity-70">
                    {launch.launch_description
                      ? launch.launch_description.toUpperCase()
                      : ""}
                  </p>
                  <button
                    class="hover:text-red-500 hover:scale-95 transition-all duration-300"
                    on:click={() => handleData(launch)}>[ SEE MORE ]</button
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex absolute bottom-0 justify-between px-2">
            <LocationDisplay location={launch.pad.location} />
            <Countdown date={launch.sort_date} />
          </div>
        </swiper-slide>
      {/each}
    </swiper-container>
    <Modal isOpen={showModal} onClose={closeModal} {props} />
  {/if}
</main>

<style>
  swiper-container::part(button-prev) {
    color: white;
    position: fixed;
    top: 10%;
    left: 1px;
  }
  swiper-container::part(button-next) {
    color: white;
    position: fixed;
    top: 10%;
    left: 32px;
    margin-left: 1px;
  }

  swiper-container::part(bullet-active) {
    background-color: rgb(250, 28, 28);
  }
</style>
