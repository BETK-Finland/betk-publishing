const STORAGE_KEY = "betk-design-app-v2";
const EMPTY = "—";

export function initDesignAppColumn(defaultId: string): void {
	let current = defaultId;
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) current = stored;
	} catch {
		// private mode
	}

	const apply = (id: string) => {
		current = id;
		try {
			localStorage.setItem(STORAGE_KEY, id);
		} catch {
			// private mode
		}
		document.querySelectorAll<HTMLSelectElement>(".design-app-select").forEach((el) => {
			if (el.value !== id) el.value = id;
			const shown = el.parentElement?.querySelector(".design-app-shown");
			if (shown) shown.textContent = el.selectedOptions[0]?.textContent?.trim() ?? id;
		});
		document.querySelectorAll<HTMLElement>("td.cell-design-app").forEach((cell) => {
			const raw = cell.getAttribute(`data-app-${id}`) ?? "";
			cell.textContent = raw.trim() || EMPTY;
		});
	};

	apply(current);

	document.addEventListener("change", (event) => {
		const target = event.target;
		if (target instanceof HTMLSelectElement && target.classList.contains("design-app-select")) {
			apply(target.value);
		}
	});

	document.addEventListener("betk-detail-open", () => apply(current));
}
