// Expand collapsed tree nodes so the element addressed by the URL hash is
// visible, then scroll to it. Used by the /properties and /propertysets pages,
// whose sections are deep-link targets of soveltamisohje cross-reference
// buttons (see anchors.ts for the id scheme).
export function revealHashTarget(): void {
	function reveal() {
		const id = decodeURIComponent(location.hash.slice(1));
		if (!id) return;
		const target = document.getElementById(id);
		if (!target) return;

		// Open every collapsed ancestor (closest() includes the target itself,
		// so a targeted section opens too).
		let node = target.closest<HTMLElement>(".node");
		while (node) {
			node.classList.add("open");
			const header = node.querySelector<HTMLElement>(":scope > .node-header");
			header?.setAttribute("aria-expanded", "true");
			node = node.parentElement?.closest<HTMLElement>(".node") ?? null;
		}

		target.scrollIntoView({ block: "center" });
	}

	reveal();
	window.addEventListener("hashchange", reveal);
}
