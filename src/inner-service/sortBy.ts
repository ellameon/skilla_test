import { modifyPayload } from "./modifyPayload";
import { ListRequest } from "../types";
import React from "react";

export const sortBy = (payload: ListRequest,
                           setPayload: React.Dispatch<React.SetStateAction<ListRequest>>, field: "date" | "duration") => {

    if (payload.order === "ASC") {
      modifyPayload("order", "DESC", setPayload, payload, "sort_by", field)
    } else {
      modifyPayload("order", "ASC", setPayload, payload, "sort_by", field)
    }

}