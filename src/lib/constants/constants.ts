const courseType = [
  "必修",
  "系選修",
  "外選修",
  "領域通識",
  "語文通識",
  "其他",
] as const;
const defaultCoursesData = [
  ["done", "微積分(一)", "必修", 3, "-", "1[5-6],3[5-6]"],
  ["done", "統計學(一)", "必修", 3, "-", "1[2-3],3[1-2]"],
  ["done", "經濟學(一)", "必修", 3, "-", "4[5-7]"],
  ["done", "線性代數", "必修", 3, "-", "2[5-6],4[3-4]"],
] as const;

export { courseType, defaultCoursesData };
