import "./style.css";

async function fetchData(location) {
	try {
		const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=L5ATUDYH8R5DXYG3WGG9G8R94`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Here's the status ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		console.log("This is the catch block", error);
	}
}

async function start(location) {
	const json = await fetchData(location);
	console.log(json);
	renderDays(json.days);
}

const location = document.querySelector("input");

start(location.value);

function renderDays(days) {
	const main = document.querySelector(".hour-container");
	for (const day of days) {
		const row = document.createElement("div");
		row.className = "row";
		const date = document.createElement("div");
		date.textContent = day.datetime;
		const condition = document.createElement("div");
		condition.textContent = day.conditions;
		const temp = document.createElement("div");
		temp.textContent = day.temp;
		row.appendChild(date);
		row.appendChild(condition);
		row.appendChild(temp);
		main.append(row);
	}
}
