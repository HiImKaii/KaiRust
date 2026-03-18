import { useState, useEffect } from 'react'

interface User {
  id: number
  username: string
  email: string
  password_hash: string
  password: string
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
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  return response.json()
}

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [users, setUsers] = useState<User[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [stats, setStats] = useState<Stats | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users'>('dashboard')

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'dashboard') {
        loadStats()
      } else {
        loadUsers()
      }
    }
  }, [isAuthenticated, activeTab, page, search])

  const checkAuth = async () => {
    try {
      const data = await apiCall<{ authenticated: boolean }>('/admin/verify')
      setIsAuthenticated(data.authenticated)
    } catch {
      setIsAuthenticated(false)
    }
  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await apiCall<{ success: boolean; message?: string }>('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ password }),
      })
      if (data.success) {
        setIsAuthenticated(true)
      } else {
        setError(data.message || 'Login failed')
      }
    } catch {
      setError('Connection error')
    }
    setLoading(false)
  }

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
      if (data.success) {
        setStats(data)
      }
    } catch (err) {
      console.error('Failed to load stats:', err)
    }
  }

  const loadUsers = async () => {
    try {
      const query = new URLSearchParams({
        limit: '20',
        offset: String(page * 20),
        ...(search && { search }),
      })
      const data = await apiCall<{ success: boolean; users: User[]; total: number }>(
        `/admin/users?${query}`
      )
      if (data.success) {
        setUsers(data.users)
        setTotalUsers(data.total)
      }
    } catch (err) {
      console.error('Failed to load users:', err)
    }
  }

  const loadUserDetail = async (userId: number) => {
    try {
      const data = await apiCall<{ success: boolean; user: User; progress: UserProgress[] }>(
        `/admin/users/${userId}`
      )
      if (data.success) {
        setSelectedUser({ user: data.user, progress: data.progress })
      }
    } catch (err) {
      console.error('Failed to load user detail:', err)
    }
  }

  const deleteUser = async (userId: number) => {
    if (!confirm('Bạn có chắc muốn xóa user này?')) return
    try {
      await apiCall(`/admin/users/${userId}`, { method: 'DELETE' })
      loadUsers()
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="login-wrapper">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="url(#logoGrad)"/>
                <path d="M12 28V12L20 20L28 12V28L20 20L12 28Z" fill="white" fillOpacity="0.9"/>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#3B82F6"/>
                    <stop offset="1" stopColor="#8B5CF6"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1>KaiRust Admin</h1>
            <p>Quản lý hệ thống học tập</p>
          </div>
          {error && <div className="login-error">{error}</div>}
          <form onSubmit={login} className="login-form">
            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu admin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="login-btn">
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>KaiRust</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
            <span>Tổng quan</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span>Người dùng</span>
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="page-header">
              <div>
                <h1>Tổng quan</h1>
                <p>Thống kê hệ thống</p>
              </div>
              <span className="header-badge">Admin Panel</span>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Tổng học viên</span>
                  <span className="stat-value">{stats?.total_users || 0}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon lessons">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Bài học</span>
                  <span className="stat-value">{stats?.total_lessons || 0}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon completed">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Lượt hoàn thành</span>
                  <span className="stat-value">{stats?.total_completions || 0}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon rate">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="20" x2="12" y2="10"/>
                    <line x1="18" y1="20" x2="18" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="16"/>
                  </svg>
                </div>
                <div className="stat-info">
                  <span className="stat-label">Tỷ lệ hoàn thành</span>
                  <span className="stat-value">
                    {stats?.total_lessons && stats.total_completions
                      ? Math.round((stats.total_completions / stats.total_lessons) * 100)
                      : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="section">
              <h2 className="section-title">Thao tác nhanh</h2>
              <div className="actions-grid">
                <button className="action-card" onClick={() => setActiveTab('users')}>
                  <div className="action-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  <div className="action-info">
                    <span className="action-title">Tìm người dùng</span>
                    <span className="action-desc">Tìm kiếm và quản lý</span>
                  </div>
                </button>
                <button className="action-card" onClick={loadStats}>
                  <div className="action-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
                      <polyline points="17,6 23,6 23,12"/>
                    </svg>
                  </div>
                  <div className="action-info">
                    <span className="action-title">Xem thống kê</span>
                    <span className="action-desc">Cập nhật dữ liệu</span>
                  </div>
                </button>
                <button className="action-card">
                  <div className="action-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                  </div>
                  <div className="action-info">
                    <span className="action-title">Cài đặt</span>
                    <span className="action-desc">Cấu hình hệ thống</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-page">
            <div className="page-header">
              <div>
                <h1>Người dùng</h1>
                <p>Quản lý tài khoản học viên</p>
              </div>
            </div>

            {/* Search */}
            <div className="toolbar">
              <div className="search-input">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc email..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(0)
                  }}
                />
              </div>
            </div>

            {/* Table */}
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Người dùng</th>
                    <th>Email</th>
                    <th>Ngày tham gia</th>
                    <th>Bài tập</th>
                    <th>Thời gian</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="id-cell">#{user.id}</td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{user.username.charAt(0).toUpperCase()}</div>
                          <span className="user-name">{user.username}</span>
                        </div>
                      </td>
                      <td className="email-cell">{user.email}</td>
                      <td>{new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                      <td className="lessons-cell">{user.completed_lessons}</td>
                      <td>{formatTime(user.total_time_spent)}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="btn-action view"
                            onClick={() => loadUserDetail(user.id)}
                            title="Xem chi tiết"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                          </button>
                          <button
                            className="btn-action delete"
                            onClick={() => deleteUser(user.id)}
                            title="Xóa"
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3,6 5,6 21,6"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="table-footer">
              <span className="page-info">
                Hiển thị {users.length} / {totalUsers} người dùng
              </span>
              <div className="pagination">
                <button
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15,18 9,12 15,6"/>
                  </svg>
                </button>
                <span className="page-number">{page + 1}</span>
                <button
                  disabled={(page + 1) * 20 >= totalUsers}
                  onClick={() => setPage(page + 1)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9,18 15,12 9,6"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-user">
                <div className="modal-avatar">
                  {selectedUser.user.username.charAt(0).toUpperCase()}
                </div>
                <div className="modal-user-info">
                  <h3>{selectedUser.user.username}</h3>
                  <p>{selectedUser.user.email}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setSelectedUser(null)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {/* Stats */}
              <div className="modal-stats">
                <div className="modal-stat">
                  <div className="modal-stat-icon blue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <span className="modal-stat-label">Ngày đăng ký</span>
                    <span className="modal-stat-value">
                      {new Date(selectedUser.user.created_at).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
                <div className="modal-stat">
                  <div className="modal-stat-icon purple">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,11 12,14 22,4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                  </div>
                  <div>
                    <span className="modal-stat-label">Bài tập hoàn thành</span>
                    <span className="modal-stat-value">{selectedUser.user.completed_lessons}</span>
                  </div>
                </div>
                <div className="modal-stat">
                  <div className="modal-stat-icon green">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                  </div>
                  <div>
                    <span className="modal-stat-label">Thời gian học</span>
                    <span className="modal-stat-value">{formatTime(selectedUser.user.total_time_spent)}</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <h4 className="modal-section-title">Tiến trình học tập</h4>
              <div className="progress-list">
                {selectedUser.progress.length === 0 ? (
                  <div className="no-data">Chưa có dữ liệu tiến trình</div>
                ) : (
                  selectedUser.progress.slice(0, 10).map((p, i) => (
                    <div key={i} className="progress-item">
                      <div className="progress-info">
                        <span className="lesson-tag">{p.lesson_id}</span>
                        <span className="lesson-date">
                          {new Date(p.completed_at).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <span className="lesson-duration">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        {formatTime(p.time_spent_seconds)}
                      </span>
                    </div>
                  ))
                )}
                {selectedUser.progress.length > 10 && (
                  <div className="more-items">
                    + {selectedUser.progress.length - 10} bài khác
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}p`
}
