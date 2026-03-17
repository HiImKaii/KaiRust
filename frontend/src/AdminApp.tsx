import { useState, useEffect } from 'react'

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
        <div className="spinner"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <div className="login-logo-blob">⚙️</div>
          <h1>KaiRust Admin</h1>
          <p>Quản lý hệ thống học tập</p>
          {error && <div className="login-error">{error}</div>}
          <form onSubmit={login}>
            <input
              type="password"
              placeholder="Mật khẩu admin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div className="admin-brand">
          <div className="brand-blob">⚙️</div>
          <span className="brand-text">KaiRust Admin</span>
        </div>
        <nav className="admin-nav">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </nav>
        <button className="logout-btn" onClick={logout}>
          Đăng xuất
        </button>
      </header>

      <main className="admin-main">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h2>Tổng quan hệ thống</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">{stats?.total_users || 0}</div>
                <div className="stat-label">Tổng số học viên</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats?.total_lessons || 0}</div>
                <div className="stat-label">Bài học đã tiếp cận</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{stats?.total_completions || 0}</div>
                <div className="stat-label">Tổng lượt hoàn thành</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-page">
            <div className="users-header">
              <h2>Quản lý người dùng</h2>
              <div className="users-toolbar">
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên hoặc email..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(0)
                  }}
                />
              </div>
            </div>

            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Người dùng</th>
                    <th>Email</th>
                    <th>Ngày tham gia</th>
                    <th>Số bài tập</th>
                    <th>Thời gian học</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={{ fontWeight: 700, opacity: 0.5 }}>#{user.id}</td>
                      <td style={{ fontWeight: 700 }}>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                      <td style={{ fontWeight: 700, color: '#7c3aed' }}>{user.completed_lessons}</td>
                      <td>{formatTime(user.total_time_spent)}</td>
                      <td>
                        <button
                          className="action-btn view"
                          onClick={() => loadUserDetail(user.id)}
                        >
                          Chi tiết
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => deleteUser(user.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button disabled={page === 0} onClick={() => setPage(page - 1)}>
                Trước
              </button>
              <span>
                Trang {page + 1} / {Math.ceil(totalUsers / 20) || 1}
              </span>
              <button
                disabled={(page + 1) * 20 >= totalUsers}
                onClick={() => setPage(page + 1)}
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedUser && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Hồ sơ: {selectedUser.user.username}</h3>
              <button className="modal-close" onClick={() => setSelectedUser(null)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-info">
                <div>
                  <p>Email liên hệ</p>
                  <strong>{selectedUser.user.email}</strong>
                </div>
                <div>
                  <p>Ngày đăng ký</p>
                  <strong>{new Date(selectedUser.user.created_at).toLocaleDateString('vi-VN')}</strong>
                </div>
                <div>
                  <p>Bài tập đã xong</p>
                  <strong>{selectedUser.user.completed_lessons} bài</strong>
                </div>
                <div>
                  <p>Thời gian tích lũy</p>
                  <strong>{formatTime(selectedUser.user.total_time_spent)}</strong>
                </div>
              </div>
              <h4>Tiến trình chi tiết</h4>
              <div className="progress-list">
                {selectedUser.progress.length === 0 ? (
                  <p className="no-data">Chưa có dữ liệu tiến trình</p>
                ) : (
                  selectedUser.progress.map((p, i) => (
                    <div key={i} className="progress-item">
                      <span className="lesson-id">{p.lesson_id}</span>
                      <span className="lesson-time">
                        {formatTime(p.time_spent_seconds)}
                      </span>
                      <span className="lesson-date">
                        {new Date(p.completed_at).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  ))
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
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
}
