<script>
  import { browser } from "$app/environment";
  import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
  import "../app.css";
  import DateDisplay from "../components/DateDisplay/index.svelte";
  import Nasa from "../components/Icons/Nasa/index.svelte";
  import Navbar from "../components/Navbar/index.svelte";
  import Notifications from "../components/Notifications/index.svelte";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 15,
      },
    },
  });
</script>

<QueryClientProvider client={queryClient}>
  <main class="h-screen w-full flex flex-col justify-between">
    <div class="flex flex-row justify-between">
      <div class="flex flex-row order-first justify-center items-center px-2">
        <Nasa />
        <Navbar />
        <Notifications />
      </div>

      <div class="flex flex-row order-last">
        <DateDisplay />
      </div>
    </div>

    <slot />
  </main>
</QueryClientProvider>
