import axios, { AxiosResponse } from "axios"

const baseUrl = "http://localhost:3001"

/* タスク候補取得用api */
export const loadCandidateOfTodoList = (): Promise<AxiosResponse<any>> =>
  axios.get(`${baseUrl}/todoList`)
