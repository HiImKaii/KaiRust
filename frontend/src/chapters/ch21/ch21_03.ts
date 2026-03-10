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
<div class="article-content">
  <h2><span class="material-symbols-outlined">psychology</span> 7. Vấn đề: Làm sao tìm được weights tốt nhất?</h2>

  <h3>7.1. Nhắc lại bài cũ</h3>
  <div class="definition-block">
    <p>Ở bài trước, ta đã biết Neural Network có công thức:</p>
    <div class="formula-block">
      y = f(w₁x₁ + w₂x₂ + ... + b)
    </div>
    <p>Và ta cần tìm <strong>weights (w)</strong> và <strong>bias (b)</strong> để output gần với giá trị thực nhất.</p>
  </div>

  <h3>7.2. Thử tất cả các giá trị - Brute Force</h3>
  <p>Cách đơn giản nhất: Thử tất cả các giá trị có thể của w và b!</p>
  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <strong>Ví dụ Brute Force:</strong>
      <ul>
        <li>w từ -10 đến 10, bước 0.1 → <strong>200 giá trị</strong></li>
        <li>b từ -10 đến 10, bước 0.1 → <strong>200 giá trị</strong></li>
        <li>Tổng cộng: 200 × 200 = <strong>40,000 combinations</strong></li>
      </ul>
      <p class="mt-2 text-red-400"><strong>Vấn đề:</strong> Với Neural Network thực tế có HÀNG TRIỆU weights, cách này KHÔNG THỂ TÍNH TOÁN NỔI!</p>
    </div>
  </div>

  <h3>7.3. Thử ngẫu nhiên - Random Search</h3>
  <p>Cách khác: Chọn ngẫu nhiên weights nhiều lần và giữ lại bộ số có Loss thấp nhất.</p>
  <pre><code class="language-python">def random_search():
    best_loss = infinity
    best_weights = None

    for i in range(10000):
        weights = random()
        loss = compute_loss(weights)
        if loss < best_loss:
            best_loss = loss
            best_weights = weights

    return best_weights</code></pre>
  <p><strong>Vấn đề:</strong> Không hiệu quả vì nó giống như đi tìm kim đáy biển, tốn vô vàn lần thử một cách vô định!</p>

  <h3><span class="material-symbols-outlined">check_circle</span> 7.4. Giải pháp: Gradient Descent</h3>
  <div class="key-takeaway">
    <strong>Gradient Descent</strong> là thuật toán tìm điểm tối ưu BẰNG TOÁN HỌC, có định hướng rõ ràng, không cần thử mò ngẫu nhiên!
    <ul class="mt-2">
      <li>Nhanh hơn Brute Force.</li>
      <li>Chính xác hơn Random Search.</li>
      <li>Áp dụng được cho mạng có hàng triệu (thậm chí tỷ) parameters.</li>
    </ul>
  </div>
