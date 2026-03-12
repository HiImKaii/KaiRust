import { Lesson, Chapter } from '../../courses';

const ch22_04_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: MOTIVATION — TẠI SAO CẦN LSTM?
  // ==========================================================
  {
    id: 'ch22_04_01',
    title: '1. Tại sao cần LSTM?',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Motivation — Tại sao cần LSTM?</h2>

  <p>Bài 22.3 đã chứng minh Vanilla RNN bị <strong>Vanishing Gradient</strong>: gradient triệt tiêu theo cấp số nhân khi chuỗi dài → RNN "quên" thông tin xa. <strong>LSTM (Long Short-Term Memory)</strong> được thiết kế bởi <strong>Hochreiter & Schmidhuber (1997)</strong> đặc biệt để giải quyết vấn đề này.</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Vanilla RNN — Không ghi chép</h4>
      <p>Giống như đọc sách <strong>không ghi chú</strong>. Đọc xong chương 1, đến chương 10 đã quên hết nội dung chương 1. Thông tin chỉ tồn tại trong "trí nhớ ngắn hạn" ($h_t$), bị ghi đè liên tục qua mỗi bước.</p>
    </div>
    <div class="concept-card">
      <h4>LSTM — Có sổ ghi chép</h4>
      <p>Giống như đọc sách <strong>có ghi chú vào sổ tay</strong>. Mỗi chương, bạn quyết định: (1) <strong>xóa</strong> ghi chú cũ không còn quan trọng, (2) <strong>thêm</strong> ghi chú mới, (3) <strong>đọc lại</strong> ghi chú khi cần. Sổ tay này là <strong>Cell State</strong>.</p>
    </div>
  </div>

  <h3>1.1. Ý tưởng thiết kế</h3>

  <div class="definition-block">
    <span class="definition-term">LSTM giải quyết Vanishing Gradient bằng cách nào?</span>
    <p>LSTM thêm một "đường cao tốc thông tin" gọi là <strong>Cell State ($C_t$)</strong> chạy xuyên suốt chuỗi. Thông tin trên đường cao tốc này chỉ bị thay đổi bởi các phép <strong>nhân element-wise (⊙)</strong> và <strong>cộng (+)</strong> — không nhân ma trận → gradient chảy qua dễ dàng, không bị vanish.</p>
    <p>Thêm 3 "cổng" (gate) để kiểm soát dòng thông tin:</p>
    <ul>
      <li><strong>Forget Gate ($f_t$):</strong> Quyết định <strong>xóa</strong> gì khỏi bộ nhớ</li>
      <li><strong>Input Gate ($i_t$):</strong> Quyết định <strong>thêm</strong> gì vào bộ nhớ</li>
      <li><strong>Output Gate ($o_t$):</strong> Quyết định <strong>xuất</strong> gì từ bộ nhớ</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: CELL STATE
  // ==========================================================
  {
    id: 'ch22_04_02',
    title: '2. Cell State — Con đường cao tốc thông tin',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Cell State ($C_t$) — Con đường cao tốc thông tin</h2>

  <div class="image-showcase">
    <img src="/images/ch22/lstm_cell_state_highway.png" alt="LSTM Cell State Highway" />
    <div class="image-caption">Cell State hoạt động như "băng chuyền": thông tin chạy xuyên suốt, chỉ bị thay đổi tại 2 trạm: Forget Station (xóa bớt) và Add Station (thêm mới)</div>
  </div>

  <h3>2.1. Cell State vs Hidden State</h3>

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
      <tr>
        <td><strong>Tương tự</strong></td>
        <td>Lời nói hiện tại (output)</td>
        <td>Sổ ghi chép (long-term storage)</td>
      </tr>
    </tbody>
  </table>

  <h3>2.2. Tại sao Cell State giải quyết Vanishing Gradient?</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Gradient qua Cell State:</h4>
    <p class="font-mono text-lg">$\\frac{\\partial C_t}{\\partial C_{t-1}} = f_t$</p>
    <p>Gradient qua Cell State chỉ bị nhân với <strong>forget gate $f_t$</strong> (giá trị 0~1). Khi $f_t \\approx 1$ (nghĩa là "nhớ hết"), gradient chảy qua <strong>hầu như nguyên vẹn</strong>.</p>
  </div>

  <p>So sánh với Vanilla RNN:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Vanilla RNN</h4>
      <p>$\\frac{\\partial h_t}{\\partial h_{t-1}} = \\text{diag}(1 - h_t^2) \\cdot W_{hh}$</p>
      <p>Gradient phải nhân qua <strong>cả ma trận $W_{hh}$</strong> lẫn đạo hàm tanh → dễ vanish/explode.</p>
    </div>
    <div class="concept-card">
      <h4>LSTM Cell State</h4>
      <p>$\\frac{\\partial C_t}{\\partial C_{t-1}} = f_t$ (chỉ nhân scalar)</p>
      <p>Gradient chỉ nhân với <strong>một giá trị scalar $f_t$</strong>, không nhân ma trận → gradient flow ổn định hơn rất nhiều lần.</p>
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
    title: '3. Forget Gate — Cổng Quên',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Forget Gate ($f_t$) — Quyết định "quên" gì</h2>

  <div class="image-showcase">
    <img src="/images/ch22/lstm_cell_diagram.png" alt="LSTM Cell Architecture" />
    <div class="image-caption">Kiến trúc đầy đủ LSTM Cell: Cell State chạy ngang ở trên, 3 cổng (Forget, Input, Output) điều khiển dòng thông tin</div>
  </div>

  <h3>3.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Forget Gate:</h4>
    <p class="font-mono text-lg">$f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)$</p>
    <p>Trong đó:</p>
    <ul>
      <li>$[h_{t-1}, x_t]$: concat hidden state cũ và input hiện tại → vector (H+D) chiều</li>
      <li>$W_f$: ma trận trọng số shape (H, H+D)</li>
      <li>$b_f$: bias shape (H,)</li>
      <li>$\\sigma$: hàm sigmoid → output mỗi phần tử ∈ (0, 1)</li>
    </ul>
  </div>

  <h3>3.2. Ý nghĩa từng giá trị</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Giá trị $f_t$</th>
        <th>Ý nghĩa</th>
        <th>Ví dụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$f_t \\approx 0$</strong></td>
        <td>Quên hoàn toàn $C_{t-1}$</td>
        <td>Sang chủ đề mới, thông tin cũ không liên quan</td>
      </tr>
      <tr>
        <td><strong>$f_t \\approx 1$</strong></td>
        <td>Nhớ toàn bộ $C_{t-1}$</td>
        <td>Thông tin vẫn quan trọng, cần giữ lại</td>
      </tr>
      <tr>
        <td><strong>$f_t \\approx 0.5$</strong></td>
        <td>Giữ một nửa thông tin</td>
        <td>Thông tin dần trở nên ít quan trọng</td>
      </tr>
    </tbody>
  </table>

  <h3>3.3. Ví dụ NLP</h3>

  <div class="definition-block">
    <span class="definition-term">Ví dụ: Chuyển đổi chủ ngữ trong câu</span>
    <p>Câu: <em>"<strong>Anh ấy</strong> là bác sĩ. <strong>Cô ấy</strong> là kỹ sư. <strong>Cô ấy</strong> giỏi về ___."</em></p>
    <ul>
      <li>Khi đọc "Anh ấy là bác sĩ": Cell State lưu {chủ ngữ = "Anh ấy", nghề = "bác sĩ"}</li>
      <li>Khi gặp "Cô ấy là kỹ sư": Forget Gate kích hoạt với $f_t \\approx 0$ cho ô "chủ ngữ cũ" → <strong>quên "Anh ấy"</strong></li>
      <li>Input Gate đồng thời <strong>ghi "Cô ấy"</strong> vào vị trí chủ ngữ</li>
      <li>Khi dự đoán "___": Output Gate đọc Cell State → biết chủ ngữ hiện tại là "Cô ấy", nghề "kỹ sư" → dự đoán liên quan đến kỹ sư</li>
    </ul>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Forget Gate là phát minh sau, không phải ban đầu</span>
      <p>LSTM nguyên bản năm 1997 của Hochreiter & Schmidhuber <strong>không có Forget Gate</strong>! Nó được thêm vào năm 2000 bởi <strong>Gers, Schmidhuber, & Cummins</strong>. Trước đó, Cell State chỉ tăng (thêm thông tin) mà không bao giờ xóa → bộ nhớ bị đầy. Forget Gate giải quyết vấn đề này và trở thành tiêu chuẩn.</p>
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
    title: '4. Input Gate — Cổng Nhập',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Input Gate ($i_t$) — Quyết định "thêm" gì vào bộ nhớ</h2>

  <p>Input Gate gồm <strong>2 bước</strong>: (1) quyết định <em>cập nhật ô nào</em>, (2) tạo <em>giá trị mới</em> để đưa vào.</p>

  <h3>4.1. Bước 1 — Input Gate Vector ($i_t$)</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono text-lg">$i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i)$</p>
    <p>Tương tự Forget Gate: sigmoid → output ∈ (0, 1). Mỗi phần tử $i_t$ quyết định "ô nhớ này có cần cập nhật không?"</p>
  </div>

  <h3>4.2. Bước 2 — Candidate Cell State ($\\tilde{C}_t$)</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <p class="font-mono text-lg">$\\tilde{C}_t = \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C)$</p>
    <p>tanh → output ∈ (-1, 1). Đây là "thông tin mới tiềm năng" chờ được lọc bởi $i_t$.</p>
  </div>

  <h3>4.3. Cập nhật Cell State</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Cell State Update:</h4>
    <p class="font-mono text-lg">$C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$</p>
    <p>Gồm 2 phần:</p>
    <ul>
      <li>$f_t \\odot C_{t-1}$: Giữ lại phần cũ (đã lọc bởi Forget Gate)</li>
      <li>$i_t \\odot \\tilde{C}_t$: Thêm phần mới (đã lọc bởi Input Gate)</li>
    </ul>
  </div>

  <h3>4.4. Tại sao cần 2 bước riêng biệt?</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>$i_t$ (sigmoid) — "Nên cập nhật không?"</h4>
      <p>Trả lời câu hỏi: <em>ô nhớ này có cần thay đổi không?</em></p>
      <p>$i_t = 0$: không cần cập nhật ô này</p>
      <p>$i_t = 1$: cần cập nhật ô này</p>
      <p><strong>Vai trò:</strong> Lọc / chọn lọc — giống "người gác cổng"</p>
    </div>
    <div class="concept-card">
      <h4>$\\tilde{C}_t$ (tanh) — "Cập nhật giá trị gì?"</h4>
      <p>Trả lời câu hỏi: <em>giá trị mới là bao nhiêu?</em></p>
      <p>Output ∈ (-1, 1): có thể tăng hoặc giảm cell state</p>
      <p><strong>Vai trò:</strong> Tạo nội dung — giống "đề xuất nội dung mới"</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Ẩn dụ: Biên tập viên Wikipedia</span>
      <p><strong>$i_t$</strong> là biên tập viên quyết định <em>"Đoạn nào cần bổ sung?"</em>. <strong>$\\tilde{C}_t$</strong> là nội dung mới được viết ra. Chỉ những đoạn được biên tập viên "duyệt" ($i_t \\approx 1$) mới được thêm vào bài viết. Đoạn nào bị "từ chối" ($i_t \\approx 0$) thì nội dung tuy đã viết xong nhưng bị bỏ qua.</p>
    </div>
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
  <h2>5. Output Gate ($o_t$) — Quyết định "xuất" gì ra ngoài</h2>

  <p>Cell State $C_t$ chứa <strong>toàn bộ thông tin</strong> đã tích lũy. Nhưng không phải tất cả đều cần thiết cho output hiện tại. Output Gate quyết định <strong>phần nào</strong> của Cell State được "phát ra" làm hidden state $h_t$.</p>

  <h3>5.1. Công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Output Gate:</h4>
    <p class="font-mono text-lg">$o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o)$</p>
    <h4>Hidden State:</h4>
    <p class="font-mono text-lg">$h_t = o_t \\odot \\tanh(C_t)$</p>
    <p>Trong đó:</p>
    <ul>
      <li>$\\tanh(C_t)$: nén Cell State về [-1, 1] — chuẩn hóa giá trị</li>
      <li>$o_t$: lọc thêm — chọn phần nào được xuất ra</li>
      <li>$h_t$: hidden state cuối cùng — được dùng cho output hiện tại VÀ truyền sang bước tiếp theo</li>
    </ul>
  </div>

  <h3>5.2. Ví dụ NLP</h3>

  <div class="definition-block">
    <span class="definition-term">Ví dụ: Cell State chứa nhiều loại thông tin</span>
    <p>Câu: <em>"Con mèo đen, mà tôi đã nuôi từ nhỏ, đang ___"</em></p>
    <p>Cell State hiện tại chứa: {chủ ngữ = "mèo", màu = "đen", người nuôi = "tôi", thời gian = "từ nhỏ"}.</p>
    <p>Để dự đoán động từ tiếp theo, Output Gate chỉ cần xuất thông tin {chủ ngữ = "mèo"} (vì cần biết ai đang làm gì). Thông tin về "đen", "tôi", "từ nhỏ" <strong>vẫn nằm trong Cell State</strong> (không bị mất) nhưng không xuất ra lúc này.</p>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">$h_t$ vs $C_t$: Ai mới là "output"?</span>
      <p><strong>$h_t$</strong> (hidden state) mới là output thực sự — nó được dùng để tính $y_t$ (prediction) VÀ được truyền sang bước tiếp theo. <strong>$C_t$</strong> (cell state) là bộ nhớ nội bộ — nó <em>không</em> trực tiếp tạo prediction, chỉ truyền sang bước tiếp theo để duy trì "trí nhớ dài hạn".</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 6: TỔNG HỢP FORWARD PASS
  // ==========================================================
  {
    id: 'ch22_04_06',
    title: '6. LSTM Forward Pass — Tổng hợp toàn diện',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>6. LSTM Forward Pass — Toàn bộ 6 phương trình</h2>

  <h3>6.1. Tổng hợp công thức</h3>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>6 phương trình LSTM (thứ tự thực thi):</h4>
    <p class="font-mono text-lg">1. $f_t = \\sigma(W_f \\cdot [h_{t-1}, x_t] + b_f)$ &nbsp; <em>← Forget Gate</em></p>
    <p class="font-mono text-lg">2. $i_t = \\sigma(W_i \\cdot [h_{t-1}, x_t] + b_i)$ &nbsp; <em>← Input Gate</em></p>
    <p class="font-mono text-lg">3. $\\tilde{C}_t = \\tanh(W_C \\cdot [h_{t-1}, x_t] + b_C)$ &nbsp; <em>← Candidate</em></p>
    <p class="font-mono text-lg">4. $C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$ &nbsp; <em>← Cell State Update</em></p>
    <p class="font-mono text-lg">5. $o_t = \\sigma(W_o \\cdot [h_{t-1}, x_t] + b_o)$ &nbsp; <em>← Output Gate</em></p>
    <p class="font-mono text-lg">6. $h_t = o_t \\odot \\tanh(C_t)$ &nbsp; <em>← Hidden State</em></p>
  </div>

  <h3>6.2. Bảng kích thước (Shape Analysis)</h3>

  <p>Với Input dim = D, Hidden dim = H:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thành phần</th>
        <th>Shape</th>
        <th>Số parameters</th>
        <th>Ghi chú</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$W_f$</strong></td>
        <td>(H, H+D)</td>
        <td>H × (H+D)</td>
        <td>Forget gate weights</td>
      </tr>
      <tr>
        <td><strong>$W_i$</strong></td>
        <td>(H, H+D)</td>
        <td>H × (H+D)</td>
        <td>Input gate weights</td>
      </tr>
      <tr>
        <td><strong>$W_C$</strong></td>
        <td>(H, H+D)</td>
        <td>H × (H+D)</td>
        <td>Candidate weights</td>
      </tr>
      <tr>
        <td><strong>$W_o$</strong></td>
        <td>(H, H+D)</td>
        <td>H × (H+D)</td>
        <td>Output gate weights</td>
      </tr>
      <tr>
        <td><strong>$b_f, b_i, b_C, b_o$</strong></td>
        <td>(H,) × 4</td>
        <td>4H</td>
        <td>Bias cho 4 phép tính</td>
      </tr>
      <tr>
        <td><strong>TỔNG</strong></td>
        <td>—</td>
        <td><strong>4 × [H(H+D) + H]</strong></td>
        <td><strong>= 4 × params_RNN_cell</strong></td>
      </tr>
    </tbody>
  </table>

  <h3>6.3. So sánh số params: LSTM vs Vanilla RNN</h3>

  <p>Ví dụ: D = 256, H = 512:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Mô hình</th>
        <th>Công thức params</th>
        <th>Số params (D=256, H=512)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vanilla RNN</strong></td>
        <td>(H+D)×H + H</td>
        <td>768 × 512 + 512 = <strong>393,728</strong></td>
      </tr>
      <tr>
        <td><strong>LSTM</strong></td>
        <td>4 × [(H+D)×H + H]</td>
        <td>4 × 393,728 = <strong>1,574,912</strong></td>
      </tr>
      <tr>
        <td><strong>Tỷ lệ</strong></td>
        <td>—</td>
        <td>LSTM gấp <strong>4 lần</strong> RNN</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">LSTM tốn gấp 4× params nhưng đáng giá</span>
      <p>LSTM có <strong>4 bộ weights</strong> (cho 3 gate + 1 candidate) thay vì 1 bộ như RNN. Nghĩa là train LSTM chậm hơn ~4× và tốn bộ nhớ hơn ~4×. Nhưng đổi lại, LSTM có thể học được long-range dependency mà RNN hoàn toàn bất lực. Đây là trade-off xứng đáng.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// LSTM FORWARD PASS ĐẦY ĐỦ — Tính tay từng bước
// =====================================================
// Input dim D=2, Hidden dim H=3
// Tính qua 3 bước thời gian: x_1, x_2, x_3
// =====================================================

fn sigmoid(x: f64) -> f64 {
    1.0 / (1.0 + (-x).exp())
}

fn main() {
    let d = 2;  // Input dimension
    let h = 3;  // Hidden dimension
    
    // Input sequence (3 bước)
    let inputs = vec![
        vec![1.0, 0.5],   // x_1
        vec![0.3, 0.8],   // x_2
        vec![0.7, 0.2],   // x_3
    ];
    
    // === WEIGHTS (khởi tạo nhỏ — simplified) ===
    // Shape: (H, H+D) = (3, 5) cho mỗi gate
    // Dùng flatten: W[i*(H+D)+j]
    
    // Forget gate weights
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
        
        // 1. Forget Gate
        let f: Vec<f64> = gate(&w_f, &b_f).iter().map(|&v| sigmoid(v)).collect();
        
        // 2. Input Gate
        let i_g: Vec<f64> = gate(&w_i, &b_i).iter().map(|&v| sigmoid(v)).collect();
        
        // 3. Candidate
        let c_tilde: Vec<f64> = gate(&w_c, &b_c).iter().map(|&v| v.tanh()).collect();
        
        // 4. Cell State update
        let c_new: Vec<f64> = (0..h).map(|k| f[k] * c_prev[k] + i_g[k] * c_tilde[k]).collect();
        
        // 5. Output Gate
        let o: Vec<f64> = gate(&w_o, &b_o).iter().map(|&v| sigmoid(v)).collect();
        
        // 6. Hidden State
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
    println!("║  b_f = [1,1,1] → f_t gần 1 → LSTM mặc định \"nhớ\"");
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
      <li><strong>Cell State ($C_t$):</strong> "Đường cao tốc thông tin" — chạy xuyên suốt chuỗi, gradient flow ổn định nhờ phép cộng (+) thay vì nhân ma trận</li>
      <li><strong>Forget Gate ($f_t$):</strong> $\\sigma(W_f \\cdot [h, x] + b_f)$ — quyết định xóa gì khỏi Cell State. $f_t \\approx 0$: quên, $f_t \\approx 1$: nhớ</li>
      <li><strong>Input Gate ($i_t$):</strong> $\\sigma(W_i \\cdot [h, x] + b_i)$ — quyết định cập nhật gì. Candidate $\\tilde{C}_t = \\tanh(...)$ tạo nội dung mới</li>
      <li><strong>Cell Update:</strong> $C_t = f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t$ — cộng chọn lọc: quên cũ + thêm mới</li>
      <li><strong>Output Gate ($o_t$):</strong> $\\sigma(W_o \\cdot [h, x] + b_o)$ → $h_t = o_t \\odot \\tanh(C_t)$ — lọc Cell State thành output</li>
      <li><strong>Params:</strong> LSTM có 4× params so với Vanilla RNN (4 bộ weights cho 3 gate + 1 candidate)</li>
      <li><strong>Gradient flow:</strong> $\\partial C_t / \\partial C_{t-1} = f_t$ (scalar) thay vì $W_{hh}$ (ma trận) → gradient không vanish khi $f_t \\approx 1$</li>
    </ul>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Bài tiếp theo</span>
      <p>Bài 22.5 sẽ giới thiệu <strong>GRU (Gated Recurrent Unit)</strong> — phiên bản đơn giản hơn của LSTM: gộp Forget + Input Gate thành Update Gate, bỏ Cell State riêng biệt. Ít params hơn, train nhanh hơn, hiệu năng tương đương LSTM trên nhiều bài toán.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_04: Chapter = {
  id: 'ch22_04',
  title: '22.4. LSTM — Bộ Nhớ Dài-Ngắn Hạn',
  introduction: 'Giải phẫu chi tiết LSTM: Cell State, Forget Gate, Input Gate, Output Gate, forward pass đầy đủ với 6 phương trình, và ví dụ tính tay.',
  lessons: ch22_04_lessons,
};

export default ch22_04;
