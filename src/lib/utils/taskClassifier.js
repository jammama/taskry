// src/lib/utils/taskClassifier.js

/**
 * Task의 제목을 분석하여 카테고리(Focus, Rhythm, Catalyst)를 결정합니다.
 * (실제 AI/NLP 모델을 대체하는 간단한 키워드 매칭 로직)
 * @param {string} title
 * @returns {{category: string, baseXP: number}}
 */
export function classifyTask(title) {
    const lowerTitle = title.toLowerCase();

    // 1. Focus 키워드 (지적 성장, 큰 프로젝트, 고가치)
    const focusKeywords = ['study', 'project', 'develop', 'research', 'learn', 'create', 'write', 'meeting', 'pitch', 'draft', 'design'];
    // 2. Rhythm 키워드 (반복 루틴, 일상 유지, 자기 관리)
    const rhythmKeywords = ['gym', 'meditation', 'clean', 'mail', 'workout', 'check', 'daily', 'weekly', 'routine', 'groceries', 'sleep', 'journal'];
    // 3. Catalyst 키워드 (새로운 시도, 도전, 관계 구축, 변화)
    const catalystKeywords = ['explore', 'call', 'meet', 'attend', 'new', 'try', 'fix', 'solve', 'event', 'social'];

    let category = 'Focus'; // 기본값

    // 카테고리 결정 로직
    if (rhythmKeywords.some(keyword => lowerTitle.includes(keyword))) {
        category = 'Rhythm';
    } else if (focusKeywords.some(keyword => lowerTitle.includes(keyword))) {
        category = 'Focus';
    } else if (catalystKeywords.some(keyword => lowerTitle.includes(keyword))) {
        category = 'Catalyst';
    }

    // 카테고리별 기본 XP 설정 (Macro Reward 가중치)
    let baseXP = 100;
    if (category === 'Focus') {
        baseXP = 150 + Math.floor(Math.random() * 50); // 고가치, XP 높음
    } else if (category === 'Rhythm') {
        baseXP = 50 + Math.floor(Math.random() * 20); // 반복, XP 낮음
    } else { // Catalyst
        baseXP = 100 + Math.floor(Math.random() * 40); // 중간 가치
    }

    return { category, baseXP };
}