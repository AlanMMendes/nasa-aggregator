<!-- src/DateDisplay.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  function getFormattedDate() {
    const now = new Date();

    const daysOfWeek = ["_SUN", "_MON", "_TUE", "_WED", "_THU", "_FRI", "_SAT"];

    const dayName = daysOfWeek[now.getDay()];
    const monthNumber = now.getMonth() + 1;
    const dayOfMonth = now.getDate();

    return `${dayName}-${monthNumber}-${dayOfMonth}`;
  }

  function getFormattedMonth() {
    const now = new Date();

    const monthsOfYear = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];

    const monthName = monthsOfYear[now.getMonth()];

    return `${monthName}`;
  }

  let formattedDate: string;
  let formattedMonth: string;

  onMount(() => {
    formattedDate = getFormattedDate();
    formattedMonth = getFormattedMonth();
  });
</script>

<div
  class="text-center text-lg font-medium flex flex-col justify-end items-end w-32 absolute top-0 px-2"
>
  <p class="text-red-600">{formattedDate}</p>
  <div class="flex flex-row w-full justify-center items-center gap-2">
    <hr class=" h-[1.5px] w-full opacity-70 border-white" />
    <p class="text-[1.5px] opacity-70">{formattedMonth}</p>
  </div>
</div>
