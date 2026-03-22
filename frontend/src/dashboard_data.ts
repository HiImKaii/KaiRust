// =====================================================
// KaiRust Dashboard Data - Course Definitions & Helpers
// =====================================================

import { courseData, type Chapter, type Lesson } from './courses';
import { ch28_chapters } from './practice_data/index';

// =====================================================
// Course Interface
// =====================================================

export interface Course {
    id: string;
    title: string;
    title_vi: string;
    description: string;
    icon: string;          // Material Symbol name
    gradient: string;      // CSS gradient
    borderColor: string;
    chapters: Chapter[];
    mode: 'theory' | 'practice';
    totalLessons: number;
    isLocked?: boolean;
    unlockRequirement?: string;
}

// =====================================================
// Course Definitions
// =====================================================

// Theory course: ch01–ch23, final_project, appendix (Rust The Book)
export const theoryCourse: Course = {
    id: 'kairust_theory',
    title: 'The Rust Programming Language',
    title_vi: 'Lập trình Rust từ cơ bản đến nâng cao',
    description: 'Học Rust qua cuốn sách "The Rust Programming Language" (The Book) — tài liệu chính thức từ đội ngũ phát triển Rust.',
    icon: 'menu_book',
    gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    borderColor: '#7c3aed',
    chapters: courseData,
    mode: 'theory',
    totalLessons: courseData.reduce((sum, ch) => sum + ch.lessons.length, 0),
};

// Practice course: ch28 (28Tech C curriculum)
export const practiceCourse: Course = {
    id: 'kairust_28tech_c',
    title: '28Tech - Lập trình C',
    title_vi: '28Tech - Lập trình C',
    description: 'Khóa học lập trình C bài bản theo giáo trình 28Tech — từ cơ bản đến nâng cao với hơn 350 bài tập thực hành.',
    icon: 'code',
    gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    borderColor: '#3b82f6',
    chapters: ch28_chapters,
    mode: 'practice',
    totalLessons: ch28_chapters.reduce((sum, ch) => sum + ch.lessons.length, 0),
};

// All courses (future-proof: add more courses here)
export const courses: Course[] = [theoryCourse, practiceCourse];

// =====================================================
// Dashboard Data Helpers
// =====================================================

export interface DashboardStats {
    totalPoints: number;
    rankName: string;
    rankIcon: string;
    earnedAchievements: number;
    totalAchievements: number;
    currentStreak: number;
    longestStreak: number;
    lessonsCompleted: number;
    totalLessons: number;
}

export interface ChapterProgress {
    chapterId: string;
    chapterTitle: string;
    completedLessons: number;
    totalLessons: number;
    percentComplete: number;
    status: 'completed' | 'in-progress' | 'not-started';
}

export interface CourseProgress {
    courseId: string;
    completedLessonIds: string[];
    percentComplete: number;
    chapters: ChapterProgress[];
    lastActivity: string | null;
}

export interface ActivityItem {
    type: 'lesson_complete' | 'achievement_earned' | 'streak_milestone' | 'course_complete';
    title: string;
    subtitle?: string;
    timestamp: string;  // ISO date
    icon: string;        // Material Symbol
    color: string;
}

/**
 * Get all lesson IDs for a course (flattened)
 */
export function getAllLessonIds(course: Course): string[] {
    return course.chapters.flatMap(ch => ch.lessons.map(l => l.id));
}

/**
 * Calculate course progress based on completed lessons
 */
export function getCourseProgress(course: Course, completedLessons: string[]): CourseProgress {
    const allIds = getAllLessonIds(course);
    const completedLessonIds = completedLessons.filter(id => allIds.includes(id));

    const chapters: ChapterProgress[] = course.chapters.map(ch => {
        const chCompleted = ch.lessons.filter(l => completedLessons.includes(l.id)).length;
        const total = ch.lessons.length;
        const percent = total > 0 ? Math.round((chCompleted / total) * 100) : 0;
        let status: 'completed' | 'in-progress' | 'not-started' = 'not-started';
        if (chCompleted === total && total > 0) status = 'completed';
        else if (chCompleted > 0) status = 'in-progress';
        return {
            chapterId: ch.id,
            chapterTitle: ch.title,
            completedLessons: chCompleted,
            totalLessons: total,
            percentComplete: percent,
            status,
        };
    });

    const percentComplete = allIds.length > 0
        ? Math.round((completedLessonIds.length / allIds.length) * 100)
        : 0;

    return {
        courseId: course.id,
        completedLessonIds,
        percentComplete,
        chapters,
        lastActivity: null,
    };
}

