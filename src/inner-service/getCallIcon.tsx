import {ReactComponent as Incoming} from "../style/assets/incoming_call.svg";
import {ReactComponent as Outgoing} from "../style/assets/outgoing_call.svg";
import {ReactComponent as WithoutAnswer} from "../style/assets/without_answeer_call.svg";
import {ReactComponent as Failed} from "../style/assets/not_accepted_call.svg";
import { RecordType } from "../types";

export function getCallIcon (record: RecordType) {
  if (record.status === "Не дозвонился" && record.in_out === 1) {
    return <Failed/>
  }
  if (record.status === "Не дозвонился" && record.in_out === 0) {
    return <WithoutAnswer/>
  }
  if (record.status === "Дозвонился" && record.in_out === 0) {
    return <Outgoing/>
  }
  if (record.status === "Дозвонился" && record.in_out === 1) {
    return <Incoming/>
  }
}