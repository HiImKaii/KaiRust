// =====================================================
// KaiRust Dashboard - Light Bento Grid Theme (Redesigned)
// =====================================================

import { ProgressManager } from './progress';
import {
    courses,
    getCourseProgress,
    getDashboardStats,
    getRecentActivity,
} from './dashboard_data';
import { fetchAchievements, getCachedAchievements } from './achievements';

interface DashStats {
    totalPoints: number;
    rankNameVi: string;
    rankPts: number;
    nextRankPts: number | null;
    streak: number;
    longestStreak: number;
    earnedAch: number;
    totalAch: number;
}

let stats: DashStats | null = null;
const THEME_COLORS = ['bg-green-light', 'bg-blue-light', 'bg-yellow-light', 'bg-purple-light'];
const FILL_COLORS = ['bg-green', 'bg-blue', 'bg-yellow', 'bg-purple'];

export function initDashboard(): void {
    const app = document.getElementById('app');
    if (!app) return;

    const completed = ProgressManager.getCompletedLessons();
    const lessonStats = getDashboardStats(courses, completed);

    const cached = getCachedAchievements();
    if (cached) stats = buildStats(cached.stats);

    render(completed, lessonStats);
    attachSidebarHandlers();

    const token = localStorage.getItem('kairust_token');
    if (token) {
        fetchAchievements(token).then(r => {
            if (r) {
                stats = buildStats(r.stats);
                render(completed, lessonStats);
                attachSidebarHandlers();
            }
        }).catch(() => {});
    } else {
        stats = emptyStats();
    }
}

function attachSidebarHandlers(): void {
    setupSettingsModal();

    // Click sidebar profile → open settings
    const profileEl = document.getElementById('sidebar-user-profile');
    profileEl?.addEventListener('click', () => {
        openSettingsModal();
    });
}

function render(completed: string[], ls: ReturnType<typeof getDashboardStats>): void {
    const app = document.getElementById('app');
    if (!app) return;

    const username = getUsername();
    const nameText = username ? esc(username) : 'Người dùng';

    app.innerHTML = `
        <div class="dash-layout">
            ${renderSidebar(nameText)}
            <main class="dash-main">
                ${renderHeader(nameText)}
                <div class="dash-content-grid">
                    <div class="dash-center-column">
                        ${renderQuickActions()}
                        ${renderStatsRow(ls)}
                        ${renderActivityMap(completed)}
                        ${renderCoursesSection(completed)}
                    </div>
                    <div class="dash-right-column">
                        ${renderTeamWidget()}
                        ${renderUpcomingMeeting(completed)}
                    </div>
                </div>
            </main>
        </div>
    `;

    (window as any).__completed = completed;
    (window as any).__ls = ls;

    animate();
}

// =====================================================
// Components
// =====================================================

function renderSidebar(nameText: string): string {
    return `
        <aside class="sidebar">
            <div class="sidebar-user" id="sidebar-user-profile" style="cursor:pointer;" title="Cài đặt tài khoản">
                <div class="user-avatar" id="sidebar-user-avatar">${nameText.slice(-1).toUpperCase()}</div>
                <div class="user-info">
                    <div class="user-name" id="sidebar-user-name">${nameText}</div>
                    <div class="user-role">Học viên</div>
                </div>
                <button class="icon-toggle" id="sidebar-user-caret" style="font-size:13px;">•••</button>
            </div>

            <button class="btn-primary-black" onclick="window.location.href='/practice'">+ Bắt đầu học</button>

            <nav class="sidebar-nav">
                <div class="nav-section-title">Menu chính</div>
                <a class="nav-item active">
                    <!-- icon removed -->
                    <span>Dashboard</span>
                </a>
                <a class="nav-item" href="/practice">
                    <!-- icon removed -->
                    <span>Luyện tập</span>
                </a>
                <a class="nav-item" href="/">
                    <!-- icon removed -->
                    <span>Lý thuyết</span>
                </a>
                <div class="nav-section-title" style="margin-top: 24px;">Tiện ích</div>
                <a class="nav-item">
                    <!-- icon removed -->
                    <span>Bảng xếp hạng</span>
                </a>
                <a class="nav-item">
                    <!-- icon removed -->
                    <span>Huy hiệu</span>
                    <span class="nav-badge">${stats?.earnedAch ?? 0}</span>
                </a>
            </nav>

            <div class="sidebar-bottom">
                <a class="nav-item text-muted">
                    <!-- icon removed -->
                    <span>Trợ giúp</span>
                </a>
            </div>
        </aside>
    `;
}

