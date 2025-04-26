import { clearContainer } from "./clearContainer";
import { parse, format } from "date-fns";

function renderDays(days) {
	const main = document.querySelector(".day-container");
	clearContainer(main);
	for (let i = 0; i < 7; i++) {
		const row = document.createElement("div");
		row.className = "day";
		const date = document.createElement("div");
		date.textContent = formatDay(days[i].datetime);
		date.className = "dayDate";
		const temp = document.createElement("div");
		temp.textContent = days[i].temp + "°";
		temp.className = "tempDate";
		const img = document.createElement("img");
		import(`../images/${days[i].icon}.svg`).then((result) => {
			img.src = result.default;
		});
		img.className = "dayImg";

		const desc = document.createElement("div");
		desc.textContent = days[i].description;
		desc.className = "dayDesc";

		row.appendChild(date);
		row.appendChild(img);
		row.appendChild(desc);
		row.appendChild(temp);
		main.append(row);
	}
}

function formatDay(day) {
	const parsedDay = parse(day, "yyyy-MM-dd", new Date());
	const formattedDay = format(parsedDay, "EEE");
	return formattedDay;
}

export { renderDays };
