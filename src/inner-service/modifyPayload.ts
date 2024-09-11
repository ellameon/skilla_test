import { ListRequest } from "../types";
import React from "react";


export function modifyPayload<KEY extends keyof ListRequest, VALUE extends ListRequest[KEY]>
(fieldName: KEY, value: VALUE, setPayload: React.Dispatch<React.SetStateAction<ListRequest>>, payload: ListRequest): void {


  console.log({
    ...payload,
    [ fieldName ]: value
  })
  setPayload({
    ...payload,
    [ fieldName ]: value
  })
}