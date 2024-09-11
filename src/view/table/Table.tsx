import "./table.scss"
import React from "react";
import { TableHeader } from "./table-header/TableHeader";
import { useLoadList } from "../../service";
import { TableRow } from "./table-row/TableRow";
import { RecordType } from "../../types";

export const TableComponent = () => {

  const {list, payload, setPayload} = useLoadList()

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

  console.log(Object.entries(groupedItems)[1][1].length)

  return (
    <div className="table-content">
      <TableHeader payload={payload} setPayload={setPayload}/>
      {Object.keys(groupedItems).map((date) => (
        <div key={date}>
          {Object.keys(groupedItems)[0] !== date &&
            <div className={"table-content-separator"}>
              {date}
              <span>
              {Object.entries(groupedItems)[Object.keys(groupedItems).findIndex(el => el === date)]?.length}
              </span>
            </div>
          }
          {groupedItems[date].map((el) => (
            <TableRow key={el.id} record={el} />
          ))}
        </div>
      ))}
    </div>
  )
}