<!-- src/Countdown.svelte -->
<script lang="ts">
  import { onDestroy } from "svelte";

  export let date;

  function formatTimestamp(timestamp: any) {
    const date = new Date(timestamp * 1000);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  const targetDate = new Date(formatTimestamp(date));

  function getTimeRemaining(endTime: any) {
    const now: any = new Date();
    const total: any = endTime - now;
    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds, expired: false };
  }

  let time = getTimeRemaining(targetDate);

  const interval = setInterval(() => {
    time = getTimeRemaining(targetDate);
    if (time.expired) {
      clearInterval(interval);
    }
  }, 1000);

  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<div class="flex flex-col justify-center items-left">
  <p class="text-xs font-extralight text-red-500">[ MISSION COUNTDOWN ]</p>
  {#if time.expired}
    <p>[_BEING_LAUNCHED]</p>
  {:else}
    <div class="flex flex-row gap-4 justify-left items-center">
      <div
        class="flex flex-col min-w-18 w-auto h-auto justify-right items-right"
      >
        <div class="flex flex-row justify-right items-center h-auto w-auto">
          <hr class=" bg-black h-[1.5px] opacity-70 w-full" />
          <p class="text-[0.1rem] text-gray-500 text-right px-1">days</p>
        </div>
        <p class="text-5xl font-sans font-semibold text-center">{time.days}</p>
        <hr class=" bg-black h-[1.5px] opacity-70 w-full mt-1" />
      </div>
      <div
        class="flex flex-col min-w-12 w-auto h-auto justify-right items-right"
      >
        <div class="flex flex-row justify-right items-center h-auto w-auto">
          <hr class=" bg-black h-[1.5px] opacity-70 w-full" />
          <p class="text-[0.1rem] text-gray-500 text-right px-1">hours</p>
        </div>
        <p class="text-5xl font-sans font-semibold text-center">{time.hours}</p>
        <hr class=" bg-black h-[1.5px] opacity-70 w-full mt-1" />
      </div>
      <div
        class="flex flex-col min-w-12 w-auto h-auto justify-right items-right"
      >
        <div class="flex flex-row justify-right items-center h-auto w-auto">
          <hr class=" bg-black h-[1.5px] opacity-70 w-full" />
          <p class="text-[0.1rem] text-gray-500 text-right px-1">minutes</p>
        </div>
        <p class="text-5xl font-sans font-semibold text-center">
          {time.minutes}
        </p>
        <hr class=" bg-black h-[1.5px] opacity-70 w-full mt-1" />
      </div>
      <div
        class="flex flex-col min-w-16 w-auto h-auto justify-right items-right"
      >
        <div class="flex flex-row justify-right items-center h-auto w-auto">
          <hr class=" bg-black h-[1.5px] opacity-70 w-full" />
          <p class="text-[0.1rem] text-gray-500 text-right px-1">seconds</p>
        </div>
        <p class="text-5xl font-sans font-semibold text-center">
          {time.seconds}
        </p>
        <hr class=" bg-black h-[1.5px] opacity-70 w-full mt-1" />
      </div>
    </div>
  {/if}
</div>
