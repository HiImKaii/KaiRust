import { Lesson, Chapter } from '../../courses';

const ch23_03_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: RECAP QKV — KÍCH THƯỚC MA TRẬN
  // ==========================================================
  {
    id: 'ch23_03_01',
    title: '1. Q, K, V — Linear Projections & Kích thước Ma trận',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Q, K, V — Hiểu rõ từ Linear Projection tới kích thước tensor</h2>

  <p>Ở Chương 22, ta đã biết khái niệm Query/Key/Value. Bài này đi sâu vào <strong>cách chúng được tạo ra</strong> từ phép biến đổi tuyến tính (Linear Projection), và <strong>kích thước chính xác</strong> của từng tensor.</p>

  <h3>1.1. Tạo Q, K, V bằng Linear Projection</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Từ input X → tạo ra Q, K, V:</h4>
    <p class="font-mono text-lg">$Q = X \\cdot W^Q$ &nbsp; với $W^Q \\in \\mathbb{R}^{d_{model} \\times d_k}$</p>
    <p class="font-mono text-lg">$K = X \\cdot W^K$ &nbsp; với $W^K \\in \\mathbb{R}^{d_{model} \\times d_k}$</p>
    <p class="font-mono text-lg">$V = X \\cdot W^V$ &nbsp; với $W^V \\in \\mathbb{R}^{d_{model} \\times d_v}$</p>
    <p>Trong đó $X \\in \\mathbb{R}^{T \\times d_{model}}$ (T tokens, mỗi token là vector $d_{model}$-dim).</p>
  </div>

  <h3>1.2. Kích thước tensor chi tiết</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tensor</th>
        <th>Kích thước</th>
        <th>Ý nghĩa</th>
        <th>Ví dụ ($T=4, d_{model}=512, d_k=64$)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$X$</strong></td>
        <td>$T \\times d_{model}$</td>
        <td>Input: T tokens × embedding dim</td>
        <td>$4 \\times 512$</td>
      </tr>
      <tr>
        <td><strong>$W^Q$</strong></td>
        <td>$d_{model} \\times d_k$</td>
        <td>Learnable weights cho Query</td>
        <td>$512 \\times 64$</td>
      </tr>
      <tr>
        <td><strong>$Q$</strong></td>
        <td>$T \\times d_k$</td>
        <td>Query vectors: mỗi token → 1 query</td>
        <td>$4 \\times 64$</td>
      </tr>
      <tr>
        <td><strong>$K$</strong></td>
        <td>$T \\times d_k$</td>
        <td>Key vectors: mỗi token → 1 key</td>
        <td>$4 \\times 64$</td>
      </tr>
      <tr>
        <td><strong>$V$</strong></td>
        <td>$T \\times d_v$</td>
        <td>Value vectors: mỗi token → 1 value</td>
        <td>$4 \\times 64$ (thường $d_v = d_k$)</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tại sao project xuống $d_k < d_{model}$?</span>
      <p>Trong single-head: $d_k = d_{model}$ (giữ nguyên). Nhưng trong Multi-Head: $d_k = d_{model} / h = 512 / 8 = 64$. <strong>Giảm chiều</strong> để chạy h heads song song mà tổng chi phí tương đương 1 full-dim attention. Đây là "trick" hiệu quả nhất của Transformer.</p>
    </div>
  </div>

  <h3>1.3. Self-Attention vs Cross-Attention: X đến từ đâu?</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Loại Attention</th>
        <th>Q từ đâu?</th>
        <th>K, V từ đâu?</th>
        <th>Dùng ở đâu?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Self-Attention</strong></td>
        <td>X (chính nó)</td>
        <td>X (chính nó)</td>
        <td>Encoder layer, Decoder masked SA</td>
      </tr>
      <tr>
        <td><strong>Cross-Attention</strong></td>
        <td>$H^{dec}$ (decoder)</td>
        <td>$H^{enc}$ (encoder output)</td>
        <td>Decoder cross-attention layer</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: SCALED DOT-PRODUCT ATTENTION — VÍ DỤ SỐ
  // ==========================================================
  {
    id: 'ch23_03_02',
    title: '2. Scaled Dot-Product Attention — Tính toán Step-by-Step',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Scaled Dot-Product Attention — Ví dụ tính bằng tay</h2>

  <div class="image-showcase">
    <img src="/images/ch23/scaled_dot_product_detail.png" alt="Scaled Dot-Product Attention Flow" />
    <div class="image-caption">Hình 1: Luồng dữ liệu Scaled Dot-Product Attention</div>
  </div>

  <h3>2.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Scaled Dot-Product Attention:</h4>
    <p class="font-mono text-lg">$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right) \\cdot V$</p>
    <p>5 bước: MatMul($QK^T$) → Scale($/ \\sqrt{d_k}$) → Mask (optional) → Softmax → MatMul($\\times V$)</p>
  </div>

  <h3>2.2. Ví dụ số chi tiết ($T=3, d_k=4$)</h3>

  <p>Giả sử câu "Mèo ngồi đây" có 3 tokens. Sau khi qua Linear Projection, ta được:</p>

  <div class="definition-block">
    <span class="definition-term">Bước 0: Dữ liệu đầu vào</span>
    <p><strong>$Q$ (Query):</strong></p>
<pre><code>Q = [[1, 0, 1, 0],   ← "Mèo" hỏi
     [0, 1, 0, 1],   ← "ngồi" hỏi
     [1, 1, 0, 0]]   ← "đây" hỏi</code></pre>
    <p><strong>$K$ (Key):</strong></p>
<pre><code>K = [[1, 1, 0, 0],   ← "Mèo" được hỏi
     [0, 0, 1, 1],   ← "ngồi" được hỏi
     [1, 0, 0, 1]]   ← "đây" được hỏi</code></pre>
    <p><strong>$V$ (Value):</strong></p>
<pre><code>V = [[1, 2, 3, 4],   ← thông tin "Mèo"
     [5, 6, 7, 8],   ← thông tin "ngồi"
     [9, 10, 11, 12]] ← thông tin "đây"</code></pre>
  </div>

  <div class="definition-block">
    <span class="definition-term">Bước 1: Tính $QK^T$ (MatMul)</span>
    <p>Ma trận $QK^T$ kích thước $(3 \\times 4) \\cdot (4 \\times 3) = (3 \\times 3)$:</p>
<pre><code>           K^T:  "Mèo"  "ngồi"  "đây"
Q × K^T = [[1·1+0·1+1·0+0·0,  1·0+0·0+1·1+0·1,  1·1+0·0+1·0+0·1],   "Mèo" hỏi
           [0·1+1·1+0·0+1·0,  0·0+1·0+0·1+1·1,  0·1+1·0+0·0+1·1],   "ngồi" hỏi
           [1·1+1·1+0·0+0·0,  1·0+1·0+0·1+0·1,  1·1+1·0+0·0+0·1]]   "đây" hỏi

QK^T = [[1, 1, 1],
        [1, 1, 1],
        [2, 0, 1]]</code></pre>
    <p>Mỗi ô $(i, j)$ = "mức độ tương thích giữa Query token $i$ và Key token $j$".</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Bước 2: Scale ÷ $\\sqrt{d_k}$</span>
    <p>$d_k = 4$ → $\\sqrt{4} = 2$. Chia mỗi phần tử cho 2:</p>
<pre><code>Scaled = QK^T / 2 = [[0.5,  0.5,  0.5],
                      [0.5,  0.5,  0.5],
                      [1.0,  0.0,  0.5]]</code></pre>
    <p>Scale giữ giá trị trong vùng softmax hoạt động tốt (tránh bão hòa).</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Bước 3: Softmax theo từng hàng</span>
    <p>$\\text{softmax}([0.5, 0.5, 0.5]) = [e^{0.5}, e^{0.5}, e^{0.5}] / (3 \\cdot e^{0.5}) = [0.333, 0.333, 0.333]$</p>
    <p>$\\text{softmax}([1.0, 0.0, 0.5]) = [e^{1.0}, e^{1.0}, e^{0.5}] / \\text{sum}$:</p>
<pre><code>e^1.0 = 2.718, e^0.0 = 1.000, e^0.5 = 1.649 → sum = 5.367

Attention Weights α:
α = [[0.333, 0.333, 0.333],   ← "Mèo" chú ý đều 3 token
     [0.333, 0.333, 0.333],   ← "ngồi" chú ý đều 3 token
     [0.506, 0.186, 0.307]]   ← "đây" chú ý "Mèo" nhiều nhất (50.6%)</code></pre>
    <p>Hàng cuối: "đây" chú ý nhất vào "Mèo" (0.506) — tương ứng "đây" (là ở chỗ nào?) → liên quan đến chủ thể "Mèo".</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Bước 4: Nhân với V (Weighted Sum)</span>
    <p>$\\text{Output} = \\alpha \\cdot V$, kích thước $(3 \\times 3) \\cdot (3 \\times 4) = (3 \\times 4)$:</p>
<pre><code>Output[0] = 0.333·[1,2,3,4] + 0.333·[5,6,7,8] + 0.333·[9,10,11,12]
          = [5.0, 6.0, 7.0, 8.0]   ← trung bình đều

Output[2] = 0.506·[1,2,3,4] + 0.186·[5,6,7,8] + 0.307·[9,10,11,12]
          = [0.506+0.930+2.763, 1.012+1.116+3.070, ...]
          = [4.20, 5.20, 6.20, 7.20]  ← nghiêng về "Mèo" và "đây"</code></pre>
    <p>Output cho mỗi token = <strong>weighted sum</strong> thông tin từ tất cả tokens, trọng số = attention weights.</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Ý nghĩa: Self-Attention = "trộn thông tin có chọn lọc"</span>
      <p>Mỗi token output <strong>không còn là token thuần túy</strong> — nó đã được "trộn" (aggregate) thông tin từ các tokens liên quan, với trọng số phụ thuộc vào mức độ tương thích Q-K. Đây là cách Transformer hiểu <strong>ngữ cảnh</strong> mà không cần recurrence.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: TẠI SAO CHIA √d_k — CHỨNG MINH
  // ==========================================================
  {
    id: 'ch23_03_03',
    title: '3. Tại sao chia √d_k — Chứng minh toán học',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Tại sao phải Scale bằng $\\sqrt{d_k}$?</h2>

  <p>Đây là chi tiết dễ bị bỏ qua nhưng <strong>cực kỳ quan trọng</strong> cho sự ổn định huấn luyện.</p>

  <h3>3.1. Vấn đề: Dot product lớn khi $d_k$ lớn</h3>

  <div class="definition-block">
    <span class="definition-term">Chứng minh: Variance của dot product</span>
    <p>Giả sử các thành phần $q_i, k_i$ đều iid với $\\mathbb{E}[q_i] = 0$, $\\text{Var}(q_i) = 1$ (chuẩn hóa).</p>
    <p>Dot product $s = q \\cdot k = \\sum_{i=1}^{d_k} q_i \\cdot k_i$</p>
    <p>Vì $q_i$ và $k_i$ độc lập:</p>

    <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$\\mathbb{E}[q_i k_i] = \\mathbb{E}[q_i] \\cdot \\mathbb{E}[k_i] = 0$$
    </div>
    <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$\\text{Var}(q_i k_i) = \\mathbb{E}[q_i^2] \\cdot \\mathbb{E}[k_i^2] = 1 \\cdot 1 = 1$$
    </div>
    <div class="formula-block-small my-3 p-3 bg-white border border-slate-300 rounded text-center font-mono">
      $$\\text{Var}(s) = \\text{Var}\\left(\\sum_{i=1}^{d_k} q_i k_i\\right) = d_k \\cdot 1 = d_k$$
    </div>

    <p>Nên: $\\text{Var}(q \\cdot k) = d_k$, nghĩa là $\\text{std}(q \\cdot k) = \\sqrt{d_k}$.</p>
  </div>

  <h3>3.2. Hậu quả: Softmax bão hòa</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">$d_k = 512$ → dot products có std = $\\sqrt{512} \\approx 22.6$</span>
      <p>Scores có thể nằm trong khoảng $[-50, +50]$. Softmax của $[50, -1, 0, 2]$ ≈ $[1.0, 0.0, 0.0, 0.0]$ — gần như <strong>one-hot</strong>! Gradient softmax tại vùng bão hòa ≈ 0 → <strong>vanishing gradient</strong> → model không học được.</p>
    </div>
  </div>

  <h3>3.3. Giải pháp: Scale cho variance = 1</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Chia $\\sqrt{d_k}$:</h4>
    <p class="font-mono text-lg">$\\frac{q \\cdot k}{\\sqrt{d_k}}$ có $\\text{Var} = \\frac{d_k}{d_k} = 1$</p>
    <p>Scores nằm trong khoảng $[-3, +3]$ (std = 1) → softmax hoạt động trong <strong>vùng gradient tốt</strong>.</p>
  </div>

  <h3>3.4. So sánh trực quan</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>$d_k$</th>
        <th>std(dot product)</th>
        <th>Khoảng scores</th>
        <th>Softmax output</th>
        <th>Gradient?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>4</td>
        <td>2</td>
        <td>[-6, +6]</td>
        <td>Phân bố hợp lý</td>
        <td>Tốt</td>
      </tr>
      <tr>
        <td>64</td>
        <td>8</td>
        <td>[-24, +24]</td>
        <td>Thiên gần one-hot</td>
        <td>Suy giảm</td>
      </tr>
      <tr>
        <td>512</td>
        <td>22.6</td>
        <td>[-70, +70]</td>
        <td>Hoàn toàn one-hot</td>
        <td>Vanishing</td>
      </tr>
    </tbody>
  </table>
  <p>Sau khi scale $/ \\sqrt{d_k}$: tất cả đều có std = 1, scores trong [-3, +3] → softmax ổn định.</p>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: MULTI-HEAD ATTENTION
  // ==========================================================
  {
    id: 'ch23_03_04',
    title: '4. Multi-Head Attention — Nhiều góc nhìn song song',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Multi-Head Attention — Tại sao cần nhiều "đầu"?</h2>

  <div class="image-showcase">
    <img src="/images/ch23/multi_head_split_concat.png" alt="Multi-Head Attention Architecture" />
    <div class="image-caption">Hình 2: Multi-Head Attention — Split → Parallel Heads → Concat → Project</div>
  </div>

  <h3>4.1. Vấn đề của Single-Head</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">1 head = 1 góc nhìn duy nhất</span>
      <p>Single-head attention chỉ học được <strong>1 kiểu</strong> quan hệ giữa tokens. Ví dụ: nó có thể học quan hệ "chủ ngữ-vị ngữ" (mèo-ngồi), nhưng đồng thời bỏ lỡ quan hệ "vị trí" (ngồi-đây) hay "bổ ngữ" (ăn-cơm).</p>
      <p>Câu "Con mèo đen ngồi trên chiếc thảm đỏ" cần hiểu nhiều quan hệ cùng lúc: mèo→đen (tính-danh), mèo→ngồi (chủ-vị), ngồi→thảm (vị-bổ), thảm→đỏ (tính-danh).</p>
    </div>
  </div>

  <h3>4.2. Công thức Multi-Head</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Split → Attend → Concat → Project:</h4>
    <p class="font-mono">$\\text{head}_i = \\text{Attention}(Q W_i^Q, \\; K W_i^K, \\; V W_i^V)$</p>
    <p class="font-mono">$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h) \\cdot W^O$</p>
    <p>Với $W_i^Q \\in \\mathbb{R}^{d_{model} \\times d_k}$, $W_i^K \\in \\mathbb{R}^{d_{model} \\times d_k}$, $W_i^V \\in \\mathbb{R}^{d_{model} \\times d_v}$, $W^O \\in \\mathbb{R}^{h \\cdot d_v \\times d_{model}}$.</p>
  </div>

  <h3>4.3. Kích thước tensor từng bước</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bước</th>
        <th>Tensor</th>
        <th>Kích thước</th>
        <th>Ví dụ ($T=10, h=8, d_{model}=512$)</th>
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
        <td>Project Q</td>
        <td>$Q_i = X W_i^Q$</td>
        <td>$T \\times d_k$</td>
        <td>$10 \\times 64$</td>
      </tr>
      <tr>
        <td>$Q_i K_i^T$</td>
        <td>Attention scores</td>
        <td>$T \\times T$</td>
        <td>$10 \\times 10$</td>
      </tr>
      <tr>
        <td>× $V_i$</td>
        <td>Head output</td>
        <td>$T \\times d_v$</td>
        <td>$10 \\times 64$</td>
      </tr>
      <tr>
        <td>Concat h heads</td>
        <td>All heads</td>
        <td>$T \\times (h \\cdot d_v)$</td>
        <td>$10 \\times 512$ (= $10 \\times 8 \\times 64$)</td>
      </tr>
      <tr>
        <td>× $W^O$</td>
        <td>Final output</td>
        <td>$T \\times d_{model}$</td>
        <td>$10 \\times 512$</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Chi phí tính toán không tăng!</span>
      <p>Single-head: $d_k = 512$, 1 attention = $O(T^2 \\cdot 512)$.</p>
      <p>Multi-head (h=8): $d_k = 64$, 8 attentions = $8 \\times O(T^2 \\cdot 64) = O(T^2 \\cdot 512)$.</p>
      <p><strong>Tổng chi phí bằng nhau</strong>, nhưng Multi-Head học được 8 kiểu quan hệ khác nhau!</p>
    </div>
  </div>

  <h3>4.4. Mỗi head học gì?</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Head 1: Quan hệ chủ-vị</h4>
      <p>"Mèo" attention cao vào "ngồi". "Chó" attention cao vào "chạy".</p>
    </div>
    <div class="concept-card">
      <h4>Head 2: Quan hệ vị trí gần</h4>
      <p>Mỗi token attention cao vào 2-3 token liền kề (local context).</p>
    </div>
    <div class="concept-card">
      <h4>Head 3: Quan hệ tính-danh</h4>
      <p>"đen" attention cao vào "mèo". "đỏ" attention cao vào "thảm".</p>
    </div>
    <div class="concept-card">
      <h4>Head 4-8: Quan hệ khác</h4>
      <p>Đại từ → tiền từ, phủ định, so sánh, nhân-quả... Model tự khám phá.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: ATTENTION MASKS
  // ==========================================================
  {
    id: 'ch23_03_05',
    title: '5. Attention Masks — Padding & Causal',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Attention Masks — Kiểm soát "ai được nhìn ai"</h2>

  <p>Không phải lúc nào tất cả tokens cũng nên attend vào nhau. Có 2 loại mask quan trọng:</p>

  <h3>5.1. Padding Mask</h3>

  <div class="definition-block">
    <span class="definition-term">Vấn đề: batch có các câu khác độ dài</span>
    <p>Khi batch 2 câu: "Mèo ngồi đây" (3 tokens) và "Chó chạy" (2 tokens). Để batch được, pad câu ngắn: "Chó chạy [PAD]".</p>
    <p>Token [PAD] <strong>không mang ý nghĩa</strong> → không token nào nên attend vào nó.</p>
  </div>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Cách hoạt động:</h4>
    <p>Tại vị trí padding: set score = $-\\infty$ trước softmax.</p>
    <p class="font-mono">$\\text{softmax}([1.2, 0.8, -\\infty]) = [0.60, 0.40, 0.00]$</p>
    <p>$e^{-\\infty} = 0$ → padding token nhận weight = 0 → bị "tắt tiếng" hoàn toàn.</p>
  </div>

  <h3>5.2. Causal Mask (Look-ahead Mask)</h3>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Decoder không được "nhìn tương lai"</span>
      <p>Khi sinh token thứ $t$, decoder chỉ được nhìn tokens $1, 2, ..., t-1$ (đã sinh). Nhìn token $t+1$ trở đi = <strong>gian lận</strong> (data leakage). Causal mask đảm bảo điều này.</p>
    </div>
  </div>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Ma trận Causal Mask:</h4>
    <p class="font-mono">$M_{ij} = \\begin{cases} 0 & \\text{nếu } i \\geq j \\text{ (được attend)} \\\\\\\\ -\\infty & \\text{nếu } i < j \\text{ (bị chặn)} \\end{cases}$</p>
    <p>Áp dụng: $\\text{Attention} = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right) V$</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch23/causal_mask_matrix.png" alt="Causal Mask Matrix" />
    <div class="image-caption">Hình 3: Ma trận Causal Mask 6×6 — ✓ = được attend, ✗ = bị chặn</div>
  </div>

  <h3>5.3. Ví dụ: Causal Mask cho "Tôi yêu mèo"</h3>

  <div class="definition-block">
    <span class="definition-term">3 tokens, ma trận 3×3</span>
<pre><code>          Key:  "Tôi"  "yêu"  "mèo"
Query:
"Tôi"    [  ✓      ✗      ✗  ]  ← chỉ nhìn chính nó
"yêu"    [  ✓      ✓      ✗  ]  ← nhìn "Tôi" và chính nó
"mèo"    [  ✓      ✓      ✓  ]  ← nhìn tất cả (vì là token cuối)

Scores + Mask:
          "Tôi"  "yêu"  "mèo"
"Tôi"    [ 2.1    -∞     -∞  ]  → softmax → [1.00, 0.00, 0.00]
"yêu"    [ 0.5    1.8    -∞  ]  → softmax → [0.21, 0.79, 0.00]
"mèo"    [ 0.3    0.7    2.5 ]  → softmax → [0.08, 0.12, 0.80]</code></pre>
    <p>Token "Tôi" chỉ attend vào chính mình (100%). Token "mèo" attend nhiều nhất vào chính mình (80%), ít vào "yêu" (12%) và "Tôi" (8%).</p>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 23.3 — Scaled Dot-Product & Multi-Head Attention</h3>
    <ul>
      <li><strong>Q, K, V</strong> tạo từ Linear Projection: $Q = XW^Q$. Kích thước: $T \\times d_k$</li>
      <li><strong>5 bước:</strong> $QK^T$ → $/ \\sqrt{d_k}$ → Mask → Softmax → $\\times V$</li>
      <li><strong>Scale $\\sqrt{d_k}$:</strong> Dot product có $\\text{Var} = d_k$ → chia $\\sqrt{d_k}$ đưa về $\\text{Var} = 1$ → softmax ổn định</li>
      <li><strong>Multi-Head:</strong> h=8 heads, $d_k=64$ mỗi head, chi phí = 1 single-head $d_k=512$. Mỗi head học 1 kiểu quan hệ</li>
      <li><strong>Padding Mask:</strong> set score = $-\\infty$ cho [PAD] tokens</li>
      <li><strong>Causal Mask:</strong> ma trận tam giác dưới, ngăn decoder nhìn tương lai</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch23_03: Chapter = {
  id: 'ch23_03',
  title: '23.3. Scaled Dot-Product & Multi-Head Attention',
  introduction: 'Linear Projections, Scaled Dot-Product Attention step-by-step với ví dụ số, chứng minh √d_k, Multi-Head Attention, Padding & Causal Masks.',
  lessons: ch23_03_lessons,
};

export default ch23_03;
