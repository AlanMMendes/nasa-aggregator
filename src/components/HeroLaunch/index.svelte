<script lang="ts">
  import { fetchLaunchInformation } from "$lib/fetchLaunch";
  import { createQuery } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import { register } from "swiper/element/bundle";
  import Countdown from "../Countdown/index.svelte";
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
          class="relative w-full h-full flex justify-center items-center"
        >
          <div
            class="relative w-[32rem] border-2 border-solid border-red-600 border-opacity-20 hover:border-white h-auto flex flex-col justify-left items-left p-4 rounded-3xl transition-all duration-300"
          >
            <p class="text-lg text-red-600">
              <span class="text-white">[ _PAD_</span>{launch?.pad?.name}_ ]
            </p>
            <p class="w-auto h-auto text-left lg:text-7xl md:text-5xl text-4xl">
              [_<span class="text-red-600">{launch.slug.toUpperCase()}</span>]
            </p>
            <p class="text-lg text-red-600">
              <span class="text-white">[_VEHICLE_</span
              >{launch?.vehicle?.name.toUpperCase()}_]
            </p>
            <p class="text-lg text-red-600">
              <span class="text-white">[_PROVIDER_</span
              >{launch?.provider?.name.toUpperCase()}_]
            </p>
            <p
              class="text-lg text-red-600 w-full h-[8rem] overflow-ellipsis overflow-y-auto"
            >
              <span class="text-white">[_MISSION_</span
              >{launch?.mission_description?.toUpperCase() ||
                "NO_NAME_MISSION"}_]
            </p>

            <div class="justify-center flex-col items-center flex w-full">
              <button
                class="text-white text-md hover:text-red-600 hover:scale-105 transition-all duration-300 py-2"
                on:click={() => handleData(launch)}
              >
                [_SEE_MORE]
              </button>

              <Countdown date={launch?.sort_date} />
              <div class=" bottom-0 left-0 w-full h-auto px-2">
                <LocationDisplay location={launch.pad.location} />
              </div>
            </div>
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
    position: absolute;
    top: 10%;
    left: 2;
    width: 30px;
    height: 30px;
  }
  swiper-container::part(button-next) {
    z-index: 100;
    color: rgb(250, 28, 28);
    position: absolute;
    top: 10%;
    right: 2;
    width: 30px;
    height: 30px;
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
