import { useEffect } from "react";

export function useGoogleFontLink(fontFamily?: string) {
	useEffect(() => {
		if (!fontFamily) return;
		const linkId = `google-font-${fontFamily}`;
		if (document.getElementById(linkId)) return;

		const link = document.createElement("link");
		link.id = linkId;
		link.rel = "stylesheet";
		link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}&display=swap`;
		document.head.appendChild(link);

		// Optionnel : nettoyage si besoin
		// return () => { document.getElementById(linkId)?.remove(); };
	}, [fontFamily]);
}
