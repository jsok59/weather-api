import { clearContainer } from "./clearContainer";

function renderDays(days) {
	const main = document.querySelector(".day-container");
	clearContainer(main);
	for (const day of days) {
		const row = document.createElement("div");
		row.className = "row";
		const date = document.createElement("div");
		date.textContent = day.datetime;
		const condition = document.createElement("div");
		condition.textContent = day.conditions;
		const temp = document.createElement("div");
		temp.textContent = day.temp + "°";
		const img = document.createElement("img");

		import(`../images/${day.icon}.svg`).then((result) => {
			img.src = result.default;
		});
		row.appendChild(date);
		row.appendChild(condition);
		row.appendChild(temp);
		row.appendChild(img);
		main.append(row);
	}
}

export { renderDays };
