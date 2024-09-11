import { RecordType } from "../../../types";
import "./TableRow.scss"
import { formatSeconds, getCallIcon } from "../../../inner-service";
import dayjs from "dayjs";
import { useState } from "react";
import { ReactComponent as Avatar } from "../../../style/assets/Property 1=avatar.svg";
import { CallRecord } from "./call-record/CallRecord";


type Props = {
  record: RecordType
}

export const TableRow = (
  {
    record
  }: Props) => {

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="table-row-root"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div className={"table-row-call-icon"}>
        {getCallIcon(record)}
      </div>
      <div className={"table-row-time"}>
        {`${dayjs(record.date).format("HH:mm")}`}
      </div>
      <div className={"table-row-avatar"}>
        {record.person_avatar ? <img src={record.person_avatar} alt={""}/> : <Avatar/>}
      </div>
      <div className={"table-row-call"}>
        {record.in_out === 0 ? record.to_number : record.from_number}
      </div>
      <div className={"table-row-source"}>
        {record.source}
      </div>
      <div className={"table-row-pin"}></div>
      <div className={"table-row-duration"}>
        {!isHovered && formatSeconds(record.time)}
        {isHovered && record.record &&
          <CallRecord time={record.time} record={record.record} partnership_id={record.partnership_id}/>
        }
      </div>
    </div>
  )
}