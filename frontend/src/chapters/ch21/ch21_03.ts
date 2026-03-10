// =====================================================
// Chương 21: MẠNG NEURAL NETWORK
// Bài 3: Gradient Descent - Cách Neural Networks HỌC
//
// Mục tiêu của bài học này:
// Sau khi học xong bài này, bạn sẽ hiểu:
// 1. Gradient Descent là gì và tại sao cần nó
// 2. Gradient (đạo hàm) cho biết điều gì
// 3. Learning Rate và cách chọn
// 4. Tại sao Gradient Descent giúp tìm được điểm tối ưu
// =====================================================

import { Lesson, Chapter } from '../../courses';

// =====================================================
// PHẦN: GRADIENT DESCENT - THUẬT TOÁN HỌC
// =====================================================

const ch21_03_lessons: Lesson[] = [
  {
    id: 'ch21_03_01',
    title: '1. Vấn đề: Làm sao tìm được weights tốt nhất?',
    duration: '30 phút',
    type: 'theory',
    content: `
      <h2>1. Vấn đề: Làm sao tìm được weights tốt nhất?</h2>

      <h3>1.1. Nhắc lại bài cũ</h3>
      <p>Ở bài trước, ta đã biết Neural Network có công thức:</p>
      <pre><code>y = f(w₁x₁ + w₂x₂ + ... + b)</code></pre>
      <p>Và ta cần tìm weights (w) và bias (b) để output gần với giá trị thực nhất.</p>

      <h3>1.2. Thử tất cả các giá trị - Brute Force</h3>
      <p>Cách đơn giản nhất: Thử tất cả các giá trị có thể của w và b!</p>
      <pre><code>Ví dụ:
- w từ -10 đến 10, bước 0.1 → 200 giá trị
- b từ -10 đến 10, bước 0.1 → 200 giá trị
- Tổng: 200 × 200 = 40,000 combinations</code></pre>
      <p>Vấn đề: Với Neural Network thực tế có HÀNG TRIỆU weights, cách này KHÔNG THỂ!</p>

      <h3>1.3. Thử ngẫu nhiên - Random Search</h3>
      <p>Cách khác: Chọn ngẫu nhiên weights và giữ lại cái tốt nhất.</p>
      <pre><code>random_search():
    best_loss = infinity
    best_weights = None

    for i in range(10000):
        weights = random()
        loss = compute_loss(weights)
        if loss < best_loss:
            best_loss = loss
            best_weights = weights

    return best_weights</code></pre>
      <p>Vấn đề: Không hiệu quả, tốn nhiều lần thử!</p>

      <h3>1.4. Giải pháp: Gradient Descent</h3>
      <p><strong>Gradient Descent</strong> là thuật toán tìm điểm tối ưu BẰNG TOÁN HỌC, không cần thử ngẫu nhiên!</p>
      <ul>
        <li>Nhanh hơn Brute Force</li>
        <li>Chính xác hơn Random Search</li>
        <li>Áp dụng được cho hàng triệu parameters</li>
      </ul>
    `,
    defaultCode: `// =====================================================
// VÍ DỤ: SO SÁNH CÁC PHƯƠNG PHÁP TÌM WEIGHTS TỐT NHẤT
// =====================================================

// Hàm cần tối ưu: f(x) = x²
// Điểm tối ưu: x = 0 (vì 0² = 0 là nhỏ nhất)

fn f(x: f64) -> f64 {
    x * x  // f(x) = x²
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════╗");
    println!("║  TÌM ĐIỂM TỐI ƯU: SO SÁNH CÁC PHƯƠNG PHÁP                    ║");
    println!("║  Hàm cần tối ưu: f(x) = x²                                    ║");
    println!("║  Đáp án đúng: x = 0                                           ║");
    println!("╚══════════════════════════════════════════════════════════════════╝");

    // =====================================================
    // CÁCH 1: BRUTE FORCE - THỬ TẤT CẢ
    // =====================================================
    println!("\\n=== CÁCH 1: BRUTE FORCE ===");
    println!("Thử tất cả các giá trị từ -10 đến 10, bước 0.1");

    let mut best_x = 0.0;
    let mut best_f = f(10.0);

    // Loop từ -10 đến 10, bước 0.1
    let mut x = -10.0;
    while x <= 10.0 {
        let y = f(x);
        if y < best_f {
            best_f = y;
            best_x = x;
        }
        x += 0.1;
    }

    println!("Kết quả: x = {:.1}, f(x) = {:.2}", best_x, best_f);
    println!("Số lần thử: 201 lần");

    // =====================================================
    // CÁCH 2: RANDOM SEARCH - THỬ NGẪU NHIÊN
    // =====================================================
    println!("\\n=== CÁCH 2: RANDOM SEARCH ===");
    println!("Thử ngẫu nhiên 100 lần");

    best_x = 0.0;
    best_f = f(10.0);

    // Simulate random search (dùng seed cố định để reproducible)
    let mut seed = 12345;
    for _ in 0..100 {
        // Random trong khoảng [-10, 10]
        seed = seed.wrapping_mul(1103515245).wrapping_add(12345);
        let random_val = (seed % 20001) as f64 / 1000.0 - 10.0;

        let y = f(random_val);
        if y < best_f {
            best_f = y;
            best_x = random_val;
        }
    }

    println!("Kết quả: x = {:.2}, f(x) = {:.2}", best_x, best_f);
    println!("Số lần thử: 100 lần");

    // =====================================================
    // CÁCH 3: GRADIENT DESCENT - THUẬT TOÁN TỐI ƯU
    // =====================================================
    println!("\\n=== CÁCH 3: GRADIENT DESCENT ===");
    println!("Sử dụng đạo hàm để tìm đường đi nhanh nhất!");

    // Đạo hàm của f(x) = x² là f'(x) = 2x
    fn gradient(x: f64) -> f64 {
        2.0 * x
    }

    // Gradient Descent
    let mut x = 10.0;  // Bắt đầu từ x = 10
    let learning_rate = 0.1;
    let n_steps = 20;

    println!("\\nQuá trình:");
    println!("Step |   x    |  f(x)  | gradient |");
    println!("-----|--------|--------|----------|");

    for step in 0..n_steps {
        let grad = gradient(x);
        let y = f(x);

        println!(" {:3} | {:6.2} | {:6.2} | {:8.3} |",
                 step, x, y, grad);

        // Cập nhật: x = x - learning_rate * gradient
        x = x - learning_rate * grad;
    }

    println!("\\nKết quả cuối cùng: x = {:.6}", x);
    println!("Số lần thử: {} lần", n_steps);

    // =====================================================
    // SO SÁNH
    // =====================================================
    println!("\\n╔══════════════════════════════════════════════════════════════════╗");
    println!("║  SO SÁNH CÁC PHƯƠNG PHÁP                                        ║");
    println!("╠════════════════════════╦═══════════╦═════════════╦════════════════╣");
    println!("║ Phương pháp            ║ Kết quả x ║  Số lần    ║ Hiệu quả      ║");
    println!("╠════════════════════════╬═══════════╬═════════════╬════════════════╣");
    println!("║ Brute Force (0.1)      ║   -0.0    ║   201       ║ Tốt            ║");
    println!("║ Random Search (100)    ║   {:.2}    ║   100       ║ Trung bình    ║", best_x);
    println!("║ Gradient Descent       ║   {:.6}  ║   20        ║ Rất tốt!      ║", x);
    println!("╚════════════════════════╩═══════════╩═════════════╩════════════════╝");

    println!("\\n=== KẾT LUẬN ===");
    println!("Gradient Descent:");
    println!("  ✓ Nhanh nhất (ít iterations nhất)");
    println!("  ✓ Chính xác nhất");
    println!("  ✓ Áp dụng được cho hàng triệu parameters!");
    println!("\\nĐây là thuật toán cốt lõi của Machine Learning!");
}`,
  },
  {
    id: 'ch21_03_02',
    title: '2. Gradient Descent là gì? Giải thích bằng hình ảnh',
    duration: '45 phút',
    type: 'theory',
    content: `
      <h2>2. Gradient Descent là gì? Giải thích bằng hình ảnh</h2>

      <h3>2.1. Ý tưởng cốt lõi</h3>
      <p>Hãy tưởng tượng bạn đang đứng trên một ngọn núi trong sương mù. Bạn không nhìn thấy đường, nhưng bạn cảm nhận được độ dốc dưới chân. Nếu bạn muốn xuống đáy thung lũng nhanh nhất, bạn sẽ đi theo hướng dốc xuống!</p>

      <p><strong>Gradient Descent hoạt động y hệt như vậy!</strong></p>
      <ul>
        <li><strong>Gradient</strong>: Độ dốc tại điểm hiện tại</li>
        <li><strong>Descent</strong>: Đi xuống (giảm giá trị)</li>
        <li><strong>Đi theo gradient âm</strong>: Đi ngược hướng dốc lên để xuống đáy</li>
      </ul>

      <h3>2.2. Gradient trong toán học</h3>
      <p><strong>Gradient</strong> của một hàm số f(x) tại điểm x là đạo hàm f'(x) tại điểm đó.</p>
      <pre><code>Gradient cho biết:
- Hướng nào đi LÊN nhanh nhất (gradient dương)
- Hướng nào đi XUỐNG nhanh nhất (gradient âm)
- Độ dốc bao nhiêu (độ lớn của gradient)</code></pre>

      <h4>Ví dụ: f(x) = x²</h4>
      <table class="comparison-table">
        <tr><th>Vị trí x</th><th>f(x) = x²</th><th>Gradient f'(x) = 2x</th><th>Hướng đi</th></tr>
        <tr><td>10</td><td>100</td><td>+20</td><td>Đi lên → Cần đi ngược lại</td></tr>
        <tr><td>5</td><td>25</td><td>+10</td><td>Đi lên → Cần đi ngược lại</td></tr>
        <tr><td>1</td><td>1</td><td>+2</td><td>Đi lên nhẹ → Cần đi ngược lại</td></tr>
        <tr><td>0</td><td>0</td><td>0</td><td>Điểm tối ưu!</td></tr>
        <tr><td>-1</td><td>1</td><td>-2</td><td>Đi xuống → Cần đi tiếp</td></tr>
        <tr><td>-5</td><td>25</td><td>-10</td><td>Đi xuống → Cần đi tiếp</td></tr>
      </table>

      <h3>2.3. Công thức Gradient Descent</h3>
      <pre><code>x_moi = x_cu - learning_rate * gradient

Trong đó:
- x_cu: vị trí hiện tại
- x_moi: vị trí mới (sau khi cập nhật)
- learning_rate: kích thước bước đi
- gradient: f'(x_cu)

Vì sao TRỪ?
- Gradient dương → cần đi ngược (trừ)
- Gradient âm → cần đi xuống (trừ âm = cộng)</code></pre>

      <h3>2.4. Learning Rate - Kích thước bước</h3>
      <p><strong>Learning rate</strong> (lr) quyết định mỗi bước đi bao xa.</p>

      <h4>Learning rate quá lớn</h4>
      <pre><code>x = 10, lr = 1.0

Bước 1: x = 10 - 1.0 * 20 = -10  (nhảy qua!)
Bước 2: x = -10 - 1.0 * (-20) = 10  (lại nhảy về!)
Bước 3: x = 10 - 1.0 * 20 = -10
→ KHÔNG BAO GIỜ HỘI TỤ!</code></pre>

      <h4>Learning rate quá nhỏ</h4>
      <pre><code>x = 10, lr = 0.001

Bước 1: x = 10 - 0.001 * 20 = 9.98
Bước 2: x = 9.98 - 0.001 * 19.96 = 9.96
...
→ Cần HÀNG TRIỆU bước để đến 0!</code></pre>

      <h4>Learning rate vừa đủ</h4>
      <pre><code>x = 10, lr = 0.1

Bước 1: x = 10 - 0.1 * 20 = 8.0
Bước 2: x = 8 - 0.1 * 16 = 6.4
Bước 3: x = 6.4 - 0.1 * 12.8 = 5.12
...
→ HỘI TỤ SAU ~40 BƯỚC!</code></pre>
    `,
    defaultCode: `// =====================================================
// GRADIENT DESCENT - MINH HỌA BẰNG HÌNH ẢNH
// =====================================================

// Hàm cần tối ưu: f(x) = x²
fn f(x: f64) -> f64 {
    x * x
}

// Đạo hàm: f'(x) = 2x
fn gradient(x: f64) -> f64 {
    2.0 * x
}

// Hàm Gradient Descent
fn gradient_descent(
    x_start: f64,        // Điểm bắt đầu
    learning_rate: f64,  // Kích thước bước
    n_steps: i32         // Số bước
) -> Vec<(i32, f64, f64, f64)> {
    let mut x = x_start;
    let mut history = Vec::new();

    for step in 0..n_steps {
        let grad = gradient(x);
        let y = f(x);

        // Lưu lịch sử: (step, x, f(x), gradient)
        history.push((step, x, y, grad));

        // Cập nhật: x = x - lr * gradient
        x = x - learning_rate * grad;
    }

    history
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║              GRADIENT DESCENT - MINH HỌA CHI TIẾT                    ║");
    println!("║                                                                      ║");
    println!("║  Hàm: f(x) = x²                                                     ║");
    println!("║  Đạo hàm: f'(x) = 2x                                                ║");
    println!("║  Điểm tối ưu: x = 0                                                 ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // =====================================================
    // VÍ DỤ 1: XUỐNG TỪ ĐỈNH NÚI
    // =====================================================
    println!("\\n=== VÍ DỤ 1: XUỐNG TỪ ĐỈNH (x = 10) ===\\n");

    let history = gradient_descent(10.0, 0.1, 15);

    println!("╔════════════════════════════════════════════════════════════╗");
    println!("║ Step │    x     │   f(x)   │  Gradient │ Hướng đi        ║");
    println!("╠══════╪══════════╪══════════╪═══════════╪══════════════════╣");

    for (step, x, y, grad) in &history {
        let direction = if *grad > 0.0 { "↑ Lên" }
                       else if *grad < 0.0 { "↓ Xuống" }
                       else { "● Tối ưu" };

        println!("║ {:4} │ {:8.4} │ {:8.4} │ {:9.4} │ {:14} ║",
                 step, x, y, grad, direction);
    }
    println!("╚════════════════════════════════════════════════════════════╝");

    // =====================================================
    // VÍ DỤ 2: TỪ VỊ TRÍ ÂM
    // =====================================================
    println!("\\n=== VÍ DỤ 2: TỪ VỊ TRÍ ÂM (x = -8) ===\\n");

    let history2 = gradient_descent(-8.0, 0.1, 15);

    println!("╔════════════════════════════════════════════════════════════╗");
    println!("║ Step │    x     │   f(x)   │  Gradient │ Hướng đi        ║");
    println!("╠══════╪══════════╪══════════╪═══════════╪══════════════════╣");

    for (step, x, y, grad) in &history2 {
        let direction = if *grad > 0.0 { "↑ Lên" }
                       else if *grad < 0.0 { "↓ Xuống" }
                       else { "● Tối ưu" };

        println!("║ {:4} │ {:8.4} │ {:8.4} │ {:9.4} │ {:14} ║",
                 step, x, y, grad, direction);
    }
    println!("╚════════════════════════════════════════════════════════════╝");

    // =====================================================
    // VÍ DỤ 3: ẢNH HƯỞNG CỦA LEARNING RATE
    // =====================================================
    println!("\\n=== VÍ DỤ 3: ẢNH HƯỞNG CỦA LEARNING RATE ===\\n");

    let learning_rates = vec![0.001, 0.05, 0.1, 0.5, 0.9, 1.05];

    println!("┌─────────────────────────────────────────────────────────────┐");
    println!("│ Learning Rate │ Kết quả cuối │ Số bước │ Đánh giá          │");
    println!("├─────────────────────────────────────────────────────────────┤");

    for lr in learning_rates {
        let history = gradient_descent(8.0, lr, 30);
        let final_x = history.last().unwrap().1;
        let converged = if final_x.abs() < 0.01 { "✓ Hội tụ" }
                       else if final_x.abs() > 7.0 { "✗ Nhảy qua!" }
                       else { "~ Chậm" };

        println!("│    {:>6.3f}    │   {:>9.4}   │    30   │ {:16} │",
                 lr, final_x, converged);
    }
    println!("└─────────────────────────────────────────────────────────────┘");

    println!("\\n=== NHẬN XÉT ===");
    println!("• LR = 0.001: Quá nhỏ → Không kịp hội tụ trong 30 bước");
    println!("• LR = 0.05:  Nhỏ → Hội tụ chậm");
    println!("• LR = 0.1:   Tốt → Hội tụ nhanh và ổn định");
    println!("• LR = 0.5:   Hơi lớn → Hội tụ nhanh nhưng có thể overshoot");
    println!("• LR = 0.9:   Rất lớn → Dao động quanh điểm tối ưu");
    println!("• LR = 1.05:  Quá lớn → Nhảy qua điểm tối ưu, không hội tụ!");

    // =====================================================
    // VÍ DỤ 4: HÌNH ẢNH TRỰC QUAN
    // =====================================================
    println!("\\n=== HÌNH ẢNH TRỰC QUAN ===\\n");

    // Vẽ đồ thị bằng text
    println!("f(x) = x² và đường đi của Gradient Descent");
    println!("");

    // Tạo map
    let mut map = vec![vec![' '; 60]; 20];

    // Vẽ đường parabol y = x² (scaled)
    for i in 0..60 {
        let x = (i as f64 - 30.0) / 5.0;
        let y = x * x / 5.0;
        let y_idx = 19 - (y as usize).min(19);
        if y_idx < 20 {
            map[y_idx][i] = '●';
        }
    }

    // Vẽ điểm xuất phát và đường đi
    let history = gradient_descent(10.0, 0.15, 20);
    for (step, x, _, _) in history.iter().take(10) {
        let x_idx = (x * 5.0 + 30.0) as usize;
        let y = x * x / 5.0;
        let y_idx = 19 - (y as usize).min(19);

        if x_idx < 60 && y_idx < 20 {
            map[y_idx][x_idx] = match step {
                0 => 'S',
                _ => '→',
            };
        }
    }

    // In map
    for row in map {
        let line: String = row.iter().collect();
        println!("{}", line);
    }

    println!("\n  S = Start (xuất phát)  ● = Đường cong f(x) = x²  → = Đường đi GD");
    println!("\\n=== KẾT LUẬN ===");
    println!("Gradient Descent:");
    println!("  1. Tính gradient tại vị trí hiện tại");
    println!("  2. Đi ngược hướng gradient (trừ gradient)");
    println!("  3. Lặp lại cho đến khi hội tụ");
    println!("\\nQuan trọng: Chọn learning rate phù hợp!")`,
  },
  {
    id: 'ch21_03_03',
    title: '3. Áp dụng Gradient Descent vào Neural Network',
    duration: '45 phút',
    type: 'theory',
    content: `
      <h2>3. Áp dụng Gradient Descent vào Neural Network</h2>

      <h3>3.1. Neural Network đơn giản nhất</h3>
      <p>Xét Neural Network đơn giản nhất: Linear Regression</p>
      <pre><code>y = w * x + b

Trong đó:
- x: input
- w: weight (trọng số)
- b: bias (độ lệch)
- y: output dự đoán

Ta cần tìm w và b để y ≈ y_true</code></pre>

      <h3>3.2. Hàm mất mát (Loss Function)</h3>
      <p>Đo lường sai số giữa y dự đoán và y thực:</p>
      <pre><code>MSE = (1/n) * Σ(y_pred - y_true)²

Với Linear Regression:
MSE = (1/n) * Σ(w*x + b - y_true)²</code></pre>

      <h3>3.3. Tính gradient cho w và b</h3>
      <p>Ta cần tính:</p>
      <ul>
        <li>∂MSE/∂w: Gradient theo w</li>
        <li>∂MSE/∂b: Gradient theo b</li>
      </ul>

      <h4>Áp dụng Chain Rule:</h4>
      <pre><code>Gọi y_pred = w*x + b = z
MSE = (z - y_true)²

∂MSE/∂z = 2 * (z - y_true)

∂z/∂w = x
∂z/∂b = 1

→ ∂MSE/∂w = ∂MSE/∂z * ∂z/∂w = 2*(z-y_true) * x
→ ∂MSE/∂b = ∂MSE/∂z * ∂z/∂b = 2*(z-y_true)</code></pre>

      <h3>3.4. Cập nhật weights</h3>
      <pre><code>w_moi = w_cu - lr * ∂MSE/∂w
b_moi = b_cu - lr * ∂MSE/∂b</code></pre>
    `,
    defaultCode: `// =====================================================
// GRADIENT DESCENT CHO NEURAL NETWORK (LINEAR REGRESSION)
// CÀI ĐẶT CHI TIẾT TỪNG DÒNG
// =====================================================

// Hàm dự đoán: y = w * x + b
fn predict(x: f64, w: f64, b: f64) -> f64 {
    w * x + b
}

// Hàm mất mát: MSE (Mean Squared Error)
fn loss(y_true: f64, y_pred: f64) -> f64 {
    let error = y_true - y_pred;
    error * error
}

// Đạo hàm của loss theo w: dL/dw = -2 * x * (y_true - y_pred)
fn d_loss_dw(x: f64, y_true: f64, w: f64, b: f64) -> f64 {
    let y_pred = predict(x, w, b);
    -2.0 * x * (y_true - y_pred)
}

// Đạo hàm của loss theo b: dL/db = -2 * (y_true - y_pred)
fn d_loss_db(x: f64, y_true: f64, w: f64, b: f64) -> f64 {
    let y_pred = predict(x, w, b);
    -2.0 * (y_true - y_pred)
}

fn main() {
    println!("╔══════════════════════════════════════════════════════════════════════╗");
    println!("║     GRADIENT DESCENT CHO NEURAL NETWORK (LINEAR REGRESSION)          ║");
    println!("╚══════════════════════════════════════════════════════════════════════╝");

    // =====================================================
    // DỮ LIỆU HUẤN LUYỆN
    // =====================================================
    // Bài toán: Dự đoán giá nhà
    // Input: Diện tích (x)
    // Output: Giá nhà (y)
    // Đáp án: y = 3*x + 5 (cứ mỗi m² thêm 3 triệu, giá cơ bản 5 triệu)

    let x_data = vec![1.0, 2.0, 3.0, 4.0, 5.0];
    let y_data = vec![8.0, 11.0, 14.0, 17.0, 20.0];

    println!("\\n=== DỮ LIỆU HUẤN LUYỆN ===");
    println!("Đáp án đúng: y = 3*x + 5");
    println!("");
    println!("╔═══════════════════════════════════════╗");
    println!("║  Diện tích(x)  │  Giá thực (y)   ║");
    println!("╠═══════════════════════════════════════╣");
    for i in 0..x_data.len() {
        println!("║       {:>4.0}       │      {:>5.0}        ║",
                 x_data[i], y_data[i]);
    }
    println════════════════════════════!("╚═══════════╝");

    // =====================================================
    // KHỞI TẠO WEIGHTS
    // =====================================================
    // Bắt đầu với w = 0, b = 0 (hoàn toàn sai!)
    let mut w = 0.0;
    let mut b = 0.0;
    let learning_rate = 0.01;

    println!("\\n=== TRẠNG THÁI BAN ĐẦU ===");
    println!("w (weight) = {}", w);
    println!("b (bias) = {}", b);
    println!("Công thức dự đoán: y = {}*x + {}", w, b);
    println!("\\nDự đoán ban đầu (TẤT SAI!):");
    for i in 0..x_data.len() {
        let y_pred = predict(x_data[i], w, b);
        println!("  x = {}: dự đoán = {:.1}, thực = {:.1}",
                 x_data[i], y_pred, y_data[i]);
    }

    // =====================================================
    // TRAINING LOOP
    // =====================================================
    println!("\\n=== TRAINING LOOP (Gradient Descent) ===\\n");

    let n_epochs = 1000;

    for epoch in 0..n_epochs {
        // Tính gradient trên toàn bộ dữ liệu
        let mut dw = 0.0;  // Gradient theo w
        let mut db = 0.0;  // Gradient theo b
        let n = x_data.len() as f64;

        // Sum gradients
        for i in 0..x_data.len() {
            dw += d_loss_dw(x_data[i], y_data[i], w, b);
            db += d_loss_db(x_data[i], y_data[i], w, b);
        }

        // Trung bình gradient
        dw /= n;
        db /= n;

        // Cập nhật weights
        w = w - learning_rate * dw;
        b = b - learning_rate * db;

        // In loss mỗi 100 epochs
        if epoch % 200 == 0 || epoch == n_epochs - 1 {
            // Tính loss trung bình
            let mut total_loss = 0.0;
            for i in 0..x_data.len() {
                let y_pred = predict(x_data[i], w, b);
                total_loss += loss(y_data[i], y_pred);
            }
            let avg_loss = total_loss / n;

            println!("Epoch {:4}: w = {:6.4}, b = {:6.4}, Loss = {:8.4}",
                     epoch, w, b, avg_loss);
        }
    }

    // =====================================================
    // KẾT QUẢ
    // =====================================================
    println!("\\n=== KẾT QUẢ SAU TRAINING ===");
    println!("w tìm được: {:.4} (đáp án: 3.0)", w);
    println!("b tìm được: {:.4} (đáp án: 5.0)", b);

    println!("\\n=== KIỂM TRA ===");
    println!("╔════════════════════════════════════════════════════════╗");
    println!("║  x  │ Thực │ Dự đoán │ Sai số │                      ║");
    println!("╠═════╪══════╪═════════╪════════╣");
    for i in 0..x_data.len() {
        let y_pred = predict(x_data[i], w, b);
        let error = (y_data[i] - y_pred).abs();
        println!("║ {:3} │ {:4} │  {:5.2}  │ {:5.3}║",
                 x_data[i] as i32,
                 y_data[i] as i32,
                 y_pred,
                 error);
    }
    println!("╚════════════════════════════════════════════════════════╝");

    println!("\\n=== GIẢI THÍCH CHI TIẾT TỪNG BƯỚC ===");
    println!("1. Forward pass: Tính y_pred = w*x + b");
    println!("2. Tính loss: (y_pred - y_true)²");
    println!("3. Tính gradient: dL/dw = -2*x*(y_pred-y_true)");
    println!("4. Cập nhật: w = w - lr * dL/dw");
    println!("5. Lặp lại cho đến khi loss đủ nhỏ!");
    println!("\\nĐây là cách Neural Networks HỌC!");
}`,
  },
];

// =====================================================
// Export Bài 3
// =====================================================

export const ch21_03: Chapter = {
  id: 'ch21_03',
  title: '21.3. Gradient Descent',
  introduction: `
    <h2>Gradient Descent - Cách Neural Networks Học</h2>
    <ul>
      <li>Vấn đề tìm weights tốt nhất</li>
      <li>Gradient Descent là gì</li>
      <li>Áp dụng vào Neural Network</li>
    </ul>
  `,
  lessons: ch21_03_lessons,
};

export default ch21_03;
