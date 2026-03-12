import { Lesson, Chapter } from '../../courses';

const ch23_04_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: CẤU TRÚC 1 ENCODER LAYER
  // ==========================================================
  {
    id: 'ch23_04_01',
    title: '1. Cấu trúc 1 Encoder Layer',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Bên trong 1 Encoder Layer — 4 thành phần</h2>

  <p>Transformer Encoder gồm $N=6$ layers <strong>giống hệt nhau</strong> chồng lên nhau. Mỗi layer nhận input $T \\times d_{model}$ và trả output cùng kích thước $T \\times d_{model}$. Hãy mổ xẻ chi tiết 1 layer.</p>

  <div class="image-showcase">
    <img src="/images/ch23/encoder_layer_detail.png" alt="Transformer Encoder Layer Detail" />
    <div class="image-caption">Hình 1: Cấu trúc chi tiết 1 Encoder Layer — Post-LN variant (paper gốc)</div>
  </div>

  <h3>1.1. Luồng dữ liệu (Post-LN — paper gốc)</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>Multi-Head Self-Attention</h4>
        <p>Input $X$ được dùng làm Q, K, V cùng lúc (Self-Attention). Output: $\\text{MHA}(X) \\in \\mathbb{R}^{T \\times d_{model}}$</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>Add & Norm (lần 1)</h4>
        <p>$X_1 = \\text{LayerNorm}(X + \\text{Dropout}(\\text{MHA}(X)))$</p>
        <p>Add = Residual connection. Norm = Layer Normalization.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>Feed-Forward Network (FFN)</h4>
        <p>$\\text{FFN}(X_1) = \\text{ReLU}(X_1 W_1 + b_1) W_2 + b_2$</p>
        <p>2 linear layers: $d_{model} \\to d_{ff} \\to d_{model}$ (512 → 2048 → 512).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">④</div>
      <div class="step-content">
        <h4>Add & Norm (lần 2)</h4>
        <p>$X_2 = \\text{LayerNorm}(X_1 + \\text{Dropout}(\\text{FFN}(X_1)))$</p>
        <p>$X_2$ là output của encoder layer → truyền vào layer tiếp theo.</p>
      </div>
    </div>
  </div>

  <h3>1.2. Kích thước tensor qua từng bước</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bước</th>
        <th>Tensor</th>
        <th>Kích thước</th>
        <th>Ví dụ ($T=10, d=512$)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Input</td>
        <td>$X$</td>
        <td>$T \\times d_{model}$</td>
        <td>$10 \\times 512$</td>
      </tr>
      <tr>
        <td>Sau MHA</td>
        <td>$\\text{MHA}(X)$</td>
        <td>$T \\times d_{model}$</td>
        <td>$10 \\times 512$ (kích thước giữ nguyên!)</td>
      </tr>
      <tr>
        <td>Sau Add&Norm</td>
        <td>$X_1$</td>
        <td>$T \\times d_{model}$</td>
        <td>$10 \\times 512$</td>
      </tr>
      <tr>
        <td>Bên trong FFN</td>
        <td>$X_1 W_1$</td>
        <td>$T \\times d_{ff}$</td>
        <td>$10 \\times 2048$ (mở rộng 4x!)</td>
      </tr>
      <tr>
        <td>Sau FFN</td>
        <td>$\\text{FFN}(X_1)$</td>
        <td>$T \\times d_{model}$</td>
        <td>$10 \\times 512$ (thu lại)</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>$X_2$</td>
        <td>$T \\times d_{model}$</td>
        <td>$10 \\times 512$ (= input size)</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Input size = Output size → Stackable!</span>
      <p>Mỗi encoder layer giữ nguyên kích thước tensor ($T \\times 512$), do đó có thể <strong>xếp chồng bao nhiêu layers cũng được</strong>. Đây là thiết kế cốt lõi cho phép stack N=6, 12, 24, ... layers.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: FEED-FORWARD NETWORK (FFN)
  // ==========================================================
  {
    id: 'ch23_04_02',
    title: '2. Feed-Forward Network — "Bộ não xử lý" của mỗi token',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Position-wise Feed-Forward Network</h2>

  <h3>2.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>FFN (paper gốc — ReLU):</h4>
    <p class="font-mono text-lg">$\\text{FFN}(x) = \\max(0, x W_1 + b_1) W_2 + b_2$</p>
    <p>$W_1 \\in \\mathbb{R}^{d_{model} \\times d_{ff}}$, $W_2 \\in \\mathbb{R}^{d_{ff} \\times d_{model}}$</p>
    <p>Với paper gốc: $d_{model} = 512$, $d_{ff} = 2048$ → expansion ratio = <strong>4x</strong>.</p>
  </div>

  <h3>2.2. Tại sao "Position-wise"?</h3>

  <div class="definition-block">
    <span class="definition-term">Áp dụng RIÊNG RẼ cho mỗi token</span>
    <p>FFN xử lý từng token <strong>độc lập</strong>: cùng weights $W_1, W_2$ nhưng áp dụng cho từng position riêng. Không có tương tác giữa các tokens tại bước FFN.</p>
    <p>So sánh: Self-Attention = "giao tiếp giữa tokens" (mixing). FFN = "xử lý nội bộ từng token" (processing).</p>
  </div>

  <h3>2.3. Ý nghĩa: FFN = Knowledge Storage</h3>

  <p>Nghiên cứu gần đây (Geva et al., 2021) chỉ ra rằng FFN hoạt động như một <strong>"bộ nhớ key-value"</strong>:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>$W_1$: Keys — "nhận diện pattern"</h4>
      <p>Mỗi hàng của $W_1$ là một "key" nhận diện 1 pattern ngữ nghĩa cụ thể. ReLU chọn lọc: chỉ "kích hoạt" (activate) neurons liên quan.</p>
      <p>Ví dụ: neuron 1234 chỉ activate khi tìm thấy pattern "thủ đô của [quốc gia]".</p>
    </div>
    <div class="concept-card">
      <h4>$W_2$: Values — "cung cấp kiến thức"</h4>
      <p>Mỗi cột của $W_2$ là "value" chứa kiến thức tương ứng. Khi neuron 1234 activate → inject thông tin "Hà Nội" / "Tokyo" / "Paris" tùy context.</p>
      <p>Đây là lý do tại sao <strong>tăng $d_{ff}$</strong> = tăng "bộ nhớ" = model biết nhiều hơn.</p>
    </div>
  </div>

  <h3>2.4. Các biến thể FFN hiện đại</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Model</th>
        <th>Activation</th>
        <th>Công thức FFN</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Transformer gốc</strong></td>
        <td>ReLU</td>
        <td>$\\max(0, xW_1 + b_1)W_2 + b_2$</td>
      </tr>
      <tr>
        <td><strong>GPT-2, BERT</strong></td>
        <td>GELU</td>
        <td>$\\text{GELU}(xW_1 + b_1)W_2 + b_2$</td>
      </tr>
      <tr>
        <td><strong>LLaMA, PaLM</strong></td>
        <td>SwiGLU</td>
        <td>$(\\text{Swish}(xW_1) \\odot xW_3) W_2$ — 3 matrices!</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">SwiGLU tại sao tốt hơn?</span>
      <p><strong>GLU</strong> (Gated Linear Unit) thêm cơ chế "gating" tương tự LSTM gate — cho phép model <strong>chọn lọc</strong> thông tin nào đi qua. SwiGLU dùng activation Swish ($x \\cdot \\sigma(x)$) thay ReLU. Thực nghiệm cho thấy SwiGLU tốt hơn ~2-5% trên các benchmark so với ReLU FFN cùng model size.</p>
    </div>
  </div>

  <h3>2.5. Đếm parameters FFN</h3>

  <div class="definition-block">
    <span class="definition-term">FFN chiếm ~2/3 tổng parameters!</span>
    <p>FFN: $W_1$ ($512 \\times 2048$) + $b_1$ ($2048$) + $W_2$ ($2048 \\times 512$) + $b_2$ ($512$) = <strong>2,099,712 params</strong></p>
    <p>MHA: $W^Q + W^K + W^V + W^O$ = $4 \\times 512 \\times 512$ = <strong>1,048,576 params</strong></p>
    <p>Tỉ lệ: FFN ≈ <strong>67%</strong> params mỗi layer. Đây là lý do tại sao LLMs với $d_{ff}$ lớn (GPT-3: $d_{ff}=16384$) có rất nhiều parameters.</p>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: RESIDUAL CONNECTION
  // ==========================================================
  {
    id: 'ch23_04_03',
    title: '3. Residual Connection — "Gradient Highway"',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Residual Connection (Add) — Tại sao không thể thiếu?</h2>

  <h3>3.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Residual Connection:</h4>
    <p class="font-mono text-lg">$\\text{output} = x + f(x)$</p>
    <p>$f(x)$ = sub-layer (Self-Attention hoặc FFN). $x$ = input trực tiếp (bypass).</p>
    <p>Thay vì học $f(x)$ = desired output, model chỉ cần học <strong>$f(x)$ = thay đổi cần thiết</strong> (residual).</p>
  </div>

  <h3>3.2. Vấn đề nếu không có residual</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Deep network degradation</span>
      <p>Với N=6 layers, mỗi layer biến đổi $x$ qua Self-Attention rồi FFN. Sau 6 lần biến đổi liên tiếp, thông tin gốc có thể bị <strong>"bóp méo" hoặc mất hoàn toàn</strong>. Gradient phải đi qua 12 sub-layers → vanishing gradient.</p>
    </div>
  </div>

  <h3>3.3. Residual giải quyết thế nào?</h3>

  <div class="definition-block">
    <span class="definition-term">Gradient highway — giống LSTM cell state!</span>
    <p>Xét gradient qua 1 residual block:</p>
    <p class="font-mono">$\\frac{\\partial (x + f(x))}{\\partial x} = 1 + \\frac{\\partial f(x)}{\\partial x}$</p>
    <p>Luôn có thành phần <strong>$1$</strong> (identity) → gradient <strong>không bao giờ vanish hoàn toàn</strong>. Dù $\\frac{\\partial f(x)}{\\partial x}$ nhỏ, gradient vẫn chảy qua "đường tắt" identity.</p>
  </div>

  <h3>3.4. So sánh với LSTM cell state</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Cơ chế</th>
        <th>LSTM</th>
        <th>Transformer Residual</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Đường tắt</strong></td>
        <td>Cell state: $C_t = f_t \\odot C_{t-1} + ...$</td>
        <td>$x + f(x)$</td>
      </tr>
      <tr>
        <td><strong>Gradient</strong></td>
        <td>$\\frac{\\partial C_t}{\\partial C_{t-1}} = f_t$ (forget gate)</td>
        <td>$\\frac{\\partial}{\\partial x} = 1 + \\frac{\\partial f}{\\partial x}$</td>
      </tr>
      <tr>
        <td><strong>Ưu điểm</strong></td>
        <td>Gate kiểm soát "nhớ bao nhiêu"</td>
        <td>Luôn giữ identity → đơn giản hơn, ổn định hơn</td>
      </tr>
      <tr>
        <td><strong>Nguồn gốc</strong></td>
        <td>Hochreiter & Schmidhuber, 1997</td>
        <td>He et al. (ResNet), 2015</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Quy luật chung trong Deep Learning</span>
      <p><strong>Mọi mạng sâu đều cần "highway"</strong> cho gradient: LSTM dùng cell state, ResNet dùng skip connections, Transformer dùng residual connections. Bản chất cùng 1 ý tưởng: $\\text{output} = \\text{input} + \\text{learned\\_change}$.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: LAYER NORMALIZATION
  // ==========================================================
  {
    id: 'ch23_04_04',
    title: '4. Layer Normalization — Chuẩn hóa mỗi token',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Layer Normalization — Khác Batch Norm thế nào?</h2>

  <h3>4.1. Công thức Layer Normalization</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Cho vector $x \\in \\mathbb{R}^d$ (1 token):</h4>
    <p class="font-mono text-lg">$\\text{LayerNorm}(x) = \\gamma \\cdot \\frac{x - \\mu}{\\sqrt{\\sigma^2 + \\epsilon}} + \\beta$</p>
    <p>Trong đó:</p>
    <p class="font-mono">$\\mu = \\frac{1}{d} \\sum_{i=1}^{d} x_i$ &nbsp;&nbsp; (mean theo features)</p>
    <p class="font-mono">$\\sigma^2 = \\frac{1}{d} \\sum_{i=1}^{d} (x_i - \\mu)^2$ &nbsp;&nbsp; (variance theo features)</p>
    <p>$\\gamma, \\beta \\in \\mathbb{R}^d$ là <strong>learnable parameters</strong> (scale và shift).</p>
    <p>$\\epsilon \\approx 10^{-6}$ ngăn chia cho 0.</p>
  </div>

  <h3>4.2. Ví dụ số ($d=4$)</h3>

  <div class="definition-block">
    <span class="definition-term">Normalize 1 token vector</span>
<pre><code>x = [2.0, 4.0, 6.0, 8.0]   ← 1 token, 4 features

μ = (2+4+6+8)/4 = 5.0
σ² = ((2-5)²+(4-5)²+(6-5)²+(8-5)²)/4 = (9+1+1+9)/4 = 5.0
σ = √5 ≈ 2.236

x_norm = (x - μ) / σ = [-1.34, -0.45, 0.45, 1.34]

Giả sử γ = [1,1,1,1], β = [0,0,0,0]:
LayerNorm(x) = [-1.34, -0.45, 0.45, 1.34]   ← mean=0, std=1</code></pre>
    <p>Sau LayerNorm: mỗi token vector được chuẩn hóa về <strong>mean ≈ 0, std ≈ 1</strong>. Learnable $\\gamma, \\beta$ cho phép model "undo" normalization nếu cần.</p>
  </div>

  <h3>4.3. Layer Norm vs Batch Norm — Sự khác biệt cốt lõi</h3>

  <div class="image-showcase">
    <img src="/images/ch23/layer_norm_vs_batch_norm.png" alt="Layer Norm vs Batch Norm" />
    <div class="image-caption">Hình 2: Batch Norm normalize theo cột (cross-batch), Layer Norm normalize theo hàng (trong 1 sample)</div>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Batch Normalization</th>
        <th>Layer Normalization</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Normalize theo</strong></td>
        <td>Batch dimension (cross-samples)</td>
        <td>Feature dimension (trong 1 sample)</td>
      </tr>
      <tr>
        <td><strong>$\\mu, \\sigma$</strong></td>
        <td>Tính trên tất cả samples trong batch cho mỗi feature</td>
        <td>Tính trên tất cả features cho mỗi sample (token)</td>
      </tr>
      <tr>
        <td><strong>Phụ thuộc batch?</strong></td>
        <td>Có → cần batch size đủ lớn</td>
        <td>Không → hoạt động tốt mọi batch size</td>
      </tr>
      <tr>
        <td><strong>Inference</strong></td>
        <td>Cần running mean/var (khác train)</td>
        <td>Train = Inference (nhất quán)</td>
      </tr>
      <tr>
        <td><strong>Sequences?</strong></td>
        <td>Khó (chiều dài khác nhau, padding)</td>
        <td>Tự nhiên — normalize từng token riêng</td>
      </tr>
      <tr>
        <td><strong>Dùng trong</strong></td>
        <td>CNN (ResNet, VGG)</td>
        <td>Transformer, RNN</td>
      </tr>
    </tbody>
  </table>

  <h3>4.4. Pre-LN vs Post-LN</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Post-LN (Paper gốc 2017)</h4>
      <p class="font-mono">$\\text{LN}(x + f(x))$</p>
      <p>LayerNorm đặt <strong>sau</strong> residual add. Cần learning rate warmup cẩn thận. Gradient lớn ở init.</p>
    </div>
    <div class="concept-card">
      <h4>Pre-LN (GPT-2, BERT-tuned)</h4>
      <p class="font-mono">$x + f(\\text{LN}(x))$</p>
      <p>LayerNorm đặt <strong>trước</strong> sub-layer. Ổn định hơn, không cần warmup. Mặc định trong hầu hết models hiện đại.</p>
    </div>
  </div>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>So sánh gradient:</h4>
    <p><strong>Post-LN:</strong> $\\frac{\\partial \\text{LN}(x+f(x))}{\\partial x}$ — gradient phải qua LN → có thể bị distorted</p>
    <p><strong>Pre-LN:</strong> $\\frac{\\partial (x + f(\\text{LN}(x)))}{\\partial x} = 1 + \\frac{\\partial f}{\\partial x} \\cdot \\frac{\\partial \\text{LN}}{\\partial x}$ — identity path <strong>không bị LN chặn</strong></p>
    <p>Pre-LN cho phép gradient chảy trực tiếp qua residual → <strong>ổn định hơn</strong> khi stack nhiều layers.</p>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: STACKING N LAYERS
  // ==========================================================
  {
    id: 'ch23_04_05',
    title: '5. Stacking N Layers — Encoder hoàn chỉnh',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Stack $N=6$ Layers — Từ tokens tới representations</h2>

  <h3>5.1. Information flow qua Encoder Stack</h3>

  <div class="definition-block">
    <span class="definition-term">6 layers = 12 sub-layers = 12 residual blocks</span>
    <p class="font-mono">$H_0 = \\text{Embedding}(X) + \\text{PE}$ &nbsp; ← initial representations</p>
    <p class="font-mono">$H_1 = \\text{EncoderLayer}_1(H_0)$ &nbsp; ← layer 1</p>
    <p class="font-mono">$H_2 = \\text{EncoderLayer}_2(H_1)$ &nbsp; ← layer 2</p>
    <p class="font-mono">$\\vdots$</p>
    <p class="font-mono">$H_6 = \\text{EncoderLayer}_6(H_5)$ &nbsp; ← output cuối cùng</p>
    <p>$H_6 \\in \\mathbb{R}^{T \\times d_{model}}$ → đây là encoder output, được truyền sang decoder làm K, V cho Cross-Attention.</p>
  </div>

  <h3>5.2. Mỗi layer học gì?</h3>

  <p>Nghiên cứu (Jawahar et al., 2019; Tenney et al., 2019) phân tích từng layer BERT (encoder-only):</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Layer</th>
        <th>Thông tin</th>
        <th>Ví dụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Layer 1-2</strong> (thấp)</td>
        <td>Syntax cơ bản: POS tags, cụm từ</td>
        <td>"chạy" → verb, "con mèo" → noun phrase</td>
      </tr>
      <tr>
        <td><strong>Layer 3-4</strong> (giữa)</td>
        <td>Syntax phức tạp: tree structure, dependencies</td>
        <td>"mèo [mà tôi nuôi] đáng yêu" → relative clause</td>
      </tr>
      <tr>
        <td><strong>Layer 5-6</strong> (cao)</td>
        <td>Semantics: ngữ nghĩa, quan hệ logic, coreference</td>
        <td>"Nó" trong "Con mèo đáng yêu. Nó ngồi đây" → "Nó" = "Con mèo"</td>
      </tr>
    </tbody>
  </table>

  <h3>5.3. Đếm tổng parameters</h3>

  <div class="definition-block">
    <span class="definition-term">Transformer Base ($N=6, d=512, h=8, d_{ff}=2048$)</span>
<pre><code>Mỗi Encoder Layer:
  MHA:  4 × (512×512)    =  1,048,576  params (W^Q, W^K, W^V, W^O)
  LN_1: 2 × 512          =      1,024  params (γ, β)
  FFN:  512×2048 + 2048×512 + biases = 2,099,712 params
  LN_2: 2 × 512          =      1,024  params (γ, β)
  ────────────────────────────────────────────
  Total 1 layer:            3,150,336  params (~3.15M)

6 layers:                  18,902,016  params (~18.9M)
Embedding ($|V|=37000$):   18,944,000  params (~18.9M)
──────────────────────────────────────────────
Encoder total:             ~37.8M  params</code></pre>
  </div>

  <h3>5.4. Tại sao N=6? Tại sao không 12 hay 24?</h3>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Trade-off: Depth vs Cost</span>
      <ul>
        <li>N=6 là kết quả thực nghiệm tối ưu cho <strong>WMT translation task</strong> (2017)</li>
        <li>BERT-Base: N=12 (110M params). BERT-Large: N=24 (340M params)</li>
        <li>GPT-3: N=96 layers! Nhưng cần cluster TPUs/GPUs</li>
        <li>Quy luật: tăng N → tốt hơn nhưng <strong>diminishing returns</strong> sau 1 ngưỡng</li>
      </ul>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 23.4 — Encoder Stack</h3>
    <ul>
      <li><strong>1 Encoder Layer:</strong> MHA → Add&Norm → FFN → Add&Norm. Input/Output cùng kích thước</li>
      <li><strong>FFN:</strong> 2 linear layers ($512 \\to 2048 \\to 512$), position-wise, chiếm ~67% params. FFN = "knowledge storage"</li>
      <li><strong>Residual Connection:</strong> $x + f(x)$ → gradient highway, gradient = $1 + \\frac{\\partial f}{\\partial x}$ luôn ≥ 1</li>
      <li><strong>Layer Norm:</strong> normalize theo features (không phải batch). Pre-LN ổn định hơn Post-LN</li>
      <li><strong>Stack N=6:</strong> layers thấp → syntax, layers cao → semantics. Base encoder ≈ 37.8M params</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch23_04: Chapter = {
  id: 'ch23_04',
  title: '23.4. Encoder Stack',
  introduction: 'Cấu trúc 1 Encoder Layer (MHA + FFN + Add&Norm), Feed-Forward Network (Position-wise, SwiGLU), Residual Connection, Layer Normalization (Pre-LN vs Post-LN), stacking N layers.',
  lessons: ch23_04_lessons,
};

export default ch23_04;
