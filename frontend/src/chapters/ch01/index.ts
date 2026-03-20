import { Chapter } from '../../courses';
import { ch01_01 } from './ch01_01';
import { ch01_02 } from './ch01_02';
import { ch01_03 } from './ch01_03';
import { ch01_04 } from './ch01_04';
import { ch01_04_01 } from './ch01_04_01';
import { ch01_04_02 } from './ch01_04_02';
import { ch01_04_03 } from './ch01_04_03';
import { ch01_04_04 } from './ch01_04_04';
import { ch01_04_05 } from './ch01_04_05';

export const ch01: Chapter = {
  id: 'ch01',
  title: 'Chương 1: Bắt đầu với Rust',
  introduction: `
    <div class="chapter-intro">
      <section class="intro-hero">
        <h2>Giới thiệu về Rust</h2>
        <p class="hero-text">
          Rust là một ngôn ngữ lập trình <strong>hiện đại</strong>, được thiết kế để đạt được
          <strong>hiệu suất cao</strong> và <strong>an toàn bộ nhớ</strong> mà không cần sử dụng
          garbage collector.
        </p>
      </section>

      <section class="intro-history">
        <h3>Lịch sử phát triển</h3>
        <div class="timeline">
          <div class="timeline-item">
            <span class="year">2006</span>
            <span class="event">Graydon Hoare bắt đầu dự án Rust như một dự án cá nhân</span>
          </div>
          <div class="timeline-item">
            <span class="year">2009</span>
            <span class="event">Mozilla tài trợ và hỗ trợ phát triển Rust</span>
          </div>
          <div class="timeline-item">
            <span class="year">2015</span>
            <span class="event">Rust 1.0 chính thức phát hành</span>
          </div>
          <div class="timeline-item">
            <span class="year">2021</span>
            <span class="event">Rust được sử dụng trong Android & Linux kernel</span>
          </div>
          <div class="timeline-item">
            <span class="year">2024</span>
            <span class="event">Rust liên tục đứng đầu Stack Overflow Developer Survey</span>
          </div>
        </div>
      </section>

      <section class="intro-why">
        <h3>Tại sao nên học Rust?</h3>
        <div class="features-grid">
          <div class="feature-card">
            <h4>An toàn bộ nhớ</h4>
            <p>Loại bỏ các lỗi null pointer, buffer overflow, use-after-free ở compile time thông qua hệ thống ownership</p>
          </div>
          <div class="feature-card">
            <h4>Hiệu suất cao</h4>
            <p>Tốc độ tương đương C/C++, phù hợp cho systems programming, embedded systems, và các ứng dụng performance-critical</p>
          </div>
          <div class="feature-card">
            <h4>Concurrency an toàn</h4>
            <p>Data races được ngăn chặn ở compile time. Không cần mutex để chia sẻ dữ liệu an toàn giữa các thread</p>
          </div>
          <div class="feature-card">
            <h4>Công cụ tuyệt vời</h4>
            <p>Cargo - package manager mạnh mẽ, rustfmt - code formatter, clippy - linter, rust-analyzer - IDE support</p>
          </div>
        </div>
      </section>

      <section class="intro-comparison">
        <h3>So sánh Rust với các ngôn ngữ khác</h3>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Tiêu chí</th>
              <th>Rust</th>
              <th>C/C++</th>
              <th>Go</th>
              <th>Java</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Memory Safety</td>
              <td>Compile-time</td>
              <td>Runtime</td>
              <td>GC</td>
              <td>GC</td>
            </tr>
            <tr>
              <td>Performance</td>
              <td>Cao</td>
              <td>Cao</td>
              <td>Trung bình</td>
              <td>Trung bình</td>
            </tr>
            <tr>
              <td>Concurrency</td>
              <td>An toàn</td>
              <td>Phức tạp</td>
              <td>Dễ</td>
              <td>Phức tạp</td>
            </tr>
            <tr>
              <td>Learning Curve</td>
              <td>Cao</td>
              <td>Cao</td>
              <td>Dễ</td>
              <td>Trung bình</td>
            </tr>
            <tr>
              <td>Binary Size</td>
              <td>Nhỏ</td>
              <td>Nhỏ</td>
              <td>Lớn</td>
              <td>Rất lớn</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="intro-usecases">
        <h3>Ứng dụng thực tế của Rust</h3>
        <div class="usecases-list">
          <div class="usecase-item">
            <span class="company">Firefox</span>
            <span class="desc">Mozilla sử dụng Rust trong browser engine để tăng tốc độ và bảo mật</span>
          </div>
          <div class="usecase-item">
            <span class="company">Linux Kernel</span>
            <span class="desc">Rust được tích hợp vào Linux kernel từ version 6.1</span>
          </div>
          <div class="usecase-item">
            <span class="company">Android</span>
            <span class="desc">Google hỗ trợ Rust trong phát triển Android OS</span>
          </div>
          <div class="usecase-item">
            <span class="company">Cloudflare</span>
            <span class="desc">Sử dụng Rust cho edge computing và network services</span>
          </div>
          <div class="usecase-item">
            <span class="company">Discord</span>
            <span class="desc">Chuyển từ Go sang Rust để xử lý real-time data</span>
          </div>
          <div class="usecase-item">
            <span class="company">SpaceX</span>
            <span class="desc">Sử dụng Rust trong flight software của rockets</span>
          </div>
        </div>
      </section>

      <section class="intro-learn">
        <h3>Trong chương này, bạn sẽ học:</h3>
        <div class="learn-items">
          <div class="learn-item">
            <span class="number">01</span>
            <div class="content">
              <h4>Cài đặt & Cấu hình môi trường</h4>
              <p>Cài đặt Rust, Cargo, và cấu hình IDE (VS Code với rust-analyzer)</p>
            </div>
          </div>
          <div class="learn-item">
            <span class="number">02</span>
            <div class="content">
              <h4>Chương trình đầu tiên</h4>
              <p>Viết chương trình "Hello, World!" và hiểu cấu trúc cơ bản của Rust</p>
            </div>
          </div>
          <div class="learn-item">
            <span class="number">03</span>
            <div class="content">
              <h4>Cargo - Công cụ quản lý dự án</h4>
              <p>Tạo, build, chạy và quản lý dependencies với Cargo</p>
            </div>
          </div>
          <div class="learn-item">
            <span class="number">04</span>
            <div class="content">
              <h4>Cấu trúc chương trình Rust</h4>
              <p>Hiểu về functions, modules, và cách tổ chức code</p>
            </div>
          </div>
        </div>
      </section>

      <section class="intro-cta">
        <p class="cta-text">Hãy bắt đầu hành trình khám phá Rust ngay bây giờ!</p>
      </section>
    </div>
  `,
  lessons: [ch01_01, ch01_02, ch01_03, ch01_04, ch01_04_01, ch01_04_02, ch01_04_03, ch01_04_04, ch01_04_05]
};
