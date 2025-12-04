import { browser } from '$app/environment';
import localforage from 'localforage';
import { writable } from 'svelte/store';
import { uid } from 'uid';
import { classifyTask } from '$lib/utils/taskClassifier';

const STORAGE_KEY = 'taskry.todos';
const SETTINGS_KEY = 'taskry.settings';
const seedTodos = [
	{ id: uid(10), title: '2hr Strength Training', isComplete: false, category: 'Focus', xp: 70, order: 0 },
	{ id: uid(10), title: 'Project Pitch Deck - Draft', isComplete: false, category: 'Focus', xp: 120, order: 1 },
	{ id: uid(10), title: 'Grocery Shopping (Weekly)', isComplete: false, category: 'Rhythm', xp: 40, order: 2 },
	{ id: uid(10), title: '10min Meditation', isComplete: false, category: 'Rhythm', xp: 25, order: 3 }
];

const cloneTodos = (list = []) => list.map((todo) => ({ ...todo }));

let inMemoryTodos = cloneTodos(seedTodos);

export const todos = writable(cloneTodos(seedTodos));

const storage = browser
	? localforage.createInstance({
			name: 'taskry',
			storeName: 'taskry_todos',
			description: 'Offline-first todo cache for Planning Mode'
	  })
	: null;

const persistSnapshot = (nextTodos) => {
	const snapshot = cloneTodos(nextTodos);
	inMemoryTodos = snapshot;

	if (storage) {
		storage.setItem(STORAGE_KEY, snapshot).catch((error) => {
			console.error('Failed to persist todos in IndexedDB', error);
		});
	}

	return snapshot;
};

const hydrateFromIndexedDB = async () => {
	if (!storage) {
		todos.set(cloneTodos(inMemoryTodos));
		return;
	}

	try {
		const stored = await storage.getItem(STORAGE_KEY);

		if (Array.isArray(stored)) {
			const snapshot = cloneTodos(stored);
			// 기존 데이터에 order 필드가 없는 경우 마이그레이션
			snapshot.forEach((todo, index) => {
				if (todo.order === undefined) {
					todo.order = index;
				}
			});
			inMemoryTodos = snapshot;
			todos.set(snapshot);
			return;
		}

		await storage.setItem(STORAGE_KEY, inMemoryTodos);
		todos.set(cloneTodos(inMemoryTodos));
	} catch (error) {
		console.error('Failed to hydrate todos from IndexedDB', error);
		todos.set(cloneTodos(inMemoryTodos));
	}
};

let isHydrated = !browser;

const hydrationReady = (browser ? hydrateFromIndexedDB() : Promise.resolve()).finally(() => {
	isHydrated = true;
});

const queueUpdate = (mutator) => {
	const execute = () => {
		todos.update((current) => {
			const workingCopy = cloneTodos(current);
			const updated = mutator(workingCopy);
			return persistSnapshot(updated);
		});
	};

	if (isHydrated) {
		execute();
	} else {
		hydrationReady.finally(execute);
	}
};
export const addTodo = (title) => {
	const trimmedTitle = title?.trim();
	if (!trimmedTitle) {
		return;
	}

	const { category, baseXP } = classifyTask(trimmedTitle);

	queueUpdate((currentTodos) => {
		// 새로운 할 일의 order는 현재 최대 order + 1
		const maxOrder = currentTodos.length > 0 
			? Math.max(...currentTodos.map(t => t.order ?? 0))
			: -1;
		
		return [
			...currentTodos,
			{
				id: uid(10),
				title: trimmedTitle,
				isComplete: false,
				category,
				xp: baseXP,
				order: maxOrder + 1
			}
		];
	});
};

export const completeTodo = (id) => {
	if (!id) {
		return;
	}

	queueUpdate((currentTodos) =>
		currentTodos.map((todo) =>
			todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
		)
	);
};

export const deleteTodo = (id) => {
	if (!id) {
		return;
	}

	queueUpdate((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
};

export const updateTodo = (id, newTitle) => {
	if (!id || !newTitle) {
		return;
	}

	const trimmedTitle = newTitle.trim();
	if (!trimmedTitle) {
		return;
	}

	// 제목이 변경된 경우에만 카테고리 재분류
	queueUpdate((currentTodos) => {
		const todoIndex = currentTodos.findIndex((todo) => todo.id === id);
		if (todoIndex === -1) return currentTodos;

		const currentTodo = currentTodos[todoIndex];
		const { category, baseXP } = classifyTask(trimmedTitle);

		// 제목이 변경되었거나 카테고리가 변경된 경우에만 업데이트
		if (currentTodo.title !== trimmedTitle) {
			const updatedTodos = [...currentTodos];
			updatedTodos[todoIndex] = {
				...currentTodo,
				title: trimmedTitle,
				category,
				xp: baseXP
			};
			return updatedTodos;
        }

        return currentTodos;
    });
};

// 사용자 설정 저장/로드 함수
export const getCompletedSectionCollapsed = async () => {
	if (!storage) return false;
	
	try {
		const settings = await storage.getItem(SETTINGS_KEY);
		return settings?.completedSectionCollapsed ?? false;
	} catch (error) {
		console.error('Failed to load settings from IndexedDB', error);
		return false;
	}
};

export const setCompletedSectionCollapsed = async (collapsed) => {
	if (!storage) return;
	
	try {
		const settings = await storage.getItem(SETTINGS_KEY) || {};
		settings.completedSectionCollapsed = collapsed;
		await storage.setItem(SETTINGS_KEY, settings);
	} catch (error) {
		console.error('Failed to save settings to IndexedDB', error);
	}
};

// Task 순서 업데이트 함수
export const reorderTodos = (newOrder) => {
	if (!Array.isArray(newOrder)) {
		return;
	}

	queueUpdate((currentTodos) => {
		// newOrder는 { id, order } 형태의 배열 또는 id 배열
		const updatedTodos = [...currentTodos];
		
		// id 배열인 경우
		if (newOrder.length > 0 && typeof newOrder[0] === 'string') {
			newOrder.forEach((id, index) => {
				const todo = updatedTodos.find(t => t.id === id);
				if (todo) {
					todo.order = index;
				}
			});
		} else {
			// { id, order } 형태의 배열인 경우
			newOrder.forEach(({ id, order }) => {
				const todo = updatedTodos.find(t => t.id === id);
				if (todo) {
					todo.order = order;
				}
			});
		}
		
		// order 기준으로 정렬
		return updatedTodos.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	});
};