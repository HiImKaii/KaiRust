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
    static markCompleted(lessonId: string, timeSpentSeconds: number = 0): void {
        const completed = this.getCompletedLessons();
        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
            
            // Đồng bộ với server nếu đang đăng nhập
            this.syncProgressWithServer(lessonId, timeSpentSeconds);
        }
    }

    /**
     * Đồng bộ tiến độ với server
     */
    static async syncProgressWithServer(lessonId: string, timeSpentSeconds: number): Promise<void> {
        try {
            const token = localStorage.getItem('kairust_token');
            if (!token) return;

            const response = await fetch('/api/progress/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    lesson_id: lessonId,
                    time_spent_seconds: timeSpentSeconds
                }),
            });

            const data = await response.json();
            if (!data.success) {
                console.error('Lỗi đồng bộ tiến độ:', data.message);
            }
        } catch (e) {
            console.error('Lỗi kết nối khi đồng bộ tiến độ:', e);
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