/**
 * Get overall dashboard stats (computed from course progress)
 */
export function getDashboardStats(
    courses: Course[],
    completedLessons: string[]
): { lessonsCompleted: number; totalLessons: number } {
    const total = courses.reduce((sum, c) => sum + c.totalLessons, 0);
    const completed = courses.reduce((sum, c) => {
        const ids = getAllLessonIds(c);
        return sum + ids.filter(id => completedLessons.includes(id)).length;
    }, 0);
    return { lessonsCompleted: completed, totalLessons: total };
}

/**
 * Get recent activity from localStorage
 */
export function getRecentActivity(completedLessons: string[], limit = 8): ActivityItem[] {
    const activityKey = 'kairust_activity';
    try {
        const raw = localStorage.getItem(activityKey);
        if (!raw) return buildDefaultActivity(completedLessons, limit);
        const items: ActivityItem[] = JSON.parse(raw);
        return items.slice(0, limit);
    } catch {
        return buildDefaultActivity(completedLessons, limit);
    }
}

/**
 * Build default activity from completed lessons (when no stored activity)
 */
function buildDefaultActivity(completedLessons: string[], limit: number): ActivityItem[] {
    if (completedLessons.length === 0) return [];

    // Find matching lessons across all courses
    const allLessons: { id: string; title: string; courseId: string; mode: 'theory' | 'practice' }[] = [];
    for (const course of courses) {
        for (const ch of course.chapters) {
            for (const lesson of ch.lessons) {
                allLessons.push({ id: lesson.id, title: lesson.title, courseId: course.id, mode: course.mode });
            }
        }
    }

    const now = Date.now();
    return completedLessons.slice(-limit).reverse().map((id, i) => {
        const lesson = allLessons.find(l => l.id === id);
        return {
            type: 'lesson_complete' as const,
            title: lesson ? lesson.title : id,
            subtitle: lesson?.mode === 'practice' ? 'Luyện tập' : 'Lý thuyết',
            timestamp: new Date(now - i * 3600000).toISOString(),
            icon: lesson?.mode === 'practice' ? 'check_circle' : 'school',
            color: lesson?.mode === 'practice' ? '#3b82f6' : '#7c3aed',
        };
    });
}

/**
 * Format relative time (e.g. "2 giờ trước", "Hôm qua")
 */
export function formatRelativeTime(isoDate: string): string {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' });
}

/**
 * Add activity item to localStorage
 */
export function addActivity(item: ActivityItem): void {
    const activityKey = 'kairust_activity';
    try {
        const raw = localStorage.getItem(activityKey);
        const items: ActivityItem[] = raw ? JSON.parse(raw) : [];
        items.unshift(item);
        // Keep only last 20 items
        localStorage.setItem(activityKey, JSON.stringify(items.slice(0, 20)));
    } catch {
        // Ignore
    }
}

/**
 * Get motivational tagline based on progress
 */
export function getMotivationalTagline(percentComplete: number, streak: number): string {
    if (percentComplete === 0) return 'Hãy bắt đầu hành trình của bạn ngay hôm nay!';
    if (percentComplete >= 100) return 'Bạn đã hoàn thành khóa học. Chúc mừng bạn!';
    if (streak >= 7) return `${streak} ngày streak! Tiếp tục phong độ!`;
    if (percentComplete >= 50) return 'Đã qua nửa chặng đường. Giữ vững!';
    if (percentComplete >= 25) return 'Khởi đầu thuận lợi. Cố lên!';
    return 'Mỗi bước nhỏ đều quan trọng. Tiếp tục nhé!';
}

/**
 * Get rank badge color
 */
export function getRankColor(rankName: string): string {
    const lower = rankName.toLowerCase();
    if (lower.includes('bronze')) return '#cd7f32';
    if (lower.includes('silver')) return '#94a3b8';
    if (lower.includes('gold')) return '#eab308';
    if (lower.includes('platinum')) return '#a78bfa';
    if (lower.includes('diamond')) return '#60a5fa';
    return '#94a3b8';
}
