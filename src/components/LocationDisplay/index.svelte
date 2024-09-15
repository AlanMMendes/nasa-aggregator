<script lang="ts">
  export let location: any;
</script>

<div class="flex flex-col">
  <div class="flex flex-row justify-center items-center gap-2">
    <p>LOCATION</p>
    <hr class="bg-black h-[1.5px] opacity-30 w-full" />
  </div>
  <p class="text-2xl font-semibold text-red-600">_EARTH</p>

  <div class="flex flex-row">
    <p class="text-sm font-extralight">
      {location.slug.replace(/-/g, "_").toUpperCase()}
    </p>
  </div>
</div>
