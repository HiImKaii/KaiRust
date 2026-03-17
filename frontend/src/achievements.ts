// =====================================================
// Achievements UI - Badge display and management
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
            // Cache the data
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
// UI Rendering
// =====================================================

function getRarityColor(rarity: string): string {
    switch (rarity) {
        case 'bronze': return '#cd7f32';
        case 'silver': return '#c0c0c0';
        case 'gold': return '#ffd700';
        case 'platinum': return '#e5e4e2';
        default: return '#888';
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

function formatTime(seconds: number): string {
    if (seconds < 60) return seconds + 's';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h';
    return Math.floor(seconds / 86400) + 'd';
}

function renderAchievementCard(a: AchievementWithStatus): string {
    const rarityColor = getRarityColor(a.achievement.rarity);
    const opacity = a.earned ? '1' : '0.4';
    const earnedClass = a.earned ? 'earned' : 'locked';

    return `
        <div class="achievement-card ${earnedClass}" data-id="${a.achievement.id}" style="opacity: ${opacity}">
            <div class="achievement-icon" style="background: linear-gradient(135deg, ${rarityColor}, ${rarityColor}88)">
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
            ${a.earned ? `<div class="achievement-check">✓</div>` : ''}
        </div>
    `;
}

function renderAchievementsPanel(data: { achievements: AchievementWithStatus[], stats: AchievementStats }): string {
    const { achievements, stats } = data;

    // Group by category
    const categories = ['problem', 'streak', 'time', 'chapter', 'special'];
    const grouped: Record<string, AchievementWithStatus[]> = {};

    for (const c of categories) {
        grouped[c] = achievements.filter(a => a.achievement.category === c);
    }

    return `
        <div class="achievements-container">
            <div class="achievements-header">
                <h2>Thành Tựu</h2>
                <button class="achievements-close" onclick="closeAchievementsModal()">×</button>
            </div>

            <div class="achievements-stats">
                <div class="stat-card">
                    <div class="stat-icon">
                        <span class="material-symbols-outlined">emoji_events</span>
                    </div>
                    <div class="stat-value">${stats.earned_achievements}/${stats.total_achievements}</div>
                    <div class="stat-label">Thành Tựu</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <span class="material-symbols-outlined">star</span>
                    </div>
                    <div class="stat-value">${stats.total_points}</div>
                    <div class="stat-label">Điểm</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <span class="material-symbols-outlined">local_fire_department</span>
                    </div>
                    <div class="stat-value">${stats.streak.current_streak}</div>
                    <div class="stat-label">Ngày Streak</div>
                </div>
                <div class="stat-card rank-card">
                    <div class="stat-icon rank-icon">
                        <span class="material-symbols-outlined">${stats.rank.rank_icon}</span>
                    </div>
                    <div class="stat-value">${stats.rank.rank_name_vi}</div>
                    <div class="stat-label">Rank</div>
                    ${stats.rank.next_rank && stats.rank.next_rank_points ? `
                        <div class="rank-progress">
                            <div class="rank-progress-bar" style="width: ${stats.rank.progress_percent}%"></div>
                        </div>
                        <div class="rank-next">${stats.rank.next_rank_points - stats.rank.total_points} pts đến ${stats.rank.next_rank_name}</div>
                    ` : ''}
                </div>
            </div>

            <div class="achievements-tabs">
                ${categories.map(c => `
                    <button class="achievement-tab" data-category="${c}" onclick="switchAchievementTab('${c}')">
                        ${getCategoryName(c)}
                    </button>
                `).join('')}
            </div>

            <div class="achievements-list">
                ${categories.map(c => `
                    <div class="achievements-category" id="category-${c}">
                        ${grouped[c] ? grouped[c].map(a => renderAchievementCard(a)).join('') : ''}
                    </div>
                `).join('')}
            </div>
        </div>

        <style>
            .achievements-container {
                max-width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                background: var(--bg-secondary, #1a1a2e);
                border-radius: 16px;
                padding: 24px;
            }
            .achievements-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 24px;
            }
            .achievements-header h2 {
                margin: 0;
                color: var(--text-primary, #fff);
            }
            .achievements-close {
                background: none;
                border: none;
                font-size: 32px;
                color: var(--text-secondary, #aaa);
                cursor: pointer;
                padding: 0 8px;
            }
            .achievements-stats {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 16px;
                margin-bottom: 24px;
            }
            .stat-card {
                background: var(--bg-tertiary, #16213e);
                border-radius: 12px;
                padding: 16px;
                text-align: center;
            }
            .stat-icon {
                font-size: 32px;
                margin-bottom: 8px;
            }
            .stat-value {
                font-size: 24px;
                font-weight: bold;
                color: var(--text-primary, #fff);
            }
            .stat-label {
                font-size: 12px;
                color: var(--text-secondary, #aaa);
                text-transform: uppercase;
            }
            .rank-card {
                border: 2px solid var(--accent, #7c3aed);
            }
            .rank-progress {
                height: 4px;
                background: var(--bg-tertiary, #333);
                border-radius: 2px;
                margin: 8px 0 4px;
                overflow: hidden;
            }
            .rank-progress-bar {
                height: 100%;
                background: var(--accent, #7c3aed);
                transition: width 0.3s;
            }
            .rank-next {
                font-size: 10px;
                color: var(--text-secondary, #aaa);
            }
            .achievements-tabs {
                display: flex;
                gap: 8px;
                margin-bottom: 16px;
                flex-wrap: wrap;
            }
            .achievement-tab {
                padding: 8px 16px;
                background: var(--bg-tertiary, #16213e);
                border: none;
                border-radius: 20px;
                color: var(--text-secondary, #aaa);
                cursor: pointer;
                transition: all 0.2s;
            }
            .achievement-tab.active {
                background: var(--accent, #7c3aed);
                color: white;
            }
            .achievements-list {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .achievements-category {
                display: none;
            }
            .achievements-category.active {
                display: block;
            }
            .achievement-card {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                background: var(--bg-tertiary, #16213e);
                border-radius: 12px;
                transition: transform 0.2s;
            }
            .achievement-card:hover {
                transform: translateX(4px);
            }
            .achievement-card.locked {
                filter: grayscale(0.5);
            }
            .achievement-icon {
                width: 56px;
                height: 56px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                flex-shrink: 0;
            }
            .achievement-icon .material-symbols-outlined {
                color: white;
            }
            .achievement-info {
                flex: 1;
            }
            .achievement-name {
                font-weight: bold;
                font-size: 16px;
                color: var(--text-primary, #fff);
                margin-bottom: 4px;
            }
            .achievement-desc {
                font-size: 13px;
                color: var(--text-secondary, #aaa);
                margin-bottom: 8px;
            }
            .achievement-meta {
                display: flex;
                gap: 12px;
                font-size: 12px;
            }
            .achievement-points {
                color: var(--accent, #7c3aed);
                font-weight: bold;
            }
            .achievement-rarity {
                text-transform: uppercase;
                font-weight: bold;
            }
            .achievement-check {
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: #22c55e;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
            }
            @media (max-width: 768px) {
                .achievements-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        </style>
    `;
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
    // Update tab buttons
    document.querySelectorAll('.achievement-tab').forEach(tab => {
        tab.classList.toggle('active', tab.getAttribute('data-category') === category);
    });

    // Update category visibility
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
            // Show first category by default
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
export { loadAndShowAchievements, showAchievementsModal };