</div>
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
<div class="article-content">
  <h2><span class="material-symbols-outlined">image</span> 8. Gradient Descent là gì? Giải thích bằng hình ảnh</h2>

  <h3>8.1. Ý tưởng cốt lõi</h3>
  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">lightbulb</span></div>
    <div class="callout-content">
      <p>Hãy tưởng tượng bạn đang đứng trên một ngọn núi trong sương mù. Bạn không nhìn thấy đường, nhưng bạn <strong>cảm nhận được độ dốc dưới chân</strong>. Nếu bạn muốn xuống đáy thung lũng nhanh nhất, bạn sẽ đi theo hướng <strong>dốc xuống</strong> lớn nhất!</p>
    </div>
  </div>

  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">moving</span></div>
      <h4>Gradient</h4>
      <p>Chính là "Độ dốc" tại điểm hiện tại bạn đang đứng.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">south</span></div>
      <h4>Descent</h4>
      <p>"Đi xuống" (giảm giá trị của hàm Loss).</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">turn_right</span></div>
      <h4>Chiến lược</h4>
      <p>Đi ngược hướng gradient (dốc lên) để hướng xuống đáy.</p>
    </div>
  </div>

  <div class="image-showcase mt-4 mb-4">
    <img src="/assets/ch21/gradient_descent_valley_1773153973142.png" alt="Gradient Descent Valley 3D" style="width: 100%; border-radius: 8px;">
    <p class="image-caption">Minh hoạ quá trình Gradient Descent nhảy từ đỉnh núi xuống đáy thung lũng (Loss thấp nhất)</p>
  </div>

  <h3>8.2. Gradient trong toán học</h3>
  <p><strong>Gradient</strong> của một hàm số f(x) tại điểm x chính là <strong>đạo hàm f'(x)</strong> tại điểm đó.</p>
  <div class="definition-block">
    <strong>Gradient cho biết:</strong>
    <ul>
      <li>Hướng đi <strong>LÊN</strong> dốc nhất (gradient dương).</li>
      <li>Hướng đi <strong>XUỐNG</strong> dốc nhất (gradient âm).</li>
      <li><strong>Độ dốc</strong> thay đổi nhanh đến mức nào (độ lớn của gradient).</li>
    </ul>
  </div>

  <h4>Ví dụ: f(x) = x²</h4>
  <table class="comparison-table">
    <thead>
      <tr><th>Vị trí x</th><th>f(x) = x²</th><th>Gradient f'(x) = 2x</th><th>Hướng đi</th></tr>
    </thead>
    <tbody>
      <tr><td>10</td><td>100</td><td>+20</td><td>Đi lên → Cần đi ngược lại (giảm x)</td></tr>
      <tr><td>5</td><td>25</td><td>+10</td><td>Đi lên → Cần đi ngược lại</td></tr>
      <tr><td>1</td><td>1</td><td>+2</td><td>Đi lên nhẹ → Cần đi ngược lại</td></tr>
      <tr class="highlight"><td>0</td><td>0</td><td>0</td><td>Đáy phẳng → Tối ưu! (Loss cực tiểu)</td></tr>
      <tr><td>-1</td><td>1</td><td>-2</td><td>Đi xuống → Cần đi tiếp (tăng x)</td></tr>
      <tr><td>-5</td><td>25</td><td>-10</td><td>Đi xuống → Cần đi tiếp</td></tr>
    </tbody>
  </table>

  <h3>8.3. Công thức Gradient Descent</h3>
  <div class="formula-block">
    x_moi = x_cu - learning_rate * gradient
  </div>
  <p>Tính chất dấu Trừ (<code>-</code>) mang ý nghĩa điều hướng:</p>
  <ul>
    <li>Gradient <strong>Dương</strong> (đang đi vào sườn dốc lên) → Cố tình <strong>Trừ</strong> để quay xe đi ngược lại.</li>
    <li>Gradient <strong>Âm</strong> (trúng sườn dốc xuống) → <strong>Trừ với Âm thành Cộng</strong> → Tới luôn đi tiếp.</li>
  </ul>

  <h3>8.4. Learning Rate (Tốc độ học tập / Kích thước bước)</h3>
  <p><strong>Learning rate</strong> (lr) quyết định <em>sải chân</em> của bạn dài bao nhiêu sau mỗi bước.</p>
  
  <div class="concept-grid">
    <div class="concept-card highlight-danger">
      <div class="concept-icon"><span class="material-symbols-outlined">fast_forward</span></div>
      <h4>Too Big (LR quá lớn)</h4>
      <p>Sải chân khổng lồ, nhảy vọt qua lại hai bên bờ thung lũng. <strong>Kết quả: Phân kỳ (Diverge)</strong>, mãi không xuống đáy.</p>
    </div>
    <div class="concept-card highlight-warning">
      <div class="concept-icon"><span class="material-symbols-outlined">slow_motion_video</span></div>
      <h4>Too Small (LR quá nhỏ)</h4>
      <p>Sải chân bằng con kiến nhích từng mm. <strong>Kết quả: Tốn cực kỳ nhiều thời gian</strong> (triệu bước) để xuống tới nơi.</p>
    </div>
    <div class="concept-card highlight-success">
      <div class="concept-icon"><span class="material-symbols-outlined">check</span></div>
      <h4>Just Right (LR vừa đủ)</h4>
      <p>Bước chân chắc nhịp, tiến lẹ nhưng phanh kịp sát đáy. <strong>Kết quả: Hội tụ nhanh và an toàn.</strong></p>
    </div>
  </div>

  <h3>8.5. Convex vs Non-convex</h3>
  <p>Gradient Descent có chắc chắn tìm được điểm tốt nhất không?</p>
  
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">interests</span></div>
      <h4>Convex (Hàm Lồi)</h4>
      <p>Như cái bát phở. Chỉ có <strong>DUY NHẤT một đáy</strong> (Global Minimum). Thả bi từ đâu cũng dồn về giữa. Đoan chắc GD sẽ ăn.</p>
      <p><em>(Ví dụ: Linear Regression)</em></p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">query_stats</span></div>
      <h4>Non-convex (Đồi núi ngập ghềnh)</h4>
      <p>Nhiều hố lồi lõm rải rác. Điểm kẹt tạm thời gọi là hố <strong>Local Minima</strong>. Đáy sâu nhất là <strong>Global Minimum</strong>.</p>
      <p><em>(Ví dụ: Neural Networks)</em></p>
    </div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">help_outline</span></div>
    <div class="callout-content">
      <strong>Ở mảng Deep Learning, điều kỳ diệu là:</strong> Dù mắc hố Local Minima suốt ngày, nhưng ở không gian hàng triệu/tỷ chiều, kết quả loss của Local Minima thường vẫn tiệm cận Global, đủ xài thực tế! Quái vật cản đường chính lại là <strong>Saddle Points</strong> (Điểm yên ngựa).
    </div>
  </div>

  <h3>8.6. Dấu hiệu dừng chạy GD (Early Stopping)</h3>
  <p>Khi nào biết ném cờ trắng không chạy tiếp vòng lặp nữa?</p>
  <ul class="steps-container">
    <li class="step-card">
      <div class="step-number">1</div>
      <p>Loss kẹt không thấy giảm thêm sau dăm ba vòng (Epoch) ròng rã.</p>
    </li>
    <li class="step-card">
      <div class="step-number">2</div>
      <p>Gradient ≈ 0 (Trượt sát đáy không còn đà đẩy nữa).</p>
    </li>
    <li class="step-card">
      <div class="step-number">3</div>
      <p>Đạt Target (Loss đã nhỏ ưng cái bụng chốt luôn).</p>
    </li>
  </ul>
