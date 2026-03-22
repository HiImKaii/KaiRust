// =====================================================
// Achievements UI - New Design (Clean SaaS / Minimal Corporate)
// =====================================================

interface Achievement {
    id: string;
    name: string;
    name_vi: string;
    description: string;
    description_vi: string;
    category: string;
    icon: string;
    requirement_type: string;
    requirement_value: number;
    rarity: string;
    points: number;
}

interface AchievementWithStatus {
    achievement: Achievement;
    earned: boolean;
    earned_at: string | null;
}

interface AchievementStats {
    total_achievements: number;
    earned_achievements: number;
    total_points: number;
    rank: UserRank;
    streak: UserStreak;
}

interface UserRank {
    rank: string;
    rank_name: string;
    rank_name_vi: string;
    rank_icon: string;
    total_points: number;
    next_rank: string | null;
    next_rank_name: string | null;
    next_rank_points: number | null;
    progress_percent: number;
}

interface UserStreak {
    user_id: number;
    current_streak: number;
    longest_streak: number;
    last_activity_date: string | null;
    total_active_days: number;
}

const ACHIEVEMENTS_KEY = 'kairust_achievements_cache';
const ACHIEVEMENTS_STATS_KEY = 'kairust_achievements_stats';

// =====================================================
// API Functions
// =====================================================

async function fetchAchievements(token: string): Promise<{ achievements: AchievementWithStatus[], stats: AchievementStats } | null> {
    try {
        const response = await fetch('/api/achievements?token=' + encodeURIComponent(token));
        if (!response.ok) return null;
        const data = await response.json();
        if (data.success) {
            localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(data.achievements));
            localStorage.setItem(ACHIEVEMENTS_STATS_KEY, JSON.stringify(data.stats));
            return { achievements: data.achievements, stats: data.stats };
        }
        return null;
    } catch (e) {
        console.error('Error fetching achievements:', e);
        return null;
    }
}

function getCachedAchievements(): { achievements: AchievementWithStatus[], stats: AchievementStats } | null {
    try {
        const achievements = localStorage.getItem(ACHIEVEMENTS_KEY);
        const stats = localStorage.getItem(ACHIEVEMENTS_STATS_KEY);
        if (achievements && stats) {
            return {
                achievements: JSON.parse(achievements),
                stats: JSON.parse(stats)
            };
        }
        return null;
    } catch {
        return null;
    }
}

// =====================================================
// Design System - Clean SaaS Style
// =====================================================

function getRarityColor(rarity: string): string {
    switch (rarity) {
        case 'bronze': return '#cd7f32';
        case 'silver': return '#94a3b8';
        case 'gold': return '#eab308';
        case 'platinum': return '#a78bfa';
        default: return '#94a3b8';
    }
}

function getCategoryName(category: string): string {
    switch (category) {
        case 'problem': return 'Giải Bài';
        case 'streak': return 'Streak';
        case 'time': return 'Thời Gian';
        case 'chapter': return 'Chương';
        case 'special': return 'Đặc Biệt';
        default: return category;
    }
}

function getCategoryIcon(category: string): string {
    switch (category) {
        case 'problem': return 'quiz';
        case 'streak': return 'local_fire_department';
        case 'time': return 'schedule';
        case 'chapter': return 'menu_book';
        case 'special': return 'star';
        default: return 'emoji_events';
    }
}

