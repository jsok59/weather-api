import "./style.css";
import { renderHeader } from "./renderHeader";
import { renderDays } from "./renderDays";
import { renderHours } from "./renderHours";

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
	renderHours(json.days[0].hours);
}

start("Silver Spring");
