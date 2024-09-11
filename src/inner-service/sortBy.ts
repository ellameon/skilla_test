import { modifyPayload } from "./modifyPayload";
import { ListRequest } from "../types";
import React from "react";

export const sortBy = (payload: ListRequest,
                           setPayload: React.Dispatch<React.SetStateAction<ListRequest>>, field: "date" | "duration") => {
  modifyPayload("sort_by", field, setPayload, payload)
  setTimeout(() => {
    if (payload.order === "ASC") {
      console.log(111, payload)
      modifyPayload("order", "DESC", setPayload, payload)
    } else {
      console.log(222, payload)
      modifyPayload("order", "ASC", setPayload, payload)
    }
  }, 100)

}