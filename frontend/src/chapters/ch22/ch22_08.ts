import { Lesson, Chapter } from '../../courses';

const ch22_08_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: ỨNG DỤNG THỰC TẾ CỦA RNN
  // ==========================================================
  {
    id: 'ch22_08_01',
    title: '1. Ứng dụng thực tế của RNN',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Ứng dụng thực tế của RNN trong thế giới thực</h2>

  <p>Dù Transformer đang thống trị, RNN (đặc biệt LSTM/GRU) vẫn có mặt trong nhiều hệ thống production. Bài này tổng hợp các ứng dụng quan trọng nhất, từ kinh điển tới hiện đại.</p>

  <h3>1.1. Natural Language Processing (NLP)</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bài toán</th>
        <th>Mô tả</th>
        <th>Kiến trúc</th>
        <th>Ví dụ thực tế</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Language Modeling</strong></td>
        <td>Dự đoán từ tiếp theo: $P(w_t | w_1...w_{t-1})$</td>
        <td>LSTM unidirectional</td>
        <td>Gợi ý từ trên bàn phím điện thoại (GBoard, SwiftKey)</td>
      </tr>
      <tr>
        <td><strong>Machine Translation</strong></td>
        <td>Dịch chuỗi sang chuỗi</td>
        <td>Seq2Seq + Attention (BiLSTM)</td>
        <td>Google Translate (trước 2017), Facebook Translation</td>
      </tr>
      <tr>
        <td><strong>Sentiment Analysis</strong></td>
        <td>Phân loại cảm xúc: tích cực/tiêu cực</td>
        <td>BiLSTM + Attention</td>
        <td>Phân tích review sản phẩm, social media monitoring</td>
      </tr>
      <tr>
        <td><strong>Named Entity Recognition</strong></td>
        <td>Gán nhãn: người, địa điểm, tổ chức</td>
        <td>BiLSTM-CRF</td>
        <td>Trích xuất thông tin từ văn bản (Google Knowledge Graph)</td>
      </tr>
      <tr>
        <td><strong>Text Summarization</strong></td>
        <td>Tóm tắt văn bản dài</td>
        <td>Seq2Seq + Attention + Copy</td>
        <td>Tóm tắt tin tức tự động</td>
      </tr>
    </tbody>
  </table>

  <h3>1.2. Speech & Audio</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bài toán</th>
        <th>Input → Output</th>
        <th>Kiến trúc</th>
        <th>Ví dụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Speech Recognition (ASR)</strong></td>
        <td>Audio → Text</td>
        <td>Deep BiLSTM + CTC</td>
        <td>Siri, Google Voice (phiên bản cũ), DeepSpeech</td>
      </tr>
      <tr>
        <td><strong>Text-to-Speech (TTS)</strong></td>
        <td>Text → Audio</td>
        <td>LSTM + WaveNet decoder</td>
        <td>Google Assistant, Amazon Alexa</td>
      </tr>
      <tr>
        <td><strong>Music Generation</strong></td>
        <td>Nốt nhạc → Nốt nhạc tiếp</td>
        <td>Stacked LSTM</td>
        <td>Google Magenta, MuseNet (OpenAI)</td>
      </tr>
    </tbody>
  </table>

  <h3>1.3. Time Series & Prediction</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bài toán</th>
        <th>Dữ liệu</th>
        <th>Kiến trúc</th>
        <th>Ứng dụng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Stock Prediction</strong></td>
        <td>Giá cổ phiếu theo ngày/giờ</td>
        <td>LSTM / GRU</td>
        <td>Hedge funds, quant trading</td>
      </tr>
      <tr>
        <td><strong>Weather Forecasting</strong></td>
        <td>Nhiệt độ, áp suất, gió</td>
        <td>Stacked LSTM + Attention</td>
        <td>Dự báo thời tiết ngắn hạn</td>
      </tr>
      <tr>
        <td><strong>Anomaly Detection</strong></td>
        <td>Sensor data, network traffic</td>
        <td>LSTM Autoencoder</td>
        <td>Phát hiện bất thường máy móc, cybersecurity</td>
      </tr>
      <tr>
        <td><strong>Energy Demand</strong></td>
        <td>Lịch sử tiêu thụ điện</td>
        <td>GRU / Seq2Seq</td>
        <td>Tối ưu hóa lưới điện, smart grid</td>
      </tr>
    </tbody>
  </table>

  <h3>1.4. Các ứng dụng khác</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Robotics & Control</h4>
      <p>LSTM xử lý chuỗi sensor readings (gia tốc, gyroscope) để điều khiển robot. Dùng trong self-driving cars cho trajectory prediction.</p>
    </div>
    <div class="concept-card">
      <h4>Healthcare</h4>
      <p>LSTM phân tích chuỗi ECG (nhịp tim) phát hiện rối loạn. Dự đoán biến chứng bệnh nhân từ electronic health records (EHR).</p>
    </div>
    <div class="concept-card">
      <h4>Code Generation</h4>
      <p>LSTM sinh code dựa trên context. Được dùng trong các phiên bản đầu của GitHub Copilot prototype, IntelliSense.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: SO SÁNH TỔNG QUAN CÁC KIẾN TRÚC
  // ==========================================================
  {
    id: 'ch22_08_02',
    title: '2. So sánh tổng quan các kiến trúc RNN',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. So sánh tổng quan: Vanilla RNN → LSTM → GRU → Attention</h2>

  <h3>2.1. Bảng so sánh toàn diện</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Vanilla RNN</th>
        <th>LSTM</th>
        <th>GRU</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Gates</strong></td>
        <td>0</td>
        <td>3 (forget, input, output)</td>
        <td>2 (reset, update)</td>
      </tr>
      <tr>
        <td><strong>States</strong></td>
        <td>$h_t$ only</td>
        <td>$h_t$ + $C_t$ (cell state)</td>
        <td>$h_t$ only</td>
      </tr>
      <tr>
        <td><strong>Parameters</strong></td>
        <td>$\\sim 3Hd$ (ít nhất)</td>
        <td>$\\sim 4 \\times 3Hd$ (gấp ~4 lần)</td>
        <td>$\\sim 3 \\times 3Hd$ (gấp ~3 lần)</td>
      </tr>
      <tr>
        <td><strong>Long-range</strong></td>
        <td>Rất kém (vanishing gradient)</td>
        <td>Tốt (cell state highway)</td>
        <td>Tốt (update gate)</td>
      </tr>
      <tr>
        <td><strong>Tốc độ train</strong></td>
        <td>Nhanh nhất</td>
        <td>Chậm nhất</td>
        <td>Vừa phải (nhanh hơn LSTM ~20-30%)</td>
      </tr>
      <tr>
        <td><strong>Khi nào dùng?</strong></td>
        <td>Chuỗi cực ngắn, prototype</td>
        <td>Chuỗi dài, cần nhớ xa</td>
        <td>Data ít, cần train nhanh</td>
      </tr>
    </tbody>
  </table>

  <h3>2.2. Flowchart chọn kiến trúc</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>Bài toán có cần xử lý chuỗi không?</h4>
        <p><strong>Không</strong> → dùng FNN / CNN. <strong>Có</strong> → tiếp ②</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>Có đủ tài nguyên (GPU/TPU) và data lớn?</h4>
        <p><strong>Có</strong> → <strong>Transformer</strong> (BERT, GPT). <strong>Không</strong> → tiếp ③</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>Chuỗi input dài bao nhiêu?</h4>
        <p><strong>&lt; 50 tokens</strong> → GRU (nhanh, ít params). <strong>&gt; 50 tokens</strong> → LSTM (nhớ xa hơn)</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">④</div>
      <div class="step-content">
        <h4>Cần ngữ cảnh 2 chiều?</h4>
        <p><strong>Có</strong> (NER, POS tagging) → BiLSTM/BiGRU. <strong>Không</strong> (language model, streaming) → Unidirectional</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">⑤</div>
      <div class="step-content">
        <h4>Seq-to-Seq (input ≠ output length)?</h4>
        <p><strong>Có</strong> → Encoder-Decoder + Attention. <strong>Không</strong> → Single RNN</p>
      </div>
    </div>
  </div>

  <h3>2.3. Khi nào KHÔNG nên dùng RNN?</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Dấu hiệu cần chuyển sang Transformer</span>
      <ul>
        <li>Chuỗi dài <strong>&gt; 500 tokens</strong> → Self-Attention xử lý tốt hơn</li>
        <li>Cần <strong>train nhanh</strong> trên GPU cluster → Transformer song song hóa tốt hơn</li>
        <li>Có <strong>pretrained model</strong> sẵn (BERT, GPT) → fine-tuning nhanh và hiệu quả hơn train RNN from scratch</li>
        <li>Bài toán cần hiểu <strong>quan hệ toàn cục</strong> trong chuỗi → Self-Attention vượt trội</li>
      </ul>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: TỔNG KẾT CHƯƠNG 22
  // ==========================================================
  {
    id: 'ch22_08_03',
    title: '3. Tổng kết Chương 22',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Tổng kết — Hành trình xuyên suốt Chương 22</h2>

  <p>Chương 22 đã đưa bạn qua toàn bộ hệ sinh thái <strong>Recurrent Neural Networks</strong> — từ động lực ban đầu tới kiến trúc sang Transformer. Dưới đây là bản tổng hợp.</p>

  <h3>3.1. Bản đồ kiến thức</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Bài</th>
        <th>Chủ đề</th>
        <th>Nội dung cốt lõi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>22.1</strong></td>
        <td>Tại sao cần RNN?</td>
        <td>Dữ liệu chuỗi, hidden state là "bộ nhớ", Perceptron → RNN chỉ thêm $W \\cdot h^{(t-1)}$</td>
      </tr>
      <tr>
        <td><strong>22.2</strong></td>
        <td>Vanilla RNN</td>
        <td>Forward pass: $h^{(t)} = \\tanh(U x^{(t)} + W h^{(t-1)} + b)$, embedding, Goodfellow notation (eq 10.8-10.13)</td>
      </tr>
      <tr>
        <td><strong>22.3</strong></td>
        <td>BPTT & Gradient</td>
        <td>Backprop qua thời gian, diag(), 2 nguồn gradient $h^{(t)}$, vanishing/exploding gradient, gradient clipping, truncated BPTT</td>
      </tr>
      <tr>
        <td><strong>22.4</strong></td>
        <td>LSTM</td>
        <td>3 gates (forget, input, output), cell state highway, giải quyết vanishing gradient</td>
      </tr>
      <tr>
        <td><strong>22.5</strong></td>
        <td>GRU</td>
        <td>2 gates (reset, update), so sánh LSTM vs GRU, khi nào dùng gì</td>
      </tr>
      <tr>
        <td><strong>22.6</strong></td>
        <td>Kiến trúc nâng cao</td>
        <td>BiRNN, Stacked RNN, Seq2Seq, Teacher Forcing, Beam Search</td>
      </tr>
      <tr>
        <td><strong>22.7</strong></td>
        <td>Attention</td>
        <td>Bottleneck → Attention (4 bước), Bahdanau vs Luong, Self-Attention (Q/K/V), Multi-Head</td>
      </tr>
      <tr>
        <td><strong>22.8</strong></td>
        <td>Ứng dụng & Tổng kết</td>
        <td>NLP, Speech, Time Series, flowchart chọn kiến trúc</td>
      </tr>
    </tbody>
  </table>

  <h3>3.2. Các công thức quan trọng nhất</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Vanilla RNN:</h4>
    <p class="font-mono">$h^{(t)} = \\tanh(U \\cdot x^{(t)} + W \\cdot h^{(t-1)} + b)$</p>
    <p class="font-mono">$o^{(t)} = V \\cdot h^{(t)} + c$</p>
    <p class="font-mono">$\\hat{y}^{(t)} = \\text{softmax}(o^{(t)})$</p>

    <h4>LSTM (4 gates):</h4>
    <p class="font-mono">$f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f)$ &nbsp; ← forget gate</p>
    <p class="font-mono">$i_t = \\sigma(W_i [h_{t-1}, x_t] + b_i)$ &nbsp; ← input gate</p>
    <p class="font-mono">$C_t = f_t \\odot C_{t-1} + i_t \\odot \\tanh(W_C [h_{t-1}, x_t] + b_C)$</p>
    <p class="font-mono">$o_t = \\sigma(W_o [h_{t-1}, x_t] + b_o)$ &nbsp; ← output gate</p>
    <p class="font-mono">$h_t = o_t \\odot \\tanh(C_t)$</p>

    <h4>GRU (2 gates):</h4>
    <p class="font-mono">$z_t = \\sigma(W_z [h_{t-1}, x_t])$ &nbsp; ← update gate</p>
    <p class="font-mono">$r_t = \\sigma(W_r [h_{t-1}, x_t])$ &nbsp; ← reset gate</p>
    <p class="font-mono">$h_t = (1-z_t) \\odot h_{t-1} + z_t \\odot \\tanh(W [r_t \\odot h_{t-1}, x_t])$</p>

    <h4>Attention:</h4>
    <p class="font-mono">$\\alpha_{t,i} = \\text{softmax}(\\text{score}(s_t, h_i))$</p>
    <p class="font-mono">$c_t = \\sum_i \\alpha_{t,i} \\cdot h_i$</p>

    <h4>Self-Attention (Transformer):</h4>
    <p class="font-mono">$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$</p>
  </div>

  <h3>3.3. Những điều đã học được</h3>

  <div class="key-takeaway">
    <h3>Kiến thức cốt lõi từ Chương 22</h3>
    <ol>
      <li><strong>RNN là perceptron + recurrent connection:</strong> chỉ thêm $W \\cdot h^{(t-1)}$ để tạo "ký ức"</li>
      <li><strong>Vanishing gradient</strong> là vấn đề cốt lõi — gate mechanism (LSTM/GRU) là giải pháp</li>
      <li><strong>LSTM</strong> dùng cell state "highway" cho gradient chảy qua, <strong>GRU</strong> gọn hơn với 2 gates</li>
      <li><strong>Seq2Seq</strong> nén input vào 1 vector cố định → bottleneck → <strong>Attention</strong> cho decoder nhìn lại tất cả encoder states</li>
      <li><strong>Self-Attention</strong> loại bỏ hoàn toàn recurrence → xử lý <strong>song song</strong> → <strong>Transformer</strong></li>
      <li>RNN vẫn có giá trị cho <strong>edge devices, streaming, chuỗi siêu dài</strong></li>
    </ol>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tiếp theo</span>
      <p>Chương tiếp theo sẽ đi sâu vào <strong>Transformer Architecture</strong> — kiến trúc đã thay đổi toàn bộ AI hiện đại. Bạn sẽ thấy Self-Attention từ Chương 22 trở thành thành phần trung tâm, kết hợp với Positional Encoding, Layer Normalization, và Feed-Forward Networks để tạo nên BERT, GPT, và các LLM hiện đại.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_08: Chapter = {
  id: 'ch22_08',
  title: '22.8. Ứng Dụng & Tổng Kết',
  introduction: 'Tổng hợp ứng dụng thực tế của RNN (NLP, Speech, Time Series), so sánh toàn diện các kiến trúc, flowchart lựa chọn, và bản đồ kiến thức Chương 22.',
  lessons: ch22_08_lessons,
};

export default ch22_08;
