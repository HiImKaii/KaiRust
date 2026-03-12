import { Lesson, Chapter } from '../../courses';

const ch23_02_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: TOKEN EMBEDDING
  // ==========================================================
  {
    id: 'ch23_02_01',
    title: '1. Token Embedding — Từ số nguyên tới vector',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Token Embedding trong Transformer</h2>

  <p>Transformer xử lý text bằng cách chuyển mỗi token (từ/subword) thành vector số thực. Quá trình này giống Word Embedding trong RNN (Chương 22), nhưng có vài điểm khác biệt.</p>

  <h3>1.1. Quy trình</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>Tokenization</h4>
        <p>Text "Tôi yêu AI" → Tokens: ["Tôi", "yêu", "AI"]. Mỗi token được gán 1 ID số nguyên từ vocabulary. Ví dụ: vocab = {"Tôi": 42, "yêu": 105, "AI": 7831}.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>Embedding Lookup</h4>
        <p>Tra bảng ma trận $E \\in \\mathbb{R}^{|V| \\times d_{model}}$. Token ID = index hàng → lấy ra vector $d_{model}$-dim.</p>
        <p class="font-mono">$x_i = E[\\text{token\\_id}_i] \\in \\mathbb{R}^{d_{model}}$</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>Scaling</h4>
        <p>Paper gốc nhân embedding với $\\sqrt{d_{model}}$:</p>
        <p class="font-mono">$x_i = E[\\text{token\\_id}_i] \\times \\sqrt{d_{model}}$</p>
        <p>Lý do: embedding values thường nhỏ (learning init), nhân $\\sqrt{512} \\approx 22.6$ giúp scale lên tương đương với Positional Encoding.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Subword Tokenization</span>
      <p>Transformer hiện đại dùng <strong>BPE</strong> (Byte Pair Encoding) hoặc <strong>SentencePiece</strong> thay vì word-level. Ví dụ: "unhappiness" → ["un", "happi", "ness"]. Ưu điểm: vocab nhỏ hơn (~30K-50K tokens), xử lý được từ lạ (OOV).</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: VẤN ĐỀ VỊ TRÍ
  // ==========================================================
  {
    id: 'ch23_02_02',
    title: '2. Vấn đề vị trí — Self-Attention không biết thứ tự',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Tại sao cần Positional Encoding?</h2>

  <h3>2.1. Self-Attention là phép toán "bag of words"</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Permutation Invariance — nhược điểm ẩn</span>
      <p>Self-Attention tính $\\text{softmax}(QK^T/\\sqrt{d_k})V$ — chỉ phụ thuộc vào <strong>nội dung</strong> các token, không phụ thuộc <strong>vị trí</strong>. Nếu hoán đổi thứ tự input: "mèo cắn chó" vs "chó cắn mèo" → Self-Attention cho <strong>cùng output</strong>!</p>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">So sánh: RNN tự biết vị trí</span>
    <p>RNN xử lý <strong>tuần tự</strong>: $h_t = f(h_{t-1}, x_t)$. Token thứ 3 nhận hidden state đã qua 2 tokens trước → <strong>vị trí được mã hóa ngầm</strong> trong hidden state.</p>
    <p>Transformer <strong>bỏ recurrence</strong> → mất thông tin vị trí → phải <strong>thêm vào explicitly</strong>.</p>
  </div>

  <h3>2.2. Giải pháp: Cộng vị trí vào embedding</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Final Input:</h4>
    <p class="font-mono text-lg">$\\text{Input}_i = \\text{TokenEmbed}(x_i) + \\text{PE}(\\text{pos}_i)$</p>
    <p>Cộng (element-wise addition) giữa embedding và positional encoding. Cả 2 đều có kích thước $d_{model}$.</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch23/positional_encoding_concept.png" alt="Positional Encoding Concept" />
    <div class="image-caption">Hình 1: Token Embedding + Positional Encoding = Final Input</div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: SINUSOIDAL PE
  // ==========================================================
  {
    id: 'ch23_02_03',
    title: '3. Sinusoidal Positional Encoding — Công thức sin/cos',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Sinusoidal Positional Encoding</h2>

  <p>Vaswani et al. đề xuất dùng hàm sin và cos với tần số khác nhau để mã hóa vị trí. Không cần học — hoàn toàn deterministic.</p>

  <h3>3.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Positional Encoding:</h4>
    <p class="font-mono text-lg">$PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p class="font-mono text-lg">$PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p>Trong đó: $pos$ = vị trí token (0, 1, 2, ...), $i$ = chiều encoding (0, 1, ..., $d_{model}/2 - 1$).</p>
  </div>

  <h3>3.2. Giải thích trực giác</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Tần số thay đổi theo chiều</h4>
      <p>Chiều $i=0$: period = $2\\pi$ (tần số cao, thay đổi nhanh)</p>
      <p>Chiều $i=255$: period = $2\\pi \\cdot 10000$ (tần số thấp, thay đổi chậm)</p>
      <p>Giống "hệ đếm nhị phân": bit thấp nhất thay đổi nhanh nhất, bit cao nhất thay đổi chậm nhất.</p>
    </div>
    <div class="concept-card">
      <h4>Tại sao cả sin VÀ cos?</h4>
      <p>Mỗi cặp (sin, cos) cùng tần số tạo thành một "tọa độ cực" → mã hóa vị trí trên đường tròn:</p>
      <p>$PE_{pos} = (\\sin(\\omega), \\cos(\\omega))$ là một điểm trên unit circle.</p>
      <p>Lợi ích: $PE_{pos+k}$ có thể được biểu diễn dạng <strong>linear transformation</strong> của $PE_{pos}$ → model có thể <strong>học relative position</strong>.</p>
    </div>
  </div>

  <h3>3.3. Visualization</h3>

  <div class="image-showcase">
    <img src="/images/ch23/positional_encoding_heatmap.png" alt="Positional Encoding Heatmap" />
    <div class="image-caption">Hình 2: Heatmap Sinusoidal PE — 128 positions × 64 dims. Trục X: chiều encoding (tần số giảm dần). Trục Y: vị trí token</div>
  </div>

  <h3>3.4. Ví dụ số</h3>

  <div class="definition-block">
    <span class="definition-term">$d_{model} = 4$, pos = 0, 1, 2</span>
    <p>$PE(0) = [\\sin(0), \\cos(0), \\sin(0), \\cos(0)] = [0, 1, 0, 1]$</p>
    <p>$PE(1) = [\\sin(1), \\cos(1), \\sin(0.01), \\cos(0.01)] = [0.84, 0.54, 0.01, 1.00]$</p>
    <p>$PE(2) = [\\sin(2), \\cos(2), \\sin(0.02), \\cos(0.02)] = [0.91, -0.42, 0.02, 1.00]$</p>
    <p>Nhận xét: chiều 0-1 (tần số cao) thay đổi mạnh, chiều 2-3 (tần số thấp) thay đổi rất chậm.</p>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: CÁC LOẠI PE KHÁC
  // ==========================================================
  {
    id: 'ch23_02_04',
    title: '4. Learned PE, RoPE — Xu hướng hiện đại',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Các phương pháp Positional Encoding khác</h2>

  <h3>4.1. Learned Positional Embedding</h3>

  <div class="definition-block">
    <span class="definition-term">Học vị trí thay vì tính</span>
    <p>Thay vì dùng sin/cos cố định, tạo ma trận $P \\in \\mathbb{R}^{T_{max} \\times d_{model}}$ làm <strong>learnable parameter</strong>. Mỗi hàng là PE cho 1 vị trí, được cập nhật qua SGD như weight thường.</p>
    <p>Dùng trong: <strong>BERT</strong>, <strong>GPT-2</strong>. Nhược điểm: không generalize được cho sequences dài hơn $T_{max}$ trong training.</p>
  </div>

  <h3>4.2. RoPE — Rotary Position Embedding</h3>

  <div class="definition-block">
    <span class="definition-term">Su et al., 2021 — Dùng trong LLaMA, Gemma, Mistral</span>
    <p>Thay vì <strong>cộng</strong> PE vào embedding, RoPE <strong>xoay</strong> (rotate) Q và K vectors theo vị trí:</p>
    <p class="font-mono">$q'_m = R_\\theta(m) \\cdot q_m$, &nbsp; $k'_n = R_\\theta(n) \\cdot k_n$</p>
    <p>Trong đó $R_\\theta(m)$ là ma trận xoay theo góc $m \\cdot \\theta_i$. Ưu điểm: $q'_m \\cdot k'_n$ chỉ phụ thuộc vào <strong>khoảng cách tương đối $m - n$</strong> → tự nhiên encode relative position.</p>
  </div>

  <h3>4.3. So sánh</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Phương pháp</th>
        <th>Dùng trong</th>
        <th>Absolute/Relative</th>
        <th>Extrapolate?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Sinusoidal</strong></td>
        <td>Transformer gốc</td>
        <td>Absolute</td>
        <td>Có (lý thuyết)</td>
      </tr>
      <tr>
        <td><strong>Learned</strong></td>
        <td>BERT, GPT-2</td>
        <td>Absolute</td>
        <td>Không</td>
      </tr>
      <tr>
        <td><strong>RoPE</strong></td>
        <td>LLaMA, Gemma, Mistral</td>
        <td>Relative</td>
        <td>Tốt hơn (với NTK scaling)</td>
      </tr>
      <tr>
        <td><strong>ALiBi</strong></td>
        <td>BLOOM</td>
        <td>Relative (bias)</td>
        <td>Tốt</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
];

const ch23_02: Chapter = {
  id: 'ch23_02',
  title: '23.2. Input Processing — Embedding & Positional Encoding',
  introduction: 'Token Embedding, Positional Encoding (Sinusoidal sin/cos), Learned PE, RoPE — cách Transformer biết thứ tự tokens.',
  lessons: ch23_02_lessons,
};

export default ch23_02;
