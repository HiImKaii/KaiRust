import { Lesson, Chapter } from '../../courses';

const ch22_04_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: MOTIVATION — TẠI SAO CẦN LSTM?
  // ==========================================================
  {
    id: 'ch22_04_01',
    title: '1. Vấn đề của RNN và Ý tưởng giải cứu LSTM',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Vấn đề của RNN thuần túy (Vanilla RNN)</h2>

  <p>Bài 22.3 đã chứng minh Vanilla RNN bị <strong>Vanishing Gradient</strong>: gradient triệt tiêu theo cấp số nhân khi chuỗi dài. Hãy xem ví dụ câu: <em>"Hôm nay trời đẹp, nhưng hôm qua trời rất ..."</em></p>
  <p>Từ cần dự đoán ở đây là <strong>"xấu"</strong>, do đó model bắt buộc phải nhớ được thông tin từ rất xa là cụm từ <em>"hôm qua trời"</em>. Tuy nhiên, kiến trúc RNN thuần túy gặp vấn đề nan giải.</p>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Chỉ có 1 con đường độc đạo qua thời gian</span>
      <p>RNN chỉ có duy nhất một đường truyền thông tin là bộ nhớ trạng thái ẩn: $h^{(t)}$. Diễn biến qua thời gian:</p>
      <p class="font-mono text-center text-lg my-2">$h^{(1)} \\to h^{(2)} \\to h^{(3)} \\to h^{(4)} \\to h^{(5)}$</p>
      <p>Thông tin từ thời điểm $t=1$ bắt buộc phải đi qua 4 phép nhân ma trận mệt mỏi mới đến được $t=5$. Kết quả: Thông tin yếu dần, mờ nhạt dần → RNN "quên" thông tin xa.</p>
    </div>
  </div>

  <h2>2. Ý tưởng của LSTM: Thêm "Băng chuyền" Dài hạn (Goodfellow Eq 10.40-10.45)</h2>

  <p><strong>LSTM (Long Short-Term Memory)</strong> thiết kế bởi <strong>Hochreiter & Schmidhuber (1997)</strong> giải cứu bằng cách mở thêm một con đường cao tốc thứ 2. Công thức toán học cốt lõi tuân theo chuẩn bộ tài liệu Deep Learning Book (Eq 10.40 - 10.45). Lúc này ta có:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Vanilla RNN — Không ghi chép ($h_t$)</h4>
      <p>Giống như đọc sách <strong>không ghi chú</strong>. Bộ nhớ <em>ngắn hạn</em> ($h_t$) liên tục bị nhào nặn, dễ bắt sóng nhiễu của thì hiện tại và bị ghi đè qua mỗi bước.</p>
    </div>
    <div class="concept-card">
      <h4>LSTM — Có sổ tay dài hạn ($c_t$)</h4>
      <p>Thêm bộ nhớ <em>dài hạn (Cell state)</em>. Giống như <strong>băng chuyền chạy thẳng</strong> hay <strong>tờ giấy ghi chú</strong> lưu giữ sự tình qua nhiều bước, thông tin đi ngang qua mà siêu ít bị bóp méo.</p>
    </div>
  </div>

  <div class="definition-block mb-4">
    <span class="definition-term">Hình dung về 2 con đường song song</span>
    <pre><code>c^(1) ═══════════════════════════════→ c^(5)   ← highway, ít bị biến đổi (Tờ giấy)
h^(1) ──→ h^(2) ──→ h^(3) ──→ h^(4) ──→ h^(5)  ← vẫn đi bộ qua từng bước</code></pre>
  </div>

  <h3>2.1. Quản lý tờ giấy ghi chú bằng 4 "Vệ sĩ" (Gates)</h3>
  
  <p>Tất nhiên, nếu viết mãi thì giấy cũng đầy. LSTM gắn các "vệ sĩ" (Gate) tại mỗi nấc thời gian để quyết định thao tác với Tờ giấy bộ nhớ:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Gate</th>
        <th>Ký hiệu</th>
        <th>Nhiệm vụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Forget gate</strong></td>
        <td>$f^{(t)}$</td>
        <td>Quyết định <strong>Quên (Xóa)</strong> đi bao nhiêu thông tin cũ từ $c^{(t-1)}$.</td>
      </tr>
      <tr>
        <td><strong>Input gate</strong></td>
        <td>$i^{(t)}$</td>
        <td>Xác định <strong>Nhận (Ghi)</strong> bao nhiêu áp lực thông tin mới.</td>
      </tr>
      <tr>
        <td><strong>Cell gate (Candidate)</strong></td>
        <td>$g^{(t)}$ hoặc $\\tilde{C}_t$</td>
        <td>Nội dung <strong>Thông tin mới</strong> cần viết vào là gì?</td>
      </tr>
      <tr>
        <td><strong>Output gate</strong></td>
        <td>$o^{(t)}$</td>
        <td>Sau khi tờ giấy viết xong, quyết định <strong>Xuất (Đọc)</strong> bao nhiêu để tạo output $h^{(t)}$.</td>
      </tr>
    </tbody>
  </table>

</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: CELL STATE & ELEMENT-WISE
  // ==========================================================
  {
    id: 'ch22_04_02',
    title: '2. Cell State & Phép nhân Element-wise (⊙)',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Cell State ($C_t$) — Con đường cao tốc thông tin</h2>

  <div class="image-showcase">
    <img src="/images/ch22/lstm_cell_state_highway.png" alt="LSTM Cell State Highway" />
    <div class="image-caption">Cell State hoạt động như "băng chuyền": thông tin chạy xuyên suốt, chỉ bị thay đổi tại các trạm (Xóa bớt và Thêm mới)</div>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>Hidden State ($h_t$)</th>
        <th>Cell State ($C_t$)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vai trò</strong></td>
        <td>"Trí nhớ ngắn hạn" — output hiện tại</td>
        <td>"Trí nhớ dài hạn" — lưu trữ lâu dài</td>
      </tr>
      <tr>
        <td><strong>Phạm vi giá trị</strong></td>
        <td>$[-1, 1]$ (qua tanh)</td>
        <td>Bất kỳ giá trị nào (không bị nén)</td>
      </tr>
      <tr>
        <td><strong>Cách cập nhật</strong></td>
        <td>$h_t = o_t \\odot \\tanh(C_t)$ — lọc từ Cell State</td>
        <td>$C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$ — cộng/xóa chọn lọc</td>
      </tr>
      <tr>
        <td><strong>Gradient flow</strong></td>
        <td>Vẫn đi qua tanh → có thể vanish</td>
        <td>Đi qua phép cộng (+) → gradient flow ổn định</td>
      </tr>
    </tbody>
  </table>

  <h2>2. Vũ khí cốt lõi: Phép nhân Element-wise (⊙)</h2>

  <p>Một trong những khác biệt chết người giữa LSTM và mạng Neural chập truyền thống là việc lạm dụng phép nhân <strong>Element-wise (⊙)</strong> (nhân từng phần tử). Nó khác hoàn toàn với nhân ma trận ($\\cdot$).</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Nhân Ma Trận ($\\cdot$)</h4>
      <p>Hàng nhân cột, kích thước bộ khung bị biến đổi theo chuẩn Đại số tuyến tính.</p>
      <p class="font-mono">$A_{(2 \\times 3)} \\cdot B_{(3 \\times 2)} = C_{(2 \\times 2)}$</p>
    </div>
    <div class="concept-card">
      <h4>Nhân Element-wise (⊙)</h4>
      <p>Nhân từng phần tử ở cùng một vị trí với nhau. Kích thước giữ nguyên y xì đúc.</p>
      <p class="font-mono">$A_{(3 \\times 1)} \\odot B_{(3 \\times 1)} = C_{(3 \\times 1)}$</p>
    </div>
  </div>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <pre><code>[0.8]        [0.3]     [0.8 × 0.3]     [0.24]
[0.2]   ⊙    [0.9]  =  [0.2 × 0.9]  =  [0.18]
[0.6]        [0.1]     [0.6 × 0.1]     [0.06]</code></pre>
  </div>

  <h3>Tại sao LSTM lại cần phép toán này?</h3>

  <p>Bởi vì phép ⊙ cho phép <em>mỗi Node nội tại tự do quyết định mức độ sinh tử</em> độc lập với nhau, không nhồi nhét chung chạ. Một cổng (VD: Forget Gate) sẽ sinh ra vector $f^{(t)} \\in (0,1)$. Khi nhân Element-wise với trí nhớ cũ, mỗi chiều dữ liệu sẽ được giữ lại theo đúng tỷ lệ tương ứng (90%, 10%, 80%...). Điều này tạo ra sức mạnh thanh lọc trí nhớ cục bộ cực tốt!</p>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tại sao Cell State giải quyết Vanishing Gradient?</span>
      <p>$\\frac{\\partial C_t}{\\partial C_{t-1}} = f_t$ (chỉ nhân scalar Element-wise).
      <br/>Gradient flow qua Cell State chỉ bị nhân với forget gate $f_t$. Khi $f_t \\approx 1$ ("nhớ hết"), gradient chảy qua hầu như nguyên vẹn, không bị triệt tiêu bởi ma trận $W_{hh}$ như Vanilla RNN.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: FORGET GATE
  // ==========================================================
  {
    id: 'ch22_04_03',
    title: '3. Forget Gate — Cổng Quên (Xóa bộ nhớ cũ)',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Forget Gate ($f_t$) — Quyết định tẩy xóa tờ giấy</h2>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Forget Gate:</h4>
    <p class="font-mono text-lg">$f^{(t)} = \\sigma(W_f \\cdot [h^{(t-1)}, x^{(t)}] + b_f)$</p>
    <p>Trong đó:</p>
    <ul>
      <li>$[h^{(t-1)}, x^{(t)}]$: concat hidden state cũ và input hiện tại → vector (H+D) chiều</li>
      <li>$W_f$: ma trận trọng số shape (H, H+D)</li>
      <li>$\\sigma$: hàm sigmoid → bóp cong không gian về $(0, 1)$</li>
    </ul>
  </div>

  <h3>3.1. Tại sao không dùng Tanh mà ép xài Sigmoid?</h3>

  <p>Hàm $\\sigma(x)$ bóp mọi giá trị về trục $(0, 1)$. Chừng nào nhân với một số nằm từ $0$ đến $1$, bạn đang xử lý khái niệm <strong>tỷ lệ (%) sống sót</strong>.</p>
  <ul>
    <li>$f_i = 1$: Lệnh <em>Giữ lại nguyên văn 100%</em> thông tin Node đó.</li>
    <li>$f_i = 0$: Hệ thống giáng búa <em>Tẩy trắng toàn bộ</em> trí nhớ tại không gian đó.</li>
    <li>$f_i = 0.5$: Giữ một nửa thông tin (bắt đầu mờ nhạt dần).</li>
  </ul>

  <h3>3.2. Áp dụng vào Cell State bằng Element-wise</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Sức mạnh của quyền tự quyết rành mạch</span>
    <p>Cột $f^{(t)} \\in (0, 1)$ là vector tỉ lệ sống, cột $c^{(t-1)}$ là bộ nhớ cũ.</p>
    <pre><code>f^(t)   = [0.9, 0.1,  0.8]  (Bộ lọc Forget Gate)
c^(t-1) = [0.5, 0.4,  0.3]  (Trí nhớ cũ)
--------------------------------------
Kết quả = [0.45, 0.04, 0.24]</code></pre>
    <ul class="list-disc pl-6 mt-2">
      <li><strong>Node 1:</strong> Vector $f$ cho $0.9$ $\\to$ Xóa ít. Trữ lại tận 90% thông tin cũ.</li>
      <li><strong>Node 2:</strong> Vector $f$ cho $0.1$ $\\to$ Quét sạch. Quên xấp xỉ 90% thông tin cũ. Trí nhớ bị làm mờ (chỉ còn $0.04$).</li>
    </ul>
  </div>

  <h3>3.3. Ví dụ NLP thực tế</h3>

  <div class="definition-block">
    <span class="definition-term">Ví dụ: Chuyển đổi chủ ngữ trong câu</span>
    <p>Câu: <em>"<strong>Anh ấy</strong> là bác sĩ. <strong>Cô ấy</strong> là kỹ sư. <strong>Cô ấy</strong> giỏi về ___."</em></p>
    <ul>
      <li>Đọc "Anh ấy là bác sĩ": Cell State lưu {chủ ngữ = "Anh ấy", nghề = "bác sĩ"}</li>
      <li>Gặp "Cô ấy": Forget Gate kích hoạt với $f_t \\approx 0$ tại ô "chủ ngữ cũ" → <strong>quên "Anh ấy" ngay lập tức</strong> để dọn đường cho chủ ngữ mới.</li>
    </ul>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Forget Gate là phát minh sau, không phải ban đầu</span>
      <p>LSTM nguyên bản năm 1997 của Hochreiter & Schmidhuber <strong>không có Forget Gate</strong>! Trước đó, Cell State chỉ có tăng (thêm thông tin) mà không bao giờ xóa → bộ nhớ bị đầy ứ đọng. Forget Gate giải quyết hoàn toàn vấn đề này.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: INPUT GATE
  // ==========================================================
  {
    id: 'ch22_04_04',
    title: '4. Input Gate — Cổng Nhận Thông Tin Mới',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Input Gate ($i_t$) — Ghi đè lên Tờ giấy</h2>

  <p>Sau khi tẩy bớt thông tin thừa tốn chỗ trên tờ giấy nhớ bằng Forget Gate. Mạng quyết định viết dữ liệu mới vào bằng sự phối hợp <strong>2 bước (2 công thức)</strong>:</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono text-lg mb-2">1. $i^{(t)} = \\sigma(W_i \\cdot [h^{(t-1)}, x^{(t)}] + b_i)$</p>
    <p class="font-mono text-lg mb-2">2. $g^{(t)} = \\tanh(W_g \\cdot [h^{(t-1)}, x^{(t)}] + b_g)$ <em>(Hay $\\tilde{C}_t$)</em></p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thành phần phối hợp</th>
        <th>Hỏi đáp nhanh</th>
        <th>Bản chất ví von</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$g^{(t)}$ (dùng hàm Tanh $[-1,1]$)</strong></td>
        <td>Thông tin mới tiềm năng muốn ghi vào là gì?</td>
        <td>Giống như <strong>Lượng mực mới (Nội dung)</strong>, có mang ý nghĩa phủ định/khẳng định. Có thể tăng hoặc giảm cell state.</td>
      </tr>
      <tr>
        <td><strong>$i^{(t)}$ (dùng hàm Sigmoid $[0,1]$)</strong></td>
        <td>Nên cập nhật ô này không? Trọng số bao nhiêu?</td>
        <td>Giống như <strong>Đầu Bút ghi (Biên tập viên)</strong> — nét thanh nét đậm quyết định nhả mực hay cất mực.</td>
      </tr>
    </tbody>
  </table>

  <h3>Luồng ghi nháp phối hợp ($i \\odot g$)</h3>

  <div class="definition-block mb-4">
    <pre><code>g^(t) = [ 0.7, -0.4,  0.9]  ← Lượng Mực Tanh (Điều muốn viết)
i^(t) = [ 0.9,  0.1,  0.5]  ← Lực Đè Bút Sigmoid (Duyệt 90%, 10%, 50%)
--------------------------
i ⊙ g = [0.63, -0.04, 0.45] ← Nét chữ thực sự in hằn xuống giấy</code></pre>
  </div>

  <h2>Cập nhật Công thức trọn vẹn của Cell State</h2>
  
  <p>Bằng cách Gọt dũi (Forget) xong lại Bồi Ghi (Input), ta có trang Cell State ($c^{(t)}$) hoàn hảo mới toanh:</p>

  <div class="formula-block text-center my-4 p-4 bg-yellow-50 border-yellow-300">
    <p class="font-mono text-lg">$\\text{Cell Update: } c^{(t)} = \\underbrace{f^{(t)} \\odot c^{(t-1)}}_{\\text{Thông tin cũ còn giữ}} + \\underbrace{i^{(t)} \\odot g^{(t)}}_{\\text{Thông tin mới ghi đè}}$</p>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 5: OUTPUT GATE
  // ==========================================================
  {
    id: 'ch22_04_05',
    title: '5. Output Gate — Cổng Xuất',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Output Gate ($o_t$) — Thiết lập dòng bộ nhớ ngắn hạn</h2>

  <p>Cell State $C_t$ chứa <strong>toàn bộ thông tin</strong> đã tích lũy. Nhưng không phải tất cả đều cần thiết cho Output hoặc Hidden State hiện tại. Output Gate ra đời để giới hạn <strong>"Ai cần biết cái gì thì lộ cái đó"</strong>.</p>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono text-lg mb-2">1. Output Gate: $o^{(t)} = \\sigma(W_o \\cdot [h^{(t-1)}, x^{(t)}] + b_o)$</p>
    <p class="font-mono text-lg">2. Hidden State: $h^{(t)} = o^{(t)} \\odot \\tanh(c^{(t)})$</p>
  </div>

  <h3>Hai bước rành mạch của Cổng báo cáo</h3>

  <div class="definition-block mb-4">
    <span class="definition-term">Bước 1: Tự hỏi nên "đọc" bao nhiêu? ($o_t$)</span>
    <p>Thuật toán ép qua hàm $\\sigma$ đẩy ra tỉ lệ xuất kho cho việc báo cáo hiện hành.</p>
    <pre><code>o^(t) = [0.8, 0.3, 0.6]  ← Quyết định mở miệng tỷ lệ (0,1)</code></pre>
    
    <span class="definition-term mt-4">Bước 2: Nắn nót lại băng chuyền và xuất bản ($h_t$)</span>
    <p>Băng chuyền $c^{(t)}$ là mớ hỗn lộn cộng/nhân quá nhiều chưa chuẩn hóa. Bước này ép toàn tập Cell State đi qua $\\tanh$ để gò lại toàn bộ dao động $\\in (-1, 1)$. Sau đó nhân chặn tỉ lệ $o^{(t)}$ để tuôn ra $h^{(t)}$ cuối cùng.</p>
    <pre><code>c^(t)       = [1.08, 0.00, 0.69]  (Memory gốc nguyên bản)
tanh(c^(t)) = [0.79, 0.00, 0.60]  (Sau khi gò biên độ)

h^(t) = o ⊙ tanh(c)
      = [0.8 × 0.79, 0.3 × 0.00, 0.6 × 0.60]
      = [0.63,       0.00,       0.36]       ← THÔNG TIN DUY NHẤT LỘ RA NGOÀI</code></pre>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">$h_t$ vs $C_t$: Ai mới thực sự là "output"?</span>
      <p><strong>$h_t$</strong> (hidden state) mới là output thực sự — nó được dùng để tính dự đoán VÀ truyền sang nhánh ngắn hạn. <strong>$C_t$</strong> (cell state) là bộ nhớ nội bộ — nó <em>không</em> nhúng tay tạo prediction trực tiếp, nó chỉ băng ngang qua thời gian để duy trì "trí nhớ dài hạn".</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 6: MỔ XẺ SƠ ĐỒ MẠCH
  // ==========================================================
  {
    id: 'ch22_04_06',
    title: '6. Mổ xẻ chi tiết Sơ Đồ Cấu Trúc Khối LSTM',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>6. Tất cả những thứ đồ sộ vừa học, Nằm gọn trong CHỈ 1 NODE!</h2>

  <p>Lý do LSTM bị chê vì nó quá nặng cân nằm ở đây! Khác với RNN truyền thống (Input chui vào, điệu đà uốn lượn 1 cái qua hàm tanh rơi cắc bùm rác chữ ra output). <strong>Mỗi một Node LSTM là một cái Nhà máy Công nghiệp thu nhỏ!</strong></p>

  <div class="image-showcase">
    <img src="/images/ch22/lstm_cell_diagram.png" alt="LSTM Cell Architecture Diagram" />
    <div class="image-caption">Hình vẽ mô tả lõi của 1 khối LSTM Node. Chìa khóa hiểu hình nằm ở các luồng đứt gãy.</div>
  </div>

  <h3>Giải mã Từng góc trong Sơ đồ khối:</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4 class="text-blue-600">Luồng đi và Đầu vào</h4>
      <p>Bên trái đi vào có $C^{(t-1)}$ chạy đường trên thả lỏng (Long-term highway) và $h^{(t-1)}$ cộng $x^{(t)}$ đâm dưới đáy (Short-term data) đưa vào xưởng lắp rắp.</p>
    </div>
    <div class="concept-card">
      <h4 class="text-red-600">Vùng Đỏ — Trạm Forget</h4>
      <p>Hàm $\\sigma$ vươn ra cái vòi nhân chặn $X$ thẳng vào lòng cao tốc $C^{(t-1)}$. Nếu $\\sigma$ nhả mức 0, luồng thông tin đường trục Bắc Nam lập tức bị Cắt Khứ Hồi!</p>
    </div>
    <div class="concept-card">
      <h4 class="text-green-600">Vùng Xanh Lá — Trạm Input ($i_t$ và $g_t$)</h4>
      <p>Hai luồng đi qua hàm $\\sigma$ (quyết định ghi) và $\\tanh$ (lượng mực mới), sau đó nhân Element-wise với nhau $\\rightarrow i_t \\odot g_t$. Đây là lượng thông tin ròng tươi mới chuẩn bị chèn.</p>
    </div>
    <div class="concept-card">
      <h4 class="text-yellow-600">Vùng Vàng — Cập nhật Cell State</h4>
      <p>Băng chuyền cũ $C^{(t-1)}$ sau khi đi qua Vùng Đỏ bị lọc rơi vãi bớt, tiến đến Vùng Vàng được đâm thẳng đứng bằng dấu cộng ($+$) với dòng Vùng Xanh Lá $\\rightarrow$ Ra lò Cell State mới $C^{(t)}$!</p>
    </div>
    <div class="concept-card">
      <h4 class="text-purple-600">Vùng Xanh Dương — Trạm Output</h4>
      <p>Băng chuyền chạy đến cuối, tạt té qua phép lượn $\\tanh$ xuống dưới, gặp $\\sigma$ Output bóp nghẹt 1 phát, sản phẩm hoàn thiện rớt rụng ra bộ nhớ ẩn hiện tại $h^{(t)}$!</p>
    </div>
  </div>

  <h3>Bảng Kích thước và Tỉ lệ Scale Parameter</h3>

  <p>Giả sử: Input dim = D, Hidden dim = H:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thành phần</th>
        <th>Shape</th>
        <th>Số parameters</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$W_f, W_i, W_g, W_o$</strong></td>
        <td>(H, H+D)</td>
        <td>4 × [H × (H+D)]</td>
      </tr>
      <tr>
        <td><strong>$b_f, b_i, b_g, b_o$</strong></td>
        <td>(H,) × 4</td>
        <td>4H</td>
      </tr>
      <tr>
        <td><strong>TỔNG</strong></td>
        <td>—</td>
        <td><strong>4 × [H(H+D) + H] = 4 × params_RNN_cell</strong></td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Gấp 4 lần khốn khổ</span>
      <p>Mỗi Node LSTM có bộ máy riêng, với bộ 4 ma trận Parameter to chà bá. LSTM vác trên mình thể trọng <strong>Gấp 4 Lần</strong> RNN truyền thống. Chạy cực chậm, tốn RAM, nhưng nó bao trọn khả năng đọc hiểu Long-range dependency tuyệt đỉnh thế kỷ.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// 1. MINH HỌA CƠ BẢN: THUẬT TOÁN TỜ GIẤY CỦA LSTM 1 NODE
// =====================================================

fn sigmoid(x: f64) -> f64 {
    1.0 / (1.0 + (-x).exp())
}

fn simulate_paper_algorithm() {
    println!("=== GÓC MINH HỌA GIẢ LẬP TRANG GIẤY LSTM (ELEMENT-WISE) ===");
    
    // Tỉ lệ do các cổng Sigmoid & Tanh nhả ra (Mô phỏng 1 forward pass)
    let f_gate = vec![0.9, 0.1, 0.8]; // Forget: Giữ quên bao nhiêu
    let i_gate = vec![0.9, 0.1, 0.5]; // Lực bút đè Input
    let c_old  = vec![0.5, 0.4, 0.3]; // Bộ nhớ siêu dài cũ
    
    let g_new  = vec![0.7, -0.4, 0.9]; // Tanh: Nội dung muốn chèn
    let o_gate = vec![0.8, 0.3, 0.6]; // Output: Quyết bao nhiêu nói ra
    
    let erased_memory: Vec<f64> = f_gate.iter().zip(&c_old).map(|(f, c)| f * c).collect();
    let new_ink: Vec<f64> = i_gate.iter().zip(&g_new).map(|(i, g)| i * g).collect();
    let c_new: Vec<f64> = erased_memory.iter().zip(&new_ink).map(|(old, new)| old + new).collect();
    let h_new: Vec<f64> = o_gate.iter().zip(&c_new).map(|(o, c)| o * c.tanh()).collect();
        
    println!("Trí nhớ cũ c^(t-1):   {:?}", c_old);
    println!("Sau khi Forget tẩy:   {:?}", erased_memory);
    println!("Sau khi Mực mới chèn: {:?}", c_new);
    println!("-----------------------------------------------");
    println!("Thông tin Hé Lộ ra Ngoài h^(t): {:?}", h_new);
    println!("\\n=>>> Node thứ 2 bị Forget (0.1), Input (0.1) -> Xóa gần sạch (-> {:.1}) và hé lộ Output đúng bằng 0.0!\\n", h_new[1]);
}

// =====================================================
// 2. LSTM FORWARD PASS ĐẦY ĐỦ — TÍNH TAY TỪNG BƯỚC
// =====================================================
// Input dim D=2, Hidden dim H=3
// Tính qua 3 bước thời gian: x_1, x_2, x_3
// =====================================================

fn main() {
    simulate_paper_algorithm();
    
    let d = 2;  // Input dimension
    let h = 3;  // Hidden dimension
    
    // Input sequence (3 bước)
    let inputs = vec![
        vec![1.0, 0.5],   // x_1
        vec![0.3, 0.8],   // x_2
        vec![0.7, 0.2],   // x_3
    ];
    
    // Forget gate weights (H, H+D)
    let w_f = vec![
        0.1, -0.1, 0.2, 0.3, -0.1,
        0.2,  0.1, 0.0, 0.1,  0.2,
       -0.1,  0.3, 0.1, 0.2,  0.0,
    ];
    let b_f = vec![1.0, 1.0, 1.0]; // Bias cao → mặc định "nhớ"
    
    // Input gate weights
    let w_i = vec![
        0.2, 0.1, -0.1, 0.0,  0.3,
       -0.1, 0.2,  0.1, 0.3, -0.2,
        0.0, 0.1,  0.2, 0.1,  0.1,
    ];
    let b_i = vec![0.0, 0.0, 0.0];
    
    // Candidate weights
    let w_c = vec![
        0.3, -0.2, 0.1,  0.2,  0.0,
        0.1,  0.3, 0.0, -0.1,  0.2,
       -0.2,  0.1, 0.3,  0.1, -0.1,
    ];
    let b_c = vec![0.0, 0.0, 0.0];
    
    // Output gate weights
    let w_o = vec![
       -0.1, 0.2, 0.1, 0.3,  0.0,
        0.1, 0.0, 0.2, 0.1, -0.1,
        0.2, 0.1, 0.0, 0.2,  0.3,
    ];
    let b_o = vec![0.0, 0.0, 0.0];
    
    // Initial states
    let mut h_prev = vec![0.0_f64; h];
    let mut c_prev = vec![0.0_f64; h];
    
    println!("╔══════════════════════════════════════════════════════╗");
    println!("║           LSTM FORWARD PASS — STEP BY STEP          ║");
    println!("║         D={}, H={}, T={}                              ║", d, h, inputs.len());
    println!("╠══════════════════════════════════════════════════════╣");
    
    for (t, x) in inputs.iter().enumerate() {
        // Concat [h_(t-1), x_t]
        let mut concat = h_prev.clone();
        concat.extend_from_slice(x);
        
        // Helper: matmul W·concat + b
        let gate = |w: &[f64], b: &[f64]| -> Vec<f64> {
            let mut out = vec![0.0; h];
            for i in 0..h {
                for j in 0..concat.len() {
                    out[i] += w[i * concat.len() + j] * concat[j];
                }
                out[i] += b[i];
            }
            out
        };
        
        let f: Vec<f64> = gate(&w_f, &b_f).iter().map(|&v| sigmoid(v)).collect();
        let i_g: Vec<f64> = gate(&w_i, &b_i).iter().map(|&v| sigmoid(v)).collect();
        let c_tilde: Vec<f64> = gate(&w_c, &b_c).iter().map(|&v| v.tanh()).collect();
        let c_new: Vec<f64> = (0..h).map(|k| f[k] * c_prev[k] + i_g[k] * c_tilde[k]).collect();
        let o: Vec<f64> = gate(&w_o, &b_o).iter().map(|&v| sigmoid(v)).collect();
        let h_new: Vec<f64> = (0..h).map(|k| o[k] * c_new[k].tanh()).collect();
        
        println!("║");
        println!("║  ━━━ t={} ━━━  x = [{:.1}, {:.1}]", t + 1, x[0], x[1]);
        println!("║  f_t     = [{:.4}, {:.4}, {:.4}]", f[0], f[1], f[2]);
        println!("║  i_t     = [{:.4}, {:.4}, {:.4}]", i_g[0], i_g[1], i_g[2]);
        println!("║  C̃_t     = [{:.4}, {:.4}, {:.4}]", c_tilde[0], c_tilde[1], c_tilde[2]);
        println!("║  C_t     = [{:.4}, {:.4}, {:.4}]", c_new[0], c_new[1], c_new[2]);
        println!("║  o_t     = [{:.4}, {:.4}, {:.4}]", o[0], o[1], o[2]);
        println!("║  h_t     = [{:.4}, {:.4}, {:.4}]", h_new[0], h_new[1], h_new[2]);
        
        h_prev = h_new;
        c_prev = c_new;
    }
    
    println!("║");
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  Final h_T = [{:.4}, {:.4}, {:.4}]", h_prev[0], h_prev[1], h_prev[2]);
    println!("║  Final C_T = [{:.4}, {:.4}, {:.4}]", c_prev[0], c_prev[1], c_prev[2]);
    println!("║  b_f = [1,1,1] → f_t gần 1 → LSTM mặc định \\\"nhớ\\\"");
    println!("╚══════════════════════════════════════════════════════╝");
}`
  },
  // ==========================================================
  // LESSON 7: TÓM TẮT
  // ==========================================================
  {
    id: 'ch22_04_07',
    title: '7. Tóm tắt Bài 22.4',
    duration: '5 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <div class="key-takeaway">
    <h3>Tóm tắt Bài 22.4 — LSTM: Bộ Nhớ Dài-Ngắn Hạn</h3>
    <ul>
      <li><strong>Cell State ($C_t$):</strong> "Đường cao tốc thông tin / Băng chuyền Tờ Giấy" — chạy xuyên suốt chuỗi, gradient flow ổn định nhờ phép cộng và Element-wise.</li>
      <li><strong>Vũ khí Element-wise:</strong> Cho phép từng chiều không gian tự quyết định tỉ lệ sinh tử của nó một cách độc lập không ràng buộc chéo.</li>
      <li><strong>Forget Gate ($f_t$):</strong> $\\sigma(W_f \\cdot [h, x] + b_f)$ — Trách nhiệm cầm cục Tẩy xóa chữ trên tờ giấy.</li>
      <li><strong>Input Gate ($i_t$ & $g_t$):</strong> Trách nhiệm cầm Bút chèn Thông tin. Có lực Tanh ($\\pm$ mực) và lực Sigmoid (Đầu bút đè).</li>
      <li><strong>Output Gate ($o_t$):</strong> Lọc lượng thông tin sẽ khai báo làm Hidden Output $h_t$ cho ván cờ hiện tại.</li>
      <li><strong>Params:</strong> LSTM có 4× params so với Vanilla RNN → To chà bá nhưng Trí khôn vượt bậc.</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Bài tiếp theo</span>
      <p>Bài 22.5 sẽ giới thiệu <strong>GRU (Gated Recurrent Unit)</strong> — phiên bản thu gọn của LSTM: gộp Forget + Input Gate thành Update Gate, bỏ Cell State riêng biệt để giảm rườm rà và tiết kiệm RAM, lấy lại cảm giác train Fast and Furious!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_04: Chapter = {
  id: 'ch22_04',
  title: '22.4. LSTM — Bộ Nhớ Dài-Ngắn Hạn (Long Short-Term Memory)',
  introduction: 'Trải nghiệm mổ xẻ từ Vấn Đề đứt gãy kỉ niệm đến giải pháp Tờ Giấy Ghi Chú cực ranh mãnh của LSTM. Nắm rõ Element-wise, 4 bộ Vệ Sĩ (Gates) và sức mạnh chịu đòn của Cell State.',
  lessons: ch22_04_lessons,
};

export default ch22_04;
