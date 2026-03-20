import { useState, useEffect } from 'react'

/* ─────────────────────────────────────────────────
   Types
───────────────────────────────────────────────── */
interface User {
  id: number
  username: string
  email: string
  created_at: string
  completed_lessons: number
  total_time_spent: number
}

interface Stats {
  total_users: number
  total_lessons: number
  total_completions: number
}

interface UserProgress {
  lesson_id: string
  completed_at: string
  time_spent_seconds: number
}

interface UserDetail {
  user: User
  progress: UserProgress[]
}

const API_BASE = '/api'

async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  return res.json()
}

/* ─────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────── */
function formatTime(s: number) {
  if (s < 60) return `${s}s`
  if (s < 3600) return `${Math.floor(s / 60)}m`
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}p`
}

function clsx(...args: (string | false | undefined | null)[]) {
  return args.filter(Boolean).join(' ')
}

/* ─────────────────────────────────────────────────
   Login Screen
───────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: (ok: boolean) => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await apiCall<{ success: boolean; message?: string }>('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })
      if (data.success) onLogin(true)
      else setError(data.message || 'Đăng nhập thất bại')
    } catch {
      setError('Lỗi kết nối')
    }
    setLoading(false)
  }

  return (
    <div className="pp-login-wrap">
      <div className="pp-login-card">
        {/* Logo */}
        <div className="pp-login-logo">
          <div className="pp-logo-blob">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="pp-logo-text">KaiRust</span>
        </div>

        <div className="pp-login-divider" />

        <div className="pp-login-body">
          <h1 className="pp-login-title">Chào mừng trở lại</h1>
          <p className="pp-login-sub">Đăng nhập admin để quản lý hệ thống</p>
        </div>

        {error && <div className="pp-alert pp-alert-error">{error}</div>}

        <form onSubmit={login} className="pp-form">
          <div className="pp-field">
            <label className="pp-label">Mật khẩu</label>
            <div className="pp-input-wrap">
              <svg className="pp-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                className="pp-input"
                type="password"
                placeholder="Nhập mật khẩu admin"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
              />
            </div>
          </div>

          <button type="submit" className="pp-btn-primary pp-btn-full" disabled={loading}>
            {loading ? (
              <span className="pp-btn-loading">
                <span className="pp-spinner" />
                Đang đăng nhập...
              </span>
            ) : (
              <>
                Đăng nhập
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="pp-login-bg-shape shape-1" />
      <div className="pp-login-bg-shape shape-2" />
      <div className="pp-login-bg-shape shape-3" />
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Pill Badge
───────────────────────────────────────────────── */
function Pill({ label, color = 'purple' }: { label: string; color?: string }) {
  return <span className={`pp-pill pp-pill-${color}`}>{label}</span>
}

/* ─────────────────────────────────────────────────
   Stat Card
───────────────────────────────────────────────── */
function StatCard({
  icon,
  value,
  label,
  sub,
  color = 'purple',
  onClick,
}: {
  icon: React.ReactNode
  value: string | number
  label: string
  sub?: string
  color?: string
  onClick?: () => void
}) {
  return (
    <div className={clsx('pp-stat-card', `pp-stat-${color}`, onClick ? 'pp-stat-clickable' : '')} onClick={onClick}>
      <div className="pp-stat-icon">{icon}</div>
      <div className="pp-stat-body">
        <div className="pp-stat-value">{value}</div>
        <div className="pp-stat-label">{label}</div>
        {sub && <div className="pp-stat-sub">{sub}</div>}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   User Detail Modal
───────────────────────────────────────────────── */
function UserDetailModal({ detail, onClose }: { detail: UserDetail; onClose: () => void }) {
  const { user, progress } = detail
  const completionRate = user.total_time_spent > 0
    ? Math.min(100, Math.round((user.completed_lessons / 23) * 100))
    : 0

  return (
    <div className="pp-modal-overlay" onClick={onClose}>
      <div className="pp-modal" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="pp-modal-header">
          <div className="pp-modal-user">
            <div className="pp-modal-avatar">{user.username.charAt(0).toUpperCase()}</div>
            <div>
              <div className="pp-modal-username">{user.username}</div>
              <div className="pp-modal-email">{user.email}</div>
            </div>
          </div>
          <button className="pp-modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="pp-modal-body">
          {/* Meta pills */}
          <div className="pp-modal-pills">
            <Pill label={`#${user.id}`} color="gray" />
            <Pill label={`Tham gia ${new Date(user.created_at).toLocaleDateString('vi-VN')}`} color="blue" />
          </div>

          {/* Mini stats */}
          <div className="pp-modal-stats">
            <div className="pp-modal-stat">
              <div className="pp-modal-stat-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <div>
                <div className="pp-modal-stat-val">{user.completed_lessons}</div>
                <div className="pp-modal-stat-lbl">Bài hoàn thành</div>
              </div>
            </div>
            <div className="pp-modal-stat">
              <div className="pp-modal-stat-icon pp-icon-green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div className="pp-modal-stat-val">{formatTime(user.total_time_spent)}</div>
                <div className="pp-modal-stat-lbl">Thời gian học</div>
              </div>
            </div>
            <div className="pp-modal-stat">
              <div className="pp-modal-stat-icon pp-icon-yellow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
              </div>
              <div>
                <div className="pp-modal-stat-val">{completionRate}%</div>
                <div className="pp-modal-stat-lbl">Tiến độ</div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pp-progress-wrap">
            <div className="pp-progress-header">
              <span className="pp-progress-label">Tiến trình chung</span>
              <span className="pp-progress-pct">{completionRate}%</span>
            </div>
            <div className="pp-progress-track">
              <div className="pp-progress-fill" style={{ width: `${completionRate}%` }} />
            </div>
          </div>

          {/* Recent activity */}
          <div className="pp-activity-section">
            <div className="pp-activity-title">Hoạt động gần đây</div>
            {progress.length === 0 ? (
              <div className="pp-no-data">Chưa có dữ liệu tiến trình</div>
            ) : (
              <div className="pp-activity-list">
                {progress.slice(0, 8).map((p, i) => (
                  <div key={i} className="pp-activity-item">
                    <div className="pp-activity-dot" />
                    <div className="pp-activity-info">
                      <span className="pp-activity-lesson">{p.lesson_id}</span>
                      <span className="pp-activity-date">
                        {new Date(p.completed_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <span className="pp-activity-time">{formatTime(p.time_spent_seconds)}</span>
                  </div>
                ))}
                {progress.length > 8 && (
                  <div className="pp-activity-more">+ {progress.length - 8} bài khác</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────
   Main Admin App
───────────────────────────────────────────────── */
export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')

  const [users, setUsers] = useState<User[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [stats, setStats] = useState<Stats | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard')

  const PAGE_SIZE = 20

  useEffect(() => {
    apiCall<{ authenticated: boolean }>('/admin/verify')
      .then(data => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false))
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return
    if (activeTab === 'dashboard') loadStats()
    else loadUsers()
  }, [isAuthenticated, activeTab, page, search])

  const logout = async () => {
    await apiCall('/admin/logout', { method: 'POST' })
    setIsAuthenticated(false)
    setUsers([])
    setStats(null)
    setSelectedUser(null)
  }

  const loadStats = async () => {
    try {
      const data = await apiCall<{ success: boolean } & Stats>('/admin/stats')
      if (data.success) setStats(data)
    } catch {}
  }

  const loadUsers = async () => {
    try {
      const q = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String(page * PAGE_SIZE), ...(search && { search }) })
      const data = await apiCall<{ success: boolean; users: User[]; total: number }>(`/admin/users?${q}`)
      if (data.success) { setUsers(data.users); setTotalUsers(data.total) }
    } catch {}
  }

  const loadUserDetail = async (userId: number) => {
    try {
      const data = await apiCall<{ success: boolean; user: User; progress: UserProgress[] }>(`/admin/users/${userId}`)
      if (data.success) setSelectedUser({ user: data.user, progress: data.progress })
    } catch {}
  }

  const deleteUser = async (userId: number) => {
    if (!confirm('Bạn có chắc muốn xóa người dùng này?')) return
    try {
      await apiCall(`/admin/users/${userId}`, { method: 'DELETE' })
      loadUsers()
    } catch {}
  }

  if (isAuthenticated === null) {
    return (
      <div className="pp-loading-wrap">
        <div className="pp-spinner pp-spinner-lg" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="pp-root">
        <LoginScreen onLogin={setIsAuthenticated} />
      </div>
    )
  }

  const completionRate = stats
    ? (stats.total_lessons > 0 ? Math.round((stats.total_completions / stats.total_lessons) * 100) : 0)
    : 0

  return (
    <div className="pp-root">
      {/* ─── Header ─── */}
      <header className="pp-header">
        <div className="pp-header-left">
          <div className="pp-logo">
            <div className="pp-logo-blob">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="pp-logo-text">KaiRust</span>
          </div>
          <span className="pp-header-divider" />
          <span className="pp-header-sub">Admin Panel</span>
        </div>

        <nav className="pp-nav">
          <button
            className={clsx('pp-nav-btn', activeTab === 'dashboard' && 'pp-nav-active')}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Tổng quan
          </button>
          <button
            className={clsx('pp-nav-btn', activeTab === 'users' && 'pp-nav-active')}
            onClick={() => { setActiveTab('users'); setPage(0) }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Người dùng
          </button>
        </nav>

        <div className="pp-header-right">
          <div className="pp-header-badge">
            <div className="pp-header-dot" />
            Live
          </div>
          <button className="pp-logout-btn" onClick={logout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </header>

      {/* ─── Page Content ─── */}
      <main className="pp-main">

        {/* ── Dashboard ── */}
        {activeTab === 'dashboard' && (
          <div className="pp-page">
            {/* Hero */}
            <div className="pp-hero">
              <div className="pp-hero-left">
                <div className="pp-pill pp-pill-tag">
                  <span className="pp-pill-dot" />
                  Hệ thống đang hoạt động
                </div>
                <h1 className="pp-hero-title">
                  Tổng quan
                  <br />
                  <span className="pp-grad-text">KaiRust</span>
                </h1>
                <p className="pp-hero-desc">
                  Theo dõi hoạt động học tập, quản lý tài khoản và xem thống kê hệ thống.
                </p>
                <div className="pp-hero-actions">
                  <button className="pp-btn-primary" onClick={() => { setActiveTab('users'); setPage(0) }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Quản lý người dùng
                  </button>
                  <button className="pp-btn-outline" onClick={loadStats}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                    Cập nhật dữ liệu
                  </button>
                </div>
              </div>

              {/* Big tile */}
              <div className="pp-hero-right">
                <div className="pp-hero-tile">
                  <div className="pp-hero-tile-header">
                    <span className="pp-hero-tile-title">Hoàn thành khóa học</span>
                    <span className="pp-st-green">Đang hoạt động</span>
                  </div>
                  <div className="pp-hero-big-num">{stats?.total_completions ?? 0}</div>
                  <div className="pp-hero-tile-sub">lượt hoàn thành bài tập</div>
                  <div className="pp-progress-track pp-progress-track-lg">
                    <div className="pp-progress-fill" style={{ width: `${completionRate}%` }} />
                  </div>
                  <div className="pp-hero-tile-footer">
                    <span>Tỷ lệ hoàn thành</span>
                    <span className="pp-pct-badge">{completionRate}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="pp-section-title-row">
              <h2 className="pp-section-title">Số liệu thống kê</h2>
            </div>
            <div className="pp-stats-grid">
              <StatCard
                color="purple"
                value={stats?.total_users ?? 0}
                label="Tổng học viên"
                sub="Đã đăng ký"
                onClick={() => { setActiveTab('users'); setPage(0) }}
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                }
              />
              <StatCard
                color="blue"
                value={stats?.total_lessons ?? 0}
                label="Tổng bài học"
                sub="Chương trình"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                }
              />
              <StatCard
                color="green"
                value={stats?.total_completions ?? 0}
                label="Lượt hoàn thành"
                sub="Bài tập đã nộp"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                }
              />
              <StatCard
                color="yellow"
                value={`${completionRate}%`}
                label="Tỷ lệ hoàn thành"
                sub="Trung bình"
                icon={
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="20" x2="12" y2="10" />
                    <line x1="18" y1="20" x2="18" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="16" />
                  </svg>
                }
              />
            </div>

            {/* Quick mini cards */}
            <div className="pp-section-title-row">
              <h2 className="pp-section-title">Thao tác nhanh</h2>
            </div>
            <div className="pp-quick-grid">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  ),
                  title: 'Tìm người dùng',
                  desc: 'Tìm kiếm, xem chi tiết và quản lý tài khoản',
                  color: 'purple',
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  ),
                  title: 'Xem thống kê',
                  desc: 'Biểu đồ và dữ liệu chi tiết theo thời gian',
                  color: 'blue',
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  ),
                  title: 'Cài đặt hệ thống',
                  desc: 'Cấu hình và tối ưu hóa nền tảng',
                  color: 'gray',
                },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`pp-quick-card pp-quick-${item.color}`}
                  onClick={() => item.title === 'Tìm người dùng' && (setActiveTab('users'), setPage(0))}
                >
                  <div className="pp-quick-icon">{item.icon}</div>
                  <div className="pp-quick-info">
                    <span className="pp-quick-title">{item.title}</span>
                    <span className="pp-quick-desc">{item.desc}</span>
                  </div>
                  <svg className="pp-quick-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Users ── */}
        {activeTab === 'users' && (
          <div className="pp-page">
            {/* Page header */}
            <div className="pp-page-header">
              <div>
                <h1 className="pp-page-title">Người dùng</h1>
                <p className="pp-page-sub">{totalUsers} tài khoản đã đăng ký</p>
              </div>
              <div className="pp-pill pp-pill-purple">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                {totalUsers} học viên
              </div>
            </div>

            {/* Search bar */}
            <div className="pp-search-wrap">
              <div className="pp-search-bar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="pp-search-input"
                  type="text"
                  placeholder="Tìm theo tên hoặc email..."
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(0) }}
                />
                {search && (
                  <button className="pp-search-clear" onClick={() => { setSearch(''); setPage(0) }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Table */}
            <div className="pp-table-wrap">
              {users.length === 0 ? (
                <div className="pp-empty-state">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  <p>Không tìm thấy người dùng nào</p>
                </div>
              ) : (
                <table className="pp-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Người dùng</th>
                      <th>Email</th>
                      <th>Ngày tham gia</th>
                      <th>Bài tập</th>
                      <th>Thời gian</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="pp-table-row">
                        <td className="pp-td-id">#{user.id}</td>
                        <td>
                          <div className="pp-user-cell">
                            <div className="pp-user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                            <span className="pp-user-name">{user.username}</span>
                          </div>
                        </td>
                        <td className="pp-td-email">{user.email}</td>
                        <td className="pp-td-date">{new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                        <td>
                          <div className="pp-lessons-wrap">
                            <span className="pp-lessons-num">{user.completed_lessons}</span>
                          </div>
                        </td>
                        <td className="pp-td-time">{formatTime(user.total_time_spent)}</td>
                        <td>
                          <div className="pp-row-actions">
                            <button
                              className="pp-btn-icon pp-btn-view"
                              onClick={() => loadUserDetail(user.id)}
                              title="Xem chi tiết"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                            <button
                              className="pp-btn-icon pp-btn-delete"
                              onClick={() => deleteUser(user.id)}
                              title="Xóa"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {totalUsers > PAGE_SIZE && (
              <div className="pp-pagination">
                <span className="pp-page-info">
                  Trang {page + 1} · Hiển thị {users.length} / {totalUsers}
                </span>
                <div className="pp-page-btns">
                  <button
                    className="pp-page-btn"
                    disabled={page === 0}
                    onClick={() => setPage(p => p - 1)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="pp-page-num">{page + 1}</span>
                  <button
                    className="pp-page-btn"
                    disabled={(page + 1) * PAGE_SIZE >= totalUsers}
                    onClick={() => setPage(p => p + 1)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedUser && (
        <UserDetailModal detail={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}
