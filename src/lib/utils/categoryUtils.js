/**
 * 카테고리 유틸 함수
 */

/**
 * 카테고리별 아이콘 매핑
 * @param {string} category - 카테고리 이름
 * @returns {string} 아이콘 타입 ('target', 'refresh', 'zap', 또는 기본 이모지)
 */
export function getCategoryIcon(category) {
    const iconMap = {
        'Focus': 'target',
        'Rhythm': 'refresh',
        'Catalyst': 'zap'
    };
    return iconMap[category] || '📝';
}
