import "./Filters.scss"
import { ListRequest } from "../../../types";
import React, { useEffect, useState } from "react";
import { modifyPayload } from "../../../inner-service";
import { ReactComponent as ArrowUp } from "../../../style/assets/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../../style/assets/arrow_down.svg";
import { ReactComponent as Close } from "../../../style/assets/close.svg";
import { ReactComponent as ArrowLeft } from "../../../style/assets/keyboard_arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../../style/assets/keyboard_arrow_right.svg";
import { ReactComponent as CalendarIcon } from "../../../style/assets/icon-calendar.svg";
import { CalendarG } from "../../Calendar/index"
import dayjs from "dayjs";

type Props = {
  payload: ListRequest
  setPayload: React.Dispatch<React.SetStateAction<ListRequest>>
}

const selectCalendarItems = [
  {label: "3 дня", value: {date_end: Date.now(), date_start: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000))}},
  {label: "Неделя", value: {date_end: Date.now(), date_start: new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))}},
  {label: "Месяц", value: {date_end: Date.now(), date_start: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000))}},
  {label: "Год", value: {date_end: Date.now(), date_start: new Date(Date.now() - (365 * 24 * 60 * 60 * 1000))}},
]

export const Filters = (
  {
    payload,
    setPayload
  }: Props) => {

  const [inOut, setInOut] = useState<number | undefined>(undefined)
  const [date, setDate] = useState<string | undefined>("3 дня")
  const [isOpenInOut, setIsOpenInOut] = useState<boolean>(false)
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false)
  const [isOpenCalendar, setIsOpenCalendar] = useState<boolean>(false)

  useEffect(() => {
    modifyPayload("in_out", inOut, setPayload, payload)
  }, [inOut])

  const selectItems = [
    {value: undefined, label: "Все типы"},
    {value: 0, label: "Входящие"},
    {value: 1, label: "Исходящие"},
  ]

  const changeDatePlus = () => {
    const index = selectCalendarItems.findIndex(el => el.label === date)
    if (index === 3) return
    const newDate = selectCalendarItems[index + 1].label
    setDate(newDate)
  }
  const changeDateMinus = () => {
    const index = selectCalendarItems.findIndex(el => el.label === date)
    if (index === 0) return
    const newDate = selectCalendarItems[index - 1].label
    setDate(newDate)
  }


  useEffect(() => {
    const dateStart = selectCalendarItems.find(el => el.label === date)?.value.date_start
    const dateEnd = new Date()

    modifyPayload("date_end", dateEnd, setPayload, payload, "date_start", dateStart)
  }, [date])

  const onChangeDateStart = (value: Date) => {
    modifyPayload("date_start", value, setPayload, payload,)
  }
  const onChangeDateEnd = (value: Date) => {
    modifyPayload("date_end", value, setPayload, payload,)
  }

  return (
    <div className={"table-filters-root"}>
      <div style={{display: "flex"}}>
        <div className={selectItems.find(el => el.value === inOut)?.label === "Все типы"
          ? "table-filters-in-out-select"
          : "table-filters-in-out-select-selected"
        } onClick={() => setIsOpenInOut(!isOpenInOut)}>
          <div>
            {selectItems.find(el => el.value === inOut)?.label}
          </div>
          {isOpenInOut ? <ArrowUp/> : <ArrowDown/>}
          {isOpenInOut &&
            <div className={"table-filters-in-out-select-list-wrapper"}
                 onClick={() => setIsOpenInOut(false)}></div>}
          {isOpenInOut && <div className={"table-filters-in-out-select-list"}>
            {selectItems.map(el => (
              <div key={el.value}
                   className={el.value === inOut
                     ? "table-filters-in-out-select-item-selected"
                     : "table-filters-in-out-select-item"}
                   onClick={() => setInOut(el.value)}>
                {el.label}
              </div>
            ))}
          </div>}
        </div>
        {inOut !== undefined &&
          <div className={"table-filters-in-out-select-close"} onClick={() => setInOut(undefined)}>
            Сбросить фильтры
            <Close/>
          </div>
        }
      </div>
      <div className={"table-filters-calendar"}>
        <ArrowLeft onClick={changeDateMinus}/>
        <div className={"table-filters-calendar"}
             onClick={() => setIsOpenDate(!isOpenDate)}>
          <CalendarIcon/>
          {date}
        </div>
        <ArrowRight onClick={changeDatePlus}/>
        {isOpenDate &&
          <div className={"table-filters-in-out-select-list-wrapper"}
               onClick={() => setIsOpenDate(false)}></div>}
        {isOpenDate &&
          <div className={"table-filters-dates-select-list"}>
          {selectCalendarItems.map(el => (
            <div key={String(el.value.date_start)}
                 className={el.label === date
                   ? "table-filters-in-out-select-item-selected"
                   : "table-filters-in-out-select-item"}
                 onClick={() => setDate(el.label)}>
              {el.label}
            </div>
          ))}
          <div>
            <div className={"table-filters-select-dates"}>
              Указать даты
            </div>
            <div onClick={() => setIsOpenCalendar(!isOpenCalendar)}
                 className={"table-filters-in-out-select-item"}>
              {`${payload.date_start ? 
                dayjs(payload.date_start).format("DD.MM.YY") : "__.__.__"}-${payload.date_end 
                ? dayjs(payload.date_end).format("DD.MM.YY") 
                : "__.__.__"}`
              }
              <CalendarIcon/>
            </div>
          </div>
          <div className={"table-filters-in-out-select-calendar-wrapper"}>
            {isOpenCalendar &&
              <CalendarG value={[new Date(), new Date()]}
                         onChangeStart={onChangeDateStart}
                        onChangeEnd={onChangeDateEnd}
              />
            }
          </div>
        </div>
        }
      </div>
    </div>
  )
}