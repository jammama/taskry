/**
 * 스와이프 제스처 유틸 함수
 * 가로/세로 스와이프를 감지하고 위치 추적만 담당
 */

/**
 * 스와이프 제스처 핸들러 생성
 * @param {Object} options - 설정 옵션
 * @param {Function} options.onSwipeStart - 스와이프 시작 시 호출되는 콜백 (taskId, element) => void
 * @param {Function} options.onSwipeMove - 스와이프 이동 시 호출되는 콜백 (taskId, deltaX, deltaY, direction) => void
 * @param {Function} options.onSwipeEnd - 스와이프 종료 시 호출되는 콜백 (taskId, deltaX, deltaY, direction) => void
 * @param {number} options.directionDetectionThreshold - 방향 감지 임계값 (기본값: 5)
 * @returns {Object} 스와이프 핸들러 객체
 */
export function createSwipeGestureHandler(options = {}) {
    const {
        onSwipeStart = () => {},
        onSwipeMove = () => {},
        onSwipeEnd = () => {},
        directionDetectionThreshold = 5
    } = options;

    // 스와이프 상태 관리
    let swipeStartX = null;
    let swipeStartY = null;
    let swipeCurrentX = null;
    let swipeCurrentY = null;
    let isSwiping = false;
    let swipingId = null;
    let currentDirection = null; // 'horizontal' | 'vertical' | null

    /**
     * 터치/마우스 이벤트에서 좌표 추출
     */
    function getCoordinates(event) {
        const touch = event.touches?.[0] || event;
        return {
            x: touch.clientX,
            y: touch.clientY
        };
    }

    /**
     * 스와이프 시작 처리
     */
    function handleStart(event, taskId, element) {
        const coords = getCoordinates(event);
        swipeStartX = coords.x;
        swipeStartY = coords.y;
        swipeCurrentX = swipeStartX;
        swipeCurrentY = swipeStartY;
        isSwiping = false;
        swipingId = taskId;
        currentDirection = null;

        onSwipeStart(taskId, element);
    }

    /**
     * 스와이프 이동 처리
     */
    function handleMove(event, taskId) {
        if (swipingId !== taskId) return;

        const coords = getCoordinates(event);
        swipeCurrentX = coords.x;
        swipeCurrentY = coords.y;

        const deltaX = swipeCurrentX - swipeStartX;
        const deltaY = swipeCurrentY - swipeStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // 방향 감지: 수평/수직 중 더 큰 이동 방향으로 결정
        // 방향이 바뀌면 즉시 전환
        if (absDeltaX > directionDetectionThreshold || absDeltaY > directionDetectionThreshold) {
            const newDirection = absDeltaX > absDeltaY ? 'horizontal' : 'vertical';
            
            // 방향이 설정되지 않았거나 변경되면 즉시 전환
            if (currentDirection === null) {
                // 처음 방향 감지
                currentDirection = newDirection;
                isSwiping = true;
            } else if (currentDirection !== newDirection) {
                // 방향 변경
                currentDirection = newDirection;
                isSwiping = true;
            }
            // 같은 방향이면 isSwiping은 이미 true이므로 유지
        }

        // 스와이프 중이면 이벤트 차단 및 콜백 호출
        if (isSwiping && currentDirection) {
            event.preventDefault();
            event.stopPropagation();
            onSwipeMove(taskId, deltaX, deltaY, currentDirection);
        }
    }

    /**
     * 스와이프 종료 처리
     */
    function handleEnd(event, taskId) {
        if (swipingId !== taskId) return;

        const deltaX = swipeCurrentX - swipeStartX;
        const deltaY = swipeCurrentY - swipeStartY;

        if (isSwiping && currentDirection) {
            onSwipeEnd(taskId, deltaX, deltaY, currentDirection);
        }

        // 상태 초기화
        reset();
    }

    /**
     * 상태 초기화
     */
    function reset() {
        swipeStartX = null;
        swipeStartY = null;
        swipeCurrentX = null;
        swipeCurrentY = null;
        isSwiping = false;
        currentDirection = null;
        swipingId = null;
    }

    /**
     * 현재 스와이프 상태 반환
     */
    function getState() {
        return {
            isSwiping,
            swipingId,
            currentDirection,
            swipeStartX,
            swipeStartY,
            swipeCurrentX,
            swipeCurrentY,
            deltaX: swipeCurrentX !== null && swipeStartX !== null ? swipeCurrentX - swipeStartX : 0,
            deltaY: swipeCurrentY !== null && swipeStartY !== null ? swipeCurrentY - swipeStartY : 0
        };
    }

    return {
        handleStart,
        handleMove,
        handleEnd,
        reset,
        getState
    };
}
