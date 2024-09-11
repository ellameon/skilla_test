import { Client } from "./client";
import { ListRequest, RecordType } from "../types";

export const Transport = {
  getList: ( payload: ListRequest ) => Client("list").post<{totalRows: number, results: RecordType[]}>(`/getList`, {payload}),

  getCallRecord: (record: string, partnership_id: string) => Client("callRecord").post(`/getRecord?record=${record}&partnership_id=${partnership_id}`)
}


