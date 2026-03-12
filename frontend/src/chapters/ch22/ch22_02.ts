import { Lesson, Chapter } from '../../courses';


const ch22_02_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: RNN CELL — CẤU TRÚC BÊN TRONG CHI TIẾT
  // ==========================================================
  {
    id: 'ch22_02_01',
    title: '1. RNN Cell — Giải phẫu cấu trúc bên trong',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. RNN Cell — Giải phẫu cấu trúc bên trong</h2>

  <p>Ở Bài 22.1, ta đã biết công thức tổng quát $h_t = \\tanh(W_{hh} \\cdot h_{t-1} + W_{xh} \\cdot x_t + b_h)$. Bài này sẽ đi <strong>sâu hơn</strong> vào bên trong RNN cell: cách triển khai thực tế, computational graph, và phân tích kích thước chi tiết.</p>

  <div class="image-showcase">
    <img src="/images/ch22/rnn_cell_internal.png" alt="Cấu trúc bên trong RNN Cell" />
    <div class="image-caption">Cấu trúc bên trong 1 RNN Cell: x_t qua W_xh, h_(t-1) qua W_hh, cộng lại + bias, qua tanh → h_t, rồi qua W_hy → y_t</div>
  </div>

  <h3>1.1. Hai cách triển khai: Riêng biệt vs Concatenation</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Cách 1: Nhân riêng (Dạng lý thuyết)</h4>
      <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
        <p class="font-mono text-lg">$z_t = W_{xh} \\cdot x_t + W_{hh} \\cdot h_{t-1} + b_h$</p>
        <p class="font-mono text-lg">$h_t = \\tanh(z_t)$</p>
      </div>
      <p>2 phép nhân ma trận riêng biệt:</p>
      <ul>
        <li>$W_{xh} \\cdot x_t$: shape (H,D) × (D,1) = (H,1)</li>
        <li>$W_{hh} \\cdot h_{t-1}$: shape (H,H) × (H,1) = (H,1)</li>
        <li>Cộng 2 kết quả + bias → (H,1)</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Cách 2: Concatenation (Dạng thực tế)</h4>
      <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
        <p class="font-mono text-lg">$[h_{t-1}; x_t] \\rightarrow$ concat vector shape (H+D, 1)</p>
        <p class="font-mono text-lg">$W = [W_{hh} | W_{xh}]$ shape (H, H+D)</p>
        <p class="font-mono text-lg">$h_t = \\tanh(W \\cdot [h_{t-1}; x_t] + b_h)$</p>
      </div>
      <p><strong>1 phép nhân ma trận duy nhất.</strong> Tương đương toán học, nhưng:</p>
      <ul>
        <li>GPU tối ưu cho phép nhân ma trận lớn → nhanh hơn 2 phép riêng</li>
        <li>Code đơn giản hơn: chỉ 1 dòng matmul</li>
        <li>Đây là cách PyTorch, TensorFlow triển khai</li>
      </ul>
    </div>
  </div>

  <h3>1.2. Computational Graph bên trong RNN Cell</h3>

  <div class="definition-block">
    <span class="definition-term">Luồng dữ liệu trong 1 bước thời gian t</span>
    <ol>
      <li><strong>Concat:</strong> Nối $h_{t-1}$ (H chiều) và $x_t$ (D chiều) → vector (H+D) chiều</li>
      <li><strong>Linear Transform:</strong> Nhân với W shape (H, H+D) + bias b_h → vector z_t (H chiều)</li>
      <li><strong>Activation:</strong> $h_t = \\tanh(z_t)$ → vector h_t (H chiều), mỗi phần tử ∈ [-1, 1]</li>
      <li><strong>Output (nếu cần):</strong> $y_t = W_{hy} \\cdot h_t + b_y$ → vector (O chiều) — raw logits</li>
      <li><strong>Probability (nếu classification):</strong> $\\hat{y}_t = \\text{softmax}(y_t)$ → xác suất, tổng = 1</li>
    </ol>
  </div>

  <h3>1.3. Bảng kích thước thực tế</h3>

  <p>Ví dụ: Language Model với vocabulary 10,000 từ, embedding 256 chiều, hidden 512:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thành phần</th>
        <th>Shape</th>
        <th>Số params</th>
        <th>Giải thích</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Embedding Matrix E</strong></td>
        <td>(10000, 256)</td>
        <td>2,560,000</td>
        <td>Mỗi từ → vector 256 chiều. Lookup, không nhân ma trận</td>
      </tr>
      <tr>
        <td><strong>W (concat)</strong></td>
        <td>(512, 768)</td>
        <td>393,216</td>
        <td>768 = H+D = 512+256. Biến [h;x] thành h mới</td>
      </tr>
      <tr>
        <td><strong>b_h</strong></td>
        <td>(512,)</td>
        <td>512</td>
        <td>Bias cho hidden layer</td>
      </tr>
      <tr>
        <td><strong>W_hy</strong></td>
        <td>(10000, 512)</td>
        <td>5,120,000</td>
        <td>Hidden → output logits (V classes)</td>
      </tr>
      <tr>
        <td><strong>b_y</strong></td>
        <td>(10000,)</td>
        <td>10,000</td>
        <td>Bias cho output layer</td>
      </tr>
      <tr>
        <td><strong>TỔNG</strong></td>
        <td>—</td>
        <td><strong>8,083,728</strong></td>
        <td>~8M params — cùng bộ weights cho MỌI bước thời gian</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Nhận xét quan trọng</span>
      <p><strong>Phần lớn params nằm ở Embedding và Output layer</strong> (chiếm ~95%), không phải ở RNN cell. RNN cell chỉ có ~400K params. Đây là lý do tại sao vocabulary size ảnh hưởng lớn đến model size.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: FORWARD PASS END-TO-END
  // ==========================================================
  {
    id: 'ch22_02_02',
    title: '2. Forward Pass End-to-End: Input → Softmax → Loss',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Forward Pass End-to-End: Từ Input Token đến Loss</h2>

  <p>Bài 22.1 chỉ tính đến h_t. Bài này mở rộng: <strong>pipeline đầy đủ</strong> từ token đầu vào → embedding → hidden state → logits → softmax → xác suất → cross-entropy loss.</p>

  <h3>2.1. Pipeline đầy đủ 6 bước</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Token → Embedding</h4>
        <p>$x_t = E[\\text{token\\_id}_t]$</p>
        <p>Tra cứu (lookup) embedding vector từ bảng E. Không phải nhân ma trận — chỉ copy 1 hàng từ bảng.</p>
        <p><em>VD: token "mèo" có id=42 → x_t = E[42] = [0.2, -0.5, 0.8, ...]</em></p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Concat [h_(t-1); x_t]</h4>
        <p>Nối hidden state cũ và input mới thành 1 vector lớn.</p>
        <p><em>Shape: (H,) + (D,) = (H+D,)</em></p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Hidden State mới</h4>
        <p>$h_t = \\tanh(W \\cdot [h_{t-1}; x_t] + b_h)$</p>
        <p>Biến đổi tuyến tính + phi tuyến. h_t mã hóa thông tin từ tất cả input đã thấy.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Logits (Raw Scores)</h4>
        <p>$z_t^{out} = W_{hy} \\cdot h_t + b_y$</p>
        <p>Logits = "điểm số thô" cho mỗi class. Chưa chuẩn hóa, có thể âm hoặc rất lớn.</p>
        <p><em>Shape: (O,) = (V,) — V là vocabulary size</em></p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>Softmax → Xác suất</h4>
        <p>$\\hat{y}_t^{(i)} = \\frac{e^{z_i}}{\\sum_{j=1}^{V} e^{z_j}}$</p>
        <p>Chuyển logits thành xác suất: mỗi giá trị ∈ (0, 1), tổng = 1.</p>
        <p><em>VD: logits [2.0, 1.0, 0.5, 0.1] → softmax [0.506, 0.186, 0.113, 0.076, ...]</em></p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">6</div>
      <div class="step-content">
        <h4>Cross-Entropy Loss</h4>
        <p>$L_t = -\\log(\\hat{y}_t[\\text{target}])$</p>
        <p>Chỉ lấy xác suất của class đúng, rồi lấy -log. Xác suất cao (dự đoán đúng) → loss nhỏ. Xác suất thấp (dự đoán sai) → loss lớn.</p>
        <p><em>VD: target = class 0, ŷ[0] = 0.506 → L = -log(0.506) = 0.681</em></p>
        <p><em>Nếu ŷ[0] = 0.95 → L = -log(0.95) = 0.051 (rất nhỏ = dự đoán tốt)</em></p>
      </div>
    </div>
  </div>

  <h3>2.2. Tổng Loss qua toàn bộ chuỗi</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Total Loss:</h4>
    <p class="font-mono text-lg">$L = \\frac{1}{T} \\sum_{t=1}^{T} L_t = \\frac{1}{T} \\sum_{t=1}^{T} -\\log(\\hat{y}_t[\\text{target}_t])$</p>
    <p>Trung bình loss qua T bước thời gian. Mục tiêu: giảm L → mô hình dự đoán đúng hơn.</p>
  </div>

  <h3>2.3. Ý nghĩa Loss trong Language Model</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Loss value</th>
        <th>Xác suất trung bình cho đáp án đúng</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>L ≈ 0</strong></td>
        <td>~100%</td>
        <td>Model gần như luôn dự đoán đúng (hoặc overfit)</td>
      </tr>
      <tr>
        <td><strong>L ≈ 1</strong></td>
        <td>~37%</td>
        <td>Khá tốt cho bài toán nhiều classes</td>
      </tr>
      <tr>
        <td><strong>L ≈ 2.3</strong></td>
        <td>~10%</td>
        <td>Random guessing với 10 classes</td>
      </tr>
      <tr>
        <td><strong>L ≈ 9.2</strong></td>
        <td>~0.01%</td>
        <td>Random guessing với 10,000 classes (V=10K)</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Perplexity — Metric phổ biến cho Language Model</span>
      <p>$\\text{Perplexity} = e^L = e^{\\text{average cross-entropy loss}}$</p>
      <p>Perplexity = "trung bình model phải chọn giữa bao nhiêu từ". PPL = 10 nghĩa là mỗi bước, model "bối rối" giữa ~10 từ. PPL càng nhỏ = model càng tốt.</p>
      <ul>
        <li>PPL = 1: hoàn hảo (luôn đoán đúng)</li>
        <li>PPL = V: random (tệ nhất có thể)</li>
        <li>GPT-3 trên WikiText: PPL ≈ 20-30</li>
      </ul>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// FORWARD PASS ĐẦY ĐỦ: Token → Hidden → Softmax → Loss
// =====================================================
// Pipeline: token_id → embedding → concat → tanh → logits → softmax → cross-entropy
// =====================================================

fn softmax(logits: &[f64]) -> Vec<f64> {
    let max_val = logits.iter().cloned().fold(f64::NEG_INFINITY, f64::max);
    let exps: Vec<f64> = logits.iter().map(|&z| (z - max_val).exp()).collect();
    let sum: f64 = exps.iter().sum();
    exps.iter().map(|&e| e / sum).collect()
}

fn cross_entropy_loss(probs: &[f64], target: usize) -> f64 {
    -probs[target].ln()
}

fn main() {
    // === BÀI TOÁN: Dự đoán ký tự tiếp theo ===
    // Vocabulary: {h=0, e=1, l=2, o=3}
    // Training: "hello" → (h→e), (e→l), (l→l), (l→o)
    let vocab = ['h', 'e', 'l', 'o'];
    let v = vocab.len(); // V = 4
    let h_dim = 3;       // Hidden dimension
    
    // Dùng one-hot thay embedding (đơn giản để minh họa)
    let inputs = vec![
        vec![1.0, 0.0, 0.0, 0.0], // 'h'
        vec![0.0, 1.0, 0.0, 0.0], // 'e'
        vec![0.0, 0.0, 1.0, 0.0], // 'l'
        vec![0.0, 0.0, 1.0, 0.0], // 'l' (lần 2)
    ];
    let targets = [1, 2, 2, 3]; // e, l, l, o
    
    // Weights (khởi tạo nhỏ)
    let w_xh = vec![
        vec![0.1, 0.2, -0.1, 0.3],
        vec![0.4, -0.2, 0.1, 0.0],
        vec![-0.3, 0.1, 0.5, 0.2],
    ];
    let w_hh = vec![
        vec![0.2, -0.1, 0.3],
        vec![0.1, 0.4, -0.2],
        vec![-0.1, 0.2, 0.1],
    ];
    let b_h = vec![0.0; h_dim];
    let w_hy = vec![
        vec![0.5, -0.3, 0.1],
        vec![-0.2, 0.6, 0.3],
        vec![0.1, -0.1, 0.4],
        vec![0.3, 0.2, -0.5],
    ];
    let b_y = vec![0.0; v];
    
    let mut h = vec![0.0_f64; h_dim]; // h_0
    let mut total_loss = 0.0;
    
    println!("╔═══════════════════════════════════════════════════════════╗");
    println!("║  FORWARD PASS ĐẦY ĐỦ: 'hello' character prediction      ║");
    println!("╠═══════════════════════════════════════════════════════════╣");
    
    for (t, x) in inputs.iter().enumerate() {
        // Bước 1: W_xh · x_t
        let mut wxh_x = vec![0.0; h_dim];
        for i in 0..h_dim {
            for j in 0..v {
                wxh_x[i] += w_xh[i][j] * x[j];
            }
        }
        
        // Bước 2: W_hh · h_(t-1)
        let mut whh_h = vec![0.0; h_dim];
        for i in 0..h_dim {
            for j in 0..h_dim {
                whh_h[i] += w_hh[i][j] * h[j];
            }
        }
        
        // Bước 3: h_t = tanh(...)
        let mut h_new = vec![0.0; h_dim];
        for i in 0..h_dim {
            h_new[i] = (wxh_x[i] + whh_h[i] + b_h[i]).tanh();
        }
        
        // Bước 4: logits = W_hy · h_t + b_y
        let mut logits = vec![0.0; v];
        for i in 0..v {
            for j in 0..h_dim {
                logits[i] += w_hy[i][j] * h_new[j];
            }
            logits[i] += b_y[i];
        }
        
        // Bước 5: softmax
        let probs = softmax(&logits);
        
        // Bước 6: cross-entropy loss
        let loss = cross_entropy_loss(&probs, targets[t]);
        total_loss += loss;
        
        println!("║");
        println!("║  t={}: '{}' → target '{}'", t+1, vocab[if t==3 {2} else {t}], vocab[targets[t]]);
        println!("║    h_t    = [{:.3}, {:.3}, {:.3}]", h_new[0], h_new[1], h_new[2]);
        println!("║    logits = [{:.3}, {:.3}, {:.3}, {:.3}]",
                 logits[0], logits[1], logits[2], logits[3]);
        println!("║    probs  = [{:.3}, {:.3}, {:.3}, {:.3}]",
                 probs[0], probs[1], probs[2], probs[3]);
        println!("║    P(target='{}') = {:.3}", vocab[targets[t]], probs[targets[t]]);
        println!("║    loss_t = -ln({:.3}) = {:.3}", probs[targets[t]], loss);
        
        h = h_new;
    }
    
    let avg_loss = total_loss / inputs.len() as f64;
    let perplexity = avg_loss.exp();
    
    println!("║");
    println!("╠═══════════════════════════════════════════════════════════╣");
    println!("║  Total Loss = {:.3} / {} = {:.3}", total_loss, inputs.len(), avg_loss);
    println!("║  Perplexity = e^{:.3} = {:.3}", avg_loss, perplexity);
    println!("║  (Random guessing PPL = {} = V)", v);
    println!("╚═══════════════════════════════════════════════════════════╝");
}`
  },
  // ==========================================================
  // LESSON 3: WORD EMBEDDINGS
  // ==========================================================
  {
    id: 'ch22_02_03',
    title: '3. Word Embeddings — Biến từ thành Vector',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Word Embeddings — Biến từ thành Vector có ý nghĩa</h2>

  <p>RNN nhận input là <strong>vector số</strong>. Nhưng dữ liệu thực tế là <strong>từ ngữ</strong> (text). Cần chuyển từ → vector. Có 2 cách:</p>

  <div class="image-showcase">
    <img src="/images/ch22/word_embedding.png" alt="One-Hot vs Word Embeddings" />
    <div class="image-caption">So sánh One-Hot Encoding (sparse, high-dim) vs Word Embeddings (dense, low-dim) — embedding lưu ý nghĩa ngữ nghĩa</div>
  </div>

  <h3>3.1. Cách 1: One-Hot Encoding (Đơn giản nhưng yếu)</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Cách hoạt động</h4>
      <p>Mỗi từ = 1 vector dài bằng vocabulary size V, toàn số 0, chỉ 1 vị trí = 1.</p>
      <ul>
        <li>"cat" (id=0) → [<strong>1</strong>, 0, 0, 0, ...]</li>
        <li>"dog" (id=1) → [0, <strong>1</strong>, 0, 0, ...]</li>
        <li>"car" (id=2) → [0, 0, <strong>1</strong>, 0, ...]</li>
      </ul>
      <p>Vector size = V. Nếu V = 100,000 thì MỖI từ là vector 100,000 chiều!</p>
    </div>
    <div class="concept-card">
      <h4>Nhược điểm</h4>
      <ul>
        <li><strong>Quá lớn:</strong> V = 100K → mỗi từ là vector 100K chiều → tốn bộ nhớ</li>
        <li><strong>Sparse:</strong> 99.999% giá trị = 0 → lãng phí tính toán</li>
        <li><strong>Không có semantic meaning:</strong> Khoảng cách giữa "cat" và "dog" = khoảng cách giữa "cat" và "car" (đều = √2). Model không biết "cat" gần "dog" hơn "car"</li>
        <li><strong>Không trainable:</strong> One-hot cố định, không học được</li>
      </ul>
    </div>
  </div>

  <h3>3.2. Cách 2: Word Embeddings (Dense, có ý nghĩa)</h3>

  <div class="definition-block">
    <span class="definition-term">Word Embedding</span>
    <p>Mỗi từ được biểu diễn bằng 1 vector <strong>dense</strong> (dày đặc, không sparse) với kích thước nhỏ (128-512 chiều thay vì 100K chiều). Vector này mã hóa <strong>ý nghĩa ngữ nghĩa</strong> của từ.</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>One-Hot</th>
        <th>Word Embedding</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Kích thước</strong></td>
        <td>V (10K - 100K)</td>
        <td>D (128 - 512) — nhỏ hơn hàng trăm lần</td>
      </tr>
      <tr>
        <td><strong>Giá trị</strong></td>
        <td>0 hoặc 1 (binary)</td>
        <td>Số thực bất kỳ: 0.23, -0.45, 0.81, ...</td>
      </tr>
      <tr>
        <td><strong>Sparse/Dense</strong></td>
        <td>Sparse (99.99% = 0)</td>
        <td>Dense (mọi phần tử có giá trị)</td>
      </tr>
      <tr>
        <td><strong>Semantic</strong></td>
        <td>Không — mọi từ cách đều nhau</td>
        <td>Có — "cat" gần "dog", xa "car"</td>
      </tr>
      <tr>
        <td><strong>Trainable?</strong></td>
        <td>Không</td>
        <td>Có — học cùng model hoặc pretrained</td>
      </tr>
    </tbody>
  </table>

  <h3>3.3. Embedding Matrix — Bảng tra cứu</h3>

  <div class="definition-block">
    <span class="definition-term">Embedding Matrix E</span>
    <p>Ma trận E có shape <strong>(V, D)</strong> — V hàng (mỗi từ 1 hàng), D cột (embedding dimension). Tra cứu embedding = lấy hàng tương ứng:</p>
    <p>$x_t = E[\\text{token\\_id}]$ — chỉ copy 1 hàng, KHÔNG nhân ma trận</p>
  </div>

  <p>Embedding Matrix được <strong>train cùng model</strong> (end-to-end). Ban đầu random, sau khi train, các từ có nghĩa tương tự sẽ có embedding gần nhau trong không gian vector.</p>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Pretrained Embeddings</span>
      <p>Thay vì train từ đầu, có thể dùng embedding đã được train sẵn trên corpus lớn:</p>
      <ul>
        <li><strong>Word2Vec</strong> (Google, 2013): Skip-gram, CBOW — 300 chiều</li>
        <li><strong>GloVe</strong> (Stanford, 2014): Global Vectors — 50-300 chiều</li>
        <li><strong>FastText</strong> (Facebook, 2016): Xử lý tốt từ hiếm bằng subword</li>
      </ul>
      <p>Với RNN nhỏ, pretrained embeddings giúp rất nhiều vì model không cần "học lại" ý nghĩa từ.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: TRAINING LOOP OVERVIEW
  // ==========================================================
  {
    id: 'ch22_02_04',
    title: '4. Training Loop — Vòng lặp huấn luyện RNN',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Training Loop — Tổng quan vòng lặp huấn luyện RNN</h2>

  <p>Sau khi forward pass tính được loss, cần <strong>cập nhật weights</strong> để loss giảm. Quá trình này lặp đi lặp lại:</p>

  <h3>4.1. Bốn bước trong 1 iteration</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Forward Pass</h4>
        <p>Chạy input qua model: tính h_1, h_2, ..., h_T và y_1, y_2, ..., y_T. Tính loss_1, loss_2, ..., loss_T. Tính total loss L.</p>
        <p><strong>Lưu ý:</strong> Cần lưu TẤT CẢ h_t trung gian (h_1, h_2, ..., h_T) vì cần cho backward pass.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Backward Pass (BPTT)</h4>
        <p>Tính gradient $\\frac{\\partial L}{\\partial W}$ cho mọi weights. Dùng <strong>Backpropagation Through Time (BPTT)</strong> — backprop "quay ngược" qua thời gian từ t=T về t=1.</p>
        <p><em>Chi tiết BPTT sẽ được giải thích ở Bài 22.3.</em></p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Gradient Clipping (Tùy chọn nhưng quan trọng)</h4>
        <p>Nếu gradient quá lớn (exploding), clip lại: $g = g \\times \\frac{\\text{threshold}}{\\|g\\|}$</p>
        <p>Ngăn weights update quá mạnh → model phát nổ. RNN gần như LUÔN cần gradient clipping.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Weight Update</h4>
        <p>$W = W - \\eta \\cdot \\frac{\\partial L}{\\partial W}$</p>
        <p>η = learning rate. Thường dùng optimizer như Adam thay vì SGD thuần cho RNN.</p>
      </div>
    </div>
  </div>

  <h3>4.2. Các khái niệm Training</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Khái niệm</th>
        <th>Định nghĩa</th>
        <th>Ví dụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Epoch</strong></td>
        <td>1 lượt đi qua TOÀN BỘ training data</td>
        <td>10,000 câu, batch=32 → 1 epoch = 312 iterations</td>
      </tr>
      <tr>
        <td><strong>Batch</strong></td>
        <td>Nhóm nhiều chuỗi xử lý cùng lúc (song song trên GPU)</td>
        <td>batch=32: xử lý 32 câu cùng lúc</td>
      </tr>
      <tr>
        <td><strong>Iteration</strong></td>
        <td>1 lần forward + backward + update</td>
        <td>1 batch → 1 iteration</td>
      </tr>
      <tr>
        <td><strong>Padding</strong></td>
        <td>Thêm token đặc biệt [PAD] để các câu trong batch có cùng độ dài</td>
        <td>"hello" (5) + "hi" (2) → "hi[PAD][PAD][PAD]" (5)</td>
      </tr>
      <tr>
        <td><strong>Truncation</strong></td>
        <td>Cắt chuỗi quá dài về độ dài tối đa</td>
        <td>max_len=512: câu 1000 từ → giữ 512 từ đầu</td>
      </tr>
      <tr>
        <td><strong>Early Stopping</strong></td>
        <td>Dừng training khi val_loss không giảm sau N epoch</td>
        <td>patience=5: nếu 5 epoch liên tiếp val_loss không giảm → dừng</td>
      </tr>
    </tbody>
  </table>

  <h3>4.3. Memory Footprint khi Training</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">RNN tốn memory tuyến tính theo chuỗi dài</span>
      <p>Khi forward pass, phải lưu TẤT CẢ hidden states h_1, h_2, ..., h_T để dùng cho backward pass. Memory = O(T × H × batch_size).</p>
      <ul>
        <li>T=1000, H=512, batch=32, float32 → 1000 × 512 × 32 × 4 bytes = <strong>~62 MB</strong></li>
        <li>T=10000 → <strong>~620 MB</strong> chỉ cho hidden states</li>
      </ul>
      <p>Đây là lý do phải truncation hoặc dùng Truncated BPTT cho chuỗi rất dài.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: TÓM TẮT BÀI 22.2
  // ==========================================================
  {
    id: 'ch22_02_05',
    title: '5. Tóm tắt Bài 22.2',
    duration: '5 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <div class="key-takeaway">
    <h3>Tóm tắt Bài 22.2 — Vanilla RNN Giải Phẫu Toàn Diện</h3>
    <ul>
      <li><strong>Concatenation approach:</strong> Thực tế triển khai concat [h;x] rồi nhân 1 ma trận W thay vì 2 phép nhân riêng — nhanh hơn trên GPU</li>
      <li><strong>Forward Pass đầy đủ:</strong> Token → Embedding → Concat → tanh → Logits → Softmax → Cross-Entropy Loss</li>
      <li><strong>Softmax:</strong> Chuyển logits thành xác suất, $\\hat{y}_i = \\frac{e^{z_i}}{\\sum e^{z_j}}$</li>
      <li><strong>Cross-Entropy Loss:</strong> $L_t = -\\log(\\hat{y}_t[\\text{target}])$ — phạt nặng khi dự đoán sai</li>
      <li><strong>Perplexity:</strong> $PPL = e^L$ — "model bối rối giữa bao nhiêu từ". PPL nhỏ = tốt</li>
      <li><strong>Word Embeddings:</strong> Dense vectors (128-512 dim) thay one-hot (V dim). Lưu semantic meaning: "cat" gần "dog"</li>
      <li><strong>Embedding Matrix:</strong> E shape (V, D) — lookup table, train cùng model hoặc pretrained (Word2Vec, GloVe)</li>
      <li><strong>Training Loop:</strong> Forward → BPTT → Gradient Clip → Update. Lặp qua nhiều epoch</li>
      <li><strong>Memory:</strong> Phải lưu tất cả h_t → memory ∝ T. Chuỗi dài cần truncation</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Bài tiếp theo</span>
      <p>Bài 22.3 sẽ giải phẫu <strong>Backpropagation Through Time (BPTT)</strong> — thuật toán backward pass cho RNN — và phân tích 2 vấn đề lớn nhất: <strong>Vanishing Gradient</strong> và <strong>Exploding Gradient</strong>.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_02: Chapter = {
  id: 'ch22_02',
  title: '22.2. Vanilla RNN — Giải Phẫu Toàn Diện',
  introduction: 'Giải phẫu chi tiết Vanilla RNN: cấu trúc cell, forward pass, word embeddings, ví dụ tính tay, và training loop.',
  lessons: ch22_02_lessons,
};

export default ch22_02;
