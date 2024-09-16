<script lang="ts">
  import { fetchLaunchInformation } from "$lib/fetchLaunch";
  import { createQuery } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import { register } from "swiper/element/bundle";
  import { formatText } from "../../utils/utils";
  import Countdown from "../Countdown/index.svelte";
  import DateDisplay from "../DateDisplay/index.svelte";
  import Loading from "../Loading/index.svelte";
  import LocationDisplay from "../LocationDisplay/index.svelte";
  import Modal from "../Modal/index.svelte";

  let props: any;
  let showModal = false;

  const launches: any = createQuery({
    queryKey: ["launches"],
    queryFn: fetchLaunchInformation,
  });

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

  onMount(() => {
    register();
  });
</script>

<main class="text-white w-full h-full">
  {#if !launches || $launches.isPending}
    <Loading />
  {/if}
  {#if $launches.error}
    <span>Error: {$launches.error.message}</span>
  {/if}
  {#if $launches.isSuccess}
    <div>{$launches.isFetching ? "Background Updating..." : " "}</div>
    <div class="flex justify-end">
      <DateDisplay />
    </div>

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
        clickable: true,
        hideOnClick: false,
        progressBarOpposite: true,
      }}
      class="w-full h-full"
    >
      {#each $launches?.data?.result as launch}
        <swiper-slide
          class="flex flex-col w-full h-full justify-center items-center"
        >
          <div
            class="flex flex-col w-2/4 h-full items-left justify-center border"
          >
            <div class="flex flex-row items-left justify-left w-full">
              <div class="flex flex-col">
                <div class="flex flex-row justify-between items-center w-full">
                  <p class="text-2xl font-semibold">
                    [_PAD]_{launch.pad.name
                      ? launch.pad.name?.toUpperCase()
                      : ""}
                  </p>
                </div>

                <p
                  class="sm:text-5xl lg:text-5xl text-3xl font-bold text-red-600"
                >
                  {formatText(launch.slug ? launch.slug : "NO-NAME-MISSION")}
                </p>
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <div class="flex flex-col">
                <div class="flex flex-col gap-2 z-10">
                  <p>_OBJECTIVE</p>
                  <hr class="border-red-600 w-32" />
                </div>
              </div>
              <div class="flex flex-row items-center justify-left gap-2">
                <div
                  class="flex flex-col items-start justify-center gap-2 lg:max-h-44 md:max-h-32 overflow-x-auto"
                >
                  <p class="text-sm font-extralight max-w-full opacity-70">
                    {launch.mission_description
                      ? launch.mission_description.toUpperCase()
                      : ""}
                  </p>
                  <p class="text-sm font-extralight w-full opacity-70">
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
              <div class="py-2">
                <Countdown date={launch.sort_date} />
              </div>
            </div>
          </div>
          <div
            class="w-full flex flex-col lg:flex-row md:flex-row bottom-0 justify-between px-2"
          >
            <LocationDisplay location={launch.pad.location} />
          </div>
        </swiper-slide>
      {/each}
    </swiper-container>
    <Modal isOpen={showModal} onClose={closeModal} {props} />
  {/if}
</main>

<style>
  swiper-container::part(button-prev) {
    z-index: 100;
    color: rgb(250, 28, 28);
  }
  swiper-container::part(button-next) {
    z-index: 100;
    color: rgb(250, 28, 28);
    position: fixed;
  }
  swiper-container::part(pagination) {
    position: absolute;
    z-index: 99;
    width: 100%;
    height: 10%;
    top: 0%;
    left: 0;
  }
  swiper-container::part(bullet-active) {
    background-color: rgb(250, 28, 28);
  }
</style>
