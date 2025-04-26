import { format, parse } from "date-fns";
import { clearContainer } from "./clearContainer";

function renderHours(hours) {
	const currentHour = new Date().getHours();
	const main = document.querySelector(".hour-container");
	clearContainer(main);
	for (let i = currentHour; i < currentHour + 6; i++) {
		const hourContainer = document.createElement("div");
		hourContainer.className = "hour";
		const hour = document.createElement("div");
		hour.textContent = formatHour(hours[i].datetime);

		const img = document.createElement("img");
		import(`../images/${hours[i].icon}.svg`).then((result) => {
			img.src = result.default;
		});

		const temp = document.createElement("div");
		temp.textContent = hours[i].temp + "°";

		hourContainer.appendChild(hour);
		hourContainer.appendChild(img);
		hourContainer.appendChild(temp);
		main.appendChild(hourContainer);
	}
}

function formatHour(time) {
	const parsedTime = parse(time, "HH:mm:ss", new Date());
	const formattedTime = format(parsedTime, "ha");
	return formattedTime;
}

export { renderHours };
