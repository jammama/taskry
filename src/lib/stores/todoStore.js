// src/lib/stores/todoStore.js
import { writable } from 'svelte/store';
import { uid } from 'uid';
import { classifyTask } from '$lib/utils/taskClassifier'; // <-- 🚨 새로 추가



// (completeTodo 함수는 그대로 유지)
// ...
// 임시 데이터 구조 (나중에 DB와 연동될 구조)
const initialTodos = [
    { id: uid(10), title: "2hr Strength Training", isComplete: false, category: 'Focus', xp: 70 },
    { id: uid(10), title: "Project Pitch Deck - Draft", isComplete: false, category: 'Focus', xp: 120 },
    { id: uid(10), title: "Grocery Shopping (Weekly)", isComplete: false, category: 'Rhythm', xp: 40 },
    { id: uid(10), title: "10min Meditation", isComplete: false, category: 'Rhythm', xp: 25 },
];

export const todos = writable(initialTodos);

/** 새로운 To-Do 항목을 추가합니다. */
export const addTodo = (title) => {
    // 🚨 Task 분류 로직 실행
    const { category, baseXP } = classifyTask(title);

    todos.update(currentTodos => [
        ...currentTodos,
        {
            id: uid(10),
            title,
            isComplete: false,
            category: category, // 분류된 카테고리 적용
            xp: baseXP          // 분류된 XP 적용
        }
    ]);
};
/** To-Do 항목을 완료 처리합니다. (Update) */
export const completeTodo = (id) => {
    // Micro Reward 계산 로직은 나중에 추가하고, 일단은 완료 상태만 변경
    todos.update(currentTodos => {
        const todoIndex = currentTodos.findIndex(t => t.id === id);

        if (todoIndex !== -1) {
            currentTodos[todoIndex].isComplete = !currentTodos[todoIndex].isComplete; // 토글 처리
        }
        return currentTodos;
    });
};