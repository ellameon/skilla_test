import { ListRequest } from "../types";
import React from "react";


export function modifyPayload<KEY extends keyof ListRequest, VALUE extends ListRequest[KEY]>
(fieldName1: KEY, value1: VALUE, setPayload: React.Dispatch<React.SetStateAction<ListRequest>>, payload: ListRequest, fieldName2?: KEY, value2?: VALUE,): void {
  setPayload({
    ...payload,
    [ fieldName1 ]: value1,
  })

  if (fieldName2) {
    setPayload({
      ...payload,
      [ fieldName1 ]: value1,
      [ fieldName2 ]: value2
    })
  }
}