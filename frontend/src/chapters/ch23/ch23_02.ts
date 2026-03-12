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

  <p>Transformer xử lý text bằng cách chuyển mỗi token (từ/subword) thành vector số thực. Quá trình này giống Word Embedding trong RNN (Chương 22), nhưng có vài điểm khác biệt quan trọng.</p>

  <h3>1.1. Quy trình 3 bước</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>Tokenization</h4>
        <p>Text "Tôi yêu AI" → Tokens: ["Tôi", "yêu", "AI"]. Mỗi token được gán 1 ID số nguyên từ vocabulary.</p>
        <div class="definition-block">
          <span class="definition-term">Vocabulary là gì?</span>
          <p>Tập hợp tất cả tokens có trong corpus. Ví dụ vocab có 30,000 tokens:</p>
          <p>vocab = {"[PAD]": 0, "[UNK]": 1, "[CLS]": 2, "[SEP]": 3, "Tôi": 42, "yêu": 105, "AI": 7831, ...}</p>
        </div>
        <p><strong>Special tokens:</strong></p>
        <ul>
          <li><strong>[PAD]</strong>: Padding — đệm câu ngắn cho cùng độ dài batch</li>
          <li><strong>[UNK]</strong>: Unknown — từ không có trong vocab</li>
          <li><strong>[CLS]</strong>: Classification — token đầu câu (BERT dùng)</li>
          <li><strong>[SEP]</strong>: Separator — phân cách 2 câu</li>
          <li><strong>[SOS]</strong> / <strong>[EOS]</strong>: Start/End of sequence</li>
        </ul>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>Embedding Lookup</h4>
        <p>Ma trận embedding $E \\in \\mathbb{R}^{|V| \\times d_{model}}$ với $|V|$ = vocab size, $d_{model}$ = embedding dimension.</p>
        <div class="formula-block">
          <p>$x_i = E[\\text{token\\_id}_i] \\in \\mathbb{R}^{d_{model}}$</p>
        </div>
        <p><strong>Ví dụ với $d_{model}=4$:</strong></p>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Embedding Vector</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>42 ("Tôi")</td>
              <td>[0.12, -0.34, 0.56, -0.21]</td>
            </tr>
            <tr>
              <td>105 ("yêu")</td>
              <td>[0.78, 0.23, -0.45, 0.91]</td>
            </tr>
            <tr>
              <td>7831 ("AI")</td>
              <td>[-0.11, 0.67, 0.33, -0.89]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>Scaling</h4>
        <p>Paper gốc nhân embedding với $\\sqrt{d_{model}}$:</p>
        <div class="formula-block">
          <p>$x_i = E[\\text{token\\_id}_i] \\times \\sqrt{d_{model}}$</p>
        </div>
        <div class="callout callout-tip">
          <div class="callout-content">
            <span class="callout-title">Tại sao cần scaling?</span>
            <p>Embedding values ban đầu rất nhỏ (thường từ Gaussian N(0, 0.02)). Khi $d_{model}=512$, std ≈ 0.02 → variance ≈ 0.0004.</p>
            <p>Positional Encoding có range [-1, 1]. Nhân với $\\sqrt{512} \\approx 22.6$ → embedding variance ≈ 0.0004 × 512 = 0.2, gần với PE hơn.</p>
            <p>Kết quả: embedding + PE có scale tương đương → training ổn định hơn.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h3>1.2. Tokenization chi tiết</h3>

  <h4>Word-level vs Subword-level</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Phương pháp</th>
        <th>Ví dụ</th>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Word-level</strong></td>
        <td>"unhappiness" → ["unhappiness"]</td>
        <td>Dễ hiểu, ngữ nghĩa rõ</td>
        <td>Vocab cực lớn (~triệu), OOV</td>
      </tr>
      <tr>
        <td><strong>Subword (BPE)</strong></td>
        <td>"unhappiness" → ["un", "happi", "ness"]</td>
        <td>Vocab nhỏ (~30K-50K), xử lý OOV</td>
        <td>Phức tạp hơn</td>
      </tr>
      <tr>
        <td><strong>WordPiece</strong></td>
        <td>"unhappiness" → ["un", "happi", "##ness"]</td>
        <td>Dùng trong BERT</td>
        <td>Token dài hơn BPE</td>
      </tr>
      <tr>
        <td><strong>SentencePiece</strong></td>
        <td>"unhappiness" → ["un", "happi", "ness"]</td>
        <td>Không cần pre-tokenize</td>
        <td>Dùng trong T5, ALBERT, LLaMA</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">OOV = Out Of Vocabulary</span>
      <p>Khi gặp từ không có trong vocab, model sẽ thay bằng [UNK]. Subword tokenization giải quyết vấn đề này bằng cách tách từ lạ thành các subwords quen thuộc.</p>
    </div>
  </div>

  <h3>1.3. Các tham số embedding</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tham số</th>
        <th>Giá trị (Base)</th>
        <th>Giá trị (Big)</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vocabulary size |V|</strong></td>
        <td>~30,000-50,000</td>
        <td>~50,000-100,000</td>
        <td>Số tokens trong từ điển</td>
      </tr>
      <tr>
        <td><strong>Embedding dim</strong></td>
        <td>512</td>
        <td>1024</td>
        <td>Kích thước vector mỗi token</td>
      </tr>
      <tr>
        <td><strong>Parameters</strong></td>
        <td>~15-25M</td>
        <td>~50-100M</td>
        <td>$|V| \\times d_{model}$</td>
      </tr>
    </tbody>
  </table>

  <div class="definition-block">
    <span class="definition-term">Embedding được học như thế nào?</span>
    <p>Giống như Word2Vec, embedding matrix $E$ là <strong>learnable parameter</strong>. Trong quá trình training, gradient backpropagation qua toàn bộ network sẽ cập nhật $E$ để embedding reflect ngữ nghĩa (từ相近 có embedding gần nhau trong không gian vector).</p>
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

  <div class="formula-block">
    <h4>Final Input:</h4>
    <p>$\text{Input}_i = \text{TokenEmbed}(x_i) + \text{PE}(\text{pos}_i)$</p>
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
<div class="article-content">
  <h2>3. Mã hóa vị trí Sinusoidal — Công thức sin/cos</h2>

  <p>Vaswani et al. (2017) đề xuất dùng hàm sin và cos với tần số khác nhau để mã hóa vị trí. Đây là phương pháp <strong>không cần học</strong> — hoàn toàn deterministic, có thể generalize cho sequences dài hơn training.</p>

  <h3>3.1. Công thức</h3>

  <div class="formula-block">
    <h4>Định nghĩa Sinusoidal PE:</h4>
    <p>$PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p>$PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p>Trong đó:</p>
    <ul>
      <li>$pos$ = vị trí token (0, 1, 2, ...)</li>
      <li>$i$ = chiều encoding (0, 1, ..., $d_{model}/2 - 1$)</li>
      <li>$d_{model}$ = kích thước embedding (thường là 512)</li>
    </ul>
  </div>

  <h3>3.2. Ý nghĩa hình học</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Tần số giảm theo chiều</h4>
      <p>Chiều $i=0$: period = $2\\pi$ → tần số cao, thay đổi nhanh → phù hợp với vị trí gần nhau</p>
      <p>Chiều $i=d_{model}/2-1$: period = $2\\pi \\cdot 10000$ → tần số cực thấp, thay đổi rất chậm → phù hợp với vị trí xa</p>
      <p>Giống hệ thập phân: chữ số hàng đơn vị thay đổi liên tục, hàng nghìn thay đổi chậm.</p>
    </div>
    <div class="concept-card">
      <h4>Cặp sin-cos tạo tọa độ góc</h4>
      <p>Cặp $(PE_{2i}, PE_{2i+1}) = (\\sin(\\omega), \\/cos(\\omega))$ là một điểm trên <strong>đường tròn đơn vị</strong>.</p>
      <p>$PE_{pos+k}$ có thể biểu diễn từ $PE_{pos}$ qua <strong>phép biến đổi tuyến tính</strong> → model dễ dàng học được <strong>vị trí tương đối (relative position)</strong>.</p>
    </div>
  </div>

  <h3>3.3. Relative Position qua Sinusoidal</h3>

  <div class="definition-block">
    <span class="definition-term">Tại sao Sinusoidal encode relative position tốt?</span>
    <p>Dùng công thức cộng góc:</p>
    <p>$\\sin(a+b) = \\sin(a)\\cos(b) + \\cos(a)\\sin(b)$</p>
    <p>$\\cos(a+b) = \\cos(a)\\cos(b) - \\sin(a)\\sin(b)$</p>
    <p>Điều này có nghĩa: $PE_{pos+k}$ có thể được tính từ $PE_{pos}$ nhân với ma trận xoay. Model có thể học "khoảng cách $k$" thông qua weights.</p>
  </div>

  <h3>3.4. Minh họa trực quan</h3>

  <div class="image-showcase">
    <img src="/images/ch23/positional_encoding_heatmap.png" alt="Positional Encoding Heatmap" />
    <div class="image-caption">Hình 2: Heatmap Sinusoidal PE — 128 positions × 64 dims. Trục X: chiều encoding (tần số giảm dần). Trục Y: vị trí token</div>
  </div>

  <h3>3.5. Ví dụ số cụ thể</h3>

  <div class="definition-block">
    <span class="definition-term">Tính toán với $d_{model} = 4$, positions 0, 1, 2</span>
    <p>Với $i = 0$: tần số $\\omega = 1/10000^0 = 1$</p>
    <p>Với $i = 1$: tần số $\\omega = 1/10000^{2/4} = 1/10000^{0.5} = 1/100 = 0.01$</p>
    <p><strong>Position 0:</strong></p>
    <p>$PE(0) = [\\sin(0), \\/cos(0), \\sin(0), \\cos(0)] = [0, 1, 0, 1]$</p>
    <p><strong>Position 1:</strong></p>
    <p>$PE(1) = [\\sin(1), \\/cos(1), \\sin(0.01), \\cos(0.01)] = [0.84, 0.54, 0.01, 1.00]$</p>
    <p><strong>Position 2:</strong></p>
    <p>$PE(2) = [\\sin(2), \\/cos(2), \\sin(0.02), \\cos(0.02)] = [0.91, -0.42, 0.02, 1.00]$</p>
    <p><strong>Nhận xét:</strong></p>
    <ul>
      <li>Chiều 0-1 (tần số cao): thay đổi mạnh qua mỗi position</li>
      <li>Chiều 2-3 (tần số thấp): thay đổi rất chậm</li>
    </ul>
  </div>

  <h3>3.6. Ưu và nhược điểm</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Không cần học, không tốn tham số</td>
        <td>Encode absolute position, không phải relative</td>
      </tr>
      <tr>
        <td>Extrapolate được cho sequence dài hơn training</td>
        <td>Không có bias cho position > max_len</td>
      </tr>
      <tr>
        <td>Relative position được encode ngầm qua sin/cos relationship</td>
        <td>Khó học position > 1000 hiệu quả</td>
      </tr>
    </tbody>
  </table>
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
    <p>$q'_m = R_\\theta(m) \\cdot q_m$, &nbsp; $k'_n = R_\\theta(n) \\cdot k_n$</p>
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
