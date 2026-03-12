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

  <h4>Ví dụ cụ thể về Timeline</h4>

  <p>Giả sử xử lý 1 token mất 1ms trên GPU:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Độ dài câu</th>
        <th>Thời gian RNN</th>
        <th>Thời gian Transformer</th>
        <th>Tốc độ nhanh hơn</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>64 tokens</td>
        <td>64ms</td>
        <td>~1ms</td>
        <td>64x</td>
      </tr>
      <tr>
        <td>256 tokens</td>
        <td>256ms</td>
        <td>~1ms</td>
        <td>256x</td>
      </tr>
      <tr>
        <td>512 tokens</td>
        <td>512ms</td>
        <td>~1ms</td>
        <td>512x</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Lưu ý về thực tế</span>
      <p>Trong thực tế, Transformer vẫn cần ~O(T) cho cross-attention trong decoder, nhưng encoder xử lý <strong>hoàn toàn song song</strong>. Đây là lý do Transformer training nhanh hơn RNN gấp <strong>10-100 lần</strong>.</p>
    </div>
  </div>

  <h4>So sánh GPU Utilization</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Kiến trúc</th>
        <th>Sequential Operations</th>
        <th>GPU Utilization</th>
        <th>Khả năng song song</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>RNN/LSTM/GRU</strong></td>
        <td>O(T)</td>
        <td>Thấp (dùng 1 core)</td>
        <td>Không</td>
      </tr>
      <tr>
        <td><strong>CNN</strong></td>
        <td>O(1)</td>
        <td>Trung bình</td>
        <td>Có (log T layers)</td>
      </tr>
      <tr>
        <td><strong>Transformer</strong></td>
        <td>O(1)</td>
        <td>Cao (dùng toàn bộ GPU)</td>
        <td>Hoàn toàn</td>
      </tr>
    </tbody>
  </table>

  <h3>1.2. Vấn đề 2: Long-range dependency vẫn khó</h3>

  <p>Từ <strong>Vấn đề 1</strong>, ta thấy RNN xử lý tuần tự. Nhưng vấn đề còn nghiêm trọng hơn: ngay cả khi xử lý xong, thông tin từ đầu câu phải "đi" qua rất nhiều bước để đến cuối câu.</p>

  <div class="image-showcase">
    <img src="/images/ch23/gradient_vanishing.png" alt="Gradient Vanishing trong RNN" />
    <div class="image-caption">Gradient magnitude giảm theo cấp số nhân qua các bước thời gian</div>
  </div>

  <div class="definition-block">
    <span class="definition-term">Long-range dependency là gì?</span>
    <p>Trong ngôn ngữ, từ ở vị trí đầu thường có quan hệ ngữ pháp với từ ở cuối câu. Ví dụ: <em>"Chị [subject] gửi cho em [indirect object] một lá thư [direct object] từ lâu rồi [temporal]."</em> — để hiểu "gửi", model cần nhớ cả "chị" lẫn "một lá thư", dù chúng cách nhau nhiều từ.</p>
  </div>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">LSTM/GRU cải thiện nhưng không giải quyết triệt để</span>
      <p>Token $x_1$ và $x_{100}$ phải truyền thông tin qua <strong>100 bước RNN</strong>. Dù LSTM có cell state highway, gradient vẫn phải đi qua 100 gate operations. Trong thực tế, LSTM chỉ hiệu quả với khoảng cách <strong>~200-300 tokens</strong>.</p>
    </div>
  </div>

  <h4>Tại sao gradient vanishing là vấn đề?</h4>

  <p>Trong quá trình backpropagation qua thời gian (BPTT), gradient nhân ma trận liên tục với mỗi bước. Với RNN vanilla:</p>

  <ul>
    <li>Đạo hàm từ $h_t$ về $h_{t-k}$:</li>
  </ul>

  <div class="formula-block">
    <p>$\frac{\partial h_t}{\partial h_{t-k}} = \prod_{i=t-k}^{t-1} \frac{\partial h_{i+1}}{\partial h_i}$</p>
  </div>

  <ul>
    <li>Nếu $\|W\| < 1$: $W^k \to 0$ khi $k \to \infty$ → <strong>vanishing gradient</strong></li>
    <li>Nếu $\|W\| > 1$: $W^k \to \infty$ khi $k \to \infty$ → <strong>exploding gradient</strong></li>
  </ul>

  <p>Ví dụ: với $T=100$ bước và $\|W\| = 0.9$:</p>

  <div class="formula-block">
    <p>$\|\frac{\partial h_{100}}{\partial h_1}\| \approx \|W\|^{99} \approx 0.9^{99} \approx 0.00004$</p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">LSTM giải quyết như thế nào?</span>
      <p>LSTM dùng <strong>cell state</strong> như "đường cao tốc" — gradient có thể đi thẳng từ $C_t$ về $C_{t-1}$ mà không qua activation function. Tuy nhiên, các gate operations (forget, input, output) vẫn cần nhân ma trận, nên vẫn có mất mát thông tin qua mỗi bước.</p>
    </div>
  </div>

  <h4>So sánh effective context length</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Kiến trúc</th>
        <th>Effective context length</th>
        <th>Lý do</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vanilla RNN</strong></td>
        <td>~5-10 tokens</td>
        <td>Vanishing gradient nghiêm trọng</td>
      </tr>
      <tr>
        <td><strong>LSTM/GRU</strong></td>
        <td>~200-300 tokens</td>
        <td>Cell state highway giảm vanishing</td>
      </tr>
      <tr>
        <td><strong>Transformer</strong></td>
        <td>Toàn bộ context</td>
        <td>Direct attention — O(1) path length</td>
      </tr>
    </tbody>
  </table>

  <h3>1.3. Vấn đề 3: Attention trên RNN vẫn bị giới hạn</h3>

  <p>Năm 2014-2015, <strong>Bahdanau Attention</strong> và <strong>Luong Attention</strong> ra đời — cho phép decoder "nhìn lại" toàn bộ encoder states. Đây là bước tiến lớn, nhưng vẫn chưa đủ.</p>

  <div class="definition-block">
    <span class="definition-term">Encoder-Decoder với RNN</span>
    <p>Trong kiến trúc Seq2Seq với Attention:</p>
    <ol>
      <li><strong>Encoder (RNN)</strong>: Xử lý input tuần tự, tạo chuỗi hidden states $h_1, h_2, ..., h_T$</li>
      <li><strong>Attention</strong>: Tại mỗi bước decode, decoder tính attention weights để "chọn" encoder states quan trọng</li>
      <li><strong>Decoder (RNN)</strong>: Dùng context vector + hidden state để sinh token</li>
    </ol>
  </div>

  <h4>Công thức Attention (Bahdanau)</h4>

  <p><strong>Bước 1: Tính energy score</strong></p>

  <div class="formula-block">
    <p>$e_{ti} = a(s_{t-1}, h_i)$</p>
  </div>

  <p>trong đó $s_{t-1}$ là decoder state, $h_i$ là encoder state, và $a$ là alignment model (thường là feed-forward network).</p>

  <p><strong>Bước 2: Tính attention weights (softmax)</strong></p>

  <div class="formula-block">
    <p>$\alpha_{ti} = \frac{\exp(e_{ti})}{\sum_{j=1}^{T} \exp(e_{tj})}$</p>
  </div>

  <p><strong>Bước 3: Tính context vector</strong></p>

  <div class="formula-block">
    <p>$c_t = \sum_{i=1}^{T} \alpha_{ti} h_i$</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch23/rnn_encoder_decoder_attention.png" alt="Encoder-Decoder với RNN + Attention" />
    <div class="image-caption">Encoder vẫn xử lý tuần tự → Bottleneck</div>
  </div>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Vấn đề cốt lõi</span>
      <p>Attention giúp decoder nhìn lại encoder — nhưng <strong>encoder vẫn là RNN</strong>. Encoder vẫn xử lý tuần tự từng token, vẫn bị sequential bottleneck như Vấn đề 1. Attention chỉ là "lớp phủ" bên ngoài — lõi bên trong vẫn chậm.</p>
    </div>
  </div>

  <h4>Tại sao Attention không giải quyết triệt để?</h4>

  <p>Attention trên RNN có 3 hạn chế:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>1. Encoder vẫn tuần tự</h4>
      <p>Để tính $h_{100}$, RNN cần $h_{99}$... cần $h_1$. Không thể song song hóa.</p>
    </div>
    <div class="concept-card">
      <h4>2. Attention là "optional add-on"</h4>
      <p>Attention được thêm vào sau RNN, không thay thế cơ chế recurrence. Không có "attention-only" model.</p>
    </div>
    <div class="concept-card">
      <h4>3. Tính attention cho mỗi decoder step</h4>
      <p>Decoder vẫn phải sinh từng token một. Attention chỉ giúp chọn context, không giúp song song hóa.</p>
    </div>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Kết luận: Cần một paradigm mới</span>
      <p>Nếu đã dùng Attention để "nhìn toàn bộ sequence", tại sao không dùng Attention cho <strong>mọi thứ</strong>? Loại bỏ hoàn toàn recurrence, thay bằng Self-Attention — đó chính là <strong>Transformer</strong>.</p>
    </div>
  </div>
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

  <h4>Công thức Self-Attention</h4>

  <p>Self-Attention tính toán 3 vectors cho mỗi token: <strong>Query (Q)</strong>, <strong>Key (K)</strong>, <strong>Value (V)</strong>:</p>

  <div class="formula-block">
    <p>$Q = X W_Q,\quad K = X W_K,\quad V = X W_V$</p>
  </div>

  <p>trong đó $X \in \mathbb{R}^{T \times d_{model}}$ là input embeddings, và $W_Q, W_K, W_V \in \mathbb{R}^{d_{model} \times d_k}$ là các ma trận có thể học.</p>

  <p><strong>Attention output:</strong></p>

  <div class="formula-block">
    <p>$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{Q K^T}{\sqrt{d_k}}\right) V$</p>
  </div>

  <h4>Multi-Head Attention</h4>

  <p>Thay vì 1 attention, dùng h heads song song, sau đó concat:</p>

  <div class="formula-block">
    <p>$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, ..., \text{head}_h) W^O$</p>
  </div>

  <p>trong đó $\text{head}_i = \text{Attention}(Q W_i^Q, K W_i^K, V W_i^V)$</p>

  <div class="definition-block">
    <span class="definition-term">Tại sao cần Multi-Head?</span>
    <p>1 head chỉ học được 1 loại relationship. Multiple heads cho phép model học nhiều types of relationships đồng thời: syntax, semantics, position, etc.</p>
  </div>

  <h4>Positional Encoding</h4>

  <p>Transformer không có recurrence → cần cách encode vị trí. Paper dùng sin/cos:</p>

  <div class="formula-block">
    <p>$PE_{(pos, 2i)} = \sin(pos / 10000^{2i/d_{model}})$</p>
    <p>$PE_{(pos, 2i+1)} = \cos(pos / 10000^{2i/d_{model}})$</p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tại sao chia cho $\sqrt{d_k}$?</span>
      <p>Khi $d_k$ lớn, tích $Q K^T$ có thể rất lớn, làm softmax saturate (gradient nhỏ). Chia cho $\sqrt{d_k}$ giữ giá trị trong khoảng hợp lý, ổn định training.</p>
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

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Decoder: Masked Self-Attention</span>
      <p>Trong decoder, ta dùng <strong>masked attention</strong> để đảm bảo position i chỉ attend các positions < i (không nhìn thấy tương lai). Điều này tạo ra tính <strong>autoregressive</strong>: sinh token từ trái sang phải, mỗi token chỉ dựa vào các tokens đã sinh.</p>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">Cross-Attention là gì?</span>
    <p>Cross-Attention: Query từ decoder, Key và Value từ encoder output. Cho phép decoder "nhìn" toàn bộ input khi sinh từng token output. Khác với self-attention (Q, K, V cùng nguồn), cross-attention (Q khác nguồn với K, V).</p>
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

  <h4>Feed-Forward Network (FFN)</h4>

  <p>Mỗi layer có một Feed-Forward Network:</p>

  <div class="formula-block">
    <p>$\text{FFN}(x) = \max(0, x W_1 + b_1) W_2 + b_2$</p>
  </div>

  <p>với $W_1 \in \mathbb{R}^{d_{model} \times d_{ff}}$ và $W_2 \in \mathbb{R}^{d_{ff} \times d_{model}}$. Thông thường $d_{ff} = 4 \times d_{model}$.</p>

  <div class="definition-block">
    <span class="definition-term">Tại sao cần FFN?</span>
    <p>Attention cho phép tất cả tokens "nhìn" nhau, nhưng không có phép phi tuyến để học các patterns phức tạp. FFN thêm <strong>non-linearity</strong> và tăng khả năng biểu diễn.</p>
  </div>

  <h4>Add & Norm (Residual + LayerNorm)</h4>

  <p>Mỗi sub-layer có residual connection và LayerNorm:</p>

  <div class="formula-block">
    <p>$\text{Output} = \text{LayerNorm}(x + \text{Sublayer}(x))$</p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Residual Connection</h4>
      <p>Cho phép gradient flow trực tiếp qua network, tránh vanishing gradient khi network sâu.</p>
    </div>
    <div class="concept-card">
      <h4>LayerNorm</h4>
      <p>Normalize theo feature dimension: $\frac{x - \mu}{\sqrt{\sigma^2 + \epsilon}}$. Ổn định training, giảm dependence vào scale.</p>
    </div>
  </div>

  <h4>Dropout</h4>

  <p>Áp dụng dropout với tỷ lệ $P=0.1$ ở:</p>
  <ul>
    <li>Đầu ra của mỗi sub-layer trước khi cộng residual</li>
    <li>Positional embeddings</li>
  </ul>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tổng kết 1 Encoder Layer</span>
      <p><strong>Input</strong> → Self-Attention → Add & Norm → FFN → Add & Norm → <strong>Output</strong></p>
    </div>
  </div>
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

  <h4>Chi tiết Training</h4>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tham số</th>
        <th>Giá trị</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Optimizer</strong></td>
        <td>Adam</td>
        <td>Adaptive learning rate</td>
      </tr>
      <tr>
        <td><strong>Learning rate</strong></td>
        <td>$d_{model}^{-0.5}$</td>
        <td>Base lr × warmup_steps⁻⁰·⁵</td>
      </tr>
      <tr>
        <td><strong>Warmup steps</strong></td>
        <td>4000</td>
        <td>Tăng dần lr từ 0</td>
      </tr>
      <tr>
        <td><strong>Label smoothing</strong></td>
        <td>0.1</td>
        <td>Giảm overconfidence</td>
      </tr>
      <tr>
        <td><strong>Dropout</strong></td>
        <td>0.1</td>
        <td>Regularization</td>
      </tr>
    </tbody>
  </table>

  <div class="definition-block">
    <span class="definition-term">Warmup Strategy</span>
    <p>Learning rate tăng tuyến tính trong <strong>warmup steps</strong> đầu, sau đó giảm theo công thức:</p>
    <div class="formula-block">
      <p>$\text{lr} = d_{model}^{-0.5} \cdot \min(step^{-0.5}, step \cdot warmup^{-1.5})$</p>
    </div>
    <p>Warmup giúp model ổn định trong giai đoạn đầu khi weights chưa quen.</p>
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
