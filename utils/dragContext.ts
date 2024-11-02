import { TaskListResponse } from "../components/task/TaskList";

export const grid = 8;
export const getListStyle = () => ({
  width: '100%'
});
export const reorder = (
  list: TaskListResponse,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  console.log(list);
  
  console.log(result);
  const [removed] = result.splice(startIndex, 1);
  console.log(removed);
  result.splice(endIndex, 0, removed);

  return result;
};