function renderHeader(nameText: string): string {
    return `
        <header class="top-header">
            <div class="header-breadcrumb">
                <span class="text-muted">KaiRust</span> 
                <span class="text-muted" style="margin: 0 8px;">›</span> 
                <strong>Dashboard</strong>
            </div>
            
            <div class="header-main-row">
                <h1 class="header-title">Dashboard</h1>
                
                <div class="header-actions">
                    <div class="search-box">
                        <input type="text" placeholder="Tìm kiếm khóa học..."/>
                    </div>
                    <button class="btn-black-outline" style="position: relative;">
                        Thông báo
                        <div class="notification-dot" style="top: -2px; right: -2px;"></div>
                    </button>
                    <button class="btn-black-outline">Trang chủ</button>
                </div>
            </div>
        </header>
    `;
}

function renderQuickActions(): string {
    return `
        <div class="quick-actions-grid">
            <div class="quick-action-card" onclick="window.location.href='/'">
                <span class="qa-title">Học lý thuyết</span>
            </div>
            <div class="quick-action-card" onclick="window.location.href='/practice'">
                <span class="qa-title">Bắt đầu thực hành</span>
            </div>
            <div class="quick-action-card">
                <span class="qa-title">Xem nhiệm vụ</span>
            </div>
            <div class="quick-action-card">
                <span class="qa-title">Kho huy hiệu</span>
            </div>
        </div>
    `;
}

function renderStatsRow(ls: any): string {
    const s = stats;
    return `
        <div class="stats-row">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Điểm tích lũy</span>
                    <button class="icon-toggle">•••</button>
                </div>
                <div class="stat-value">
                    ${fmt(s?.totalPoints ?? 0)}
                    <span class="stat-unit text-muted" style="font-size: 14px; font-weight: 500;">pts</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Bài đã học</span>
                    <button class="icon-toggle">•••</button>
                </div>
                <div class="stat-value">
                    ${ls.lessonsCompleted}
                    <span class="stat-unit text-muted" style="font-size: 14px; font-weight: 500;">/ ${ls.totalLessons} bài</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Chuỗi học tập</span>
                    <button class="icon-toggle">•••</button>
                </div>
                <div class="stat-value">
                    ${s?.streak ?? 0}
                    <span class="stat-unit text-muted" style="font-size: 14px; font-weight: 500;">ngày</span>
                </div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-title">Hạng hiện tại</span>
                    <button class="icon-toggle">•••</button>
                </div>
                <div class="stat-value">
                    ${esc(s?.rankNameVi ?? '—')}
                </div>
            </div>
        </div>
    `;
}

function renderActivityMap(completed: string[]): string {
    let timelinesHtml = '';

    courses.forEach((c, i) => {
        const prog = getCourseProgress(c, completed);
        const colorLight = THEME_COLORS[i % 4];
        const colorDark = FILL_COLORS[i % 4];
        
        timelinesHtml += `
            <div class="timeline-row">
                <div class="timeline-title">${esc(c.title_vi)}</div>
                <div class="timeline-track bg-gray-light">
                    <!-- Progress line representing the gantt chart -->
                    <div class="timeline-bar ${colorLight}" style="width: ${Math.max(prog.percentComplete, 5)}%">
                        <div class="timeline-fill ${colorDark}" style="width: ${prog.percentComplete}%"></div>
                        <span class="timeline-pct">${prog.percentComplete}%</span>
                    </div>
                </div>
            </div>
        `;
    });

    return `
        <div class="bento-card activity-map">
            <div class="bento-header">
                <h2>Tiến độ tổng quát</h2>
                <div class="bento-filters">
                    <span class="filter active">Tất cả</span>
                    <span class="filter">Lý thuyết</span>
                    <span class="filter">Luyện tập</span>
                </div>
            </div>
            <div class="timeline-container">
                <div class="timeline-grid-lines">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                </div>
                <div class="timeline-content">
                    ${timelinesHtml}
                </div>
            </div>
        </div>
    `;
}

