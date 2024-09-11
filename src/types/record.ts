import { PartnerData } from "./partnerData";
import { RecordError } from "./recordError";
import { Result } from "./result";
import { Stage } from "./stage";
import { Abuse } from "./abuse";

export type RecordType = {
  id: number
  partnership_id: string
  partner_data: PartnerData
  date: Date
  date_notime: string
  time: number
  from_number: string
  from_extension: string
  to_number: string
  to_extension: string
  is_skilla: number
  status: "Дозвонился" | "Не дозвонился"
  record: string
  line_number: string
  line_name: string
  in_out: number
  from_site: number
  source: string
  errors: RecordError[]
  disconnect_reason: string
  results: Result[]
  stages: Stage[]
  abuse: Abuse
  contact_name?: string
  contact_company? : string
  person_id: number
  person_name: string
  person_surname: string
  person_avatar: string
}