import dayjs from "dayjs";

const rangeStart = "react-calendar__tile--rangeStart";
const rangeStartCustom = "react-calendar__tile--rangeStart-custom";

const rangeEnd = "react-calendar__tile--rangeEnd";
const rangeEndCustom = "react-calendar__tile--rangeEnd-custom";

export const removeOldDates = (): void => {
	const oldChildStart = document.getElementsByClassName(rangeStartCustom)[0];
	const oldChildEnd = document.getElementsByClassName(rangeEndCustom)[0];

	if (oldChildStart) {
		oldChildStart.remove();
	}
	if (oldChildEnd) {
		oldChildEnd.remove();
	}
};

export const addStartEnd = (dateStart: Date, dateEnd: Date): void => {
	removeOldDates();
	const parentElementStart = document.getElementsByClassName(rangeStart)[0];
	const parentElementEnd = document.getElementsByClassName(rangeEnd)[0];

	if (parentElementStart) {
		const newDiv = document.createElement("div");
		newDiv.className = rangeStartCustom;
		newDiv.append(`${dayjs(dateStart, "DD")}`);
		parentElementStart.appendChild(newDiv);
	}
	if (parentElementEnd) {
		const newDiv = document.createElement("div");
		newDiv.className = rangeEndCustom;
		newDiv.append(`${dayjs(dateEnd, "DD")}`);
		parentElementEnd.appendChild(newDiv);
	}
};