function renderCoursesSection(completed: string[]): string {
    let coursesHtml = '';

    courses.forEach((c, i) => {
        const prog = getCourseProgress(c, completed);
        const modeLabel = c.mode === 'theory' ? 'Lý thuyết' : 'Luyện tập';
        const badgeColor = c.mode === 'theory' ? 'bg-orange-light text-orange' : 'bg-blue-light text-blue';
        const colorFill = FILL_COLORS[i % 4];

        coursesHtml += `
            <div class="course-card" onclick="window.location.href='${c.mode === 'practice' ? '/practice' : '/'}'">
                <div class="course-card-top" style="justify-content: flex-end;">
                    <button class="icon-toggle" onclick="event.stopPropagation()">•••</button>
                </div>
                
                <h3 class="course-title">${esc(c.title_vi)}</h3>
                <p class="course-desc">${esc(c.description)}</p>
                
                <div class="course-badge ${badgeColor}">${modeLabel}</div>
                
                <div class="course-progress-container">
                    <div class="cp-bar bg-gray-light">
                        <div class="cp-fill ${colorFill}" data-pct="${prog.percentComplete}"></div>
                    </div>
                </div>
            </div>
        `;
    });

    return `
        <div class="courses-section">
            <div class="bento-header" style="margin-bottom: 20px;">
                <h2>Khóa học hôm nay</h2>
                <button class="btn-black-outline">
                    <span>+</span> Tiến độ khóa học
                </button>
            </div>
            <div class="course-grid">
                ${coursesHtml}
            </div>
        </div>
    `;
}

function renderTeamWidget(): string {
    const totalAch = stats?.totalAch ?? 0;
    const earnedAch = stats?.earnedAch ?? 0;

    let gridHtml = '';
    const toShow = Math.max(earnedAch, 4);

    for (let i = 0; i < toShow && i < 8; i++) {
        const isDone = i < earnedAch;
        const avatarColor = isDone ? 'bg-green-light text-green' : 'bg-gray-light text-muted';
        const role = isDone ? 'Đã đạt' : 'Chưa hoàn thành';
        const name = isDone ? 'Huy hiệu' : '???';
        
        gridHtml += `
            <div class="team-member">
                <div class="team-avatar ${avatarColor}"></div>
                <div class="team-info">
                    <div class="team-name">${name}</div>
                    <div class="team-role">${role}</div>
                </div>
            </div>
        `;
    }

    return `
        <div class="bento-card">
            <div class="bento-header">
                <h2>Bảng theo dõi</h2>
                <button class="icon-toggle">•••</button>
            </div>
            <div class="team-list">
                ${gridHtml}
            </div>
            <div class="team-footer">
                <div class="team-footer-text">
                    <strong>Đạt ${earnedAch} / ${totalAch}</strong> huy hiệu
                </div>
            </div>
        </div>
    `;
}

function renderUpcomingMeeting(completed: string[]): string {
    const acts = getRecentActivity(completed, 4);
    
    let html = '';
    
    if (acts.length === 0) {
        html = `<div class="empty-state">Chưa có hoạt động nào</div>`;
    } else {
        html = acts.map(a => `
            <div class="meeting-item">
                <div class="meeting-info">
                    <div class="meeting-title">${esc(a.title)}</div>
                    <div class="meeting-time">
                        <span class="text-muted">${relTime(a.timestamp)}</span>
                    </div>
                </div>
                <div class="meeting-avatars">
                    <div class="meeting-dot ${a.type === 'achievement_earned' ? 'bg-green' : 'bg-blue'}"></div>
                </div>
            </div>
        `).join('');
    }

    return `
        <div class="bento-card upcoming-meetings" style="margin-top: 24px;">
            <div class="bento-header">
                <h2>Hoạt động gần đây</h2>
                <button class="icon-toggle">•••</button>
            </div>
            <div class="meeting-list">
                ${html}
            </div>
        </div>
    `;
}

// =====================================================
// Helpers
// =====================================================

function buildStats(s: any): DashStats {
    return {
        totalPoints: s.total_points ?? 0,
        rankNameVi: s.rank?.rank_name_vi ?? '—',
        rankPts: s.rank?.total_points ?? 0,
        nextRankPts: s.rank?.next_rank_points ?? null,
        streak: s.streak?.current_streak ?? 0,
        longestStreak: s.streak?.longest_streak ?? 0,
        earnedAch: s.earned_achievements ?? 0,
        totalAch: s.total_achievements ?? 0,
    };
}

function emptyStats(): DashStats {
    return { totalPoints: 0, rankNameVi: '—', rankPts: 0, nextRankPts: null, streak: 0, longestStreak: 0, earnedAch: 0, totalAch: 0 };
}

