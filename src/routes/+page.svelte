<script lang="ts">
  import { onMount } from 'svelte';
  import { curiosity, fetchData } from '../stores/curiosity';

  onMount(() => {
   fetchData('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=oBKUfq4ojUgfJdXxmYCP8EAnvIWw9NtXP172FpqR'); 
  });


</script>

<main>
 {#if $curiosity.loading}
  <p>Loading...</p>
{:else if $curiosity.error}
  <p>Error: {$curiosity.error}</p>
{:else}
 <div class="grid grid-cols-3 justify-center items-center">
  {#each $curiosity.data.photos.slice(0, 10) as rover}
  <div class="p-4 flex justify-center items-center">
  <h1 class="text-2xl font-bold text-black">{rover.id}</h1>
  </div>
  {/each}
 </div>
{/if}

</main>

