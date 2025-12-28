<script lang="ts">
  import { overlay } from "../store/OverlayStore";
  import { curriculum } from "../store/Curriculum";
  import Overlay from "../lib/Overlay.svelte";
  import Burger from "../lib/Burger.svelte";

  // items for course
  type Course = {
    state: "done" | "doing" | null;
    name: string;
    type:
      | "必修"
      | "系選修"
      | "外選修"
      | "領域通識"
      | "語文通識"
      | "其他"
      | null;
    credit: number;
    teacher: string;
    time: string;
  };
  const courseType = [
    "必修",
    "系選修",
    "外選修",
    "領域通識",
    "語文通識",
    "其他",
  ];
  let courses: Course[] = [];
  const defaultCourse: Course = {
    state: null,
    name: "",
    type: null,
    credit: 0,
    teacher: "",
    time: "",
  };
  let newCourse = { ...defaultCourse };
  let deletedCourseIndex: number | null = null;

  // default courses
  const defaultCoursesData = [
    ["done", "微積分(一)", "必修", 3, "-", "1[5-6],3[5-6]"],
    ["done", "統計學(一)", "必修", 3, "-", "1[2-3],3[1-2]"],
    ["done", "經濟學(一)", "必修", 3, "-", "4[5-7]"],
    ["done", "線性代數", "必修", 3, "-", "2[5-6],4[3-4]"],
  ];
  for (let i: number = 0; i < defaultCoursesData.length; i++) {
    newCourse = {
      state: defaultCoursesData[i][0] as Course["state"],
      name: defaultCoursesData[i][1] as string,
      type: defaultCoursesData[i][2] as Course["type"],
      credit: defaultCoursesData[i][3] as number,
      teacher: defaultCoursesData[i][4] as string,
      time: defaultCoursesData[i][5] as string,
    };
    appendCourse(newCourse);
  }

  //set and update curriculum
  $: {
    curriculum.update((old) => {
      const next = old.map((row) => row.slice());

      for (const course of courses) {
        const segments = course.time.split(/\s*,\s*/);

        for (const time of segments) {
          const m = time.match(/(\d+)\[(\d+)-(\d+)\]/);
          if (!m) continue;

          const day = +m[1] - 1;
          const p1 = +m[2] - 1;
          const p2 = +m[3] - 1;

          for (let p = p1; p <= p2; p++) {
            next[day][p] = course.name;
          }
        }
      }
      return next;
    });
  }

  function appendCourse(course: Course) {
    if (Object.values(course).some((v) => v === "" || v == null)) return;

    courses = [...courses, course];
    newCourse = { ...defaultCourse };
  }
</script>

<main>
  {#if $overlay === "editor"}
    <Overlay
      onClose={() => {
        overlay.set(null);
        newCourse = defaultCourse;
        deletedCourseIndex = null;
      }}
    >
      <ul>
        <li>課程狀態:</li>
        <select bind:value={newCourse.state}>
          <option value={null}>Select State</option>
          <option value="doing">doing</option>
          <option value="done">done</option>
        </select>
        <li>課程名稱：</li>
        <input bind:value={newCourse.name} required />
        <li>課程種類：</li>
        <select bind:value={newCourse.type}>
          <option value={null}>Select Type</option>
          {#each courseType as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
        <li>學分數：</li>
        <input type="number" bind:value={newCourse.credit} />
        <li>課程老師：</li>
        <input bind:value={newCourse.teacher} required />
        <li>課堂時間：</li>
        <input bind:value={newCourse.time} required />
      </ul>
      <button
        on:click={() => {
          appendCourse(newCourse);
          if (deletedCourseIndex != null) {
            courses.splice(deletedCourseIndex, 1);
            deletedCourseIndex = null;
          }
          overlay.set(null);
        }}>加入</button
      >
    </Overlay>
  {/if}

  <Burger />

  <button on:click={() => overlay.set("editor")}>Add Class</button>
  <button on:click={() => overlay.set("settings")}>settings</button>
  <table class="rules-all">
    <thead>
      <tr>
        <td></td>
        {#each courses.length > 0 ? Object.keys(courses[0]) : [] as k}
          <td>{k}</td>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each courses as c, i}
        <tr>
          <td>
            <button
              on:click={() => {
                overlay.set("editor");
                newCourse = { ...courses[i] };
                deletedCourseIndex = i;
              }}
              >edit
            </button>
          </td>
          {#each Object.values(c) as v}
            <td>{v}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <table>
    <thead>
      <tr>
        {#each ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as d}
          <td>{d}</td>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each Array(8) as _, period}
        <tr>
          <td>{period + 1}</td>
          {#each $curriculum as day}
            <td>{day[period]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<style>
</style>
