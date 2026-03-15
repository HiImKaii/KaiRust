# KaiRust - Học Lập Trình Rust Trực Tuyến

KaiRust là một nền tảng học Rust trực tuyến với giao diện bài tập theo phong cách LeetCode, cho phép người dùng viết code Rust trực tiếp trên trình duyệt và nộp bài để kiểm tra.

## Mục Lục

1. [Giới Thiệu](#giới-thiệu)
2. [Tính Năng](#tính-năng)
3. [Kiến Trúc Hệ Thống](#kiến-trúc-hệ-thống)
4. [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
5. [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
6. [Cài Đặt](#cài-đặt)
   - [Yêu Cầu Hệ Thống](#yêu-cầu-hệ-thống)
   - [Cài Đặt Môi Trường Phát Triển](#cài-đặt-môi-trường-phát-triển)
   - [Chạy Trên Máy Ảo (Docker)](#chạy-trên-máy-ảo-docker)
7. [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
   - [Đăng Nhập](#đăng-nhập)
   - [Học Lý Thuyết](#học-lý-thuyết)
   - [Làm Bài Tập Thực Hành](#làm-bài-tập-thực-hành)
   - [Nộp Bài Và Chấm Điểm](#nộp-bài-và-chấm-điểm)
8. [Cấu Trúc Bài Tập](#cấu-trúc-bài-tập)
9. [Quy Trình Chấm Bài](#quy-trình-chấm-bài)
10. [Triển Khai Sản Xuất](#triển-khai-sản-xuất)
11. [Đóng Góp](#đóng-góp)
12. [License](#license)

---

## Giới Thiệu

KaiRust là một ứng dụng web full-stack cho phép người dùng học lập trình Rust từ cơ bản đến nâng cao. Được thiết kế theo phong cách các nền tảng như LeetCode, HackerRank, hay Codeforces, KaiRust cung cấp:

- **23 chương học** được tổ chức theo loại (lý thuyết, bài tập, quiz)
- **Trình biên dịch Rust** hoạt động trực tuyến thông qua WebSocket
- **Hệ thống chấm điểm tự động** với test case linh hoạt
- **Giao diện Monaco Editor** với syntax highlighting và theme tùy chọn
- **Tiến trình hoàn thành** được lưu vào localStorage

Dự án nhắm đến việc giúp người học tiếp cận Rust một cách thực hành, với các bài tập được chia theo từng chương từ sách "The Rust Programming Language".

---

## Tính Năng

### Tính Năng Chính

- **Editor Rust trực tuyến**: Monaco Editor với đầy đủ tính năng syntax highlighting, auto-completion, và dark/light theme
- **Biên dịch và chạy real-time**: Code được biên dịch và chạy trực tiếp trên server thông qua WebSocket
- **Hệ thống bài tập**: Cấu trúc bài tập theo format LeetCode (problem description, input format, output format, constraints, examples)
- **Chấm điểm tự động**: So sánh output với expected output của test case
- **Tiến trình hoàn thành**: Theo dõi bài học đã hoàn thành, lưu vào localStorage
- **Tải lại trạng thái học**: Lưu vị trí bài học cuối cùng để tiếp tục lại sau
- **Xác thực người dùng**: Đăng ký, đăng nhập, đổi mật khẩu với JWT token
- **Sandbox an toàn**: Thực thi code trong Docker container cô lập với giới hạn tài nguyên

### Tính Năng Phụ

- **Chạy code nội dòng**: Cho phép chạy code mẫu ngay trong nội dung bài học
- **Terminal tương tác**: Nhập stdin cho chương trình khi chạy
- **Giới hạn thời gian/bộ nhớ**: Từng bài tập có giới hạn riêng
- **Hỗ trợ toán học**: Hiển thị công thức toán LaTeX với KaTeX
- **Cookie consent**: Tuân thủ GDPR với banner consent

---

## Kiến Trúc Hệ Thống

```
                              Internet
                                 |
                                 v
                    +------------------------+
                    |   Cloudflare Tunnel    |
                    |   (Public Access)      |
                    +------------------------+
                                 |
                                 v
                    +------------------------+
                    |   Caddy Reverse Proxy  |
                    |   (HTTPS + HTTP/WS)   |
                    +------------------------+
                       |                |
               Port 80/443          Port 8080
                       |                |
            +----------v--------+     |
            |    Frontend       |     |
            |    (Vite/Nginx)   |     |
            |    Port 80        |     |
            +------------------+     |
                                        |
                              +---------v---------+
                              |   Backend         |
                              |   (Rust/Axum)     |
                              |   Port 3001       |
                              +------------------+
                                        |
                              +---------v---------+
                              |  Code Executor    |
                              |  (Docker Sandbox)|
                              |  + Rust Compiler |
                              +------------------+
```

### Thành Phần Chính

| Thành Phần | Mô Tả |
|------------|-------|
| **Frontend** | Giao diện người dùng với Monaco Editor, sử dụng Vite build và Nginx serve |
| **Backend** | API server viết bằng Rust với Axum framework, xử lý WebSocket và authentication |
| **Caddy** | Reverse proxy với HTTPS tự động thông qua Let's Encrypt |
| **Cloudflare Tunnel** | Expose server ra internet mà không cần public IP |
| **Docker Sandbox** | Môi trường cô lập để biên dịch và chạy code người dùng |

---

## Cấu Trúc Dự Án

```
KaiRust/
|
+-- backend/                    # Rust backend server
|   +-- src/
|   |   +-- auth.rs             # JWT authentication
|   |   +-- db.rs               # SQLite database
|   |   +-- exercises/          # Exercise definitions (ch01-ch08)
|   |   +-- handlers/
|   |   |   +-- executor.rs     # Code compilation & execution
|   |   |   +-- ws.rs           # WebSocket handler
|   |   |   +-- ws_play.rs      # Real-time code execution
|   |   +-- models.rs           # Request/Response models
|   |   +-- router.rs           # API routes
|   |   +-- main.rs             # Entry point
|   +-- Cargo.toml
|   +-- Dockerfile
|
+-- frontend/                   # TypeScript frontend
|   +-- src/
|   |   +-- chapters/           # Course content (ch01-ch23)
|   |   +-- courses.ts          # Course data structure
|   |   +-- main.ts             # Main application logic
|   |   +-- practice.ts         # Practice mode
|   |   +-- progress.ts         # Progress management
|   +-- index.html
|   +-- vite.config.ts
|   +-- Dockerfile
|
+-- caddy/                      # Caddy configuration
|   +-- Dockerfile
|   +-- Caddyfile
|
+-- docker-compose.yml          # Production deployment
+-- docker-compose.local.yml    # Local development
+-- README.md                   # This file
```

---

## Công Nghệ Sử Dụng

### Backend

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|----------|
| Rust | 1.85 | Ngôn ngữ lập trình chính |
| Axum | 0.8 | Web framework với WebSocket support |
| Tokio | 1 | Async runtime |
| SQLx / rusqlite | 0.8 / 0.32 | Database ORM và SQLite |
| Argon2 | 0.5 | Password hashing |
| JSON Web Token | 9 | Authentication |
| serde | 1 | Serialization/Deserialization |
| uuid | 1 | Session ID generation |
| tower-http | 0.6 | HTTP utilities (CORS) |

### Frontend

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|----------|
| TypeScript | 5.x | Ngôn ngữ lập trình |
| Vite | 5.x | Build tool |
| Monaco Editor | 0.45+ | Code editor |
| KaTeX | - | Render công thức toán học |

### Infrastructure

| Công Nghệ | Mục Đích |
|-----------|----------|
| Docker | Container hóa ứng dụng |
| Docker Compose | Điều phối multi-container |
| Caddy | Reverse proxy với HTTPS tự động |
| Cloudflare Tunnel | Public access |
| Debian Bookworm | Base image cho sandbox |

---

## Cài Đặt

### Yêu Cầu Hệ Thống

- **Docker** phiên bản 20.10 trở lên
- **Docker Compose** phiên bản 2.0 trở lên
- **RAM**: Tối thiểu 4GB (khuyến nghị 8GB)
- **Disk**: Tối thiểu 10GB trống
- **CPU**: 2 cores trở lên

### Cài Đặt Môi Trường Phát Triển

#### 1. Clone Repository

```bash
git clone https://github.com/KaiRust/kairust.git
cd kairust
```

#### 2. Cấu Hình Môi Trường

Tạo file `.env` trong thư mục gốc:

```bash
# Domain cho production (nếu có)
DOMAIN=your-domain.duckdns.org
DUCKDNS_TOKEN=your-duckdns-token

# JWT Secret cho authentication
JWT_SECRET=your-super-secret-key-change-in-production
```

#### 3. Khởi Động Docker Compose

```bash
# Chạy với cấu hình mặc định
docker-compose up -d

# Hoặc chạy với cấu hình local (không cần domain)
docker-compose -f docker-compose.local.yml up -d
```

#### 4. Truy Cập Ứng Dụng

- Frontend: http://localhost:80
- Backend API: http://localhost:3001
- WebSocket: ws://localhost:3001/ws/play

### Chạy Trên Máy Ảo (Docker)

Nếu không muốn cài đặt Docker locally, có thể sử dụng VPS với các bước sau:

```bash
# 1. SSH vào server
ssh your-server

# 2. Cài đặt Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 3. Clone và chạy
git clone https://github.com/KaiRust/kairust.git
cd kairust

# 4. Chỉnh sửa Caddyfile với domain của bạn
nano Caddyfile

# 5. Chạy Docker Compose
docker-compose up -d
```

---

## Hướng Dẫn Sử Dụng

### Đăng Nhập

1. Nhập địa chỉ email và mật khẩu
2. Nếu chưa có tài khoản, bấm "Đăng ký" để tạo mới
3. Thông tin đăng nhập được lưu trong JWT token

### Học Lý Thuyết

1. Chọn chương học từ sidebar bên trái
2. Nội dung lý thuyết hiển thị ở panel bên phải
3. Cuộn xuống để đọc hết nội dung
4. Bài học được đánh dấu hoàn thành khi cuộn đến cuối

### Làm Bài Tập Thực Hành

1. Chọn bài tập từ danh sách (có icon "code")
2. Đọc kỹ đề bài, input format, và ví dụ
3. Viết code trong Monaco Editor
4. Bấm "Run" để chạy thử với stdin nếu cần
5. Bấm "Nộp bài" để nộp và chấm điểm

### Nộp Bài Và Chấm Điểm

Khi nộp bài, hệ thống sẽ:

1. Biên dịch code của bạn (nếu có lỗi, hiển thị lỗi biên dịch)
2. Chạy với tất cả test case (bất kỳ dòng nào cũng được chạy)
3. So sánh output với expected output
4. Hiển thị kết quả:
   - **Accepted**: Tất cả test case đều đúng
   - **Wrong Answer**: Có test case sai
   - **Time Limit Exceeded**: Chạy quá thời gian cho phép
   - **Compilation Error**: Lỗi biên dịch

---

## Cấu Trúc Bài Tập

Mỗi bài tập được định nghĩa với các trường sau:

| Trường | Kiểu | Mô Tả |
|--------|------|-------|
| `title` | String | Tiêu đề hiển thị trong danh sách |
| `problemTitle` | String | Tên bài toán ngắn gọn |
| `problemDescription` | String | Mô tả chi tiết yêu cầu bài toán |
| `inputFormat` | String | Mô tả định dạng dữ liệu đầu vào |
| `outputFormat` | String | Mô tả định dạng kết quả đầu ra |
| `constraints` | Array | Các ràng buộc (vd: 1 <= n <= 10^6) |
| `examples` | Array | Các ví dụ minh họa |
| `defaultCode` | String | Code mặc định trong editor |
| `testCases` | Array | Tất cả test case dùng để chấm |
| `timeLimit` | String | Giới hạn thời gian (vd: "1s") |
| `memoryLimit` | String | Giới hạn bộ nhớ (vd: "256MB") |

### Ví Dụ Cấu Trúc Bài Tập

```typescript
{
  id: "ch02_01_ex",
  title: "Bài tập 2.1: Tạo biến String",
  type: "practice",
  problemTitle: "Tạo biến String",
  problemDescription: "Khai báo biến guess kiểu String, gán giá trị 'test', in ra màn hình",
  inputFormat: "Không có input",
  outputFormat: "In ra một dòng duy nhất: test",
  constraints: [
    { field: "Type", condition: "Phải sử dụng kiểu String, không dùng &str" }
  ],
  examples: [
    {
      input: "",
      output: "test",
      explanation: "Khai báo String với giá trị 'test' rồi in ra"
    }
  ],
  defaultCode: `fn main() {\n    // TODO: Khai báo biến String\n}`,
  timeLimit: "1s",
  memoryLimit: "256MB",
  testCases: [
    { input: "", expectedOutput: "test", description: "Test case 1" }
  ]
}
```

---

## Quy Trình Chấm Bài

```
Người dùng bấm "Nộp bài"
           |
           v
Frontend gửi WebSocket message
(type="run", code, lesson_id, is_test=true)
           |
           v
Backend nhận được yêu cầu
           |
    +------v-------+
    | Tạo workspace |
    | tạm (session) |
    +------v-------+
           |
    +------v-------+
    | Ghi code vào |
    | src/main.rs  |
    +------v-------+
           |
    +------v-------+
    | Thêm test    |
    | code (nếu có)|
    +------v-------+
           |
    +------v-------+
    | Cargo build  |
    | --release    |
    +------+-------+
           |
     +-----+-----+
     | Compile   |
     | Error?    |
     +-----+-----+
      Yes |  No
          v
    +------v-------+
    | Backend trả |
    | về lỗi biên |
    | dịch (stderr)|
    +------v-------+
           |
    +------v-------+
    | Docker run   |
    | trong sandbox|
    | (isolated)   |
    +------v-------+
           |
    +------v-------+
    | So sánh      |
    | output với   |
    | expected     |
    +------+-------+
           |
     +-----+-----+
     | Passed?   |
     +-----+-----+
      Yes |  No
          v        v
    Accepted   Wrong Answer
```

### Giới Hạn Sandbox

Container Docker chạy code người dùng với các giới hạn:

| Tham Số | Giá Trị |
|---------|---------|
| Memory | 128 MB |
| CPU | 0.5 cores |
| Network | Disabled |
| Write | Read-only |
| PID limit | 64 processes |
| Timeout | 1-10s (tùy bài) |
| Output | 64 KB max |

---

## Triển Khai Sản Xuất

### Cấu Hình Domain

1. **Sử dụng DuckDNS** (miễn phí):
   - Tạo tài khoản tại https://www.duckdns.org
   - Tạo subdomain (vd: kairust.duckdns.org)
   - Lấy token API

2. **Cấu Hình Caddy**:
   Chỉnh sửa `Caddyfile`:
   ```
   :8080 {
       reverse_proxy frontend:80
       reverse_proxy /ws/* backend:3001
   }
   ```

3. **Cấu Hình Cloudflare Tunnel**:
   Nếu không có domain, có thể sử dụng Cloudflare Tunnel:
   ```bash
   cloudflared tunnel --url http://caddy:8080
   ```

### Cấu Hình SSL/TLS

Caddy tự động cấp certificate Let's Encrypt. Không cần cấu hình thêm.

### Backup Data

```bash
# Backup SQLite database
docker exec kairust_backend cp /data/kairust.db /data/kairust_backup.db

# Copy ra ngoài
docker cp kairust_backend:/data/kairust_backup.db ./backup.db
```

---

## Đóng Góp

Mọi đóng góp đều được welcome! Vui lòng tạo issue hoặc pull request nếu:

- Tìm thấy bug
- Muốn thêm bài tập mới
- Có yêu cầu tính năng
- Muốn sửa đổi documentation

### Quy Trình Đóng Góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'Add amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

---

## License

Distributed under the MIT License.

---

## Liên Hệ

- Website: https://kairust.duckdns.org
- Email: quanvuvan201@gmail.com

Nếu có bất kỳ câu hỏi nào, vui lòng tạo issue trên GitHub.
