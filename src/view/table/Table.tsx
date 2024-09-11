import "./table.scss"
import React from "react";
import { TableHeader } from "./table-header/TableHeader";
import { useLoadList } from "../../service";
import { TableRow } from "./table-row/TableRow";
import { RecordType } from "../../types";
import { Filters } from "./filters/Filters";

const defaultPayload = {}

export const TableComponent = () => {

  const {list, payload, setPayload} = useLoadList(defaultPayload)

  const groupByDate = (items: RecordType[]): Record<string, RecordType[]> => {
    return items.reduce((acc: Record<string, RecordType[]>, item: RecordType) => {
      const date = item.date_notime;
      if (!acc[ date ]) {
        acc[ date ] = [];
      }
      acc[ date ].push(item);
      return acc;
    }, {});

  };

  const groupedItems = groupByDate(list || []);

  return (
    <div className={"table-root"}>
      <Filters payload={payload} setPayload={setPayload}/>
      <div className="table-content">
        <TableHeader payload={payload} setPayload={setPayload}/>
        {Object.keys(groupedItems).map((date) => (
          <div key={date}>
            {Object.keys(groupedItems)[ 0 ] !== date &&
              <div className={"table-content-separator"}>
                {date}
                <span>
              {Object.entries(groupedItems)[ Object.keys(groupedItems).findIndex(el => el === date) ][ 1 ].length}
              </span>
              </div>
            }
            {groupedItems[ date ].map((el) => (
              <TableRow key={el.id} record={el}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}