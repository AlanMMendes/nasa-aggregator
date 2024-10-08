<script lang="ts">
  import { createQuery } from "@tanstack/svelte-query";
  import { onMount } from "svelte";
  import { fetchNotifications } from "../../lib/fetchNotifications";

  let isOpen = false;
  let isOutsideNews: any = false;

  const toggleMenu = () => {
    isOpen = !isOpen;
  };

  function closeDropdown(event: any) {
    if (isOutsideNews && !isOutsideNews.contains(event.target)) {
      isOpen = false;
    }
  }
  onMount(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  });

  const dateToday = new Date().toISOString().split("T")[0];
  const dateOneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];

  const startDate = dateToday;
  const endDate = dateOneWeekAgo;

  const notifications: any = createQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(startDate, endDate),
  });
</script>

<main class=" px-2 py-2 z-50 text-white" bind:this={isOutsideNews}>
  {#if !notifications || $notifications.isPending}
    <button
      on:click={() => {
        toggleMenu();
      }}
    >
      <i class="fa-solid fa-spinner animate-spin text-white text-2xl"></i>
    </button>
  {/if}
  {#if $notifications.error}
    <span>Error: {$notifications.error.message}</span>
  {/if}
  {#if $notifications.isSuccess}
    <button
      on:click={() => {
        toggleMenu();
      }}
    >
      <i
        class="fa-regular fa-newspaper text-white text-2xl hover:text-red-600 transition-all duration-300 hover:scale-110"
      ></i>
    </button>
    {#if isOpen}
      <div
        class="absolute left-2 overflow-x-hidden bg-zinc-950 rounded-lg flex gap-4 flex-col p-4 max-h-96 overflow-y-auto lg:w-1/4 md:w-2/2 w-[17rem]"
      >
        <h1
          class="text-lg font-bold"
          title="Space Weather Database Of Notifications, Knowledge, Information"
        >
          _[DONKI]
        </h1>
        {#each $notifications.data as notification}
          <div
            class="flex flex-col border border-opacity-10 border-red-600 p-4 gap-2 rounded-3xl hover:border-white"
          >
            <p>
              [{notification.messageID}]_{notification.messageType.toUpperCase()}
            </p>
            [_NEWS]
            <p class="text-md text-nowrap overflow-hidden">
              {notification.messageBody}
            </p>
            <a
              href={`${notification.messageURL}`}
              class="hover:text-red-600 hover:scale-105 duration-300 transition-transform"
            >
              _[LINK_TO_ARTICLE]
            </a>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</main>
