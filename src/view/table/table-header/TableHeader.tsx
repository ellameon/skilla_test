import React, { ReactNode } from "react";
import { ListRequest } from "../../../types";
import { modifyPayload, sortBy } from "../../../inner-service";
import {ReactComponent as ArrowUp} from "../../../style/assets/arrow_up.svg";
import {ReactComponent as ArrowDown} from "../../../style/assets/arrow_down.svg";
import "./TableHeader.scss"

type Props = {
  payload: ListRequest
  setPayload: React.Dispatch<React.SetStateAction<ListRequest>>
}

type Cells = {
  title: string
  icon?: ReactNode
  onClick?: () => void
  width: number
}

export const TableHeader = (
  {
    setPayload,
    payload
  }: Props) => {

  const onChangeSort = (field: "date" | "duration") => {
    if (payload.order === "ASC") {
      modifyPayload("order", "DESC", setPayload, payload, "sort_by", field)
    } else {
      modifyPayload("order", "ASC", setPayload, payload, "sort_by", field)
    }
  }

  const cells: Cells[] = [
    {title: "Тип", width: 54},
    {title: "Время", width: 88,
      icon: payload.sort_by === "date" && payload.order === "ASC" ? <ArrowUp/> : <ArrowDown/>,
      onClick: () => onChangeSort("date")},
    {title: "Сотрудник", width: 129},
    {title: "Звонок", width: 325},
    {title: "Источник", width: 214},
    {title: "Оценка", width: 403},
    {title: "Длительность", width: 128,
      icon: payload.sort_by === "duration" && payload.order === "ASC" ? <ArrowUp/> : <ArrowDown/>,
      onClick: () => onChangeSort("duration")},
  ]


  return (
    <div>
    <div className={"table-header"}>
      {cells.map(el => (
        <div key={el.title} style={{width: `${el.width}px`}} onClick={el.onClick} className="table-header-element">
          {el.title}
          {el.icon}
        </div>
      ))}
    </div>
    </div>
  )
}