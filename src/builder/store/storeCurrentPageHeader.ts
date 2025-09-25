import { create } from "zustand";
import { PageHeaderLight } from "@/feature/page/types/pageHeader";

const emptyHeader: PageHeaderLight = {
	content: [],
	id: -1,
};

type CurrentPageHeaderStore = {
	currentPageHeader: PageHeaderLight;
	setCurrentPageHeader: (
		header: PageHeaderLight,
		options?: { recordHistory?: boolean },
	) => void;
	clearCurrentPage: () => void;
	undo: () => void;
	redo: () => void;
	canUndo: boolean;
	canRedo: boolean;
	resetHistory: () => void;
	// internal stacks
	_past: PageHeaderLight[];
	_future: PageHeaderLight[];
};

export const useCurrentPageHeaderStore = create<CurrentPageHeaderStore>(
	(set, get) => ({
		clearCurrentPage: () =>
			set({
				currentPageHeader: { ...emptyHeader },
				_past: [],
				_future: [],
				canUndo: false,
				canRedo: false,
			}),
		currentPageHeader: { ...emptyHeader },
		_past: [],
		_future: [],
		canUndo: false,
		canRedo: false,
		setCurrentPageHeader: (
			pageHeader: PageHeaderLight,
			options?: { recordHistory?: boolean },
		) => {
			const prev = get().currentPageHeader;
			// If switching page (different id), do not record history, reset stacks
			if (pageHeader.id !== prev.id) {
				set({
					currentPageHeader: pageHeader,
					_past: [],
					_future: [],
					canUndo: false,
					canRedo: false,
				});
				return;
			}

			// Determine if content changed
			const prevContentStr = JSON.stringify(prev.content ?? null);
			const nextContentStr = JSON.stringify(pageHeader.content ?? null);
			const contentChanged = prevContentStr !== nextContentStr;
			const recordHistory = options?.recordHistory ?? contentChanged;

			if (recordHistory && contentChanged) {
				const past = [
					...get()._past,
					JSON.parse(JSON.stringify(prev)) as PageHeaderLight,
				];
				set({
					currentPageHeader: pageHeader,
					_past: past,
					_future: [],
					canUndo: past.length > 0,
					canRedo: false,
				});
			} else {
				set({
					currentPageHeader: pageHeader,
					canUndo: get()._past.length > 0,
					canRedo: get()._future.length > 0,
				});
			}
		},
		undo: () => {
			const { _past, currentPageHeader, _future } = get();
			if (_past.length === 0) return;
			const previous = _past[_past.length - 1];
			const newPast = _past.slice(0, -1);
			const newFuture = [
				..._future,
				JSON.parse(
					JSON.stringify(currentPageHeader),
				) as PageHeaderLight,
			];
			set({
				currentPageHeader: previous,
				_past: newPast,
				_future: newFuture,
				canUndo: newPast.length > 0,
				canRedo: newFuture.length > 0,
			});
		},
		redo: () => {
			const { _past, currentPageHeader, _future } = get();
			if (_future.length === 0) return;
			const next = _future[_future.length - 1];
			const newFuture = _future.slice(0, -1);
			const newPast = [
				..._past,
				JSON.parse(
					JSON.stringify(currentPageHeader),
				) as PageHeaderLight,
			];
			set({
				currentPageHeader: next,
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
