<script>
  import Burger from "../../lib/Burger.svelte";
  import { curriculum } from "../../store/Curriculum";
  let i = 0;
  let date = new Date();
  $: dayDate = date.toISOString().slice(0, 10);
  $: dayOfTheWeek = date.getDay();
  console.log($curriculum);
</script>

<main>
  <Burger />
  <button
    on:click={() => {
      date = new Date(date.setDate(date.getDate() - 1));
    }}
  >
    {"<"}
  </button>
  <button
    on:click={() => {
      date = new Date(date.setDate(date.getDate() + 1));
    }}
  >
    {">"}
  </button>
  <p>Date: {dayDate}</p>
  <button on:click={() => (i += 1)}>{i + 1}</button>
  {#if dayOfTheWeek != 0 && dayOfTheWeek != 6}
    {$curriculum[dayOfTheWeek - 1]}
  {:else}
    There's no scheduled class today.
  {/if}
</main>

<style>
</style>
