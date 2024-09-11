import { Client } from "./client";
import { ListRequest, RecordType } from "../types";

export const Transport = {
  getList: ( payload: ListRequest ) => Client("list").post<{totalRows: number, results: RecordType[]}>(`/getList`, {payload}),

}


