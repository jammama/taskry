import { browser } from '$app/environment';
import localforage from 'localforage';
import { writable } from 'svelte/store';
import { uid } from 'uid';
import { classifyTask } from '$lib/utils/taskClassifier';

const STORAGE_KEY = 'taskry.todos';
const seedTodos = [
	{ id: uid(10), title: '2hr Strength Training', isComplete: false, category: 'Focus', xp: 70 },
	{ id: uid(10), title: 'Project Pitch Deck - Draft', isComplete: false, category: 'Focus', xp: 120 },
	{ id: uid(10), title: 'Grocery Shopping (Weekly)', isComplete: false, category: 'Rhythm', xp: 40 },
	{ id: uid(10), title: '10min Meditation', isComplete: false, category: 'Rhythm', xp: 25 }
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

	queueUpdate((currentTodos) => [
		...currentTodos,
		{
			id: uid(10),
			title: trimmedTitle,
			isComplete: false,
			category,
			xp: baseXP
		}
	]);
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