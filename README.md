# KaiRust - Học Lập Trình Rust Trực Tuyến

KaiRust la mot nen tang hoc Rust truc tuyen voi giao dien bai tap theo phong cach LeetCode, cho phep nguoi dung viet code Rust truc tiep tren trinh duyet va nop bai de kiem tra.

## Muc Luc

1. [Gioi Thieu](#gioi-thieu)
2. [Tinh Nang](#tinh-nang)
3. [Kien Truc He Thong](#kien-truc-he-thong)
4. [Cau Truc Du An](#cau-truc-du-an)
5. [Cong Nghe Su Dung](#cong-nghe-su-dung)
6. [Cai Dat](#cai-dat)
   - [Yeu Cau He Thong](#yeu-cau-he-thong)
   - [Cai Dat Moi Truong Phat Trien](#cai-dat-moi-truong-phat-trien)
   - [Chay Tren May Ao (Docker)](#chay-tren-may-ao-docker)
7. [Huong Dan Su Dung](#huong-dan-su-dung)
   - [Dang Nhap](#dang-nhap)
   - [Hoc Ly Thuyet](#hoc-ly-thuyet)
   - [Lam Bai Tap Thuc Hanh](#lam-bai-tap-thuc-hanh)
   - [Nop Bai Va Cham Diem](#nop-bai-va-cham-diem)
8. [Cau Truc Bai Tap](#cau-truc-bai-tap)
9. [Quy Trinh Cham Bai](#quy-trinh-cham-bai)
10. [Trien Khai San Xuat](#trien-khai-san-xuat)
11. [Dong Gop](#dong-gop)
12. [License](#license)

---

## Gioi Thieu

KaiRust la mot ung dung web full-stack cho phep nguoi dung hoc lap trinh Rust tu co ban den nang cao. Duoc thiet ke theo phong cac nền tảng như LeetCode, HackerRank, hay Codeforces, KaiRust cung cap:

- **23 chuong hoc** duoc to chuc theo loai (ly thuyet, bai tap, quiz)
- **Trinh biên dich Rust** hoat dong truc tuyen thong qua WebSocket
- **He thong cham diem tu dong** voi test case linh hoat
- **Giao dien Monaco Editor** voi syntax highlighting va theme tuy chon
- **Tien trinh hoan thanh** duoc luu vao localStorage

Dự án nhắm đến việc giúp người học tiếp cận Rust một cách thực hành, với các bài tập được chia theo từng chương từ sách "The Rust Programming Language".

---

## Tinh Nang

### Tinh Nang Chinh

- **Editor Rust truc tuyen**: Monaco Editor với đầy đủ tính năng syntax highlighting, auto-completion, và dark/light theme
- **Bien dich va chay real-time**: Code được biên dịch và chạy trực tiếp trên server thông qua WebSocket
- **He thong bai tap**: Cấu trúc bài tập theo format LeetCode (problem description, input format, output format, constraints, examples)
- **Cham diem tu dong**: So sanh output voi expected output cua test case
- **Tien trinh hoan thanh**: Theo doi bai hoc da hoan thanh, luu vao localStorage
- **Tai lai trang thai hoc**: Luu vi tri bai hoc cuoi cung de tiep tuc lai sau
- **Xac thực nguoi dung**: Dang ky, dang nhap, doi mat khau voi JWT token
- **Sandbox an toan**: Thuc thi code trong Docker container cô lập với giới hạn tài nguyên

### Tinh Nang Phu

- **Chạy code nội dòng**: Cho phep chạy code mẫu ngay trong nội dung bài học
- **Terminal tương tác**: Nhập stdin cho chương trình khi chạy
- **Giới hạn thời gian/bộ nhớ**: Từng bài tập có giới hạn riêng
- **Hỗ trợ toán học**: Hiển thị công thức toán LaTeX với KaTeX
- **Cookie consent**: Tuân thủ GDPR với banner consent

---

## Kien Truc He Thong

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

### Thanh Phan Chinh

| Thanh Phan | Mo Ta |
|------------|-------|
| **Frontend** | Giao diện người dùng với Monaco Editor, sử dụng Vite build và Nginx serve |
| **Backend** | API server viết bằng Rust với Axum framework, xử lý WebSocket và authentication |
| **Caddy** | Reverse proxy với HTTPS tự động thông qua Let's Encrypt |
| **Cloudflare Tunnel** | Expose server ra internet mà không cần public IP |
| **Docker Sandbox** | Môi trường cô lập để biên dịch và chạy code người dùng |

---

## Cau Truc Du An

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

## Cong Nghe Su Dung

### Backend

| Cong Nghe | Phien Ban | Muc Dich |
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

| Cong Nghe | Phien Ban | Muc Dich |
|-----------|-----------|----------|
| TypeScript | 5.x | Ngôn ngữ lập trình |
| Vite | 5.x | Build tool |
| Monaco Editor | 0.45+ | Code editor |
| KaTeX | - | Render công thức toán học |

### Infrastructure

| Cong Nghe | Muc Dich |
|-----------|----------|
| Docker | Container hóa ứng dụng |
| Docker Compose | Điều phối multi-container |
| Caddy | Reverse proxy với HTTPS tự động |
| Cloudflare Tunnel | Public access |
| Debian Bookworm | Base image cho sandbox |

---

## Cai Dat

### Yeu Cau He Thong

- **Docker** phiên bản 20.10 trở lên
- **Docker Compose** phiên bản 2.0 trở lên
- **RAM**: Tối thiểu 4GB (khuyến nghị 8GB)
- **Disk**: Tối thiểu 10GB trống
- **CPU**: 2 cores trở lên

### Cai Dat Moi Truong Phat Trien

#### 1. Clone Repository

```bash
git clone https://github.com/KaiRust/kairust.git
cd kairust
```

#### 2. Cau Hinh Moi Truong

Tạo file `.env` trong thư mục gốc:

```bash
# Domain cho production (neu co)
DOMAIN=your-domain.duckdns.org
DUCKDNS_TOKEN=your-duckdns-token

# JWT Secret cho authentication
JWT_SECRET=your-super-secret-key-change-in-production
```

#### 3. Khoi Dong Docker Compose

```bash
# Chạy với cấu hình mặc định
docker-compose up -d

# Hoặc chạy với cấu hình local (không cần domain)
docker-compose -f docker-compose.local.yml up -d
```

#### 4. Truy Cap Ung Dung

- Frontend: http://localhost:80
- Backend API: http://localhost:3001
- WebSocket: ws://localhost:3001/ws/play

### Chay Tren May Ao (Docker)

Neu khong muon cai dat Docker locally, co the su dung VPS voi cac buoc sau:

```bash
# 1. SSH vao server
ssh your-server

# 2. Cai dat Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 3. Clone va chay
git clone https://github.com/KaiRust/kairust.git
cd kairust

# 4. Chinh sua Caddyfile voi domain cua ban
nano Caddyfile

# 5. Chay Docker Compose
docker-compose up -d
```

---

## Huong Dan Su Dung

### Dang Nhap

1. Nhap dia chi email va mat khau
2. Neu chua co tai khoan, bam "Dang ky" de tao moi
3. Thong tin dang nhap duoc luu trong JWT token

### Hoc Ly Thuyet

1. Chon chuong hoc tu sidebar ben trai
2. Noi dung ly thuyet hien thi o panel ben phai
3. Cuon xuong de doc het noi dung
4. Bai hoc duoc danh dau hoan thanh khi cuon den cuoi

### Lam Bai Tap Thuc Hanh

1. Chon bai tap tu danh sach (co icon "code")
2. Doc ky de bai, input format, va vi du
3. Viet code trong Monaco Editor
4. Bam "Run" de chay thu voi stdin neu can
5. Bam "Nop bai" de nop va cham diem

### Nop Bai Va Cham Diem

Khi nop bai, he thong se:

1. Bien dich code cua ban (neu co loi, hien thi loi biên dịch)
2. Chạy voi tat ca test case (bat ki dong nao cung duoc chạy)
3. So sanh output voi expected output
4. Hien thi ket qua:
   - **Accepted**: Tat ca test case deu dung
   - **Wrong Answer**: Co test case sai
   - **Time Limit Exceeded**: Chay qua thoi gian cho phep
   - **Compilation Error**: Loi biên dịch

---

## Cau Truc Bai Tap

Moi bai tap duoc dinh nghia voi cac truong sau:

| Truong | Kieu | Mo Ta |
|--------|------|-------|
| `title` | String | Tieu de hien thi trong danh sach |
| `problemTitle` | String | Ten bai toan ngan gon |
| `problemDescription` | String | Mo ta chi tiet yeu cau bai toan |
| `inputFormat` | String | Mo ta dinh dang du lieu dau vao |
| `outputFormat` | String | Mo ta dinh dang ket qua dau ra |
| `constraints` | Array | Cac rang buoc (vd: 1 <= n <= 10^6) |
| `examples` | Array | Cac vi du minh hoa |
| `defaultCode` | String | Code mac dinh trong editor |
| `testCases` | Array | Tat ca test case dung de cham |
| `timeLimit` | String | Gioi han thoi gian (vd: "1s") |
| `memoryLimit` | String | Gioi han bo nho (vd: "256MB") |

### Vi Du Cau Truc Bai Tap

```typescript
{
  id: "ch02_01_ex",
  title: "Bai tap 2.1: Tao bien String",
  type: "practice",
  problemTitle: "Tao bien String",
  problemDescription: "Khai bao bien guess kieu String, gan gia tri 'test', in ra man hinh",
  inputFormat: "Khong co input",
  outputFormat: "In ra mot dong duy nhat: test",
  constraints: [
    { field: "Type", condition: "Phai su dung kieu String, khong dung &str" }
  ],
  examples: [
    {
      input: "",
      output: "test",
      explanation: "Khai bao String voi gia tri 'test' roi in ra"
    }
  ],
  defaultCode: `fn main() {\n    // TODO: Khai bao bien String\n}`,
  timeLimit: "1s",
  memoryLimit: "256MB",
  testCases: [
    { input: "", expectedOutput: "test", description: "Test case 1" }
  ]
}
```

---

## Quy Trinh Cham Bai

```
Nguoi dung bam "Nop bai"
           |
           v
Frontend gui WebSocket message
(type="run", code, lesson_id, is_test=true)
           |
           v
Backend nhan duoc yeu cau
           |
    +------v-------+
    | Tao workspace |
    | tam (session) |
    +------v-------+
           |
    +------v-------+
    | Ghi code vao |
    | src/main.rs  |
    +------v-------+
           |
    +------v-------+
    | Them test    |
    | code (neu co)|
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
    | Backend tra |
    | ve loi bien |
    | dich (stderr)|
    +------v-------+
           |
    +------v-------+
    | Docker run   |
    | trong sandbox|
    | (isolated)   |
    +------v-------+
           |
    +------v-------+
    | So sanh      |
    | output voi   |
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

### Gioi Han Sandbox

Container Docker chạy code người dùng với các giới hạn:

| Tham So | Gia Tri |
|---------|---------|
| Memory | 128 MB |
| CPU | 0.5 cores |
| Network | Disabled |
| Write | Read-only |
| PID limit | 64 processes |
| Timeout | 1-10s (tùy bài) |
| Output | 64 KB max |

---

## Trien Khai San Xuat

### Cau Hinh Domain

1. **Su dung DuckDNS** (mien phi):
   - Tao tai khoan tai https://www.duckdns.org
   - Tao subdomain (vd: kairust.duckdns.org)
   - Lay token API

2. **Cau Hinh Caddy**:
   Chinh sua `Caddyfile`:
   ```
   :8080 {
       reverse_proxy frontend:80
       reverse_proxy /ws/* backend:3001
   }
   ```

3. **Cau Hinh Cloudflare Tunnel**:
   Neu khong co domain, co the su dung Cloudflare Tunnel:
   ```bash
   cloudflared tunnel --url http://caddy:8080
   ```

### Cau Hinh SSL/TLS

Caddy tu dong cap certificate Let's Encrypt. Khong can cau hinh them.

### Backup Data

```bash
# Backup SQLite database
docker exec kairust_backend cp /data/kairust.db /data/kairust_backup.db

# Copy ra ngoai
docker cp kairust_backend:/data/kairust_backup.db ./backup.db
```

---

## Dong Gop

Moi dong gop deu duoc welcome! Vui long tao issue hoac pull request neu:

- Tim thay bug
- Muon them bai tap moi
- Co yeu cau tinh nang
- Muon sua doi documentation

### Quy Trinh Dong Gop

1. Fork repository
2. Tao branch moi (`git checkout -b feature/amazing-feature`)
3. Commit thay doi (`git commit -m 'Add amazing feature'`)
4. Push len branch (`git push origin feature/amazing-feature`)
5. Tao Pull Request

---

## License

Distributed under the MIT License.

---

## Lien He

- Website: https://kairust.duckdns.org
- Email: contact@kairust.dev

Neu co bat ky cau hoi nao, vui long tao issue tren GitHub.
