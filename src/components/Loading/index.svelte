<script lang="ts"></script>

<main>
  <div class="flex items-center justify-center h-screen">
    <div
      class=" rounded-full h-full w-full border-t-2 border-b-2 border-gray-900 justify-center items-center flex gap-4"
    >
      <i class="fa-solid fa-satellite floating text-red-500 text-4xl"></i>
      <span class="text-red-500">[_LOADING] </span>
      <span class="text-red-500 animate-pulse">.</span>
      <span class="text-red-500 animate-pulse">.</span>
      <span class="text-red-500 animate-pulse">.</span>
    </div>
  </div>
</main>

<style>
  .floating {
    animation: float 2s ease-in-out infinite;
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>