function getUsername(): string | null {
    const userStr = localStorage.getItem('kairust_user');
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            if (user && user.username) return user.username;
        } catch { /* ignore */ }
    }
    const token = localStorage.getItem('kairust_token');
    if (!token) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
        return payload.username || payload.sub || null;
    } catch { return null; }
}

function esc(text: string): string {
    const d = document.createElement('div');
    d.textContent = text;
    return d.innerHTML;
}

function fmt(num: number): string {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : String(num);
}

function relTime(iso: string): string {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const m = Math.floor(diff / 60000);
    const h = Math.floor(m / 60);
    const days = Math.floor(h / 24);
    if (m < 1) return 'vừa xong';
    if (m < 60) return `${m} phút trước`;
    if (h < 24) return `${h} giờ trước`;
    if (days === 1) return 'Hôm qua';
    if (days < 7) return `${days} ngày trước`;
    return d.toLocaleDateString('vi', { day: 'numeric', month: 'short' });
}

function animate(): void {
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll<HTMLElement>('[data-pct]').forEach(el => {
                el.style.width = (el.dataset.pct || '0') + '%';
            });
        }, 100);
    });
}

// =====================================================
// Settings Modal
// =====================================================

interface DashUserInfo {
    id: number;
    username: string;
    email: string;
    full_name: string;
    bio: string;
    avatar_url: string;
    location: string;
    github_username: string;
    website: string;
    company_school: string;
}

function getCurrentUser(): DashUserInfo | null {
    const userStr = localStorage.getItem('kairust_user');
    if (!userStr) return null;
    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

function saveUser(user: DashUserInfo): void {
    localStorage.setItem('kairust_user', JSON.stringify(user));
}

export function showSettingsModal(): void {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('hidden');
}

function hideSettingsModal(): void {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
}

export function openSettingsModal(): void {
    const user = getCurrentUser();
    if (!user) return;

    const displayName = user.full_name || user.username;
    const initial = displayName.charAt(0).toUpperCase();

    const setVal = (id: string, val: string) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
        if (el) el.value = val;
    };

    const usernameEl = document.getElementById('dash-settings-username');
    const emailEl = document.getElementById('dash-settings-email');
    const avatarEl = document.getElementById('dash-settings-avatar');
    const imgPreview = document.getElementById('dash-settings-img-preview') as HTMLImageElement | null;
    const avatarPanel = document.getElementById('dash-settings-avatar-panel');
    const bioEl = document.getElementById('dash-settings-bio') as HTMLTextAreaElement | null;
    const bioCount = document.getElementById('dash-bio-count');

    // Update modal header
    if (usernameEl) usernameEl.textContent = displayName;
    if (emailEl) emailEl.textContent = user.email;

    // Avatar preview
    if (user.avatar_url && user.avatar_url.trim()) {
        if (avatarEl) avatarEl.innerHTML = `<img src="${user.avatar_url}" alt="avatar" style="width:100%;height:100%;object-fit:cover;">`;
        if (imgPreview) { imgPreview.src = user.avatar_url; imgPreview.style.display = 'block'; }
    } else {
        if (avatarEl) avatarEl.textContent = initial;
        if (imgPreview) imgPreview.style.display = 'none';
    }

    // Update sidebar avatar/name from current user
    updateSidebarProfile();

    // Reset file input
    const fileInput = document.getElementById('dash-settings-avatar-file') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';

    // Populate form
    setVal('dash-settings-fullname', user.full_name || '');
    setVal('dash-settings-company', user.company_school || '');
    setVal('dash-settings-location', user.location || '');
    setVal('dash-settings-bio', user.bio || '');
    setVal('dash-settings-github', user.github_username || '');
    setVal('dash-settings-website', user.website || '');

    if (bioEl && bioCount) bioCount.textContent = bioEl.value.length.toString();
    if (avatarPanel) avatarPanel.classList.add('hidden');

    showSettingsModal();
}

function updateSidebarProfile(): void {
    const user = getCurrentUser();
    if (!user) return;
    const displayName = user.full_name || user.username;
    const initial = displayName.charAt(0).toUpperCase();

    const nameEl = document.getElementById('sidebar-user-name');
    const avatarSidebarEl = document.getElementById('sidebar-user-avatar');

    if (nameEl) nameEl.textContent = displayName;

    if (user.avatar_url && user.avatar_url.trim()) {
        if (avatarSidebarEl) {
            avatarSidebarEl.innerHTML = `<img src="${user.avatar_url}" alt="avatar" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">`;
        }
    } else {
        if (avatarSidebarEl) avatarSidebarEl.textContent = initial;
    }
}

