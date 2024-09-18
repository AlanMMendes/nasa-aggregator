<script lang="ts">
  export let location: any;
</script>

<div class="flex flex-col justify-center items-start">
  <div class="flex flex-row justify-center items-center gap-2">
    <p>LOCATION</p>
    <hr class="border-red-600 h-[1.5px] w-24" />
  </div>
  <p class="text-3xl text-red-600">_EARTH</p>

  <div class="flex flex-row">
    <p class="text-md font-extralight">
      {location.slug?.toUpperCase()}
    </p>
  </div>
</div>
