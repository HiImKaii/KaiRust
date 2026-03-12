import { Lesson, Chapter } from '../../courses';

const ch22_05_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: MOTIVATION — ĐƠN GIẢN HÓA LSTM
  // ==========================================================
  {
    id: 'ch22_05_01',
    title: '1. Motivation — Đơn giản hóa LSTM',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Tại sao cần GRU?</h2>

  <p>LSTM giải quyết được vanishing gradient nhưng đi kèm <strong>chi phí lớn</strong>: 4 bộ weights (3 gate + 1 candidate), gấp 4× params so với Vanilla RNN, train chậm, tốn bộ nhớ. Câu hỏi đặt ra: <em>có thể đạt hiệu quả tương đương LSTM với kiến trúc đơn giản hơn không?</em></p>

  <p><strong>Cho et al. (2014)</strong> đã trả lời bằng <strong>GRU (Gated Recurrent Unit)</strong> — một kiến trúc gộp 2 ý tưởng chính:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Đơn giản hóa 1: Gộp gate</h4>
      <p>LSTM có Forget Gate + Input Gate <strong>hoạt động độc lập</strong>. GRU gộp cả hai thành 1 <strong>Update Gate ($z_t$)</strong>. Logic: nếu "quên" nhiều thì "thêm" nhiều, nếu "nhớ" nhiều thì "thêm" ít → không cần 2 gate riêng.</p>
      <p>$z_t$ ≈ 1: giữ cũ (= forget gate LSTM ≈ 1)</p>
      <p>$z_t$ ≈ 0: dùng mới (= input gate LSTM ≈ 1)</p>
    </div>
    <div class="concept-card">
      <h4>Đơn giản hóa 2: Bỏ Cell State</h4>
      <p>LSTM dùng 2 state: $h_t$ (hidden) + $C_t$ (cell). GRU chỉ dùng <strong>1 state duy nhất: $h_t$</strong>. Hidden state đảm nhiệm cả vai trò "trí nhớ dài hạn" lẫn "output".</p>
      <p>Kết quả: ít bộ nhớ hơn, ít tính toán hơn.</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch22/lstm_vs_gru_comparison.png" alt="LSTM vs GRU Comparison" />
    <div class="image-caption">So sánh kiến trúc LSTM (4 thành phần, có Cell State) và GRU (2 gate, không có Cell State riêng)</div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Kết quả thực nghiệm</span>
      <p>Nhiều nghiên cứu (Chung et al., 2014; Jozefowicz et al., 2015) cho thấy GRU và LSTM có <strong>hiệu năng tương đương</strong> trên hầu hết các bài toán. GRU thường train <strong>nhanh hơn 10-15%</strong> và tiết kiệm bộ nhớ hơn. Tuy nhiên, với chuỗi rất dài hoặc bài toán phức tạp, LSTM có thể nhỉnh hơn.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: UPDATE GATE
  // ==========================================================
  {
    id: 'ch22_05_02',
    title: '2. Update Gate ($z_t$)',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Update Gate ($z_t$) — "Bao nhiêu cũ, bao nhiêu mới?"</h2>

  <div class="image-showcase">
    <img src="/images/ch22/gru_cell_diagram.png" alt="GRU Cell Architecture" />
    <div class="image-caption">Kiến trúc GRU Cell: Update Gate ($z_t$) và Reset Gate ($r_t$) điều khiển dòng thông tin, không có Cell State riêng biệt</div>
  </div>

  <h3>2.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Update Gate:</h4>
    <p class="font-mono text-lg">$z_t = \\sigma(W_z \\cdot [h_{t-1}, x_t] + b_z)$</p>
    <p>Output: mỗi phần tử $z_t \\in (0, 1)$</p>
  </div>

  <h3>2.2. Vai trò kép: Forget + Input</h3>

  <p>Update Gate kết hợp <strong>cả 2 chức năng</strong> của Forget Gate và Input Gate trong LSTM:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Giá trị $z_t$</th>
        <th>Hành vi</th>
        <th>Tương đương LSTM</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$z_t \\approx 1$</strong></td>
        <td>$h_t \\approx \\tilde{h}_t$ — dùng <strong>thông tin mới</strong></td>
        <td>Input Gate ≈ 1, Forget Gate ≈ 0</td>
      </tr>
      <tr>
        <td><strong>$z_t \\approx 0$</strong></td>
        <td>$h_t \\approx h_{t-1}$ — giữ <strong>thông tin cũ</strong></td>
        <td>Input Gate ≈ 0, Forget Gate ≈ 1</td>
      </tr>
      <tr>
        <td><strong>$z_t \\approx 0.5$</strong></td>
        <td>Trung bình cả cũ lẫn mới</td>
        <td>Cả 2 gate ≈ 0.5</td>
      </tr>
    </tbody>
  </table>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Hidden State Update (dùng Update Gate):</h4>
    <p class="font-mono text-lg">$h_t = (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tilde{h}_t$</p>
    <p>Trong đó:</p>
    <ul>
      <li>$(1 - z_t) \\odot h_{t-1}$: phần <strong>giữ lại</strong> từ hidden state cũ</li>
      <li>$z_t \\odot \\tilde{h}_t$: phần <strong>thêm mới</strong> từ candidate</li>
    </ul>
    <p>Tổng hệ số luôn = 1: $(1 - z_t) + z_t = 1$ → <strong>convex combination</strong> (tổ hợp lồi).</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Ràng buộc $(1 - z_t)$: Đây là "mẹo" GRU</span>
      <p>Thay vì dùng 2 gate độc lập (Forget + Input), GRU dùng <strong>cùng 1 gate $z_t$</strong> và tính phần bù $(1 - z_t)$. Ràng buộc: "quên bao nhiêu thì thêm bấy nhiêu" → giảm 1 bộ params mà vẫn kiểm soát được dòng thông tin. Đây là trực giác chính tạo sự đơn giản.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: RESET GATE
  // ==========================================================
  {
    id: 'ch22_05_03',
    title: '3. Reset Gate ($r_t$)',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Reset Gate ($r_t$) — Quyết định "nhìn lại" bao nhiêu quá khứ</h2>

  <h3>3.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Reset Gate:</h4>
    <p class="font-mono text-lg">$r_t = \\sigma(W_r \\cdot [h_{t-1}, x_t] + b_r)$</p>
    <p>Output: mỗi phần tử $r_t \\in (0, 1)$</p>
  </div>

  <h3>3.2. Cách Reset Gate ảnh hưởng Candidate</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Candidate Hidden State:</h4>
    <p class="font-mono text-lg">$\\tilde{h}_t = \\tanh(W \\cdot [r_t \\odot h_{t-1}, x_t] + b)$</p>
    <p>Chú ý: $r_t$ nhân <strong>trước khi</strong> concat với $x_t$, nghĩa là nó "lọc" hidden state cũ trước khi tạo candidate mới.</p>
  </div>

  <h3>3.3. Ý nghĩa từng giá trị</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Giá trị $r_t$</th>
        <th>Ý nghĩa</th>
        <th>Ví dụ sử dụng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$r_t \\approx 0$</strong></td>
        <td>Bỏ qua hidden state cũ hoàn toàn → candidate chỉ dựa vào $x_t$</td>
        <td>Bắt đầu chủ đề hoàn toàn mới, quá khứ không liên quan</td>
      </tr>
      <tr>
        <td><strong>$r_t \\approx 1$</strong></td>
        <td>Giữ toàn bộ hidden state cũ → candidate dùng cả $h_{t-1}$ lẫn $x_t$</td>
        <td>Tiếp tục cùng chủ đề, quá khứ vẫn quan trọng</td>
      </tr>
    </tbody>
  </table>

  <h3>3.4. So sánh Reset Gate vs Forget Gate (LSTM)</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>LSTM Forget Gate</h4>
      <p>Trực tiếp xóa thông tin khỏi <strong>Cell State</strong>: $C_t = f_t \\odot C_{t-1} + ...$</p>
      <p>Ảnh hưởng: Cell State bị thay đổi vĩnh viễn.</p>
    </div>
    <div class="concept-card">
      <h4>GRU Reset Gate</h4>
      <p>Chỉ ảnh hưởng "góc nhìn" khi tạo <strong>candidate</strong>: $\\tilde{h}_t = \\tanh(..., r_t \\odot h_{t-1}, ...)$</p>
      <p>Ảnh hưởng: Hidden state cũ không bị xóa trực tiếp, chỉ bị "che đi" tạm thời khi tính candidate.</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Khi $r_t = 0$: GRU trở thành RNN "đơn giản"</span>
      <p>Nếu Reset Gate = 0 → candidate $\\tilde{h}_t = \\tanh(W \\cdot [\\mathbf{0}, x_t] + b)$ chỉ phụ thuộc vào $x_t$. Kết hợp với $z_t \\approx 1$, ta có: $h_t \\approx \\tilde{h}_t = \\tanh(W_x \\cdot x_t + b)$ → giống như 1 layer FNN đơn giản. Điều này cho thấy GRU có thể "tự động" chuyển về chế độ FNN khi cần.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: FORWARD PASS ĐẦY ĐỦ
  // ==========================================================
  {
    id: 'ch22_05_04',
    title: '4. GRU Forward Pass — Tổng hợp đầy đủ',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. GRU Forward Pass — Toàn bộ 4 phương trình</h2>

  <h3>4.1. Tổng hợp công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>4 phương trình GRU (thứ tự thực thi):</h4>
    <p class="font-mono text-lg">1. $z_t = \\sigma(W_z \\cdot [h_{t-1}, x_t] + b_z)$ &nbsp; <em>← Update Gate</em></p>
    <p class="font-mono text-lg">2. $r_t = \\sigma(W_r \\cdot [h_{t-1}, x_t] + b_r)$ &nbsp; <em>← Reset Gate</em></p>
    <p class="font-mono text-lg">3. $\\tilde{h}_t = \\tanh(W \\cdot [r_t \\odot h_{t-1}, x_t] + b)$ &nbsp; <em>← Candidate</em></p>
    <p class="font-mono text-lg">4. $h_t = (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tilde{h}_t$ &nbsp; <em>← Hidden State</em></p>
  </div>

  <h3>4.2. Bảng kích thước (Shape Analysis)</h3>

  <p>Với Input dim = D, Hidden dim = H:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thành phần</th>
        <th>Shape</th>
        <th>Số parameters</th>
        <th>Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$W_z$</strong></td>
        <td>(H, H+D)</td>
        <td>H × (H+D)</td>
        <td>Update gate weights</td>
      </tr>
      <tr>
        <td><strong>$W_r$</strong></td>
        <td>(H, H+D)</td>
        <td>H × (H+D)</td>
        <td>Reset gate weights</td>
      </tr>
      <tr>
        <td><strong>$W$</strong></td>
        <td>(H, H+D)</td>
        <td>H × (H+D)</td>
        <td>Candidate weights</td>
      </tr>
      <tr>
        <td><strong>$b_z, b_r, b$</strong></td>
        <td>(H,) × 3</td>
        <td>3H</td>
        <td>Bias cho 3 phép tính</td>
      </tr>
      <tr>
        <td><strong>TỔNG</strong></td>
        <td>—</td>
        <td><strong>3 × [H(H+D) + H]</strong></td>
        <td><strong>= 3 × params_RNN_cell</strong></td>
      </tr>
    </tbody>
  </table>

  <h3>4.3. Gradient Flow trong GRU</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Gradient qua hidden state:</h4>
    <p class="font-mono text-lg">$\\frac{\\partial h_t}{\\partial h_{t-1}} = (1 - z_t) + z_t \\cdot \\frac{\\partial \\tilde{h}_t}{\\partial h_{t-1}}$</p>
    <p>Thành phần $(1 - z_t)$ là "shortcut" gradient — khi $z_t \\approx 0$ (giữ cũ), gradient chảy qua gần nguyên vẹn, tương tự Cell State trong LSTM.</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">GRU ít params hơn LSTM 25%</span>
      <p>LSTM: <strong>4 × [H(H+D) + H]</strong> params. GRU: <strong>3 × [H(H+D) + H]</strong> params. GRU chỉ cần <strong>75%</strong> params so với LSTM (3/4). Ví dụ: D=256, H=512 → LSTM ≈ 1.57M params, GRU ≈ 1.18M params. Tiết kiệm ~400K params.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// GRU FORWARD PASS — So sánh cùng input với LSTM
// =====================================================
// Input dim D=2, Hidden dim H=3
// Tính qua 3 bước thời gian: x_1, x_2, x_3
// =====================================================

fn sigmoid(x: f64) -> f64 {
    1.0 / (1.0 + (-x).exp())
}

fn main() {
    let d = 2;  // Input dimension
    let h = 3;  // Hidden dimension
    
    // Input sequence (3 bước — giống LSTM example)
    let inputs = vec![
        vec![1.0, 0.5],   // x_1
        vec![0.3, 0.8],   // x_2
        vec![0.7, 0.2],   // x_3
    ];
    
    // === WEIGHTS (shape: H × (H+D) = 3 × 5) ===
    // Update gate
    let w_z = vec![
        0.1, -0.1, 0.2, 0.3, -0.1,
        0.2,  0.1, 0.0, 0.1,  0.2,
       -0.1,  0.3, 0.1, 0.2,  0.0,
    ];
    let b_z = vec![0.0, 0.0, 0.0];
    
    // Reset gate
    let w_r = vec![
        0.2, 0.1, -0.1, 0.0,  0.3,
       -0.1, 0.2,  0.1, 0.3, -0.2,
        0.0, 0.1,  0.2, 0.1,  0.1,
    ];
    let b_r = vec![0.0, 0.0, 0.0];
    
    // Candidate
    let w_h = vec![
        0.3, -0.2, 0.1,  0.2,  0.0,
        0.1,  0.3, 0.0, -0.1,  0.2,
       -0.2,  0.1, 0.3,  0.1, -0.1,
    ];
    let b_h = vec![0.0, 0.0, 0.0];
    
    // Initial hidden state
    let mut h_prev = vec![0.0_f64; h];
    
    println!("╔══════════════════════════════════════════════════════╗");
    println!("║            GRU FORWARD PASS — STEP BY STEP          ║");
    println!("║          D={}, H={}, T={}                              ║", d, h, inputs.len());
    println!("║      Chỉ cần 3 bộ weights (vs LSTM: 4 bộ)          ║");
    println!("╠══════════════════════════════════════════════════════╣");
    
    for (t, x) in inputs.iter().enumerate() {
        // Concat [h_(t-1), x_t]
        let mut concat = h_prev.clone();
        concat.extend_from_slice(x);
        
        let matmul = |w: &[f64], b: &[f64], input: &[f64]| -> Vec<f64> {
            let cols = input.len();
            let mut out = vec![0.0; h];
            for i in 0..h {
                for j in 0..cols {
                    out[i] += w[i * cols + j] * input[j];
                }
                out[i] += b[i];
            }
            out
        };
        
        // 1. Update Gate: z_t = σ(W_z · [h, x] + b_z)
        let z: Vec<f64> = matmul(&w_z, &b_z, &concat)
            .iter().map(|&v| sigmoid(v)).collect();
        
        // 2. Reset Gate: r_t = σ(W_r · [h, x] + b_r)
        let r: Vec<f64> = matmul(&w_r, &b_r, &concat)
            .iter().map(|&v| sigmoid(v)).collect();
        
        // 3. Candidate: h̃_t = tanh(W · [r⊙h, x] + b)
        let mut concat_reset: Vec<f64> = (0..h)
            .map(|k| r[k] * h_prev[k]).collect();
        concat_reset.extend_from_slice(x);
        
        let h_tilde: Vec<f64> = matmul(&w_h, &b_h, &concat_reset)
            .iter().map(|&v| v.tanh()).collect();
        
        // 4. Hidden State: h_t = (1-z)⊙h_(t-1) + z⊙h̃_t
        let h_new: Vec<f64> = (0..h)
            .map(|k| (1.0 - z[k]) * h_prev[k] + z[k] * h_tilde[k])
            .collect();
        
        println!("║");
        println!("║  ━━━ t={} ━━━  x = [{:.1}, {:.1}]", t + 1, x[0], x[1]);
        println!("║  z_t     = [{:.4}, {:.4}, {:.4}]  ← Update Gate", z[0], z[1], z[2]);
        println!("║  r_t     = [{:.4}, {:.4}, {:.4}]  ← Reset Gate", r[0], r[1], r[2]);
        println!("║  h̃_t     = [{:.4}, {:.4}, {:.4}]  ← Candidate", h_tilde[0], h_tilde[1], h_tilde[2]);
        println!("║  h_t     = [{:.4}, {:.4}, {:.4}]  ← Final", h_new[0], h_new[1], h_new[2]);
        
        h_prev = h_new;
    }
    
    // So sánh số params
    let params_rnn = (h + d) * h + h;
    let params_lstm = 4 * params_rnn;
    let params_gru = 3 * params_rnn;
    
    println!("║");
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  Final h_T = [{:.4}, {:.4}, {:.4}]", h_prev[0], h_prev[1], h_prev[2]);
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  Tham số (D={}, H={}):                              ", d, h);
    println!("║    Vanilla RNN: {} params", params_rnn);
    println!("║    LSTM:        {} params (×4)", params_lstm);
    println!("║    GRU:         {} params (×3) ← tiết kiệm 25%!", params_gru);
    println!("╚══════════════════════════════════════════════════════╝");
}`
  },
  // ==========================================================
  // LESSON 5: SO SÁNH LSTM vs GRU
  // ==========================================================
  {
    id: 'ch22_05_05',
    title: '5. So sánh LSTM vs GRU & Tóm tắt',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. So sánh chi tiết LSTM vs GRU</h2>

  <h3>5.1. Bảng so sánh toàn diện</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>LSTM</th>
        <th>GRU</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Năm công bố</strong></td>
        <td>1997 (Hochreiter & Schmidhuber)</td>
        <td>2014 (Cho et al.)</td>
      </tr>
      <tr>
        <td><strong>Số gate</strong></td>
        <td>3 (Forget, Input, Output)</td>
        <td>2 (Update, Reset)</td>
      </tr>
      <tr>
        <td><strong>State</strong></td>
        <td>2: $h_t$ + $C_t$ (Cell State)</td>
        <td>1: chỉ $h_t$</td>
      </tr>
      <tr>
        <td><strong>Số params</strong></td>
        <td>4 × [H(H+D) + H]</td>
        <td>3 × [H(H+D) + H] (ít hơn 25%)</td>
      </tr>
      <tr>
        <td><strong>Tốc độ train</strong></td>
        <td>Chậm hơn (nhiều phép tính hơn)</td>
        <td>Nhanh hơn ~10-15%</td>
      </tr>
      <tr>
        <td><strong>Bộ nhớ GPU</strong></td>
        <td>Nhiều hơn (lưu cả $h_t$ + $C_t$)</td>
        <td>Ít hơn (chỉ lưu $h_t$)</td>
      </tr>
      <tr>
        <td><strong>Long-range dependency</strong></td>
        <td>Tốt — Cell State highway</td>
        <td>Khá tốt — $(1-z_t)$ shortcut</td>
      </tr>
      <tr>
        <td><strong>Hiệu năng (benchmarks)</strong></td>
        <td>Nhỉnh hơn trên chuỗi rất dài</td>
        <td>Tương đương trên chuỗi ngắn-trung</td>
      </tr>
      <tr>
        <td><strong>Output Gate?</strong></td>
        <td>Có — lọc Cell State trước khi xuất</td>
        <td>Không — hidden state xuất trực tiếp</td>
      </tr>
    </tbody>
  </table>

  <h3>5.2. Quy tắc chọn LSTM hay GRU?</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Chọn LSTM khi:</h4>
      <ul>
        <li>Chuỗi <strong>rất dài</strong> (>500 tokens)</li>
        <li>Bài toán cần <strong>kiểm soát chính xác</strong> dòng thông tin (ví dụ: machine translation)</li>
        <li>Đủ <strong>tài nguyên tính toán</strong> (GPU mạnh, thời gian train dư dả)</li>
        <li>Bài toán đã có <strong>LSTM baseline tốt</strong> từ paper trước</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Chọn GRU khi:</h4>
      <ul>
        <li>Chuỗi <strong>ngắn-trung bình</strong> (<500 tokens)</li>
        <li>Cần <strong>train nhanh</strong>, hạn chế tài nguyên</li>
        <li><strong>Ít dữ liệu</strong> — ít params → ít overfitting</li>
        <li>Prototype nhanh — thử nghiệm ý tưởng</li>
        <li><strong>Real-time</strong> inference (ít tính toán hơn)</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Lời khuyên thực tế</span>
      <p>Nếu không chắc: <strong>thử cả hai, so sánh validation performance</strong>. Trong thực tế, sự khác biệt hiệu năng giữa LSTM và GRU thường <strong>nhỏ hơn</strong> sự khác biệt do hyperparameter tuning (learning rate, hidden size, dropout). Thời gian tune hyperparameters cho GRU thường hiệu quả hơn thời gian chuyển đổi giữa LSTM↔GRU.</p>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 22.5 — GRU: Đơn Giản Hóa LSTM</h3>
    <ul>
      <li><strong>GRU</strong> (Cho et al., 2014): đơn giản hóa LSTM bằng cách gộp Forget+Input thành Update Gate, bỏ Cell State riêng</li>
      <li><strong>Update Gate ($z_t$):</strong> $\\sigma(W_z \\cdot [h, x] + b_z)$ — "bao nhiêu cũ, bao nhiêu mới?" → $h_t = (1-z_t) \\odot h_{t-1} + z_t \\odot \\tilde{h}_t$</li>
      <li><strong>Reset Gate ($r_t$):</strong> $\\sigma(W_r \\cdot [h, x] + b_r)$ — "nhìn lại bao nhiêu quá khứ khi tạo candidate?"</li>
      <li><strong>Params:</strong> GRU = 3/4 LSTM (ít hơn 25%), train nhanh hơn 10-15%</li>
      <li><strong>Hiệu năng:</strong> Tương đương LSTM trên hầu hết bài toán, LSTM nhỉnh hơn khi chuỗi rất dài</li>
      <li><strong>Quy tắc chọn:</strong> Thử cả hai → so validation. GRU làm baseline nhanh, LSTM khi cần độ chính xác cao nhất</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Bài tiếp theo</span>
      <p>Bài 22.6 sẽ mở rộng các kiến trúc RNN: <strong>Bidirectional RNN</strong> (đọc 2 chiều), <strong>Stacked/Deep RNN</strong> (xếp chồng layers), <strong>Seq2Seq Encoder-Decoder</strong> (dịch máy), <strong>Teacher Forcing</strong>, và <strong>Beam Search</strong>.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_05: Chapter = {
  id: 'ch22_05',
  title: '22.5. GRU — Đơn Giản Hóa LSTM',
  introduction: 'Gated Recurrent Unit: Update Gate, Reset Gate, so sánh chi tiết với LSTM về kiến trúc, số tham số, và hiệu năng.',
  lessons: ch22_05_lessons,
};

export default ch22_05;
