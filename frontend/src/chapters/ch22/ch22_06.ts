import { Lesson, Chapter } from '../../courses';

const ch22_06_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: BIDIRECTIONAL RNN
  // ==========================================================
  {
    id: 'ch22_06_01',
    title: '1. Bidirectional RNN — Đọc cả 2 chiều',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Bidirectional RNN (BiRNN)</h2>

  <p>RNN thông thường chỉ đọc chuỗi từ <strong>trái → phải</strong> (forward). Nhưng trong nhiều bài toán NLP, ngữ cảnh từ <strong>cả trước lẫn sau</strong> đều quan trọng. <strong>Bidirectional RNN</strong> (Schuster & Paliwal, 1997) giải quyết vấn đề này bằng cách chạy <strong>2 RNN song song</strong>: 1 forward + 1 backward.</p>

  <h3>1.1. Ví dụ: Tại sao cần ngữ cảnh 2 chiều?</h3>

  <div class="definition-block">
    <span class="definition-term">Ví dụ: Điền từ còn thiếu</span>
    <p>Câu: <em>"Tôi ăn ___ rất ngon"</em></p>
    <ul>
      <li><strong>Chỉ forward</strong> (nhìn "Tôi ăn"): có thể đoán "cơm", "phở", "bánh"... — nhiều khả năng</li>
      <li><strong>Chỉ backward</strong> (nhìn "rất ngon"): biết đó là thứ ăn được và ngon — vẫn mơ hồ</li>
      <li><strong>Cả 2 chiều</strong> ("Tôi ăn" + "rất ngon"): kết hợp → dự đoán chính xác hơn</li>
    </ul>
  </div>

  <div class="image-showcase">
    <img src="/images/ch22/bidirectional_rnn.png" alt="Bidirectional RNN Architecture" />
    <div class="image-caption">Hình 1: Kiến trúc Bidirectional RNN — Forward và Backward layers</div>
  </div>

  <h3>1.2. Kiến trúc</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Công thức BiRNN:</h4>
    <p class="font-mono text-lg">$\\overrightarrow{h_t} = f(W_{\\rightarrow} \\cdot [\\overrightarrow{h_{t-1}}, x_t] + b_{\\rightarrow})$ &nbsp; <em>← Forward</em></p>
    <p class="font-mono text-lg">$\\overleftarrow{h_t} = f(W_{\\leftarrow} \\cdot [\\overleftarrow{h_{t+1}}, x_t] + b_{\\leftarrow})$ &nbsp; <em>← Backward</em></p>
    <p class="font-mono text-lg">$h_t = [\\overrightarrow{h_t} \\; ; \\; \\overleftarrow{h_t}]$ &nbsp; <em>← Concatenation</em></p>
    <p>Output tại mỗi bước = concat 2 hidden states → vector kích thước <strong>2H</strong>.</p>
  </div>

  <h3>1.3. Đặc điểm</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Unidirectional RNN</th>
        <th>Bidirectional RNN</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Ngữ cảnh</strong></td>
        <td>Chỉ quá khứ (trái → phải)</td>
        <td>Cả quá khứ lẫn tương lai</td>
      </tr>
      <tr>
        <td><strong>Output dim</strong></td>
        <td>H</td>
        <td>2H (concat forward + backward)</td>
      </tr>
      <tr>
        <td><strong>Params</strong></td>
        <td>1 bộ weights</td>
        <td>2 bộ weights (gấp đôi)</td>
      </tr>
      <tr>
        <td><strong>Có dùng real-time?</strong></td>
        <td>Được — chỉ cần quá khứ</td>
        <td>Không — cần toàn bộ chuỗi trước</td>
      </tr>
      <tr>
        <td><strong>Ứng dụng</strong></td>
        <td>Language model, generation</td>
        <td>NER, POS tagging, sentiment, BERT</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">BiRNN KHÔNG dùng cho Language Modeling</span>
      <p>Language modeling dự đoán từ tiếp theo $P(w_t | w_1...w_{t-1})$ — chỉ dùng quá khứ. BiRNN "nhìn" cả tương lai → <strong>gian lận</strong>. BiRNN chỉ dùng khi ta có <strong>toàn bộ chuỗi</strong> trước khi xử lý (ví dụ: phân loại câu, gán nhãn, dịch — encoder side).</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: DEEP/STACKED RNN
  // ==========================================================
  {
    id: 'ch22_06_02',
    title: '2. Deep/Stacked RNN — Xếp chồng layers',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Deep RNN (Stacked RNN) — Nhiều tầng chồng nhau</h2>

  <p>Tương tự Deep CNN có nhiều convolutional layers, <strong>Stacked RNN</strong> xếp chồng nhiều lớp RNN. Output $h_t$ của layer dưới trở thành input $x_t$ của layer trên.</p>

  <h3>2.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Stacked RNN với L layers:</h4>
    <p class="font-mono text-lg">$h_t^{(1)} = f(W^{(1)} \\cdot [h_{t-1}^{(1)}, x_t] + b^{(1)})$ &nbsp; <em>← Layer 1</em></p>
    <p class="font-mono text-lg">$h_t^{(l)} = f(W^{(l)} \\cdot [h_{t-1}^{(l)}, h_t^{(l-1)}] + b^{(l)})$ &nbsp; <em>← Layer l (l > 1)</em></p>
    <p>Mỗi layer có bộ weights <strong>riêng biệt</strong>. Output cuối cùng: $h_t^{(L)}$.</p>
  </div>

  <h3>2.2. Mỗi layer học gì?</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Layer thấp (1-2)</h4>
      <p>Học các <strong>pattern cục bộ, ngữ pháp cơ bản</strong>: danh từ, động từ, cụm từ ngắn, n-gram patterns.</p>
      <p>Ví dụ text: nhận diện "New York" là cụm danh từ riêng.</p>
    </div>
    <div class="concept-card">
      <h4>Layer cao (3-4+)</h4>
      <p>Học <strong>ngữ nghĩa, quan hệ trừu tượng</strong>: chủ đề đoạn văn, sentiment tổng thể, quan hệ nhân-quả xa.</p>
      <p>Ví dụ text: hiểu cả đoạn nói về "phàn nàn dịch vụ" → sentiment tiêu cực.</p>
    </div>
  </div>

  <h3>2.3. Khuyến cáo thực tế</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Số layers</th>
        <th>Ứng dụng</th>
        <th>Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td>Baseline, bài toán đơn giản</td>
        <td>Đủ cho sentiment, POS tagging đơn giản</td>
      </tr>
      <tr>
        <td><strong>2-3</strong></td>
        <td>Phổ biến nhất trong thực tế</td>
        <td>Machine translation, speech recognition</td>
      </tr>
      <tr>
        <td><strong>4-8</strong></td>
        <td>Google NMT (2016), speech</td>
        <td>Cần Residual Connection + Dropout giữa các layers</td>
      </tr>
      <tr>
        <td><strong>>8</strong></td>
        <td>Hiếm khi dùng cho RNN</td>
        <td>RNN sâu quá → vanishing gradient trầm trọng hơn, dùng Transformer thay thế</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Residual Connection cho Deep RNN</span>
      <p>Khi xếp >2 layers, cần thêm <strong>skip connection</strong>: $h_t^{(l)} = f(...) + h_t^{(l-1)}$. Tương tự ResNet trong CNN, kỹ thuật này giúp gradient chảy qua các layers sâu mà không vanish. Đây là lý do Google NMT dùng được 8 layers LSTM.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: SEQ2SEQ ENCODER-DECODER
  // ==========================================================
  {
    id: 'ch22_06_03',
    title: '3. Encoder-Decoder (Seq2Seq)',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Seq2Seq: Encoder-Decoder Architecture</h2>

  <p>Kiến trúc <strong>Sequence-to-Sequence</strong> (Sutskever et al., 2014; Cho et al., 2014) là nền tảng cho các bài toán <strong>input và output có độ dài khác nhau</strong>: dịch máy, tóm tắt, chatbot, text-to-code.</p>

  <h3>3.1. Kiến trúc 2 phần</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Encoder</h4>
      <p>RNN đọc toàn bộ chuỗi input $x_1, x_2, ..., x_T$. Hidden state cuối cùng $h_T$ (hoặc concat multiple layers) trở thành <strong>context vector $c$</strong>.</p>
      <p>$c$ = "bản tóm tắt" toàn bộ input trong 1 vector cố định.</p>
    </div>
    <div class="concept-card">
      <h4>Decoder</h4>
      <p>RNN khác, nhận $c$ làm hidden state ban đầu ($h_0^{\\text{dec}} = c$). Sinh output $y_1, y_2, ..., y_{T'}$ lần lượt. Mỗi bước: input = token vừa sinh ra (hoặc ground truth khi train).</p>
      <p>Dừng khi sinh ra token đặc biệt &lt;EOS&gt; (End of Sequence).</p>
    </div>
  </div>

  <h3>3.2. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Encoder:</h4>
    <p class="font-mono text-lg">$h_t^{\\text{enc}} = \\text{LSTM}(x_t, h_{t-1}^{\\text{enc}})$, &nbsp; $c = h_T^{\\text{enc}}$</p>
    <h4>Decoder:</h4>
    <p class="font-mono text-lg">$h_t^{\\text{dec}} = \\text{LSTM}(y_{t-1}, h_{t-1}^{\\text{dec}})$, &nbsp; $h_0^{\\text{dec}} = c$</p>
    <p class="font-mono text-lg">$P(y_t | y_{<t}, c) = \\text{softmax}(W_o \\cdot h_t^{\\text{dec}} + b_o)$</p>
  </div>

  <h3>3.3. Bottleneck Problem — Nút cổ chai</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Context vector $c$ là nút cổ chai</span>
      <p>Toàn bộ input (dù dài 100+ tokens) bị <strong>nén vào 1 vector cố định</strong> kích thước H. Thông tin bị mất đáng kể khi input dài. Ví dụ: $c \\in \\mathbb{R}^{256}$ phải chứa ý nghĩa toàn bộ câu 50 từ → không đủ dung lượng.</p>
      <p>Đây chính là lý do <strong>Attention Mechanism</strong> (Bài 22.7) được phát minh — cho phép decoder "nhìn lại" tất cả hidden states của encoder thay vì chỉ 1 vector $c$.</p>
    </div>
  </div>

  <h3>3.4. Ứng dụng Seq2Seq</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bài toán</th>
        <th>Input</th>
        <th>Output</th>
        <th>Đặc điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Machine Translation</strong></td>
        <td>"I love cats"</td>
        <td>"Tôi yêu mèo"</td>
        <td>Khác ngôn ngữ, khác độ dài</td>
      </tr>
      <tr>
        <td><strong>Text Summarization</strong></td>
        <td>Đoạn văn 500 từ</td>
        <td>Tóm tắt 50 từ</td>
        <td>Nén thông tin</td>
      </tr>
      <tr>
        <td><strong>Chatbot / QA</strong></td>
        <td>"Thời tiết hôm nay?"</td>
        <td>"Hôm nay trời nắng"</td>
        <td>Sinh câu trả lời</td>
      </tr>
      <tr>
        <td><strong>Image Captioning</strong></td>
        <td>Ảnh (qua CNN encoder)</td>
        <td>"Một con mèo ngồi trên bàn"</td>
        <td>Encoder = CNN, Decoder = RNN</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: TEACHER FORCING
  // ==========================================================
  {
    id: 'ch22_06_04',
    title: '4. Teacher Forcing',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Teacher Forcing — Kỹ thuật huấn luyện Decoder</h2>

  <p>Khi train Seq2Seq, decoder cần input ở mỗi bước. Có 2 lựa chọn: dùng <strong>output dự đoán</strong> của bước trước, hoặc dùng <strong>ground truth</strong> (đáp án đúng). Teacher Forcing chọn cách thứ hai.</p>

  <h3>4.1. So sánh 2 cách huấn luyện</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Autoregressive (Free Running)</h4>
      <p>Decoder dùng <strong>output dự đoán $\\hat{y}_{t-1}$</strong> làm input cho bước $t$.</p>
      <p>Vấn đề: nếu bước 1 sai → input bước 2 sai → bước 2 cũng sai → <strong>lỗi tích lũy</strong> (error accumulation). Model sinh ra câu vô nghĩa.</p>
    </div>
    <div class="concept-card">
      <h4>Teacher Forcing</h4>
      <p>Decoder dùng <strong>ground truth $y_{t-1}$</strong> làm input cho bước $t$ (khi train).</p>
      <p>Ưu điểm: mỗi bước luôn nhận input đúng → gradient ổn định → <strong>train nhanh</strong> và <strong>hội tụ tốt</strong>.</p>
    </div>
  </div>

  <h3>4.2. Exposure Bias — Hạn chế của Teacher Forcing</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Sự khác biệt Train vs Inference</span>
      <p><strong>Khi train:</strong> decoder luôn nhận ground truth → "được thầy kèm". <strong>Khi inference:</strong> không có ground truth → phải dùng output dự đoán → "tự lực". Model chưa từng "trải nghiệm" việc nhận input sai → khi gặp lỗi ở inference, nó không biết phục hồi. Đây gọi là <strong>Exposure Bias</strong>.</p>
    </div>
  </div>

  <h3>4.3. Giải pháp: Scheduled Sampling</h3>

  <div class="definition-block">
    <span class="definition-term">Scheduled Sampling (Bengio et al., 2015)</span>
    <p>Kết hợp cả 2: ban đầu dùng teacher forcing (tỷ lệ cao), dần dần <strong>giảm tỷ lệ</strong> teacher forcing theo epoch. Cuối training, model gần như hoàn toàn "tự lực".</p>
    <p>Ví dụ schedule: epoch 1 → teacher forcing 100%, epoch 10 → 80%, epoch 50 → 20%, epoch 100 → 0%.</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Phương pháp</th>
        <th>Tốc độ train</th>
        <th>Chất lượng inference</th>
        <th>Exposure Bias?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Free Running</strong></td>
        <td>Chậm, không ổn định</td>
        <td>Khá — model quen với sai sót</td>
        <td>Không</td>
      </tr>
      <tr>
        <td><strong>Teacher Forcing</strong></td>
        <td>Nhanh, ổn định</td>
        <td>Kém hơn — chưa quen sai sót</td>
        <td>Có</td>
      </tr>
      <tr>
        <td><strong>Scheduled Sampling</strong></td>
        <td>Vừa phải</td>
        <td>Tốt — thích nghi dần</td>
        <td>Giảm thiểu</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: BEAM SEARCH & TÓM TẮT
  // ==========================================================
  {
    id: 'ch22_06_05',
    title: '5. Beam Search & Tóm tắt',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Beam Search — Thuật toán sinh chuỗi output</h2>

  <p>Khi inference, decoder sinh output từng token một. Tại mỗi bước, nó chọn token có xác suất cao nhất. Nhưng cách chọn <strong>greedy</strong> (chọn top-1 mỗi bước) không đảm bảo tìm được chuỗi tốt nhất tổng thể.</p>

  <h3>5.1. Greedy Decoding vs Beam Search</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Greedy Decoding</h4>
      <p>Mỗi bước chọn <strong>top-1 token</strong> có xác suất cao nhất.</p>
      <p>$y_t = \\arg\\max P(y_t | y_{<t}, c)$</p>
      <p><strong>Nhanh</strong> (O(V) mỗi bước, V = vocab size) nhưng có thể <strong>bỏ lỡ</strong> chuỗi tốt hơn tổng thể.</p>
      <p>Ví dụ: greedy chọn "I am a" → bế tắc. Nhưng "I have a" → "I have a cat" tốt hơn tổng thể.</p>
    </div>
    <div class="concept-card">
      <h4>Beam Search</h4>
      <p>Giữ <strong>k candidates</strong> (beams) tốt nhất tại mỗi bước.</p>
      <p>Mỗi bước: mở rộng k beams × V tokens → k×V candidates. Chọn <strong>top-k</strong> chuỗi có tổng log-probability cao nhất.</p>
      <p><strong>Chậm hơn k lần</strong> nhưng tìm ra chuỗi <strong>tốt hơn đáng kể</strong>.</p>
    </div>
  </div>

  <h3>5.2. Ví dụ Beam Search (beam_width = 2)</h3>

  <div class="definition-block">
    <span class="definition-term">Bước 1: Sinh token đầu tiên</span>
    <p>Top-2 tokens: "Tôi" (p=0.6), "Mình" (p=0.3).</p>
    <p>→ 2 beams: ["Tôi"], ["Mình"]</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Bước 2: Mở rộng mỗi beam</span>
    <p>"Tôi" → top: "yêu" (0.6×0.5=0.30), "thích" (0.6×0.4=0.24)</p>
    <p>"Mình" → top: "yêu" (0.3×0.6=0.18), "thương" (0.3×0.3=0.09)</p>
    <p>Top-2 tổng thể: ["Tôi yêu"] (0.30), ["Tôi thích"] (0.24)</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Bước 3: Tiếp tục...</span>
    <p>"Tôi yêu" → "mèo" (0.30×0.7=0.21)</p>
    <p>"Tôi thích" → "mèo" (0.24×0.6=0.14)</p>
    <p>Kết quả: "Tôi yêu mèo" với score cao nhất.</p>
  </div>

  <h3>5.3. Giá trị beam_width phổ biến</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>beam_width (k)</th>
        <th>Tốc độ</th>
        <th>Chất lượng</th>
        <th>Ứng dụng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>k = 1</strong></td>
        <td>Nhanh nhất</td>
        <td>= Greedy</td>
        <td>Real-time chat, prototype</td>
      </tr>
      <tr>
        <td><strong>k = 4-5</strong></td>
        <td>Vừa phải</td>
        <td>Tốt, phổ biến nhất</td>
        <td>Machine translation (Google: k=4)</td>
      </tr>
      <tr>
        <td><strong>k = 10-20</strong></td>
        <td>Chậm</td>
        <td>Ít cải thiện thêm</td>
        <td>Nghiên cứu, bài toán đặc biệt</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Length Normalization</span>
      <p>Beam search có xu hướng ưu tiên chuỗi ngắn (vì nhân thêm xác suất < 1 ở mỗi bước → chuỗi dài có tổng score thấp hơn). Giải pháp: <strong>chia log-probability cho độ dài chuỗi</strong>: $\\text{score} = \\frac{1}{T^\\alpha} \\sum \\log P(y_t)$, với $\\alpha \\in [0.6, 1.0]$.</p>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 22.6 — Kiến Trúc RNN Nâng Cao</h3>
    <ul>
      <li><strong>Bidirectional RNN:</strong> 2 RNN song song (forward + backward), output = concat(2H). Dùng khi cần ngữ cảnh 2 chiều. Không dùng cho language modeling</li>
      <li><strong>Stacked RNN:</strong> Xếp L layers RNN. Layer thấp học syntax, layer cao học semantics. Thường dùng 2-3 layers. >4 layers cần Residual Connection</li>
      <li><strong>Seq2Seq:</strong> Encoder nén input → context vector $c$ → Decoder sinh output. Bị bottleneck: toàn bộ input nén vào 1 vector</li>
      <li><strong>Teacher Forcing:</strong> Train decoder bằng ground truth, không bằng output dự đoán. Nhanh nhưng gây exposure bias. Scheduled Sampling giải quyết</li>
      <li><strong>Beam Search:</strong> Giữ k candidates mỗi bước thay vì greedy top-1. k=4-5 là giá trị tiêu chuẩn. Cần length normalization</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Bài tiếp theo</span>
      <p>Bài 22.7 sẽ giải quyết bottleneck của Seq2Seq bằng <strong>Attention Mechanism</strong> — cho phép decoder "nhìn lại" tất cả hidden states của encoder thay vì chỉ 1 vector $c$. Đây là bước quan trọng dẫn tới kiến trúc <strong>Transformer</strong>.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_06: Chapter = {
  id: 'ch22_06',
  title: '22.6. Kiến Trúc RNN Nâng Cao',
  introduction: 'Bidirectional RNN, Stacked RNN, Seq2Seq Encoder-Decoder, Teacher Forcing, và Beam Search.',
  lessons: ch22_06_lessons,
};

export default ch22_06;
