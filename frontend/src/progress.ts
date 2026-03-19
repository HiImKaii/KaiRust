// =====================================================
// Theo dõi tiến độ học tập (Progress Manager)
// Lưu trữ trạng thái bài học đã hoàn thành dưới local storage
// (Sau này có thể tích hợp với Cookie/Backend cho tài khoản)
// =====================================================

const PROGRESS_KEY = 'kairust_guest_progress';
const CURRENT_STATE_KEY = 'kairust_guest_current_state';

// Interface cho trạng thái học tập hiện tại
export interface LearningState {
    currentLessonId: string | null;
    currentChapterId: string | null;
    lastVisit: number; // timestamp
    hasVisited: boolean; // đánh dấu đã từng truy cập
    scrollPosition: number; // vị trí scroll của content
}

export class ProgressManager {
    /**
     * Lấy danh sách ID các bài học đã hoàn thành
     */
    static getCompletedLessons(): string[] {
        try {
            const data = localStorage.getItem(PROGRESS_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Không thể đọc dữ liệu tiến độ:', e);
        }
        return [];
    }

    /**
     * Kiểm tra xem một bài học đã được hoàn thành chưa
     */
    static isCompleted(lessonId: string): boolean {
        const completed = this.getCompletedLessons();
        return completed.includes(lessonId);
    }

    /**
     * Đánh dấu một bài học là đã hoàn thành
     */
    static async markCompleted(lessonId: string, timeSpentSeconds: number = 0): Promise<void> {
        const completed = this.getCompletedLessons();
        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));

            // Đồng bộ với server nếu đang đăng nhập
            const synced = await this.syncProgressWithServer(lessonId, timeSpentSeconds);
            if (!synced) {
                // Queue for later sync
                this.addToPendingSync(lessonId, timeSpentSeconds);
            }
        }
    }

    /**
     * Đồng bộ tiến độ với server (có retry + exponential backoff)
     */
    static async syncProgressWithServer(
        lessonId: string,
        timeSpentSeconds: number,
        retries = 3,
        baseDelayMs = 1000
    ): Promise<boolean> {
        const token = localStorage.getItem('kairust_token');
        if (!token) return false;

        const attemptSync = async (attempt: number): Promise<boolean> => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

                const response = await fetch('/api/progress/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token,
                        lesson_id: lessonId,
                        time_spent_seconds: timeSpentSeconds
                    }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                const data = await response.json();
                if (data.success) {
                    console.log(`[Progress] Synced: ${lessonId}`);
                    return true;
                } else {
                    console.warn(`[Progress] Sync failed: ${data.message}`);
                    return false;
                }
            } catch (e) {
                if (e instanceof Error && e.name === 'AbortError') {
                    console.warn(`[Progress] Sync attempt ${attempt} timed out`);
                } else {
                    console.warn(`[Progress] Sync attempt ${attempt} failed:`, e);
                }
                return false;
            }
        };

        // Try with exponential backoff
        for (let attempt = 1; attempt <= retries; attempt++) {
            const success = await attemptSync(attempt);
            if (success) return true;

            if (attempt < retries) {
                // Exponential backoff: 1s, 2s, 4s...
                const delay = baseDelayMs * Math.pow(2, attempt - 1);
                console.log(`[Progress] Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        console.error(`[Progress] Failed to sync ${lessonId} after ${retries} attempts`);
        return false;
    }

    /**
     * Sync all pending lessons (for bulk sync on reconnect)
     */
    static async syncAllPending(): Promise<void> {
        const pendingKey = 'kairust_pending_progress_sync';
        try {
            const pending = JSON.parse(localStorage.getItem(pendingKey) || '[]');
            if (pending.length === 0) return;

            console.log(`[Progress] Syncing ${pending.length} pending lessons...`);

            for (const item of pending) {
                await this.syncProgressWithServer(item.lessonId, item.timeSpentSeconds);
            }

            localStorage.removeItem(pendingKey);
            console.log('[Progress] All pending lessons synced');
        } catch (e) {
            console.error('[Progress] Failed to sync pending lessons:', e);
        }
    }

    /**
     * Add to pending sync queue (called when online)
     */
    static addToPendingSync(lessonId: string, timeSpentSeconds: number): void {
        const pendingKey = 'kairust_pending_progress_sync';
        try {
            const pending = JSON.parse(localStorage.getItem(pendingKey) || '[]');
            // Avoid duplicates
            if (!pending.find((p: any) => p.lessonId === lessonId)) {
                pending.push({ lessonId, timeSpentSeconds });
                localStorage.setItem(pendingKey, JSON.stringify(pending));
            }
        } catch {
            // Ignore storage errors
        }
    }

    /**
     * Lấy trạng thái học tập hiện tại
     */
    static getLearningState(): LearningState {
        try {
            const data = localStorage.getItem(CURRENT_STATE_KEY);
            if (data) {
                return JSON.parse(data);
            }
        } catch (e) {
            console.error('Không thể đọc trạng thái học tập:', e);
        }
        return {
            currentLessonId: null,
            currentChapterId: null,
            lastVisit: 0,
            hasVisited: false,
            scrollPosition: 0
        };
    }

    /**
     * Lưu trạng thái học tập hiện tại
     */
    static saveLearningState(lessonId: string, chapterId: string, scrollPosition: number = 0): void {
        const state: LearningState = {
            currentLessonId: lessonId,
            currentChapterId: chapterId,
            lastVisit: Date.now(),
            hasVisited: true,
            scrollPosition: scrollPosition
        };
        localStorage.setItem(CURRENT_STATE_KEY, JSON.stringify(state));
    }

    /**
     * Xóa trạng thái học tập hiện tại (khi người dùng chọn bắt đầu lại)
     */
    static clearLearningState(): void {
        localStorage.removeItem(CURRENT_STATE_KEY);
    }

    /**
     * Xóa toàn bộ tiến độ (dùng để reset/debug)
     */
    static clearProgress(): void {
        localStorage.removeItem(PROGRESS_KEY);
    }
}
