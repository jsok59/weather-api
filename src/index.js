import "./style.css";

const location = document.querySelector("input");
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	start(location.value).catch((e) => console.log("Error", e));
});

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

async function start(location = "hanover") {
	const json = await fetchData(location);
	console.log(json);
	renderDays(json.days);
	renderHeader(json);
}

function renderDays(days) {
	const main = document.querySelector(".hour-container");
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

function clearContainer(container) {
	const nodeList = document.querySelectorAll(`.${container.className} > *`);
	for (const node of nodeList) {
		node.remove();
	}
}

function renderHeader(data) {
	const header = document.querySelector(".header");
	const leftHeader = document.createElement("div");
	leftHeader.className = "leftHeader";
	const rightHeader = document.createElement("div");
	rightHeader.className = "rightHeader";
	clearContainer(header);
	const location = document.createElement("div");
	location.textContent = data.resolvedAddress;
	const temp = document.createElement("div");
	temp.textContent = data.days[0].temp + "°";
	temp.className = "headerTemp";
	const condition = document.createElement("div");
	condition.textContent = data.days[0].conditions;
	const highLowTemp = document.createElement("div");
	highLowTemp.textContent = `H: ${data.days[0].tempmax}°  L: ${data.days[0].tempmin}` + "°";
	const icon = data.days[0].icon;
	const img = document.createElement("img");

	import(`../images/${icon}.svg`).then((result) => {
		img.src = result.default;
	});
	leftHeader.appendChild(location);
	leftHeader.appendChild(temp);
	rightHeader.appendChild(img);
	rightHeader.appendChild(condition);
	rightHeader.appendChild(highLowTemp);
	header.appendChild(leftHeader);
	header.appendChild(rightHeader);
}

start("Silver Spring");