</div>
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
<div class="article-content">
  <h2><span class="material-symbols-outlined">network_node</span> 9. Áp dụng Gradient Descent vào Neural Network</h2>

  <h3>9.1. Neural Network đơn giản nhất</h3>
  <p>Xét một Neural Network đơn giản nhất có thể: <strong>Linear Regression</strong> (Chỉ 1 input, 1 output, không activation)</p>
  <div class="formula-block">
    <p>y = w * x + b</p>
  </div>
  <div class="definition-block">
    <ul>
      <li><strong>x:</strong> input</li>
      <li><strong>w:</strong> weight (trọng số)</li>
      <li><strong>b:</strong> bias (độ lệch)</li>
      <li><strong>y:</strong> output dự đoán</li>
    </ul>
    <p><strong>Mục tiêu:</strong> Ta cần tìm w và b để y ≈ y_true (nhãn thật).</p>
  </div>

  <h3>9.2. Hàm mất mát (Loss Function)</h3>
  <p>Đo lường sai số giữa y dự đoán và y thực bằng Mean Squared Error (MSE):</p>
  <div class="formula-block">
    <p>MSE = (1/n) * Σ(y_pred - y_true)²</p>
    <p class="mt-2 text-sm">Hay với Linear Regression: MSE = (1/n) * Σ(w*x + b - y_true)²</p>
  </div>

  <h3>9.3. Tính gradient cho w và b</h3>
  <p>Ta cần tính đạo hàm riêng phần để biết cách sửa weight và bias:</p>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">functions</span></div>
      <h4>Gradient theo w (∂MSE/∂w)</h4>
      <p>Cho biết: Cần thay đổi w theo hướng nào để Loss giảm.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">tune</span></div>
      <h4>Gradient theo b (∂MSE/∂b)</h4>
      <p>Cho biết: Cần thay đổi b theo hướng nào để Loss giảm.</p>
    </div>
  </div>

  <div class="callout callout-info">
    <div class="callout-icon"><span class="material-symbols-outlined">auto_awesome</span></div>
    <div class="callout-content">
      <strong>Áp dụng Chain Rule (Đạo hàm hợp):</strong>
      <p>Gọi <code>y_pred = w*x + b = z</code> và <code>MSE = (z - y_true)²</code></p>
      <ul>
        <li>∂MSE/∂z = 2 * (z - y_true)</li>
        <li>∂z/∂w = x</li>
        <li>∂z/∂b = 1</li>
      </ul>
      <p><strong>Kết quả:</strong></p>
      <ul>
        <li>∂MSE/∂w = ∂MSE/∂z * ∂z/∂w = <strong>2*(z-y_true) * x</strong></li>
        <li>∂MSE/∂b = ∂MSE/∂z * ∂z/∂b = <strong>2*(z-y_true)</strong></li>
      </ul>
    </div>
  </div>

  <h3>9.4. Cập nhật weights</h3>
  <div class="formula-block">
    <p>w_moi = w_cu - lr * ∂MSE/∂w</p>
    <p>b_moi = b_cu - lr * ∂MSE/∂b</p>
  </div>

  <h3><span class="material-symbols-outlined">model_training</span> 9.5. Weight Initialization</h3>
  <p>Cách khởi tạo weights ảnh hưởng quyết định đến việc NN học được hay "mù chữ":</p>
  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">block</span></div>
      <h4>TẤT CẢ = 0</h4>
      <p>Tất cả neurons cho cùng output → Cùng lấy 1 gradient → Symmetry Problem không bao giờ bị phá vỡ. Mạng không học được!</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">shuffle</span></div>
      <h4>Ngẫu nhiên quá lớn</h4>
      <p>Ví dụ: [-100, 100]. Activation sẽ bị bão hòa (sigmoid ra 0 hoặc 1 hết), gây ra Vanishing gradient ngay từ Epoch 1!</p>
    </div>
    <div class="concept-card highlight-success">
      <div class="concept-icon"><span class="material-symbols-outlined">science</span></div>
      <h4>Xavier & He Init</h4>
      <p><strong>Xavier</strong> (cho Sigmoid/Tanh): <code>w ~ N(0, √(2 / (in+out)))</code></p>
      <p><strong>He</strong> (cho ReLU): <code>w ~ N(0, √(2 / in))</code></p>
    </div>
  </div>

  <h3><span class="material-symbols-outlined">balance</span> 9.6. Feature Scaling</h3>
  <p>Tại sao cần chuẩn hóa dữ liệu Input?</p>
  <div class="callout callout-warning">
    <div class="callout-icon"><span class="material-symbols-outlined">warning</span></div>
    <div class="callout-content">
      <strong>VẤN ĐỀ:</strong>
      <p>Nhà: Diện tích (50-500m²) và Số phòng (1-10).</p>
      <p>Gradient đi theo chiểu "Diện tích" quá lớn gây ra hiện tượng học "Zig-Zag" siêu chậm!</p>
    </div>
  </div>

  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">compress</span></div>
      <h4>Min-Max Normalization</h4>
      <code>x_norm = (x - min) / (max - min)</code>
      <p>→ Ép Output về thang [0, 1]</p>
      <p><em>Ví dụ: 50m² → 0.0,  500m² → 1.0</em></p>
    </div>
    <div class="feature-card">
      <div class="feature-icon"><span class="material-symbols-outlined">center_focus_strong</span></div>
      <h4>Z-Score Standardization</h4>
      <code>x_norm = (x - mean) / std</code>
      <p>→ Output: Trung bình = 0, Độ lệch chuẩn = 1</p>
      <p><em>Ví dụ: 275m² → 0.0</em></p>
    </div>
  </div>
  <div class="key-takeaway">
    Sau khi chuẩn hóa, tất cả Feature cùng Scale, GD chạy thẳng tắp xuống hố trung tâm, có thể hội tụ nhanh hơn gấp 10-100 lần!
  </div>
</div>
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
