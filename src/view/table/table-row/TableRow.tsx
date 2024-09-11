import { RecordType } from "../../../types";
import "./TableRow.scss"
import { formatSeconds, getCallIcon } from "../../../inner-service";
import dayjs from "dayjs";

type Props = {
  record: RecordType
}

export const TableRow = (
  {
    record
  }: Props) => {


  return (
    <tr className="table-row-root">
      <td className={"table-row-call-icon"}>
        {getCallIcon(record)}
      </td>
      <td className={"table-row-time"}>
        {`${dayjs(record.date).format("HH:mm")}`}
      </td>
      <td className={"table-row-avatar"}>
        <img src={record.person_avatar} alt={""}/>
      </td>
      <td className={"table-row-call"}>
        {record.in_out === 0 ? record.to_number : record.from_number}
      </td>
      <td className={"table-row-source"}>
        {record.source}
      </td>
      <td className={"table-row-pin"}></td>
      <td className={"table-row-duration"}>
        {formatSeconds(record.time)}
      </td>
    </tr>
  )
}