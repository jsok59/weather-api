import { clearContainer } from "./clearContainer";

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

export { renderHeader };
