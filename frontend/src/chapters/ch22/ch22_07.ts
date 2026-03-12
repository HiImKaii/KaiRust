import { Lesson, Chapter } from '../../courses';

const ch22_07_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: VẤN ĐỀ INFORMATION BOTTLENECK
  // ==========================================================
  {
    id: 'ch22_07_01',
    title: '1. Information Bottleneck — Nút cổ chai của Seq2Seq',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Information Bottleneck — Tại sao Seq2Seq thất bại với chuỗi dài?</h2>

  <p>Ở bài 22.6, ta đã biết Seq2Seq <strong>nén toàn bộ input</strong> vào <strong>1 context vector $c$ duy nhất</strong>. Bài này phân tích rõ hơn tại sao đây là vấn đề nghiêm trọng, và cách <strong>Attention Mechanism</strong> giải quyết nó.</p>

  <h3>1.1. Phân tích vấn đề</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Seq2Seq truyền thống:</h4>
    <p class="font-mono text-lg">$c = h_T^{\\text{enc}} \\in \\mathbb{R}^{H}$</p>
    <p>Toàn bộ thông tin của chuỗi input $x_1, x_2, ..., x_T$ bị <strong>ép vào vector kích thước cố định H</strong>.</p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Câu ngắn (5-10 từ)</h4>
      <p>$c \\in \\mathbb{R}^{256}$ chứa đủ thông tin của 5-10 từ. BLEU score cao, dịch thuật tốt.</p>
      <p><em>Ví dụ: "I love cats" → $c$ chứa đủ ý nghĩa "tôi yêu mèo".</em></p>
    </div>
    <div class="concept-card">
      <h4>Câu dài (30+ từ)</h4>
      <p>$c \\in \\mathbb{R}^{256}$ <strong>không đủ dung lượng</strong> để nén 30+ từ. Thông tin đầu câu bị "đè" bởi thông tin cuối câu.</p>
      <p><em>Ví dụ: câu 50 từ → $c$ chỉ nhớ tốt ~10 từ cuối.</em></p>
    </div>
  </div>

  <h3>1.2. Bằng chứng thực nghiệm</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Hiệu suất Seq2Seq sụt giảm với câu dài</span>
      <p>Cho et al. (2014) và Sutskever et al. (2014) đều ghi nhận BLEU score <strong>giảm mạnh</strong> khi input dài hơn 20 tokens. Đường BLEU vs sentence length đi xuống rõ rệt sau ngưỡng 20-30 tokens.</p>
      <p>Nguyên nhân gốc rễ: RNN encoder bị <strong>vanishing gradient</strong> — hidden state $h_T$ chủ yếu phản ánh các token gần cuối, "quên" dần các token đầu.</p>
    </div>
  </div>

  <h3>1.3. Ý tưởng giải quyết</h3>

  <div class="definition-block">
    <span class="definition-term">Câu hỏi then chốt</span>
    <p>Thay vì <strong>nén toàn bộ input vào 1 vector</strong> duy nhất, tại sao không cho decoder <strong>"nhìn lại" tất cả hidden states</strong> $(h_1, h_2, ..., h_T)$ của encoder?</p>
    <p>Mỗi bước decode, decoder sẽ tự <strong>"chú ý" (attend)</strong> vào những phần khác nhau của input — giống như người dịch nhìn lại câu gốc khi dịch từng từ.</p>
    <p>Đây chính là ý tưởng cốt lõi của <strong>Attention Mechanism</strong> (Bahdanau et al., 2014).</p>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: CƠ CHẾ ATTENTION — Ý TƯỞNG & CÔNG THỨC
  // ==========================================================
  {
    id: 'ch22_07_02',
    title: '2. Cơ chế Attention — Ý tưởng & Công thức',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Attention Mechanism — Toàn cảnh</h2>

  <p>Attention cho phép decoder <strong>"chú ý" vào các phần khác nhau</strong> của input tại mỗi bước decode. Thay vì 1 context vector cố định $c$, ta có <strong>context vector thay đổi $c_t$</strong> ở mỗi bước $t$.</p>

  <div class="image-showcase">
    <img src="/images/ch22/attention_mechanism.png" alt="Attention Mechanism Architecture" />
    <div class="image-caption">Hình 1: Cơ chế Attention — Decoder chú ý vào các hidden states của Encoder</div>
  </div>

  <h3>2.1. Trực giác — Attention như người dịch</h3>

  <div class="definition-block">
    <span class="definition-term">Ví dụ: Dịch "The cat sat on the mat" → "Con mèo ngồi trên tấm thảm"</span>
    <p>Khi dịch từ "mèo", người dịch <strong>tập trung vào "cat"</strong> trong câu gốc. Khi dịch "ngồi", tập trung vào "sat". <strong>Không cần nhớ cả câu</strong> — chỉ cần "chú ý" đúng phần.</p>
    <p>Attention hoạt động giống hệt: mỗi bước decode, nó tính <strong>trọng số attention $\\alpha$</strong> cho từng hidden state encoder, cao nhất ở phần liên quan nhất.</p>
  </div>

  <h3>2.2. Công thức Attention — 4 bước</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>Tính Alignment Score (điểm tương thích)</h4>
        <p>Tại mỗi bước decode $t$, tính score giữa <strong>decoder hidden state $s_t$</strong> và <strong>mỗi encoder hidden state $h_i$</strong>:</p>
        <p class="font-mono text-lg">$e_{t,i} = \\text{score}(s_{t-1}, h_i)$</p>
        <p>Score cao → $h_i$ liên quan nhiều tới bước decode hiện tại. Có nhiều cách tính score (xem bài 2.3).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>Tính Attention Weights (trọng số chú ý)</h4>
        <p>Chuẩn hóa scores bằng <strong>softmax</strong> → trọng số $\\alpha$ nằm trong $[0, 1]$ và tổng = 1:</p>
        <p class="font-mono text-lg">$\\alpha_{t,i} = \\frac{\\exp(e_{t,i})}{\\sum_{j=1}^{T} \\exp(e_{t,j})}$</p>
        <p>$\\alpha_{t,i}$ = "mức độ chú ý" của decoder bước $t$ vào encoder token $i$.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>Tính Context Vector (vector ngữ cảnh)</h4>
        <p>Weighted sum các encoder hidden states — trung bình có trọng số:</p>
        <p class="font-mono text-lg">$c_t = \\sum_{i=1}^{T} \\alpha_{t,i} \\cdot h_i$</p>
        <p>$c_t$ khác nhau ở mỗi bước decode — đây là khác biệt so với Seq2Seq cũ (chỉ có 1 $c$ cố định).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">④</div>
      <div class="step-content">
        <h4>Sinh Output</h4>
        <p>Kết hợp context vector $c_t$ với decoder state $s_t$:</p>
        <p class="font-mono text-lg">$\\tilde{s}_t = \\tanh(W_c \\cdot [c_t \\; ; \\; s_t])$</p>
        <p class="font-mono text-lg">$P(y_t | y_{<t}, x) = \\text{softmax}(W_o \\cdot \\tilde{s}_t)$</p>
      </div>
    </div>
  </div>

  <h3>2.3. Tổng hợp công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Attention Mechanism — Encoder-Decoder:</h4>
    <p class="font-mono">① $e_{t,i} = \\text{score}(s_{t-1}, h_i)$ &nbsp; <em>← alignment score</em></p>
    <p class="font-mono">② $\\alpha_{t,i} = \\text{softmax}(e_{t,i})$ &nbsp; <em>← attention weights</em></p>
    <p class="font-mono">③ $c_t = \\sum_i \\alpha_{t,i} \\cdot h_i$ &nbsp; <em>← context vector (thay đổi mỗi bước)</em></p>
    <p class="font-mono">④ $\\tilde{s}_t = \\tanh(W_c [c_t ; s_t])$ &nbsp; <em>← attentional hidden state</em></p>
    <p class="font-mono">⑤ $P(y_t) = \\text{softmax}(W_o \\tilde{s}_t)$ &nbsp; <em>← output distribution</em></p>
  </div>

  <h3>2.4. Ví dụ Step-by-Step</h3>

  <div class="definition-block">
    <span class="definition-term">Dịch: "mèo ngồi" (input 2 tokens → encoder 2 states)</span>
    <p><strong>Encoder states:</strong> $h_1$ (mèo), $h_2$ (ngồi)</p>
    <p><strong>Decode bước 1</strong> (sinh "cat"): score($s_0$, $h_1$) = 3.5, score($s_0$, $h_2$) = 1.2</p>
    <p>$\\alpha = \\text{softmax}([3.5, 1.2]) = [0.91, 0.09]$ → chú ý 91% vào "mèo"</p>
    <p>$c_1 = 0.91 \\cdot h_1 + 0.09 \\cdot h_2$ → context vector thiên về "mèo"</p>
    <p><strong>Decode bước 2</strong> (sinh "sat"): score($s_1$, $h_1$) = 0.8, score($s_1$, $h_2$) = 4.1</p>
    <p>$\\alpha = \\text{softmax}([0.8, 4.1]) = [0.04, 0.96]$ → chú ý 96% vào "ngồi"</p>
    <p>$c_2 = 0.04 \\cdot h_1 + 0.96 \\cdot h_2$ → context vector thiên về "ngồi"</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Tại sao Attention giải quyết bottleneck?</span>
      <p>Thay vì nén toàn bộ vào 1 vector $c$ cố định, giờ decoder <strong>truy cập trực tiếp</strong> vào từng $h_i$ qua weighted sum. Câu dài 100 tokens? Decoder vẫn có thể "nhìn lại" $h_1$ khi cần — không còn bị vanishing gradient ngăn cản vì <strong>shortcut connection trực tiếp</strong> từ encoder tới decoder.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: BAHDANAU vs LUONG ATTENTION
  // ==========================================================
  {
    id: 'ch22_07_03',
    title: '3. Bahdanau vs Luong Attention',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Hai trường phái Attention: Bahdanau (2014) vs Luong (2015)</h2>

  <p>Sự khác biệt chính giữa 2 trường phái nằm ở <strong>hàm tính score</strong> và <strong>thời điểm sử dụng attention</strong>. Cả 2 đều tuân theo framework 4 bước ở mục 2.</p>

  <h3>3.1. Score Functions — 3 cách tính điểm tương thích</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tên</th>
        <th>Công thức</th>
        <th>Người đề xuất</th>
        <th>Đặc điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Additive (Concat)</strong></td>
        <td>$\\text{score}(s, h) = v^T \\tanh(W_a[s; h])$</td>
        <td>Bahdanau et al., 2014</td>
        <td>Linh hoạt, nhiều tham số ($W_a, v$)</td>
      </tr>
      <tr>
        <td><strong>Dot Product</strong></td>
        <td>$\\text{score}(s, h) = s^T h$</td>
        <td>Luong et al., 2015</td>
        <td>Nhanh, không tham số. Cần $\\text{dim}(s) = \\text{dim}(h)$</td>
      </tr>
      <tr>
        <td><strong>General</strong></td>
        <td>$\\text{score}(s, h) = s^T W_a h$</td>
        <td>Luong et al., 2015</td>
        <td>Trung gian: 1 ma trận $W_a$ tham số</td>
      </tr>
      <tr>
        <td><strong>Scaled Dot-Product</strong></td>
        <td>$\\text{score}(s, h) = \\frac{s^T h}{\\sqrt{d_k}}$</td>
        <td>Vaswani et al., 2017</td>
        <td>Dot product / $\\sqrt{d_k}$ → ổn định softmax. <strong>Dùng trong Transformer</strong></td>
      </tr>
    </tbody>
  </table>

  <h3>3.2. Bahdanau Attention (Additive Attention)</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Bahdanau et al., "Neural Machine Translation by Jointly Learning to Align and Translate" (2014)</h4>
    <p class="font-mono">$e_{t,i} = v_a^T \\tanh(W_a \\cdot s_{t-1} + U_a \\cdot h_i)$</p>
    <p class="font-mono">$\\alpha_{t,i} = \\text{softmax}(e_{t,i})$</p>
    <p class="font-mono">$c_t = \\sum_i \\alpha_{t,i} \\cdot h_i$</p>
    <p class="font-mono">$s_t = f(s_{t-1}, y_{t-1}, c_t)$ &nbsp; ← <strong>$c_t$ dùng TRƯỚC khi tính $s_t$</strong></p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Đặc điểm Bahdanau</h4>
      <ul>
        <li>Dùng <strong>BiRNN encoder</strong> → $h_i = [\\overrightarrow{h_i}; \\overleftarrow{h_i}]$</li>
        <li>Attention dùng $s_{t-1}$ (state bước trước)</li>
        <li>$c_t$ là <strong>input</strong> cho RNN decoder ở bước $t$</li>
        <li>Có thêm 2 learnable parameters: $W_a, v_a$</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Tại sao gọi "Additive"?</h4>
      <p>Vì score function dùng phép <strong>cộng</strong> 2 thành phần ($W_a s$ <strong>+</strong> $U_a h$) bên trong tanh. Khác với dot product dùng phép nhân.</p>
      <p>Additive attention mạnh hơn khi $\\text{dim}(s) \\neq \\text{dim}(h)$, vì $W_a$ và $U_a$ có thể <strong>project</strong> 2 vector về cùng không gian.</p>
    </div>
  </div>

  <h3>3.3. Luong Attention (Multiplicative Attention)</h3>

  <div class="formula-block my-4 p-4 bg-purple-50 border-purple-300">
    <h4>Luong et al., "Effective Approaches to Attention-based Neural Machine Translation" (2015)</h4>
    <p class="font-mono">$e_{t,i} = s_t^T \\cdot W_a \\cdot h_i$ &nbsp; (hoặc $s_t^T \\cdot h_i$ cho dot product)</p>
    <p class="font-mono">$\\alpha_{t,i} = \\text{softmax}(e_{t,i})$</p>
    <p class="font-mono">$c_t = \\sum_i \\alpha_{t,i} \\cdot h_i$</p>
    <p class="font-mono">$\\tilde{s}_t = \\tanh(W_c[c_t; s_t])$ &nbsp; ← <strong>$c_t$ dùng SAU khi tính $s_t$</strong></p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Đặc điểm Luong</h4>
      <ul>
        <li>Dùng <strong>unidirectional encoder</strong></li>
        <li>Attention dùng $s_t$ (state <strong>hiện tại</strong>, không phải $s_{t-1}$)</li>
        <li>$c_t$ dùng <strong>sau</strong> khi đã tính $s_t$</li>
        <li>Dot product: nhanh hơn, ít tham số</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Global vs Local Attention (Luong)</h4>
      <p><strong>Global:</strong> attend vào <strong>tất cả</strong> encoder states.</p>
      <p><strong>Local:</strong> chỉ attend vào <strong>1 cửa sổ</strong> xung quanh vị trí dự đoán $p_t$. Nhanh hơn cho chuỗi dài.</p>
      <p>$p_t = S \\cdot \\sigma(v_p^T \\tanh(W_p s_t))$, $S$ = chiều dài input.</p>
    </div>
  </div>

  <h3>3.4. So sánh tổng hợp</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Bahdanau (2014)</th>
        <th>Luong (2015)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Score function</strong></td>
        <td>Additive (concat + tanh)</td>
        <td>Dot / General / Concat</td>
      </tr>
      <tr>
        <td><strong>Decoder state dùng</strong></td>
        <td>$s_{t-1}$ (bước trước)</td>
        <td>$s_t$ (bước hiện tại)</td>
      </tr>
      <tr>
        <td><strong>$c_t$ dùng khi nào</strong></td>
        <td>Input cho RNN decoder</td>
        <td>Sau khi tính $s_t$ (concat)</td>
      </tr>
      <tr>
        <td><strong>Encoder</strong></td>
        <td>BiRNN</td>
        <td>Unidirectional (thường)</td>
      </tr>
      <tr>
        <td><strong>Phạm vi attend</strong></td>
        <td>Global (tất cả states)</td>
        <td>Global hoặc Local</td>
      </tr>
      <tr>
        <td><strong>Tốc độ</strong></td>
        <td>Chậm hơn (nhiều params)</td>
        <td>Nhanh hơn (dot product)</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: SELF-ATTENTION — NỀN TẢNG CHO TRANSFORMER
  // ==========================================================
  {
    id: 'ch22_07_04',
    title: '4. Self-Attention — Nền tảng cho Transformer',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Self-Attention — Khi chuỗi "chú ý" vào chính nó</h2>

  <p>Ở mục 2-3, attention hoạt động <strong>giữa encoder và decoder</strong> (cross-attention). Nhưng năm 2017, Vaswani et al. đặt câu hỏi: "Tại sao không cho <strong>chuỗi tự chú ý vào chính nó</strong>?" — và <strong>Self-Attention</strong> ra đời, trở thành nền tảng của kiến trúc <strong>Transformer</strong>.</p>

  <h3>4.1. Cross-Attention vs Self-Attention</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Cross-Attention (Bahdanau/Luong)</th>
        <th>Self-Attention (Transformer)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Query từ đâu?</strong></td>
        <td>Decoder state $s_t$</td>
        <td>Chính chuỗi input $x_i$</td>
      </tr>
      <tr>
        <td><strong>Key/Value từ đâu?</strong></td>
        <td>Encoder states $h_i$</td>
        <td>Cũng chính chuỗi input $x_j$</td>
      </tr>
      <tr>
        <td><strong>Mục đích</strong></td>
        <td>Decoder tìm phần input liên quan</td>
        <td>Mỗi từ tìm các từ liên quan <strong>trong cùng câu</strong></td>
      </tr>
      <tr>
        <td><strong>Ứng dụng</strong></td>
        <td>Seq2Seq + Attention</td>
        <td>Transformer (BERT, GPT)</td>
      </tr>
    </tbody>
  </table>

  <h3>4.2. Query, Key, Value — Trực giác</h3>

  <div class="definition-block">
    <span class="definition-term">Ví dụ: Tìm kiếm trên Google</span>
    <p><strong>Query (Q):</strong> Từ khóa bạn gõ vào thanh tìm kiếm → "điều bạn đang tìm".</p>
    <p><strong>Key (K):</strong> Tiêu đề/tags của mỗi trang web → "nhãn mô tả nội dung".</p>
    <p><strong>Value (V):</strong> Nội dung thực tế của trang web → "thông tin bạn nhận được".</p>
    <p>Quá trình: Query so sánh với tất cả Keys → tìm Keys khớp nhất → trả về Values tương ứng.</p>
  </div>

  <p>Trong Self-Attention, mỗi token trong chuỗi đóng <strong>cả 3 vai trò</strong>. Mỗi từ vừa "hỏi" (Query), vừa "được hỏi" (Key), vừa "cung cấp thông tin" (Value).</p>

  <div class="image-showcase">
    <img src="/images/ch22/self_attention_qkv.png" alt="Self-Attention QKV Concept" />
    <div class="image-caption">Hình 2: Cơ chế Self-Attention với bộ ba Query, Key, Value</div>
  </div>

  <h3>4.3. Công thức Self-Attention</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Bước 1: Tạo Q, K, V từ input</h4>
    <p class="font-mono text-lg">$Q = X \\cdot W_Q$, &nbsp; $K = X \\cdot W_K$, &nbsp; $V = X \\cdot W_V$</p>
    <p>Trong đó $X \\in \\mathbb{R}^{T \\times d}$ (T tokens, d chiều), $W_Q, W_K \\in \\mathbb{R}^{d \\times d_k}$, $W_V \\in \\mathbb{R}^{d \\times d_v}$.</p>

    <h4>Bước 2: Scaled Dot-Product Attention</h4>
    <p class="font-mono text-lg">$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$</p>
  </div>

  <h3>4.4. Tại sao chia $\\sqrt{d_k}$?</h3>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Scaling — ngăn softmax bão hòa</span>
      <p>Khi $d_k$ lớn (ví dụ 512), dot product $q \\cdot k$ có thể rất lớn (do tổng $d_k$ tích) → softmax cho output gần <strong>one-hot</strong> → gradient gần 0 (vanishing).</p>
      <p>Giả sử $q_i, k_i \\sim N(0, 1)$ → $q \\cdot k = \\sum_{i=1}^{d_k} q_i k_i$ có $\\text{Var} = d_k$. Chia $\\sqrt{d_k}$ đưa variance về 1 → softmax hoạt động trong vùng gradient tốt.</p>
    </div>
  </div>

  <h3>4.5. Ví dụ Self-Attention</h3>

  <div class="definition-block">
    <span class="definition-term">Câu: "Con mèo ngồi trên thảm"</span>
    <p>Khi xử lý từ <strong>"ngồi"</strong>:</p>
    <ul>
      <li>Query("ngồi") so sánh với Key("Con"), Key("mèo"), Key("ngồi"), Key("trên"), Key("thảm")</li>
      <li>Score cao nhất với Key("mèo") → <strong>ai</strong> ngồi? → mèo!</li>
      <li>Score cao thứ 2 với Key("thảm") → ngồi <strong>ở đâu</strong>? → thảm!</li>
    </ul>
    <p>Self-Attention học được <strong>quan hệ ngữ nghĩa</strong> giữa các từ trong câu mà không cần xử lý tuần tự.</p>
  </div>

  <h3>4.6. Multi-Head Attention</h3>

  <div class="formula-block my-4 p-4 bg-purple-50 border-purple-300">
    <h4>Nhiều "đầu" chú ý song song:</h4>
    <p class="font-mono">$\\text{head}_i = \\text{Attention}(QW_i^Q, KW_i^K, VW_i^V)$</p>
    <p class="font-mono">$\\text{MultiHead}(Q, K, V) = \\text{Concat}(\\text{head}_1, ..., \\text{head}_h) \\cdot W^O$</p>
    <p>Mỗi head học 1 loại quan hệ khác nhau: head 1 có thể học <strong>chủ-vị</strong>, head 2 học <strong>bổ-động</strong>, head 3 học <strong>tính-danh</strong>...</p>
    <p>Thông thường: $h = 8$ heads, $d_k = d_{\\text{model}} / h = 512 / 8 = 64$.</p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Self-Attention vs RNN — Sự thay đổi paradigm</span>
      <p><strong>RNN:</strong> xử lý <strong>tuần tự</strong> (sequential) → $O(T)$ bước, không song song hóa được. Token xa nhau phải đi qua nhiều bước → vanishing gradient.</p>
      <p><strong>Self-Attention:</strong> tất cả cặp (i, j) được tính <strong>song song</strong> → $O(1)$ bước "khoảng cách". Nhưng chi phí $O(T^2)$ bộ nhớ (mỗi token attend mọi token khác).</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: TỔNG KẾT & DẪN SANG TRANSFORMER
  // ==========================================================
  {
    id: 'ch22_07_05',
    title: '5. Tổng kết & Hành trình tới Transformer',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Tổng kết — Từ Attention đến Transformer</h2>

  <h3>5.1. Dòng thời gian phát triển</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Năm</th>
        <th>Mốc</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>2014</strong></td>
        <td>Seq2Seq (Sutskever)</td>
        <td>Encoder-Decoder cơ bản, context vector cố định</td>
      </tr>
      <tr>
        <td><strong>2014</strong></td>
        <td>Bahdanau Attention</td>
        <td>Additive attention — decoder "nhìn lại" encoder</td>
      </tr>
      <tr>
        <td><strong>2015</strong></td>
        <td>Luong Attention</td>
        <td>Dot-product attention — hiệu quả hơn</td>
      </tr>
      <tr>
        <td><strong>2017</strong></td>
        <td><strong>"Attention Is All You Need"</strong></td>
        <td>Self-Attention + bỏ RNN hoàn toàn = <strong>Transformer</strong></td>
      </tr>
      <tr>
        <td><strong>2018+</strong></td>
        <td>BERT, GPT, T5...</td>
        <td>Thay thế RNN toàn diện trong NLP</td>
      </tr>
    </tbody>
  </table>

  <h3>5.2. RNN + Attention vs Transformer</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>RNN + Attention</th>
        <th>Transformer (Self-Attention only)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Xử lý chuỗi</strong></td>
        <td>Tuần tự (sequential)</td>
        <td>Song song (parallel)</td>
      </tr>
      <tr>
        <td><strong>Tốc độ train</strong></td>
        <td>Chậm — phải chờ token trước</td>
        <td>Nhanh — GPU tính song song</td>
      </tr>
      <tr>
        <td><strong>Long-range dependency</strong></td>
        <td>Attention cải thiện, nhưng RNN vẫn là backbone</td>
        <td>Self-Attention kết nối trực tiếp mọi cặp token</td>
      </tr>
      <tr>
        <td><strong>Bộ nhớ</strong></td>
        <td>$O(T)$</td>
        <td>$O(T^2)$ — vấn đề với chuỗi siêu dài</td>
      </tr>
      <tr>
        <td><strong>Vị trí trong chuỗi</strong></td>
        <td>RNN tự biết qua hidden state tuần tự</td>
        <td>Cần thêm <strong>Positional Encoding</strong></td>
      </tr>
      <tr>
        <td><strong>Trạng thái hiện tại (2024+)</strong></td>
        <td>Ít dùng — thay bằng Transformer</td>
        <td>Tiêu chuẩn cho NLP, Vision, Audio...</td>
      </tr>
    </tbody>
  </table>

  <h3>5.3. RNN có còn dùng không?</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>RNN vẫn có chỗ</h4>
      <ul>
        <li><strong>Edge devices</strong> (IoT, mobile) — ít bộ nhớ ($O(T)$ vs $O(T^2)$)</li>
        <li><strong>Streaming data</strong> — xử lý real-time, không cần toàn bộ sequence</li>
        <li><strong>Chuỗi siêu dài</strong> — Transformer $O(T^2)$ quá tốn</li>
        <li><strong>State Space Models</strong> (Mamba, S4) — lai giữa RNN và Transformer</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>Transformer thắng thế</h4>
      <ul>
        <li><strong>NLP:</strong> BERT, GPT, T5, LLaMA — hoàn toàn thay RNN</li>
        <li><strong>Computer Vision:</strong> ViT (Vision Transformer)</li>
        <li><strong>Audio:</strong> Whisper (speech-to-text)</li>
        <li><strong>Multi-modal:</strong> GPT-4, Gemini — text + image + audio</li>
      </ul>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 22.7 — Attention Mechanism</h3>
    <ul>
      <li><strong>Information Bottleneck:</strong> Seq2Seq nén toàn bộ input vào 1 vector $c$ cố định → mất thông tin chuỗi dài</li>
      <li><strong>Attention:</strong> Decoder "nhìn lại" tất cả encoder states qua weighted sum. Context vector $c_t$ <strong>thay đổi mỗi bước decode</strong></li>
      <li><strong>4 bước:</strong> Score → Softmax (weights) → Weighted Sum (context) → Output</li>
      <li><strong>Bahdanau (2014):</strong> Additive attention, dùng $s_{t-1}$, BiRNN encoder</li>
      <li><strong>Luong (2015):</strong> Dot-product attention, dùng $s_t$, nhanh hơn</li>
      <li><strong>Self-Attention:</strong> Chuỗi attend vào chính nó (Q, K, V từ cùng input). Scaled dot-product. Multi-Head cho phép học nhiều loại quan hệ</li>
      <li><strong>"Attention Is All You Need" (2017):</strong> Bỏ hoàn toàn RNN → Transformer — thay đổi toàn bộ lĩnh vực AI</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Hành trình hoàn chỉnh</span>
      <p>Perceptron → FNN → RNN → LSTM/GRU → Seq2Seq → <strong>Attention</strong> → <strong>Transformer</strong>. Chương 22 đã đưa bạn từ RNN cơ bản tới ngưỡng cửa Transformer. Mỗi bước phát triển đều giải quyết <strong>hạn chế cụ thể</strong> của mô hình trước đó — vanishing gradient → gating → bottleneck → attention → parallelism.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_07: Chapter = {
  id: 'ch22_07',
  title: '22.7. Attention Mechanism',
  introduction: 'Information Bottleneck, Bahdanau & Luong Attention, Self-Attention, Query-Key-Value, Multi-Head Attention — nền tảng dẫn tới Transformer.',
  lessons: ch22_07_lessons,
};

export default ch22_07;
