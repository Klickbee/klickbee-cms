import { create } from "zustand";
import { PageLight } from "@/feature/page/types/page";

const emptyPage: PageLight = {
	content: [],
	id: -1,
	slug: "",
	title: "",
	pageHeaderId: null,
	pageFooterId: null,
};

type CurrentPageStore = {
	currentPage: PageLight;
	setCurrentPage: (
		page: PageLight,
		options?: { recordHistory?: boolean },
	) => void;
	clearCurrentPage: () => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	resetHistory: () => void;
	// internal stacks
	_past: PageLight[];
	_future: PageLight[];
};

export const useCurrentPageStore = create<CurrentPageStore>((set, get) => ({
	clearCurrentPage: () =>
		set({
			currentPage: { ...emptyPage },
			_past: [],
			_future: [],
			canUndo: false,
			canRedo: false,
		}),
	currentPage: { ...emptyPage },
	_past: [],
	_future: [],
	canUndo: false,
	canRedo: false,
	setCurrentPage: (
		page: PageLight,
		options?: { recordHistory?: boolean },
	) => {
		const prev = get().currentPage;
		// If switching page (different id), do not record history, reset stacks
		if (page.id !== prev.id) {
			set({
				currentPage: page,
				_past: [],
				_future: [],
				canUndo: false,
				canRedo: false,
			});
			return;
		}

		// Determine if content changed
		const prevContentStr = JSON.stringify(prev.content ?? null);
		const nextContentStr = JSON.stringify(page.content ?? null);
		const contentChanged = prevContentStr !== nextContentStr;
		const recordHistory = options?.recordHistory ?? contentChanged;

		if (recordHistory && contentChanged) {
			const past = [
				...get()._past,
				JSON.parse(JSON.stringify(prev)) as PageLight,
			];
			set({
				currentPage: page,
				_past: past,
				_future: [],
				canUndo: past.length > 0,
				canRedo: false,
			});
		} else {
			set({
				currentPage: page,
				canUndo: get()._past.length > 0,
				canRedo: get()._future.length > 0,
			});
		}
	},
	undo: () => {
		const { _past, currentPage, _future } = get();
		if (_past.length === 0) return;
		const previous = _past[_past.length - 1];
		const newPast = _past.slice(0, -1);
		const newFuture = [
			..._future,
			JSON.parse(JSON.stringify(currentPage)) as PageLight,
		];
		set({
			currentPage: previous,
			_past: newPast,
			_future: newFuture,
			canUndo: newPast.length > 0,
			canRedo: newFuture.length > 0,
		});
	},
	redo: () => {
		const { _past, currentPage, _future } = get();
		if (_future.length === 0) return;
		const next = _future[_future.length - 1];
		const newFuture = _future.slice(0, -1);
		const newPast = [
			..._past,
			JSON.parse(JSON.stringify(currentPage)) as PageLight,
		];
		set({
			currentPage: next,
			_past: newPast,
			_future: newFuture,
			canUndo: newPast.length > 0,
			canRedo: newFuture.length > 0,
		});
	},
	resetHistory: () =>
		set({ _past: [], _future: [], canUndo: false, canRedo: false }),
}));
