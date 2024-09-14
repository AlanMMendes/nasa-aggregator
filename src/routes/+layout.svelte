<script>
 import { browser } from '$app/environment';
 import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
 import "../app.css";

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        gcTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 15,
        
      },
    },
  })
</script>
<QueryClientProvider client={queryClient}>
 <main>
  <slot />
 </main>
 
</QueryClientProvider>
