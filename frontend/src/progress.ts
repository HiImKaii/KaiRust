// =====================================================
// Theo dõi tiến độ học tập (Progress Manager)
// Lưu trữ trạng thái bài học đã hoàn thành dưới local storage
// (Sau này có thể tích hợp với Cookie/Backend cho tài khoản)
// =====================================================

const PROGRESS_KEY = 'kairust_guest_progress';

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
    static markCompleted(lessonId: string): void {
        const completed = this.getCompletedLessons();
        if (!completed.includes(lessonId)) {
            completed.push(lessonId);
            localStorage.setItem(PROGRESS_KEY, JSON.stringify(completed));
        }
    }

    /**
     * Xóa toàn bộ tiến độ (dùng để reset/debug)
     */
    static clearProgress(): void {
        localStorage.removeItem(PROGRESS_KEY);
    }
}
