import { Lesson, Chapter } from '../../courses';

const ch23_05_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: CẤU TRÚC 1 DECODER LAYER — 3 SUB-LAYERS
  // ==========================================================
  {
    id: 'ch23_05_01',
    title: '1. Cấu trúc 1 Decoder Layer — 3 Sub-layers',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Decoder Layer — Phức tạp hơn Encoder</h2>

  <p>Decoder layer giống Encoder nhưng thêm 1 sub-layer ở giữa. Tổng cộng <strong>3 sub-layers</strong> (thay vì 2 của Encoder), mỗi sub-layer đều có Add & Norm.</p>

  <div class="image-showcase">
    <img src="/images/ch23/decoder_layer_detail.png" alt="Transformer Decoder Layer Detail" />
    <div class="image-caption">Hình 1: Cấu trúc chi tiết 1 Decoder Layer — 3 sub-layers</div>
  </div>

  <h3>1.1. Ba sub-layers</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Sub-layer</th>
        <th>Q từ</th>
        <th>K, V từ</th>
        <th>Mask?</th>
        <th>Chức năng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>①</strong></td>
        <td>Masked Multi-Head Self-Attention</td>
        <td>Decoder input</td>
        <td>Decoder input</td>
        <td>Causal mask</td>
        <td>Hiểu ngữ cảnh đã sinh</td>
      </tr>
      <tr>
        <td><strong>②</strong></td>
        <td>Multi-Head Cross-Attention</td>
        <td>Decoder (sau ①)</td>
        <td><strong>Encoder output</strong></td>
        <td>Padding mask</td>
        <td>"Hỏi" encoder về input</td>
      </tr>
      <tr>
        <td><strong>③</strong></td>
        <td>Feed-Forward Network</td>
        <td colspan="4">Giống hệt FFN trong Encoder ($512 \\to 2048 \\to 512$)</td>
      </tr>
    </tbody>
  </table>

  <h3>1.2. Luồng dữ liệu (pseudocode)</h3>

  <div class="definition-block">
    <span class="definition-term">1 Decoder Layer step-by-step</span>
<pre><code># Input: Y (decoder tokens), H_enc (encoder output)

# Sub-layer 1: Masked Self-Attention
Y1 = LayerNorm(Y + Dropout(MaskedMHA(Q=Y, K=Y, V=Y)))

# Sub-layer 2: Cross-Attention  
Y2 = LayerNorm(Y1 + Dropout(CrossMHA(Q=Y1, K=H_enc, V=H_enc)))

# Sub-layer 3: FFN
Y3 = LayerNorm(Y2 + Dropout(FFN(Y2)))

return Y3  # → truyền vào decoder layer tiếp theo</code></pre>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">So sánh: Encoder vs Decoder Layer</span>
      <p><strong>Encoder Layer</strong> = 2 sub-layers: Self-Attention + FFN.<br/>
      <strong>Decoder Layer</strong> = 3 sub-layers: <em>Masked</em> Self-Attention + <em>Cross</em>-Attention + FFN.<br/>
      Thêm "Masked" ở ① (ngăn nhìn tương lai) và thêm hẳn ② (kết nối với encoder).</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: MASKED SELF-ATTENTION
  // ==========================================================
  {
    id: 'ch23_05_02',
    title: '2. Masked Self-Attention — Không nhìn tương lai',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Masked Self-Attention — Causal Attention chi tiết</h2>

  <h3>2.1. Tại sao cần mask?</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Decoder sinh text từ trái sang phải</span>
      <p>Khi sinh token thứ $t$, decoder chỉ được biết tokens $y_1, y_2, ..., y_{t-1}$ (đã sinh trước đó). Nếu để Self-Attention nhìn thấy $y_{t+1}, y_{t+2}, ...$ → đó là <strong>data leakage</strong> — model "gian lận" bằng cách nhìn đáp án.</p>
    </div>
  </div>

  <h3>2.2. Công thức với Causal Mask</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Masked Scaled Dot-Product Attention:</h4>
    <p class="font-mono text-lg">$\\text{MaskedAttn}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}} + M\\right) V$</p>
    <p>Trong đó ma trận mask $M$:</p>
    <p class="font-mono">$M_{ij} = \\begin{cases} 0 & \\text{nếu } i \\geq j \\text{ (token hiện tại hoặc trước)} \\\\\\\\ -\\infty & \\text{nếu } i < j \\text{ (token tương lai)} \\end{cases}$</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch23/causal_mask_matrix.png" alt="Causal Mask Matrix" />
    <div class="image-caption">Hình 2: Ma trận Causal Mask — ✓ = được attend, ✗ = bị chặn ($-\\infty$)</div>
  </div>

  <h3>2.3. Ví dụ: Dịch "I love cats" → "Tôi yêu mèo"</h3>

  <div class="definition-block">
    <span class="definition-term">Decoder đang sinh token thứ 3 ("mèo")</span>
