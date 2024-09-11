import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./../table/filters/Filters.scss"

type Props = {
	onChangeStart: (date: Date) => void
	onChangeEnd: (date: Date) => void
	value: [Date, Date]
}

export function CalendarG(
	{
		onChangeStart,
		onChangeEnd,
		value
	}: Props) {
	const [valueStart, onChangeValueStart] = useState(new Date());
	const [valueEnd, onChangeValueEnd] = useState(new Date());


	return (
		<div className={"table-filters-in-out-select-calendar"}>
			<Calendar
				onChange={(val) => {
					onChangeStart(val as Date)
					onChangeValueStart(val as Date)
				}}
				value={valueStart}
			/>
			<Calendar
				onChange={(val) => {
					onChangeEnd(val as Date)
					onChangeValueEnd(val as Date)
				}}
				value={valueEnd}
			/>
		</div>
	);
}
