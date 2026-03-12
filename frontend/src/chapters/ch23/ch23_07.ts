import { Lesson, Chapter } from '../../courses';

const ch23_07_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: ENCODER-ONLY MODELS (BERT)
  // ==========================================================
  {
    id: 'ch23_07_01',
    title: '1. Encoder-Only Models: Sự trỗi dậy của BERT',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Kiến trúc chỉ Encoder (Encoder-Only): BERT</h2>

  <p>Thay vì dùng cả Encoder-Decoder như bài toán Dịch máy ban đầu, <strong>BERT (Bidirectional Encoder Representations from Transformers)</strong> do Google ra mắt năm 2018 chỉ sử dụng khối Encoder. Mục tiêu là tạo ra representation tốt nhất cho câu (hiểu ngôn ngữ đa chiều).</p>

  <h3>1.1. Mục tiêu huấn luyện trước (Pre-training Objectives)</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>1. Masked Language Modeling (MLM)</h4>
      <p>Khác mô hình ngôn ngữ thông thường (đoán từ tiếp theo), BERT đọc cả câu từ trái qua phải và phải qua trái. Nó <strong>giấu (mask) ngẫu nhiên 15% các token (từ) đầu vào</strong> và yêu cầu mô hình dự đoán lại các token bị giấu đó.</p>
    </div>
    <div class="concept-card">
      <h4>2. Next Sentence Prediction (NSP)</h4>
      <p>Cho 2 câu A và B, BERT phải đoán xem câu B có thực sự là câu tiếp theo của câu A trong văn bản thực không. Điều này giúp hiểu liên kết đoạn văn (Contextual relation).</p>
    </div>
  </div>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Hàm biến thể MLM của BERT</h4>
    <p>Thay vì hàm Autoregressive $\\max \\sum_t \\log P(x_t | x_{<t})$, BERT tối ưu hóa hàm phân bố:</p>
    <p class="font-mono text-center my-3 text-lg">$\\text{MLM}(X) = \\prod_{x \\in M} P\\big(x \\mid X \\setminus M\\big)$</p>
    <p>Với $M$ là tập các từ bị mask. Nhờ kiến trúc không cần che future mask, BERT "thấy" toàn bộ ngữ cảnh hai chiều (bidirectional) của câu, qua đó vector nhúng thu được sâu sắc hơn nhiều.</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thế mạnh</th>
        <th>Hạn chế</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hiểu ngữ nghĩa tuyệt đối (NLU: Natural Language Understanding)</td>
        <td>Rất tệ trong việc tạo sinh văn bản mới tự do (Generation)</td>
      </tr>
      <tr>
        <td>Tốt cho Phân loại văn bản (Classification)</td>
        <td></td>
      </tr>
      <tr>
        <td>Tốt cho Trích xuất thông tin (Named Entity Recognition - NER)</td>
        <td></td>
      </tr>
    </tbody>
  </table>

</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: DECODER-ONLY MODELS (GPT)
  // ==========================================================
  {
    id: 'ch23_07_02',
    title: '2. Decoder-Only Models: Kỷ nguyên GPT',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Kiến trúc chỉ Decoder (Decoder-Only): Dòng họ GPT</h2>

  <p>Đối lập với BERT, OpenAI phát triển mô hình <strong>GPT (Generative Pre-trained Transformer)</strong>. Nó loại bỏ hoàn toàn khối Encoder, loại bỏ luôn Cross-Attention, và chỉ tập trung nhân đôi (stack) nhiều khối <strong>Masked Self-Attention (Decoder)</strong>.</p>

  <h3>2.1. Mục tiêu huấn luyện trước (Pre-training)</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Mục tiêu tự hồi quy chuẩn (Autoregressive LM Objective)</h4>
    <p>Nguyên tắc duy nhất của GPT là dự đoán từ tiếp theo, dựa vào lịch sử những từ đã sinh trước đó:</p>
    <p class="font-mono text-center my-3 text-lg">$\\max \\sum_t \\log P(x_t \\mid x_{<t})$</p>
    <p>Thuộc tính Causal Mask bảo đảm ở vị trí $t$, GPT chỉ thấy từ $1 \\to t$, không thể "ăn gian" nhìn trộm từ $t+1$.</p>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Sức mạnh của sự đơn giản</span>
      <p>Việc sinh tuần tự ban đầu có vẻ hạn chế và tốn sức, nhưng OpenAI chứng minh rằng: khi ta bón cho mô hình mạng Decoder-Only một lượng dữ liệu đủ siêu to khổng lồ từ Internet, mô hình tự dưng "nảy sinh" khả năng hiểu sâu và lập luận bất kỳ ngôn ngữ nào. Đây chính là gốc rễ tạo nên hiện tượng <strong>ChatGPT</strong> ngày nay.</p>
    </div>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>BERT (Encoder-only)</th>
        <th>GPT (Decoder-only)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Hướng dữ liệu</strong></td>
        <td>Bidirectional (Hai chiều)</td>
        <td>Unidirectional (Luôn Trái $\\to$ Phải)</td>
      </tr>
      <tr>
        <td><strong>Công việc chính</strong></td>
        <td>Text Understanding (Categorize / Extract)</td>
        <td>Text Generation (Chat / Sinh mã)</td>
      </tr>
      <tr>
        <td><strong>Tự động sinh (Autoregressive)</strong></td>
        <td>Không</td>
        <td>Chắc chắn Có</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: SCALING LAWS
  // ==========================================================
  {
    id: 'ch23_07_03',
    title: '3. Scaling Laws: Càng to càng thông minh?',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Scaling Laws: Khái niệm Định luật Mở rộng</h2>

  <p>Một trong những đặc sản của dải Transformer là <strong>Scaling Laws</strong> (Kaplan et al., OpenAI 2020 và Chinchilla, DeepMind 2022). Họ phát hiện ra rằng, hiệu suất của mô hình (loss function log) tiếp tục giảm một cách hoàn hảo (power-law) khi ta tăng ba thứ: Tổng Số Tham số (N), Lượng Dữ liệu (D) và Cấu hình máy tính (Compute Budget - C).</p>

  <h3>3.1. Chinchilla Scaling Law (2022)</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Quy luật tỷ lệ (Kaplan / Chinchilla)</h4>
    <p>Nếu bạn muốn tăng size mô hình (N) x lần, bạn cũng <strong>phải</strong> tăng lượng text (D) x lần. Công thức mất mát xấp xỉ:</p>
    <p class="font-mono text-center my-3 text-lg">$L(N,D) \\approx \\frac{A}{N^{\\alpha}} + \\frac{B}{D^{\\beta}} + E$</p>
    <p>DeepMind (Chinchilla) chốt lại một nguyên lý "vàng": Số lượng Token phải bằng khoảng <strong>$20 \\times$ Tổng Tham số (Params)</strong>.</p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Ý nghĩa thực tế</span>
      <p>Trước năm 2022, mọi người mải mê đẻ mô hình khổng lồ (vài trăm tỉ parameters) nhưng thiếu data (Under-trained). DeepMind vả vào mặt nhân loại qua mô hình "Chinchilla" 70B tham số nhưng được train tới 1.4 nghìn tỷ tokens, đánh bại rực rỡ siêu mẫu cũ Goliath 280B tham số. Từ đó mọi mô hình LLMs như LLaMA 2, 3 đều chú trọng "Nhồi nhiều data, mô hình nén chặt" (Ví dụ LLaMA3 8B dùng tận 15 nghìn tỷ tokens - Over-trained)!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: VISION TRANSFORMERS (VIT)
  // ==========================================================
  {
    id: 'ch23_07_04',
    title: '4. Vision Transformer (ViT): Khi Attention xử lý Ảnh',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Vision Transformer (ViT) — Vượt qua giới hạn NLP</h2>

  <p>Suốt thời gian dài Convolutional Neural Network (CNN) như ResNet thống trị xử lý hình ảnh. Năm 2020, Google chứng minh Transformer <strong>không chỉ dành cho Text</strong>. ViT (Vision Transformer) xử lý bức ảnh hệt như xử lý một đoạn văn bằng Text!</p>

  <h3>4.1. Cách Transformer đọc Ảnh</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Chia nhỏ bức ảnh thành các "Patch" (Miếng)</span>
    <ol class="list-decimal pl-6 mt-2 space-y-2">
      <li><strong>Cắt ảnh:</strong> Giả sử bức ảnh gốc size $224 \\times 224$. Ta cắt nó thành lưới các ô vuông nhỏ $16 \\times 16$. Kết quả có $\\frac{224}{16} \\times \\frac{224}{16} = 14 \\times 14 = 196$ ô vuông nhỏ (Patches).</li>
      <li><strong>Phẳng hóa (Flatten):</strong> Mỗi Patch (ví dụ $16 \\times 16 \\times 3$ channels) giãn ra thành 1 vector 1D (768 chiều).</li>
      <li><strong>Linear Projection (Tokenization):</strong> Từ đây, ViT coi 196 vectors này giống hệt mảng 196 "từ ngữ" của 1 "câu văn".</li>
      <li><strong>Thêm Positional Encoding:</strong> Gắn thẻ số thứ tự vào từng patch (vì Attention không quan tâm không gian hình ảnh liền kề nếu không có chỉ báo vị trí).</li>
      <li><strong>Chạy qua Encoder:</strong> Bơm toàn bộ dãy 196 tokens vào khối Encoder y chang BERT.</li>
    </ol>
  </div>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Điểm cộng vô số kể so với CNN</span>
      <p>CNN dùng kernel cày cục quét từng pixel cực kỳ mỏi. Transformer ViT ném cả bức ảnh vào rồi dùng <strong>Toàn cục Attention (Global Attention)</strong> ngay từ lớp đầu tiên. Góc xa xôi bên trái của bức ảnh có thể nhìn và match cực mượt với góc bên phải dưới mà một mạng CNN tốn cả trăm tầng mới với tới. Mọi thứ trở nên mượt hơn và "Multi-modal" dễ dàng hơn (trộn ảnh và chữ nhét chung 1 model)!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: FLASH ATTENTION
  // ==========================================================
  {
    id: 'ch23_07_05',
    title: '5. Flash Attention: Triệt tiêu thảm họa bộ nhớ',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Flash Attention: Cứu cánh cho ngữ cảnh dài (Long-Context)</h2>

  <p>Vấn đề lớn nhất của thiết kế Vanilla Transformer (Transformer đời đầu) là: Kích thước ma trận $QK^T$ cực lớn nếu câu văn (Context) dài. Nó leo thang $O(T^2)$ theo bình phương của $T$. Đọc văn bản tiếng Việt dài 100 ngàn chữ tương đương độ khó của... máy nổ RAM!</p>

  <h3>5.1. Rào cản IO (Băng thông đọc ghi)</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Sát thủ IO-Aware</span>
    <p>GPU có SRAM siêu tốc siêu nhỏ nạp ngay lõi tính toán, và HBM (VRAM) cực lớn (như VRAM 80GB) nhưng băng thông chuyển vô cực chậm. Attention chuẩn đẩy khối $Q$, $K$, $V$ từ HBM vào SRAM, tính ra $QK^T$, vứt ngược ra HBM, rồi lại lôi từ HBM vào SRAM để tính softmax... Làm băng thông quá tải, vướng "Sát thủ IO".</p>
  </div>

  <h3>5.2. Giải pháp Flash Attention (Tiling)</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Tính toán chéo khối (Tiling blocks)</h4>
    <p>Thuật toán này "băm nhỏ" chuỗi đầu vào theo từng Block (như chẻ củi). Nó cất vào SRAM và tính gộp luôn quy trình $QK^T \\to$ Softmax $\\to \\cdot V$. Nó cập nhật dần mẫu số Softmax bằng công thức Online Softmax. Kết quả không cất các ma trận trung gian nhảm nhí về VRAM nữa.</p>
    <ul class="list-disc pl-6 mt-2">
      <li><strong>Thời gian (Time):</strong> Tốc độ gấp $2-4$ lần.</li>
      <li><strong>Bộ nhớ (Memory):</strong> Giảm từ độ phức tạp $O(T^2)$ rụng cái bịch xuống chỉ còn tĩnh lừ $O(T)$. Khả năng chạy context từ $4k$ nhảy dựng lên $100k - 2 \text{ triệu tokens}$ cho các dòng họ Google Gemini $1.5$ !</li>
    </ul>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 23.7 — Sự tiến hóa cực mạnh của Transformer</h3>
    <ul>
      <li><strong>BERT (Encoder):</strong> Masked Language, cỗ máy hiên ngang hiểu ý nghĩa văn bản không thiên kiến phương hướng.</li>
      <li><strong>GPT (Decoder):</strong> Cỗ máy sinh văn bản một chiều (Trái Phải) Autoregressive, ông tổ của ChatGPT thời kim cổ.</li>
      <li><strong>Scaling Laws:</strong> Mô hình càng to, càng tu ực nhiều dữ liệu thì nó càng "thông thái" một cách đáng sợ và tỷ lệ quy luật chuẩn xác.</li>
      <li><strong>ViT (Vision Tranf):</strong> Nhào nặn ảnh thô thành một chuỗi miếng dán (Patch) rồi dùng NLP xử ảnh, vượt rào CNN ngàn đời.</li>
      <li><strong>Flash Attention:</strong> Giải cứu "Mùa đông băng thông" IO SRAM/VRAM, băm Block chẻ Token, đẩy chiều dài context lên hàng triệu (Long-Context LLMs).</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  }
];

const ch23_07: Chapter = {
  id: 'ch23_07',
  title: '23.7. Các Biến thể nổi bật',
  introduction: 'Sự "trăm hoa đua nở" từ rễ mẹ Transformer Paper 2017 tạo ra Đế chế BERT (hiểu văn bản), GPT (Sinh Text thông minh), ViT xử lý Hình như xử lý Chữ, và tuyệt đỉnh công phu FlashAttention.',
  lessons: ch23_07_lessons,
};

export default ch23_07;
