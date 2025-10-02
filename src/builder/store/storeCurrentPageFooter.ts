import { create } from "zustand";
import { PageFooterLight } from "@/feature/page/types/pageFooter";

const emptyFooter: PageFooterLight = {
	content: [],
	id: -1,
};

type CurrentPageFooterStore = {
	currentPageFooter: PageFooterLight;
	setCurrentPageFooter: (
		footer: PageFooterLight,
		options?: { recordHistory?: boolean },
	) => void;
	clearCurrentPage: () => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	resetHistory: () => void;
	// internal stacks
	_past: PageFooterLight[];
	_future: PageFooterLight[];
};

export const useCurrentPageFooterStore = create<CurrentPageFooterStore>(
	(set, get) => ({
		clearCurrentPage: () =>
			set({
				currentPageFooter: { ...emptyFooter },
				_past: [],
				_future: [],
				canUndo: false,
				canRedo: false,
			}),
		currentPageFooter: { ...emptyFooter },
		_past: [],
		_future: [],
		canUndo: false,
		canRedo: false,
		setCurrentPageFooter: (
			pageFooter: PageFooterLight,
			options?: { recordHistory?: boolean },
		) => {
			const prev = get().currentPageFooter;
			// If switching page (different id), do not record history, reset stacks
			if (pageFooter.id !== prev.id) {
				set({
					currentPageFooter: pageFooter,
					_past: [],
					_future: [],
					canUndo: false,
					canRedo: false,
				});
				return;
			}

			// Determine if content changed
			const prevContentStr = JSON.stringify(prev.content ?? null);
			const nextContentStr = JSON.stringify(pageFooter.content ?? null);
			const contentChanged = prevContentStr !== nextContentStr;
			const recordHistory = options?.recordHistory ?? contentChanged;

			if (recordHistory && contentChanged) {
				const past = [
					...get()._past,
					JSON.parse(JSON.stringify(prev)) as PageFooterLight,
				];
				set({
					currentPageFooter: pageFooter,
					_past: past,
					_future: [],
					canUndo: past.length > 0,
					canRedo: false,
				});
			} else {
				set({
					currentPageFooter: pageFooter,
					canUndo: get()._past.length > 0,
					canRedo: get()._future.length > 0,
				});
			}
		},
		undo: () => {
			const { _past, currentPageFooter, _future } = get();
			if (_past.length === 0) return;
			const previous = _past[_past.length - 1];
			const newPast = _past.slice(0, -1);
			const newFuture = [
				..._future,
				JSON.parse(
					JSON.stringify(currentPageFooter),
				) as PageFooterLight,
			];
			set({
				currentPageFooter: previous,
				_past: newPast,
				_future: newFuture,
				canUndo: newPast.length > 0,
				canRedo: newFuture.length > 0,
			});
		},
		redo: () => {
			const { _past, currentPageFooter, _future } = get();
			if (_future.length === 0) return;
			const next = _future[_future.length - 1];
			const newFuture = _future.slice(0, -1);
			const newPast = [
				..._past,
				JSON.parse(
					JSON.stringify(currentPageFooter),
				) as PageFooterLight,
			];
			set({
				currentPageFooter: next,
				_past: newPast,
				_future: newFuture,
				canUndo: newPast.length > 0,
				canRedo: newFuture.length > 0,
			});
		},
		resetHistory: () =>
			set({ _past: [], _future: [], canUndo: false, canRedo: false }),
	}),
);