function formatNumber(num: number): string {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

// =====================================================
// UI Rendering - New Clean Design
// =====================================================

function renderAchievementCard(a: AchievementWithStatus): string {
    const rarityColor = getRarityColor(a.achievement.rarity);
    const opacity = a.earned ? '1' : '0.35';
    const earnedClass = a.earned ? 'earned' : 'locked';

    return `
        <div class="achievement-card ${earnedClass}" data-id="${a.achievement.id}" style="opacity: ${opacity}">
            <div class="achievement-icon" style="background: ${a.earned ? `linear-gradient(135deg, ${rarityColor}, ${rarityColor}dd)` : '#e2e8f0'}">
                <span class="material-symbols-outlined">${a.achievement.icon}</span>
            </div>
            <div class="achievement-info">
                <div class="achievement-name">${a.achievement.name_vi}</div>
                <div class="achievement-desc">${a.achievement.description_vi}</div>
                <div class="achievement-meta">
                    <span class="achievement-points">+${a.achievement.points} pts</span>
                    <span class="achievement-rarity" style="color: ${rarityColor}">${a.achievement.rarity}</span>
                </div>
            </div>
            ${a.earned ? `<div class="achievement-check">
                <span class="material-symbols-outlined">check</span>
            </div>` : ''}
        </div>
    `;
}

function renderAchievementsPanel(data: { achievements: AchievementWithStatus[], stats: AchievementStats }): string {
    const { achievements, stats } = data;

    const categories = ['problem', 'streak', 'time', 'chapter', 'special'];
    const grouped: Record<string, AchievementWithStatus[]> = {};

    for (const c of categories) {
        grouped[c] = achievements.filter(a => a.achievement.category === c);
    }

    const progressPercent = stats.total_achievements > 0
        ? Math.round((stats.earned_achievements / stats.total_achievements) * 100)
        : 0;

    return `
        <div class="achievements-container">
            <div class="achievements-header">
                <div class="header-left">
                    <h2>Thành Tựu</h2>
                    <p class="header-subtitle">Theo dõi tiến độ học tập của bạn</p>
                </div>
                <button class="achievements-close" onclick="closeAchievementsModal()">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>

            <!-- Stats Row -->
            <div class="achievements-stats">
                <div class="stat-card">
                    <div class="stat-header">
                        <span class="stat-icon" style="background: #dbeafe; color: #3b82f6;">
                            <span class="material-symbols-outlined">emoji_events</span>
                        </span>
                        <span class="stat-label">Thành tựu</span>
                    </div>
                    <div class="stat-value">${stats.earned_achievements}<span class="stat-total">/${stats.total_achievements}</span></div>
                    <div class="stat-progress">
                        <div class="stat-progress-bar" style="width: ${progressPercent}%; background: linear-gradient(90deg, #3b82f6, #8b5cf6);"></div>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <span class="stat-icon" style="background: #fef3c7; color: #f59e0b;">
                            <span class="material-symbols-outlined">star</span>
                        </span>
                        <span class="stat-label">Điểm</span>
                    </div>
                    <div class="stat-value">${formatNumber(stats.total_points)}</div>
                    <div class="stat-subtitle">tổng cộng</div>
                </div>

                <div class="stat-card">
                    <div class="stat-header">
                        <span class="stat-icon" style="background: #d1fae5; color: #10b981;">
                            <span class="material-symbols-outlined">local_fire_department</span>
                        </span>
                        <span class="stat-label">Streak</span>
                    </div>
                    <div class="stat-value">${stats.streak.current_streak}<span class="stat-unit">ngày</span></div>
                    <div class="stat-subtitle">dài nhất: ${stats.streak.longest_streak}</div>
                </div>

                <div class="stat-card rank-card">
                    <div class="stat-header">
                        <span class="stat-icon" style="background: #ede9fe; color: #8b5cf6;">
                            <span class="material-symbols-outlined">${stats.rank.rank_icon || 'military_tech'}</span>
                        </span>
                        <span class="stat-label">Rank</span>
                    </div>
                    <div class="stat-value">${stats.rank.rank_name_vi || 'Newbie'}</div>
                    ${stats.rank.next_rank && stats.rank.next_rank_points ? `
                        <div class="rank-progress">
                            <div class="rank-progress-info">
                                <span>${stats.rank.next_rank_points - stats.rank.total_points} pts đến ${stats.rank.next_rank_name}</span>
                            </div>
                            <div class="rank-progress-bar">
                                <div class="rank-progress-fill" style="width: ${Math.min(stats.rank.progress_percent, 100)}%"></div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>

            <!-- Tabs -->
            <div class="achievements-tabs">
                ${categories.map(c => `
                    <button class="achievement-tab" data-category="${c}" onclick="switchAchievementTab('${c}')">
                        <span class="material-symbols-outlined">${getCategoryIcon(c)}</span>
                        ${getCategoryName(c)}
                        <span class="tab-count">${grouped[c]?.filter(a => a.earned).length || 0}/${grouped[c]?.length || 0}</span>
                    </button>
                `).join('')}
            </div>

            <!-- Achievement List -->
            <div class="achievements-list">
                ${categories.map(c => `
                    <div class="achievements-category" id="category-${c}">
                        <div class="category-header">
                            <span class="category-icon" style="background: ${getCategoryBg(c)}">
                                <span class="material-symbols-outlined">${getCategoryIcon(c)}</span>
                            </span>
                            <span class="category-title">${getCategoryName(c)}</span>
                            <span class="category-count">${grouped[c]?.filter(a => a.earned).length || 0} / ${grouped[c]?.length || 0}</span>
                        </div>
                        <div class="achievements-grid">
                            ${grouped[c] ? grouped[c].map(a => renderAchievementCard(a)).join('') : '<div class="no-achievements">Chưa có thành tựu</div>'}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <style>
            /* Achievements Container */
            .achievements-container {
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                background: #ffffff;
                border-radius: 20px;
                padding: 0;
                font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            }

            /* Header */
            .achievements-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 32px 32px 24px;
                border-bottom: 1px solid #f1f5f9;
                position: sticky;
                top: 0;
                background: #fff;
                z-index: 10;
            }

            .header-left h2 {
                margin: 0 0 4px;
                font-size: 28px;
                font-weight: 700;
                color: #0f172a;
                letter-spacing: -0.02em;
            }

            .header-subtitle {
                margin: 0;
                font-size: 14px;
                color: #64748b;
            }

            .achievements-close {
                background: #f8fafc;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #64748b;
                transition: all 0.2s;
            }

            .achievements-close:hover {
                background: #f1f5f9;
                color: #0f172a;
            }

            /* Stats Row */
            .achievements-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;
                padding: 24px 32px;
                background: #f8fafc;
                border-bottom: 1px solid #f1f5f9;
            }

            .stat-card {
                background: #fff;
                border-radius: 16px;
                padding: 20px;
                box-shadow: 0 1px 4px rgba(0,0,0,0.04);
                transition: all 0.2s;
            }

            .stat-card:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                transform: translateY(-2px);
            }

            .stat-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }

            .stat-icon {
                width: 32px;
                height: 32px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .stat-icon .material-symbols-outlined {
                font-size: 18px;
            }

            .stat-label {
                font-size: 13px;
                font-weight: 500;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .stat-value {
                font-size: 32px;
                font-weight: 700;
                color: #0f172a;
                letter-spacing: -0.02em;
                line-height: 1.1;
            }

            .stat-total {
                font-size: 18px;
                font-weight: 500;
                color: #94a3b8;
            }

            .stat-unit {
                font-size: 14px;
                font-weight: 500;
                color: #64748b;
                margin-left: 4px;
            }

            .stat-subtitle {
                font-size: 12px;
                color: #94a3b8;
                margin-top: 4px;
            }

            .stat-progress {
                margin-top: 12px;
                height: 4px;
                background: #e2e8f0;
                border-radius: 2px;
                overflow: hidden;
            }

            .stat-progress-bar {
                height: 100%;
                border-radius: 2px;
                transition: width 0.3s ease;
            }

            /* Rank Card */
            .rank-card {
                border: 2px solid #ede9fe;
            }

            .rank-progress {
                margin-top: 12px;
            }

            .rank-progress-info {
                font-size: 11px;
                color: #94a3b8;
                margin-bottom: 6px;
            }

            .rank-progress-bar {
                height: 4px;
                background: #e2e8f0;
                border-radius: 2px;
                overflow: hidden;
            }

            .rank-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #8b5cf6, #a78bfa);
                border-radius: 2px;
                transition: width 0.3s ease;
            }

            /* Tabs */
            .achievements-tabs {
                display: flex;
                gap: 8px;
                padding: 20px 32px;
                border-bottom: 1px solid #f1f5f9;
                overflow-x: auto;
            }

            .achievement-tab {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 16px;
                background: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 12px;
                color: #64748b;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                white-space: nowrap;
                transition: all 0.2s;
            }

            .achievement-tab:hover {
                border-color: #cbd5e1;
                color: #0f172a;
            }

            .achievement-tab.active {
                background: #0f172a;
                border-color: #0f172a;
                color: #fff;
            }

            .achievement-tab .material-symbols-outlined {
                font-size: 18px;
            }

            .tab-count {
                font-size: 12px;
                padding: 2px 8px;
                background: #f1f5f9;
                border-radius: 20px;
            }

            .achievement-tab.active .tab-count {
                background: rgba(255,255,255,0.2);
            }

            /* Achievement List */
            .achievements-list {
                padding: 24px 32px 32px;
            }

            .achievements-category {
                display: none;
            }

            .achievements-category.active {
                display: block;
            }

            .category-header {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
            }

            .category-icon {
                width: 36px;
                height: 36px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .category-icon .material-symbols-outlined {
                font-size: 20px;
                color: #fff;
            }

            .category-title {
                font-size: 16px;
                font-weight: 600;
                color: #0f172a;
            }

            .category-count {
                margin-left: auto;
                font-size: 13px;
                color: #94a3b8;
                font-weight: 500;
            }

            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 12px;
            }

            /* Achievement Card */
            .achievement-card {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                background: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 14px;
                transition: all 0.2s;
                position: relative;
            }

            .achievement-card:hover {
                border-color: #cbd5e1;
                box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                transform: translateY(-2px);
            }

            .achievement-card.earned {
                border-color: #dbeafe;
            }

            .achievement-card.locked {
                background: #f8fafc;
            }

            .achievement-icon {
                width: 48px;
                height: 48px;
                border-radius: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .achievement-icon .material-symbols-outlined {
                font-size: 24px;
                color: #fff;
            }

            .achievement-info {
                flex: 1;
                min-width: 0;
            }

            .achievement-name {
                font-weight: 600;
                font-size: 15px;
                color: #0f172a;
                margin-bottom: 2px;
            }

            .achievement-desc {
                font-size: 13px;
                color: #64748b;
                margin-bottom: 6px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .achievement-meta {
                display: flex;
                gap: 12px;
                font-size: 12px;
            }

            .achievement-points {
                color: #8b5cf6;
                font-weight: 600;
            }

            .achievement-rarity {
                text-transform: uppercase;
                font-weight: 600;
                font-size: 11px;
            }

            .achievement-check {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: #10b981;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .achievement-check .material-symbols-outlined {
                font-size: 18px;
                color: #fff;
            }

            .no-achievements {
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px;
                color: #94a3b8;
                font-size: 14px;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .achievements-stats {
                    grid-template-columns: repeat(2, 1fr);
                    padding: 16px;
                }

                .achievements-header,
                .achievements-tabs,
                .achievements-list {
                    padding-left: 16px;
                    padding-right: 16px;
                }

                .achievements-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    `;
}

function getCategoryBg(category: string): string {
    switch (category) {
        case 'problem': return 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
        case 'streak': return 'linear-gradient(135deg, #f59e0b, #d97706)';
        case 'time': return 'linear-gradient(135deg, #10b981, #059669)';
        case 'chapter': return 'linear-gradient(135deg, #8b5cf6, #7c3aed)';
        case 'special': return 'linear-gradient(135deg, #ec4899, #db2777)';
        default: return 'linear-gradient(135deg, #64748b, #475569)';
    }
}

function showAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function closeAchievementsModal() {
    const modal = document.getElementById('achievements-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function switchAchievementTab(category: string) {
    document.querySelectorAll('.achievement-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });

    document.querySelectorAll('.achievements-category').forEach(cat => {
        cat.classList.toggle('active', cat.id === 'category-' + category);
    });
}

async function loadAndShowAchievements() {
    const token = localStorage.getItem('kairust_token');
    if (!token) {
        alert('Vui lòng đăng nhập để xem thành tựu!');
        return;
    }

    const data = await fetchAchievements(token);
    if (data) {
        const modal = document.getElementById('achievements-modal');
        if (modal) {
            modal.innerHTML = renderAchievementsPanel(data);
            switchAchievementTab('problem');
            showAchievementsModal();
        }
    } else {
        alert('Không thể tải thành tựu');
    }
}

// Make functions globally available
(window as any).closeAchievementsModal = closeAchievementsModal;
(window as any).switchAchievementTab = switchAchievementTab;
(window as any).loadAndShowAchievements = loadAndShowAchievements;
(window as any).showAchievementsModal = showAchievementsModal;

// Export for use in other modules
export { loadAndShowAchievements, showAchievementsModal, fetchAchievements, getCachedAchievements };
export type { AchievementStats };
