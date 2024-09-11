import { RecordType } from "../../../types";
import "./TableRow.scss"
import { formatSeconds, getCallIcon } from "../../../inner-service";
import dayjs from "dayjs";
import { useState } from "react";
import {ReactComponent as Avatar} from "../../../style/assets/Property 1=avatar.svg";
import { CallRecord } from "./call-record/CallRecord";


type Props = {
  record: RecordType
}

export const TableRow = (
  {
    record
  }: Props) => {

  const [isHovered, setIsHovered] = useState(false)
  const [call, setCall] = useState<string | undefined>(undefined)


  return (
    <tr className="table-row-root"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
      <td className={"table-row-call-icon"}>
        {getCallIcon(record)}
      </td>
      <td className={"table-row-time"}>
        {`${dayjs(record.date).format("HH:mm")}`}
      </td>
      <td className={"table-row-avatar"}>
        {record.person_avatar ? <img src={record.person_avatar} alt={""}/> : <Avatar/>}
      </td>
      <td className={"table-row-call"}>
        {record.in_out === 0 ? record.to_number : record.from_number}
      </td>
      <td className={"table-row-source"}>
        {record.source}
      </td>
      <td className={"table-row-pin"}></td>
      <td className={"table-row-duration"}>
        {!isHovered && formatSeconds(record.time)}
        {isHovered &&
          <CallRecord time={record.time} record={record.record} partnership_id={record.partnership_id}/>
        }
      </td>
    </tr>
  )
}