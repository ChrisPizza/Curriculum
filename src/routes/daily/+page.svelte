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
    <table>
      <thead>
        <tr>
          <td>Class</td>
          <td>Attendance?</td>
          <td>Short Summary</td>
        </tr>
      </thead>
      <tbody>
        {#each $curriculum[dayOfTheWeek - 1] as c}
          <tr>
            <td>{c}</td>
            <td>
              {#if c != "-"}
                <!-- <input type="checkbox" bind:value={CourseState[]}> -->
              {:else}
                -
              {/if}
            </td>
            <td>
              {#if c != "-"}
                <!-- <input type="text" bind:value={CourseSummaries[]}> -->
              {:else}
                -
              {/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    There's no scheduled class today.
  {/if}
</main>

<style>
</style>
