export type ListRequest = {
  date_start?: Date
  date_end?: Date
  in_out?: number
  limit?: number
  offset?: number
  sort_by?: "date" | "duration"
  order?: "ASC" | "DESC"
  status?: "success" | "fail"
}