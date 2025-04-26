function clearContainer(container) {
	const nodeList = document.querySelectorAll(`.${container.className} > *`);
	for (const node of nodeList) {
		node.remove();
	}
}

export { clearContainer };
