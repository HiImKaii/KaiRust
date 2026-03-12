import { Lesson, Chapter } from '../../courses';

const ch23_01_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: HẠN CHẾ CỦA RNN
  // ==========================================================
  {
    id: 'ch23_01_01',
    title: '1. Hạn chế của RNN — Tại sao cần thay thế?',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Hạn chế cốt lõi của RNN</h2>

  <p>Chương 22 đã cho ta hiểu sâu về RNN, LSTM, GRU, và Attention. Nhưng tại sao năm 2017, Vaswani et al. quyết định <strong>loại bỏ hoàn toàn RNN</strong>? Vì RNN có 3 hạn chế không thể khắc phục:</p>

  <h3>1.1. Vấn đề 1: Tính tuần tự (Sequential Bottleneck)</h3>

  <div class="definition-block">
    <span class="definition-term">RNN phải xử lý từng token một</span>
    <p>Để tính $h_t$, RNN <strong>bắt buộc</strong> phải có $h_{t-1}$ trước. Do đó token thứ 100 phải <strong>chờ</strong> 99 tokens trước xử lý xong. Cho chuỗi T tokens: cần <strong>T bước tuần tự</strong>.</p>
    <p>GPU hiện đại có hàng nghìn cores — nhưng RNN chỉ dùng được <strong>1 core tại mỗi thời điểm</strong> (theo chiều thời gian). Lãng phí tài nguyên tính toán.</p>
  </div>

  <h3>1.2. Vấn đề 2: Long-range dependency vẫn khó</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">LSTM/GRU cải thiện nhưng không giải quyết triệt để</span>
      <p>Token $x_1$ và $x_{100}$ phải truyền thông tin qua <strong>100 bước RNN</strong>. Dù LSTM có cell state highway, gradient vẫn phải đi qua 100 gate operations. Trong thực tế, LSTM chỉ hiệu quả với khoảng cách <strong>~200-300 tokens</strong>.</p>
    </div>
  </div>

  <h3>1.3. Vấn đề 3: Attention trên RNN vẫn bị giới hạn</h3>

  <p>Attention (Bahdanau/Luong) giúp decoder nhìn lại encoder — nhưng <strong>encoder vẫn là RNN</strong>. Encoder vẫn xử lý tuần tự, vẫn bị bottleneck. Attention chỉ là "bọc ngoài" — lõi bên trong vẫn chậm.</p>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: Ý TƯỞNG CỐT LÕI
  // ==========================================================
  {
    id: 'ch23_01_02',
    title: '2. Ý tưởng cốt lõi — "Attention Is All You Need"',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. "Attention Is All You Need" — Loại bỏ hoàn toàn Recurrence</h2>

  <p>Vaswani et al. (2017) đặt câu hỏi: <strong>"Nếu Attention đã là phần mạnh nhất của hệ thống, tại sao không dùng CHỈ Attention?"</strong></p>

  <div class="definition-block">
    <span class="definition-term">Ý tưởng then chốt</span>
    <p>Thay vì dùng RNN để tạo hidden states rồi apply Attention lên đó → <strong>dùng Self-Attention trực tiếp</strong> trên input embeddings. Mỗi token attend tới <strong>tất cả tokens khác</strong> trong 1 phép tính ma trận duy nhất.</p>
    <ul>
      <li><strong>Không recurrence</strong> → tất cả positions tính <strong>song song</strong></li>
      <li><strong>Khoảng cách = $O(1)$</strong> → token 1 và token 100 kết nối trực tiếp qua 1 attention step</li>
      <li><strong>GPU-friendly</strong> → toàn bộ là phép nhân ma trận → tận dụng GPU/TPU</li>
    </ul>
  </div>

  <div class="image-showcase">
    <img src="/images/ch23/rnn_vs_transformer_comparison.png" alt="RNN vs Transformer Processing" />
    <div class="image-caption">Hình 1: So sánh RNN (tuần tự) vs Transformer (song song)</div>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Cái giá phải trả</span>
      <p>Self-Attention có complexity $O(T^2 \\cdot d)$ về bộ nhớ — mỗi token attend <strong>tất cả</strong> tokens khác. Với T=1000 tokens → cần lưu ma trận 1000×1000. Đây là trade-off: <strong>song song nhưng tốn bộ nhớ</strong>.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: TỔNG QUAN KIẾN TRÚC
  // ==========================================================
  {
    id: 'ch23_01_03',
    title: '3. Tổng quan kiến trúc Transformer',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Kiến trúc Transformer — Bức tranh toàn cảnh</h2>

  <div class="image-showcase">
    <img src="/images/ch23/transformer_architecture_overview.png" alt="Transformer Architecture Overview" />
    <div class="image-caption">Hình 2: Kiến trúc Transformer hoàn chỉnh (Vaswani et al., 2017)</div>
  </div>

  <h3>3.1. Hai khối chính</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Encoder (bên trái)</h4>
      <p>Nhận input sequence, xử lý qua <strong>N=6 layers</strong> giống hệt nhau. Mỗi layer gồm:</p>
      <ol>
        <li><strong>Multi-Head Self-Attention</strong></li>
        <li><strong>Add & Norm</strong> (Residual + LayerNorm)</li>
        <li><strong>Feed-Forward Network</strong> (2 linear layers)</li>
        <li><strong>Add & Norm</strong></li>
      </ol>
      <p>Output: biểu diễn ngữ nghĩa giàu thông tin của mỗi token.</p>
    </div>
    <div class="concept-card">
      <h4>Decoder (bên phải)</h4>
      <p>Sinh output tuần tự, cũng <strong>N=6 layers</strong>. Mỗi layer gồm:</p>
      <ol>
        <li><strong>Masked Multi-Head Self-Attention</strong> (causal)</li>
        <li><strong>Add & Norm</strong></li>
        <li><strong>Multi-Head Cross-Attention</strong> (Q: decoder, KV: encoder)</li>
        <li><strong>Add & Norm</strong></li>
        <li><strong>Feed-Forward Network</strong></li>
        <li><strong>Add & Norm</strong></li>
      </ol>
    </div>
  </div>

  <h3>3.2. Các thành phần bổ trợ</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thành phần</th>
        <th>Vị trí</th>
        <th>Chức năng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Input Embedding</strong></td>
        <td>Đáy encoder/decoder</td>
        <td>Chuyển token IDs → vectors $\\in \\mathbb{R}^{d_{model}}$</td>
      </tr>
      <tr>
        <td><strong>Positional Encoding</strong></td>
        <td>Cộng vào embedding</td>
        <td>Thêm thông tin vị trí (sin/cos)</td>
      </tr>
      <tr>
        <td><strong>Linear + Softmax</strong></td>
        <td>Đỉnh decoder</td>
        <td>Project hidden → vocab size → probability</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: CÁC CON SỐ QUAN TRỌNG
  // ==========================================================
  {
    id: 'ch23_01_04',
    title: '4. Hyperparameters — Các con số quan trọng',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Con số cốt lõi từ Paper gốc</h2>

  <p>Vaswani et al. (2017) sử dụng 2 cấu hình chính:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Hyperparameter</th>
        <th>Ký hiệu</th>
        <th>Base Model</th>
        <th>Big Model</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Model dimension</strong></td>
        <td>$d_{model}$</td>
        <td>512</td>
        <td>1024</td>
        <td>Kích thước vector biểu diễn mỗi token</td>
      </tr>
      <tr>
        <td><strong>Số layers</strong></td>
        <td>$N$</td>
        <td>6</td>
        <td>6</td>
        <td>Số encoder/decoder layers giống nhau</td>
      </tr>
      <tr>
        <td><strong>Số attention heads</strong></td>
        <td>$h$</td>
        <td>8</td>
        <td>16</td>
        <td>Số "đầu chú ý" song song</td>
      </tr>
      <tr>
        <td><strong>Key/Value dim</strong></td>
        <td>$d_k = d_v$</td>
        <td>64</td>
        <td>64</td>
        <td>$= d_{model} / h$</td>
      </tr>
      <tr>
        <td><strong>FFN inner dim</strong></td>
        <td>$d_{ff}$</td>
        <td>2048</td>
        <td>4096</td>
        <td>$= 4 \\times d_{model}$ (expansion ratio)</td>
      </tr>
      <tr>
        <td><strong>Total params</strong></td>
        <td></td>
        <td>65M</td>
        <td>213M</td>
        <td>Nhỏ so với GPT-3 (175B)!</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Mối quan hệ giữa các chiều</span>
      <p>$d_k = d_v = d_{model} / h = 512 / 8 = 64$. Mỗi head hoạt động trên không gian <strong>nhỏ hơn</strong> (64-dim thay vì 512-dim). Nhưng 8 heads chạy song song rồi concat → vẫn ra 512-dim. Chi phí tính toán <strong>tương đương</strong> 1 single-head full-dimension attention.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: BẢNG SO SÁNH COMPLEXITY
  // ==========================================================
  {
    id: 'ch23_01_05',
    title: '5. So sánh Complexity: RNN vs CNN vs Transformer',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Bảng so sánh Complexity — Tại sao Transformer thắng?</h2>

  <p>Bảng này trích từ Table 1 paper gốc — tổng hợp 3 tiêu chí quan trọng nhất:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Layer Type</th>
        <th>Complexity / Layer</th>
        <th>Sequential Ops</th>
        <th>Max Path Length</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Self-Attention</strong></td>
        <td>$O(T^2 \\cdot d)$</td>
        <td>$O(1)$</td>
        <td>$O(1)$</td>
      </tr>
      <tr>
        <td><strong>RNN (Recurrent)</strong></td>
        <td>$O(T \\cdot d^2)$</td>
        <td>$O(T)$</td>
        <td>$O(T)$</td>
      </tr>
      <tr>
        <td><strong>CNN (Convolutional)</strong></td>
        <td>$O(k \\cdot T \\cdot d^2)$</td>
        <td>$O(1)$</td>
        <td>$O(\\log_k(T))$</td>
      </tr>
      <tr>
        <td><strong>Restricted SA</strong></td>
        <td>$O(r \\cdot T \\cdot d)$</td>
        <td>$O(1)$</td>
        <td>$O(T/r)$</td>
      </tr>
    </tbody>
  </table>

  <div class="definition-block">
    <span class="definition-term">Giải thích 3 tiêu chí</span>
    <p><strong>Complexity per Layer:</strong> Tổng số phép tính. Self-Attention: $T^2 \\cdot d$ (mỗi cặp token × chiều d). RNN: $T \\cdot d^2$ (T bước × nhân ma trận $d \\times d$).</p>
    <p><strong>Sequential Operations:</strong> Số bước <strong>không thể song song</strong>. RNN = $O(T)$ (phải chờ). Self-Attention = $O(1)$ (tất cả song song).</p>
    <p><strong>Max Path Length:</strong> Số bước tối đa để thông tin đi từ token A → token B. RNN = $O(T)$. Self-Attention = $O(1)$ (kết nối trực tiếp).</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Khi nào Self-Attention rẻ hơn RNN?</span>
      <p>Self-Attention: $O(T^2 \\cdot d)$. RNN: $O(T \\cdot d^2)$. Self-Attention rẻ hơn khi $T < d$. Với $d_{model} = 512$, Self-Attention rẻ hơn khi chuỗi <strong>ngắn hơn 512 tokens</strong> — đúng cho hầu hết bài NLP thời điểm 2017. Với chuỗi siêu dài (T >> d), cần Efficient Attention (Bài 23.7).</p>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 23.1</h3>
    <ul>
      <li><strong>RNN có 3 hạn chế:</strong> tuần tự (không song song), long-range khó, Attention trên RNN vẫn bị bottleneck</li>
      <li><strong>Ý tưởng Transformer:</strong> chỉ dùng Self-Attention, loại bỏ recurrence → song song hóa hoàn toàn</li>
      <li><strong>Kiến trúc:</strong> Encoder (N layers: SA + FFN + Add&Norm) + Decoder (N layers: Masked SA + Cross-Attn + FFN + Add&Norm)</li>
      <li><strong>Paper gốc:</strong> $d_{model}=512$, $N=6$, $h=8$, $d_{ff}=2048$, 65M params</li>
      <li><strong>Complexity:</strong> Self-Attention $O(T^2 d)$ nhưng $O(1)$ sequential — <strong>song song hoàn toàn</strong></li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch23_01: Chapter = {
  id: 'ch23_01',
  title: '23.1. Tại Sao "Attention Is All You Need"?',
  introduction: 'Hạn chế của RNN, ý tưởng loại bỏ recurrence, tổng quan kiến trúc Transformer, hyperparameters, bảng so sánh complexity.',
  lessons: ch23_01_lessons,
};

export default ch23_01;