<pre><code>Decoder input (shifted right): [&lt;SOS&gt;, "Tôi", "yêu"]

Attention scores (trước mask):
              Key: &lt;SOS&gt;  "Tôi"  "yêu"  "mèo"(future)
Query:
&lt;SOS&gt;              2.1     0.3    0.5     1.8
"Tôi"              0.4     1.9    0.7     2.3
"yêu"              0.2     0.6    2.0     1.5

Sau mask (token "mèo" bị che):
              Key: &lt;SOS&gt;  "Tôi"  "yêu"  "mèo"
Query:
&lt;SOS&gt;              2.1      -∞     -∞     -∞    → attend CHỈ &lt;SOS&gt;
"Tôi"              0.4     1.9     -∞     -∞    → attend &lt;SOS&gt; + "Tôi"
"yêu"              0.2     0.6    2.0     -∞    → attend 3 tokens trước

Softmax:
&lt;SOS&gt;:  [1.00, 0.00, 0.00, 0.00]
"Tôi":  [0.18, 0.82, 0.00, 0.00]
"yêu":  [0.07, 0.10, 0.83, 0.00]</code></pre>
    <p>"yêu" attend nhiều nhất vào chính nó (83%), một ít vào "Tôi" (10%) và "&lt;SOS&gt;" (7%). Token "mèo" (tương lai) hoàn toàn bị chặn.</p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Training trick: Teacher Forcing + Mask = Parallel!</span>
      <p>Trong training, ta có sẵn ground truth output "Tôi yêu mèo". Nhờ causal mask, ta có thể đưa <strong>toàn bộ output</strong> vào decoder cùng lúc — mask đảm bảo mỗi vị trí chỉ nhìn thấy tokens trước nó. Kết quả: training <strong>song song</strong> cho tất cả positions, không cần sinh tuần tự!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: CROSS-ATTENTION
  // ==========================================================
  {
    id: 'ch23_05_03',
    title: '3. Cross-Attention — Decoder "hỏi" Encoder',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Multi-Head Cross-Attention — Cầu nối Encoder-Decoder</h2>

  <h3>3.1. Cơ chế: Q từ Decoder, K/V từ Encoder</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Cross-Attention:</h4>
    <p class="font-mono">$Q = H^{dec} W^Q$ &nbsp;&nbsp; ← Query từ <strong>decoder</strong> (output của Masked SA)</p>
    <p class="font-mono">$K = H^{enc} W^K$ &nbsp;&nbsp; ← Key từ <strong>encoder</strong> output</p>
    <p class="font-mono">$V = H^{enc} W^V$ &nbsp;&nbsp; ← Value từ <strong>encoder</strong> output</p>
    <p class="font-mono text-lg">$\\text{CrossAttn} = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$</p>
  </div>

  <h3>3.2. Trực giác</h3>

  <div class="definition-block">
    <span class="definition-term">Decoder "hỏi" encoder: "Phần nào của input liên quan đến token tôi đang sinh?"</span>
    <p>Khi decoder đang sinh từ "mèo" (trong "Tôi yêu mèo"):</p>
    <ul>
      <li><strong>Query ("mèo"):</strong> "Tôi cần thông tin gì từ input để sinh token này?"</li>
      <li><strong>Keys ("I", "love", "cats"):</strong> encoder cung cấp "nhãn" cho mỗi token input</li>
      <li><strong>Values ("I", "love", "cats"):</strong> encoder cung cấp "nội dung" cho mỗi token input</li>
      <li>Query "mèo" sẽ <strong>match cao</strong> với Key "cats" → lấy nhiều Value từ "cats"</li>
    </ul>
  </div>

  <h3>3.3. Kích thước tensor</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tensor</th>
        <th>Nguồn</th>
        <th>Kích thước</th>
        <th>Ví dụ (src=5, tgt=3)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$Q$</td>
        <td>Decoder ($T_{tgt}$)</td>
        <td>$T_{tgt} \\times d_k$</td>
        <td>$3 \\times 64$</td>
      </tr>
      <tr>
        <td>$K$</td>
        <td>Encoder ($T_{src}$)</td>
        <td>$T_{src} \\times d_k$</td>
        <td>$5 \\times 64$</td>
      </tr>
      <tr>
        <td>$V$</td>
        <td>Encoder ($T_{src}$)</td>
        <td>$T_{src} \\times d_v$</td>
        <td>$5 \\times 64$</td>
      </tr>
      <tr>
        <td>$QK^T$</td>
        <td>Attention scores</td>
        <td>$T_{tgt} \\times T_{src}$</td>
        <td>$3 \\times 5$ (mỗi decoder token attend 5 encoder tokens)</td>
      </tr>
      <tr>
        <td>Output</td>
        <td>Context vectors</td>
        <td>$T_{tgt} \\times d_v$</td>
        <td>$3 \\times 64$</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Cross-Attention = Attention cũ trong Seq2Seq, nhưng mạnh hơn</span>
      <p>Chương 22 (Bahdanau/Luong Attention): decoder attend encoder hidden states → 1 context vector.<br/>
      Transformer Cross-Attention: <strong>Multi-Head</strong> (8 heads song song), <strong>learnable projections</strong> (W^Q, W^K, W^V), và <strong>tại mọi decoder layer</strong> (6 lần!) thay vì chỉ 1 lần. Kết quả: kết nối encoder-decoder mạnh hơn nhiều.</p>
    </div>
  </div>

  <h3>3.4. Encoder output dùng lại nhiều lần</h3>

  <div class="definition-block">
    <span class="definition-term">Encoder chạy 1 lần, Decoder dùng đi dùng lại</span>
    <p>Encoder xử lý input "I love cats" → $H^{enc} \\in \\mathbb{R}^{5 \\times 512}$ (chỉ cần chạy <strong>1 lần</strong>).</p>
    <p>Decoder sinh "Tôi", "yêu", "mèo" — tại <strong>mỗi decoder layer</strong> (6 layers), Cross-Attention đều dùng cùng $H^{enc}$ làm K, V. Tổng cộng $H^{enc}$ được dùng <strong>6 lần</strong> trong decoder.</p>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: AUTOREGRESSIVE — TRAIN VS INFERENCE
  // ==========================================================
  {
    id: 'ch23_05_04',
    title: '4. Autoregressive Generation — Train vs Inference',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Tạo sinh Autoregressive — Sự khác biệt lớn giữa Train và Inference</h2>

  <h3>4.1. Training: Song song nhờ Teacher Forcing + Mask</h3>

  <div class="definition-block">
    <span class="definition-term">Training — tất cả tokens cùng lúc</span>
<pre><code>Input:   "I love cats"           (encoder input)
Target:  "&lt;SOS&gt; Tôi yêu mèo"     (decoder input — shifted right)
Label:   "Tôi yêu mèo &lt;EOS&gt;"     (expected output)

Decoder nhận TOÀN BỘ target cùng lúc:
  Position 0: nhìn &lt;SOS&gt;           → dự đoán "Tôi"
  Position 1: nhìn &lt;SOS&gt;, Tôi      → dự đoán "yêu"
  Position 2: nhìn &lt;SOS&gt;, Tôi, yêu → dự đoán "mèo"
  Position 3: nhìn tất cả          → dự đoán &lt;EOS&gt;

Causal mask đảm bảo mỗi position KHÔNG nhìn tokens sau nó.
→ 4 predictions tính SONG SONG trong 1 forward pass!</code></pre>
  </div>

  <h3>4.2. Inference: Tuần tự từng token</h3>

  <div class="definition-block">
    <span class="definition-term">Inference — sinh từng token một</span>
<pre><code>Step 0: Input [&lt;SOS&gt;]               → Decoder dự đoán → "Tôi"
Step 1: Input [&lt;SOS&gt;, Tôi]          → Decoder dự đoán → "yêu"
Step 2: Input [&lt;SOS&gt;, Tôi, yêu]     → Decoder dự đoán → "mèo"
Step 3: Input [&lt;SOS&gt;, Tôi, yêu, mèo] → Decoder dự đoán → &lt;EOS&gt;
→ Dừng khi gặp &lt;EOS&gt;

Mỗi step phải chờ step trước → TUẦN TỰ (autoregressive)!</code></pre>
  </div>

  <h3>4.3. So sánh chi tiết</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Training</th>
        <th>Inference</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Decoder input</strong></td>
        <td>Ground truth (teacher forcing)</td>
        <td>Predictions từ step trước</td>
      </tr>
      <tr>
        <td><strong>Song song?</strong></td>
        <td>Có — tất cả positions cùng lúc</td>
        <td>Không — từng token một</td>
      </tr>
      <tr>
        <td><strong>Causal mask</strong></td>
        <td>Cần (ngăn nhìn ground truth tương lai)</td>
        <td>Không cần (chưa có token tương lai)</td>
      </tr>
      <tr>
        <td><strong>Tốc độ</strong></td>
        <td>Nhanh ($O(1)$ forward pass)</td>
        <td>Chậm ($O(T)$ forward passes)</td>
      </tr>
      <tr>
        <td><strong>Error accumulation</strong></td>
        <td>Không (dùng ground truth)</td>
        <td>Có — lỗi ở token trước lan sang token sau</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">KV Cache — Tối ưu inference</span>
      <p>Tại inference step $t$, K và V cho tokens $1, ..., t-1$ <strong>không đổi</strong> (đã tính ở các steps trước). Thay vì tính lại, ta <strong>cache</strong> chúng và chỉ tính K, V cho token mới $t$. Giảm computation từ $O(t^2)$ xuống $O(t)$ tại mỗi step. Đây là <strong>KV Cache</strong> — kỹ thuật cốt lõi cho LLM inference.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: OUTPUT LAYER + TIE EMBEDDINGS
  // ==========================================================
  {
    id: 'ch23_05_05',
    title: '5. Output Layer — Linear + Softmax',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Output Layer — Từ hidden state tới từ tiếp theo</h2>

  <h3>5.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Tầng output cuối cùng của Decoder:</h4>
    <p class="font-mono">$\\text{logits}_t = H^{dec}_t \\cdot W_{vocab} + b$ &nbsp;&nbsp; với $W_{vocab} \\in \\mathbb{R}^{d_{model} \\times |V|}$</p>
    <p class="font-mono text-lg">$P(y_t | y_{<t}, x) = \\text{softmax}(\\text{logits}_t)$</p>
    <p>$H^{dec}_t \\in \\mathbb{R}^{d_{model}}$: output decoder layer cuối cho token $t$.</p>
    <p>$W_{vocab}$: project từ $d_{model}$-dim → $|V|$-dim (vocab size). Mỗi cột = "fingerprint" của 1 từ trong vocab.</p>
  </div>

  <h3>5.2. Ví dụ số</h3>

  <div class="definition-block">
    <span class="definition-term">$d_{model}=512$, $|V|=30000$</span>
<pre><code>H_dec_t ∈ R^512    (hidden state tại position t)
W_vocab ∈ R^(512×30000)

logits = H_dec_t · W_vocab ∈ R^30000
       = [2.1, -0.5, 0.3, ..., 5.8, ..., -1.2]
              ↑"the"   ↑"a"          ↑"mèo"

P = softmax(logits) ∈ R^30000
  = [0.002, 0.001, ..., 0.83, ..., 0.0001]
                        ↑"mèo" = 83%!

Prediction: argmax(P) = "mèo"</code></pre>
  </div>

  <h3>5.3. Tie Embeddings — Trick tiết kiệm parameters</h3>

  <div class="definition-block">
    <span class="definition-term">Dùng chung weight: Embedding = Output projection (transpose)</span>
    <p>Input Embedding: $E \\in \\mathbb{R}^{|V| \\times d_{model}}$ — token → vector.</p>
    <p>Output projection: $W_{vocab} \\in \\mathbb{R}^{d_{model} \\times |V|}$ — vector → logits.</p>
    <p><strong>Tie embeddings:</strong> $W_{vocab} = E^T$ (transpose). Cùng 1 ma trận, dùng 2 chỗ!</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Không tie</th>
        <th>Có tie</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>$E$: $30000 \\times 512$ = 15.36M params</td>
        <td rowspan="2">Chỉ 1 ma trận = <strong>15.36M params</strong> (tiết kiệm 50%!)</td>
      </tr>
      <tr>
        <td>$W_{vocab}$: $512 \\times 30000$ = 15.36M params</td>
      </tr>
      <tr>
        <td><strong>Tổng: 30.72M params</strong></td>
        <td><strong>Tổng: 15.36M params</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tại sao tie hoạt động?</span>
      <p>Input embedding: từ "mèo" → vector $e_{cat}$. Output: muốn dự đoán "mèo" → hidden state phải <strong>gần $e_{cat}$</strong> (cosine similarity cao). Dùng chung ma trận buộc embedding space của input và output <strong>nhất quán</strong> — từ nào gần nhau trong input cũng gần nhau ở output.</p>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 23.5 — Decoder Stack</h3>
    <ul>
      <li><strong>3 sub-layers:</strong> Masked SA (causal) → Cross-Attention (Q:dec, KV:enc) → FFN</li>
      <li><strong>Masked Self-Attention:</strong> causal mask ($-\\infty$ cho tương lai) → training vẫn song song nhờ teacher forcing</li>
      <li><strong>Cross-Attention:</strong> decoder "hỏi" encoder, Multi-Head mạnh hơn Bahdanau/Luong nhiều lần</li>
      <li><strong>Train vs Inference:</strong> training song song (tất cả positions), inference tuần tự (autoregressive). KV Cache tối ưu inference</li>
      <li><strong>Output:</strong> Linear ($d_{model} \\to |V|$) + Softmax. Tie Embeddings tiết kiệm 50% params embedding</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch23_05: Chapter = {
  id: 'ch23_05',
  title: '23.5. Decoder Stack',
  introduction: 'Cấu trúc 3 sub-layers (Masked SA, Cross-Attention, FFN), Causal Mask chi tiết, Cross-Attention Q:decoder/KV:encoder, Autoregressive train vs inference, KV Cache, Output Layer + Tie Embeddings.',
  lessons: ch23_05_lessons,
};

export default ch23_05;