export function setupSettingsModal(): void {
    const modal = document.getElementById('settings-modal');
    const closeBtn = document.getElementById('settings-modal-close');
    const saveBtn = document.getElementById('dash-settings-save') as HTMLButtonElement | null;
    const logoutBtn = document.getElementById('dash-settings-logout');
    const avatarEditBtn = document.getElementById('dash-settings-avatar-edit');
    const avatarPanel = document.getElementById('dash-settings-avatar-panel');
    const fileInput = document.getElementById('dash-settings-avatar-file') as HTMLInputElement | null;
    const avatarEl = document.getElementById('dash-settings-avatar');
    const bioEl = document.getElementById('dash-settings-bio') as HTMLTextAreaElement | null;
    const bioCount = document.getElementById('dash-bio-count');

    // Close modal
    closeBtn?.addEventListener('click', hideSettingsModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) hideSettingsModal();
    });

    // Bio char counter
    bioEl?.addEventListener('input', () => {
        if (bioCount) bioCount.textContent = bioEl.value.length.toString();
    });

    // File upload live preview
    fileInput?.addEventListener('change', () => {
        const file = fileInput.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const dataUrl = reader.result as string;
            // Preview in modal
            if (avatarEl) avatarEl.innerHTML = `<img src="${dataUrl}" alt="avatar" style="width:100%;height:100%;object-fit:cover;">`;
            // Show preview in panel
            const imgPreview = document.getElementById('dash-settings-img-preview') as HTMLImageElement | null;
            if (imgPreview) { imgPreview.src = dataUrl; imgPreview.style.display = 'block'; }
        };
        reader.readAsDataURL(file);
    });

    // Toggle avatar panel
    avatarEditBtn?.addEventListener('click', () => {
        avatarPanel?.classList.toggle('hidden');
    });

    // Logout
    logoutBtn?.addEventListener('click', () => {
        if (confirm('Bạn có muốn đăng xuất?')) {
            localStorage.removeItem('kairust_token');
            localStorage.removeItem('kairust_user');
            window.location.reload();
        }
    });

    // Save
    saveBtn?.addEventListener('click', async () => {
        const user = getCurrentUser();
        if (!user) return;

        const originalText = saveBtn.textContent;
        saveBtn.disabled = true;
        saveBtn.textContent = 'Đang lưu...';

        // Read file as base64 if selected
        let avatarUrl = user.avatar_url || '';
        const fileInput = document.getElementById('dash-settings-avatar-file') as HTMLInputElement | null;
        const file = fileInput?.files?.[0];
        if (file) {
            avatarUrl = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.readAsDataURL(file);
            });
        }

        const payload = {
            full_name: (document.getElementById('dash-settings-fullname') as HTMLInputElement)?.value || '',
            company_school: (document.getElementById('dash-settings-company') as HTMLInputElement)?.value || '',
            location: (document.getElementById('dash-settings-location') as HTMLInputElement)?.value || '',
            bio: (document.getElementById('dash-settings-bio') as HTMLTextAreaElement)?.value || '',
            github_username: (document.getElementById('dash-settings-github') as HTMLInputElement)?.value || '',
            website: (document.getElementById('dash-settings-website') as HTMLInputElement)?.value || '',
            avatar_url: avatarUrl,
        };

        try {
            const token = localStorage.getItem('kairust_token');
            if (!token) throw new Error('No token');

            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.success && data.user) {
                saveUser(data.user);
                const newName = data.user.full_name || data.user.username;

                // Update modal header
                const usernameEl = document.getElementById('dash-settings-username');
                if (usernameEl) usernameEl.textContent = newName;

                // Update sidebar profile immediately
                updateSidebarProfile();

                saveBtn.textContent = '✓ Đã lưu!';
                setTimeout(() => {
                    saveBtn.textContent = originalText;
                    saveBtn.disabled = false;
                }, 1500);
            } else {
                alert(data.message || 'Lưu thất bại');
                saveBtn.textContent = originalText;
                saveBtn.disabled = false;
            }
        } catch (err) {
            console.error('Failed to save profile:', err);
            alert('Không thể kết nối server. Vui lòng thử lại.');
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }
    });
}
