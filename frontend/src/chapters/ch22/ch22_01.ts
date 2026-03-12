import { Lesson, Chapter } from '../../courses';

const ch22_01_lessons: Lesson[] = [
  {
    id: 'ch22_01_01',
    title: '1. Feedforward NN không xử lý được dữ liệu tuần tự',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Tại sao Feedforward Neural Network thất bại với dữ liệu tuần tự?</h2>

  <div class="definition-block">
    <span class="definition-term">Giới thiệu</span>
    <p>Ở Chương 21, ta đã học về <strong>Feedforward Neural Network (FNN)</strong> — mạng truyền thẳng, nơi dữ liệu chỉ đi theo một chiều: <code>Input → Hidden → Output</code>, không có vòng lặp. FNN hoạt động tốt với dữ liệu <strong>tĩnh</strong> (ảnh, bảng số liệu), nhưng hoàn toàn <strong>thất bại</strong> với dữ liệu có <strong>thứ tự và ngữ cảnh</strong>.</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch22/fnn_vs_rnn_comparison.png" alt="So sánh FNN và RNN" />
    <div class="image-caption">So sánh Feedforward Neural Network (không có bộ nhớ) và Recurrent Neural Network (có bộ nhớ)</div>
  </div>

  <h3>1.1. FNN Hoạt Động Như Thế Nào?</h3>

  <div class="definition-block">
    <span class="definition-term">Định nghĩa FNN</span>
    <p><strong>Feedforward Neural Network (FNN)</strong> hay còn gọi là <strong>Multilayer Perceptron (MLP)</strong> là kiến trúc neural network cơ bản nhất, nơi dữ liệu chỉ đi theo một chiều từ input đến output mà không có bất kỳ vòng lặp nào.</p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>1. Input Layer</h4>
      <p>Nhận dữ liệu đầu vào</p>
    </div>
    <div class="concept-card">
      <h4>2. Hidden Layers</h4>
      <p>Xử lý, trích xuất đặc trưng</p>
    </div>
    <div class="concept-card">
      <h4>3. Output Layer</h4>
      <p>Đưa ra kết quả dự đoán</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/spam_nn_architecture.png" alt="Kiến trúc Neural Network" />
    <div class="image-caption">Sơ đồ kiến trúc Feedforward Neural Network</div>
  </div>

  <div class="callout callout-info">
    <div class="callout-content">
      <span class="callout-title">Đặc điểm cốt lõi của FNN</span>
      <ul>
        <li><strong>One-way:</strong> Dữ liệu chỉ đi một chiều</li>
        <li><strong>No Loop:</strong> Không có vòng lặp</li>
        <li><strong>Independent:</strong> Mỗi input xử lý riêng biệt</li>
      </ul>
    </div>
  </div>

  <h3>1.2. Vấn đề cốt lõi: FNN thiếu "trí nhớ"</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Vấn đề cốt lõi</span>
      <p>FNN xử lý mỗi input <strong>HOÀN TOÀN ĐỘC LẬP</strong>. Nó không biết input trước đó là gì, không biết input sau là gì. Mỗi lần nhận input mới, FNN <strong>"quên sạch"</strong> mọi thứ trước đó.</p>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">Ví dụ 1: Dự đoán từ tiếp theo</span>
    <p>Câu: <em>"Mây đen kéo đến, trời sắp ___"</em></p>
    <ul>
      <li><strong>Con người:</strong> Đọc cả câu → hiểu ngữ cảnh "mây đen", "kéo đến" → dự đoán <strong>"mưa"</strong></li>
      <li><strong>FNN:</strong> Chỉ nhìn từ "sắp" → không có context → đoán: "sáng", "tối", "nổ"...</li>
    </ul>
    <p><strong>Phân tích:</strong> Con người sử dụng <em>trí nhớ ngắn hạn</em> để nhớ "mây đen kéo đến". FNN <strong>thiếu hoàn toàn</strong> cơ chế này. Từ "sắp" <strong>không đủ thông tin</strong> để dự đoán từ tiếp theo.</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Ví dụ 2: Phân tích cảm xúc (Sentiment Analysis)</span>
    <p>Input: <em>"Phim này hay lắm, nhưng kết thúc hơi chán"</em></p>
    <ol>
      <li>"Phim" → positive?</li>
      <li>"hay" → positive!</li>
      <li>"nhưng" → ??? (FNN không biết đảo ngược)</li>
      <li>"chán" → negative! (quá muộn)</li>
    </ol>
    <p><strong>Kết quả:</strong> FNN bối rối vì thiếu ngữ cảnh từ đầu câu. <strong>Sai lệch càng lớn khi câu dài.</strong></p>
  </div>

    <!-- Ví dụ 3: Machine Translation -->
    <div class="example-box">
      <div class="example-header">
        <span>Ví dụ 3: Dịch máy (Machine Translation)</span>
      </div>
      <div class="example-content">
        <p>Câu tiếng Việt: <strong>"Tôi đi học"</strong></p>

        <div class="translation-flow">
          <div class="flow-item">
            <span class="flow-label">FNN xử lý</span>
            <div class="flow-arrows">
              <span>"Tôi"</span>
              <span>→</span>
              <span>"đi"</span>
              <span>→</span>
              <span>"học"</span>
            </div>
            <p><em>Mỗi từ xử lý riêng biệt, không biết thứ tự</em></p>
          </div>
        </div>

        <div class="wrong-results">
          <p><strong>Kết quả có thể sai:</strong></p>
          <ul>
            <li>"I go learn" (thiếu "am")</li>
            <li>"learn go I" (sai hoàn toàn thứ tự)</li>
          </ul>
        </div>

        <div class="callout callout-info">
          <p><strong>FNN không hiểu:</strong></p>
          <ul>
            <li>Thứ tự từ có ý nghĩa</li>
            <li>Cấu trúc ngữ pháp</li>
            <li>Mối quan hệ giữa các từ</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Ví dụ 4: Giá cổ phiếu -->
    <div class="example-box">
      <div class="example-header">
        <span>Ví dụ 4: Dự đoán giá cổ phiếu</span>
      </div>
      <div class="example-content">
        <p>Dự đoán giá Bitcoin ngày mai</p>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>Đối tượng</th>
              <th>Cách xử lý</th>
              <th>Kết quả</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong> Con người</strong></td>
              <td>Nhìn biểu đồ 30 ngày → thấy xu hướng tăng/giảm → dự đoán</td>
              <td><span class="badge badge-success">Chính xác</span></td>
            </tr>
            <tr>
              <td><strong> FNN</strong></td>
              <td>Chỉ nhìn giá hôm nay = 50,000$ → dự đoán</td>
              <td><span class="badge badge-error">Sai</span> - Không biết hôm qua là 45,000$ (tăng) hay 55,000$ (giảm)</td>
            </tr>
          </tbody>
        </table>

        <div class="analysis-box">
          <p><strong> Vấn đề:</strong> FNN mất hoàn toàn thông tin về <em>xu hướng</em> (trend) theo thời gian.</p>
        </div>
      </div>
    </div>

    <!-- Ví dụ 5: Phân tích video -->
    <div class="example-box">
      <div class="example-header">
        <span>Ví dụ 5: Phân tích video</span>
      </div>
      <div class="example-content">
        <p>Frame hiện tại: một người đang lơ lửng giữa không trung</p>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>Đối tượng</th>
              <th>Cách xử lý</th>
              <th>Kết quả</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong> Con người</strong></td>
              <td>Xem các frame trước → biết người đó đang nhảy lên hay đang rơi xuống</td>
              <td><span class="badge badge-success">Phân biệt được</span></td>
            </tr>
            <tr>
              <td><strong> FNN</strong></td>
              <td>Chỉ thấy 1 frame → không thể phân biệt</td>
              <td><span class="badge badge-error">Không phân biệt được</span></td>
            </tr>
          </tbody>
        </table>

        <div class="analysis-box">
          <p><strong> Vấn đề:</strong> FNN không mô hình hóa được <em>chuyển động</em> (dynamics).</p>
        </div>
      </div>
    </div>
  </div>

  <h3>1.3. Bản Chất Toán Học Của Vấn Đề</h3>

  <div class="formula-block">
    <p>$h_1 = \\sigma(W_1 \\cdot x + b_1)$</p>
    <p>$h_2 = \\sigma(W_2 \\cdot h_1 + b_2)$</p>
    <p>$y = \\text{softmax}(W_3 \\cdot h_2 + b_3)$</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Đặc điểm quan trọng</span>
    <ul>
      <li>Mỗi input <strong>x</strong> được xử lý qua cùng một weight <strong>W</strong></li>
      <li><strong>Không có tham số nào</strong> lưu trữ thông tin về input trước đó</li>
      <li>Output chỉ phụ thuộc vào <strong>input hiện tại</strong></li>
    </ul>
  </div>

  <div class="callout callout-info">
    <div class="callout-content">
      <span class="callout-title">So sánh với hàm có bộ nhớ</span>
      <p>Để so sánh, một hàm <strong>có bộ nhớ</strong> cần:</p>
      <p>$y_t = f(x_t, h_{t-1})$</p>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Ký hiệu</th>
            <th>Ý nghĩa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$x_t$</td>
            <td>input tại thời điểm t</td>
          </tr>
          <tr>
            <td>$h_{t-1}$</td>
            <td>"trạng thái ẩn" (hidden state) từ thời điểm trước</td>
          </tr>
          <tr>
            <td>$y_t$</td>
            <td>output tại thời điểm t</td>
          </tr>
        </tbody>
      </table>
      <p><strong>FNN không có tham số nào để lưu $h_{t-1}$</strong></p>
    </div>
  </div>

  <h3>1.4. Bốn Lý Do Kỹ Thuật FNN Thất Bại</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>1. Fixed-size Input</h4>
      <p>FNN yêu cầu input có kích thước cố định. Không xử lý được chuỗi có độ dài thay đổi.</p>
      <p><em>Ví dụ:</em> Câu 5 từ và câu 500 từ cần kiến trúc khác nhau</p>
    </div>
    <div class="concept-card">
      <h4>2. No Memory</h4>
      <p>Mỗi input xử lý từ đầu, không "nhớ" gì từ input trước. Không có trạng thái nội bộ.</p>
      <p><em>Ví dụ:</em> Đọc từ "bank" — không biết đang nói về ngân hàng hay bờ sông</p>
    </div>
    <div class="concept-card">
      <h4>3. No Temporal Dynamics</h4>
      <p>Không mô hình hóa được sự thay đổi theo thời gian. Không học được patterns.</p>
      <p><em>Ví dụ:</em> Giá cổ phiếu: FNN không phân biệt được uptrend vs downtrend</p>
    </div>
    <div class="concept-card">
      <h4>4. No Parameter Sharing</h4>
      <p>Nếu concat toàn bộ chuỗi, mỗi vị trí dùng bộ weights riêng → không tổng quát hóa.</p>
      <p><em>Ví dụ:</em> Từ "mèo" ở vị trí 3 và 30 dùng weights khác nhau</p>
    </div>
  </div>

  <!-- 1.5. Ba cấp độ của vấn đề -->
  <div class="section-card">
  <h3>1.5. Ba Cấp Độ Của Vấn Đề</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Cấp độ 1: Không Biết Quá Khứ</h4>
      <p><strong>Input:</strong> "quả" (t=5)</p>
      <p><strong>FNN không biết:</strong></p>
      <ul>
        <li>"Tôi" (t=1)</li>
        <li>"ăn" (t=2)</li>
        <li>"một" (t=3)</li>
        <li>"quả" (t=4)</li>
      </ul>
      <p>→ Không xác định "quả" gì</p>
    </div>
    <div class="concept-card">
      <h4>Cấp độ 2: Không Biết Tương Lai</h4>
      <p><strong>Input:</strong> "Tôi đi" (t=2)</p>
      <p><strong>FNN không biết:</strong></p>
      <ul>
        <li>t=3: sẽ là gì? (học, ăn, chơi...)</li>
      </ul>
      <p>→ Không xác định hành động</p>
    </div>
    <div class="concept-card">
      <h4>Cấp độ 3: Không Hiểu Mối Quan Hệ</h4>
      <p><strong>Câu:</strong> "Mỗi ngày tôi đều uống cà phê"</p>
      <p><strong>FNN xử lý riêng lẻ:</strong></p>
      <ul>
        <li>"Mỗi" → ?</li>
        <li>"ngày" → ?</li>
        <li>"tôi" → ?</li>
      </ul>
      <p>→ Không hiểu thói quen</p>
    </div>
  </div>
  </div>

  <!-- 1.6. Dữ liệu tuần tự -->
  <div class="section-card">
  <h3>1.6. Định Nghĩa Dữ Liệu Tuần Tự</h3>

  <div class="definition-block">
    <span class="definition-term">Sequential Data là gì?</span>
    <p><strong>Dữ liệu tuần tự</strong> (Sequential Data) là dữ liệu mà <strong>thứ tự của các phần tử mang ý nghĩa quan trọng</strong>. Thay đổi thứ tự → thay đổi ý nghĩa hoặc mất thông tin.</p>
    <p><em>Ví dụ:</em> "Chó cắn mèo" ≠ "Mèo cắn chó" — cùng 3 từ, khác thứ tự → khác ý nghĩa!</p>
  </div>

  <h4>Các loại Sequential Data</h4>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Văn bản (Text)</h4>
      <p>Câu, đoạn văn, code, email</p>
      <p><em>Đặc điểm:</em> Phụ thuộc ngữ cảnh xa - từ đầu câu ảnh hưởng cuối câu</p>
    </div>
    <div class="concept-card">
      <h4>Time Series</h4>
      <p>Giá cổ phiếu, nhiệt độ, ECG tim, lưu lượng xe</p>
      <p><em>Đặc điểm:</em> Khoảng cách thời gian đều, có xu hướng (trend) + mùa (seasonality)</p>
    </div>
    <div class="concept-card">
      <h4>Audio (Âm thanh)</h4>
      <p>Giọng nói, nhạc, tiếng ồn</p>
      <p><em>Đặc điểm:</em> Tần suất rất cao (16,000-44,100 samples/giây)</p>
    </div>
    <div class="concept-card">
      <h4>Video</h4>
      <p>Phim, camera giám sát, livestream</p>
      <p><em>Đặc điểm:</em> Mỗi frame là 1 ảnh, chuỗi frames mang thông tin chuyển động</p>
    </div>
    <div class="concept-card">
      <h4>Sinh học</h4>
      <p>DNA (ATCG...), protein</p>
      <p><em>Đặc điểm:</em> Chuỗi rất dài (hàng triệu ký tự), có cấu trúc cục bộ + toàn cục</p>
    </div>
    <div class="concept-card">
      <h4>User Behavior</h4>
      <p>Lịch sử mua hàng, clickstream</p>
      <p><em>Đặc điểm:</em> Khoảng cách thời gian không đều</p>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">Tại sao FNN không xử lý được?</span>
    <ul>
      <li><strong>Thứ tự quan trọng:</strong> FNN xử lý mỗi input độc lập, không biết input trước/sau</li>
      <li><strong>Độ dài biến đổi:</strong> FNN yêu cầu input cố định, không xử lý được câu 5 từ và 500 từ</li>
      <li><strong>Phụ thuộc xa:</strong> Từ đầu câu có thể ảnh hưởng đến từ cuối câu (ví dụ: "Tuy...nhưng...")</li>
    </ul>
  </div>

  <h3>1.7. Giải Pháp: Recurrent Neural Network (RNN)</h3>

  <div class="definition-block">
    <span class="definition-term">Ý tưởng cốt lõi</span>
    <p>Thêm vòng lặp (loop) vào mạng neural để tạo "bộ nhớ". Mỗi bước thời gian, RNN không chỉ xử lý input hiện tại mà còn nhận thêm thông tin từ bước trước đó.</p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>FNN (Không có bộ nhớ)</h4>
      <p>x → ○ → y</p>
      <p><em>Mỗi input xử lý độc lập, không biết gì về quá khứ</em></p>
    </div>
    <div class="concept-card">
      <h4>RNN (Có bộ nhớ)</h4>
      <p>x → ○ → y</p>
      <p><em>Có vòng lặp, truyền hidden state từ bước trước</em></p>
    </div>
  </div>

  <div class="formula-block">
    <p>$h_t = \\tanh(W_{hh} \\cdot h_{t-1} + W_{xh} \\cdot x_t)$</p>
    <p>$y_t = \\text{softmax}(W_{hy} \\cdot h_t)$</p>
  </div>

  <div class="definition-block">
    <span class="definition-term">Giải thích các ký hiệu</span>
    <ul>
      <li>$h_t$ — hidden state tại thời điểm t</li>
      <li>$h_{t-1}$ — hidden state từ thời điểm trước</li>
      <li>$W_{hh}$ — weight từ hidden state sang hidden state</li>
      <li>$W_{xh}$ — weight từ input sang hidden state</li>
      <li><strong>Thông tin từ quá khứ được "truyền" đến hiện tại qua $h_{t-1}$</strong></li>
    </ul>
  </div>

  <div class="definition-block">
    <span class="definition-term">Minh họa RNN triển khai theo thời gian</span>
    <ul>
      <li><strong>t=1:</strong> $x_1$ → RNN → $h_1$ → $y_1$</li>
      <li><strong>t=2:</strong> $x_2$ + $h_1$ → RNN → $h_2$ → $y_2$ (biết $x_1$)</li>
      <li><strong>t=3:</strong> $x_3$ + $h_2$ → RNN → $h_3$ → $y_3$ (biết $x_1, x_2$)</li>
    </ul>
    <p><strong>→ RNN "nhớ" tất cả input trước đó!</strong></p>
  </div>

  <div class="callout callout-success">
    <div class="callout-content">
      <span class="callout-title">Kết luận</span>
      <p>FNN thiếu 2 yếu tố then chốt để xử lý dữ liệu tuần tự:</p>
      <ul>
        <li><strong>Bộ nhớ</strong> (memory) để lưu trữ context từ quá khứ</li>
        <li><strong>Khả năng xử lý chuỗi có độ dài biến đổi</li>
      </ul>
      <p><strong>Recurrent Neural Network (RNN)</strong> ra đời chính xác để giải quyết 2 vấn đề này!</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// VÍ DỤ: TẠI SAO FNN THẤT BẠI VỚI DỮ LIỆU CHUỖI
// =====================================================
// Bài toán: Dự đoán từ tiếp theo trong câu
// FNN chỉ nhìn 1 từ → không đủ context
//
// So sánh:
// - FNN: input = từ cuối → output = dự đoán
// - RNN: input = chuỗi từ + hidden state → output = dự đoán
// =====================================================

fn main() {
    // Ví dụ: FNN xử lý câu "Mây đen kéo đến trời sắp"
    // FNN chỉ thấy từ cuối "sắp"
    
    let cau = vec!["Mây", "đen", "kéo", "đến", "trời", "sắp"];
    
    println!("╔══════════════════════════════════════════════════╗");
    println!("║  SO SÁNH FNN vs RNN XỬ LÝ CÂU                  ║");
    println!("╠══════════════════════════════════════════════════╣");
    println!("║  Câu: {:?}", cau);
    println!("╠══════════════════════════════════════════════════╣");
    
    // FNN: chỉ thấy từ cuối
    println!("║                                                  ║");
    println!("║  FNN nhìn thấy: \"{}\"", cau[cau.len()-1]);
    println!("║  → Không có context → Dự đoán: ???              ║");
    println!("║                                                  ║");
    
    // RNN: "nhớ" từng từ qua hidden state
    println!("║  RNN xử lý tuần tự:                             ║");
    let mut memory = String::new();
    for (i, tu) in cau.iter().enumerate() {
        if !memory.is_empty() {
            memory.push_str(", ");
        }
        memory.push_str(tu);
        println!("║  Bước {}: đọc \"{}\" → nhớ: [{}]", 
                 i+1, tu, memory);
    }
    println!("║  → Có đầy đủ context → Dự đoán: \"mưa\"          ║");
    println!("╚══════════════════════════════════════════════════╝");
    
    // Ví dụ 2: Giá cổ phiếu
    println!("\\n=== VÍ DỤ 2: DỰ ĐOÁN GIÁ CỔ PHIẾU ===");
    let prices = vec![100.0, 102.0, 105.0, 103.0, 108.0, 112.0];
    
    println!("  Giá 6 ngày qua: {:?}", prices);
    println!("  FNN chỉ thấy: ngày cuối = {}", prices[prices.len()-1]);
    println!("  RNN thấy: xu hướng TĂNG (100→112) → dự đoán tiếp tục tăng");
    
    // Tính xu hướng
    let mut tang = 0;
    let mut giam = 0;
    for i in 1..prices.len() {
        if prices[i] > prices[i-1] { tang += 1; }
        else { giam += 1; }
    }
    println!("  Phân tích: {} ngày tăng, {} ngày giảm", tang, giam);
    println!("  → RNN nắm được xu hướng này, FNN thì không!");
}`
  },
  // ==========================================================
  // LESSON 2: DỮ LIỆU CHUỖI (SEQUENTIAL DATA)
  // ==========================================================
  {
    id: 'ch22_01_02',
    title: '2. Dữ liệu chuỗi (Sequential Data) là gì?',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Dữ liệu chuỗi (Sequential Data) là gì?</h2>

  <div class="definition-block">
    <span class="definition-term">Định nghĩa Sequential Data</span>
    <p><strong>Dữ liệu chuỗi</strong> (Sequential Data) là dữ liệu mà <strong>thứ tự của các phần tử mang ý nghĩa quan trọng</strong>. Thay đổi thứ tự → thay đổi ý nghĩa hoặc mất thông tin.</p>
    <p><em>Ví dụ đơn giản:</em> "Chó cắn mèo" ≠ "Mèo cắn chó". Cùng 3 từ, khác thứ tự → khác ý nghĩa hoàn toàn.</p>
  </div>

  <h3>2.1. Bảy loại dữ liệu chuỗi phổ biến</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Loại dữ liệu</th>
        <th>Ví dụ cụ thể</th>
        <th>Đơn vị chuỗi</th>
        <th>Đặc điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Text (Ngôn ngữ)</strong></td>
        <td>Bài viết, email, chat, code</td>
        <td>Từ (word) hoặc ký tự (character) hoặc token</td>
        <td>Phụ thuộc ngữ cảnh xa (long-range dependency): từ đầu câu ảnh hưởng cuối câu</td>
      </tr>
      <tr>
        <td><strong>Time Series</strong></td>
        <td>Giá cổ phiếu, nhiệt độ, ECG tim, lưu lượng xe</td>
        <td>Giá trị số tại mỗi thời điểm</td>
        <td>Khoảng cách thời gian đều (1 phút, 1 giờ, 1 ngày). Có xu hướng (trend) + mùa (seasonality)</td>
      </tr>
      <tr>
        <td><strong>Audio (Âm thanh)</strong></td>
        <td>Giọng nói, nhạc, tiếng ồn</td>
        <td>Sample (16,000-44,100 samples/giây)</td>
        <td>Tần suất rất cao. Thường chuyển thành Spectrogram (ảnh) trước khi xử lý</td>
      </tr>
      <tr>
        <td><strong>Video</strong></td>
        <td>Camera giám sát, phim, livestream</td>
        <td>Frame (24-60 frames/giây)</td>
        <td>Mỗi frame là 1 ảnh. Chuỗi frames mang thông tin chuyển động</td>
      </tr>
      <tr>
        <td><strong>DNA/Protein</strong></td>
        <td>ATCGATCG..., chuỗi amino acid</td>
        <td>Nucleotide (A, T, C, G) hoặc amino acid (20 loại)</td>
        <td>Chuỗi rất dài (hàng triệu ký tự). Cấu trúc cục bộ + toàn cục</td>
      </tr>
      <tr>
        <td><strong>User Behavior</strong></td>
        <td>Lịch sử mua hàng, clickstream</td>
        <td>Sự kiện (event): click, mua, xem</td>
        <td>Khoảng cách thời gian không đều. Cần mô hình hóa ý định người dùng</td>
      </tr>
      <tr>
        <td><strong>Music</strong></td>
        <td>Bản nhạc MIDI, sheet music</td>
        <td>Nốt nhạc (note) với pitch + duration</td>
        <td>Có cấu trúc hòa âm (harmony) + nhịp (rhythm). Nhiều track đồng thời</td>
      </tr>
    </tbody>
  </table>

  <h3>2.2. Bốn đặc điểm chung của dữ liệu chuỗi</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>1. Thứ tự quan trọng (Order Matters)</h4>
      <p>Hoán vị thứ tự → thay đổi ý nghĩa. Đây là khác biệt cốt lõi so với dữ liệu dạng bảng (tabular data), nơi thứ tự hàng không quan trọng.</p>
      <p><em>"Tôi yêu bạn"</em> ≠ <em>"Bạn yêu tôi"</em></p>
      <p><em>[100, 200, 300]</em> (tăng) ≠ <em>[300, 200, 100]</em> (giảm)</p>
    </div>
    <div class="concept-card">
      <h4>2. Phụ thuộc thời gian (Temporal Dependencies)</h4>
      <p>Phần tử hiện tại phụ thuộc vào các phần tử trước đó. Mức độ phụ thuộc có thể <strong>ngắn hạn</strong> (từ liền kề) hoặc <strong>dài hạn</strong> (từ cách xa hàng trăm bước).</p>
      <p><em>Ngắn hạn:</em> "Tôi ăn ___" → "cơm" (phụ thuộc từ ngay trước)</p>
      <p><em>Dài hạn:</em> "Tôi sinh ra ở Việt Nam. [... 100 từ ...]. Tiếng mẹ đẻ của tôi là ___" → "tiếng Việt"</p>
    </div>
    <div class="concept-card">
      <h4>3. Độ dài biến đổi (Variable Length)</h4>
      <p>Chuỗi có thể dài ngắn khác nhau. Câu: 3 từ → 500 từ. Bài hát: 30 giây → 10 phút. Model phải xử lý được BẤT KỲ độ dài nào.</p>
    </div>
    <div class="concept-card">
      <h4>4. Cấu trúc cục bộ (Local Structure)</h4>
      <p>Các phần tử gần nhau thường liên quan chặt chẽ hơn phần tử ở xa. Trong văn bản: từ trong cùng cụm từ liên quan hơn từ ở đoạn khác. Trong time series: giá trị liền kề thường tương tự.</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Dữ liệu KHÔNG phải chuỗi</span>
      <p>Để hiểu rõ hơn, vài ví dụ dữ liệu <strong>không phải</strong> chuỗi:</p>
      <ul>
        <li><strong>Ảnh đơn lẻ:</strong> Các pixel có quan hệ không gian (spatial), không phải thời gian → dùng CNN</li>
        <li><strong>Bảng dữ liệu:</strong> Mỗi hàng độc lập (khách hàng A không ảnh hưởng khách hàng B) → dùng FNN, Decision Trees</li>
        <li><strong>Đồ thị (Graph):</strong> Quan hệ phức tạp, không tuyến tính → dùng GNN</li>
      </ul>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: HIDDEN STATE - BỘ NHỚ CỦA RNN
  // ==========================================================
  {
    id: 'ch22_01_03',
    title: '3. Khái niệm Bộ Nhớ — Hidden State',
    duration: '25 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>3. Hidden State — "Trí nhớ" của Recurrent Neural Network</h2>

  <div class="image-showcase">
    <img src="/images/ch22/rnn_hidden_state.png" alt="Hidden State tích lũy thông tin qua thời gian" />
    <div class="image-caption">Hidden state tích lũy thông tin qua các bước thời gian — từ trạng thái ban đầu (h₀) đến biểu diễn ngữ cảnh phong phú (h₄)</div>
  </div>

  <h3>3.1. Từ Perceptron → RNN: Chỉ thêm 1 thứ</h3>

  <p>RNN không phải kiến trúc hoàn toàn mới — nó chỉ là <strong>Perceptron + 1 thứ thêm vào</strong>:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Mô hình</th>
        <th>Công thức</th>
        <th>Ký ức?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Perceptron</strong></td>
        <td>$y = f(W \\cdot x + b)$</td>
        <td>Không — xử lý từng input độc lập</td>
      </tr>
      <tr>
        <td><strong>FNN (nhiều lớp)</strong></td>
        <td>$h = f(W_1 \\cdot x + b_1)$, $y = f(W_2 \\cdot h + b_2)$</td>
        <td>Không — vẫn xử lý từng input độc lập</td>
      </tr>
      <tr>
        <td><strong>RNN</strong></td>
        <td>$h^{(t)} = f(\\underbrace{U \\cdot x^{(t)}}_{\\text{perceptron cũ}} + \\underbrace{W \\cdot h^{(t-1)}}_{\\text{THÊM MỚI}} + b)$</td>
        <td><strong>Có</strong> — $W \\cdot h^{(t-1)}$ mang thông tin quá khứ</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">RNN = Perceptron + recurrent connection</span>
      <p>Thành phần $U \\cdot x^{(t)}$ giống hệt perceptron: nhân input với trọng số. Thành phần $W \\cdot h^{(t-1)}$ là <strong>thứ duy nhất được thêm vào</strong> — nó kết nối hidden state bước trước sang bước hiện tại, tạo ra "ký ức". $W$ quyết định bao nhiêu thông tin cũ được <strong>biến đổi</strong> (không chỉ tăng/giảm, mà xoay, nén, mở rộng) rồi cộng với thông tin mới.</p>
    </div>
  </div>

  <h3>3.2. Hidden State là gì?</h3>

  <div class="definition-block">
    <span class="definition-term">Định nghĩa Hidden State (h_t)</span>
    <p><strong>Hidden State</strong> là một vector số thực có kích thước cố định (hidden_dim), đóng vai trò là <strong>"bộ nhớ"</strong> của RNN tại mỗi bước thời gian t. Nó mã hóa (encode) thông tin tóm tắt từ TẤT CẢ các input đã thấy từ bước 1 đến bước t.</p>
  </div>

  <p><strong>Cơ chế hoạt động step-by-step:</strong></p>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">0</div>
      <div class="step-content">
        <h4>Khởi tạo: h₀ = vector zero</h4>
        <p>Ban đầu, RNN chưa "thấy" gì → hidden state là vector toàn số 0. Ví dụ: h₀ = [0, 0, 0, ..., 0] với hidden_dim phần tử.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Bước t=1: x₁ + h₀ → h₁</h4>
        <p>RNN nhận input đầu tiên x₁ (ví dụ: từ "Mây") kết hợp với h₀ (trống). Kết quả: h₁ chứa thông tin về x₁.</p>
        <p><em>h₁ ≈ "Đã thấy từ 'Mây'"</em></p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Bước t=2: x₂ + h₁ → h₂</h4>
        <p>RNN nhận input x₂ ("đen") kết hợp với h₁ (đã chứa info "Mây"). Kết quả: h₂ chứa thông tin về cả x₁ và x₂.</p>
        <p><em>h₂ ≈ "Đã thấy 'Mây đen'"</em></p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Bước t=3: x₃ + h₂ → h₃</h4>
        <p>Tương tự: h₃ chứa tóm tắt của "Mây đen kéo". Context ngày càng phong phú.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">T</div>
      <div class="step-content">
        <h4>Bước cuối: h_T chứa tóm tắt TOÀN BỘ chuỗi</h4>
        <p>h_T là "bộ nhớ tổng hợp" của toàn bộ chuỗi input. Có thể dùng h_T để phân loại chuỗi (sentiment analysis), hoặc dùng mỗi h_t để dự đoán output tại mỗi bước (POS tagging).</p>
      </div>
    </div>
  </div>

  <h3>3.2. Ẩn dụ giúp hiểu Hidden State</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Ẩn dụ 1: Đọc sách</h4>
      <p>Khi đọc đến trang 100, bạn không nhớ <strong>từng chữ</strong> từ trang 1. Nhưng bạn nhớ <strong>nội dung tổng quát</strong>: nhân vật chính là ai, đang ở đâu, chuyện gì đang xảy ra.</p>
      <p>Hidden state = "bản tóm tắt nội dung đã đọc" trong đầu bạn. Nó được cập nhật liên tục khi bạn đọc thêm trang mới.</p>
    </div>
    <div class="concept-card">
      <h4>Ẩn dụ 2: Ghi chép bài giảng</h4>
      <p>Sinh viên nghe giảng 2 tiếng. Không thể nhớ từng câu thầy nói. Nhưng <strong>ghi chú</strong> tóm tắt ý chính trên giấy.</p>
      <p>Hidden state = "tờ ghi chú" được cập nhật liên tục. Mỗi lần thầy nói ý mới → ghi thêm vào (hoặc gạch bỏ ý cũ không còn đúng).</p>
    </div>
    <div class="concept-card">
      <h4>Ẩn dụ 3: Cuộc hội thoại</h4>
      <p>Trong cuộc trò chuyện, bạn "nhớ" ngữ cảnh: ai đang nói về gì, tâm trạng thế nào, chủ đề gì. Bạn không nhớ từng từ, nhưng nhớ <strong>trạng thái</strong> cuộc trò chuyện.</p>
      <p>Hidden state = "trạng thái tâm trí" của bạn trong cuộc hội thoại.</p>
    </div>
  </div>

  <h3>3.3. Hidden State vs RAM máy tính</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thuộc tính</th>
        <th>RAM máy tính</th>
        <th>Hidden State (RNN)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Lưu trữ</strong></td>
        <td>Chính xác từng bit, không mất mát</td>
        <td>Nén thông tin vào vector cố định, CÓ mất mát</td>
      </tr>
      <tr>
        <td><strong>Dung lượng</strong></td>
        <td>Cố định (8GB, 16GB, ...) nhưng lớn</td>
        <td>Cố định (hidden_dim), thường 128-1024 chiều</td>
      </tr>
      <tr>
        <td><strong>Truy cập</strong></td>
        <td>Random access — đọc bất kỳ ô nhớ nào</td>
        <td>Sequential — chỉ "đọc" qua quá trình forward pass</td>
      </tr>
      <tr>
        <td><strong>Cập nhật</strong></td>
        <td>Ghi đè chính xác</td>
        <td>Biến đổi phi tuyến qua activation function</td>
      </tr>
      <tr>
        <td><strong>Quên</strong></td>
        <td>Không tự quên (trừ khi reset)</td>
        <td>Dần "quên" thông tin cũ khi chuỗi dài (Vanishing Gradient)</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Hạn chế của Hidden State trong Vanilla RNN</span>
      <p>Hidden state trong RNN cơ bản (Vanilla RNN) bị một vấn đề nghiêm trọng: <strong>không nhớ được thông tin xa</strong> (long-term dependencies). Nếu chuỗi dài 100+ bước, thông tin từ bước đầu gần như bị "xóa" khỏi hidden state.</p>
      <p>Đây chính là <strong>Vanishing Gradient Problem</strong> — vấn đề sẽ được giải quyết bởi LSTM và GRU ở các bài sau.</p>
    </div>
  </div>

  <h3>3.4. Kích thước Hidden State (hidden_dim)</h3>

  <p>hidden_dim là <strong>hyperparameter</strong> do người thiết kế chọn. Nó quyết định "dung lượng bộ nhớ" của RNN:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>hidden_dim</th>
        <th>Dung lượng nhớ</th>
        <th>Số parameters</th>
        <th>Trường hợp sử dụng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Nhỏ (32-64)</strong></td>
        <td>Ít, chỉ nhớ pattern đơn giản</td>
        <td>Ít → train nhanh</td>
        <td>Chuỗi ngắn, bài toán đơn giản (sensor data)</td>
      </tr>
      <tr>
        <td><strong>Trung bình (128-256)</strong></td>
        <td>Vừa phải</td>
        <td>Vừa phải</td>
        <td>NLP cơ bản, time series forecasting</td>
      </tr>
      <tr>
        <td><strong>Lớn (512-1024)</strong></td>
        <td>Nhiều, nhớ pattern phức tạp</td>
        <td>Nhiều → cần nhiều data + GPU</td>
        <td>Machine translation, language modeling</td>
      </tr>
      <tr>
        <td><strong>Rất lớn (2048+)</strong></td>
        <td>Rất nhiều</td>
        <td>Rất nhiều → dễ overfit</td>
        <td>Hiếm dùng cho RNN, phổ biến hơn với Transformer</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Công thức tính số parameters</span>
      <p>Với input_dim = D và hidden_dim = H:</p>
      <p>Số params RNN cell = H×D (W_xh) + H×H (W_hh) + H (b_h) = <strong>H(D + H + 1)</strong></p>
      <p>Ví dụ: D=100, H=256 → params = 256 × (100 + 256 + 1) = <strong>91,392</strong></p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// MINH HỌA: HIDDEN STATE NHƯ BỘ NHỚ
// =====================================================
// Mô phỏng cách RNN "nhớ" thông tin qua hidden state
// Đây là phiên bản đơn giản hóa để hiểu khái niệm
// =====================================================

fn main() {
    // Chuỗi input: các từ trong câu
    let sentence = vec!["Mây", "đen", "kéo", "đến", "trời", "sắp"];
    
    // Hidden state: mô phỏng bằng vector đơn giản
    // Trong thực tế, đây là vector f64 kích thước hidden_dim
    let hidden_dim = 4;
    let mut hidden_state = vec![0.0_f64; hidden_dim];
    
    println!("╔══════════════════════════════════════════════════════╗");
    println!("║     MÔ PHỎNG HIDDEN STATE QUA CÁC BƯỚC THỜI GIAN   ║");
    println!("║     hidden_dim = {}                                  ║", hidden_dim);
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  h_0 (khởi tạo) = {:?}", hidden_state);
    println!("╠══════════════════════════════════════════════════════╣");
    
    for (t, word) in sentence.iter().enumerate() {
        // Mô phỏng: hidden_state mới = f(hidden_state cũ + input)
        // Trong thực tế: h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b)
        // Ở đây đơn giản hóa: cộng hash của từ vào hidden state
        let word_hash = word.len() as f64 * 0.1;
        for i in 0..hidden_dim {
            // Mô phỏng phép biến đổi phi tuyến
            hidden_state[i] = (hidden_state[i] * 0.8 + word_hash * (i as f64 + 1.0) * 0.3).tanh();
        }
        
        println!("║  t={}: đọc \"{}\"", t + 1, word);
        println!("║    h_{} = [{:.3}, {:.3}, {:.3}, {:.3}]", 
                 t + 1,
                 hidden_state[0], hidden_state[1], 
                 hidden_state[2], hidden_state[3]);
        println!("║    → Đã nhớ: {}", 
                 sentence[..=t].join(" "));
        println!("║");
    }
    
    println!("╠══════════════════════════════════════════════════════╣");
    println!("║  Hidden state cuối chứa tóm tắt TOÀN BỘ câu       ║");
    println!("║  Từ h_T này, RNN có thể dự đoán từ tiếp theo       ║");
    println!("╚══════════════════════════════════════════════════════╝");
    
    // Minh họa: hidden_dim ảnh hưởng số parameters
    println!("\\n=== SỐ PARAMETERS THEO HIDDEN_DIM ===");
    let input_dim = 100; // Ví dụ: vocabulary size nhỏ
    for h in [32, 64, 128, 256, 512, 1024] {
        let params = h * (input_dim + h + 1);
        println!("  hidden_dim={:>4} → params = {:>10} ({:.1}K)", 
                 h, params, params as f64 / 1000.0);
    }
}`
  },
  // ==========================================================
  // LESSON 4: KIẾN TRÚC RNN CƠ BẢN
  // ==========================================================
  {
    id: 'ch22_01_04',
    title: '4. Kiến trúc RNN cơ bản — Sơ đồ & Công thức',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Kiến trúc RNN cơ bản — Công thức toán học & Sơ đồ</h2>

  <div class="image-showcase">
    <img src="/images/ch22/rnn_unrolled.png" alt="RNN Folded vs Unrolled" />
    <div class="image-caption">RNN ở dạng gấp (folded, bên trái) với vòng lặp, và dạng mở cuộn (unrolled, bên phải) qua 4 bước thời gian — cùng 1 bộ weights W_hh, W_xh được chia sẻ</div>
  </div>

  <h3>4.1. Hai công thức cốt lõi của RNN</h3>

  <div class="formula-block">
    <h4>Công thức 1: Cập nhật Hidden State</h4>
    <p>$h_t = \\tanh(W_{hh} \\cdot h_{t-1} + W_{xh} \\cdot x_t + b_h)$</p>
    <p>Tại mỗi bước t: lấy hidden state cũ h_(t-1), kết hợp với input mới x_t, qua hàm tanh → tạo hidden state mới h_t.</p>
    <h4>Công thức 2: Tính Output</h4>
    <p>$y_t = W_{hy} \\cdot h_t + b_y$</p>
    <p>Dùng hidden state h_t để tính output y_t (có thể thêm softmax nếu classification).</p>
  </div>

  <h3>4.2. Giải thích từng thành phần</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Ký hiệu</th>
        <th>Tên</th>
        <th>Shape</th>
        <th>Vai trò chi tiết</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>$x_t$</strong></td>
        <td>Input tại bước t</td>
        <td>(D, 1)</td>
        <td>Vector input, D = input dimension. VD: one-hot encoding của từ, hoặc vector embedding</td>
      </tr>
      <tr>
        <td><strong>$h_{t-1}$</strong></td>
        <td>Hidden state từ bước trước</td>
        <td>(H, 1)</td>
        <td>"Bộ nhớ" từ bước trước. h₀ thường khởi tạo = vector 0</td>
      </tr>
      <tr>
        <td><strong>$W_{xh}$</strong></td>
        <td>Weight input→hidden</td>
        <td>(H, D)</td>
        <td>Biến đổi input x_t thành không gian hidden. Mỗi hàng = 1 neuron hidden "nhìn" toàn bộ input</td>
      </tr>
      <tr>
        <td><strong>$W_{hh}$</strong></td>
        <td>Weight hidden→hidden</td>
        <td>(H, H)</td>
        <td><strong>ĐÂY LÀ PHẦN "RECURRENT"</strong> — kết nối hidden state cũ với hidden state mới. Tạo "vòng lặp" qua thời gian</td>
      </tr>
      <tr>
        <td><strong>$b_h$</strong></td>
        <td>Bias hidden</td>
        <td>(H, 1)</td>
        <td>Dịch chuyển ngưỡng kích hoạt của mỗi neuron hidden</td>
      </tr>
      <tr>
        <td><strong>$h_t$</strong></td>
        <td>Hidden state mới</td>
        <td>(H, 1)</td>
        <td>Kết quả: "bộ nhớ" đã được cập nhật sau khi thấy x_t</td>
      </tr>
      <tr>
        <td><strong>$W_{hy}$</strong></td>
        <td>Weight hidden→output</td>
        <td>(O, H)</td>
        <td>Chuyển hidden state thành output. O = output dimension</td>
      </tr>
      <tr>
        <td><strong>$y_t$</strong></td>
        <td>Output tại bước t</td>
        <td>(O, 1)</td>
        <td>Kết quả dự đoán. VD: xác suất từ tiếp theo (qua softmax)</td>
      </tr>
    </tbody>
  </table>

  <h3>4.3. Tại sao gọi là "Recurrent" (Hồi quy)?</h3>

  <div class="definition-block">
    <span class="definition-term">Recurrent = Có vòng lặp qua thời gian</span>
    <p>Trong công thức $h_t = f(W_{hh} \\cdot h_{t-1} + ...)$, $h_t$ phụ thuộc vào $h_{t-1}$, mà $h_{t-1}$ phụ thuộc $h_{t-2}$, ... Đây là <strong>vòng lặp ngầm qua thời gian</strong>.</p>
    <p>"Recurrent" (hồi quy) nghĩa là output quay lại làm input cho bước tiếp theo. Khác biệt hoàn toàn với Feedforward, nơi dữ liệu chỉ đi 1 chiều.</p>
  </div>

  <h3>4.4. Tại sao dùng tanh thay vì ReLU?</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>tanh(z)</h4>
      <p><strong>Output:</strong> [-1, 1]</p>
      <p><strong>Ưu điểm cho RNN:</strong></p>
      <ul>
        <li>Output bị giới hạn → hidden state không "phát nổ" qua nhiều bước</li>
        <li>Centered at 0 → gradient ổn định hơn</li>
        <li>Giá trị âm có ý nghĩa: "giảm" thông tin</li>
      </ul>
      <p><strong>Nhược:</strong> Vanishing gradient khi |z| lớn (đạo hàm tanh → 0)</p>
    </div>
    <div class="concept-card">
      <h4>ReLU(z) = max(0, z)</h4>
      <p><strong>Output:</strong> [0, ∞)</p>
      <p><strong>Vấn đề cho RNN:</strong></p>
      <ul>
        <li>Output không giới hạn → nhân W_hh liên tục qua T bước → h_t → ∞ (exploding)</li>
        <li>Không centered → gradient bias</li>
        <li>Dead ReLU: neuron output = 0 vĩnh viễn</li>
      </ul>
      <p><strong>Kết luận:</strong> ReLU phù hợp FNN/CNN, nhưng nguy hiểm cho RNN</p>
    </div>
  </div>

  <h3>4.5. Parameter Sharing — Tại sao chia sẻ trọng số?</h3>

  <p>Điểm đặc biệt của RNN: <strong>CÙNG MỘT BỘ WEIGHTS</strong> (W_xh, W_hh, W_hy) được sử dụng ở TẤT CẢ các bước thời gian t=1, 2, ..., T.</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tiêu chí</th>
        <th>FNN (không share)</th>
        <th>RNN (share weights)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Số bộ weights</strong></td>
        <td>T bộ riêng biệt (1 bộ cho mỗi bước)</td>
        <td>1 bộ duy nhất cho tất cả bước</td>
      </tr>
      <tr>
        <td><strong>Tổng params</strong></td>
        <td>T × (H×D + H×H) → rất lớn</td>
        <td>1 × (H×D + H×H) → nhỏ gọn</td>
      </tr>
      <tr>
        <td><strong>Xử lý chuỗi mới</strong></td>
        <td>Chuỗi dài hơn T → không xử lý được</td>
        <td>Xử lý BẤT KỲ độ dài nào</td>
      </tr>
      <tr>
        <td><strong>Generalization</strong></td>
        <td>Từ "mèo" ở vị trí 3 và 30 dùng weights riêng</td>
        <td>Từ "mèo" ở bất kỳ vị trí nào dùng cùng weights → tổng quát hóa</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">Key Insight</span>
      <p>Parameter sharing = "học 1 quy tắc chung, áp dụng ở mọi thời điểm". Tương tự cách con người áp dụng cùng quy tắc ngữ pháp cho mọi câu, bất kể câu dài hay ngắn.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// MINH HỌA: FORWARD PASS CỦA RNN
// =====================================================
// Tính h_t = tanh(W_hh * h_{t-1} + W_xh * x_t + b_h)
// y_t = W_hy * h_t + b_y
// =====================================================

fn main() {
    // Kích thước
    let input_dim = 4;   // D: mỗi input có 4 features
    let hidden_dim = 3;  // H: hidden state có 3 neurons
    let output_dim = 4;  // O: output có 4 classes
    
    // === WEIGHTS (trong thực tế, khởi tạo random) ===
    // W_xh: (H, D) = (3, 4) - biến đổi input → hidden
    let w_xh = vec![
        vec![0.1, 0.2, -0.1, 0.3],
        vec![0.4, -0.2, 0.1, 0.0],
        vec![-0.3, 0.1, 0.5, 0.2],
    ];
    // W_hh: (H, H) = (3, 3) - hidden → hidden (RECURRENT)
    let w_hh = vec![
        vec![0.2, -0.1, 0.3],
        vec![0.1, 0.4, -0.2],
        vec![-0.1, 0.2, 0.1],
    ];
    // b_h: (H,) = (3,)
    let b_h = vec![0.0, 0.0, 0.0];
    
    // === INPUT: one-hot encoding cho "hello" ===
    // h=[1,0,0,0], e=[0,1,0,0], l=[0,0,1,0], o=[0,0,0,1]
    let inputs = vec![
        vec![1.0, 0.0, 0.0, 0.0], // 'h'
        vec![0.0, 1.0, 0.0, 0.0], // 'e'
        vec![0.0, 0.0, 1.0, 0.0], // 'l'
        vec![0.0, 0.0, 0.0, 1.0], // 'o'
    ];
    let chars = ['h', 'e', 'l', 'o'];
    
    // Hidden state ban đầu: h_0 = [0, 0, 0]
    let mut h = vec![0.0_f64; hidden_dim];
    
    println!("╔═══════════════════════════════════════════════════════╗");
    println!("║   RNN FORWARD PASS: Xử lý chuỗi 'hello'             ║");
    println!("║   Input dim = {}, Hidden dim = {}                    ║",
             input_dim, hidden_dim);
    println!("╠═══════════════════════════════════════════════════════╣");
    println!("║   h_0 = {:?}", h);
    println!("╠═══════════════════════════════════════════════════════╣");
    
    for (t, x) in inputs.iter().enumerate() {
        // Tính W_xh * x_t
        let mut wxh_x = vec![0.0; hidden_dim];
        for i in 0..hidden_dim {
            for j in 0..input_dim {
                wxh_x[i] += w_xh[i][j] * x[j];
            }
        }
        
        // Tính W_hh * h_{t-1}
        let mut whh_h = vec![0.0; hidden_dim];
        for i in 0..hidden_dim {
            for j in 0..hidden_dim {
                whh_h[i] += w_hh[i][j] * h[j];
            }
        }
        
        // h_t = tanh(W_xh * x_t + W_hh * h_{t-1} + b_h)
        let mut h_new = vec![0.0; hidden_dim];
        for i in 0..hidden_dim {
            h_new[i] = (wxh_x[i] + whh_h[i] + b_h[i]).tanh();
        }
        
        println!("║");
        println!("║   t={}: input = '{}' = {:?}", t+1, chars[t], x);
        println!("║   W_xh·x  = [{:.3}, {:.3}, {:.3}]",
                 wxh_x[0], wxh_x[1], wxh_x[2]);
        println!("║   W_hh·h  = [{:.3}, {:.3}, {:.3}]",
                 whh_h[0], whh_h[1], whh_h[2]);
        println!("║   sum     = [{:.3}, {:.3}, {:.3}]",
                 wxh_x[0]+whh_h[0], wxh_x[1]+whh_h[1], wxh_x[2]+whh_h[2]);
        println!("║   h_{}=tanh = [{:.3}, {:.3}, {:.3}]",
                 t+1, h_new[0], h_new[1], h_new[2]);
        
        h = h_new;
    }
    
    println!("║");
    println!("╠═══════════════════════════════════════════════════════╣");
    println!("║   h_final = [{:.3}, {:.3}, {:.3}]", h[0], h[1], h[2]);
    println!("║   Chứa tóm tắt cả chuỗi 'hello'!");
    println!("╚═══════════════════════════════════════════════════════╝");
    
    // Tổng số parameters
    let params_wxh = hidden_dim * input_dim;
    let params_whh = hidden_dim * hidden_dim;
    let params_bh = hidden_dim;
    let total = params_wxh + params_whh + params_bh;
    println!("\\nSố parameters:");
    println!("  W_xh: {}×{} = {}", hidden_dim, input_dim, params_wxh);
    println!("  W_hh: {}×{} = {}", hidden_dim, hidden_dim, params_whh);
    println!("  b_h:  {} = {}", hidden_dim, params_bh);
    println!("  Tổng: {} params", total);
    println!("  (Cùng bộ weights cho TẤT CẢ {} bước thời gian!)", inputs.len());
}`
  },
  // ==========================================================
  // LESSON 5: TAXONOMY — CÁC KIỂU RNN
  // ==========================================================
  {
    id: 'ch22_01_05',
    title: '5. Taxonomy — Năm kiểu RNN',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>5. Năm kiểu kiến trúc RNN theo Input/Output</h2>

  <p>Tùy thuộc vào bài toán, RNN được thiết kế theo 5 kiểu khác nhau dựa trên số lượng input và output:</p>

  <div class="image-showcase">
    <img src="/images/ch22/rnn_types.png" alt="5 kiểu kiến trúc RNN" />
    <div class="image-caption">5 kiểu kiến trúc RNN: One-to-One, One-to-Many, Many-to-One, Many-to-Many Synced, Many-to-Many Encoder-Decoder</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>1. One-to-One</h4>
      <p><strong>1 input → 1 output</strong></p>
      <p>Thực tế đây chính là FNN bình thường, không thực sự là "recurrent". Đưa vào đây để so sánh.</p>
      <p><em>VD:</em> Phân loại ảnh đơn lẻ (1 ảnh → 1 nhãn "chó/mèo")</p>
    </div>
    <div class="concept-card">
      <h4>2. One-to-Many</h4>
      <p><strong>1 input → chuỗi output</strong></p>
      <p>Từ 1 input ban đầu, RNN sinh ra chuỗi output liên tiếp. Output bước trước là input cho bước sau.</p>
      <p><em>VD:</em></p>
      <ul>
        <li><strong>Image Captioning:</strong> 1 ảnh → "Con mèo đang ngồi trên bàn"</li>
        <li><strong>Music Generation:</strong> 1 nốt bắt đầu → bài nhạc hoàn chỉnh</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>3. Many-to-One</h4>
      <p><strong>Chuỗi input → 1 output</strong></p>
      <p>RNN đọc toàn bộ chuỗi, rồi dùng hidden state cuối cùng h_T để dự đoán 1 output duy nhất.</p>
      <p><em>VD:</em></p>
      <ul>
        <li><strong>Sentiment Analysis:</strong> "Phim này hay quá!" → Tích cực (★★★★★)</li>
        <li><strong>Spam Detection:</strong> toàn bộ email → Spam / Không Spam</li>
        <li><strong>Video Classification:</strong> chuỗi frames → nhãn "bóng đá"</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>4. Many-to-Many (Synced)</h4>
      <p><strong>Chuỗi input → chuỗi output CÙNG ĐỘ DÀI</strong></p>
      <p>Mỗi bước thời gian có 1 input và 1 output tương ứng. Input và output aligned (căn chỉnh) 1:1.</p>
      <p><em>VD:</em></p>
      <ul>
        <li><strong>POS Tagging:</strong> "Tôi ăn cơm" → "Đại từ Động từ Danh từ"</li>
        <li><strong>NER:</strong> "Nguyễn Văn A sống ở Hà Nội" → "B-PER I-PER I-PER O O B-LOC I-LOC"</li>
      </ul>
    </div>
    <div class="concept-card">
      <h4>5. Many-to-Many (Encoder-Decoder)</h4>
      <p><strong>Chuỗi input → chuỗi output KHÁC ĐỘ DÀI</strong></p>
      <p>Chia thành 2 phần: <strong>Encoder</strong> (đọc input, tạo context vector) → <strong>Decoder</strong> (sinh output từ context). Input và output có thể khác ngôn ngữ, khác độ dài.</p>
      <p><em>VD:</em></p>
      <ul>
        <li><strong>Machine Translation:</strong> "I love you" (3 từ) → "Tôi yêu bạn" (3 từ, nhưng có thể khác)</li>
        <li><strong>Text Summarization:</strong> bài viết 500 từ → tóm tắt 50 từ</li>
        <li><strong>Chatbot:</strong> câu hỏi → câu trả lời (độ dài khác nhau)</li>
      </ul>
    </div>
  </div>

  <h3>5.1. Bảng tóm tắt</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Kiểu</th>
        <th>Input</th>
        <th>Output</th>
        <th>Ứng dụng chính</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>One-to-One</td>
        <td>1 vector</td>
        <td>1 vector</td>
        <td>Classification (= FNN)</td>
      </tr>
      <tr>
        <td>One-to-Many</td>
        <td>1 vector</td>
        <td>Chuỗi T vectors</td>
        <td>Image Captioning, Music Generation</td>
      </tr>
      <tr>
        <td>Many-to-One</td>
        <td>Chuỗi T vectors</td>
        <td>1 vector</td>
        <td>Sentiment Analysis, Classification chuỗi</td>
      </tr>
      <tr>
        <td>Many-to-Many (Synced)</td>
        <td>Chuỗi T vectors</td>
        <td>Chuỗi T vectors</td>
        <td>POS Tagging, NER, Video frame labeling</td>
      </tr>
      <tr>
        <td>Many-to-Many (Enc-Dec)</td>
        <td>Chuỗi T₁ vectors</td>
        <td>Chuỗi T₂ vectors</td>
        <td>Translation, Summarization, Chatbot</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 6: LỊCH SỬ PHÁT TRIỂN RNN
  // ==========================================================
  {
    id: 'ch22_01_06',
    title: '6. Lịch sử phát triển RNN',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>6. Timeline lịch sử Recurrent Neural Networks</h2>

  <p>RNN đã trải qua gần 40 năm phát triển, từ mô hình mạng hồi quy đầu tiên đến khi bị Transformer thay thế:</p>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>1982 — Hopfield Network (John Hopfield)</h4>
        <p>Mạng hồi quy đầu tiên: fully connected, mỗi neuron kết nối với mọi neuron khác. Sử dụng làm <strong>associative memory</strong> — cho 1 pattern bị nhiễu, mạng tìm lại pattern gốc. Hạn chế: chỉ lưu trữ patterns tĩnh, không xử lý chuỗi theo thời gian.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>1986 — Elman Network (Jeffrey Elman)</h4>
        <p><strong>Simple RNN (SRN) đầu tiên.</strong> Elman thêm "context layer" lưu hidden state từ bước trước, đưa lại làm input cho bước hiện tại. Đây chính là kiến trúc Vanilla RNN mà ta đã học ở mục 4. Lần đầu tiên mạng neural có "trí nhớ" ngắn hạn.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>1990 — Jordan Network (Michael Jordan)</h4>
        <p>Biến thể khác: thay vì feedback hidden state (như Elman), Jordan Network feedback <strong>output</strong> của bước trước. Sự khác biệt: Elman nhớ "trạng thái nội bộ", Jordan nhớ "output đã nói gì".</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>1993 — Phát hiện Vanishing Gradient (Bengio et al.)</h4>
        <p>Yoshua Bengio và cộng sự chứng minh toán học rằng gradient trong RNN <strong>giảm theo cấp số nhân</strong> khi backprop qua nhiều bước thời gian. Hệ quả: RNN không thể nhớ thông tin xa quá ~10-20 bước. Đây là rào cản lớn nhất của Vanilla RNN.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>1997 — LSTM (Hochreiter &amp; Schmidhuber)</h4>
        <p><strong>Breakthrough lớn nhất trong lịch sử RNN.</strong> Sepp Hochreiter và Jürgen Schmidhuber phát minh Long Short-Term Memory (LSTM) với cơ chế <strong>gate</strong> (cổng): Forget Gate, Input Gate, Output Gate. Cell state chạy xuyên suốt chuỗi như "đường cao tốc", giải quyết vanishing gradient. LSTM trở thành kiến trúc RNN thống trị trong 20 năm tiếp theo.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">6</div>
      <div class="step-content">
        <h4>2014 — GRU (Cho et al.) &amp; Seq2Seq (Sutskever et al.)</h4>
        <p><strong>GRU:</strong> Kyunghyun Cho đề xuất Gated Recurrent Unit — đơn giản hóa LSTM bằng cách gộp gate, bỏ cell state riêng. Ít params hơn, hiệu năng tương đương.</p>
        <p><strong>Seq2Seq:</strong> Ilya Sutskever (Google) chứng minh LSTM Encoder-Decoder có thể dịch máy cấp độ production. Đánh dấu sự thành công thương mại của RNN.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">7</div>
      <div class="step-content">
        <h4>2015 — Attention Mechanism (Bahdanau et al.)</h4>
        <p>Dzmitry Bahdanau đề xuất cơ chế Attention: decoder "nhìn lại" tất cả hidden states của encoder thay vì chỉ dùng context vector cuối. Cải thiện đáng kể chất lượng dịch máy. Đây là tiền thân trực tiếp của Transformer.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">8</div>
      <div class="step-content">
        <h4>2017 — Transformer: "Attention Is All You Need"</h4>
        <p>Vaswani et al. (Google) phát minh kiến trúc <strong>Transformer</strong> — loại bỏ hoàn toàn recurrence, chỉ dùng Self-Attention. Transformer xử lý <strong>song song</strong> (parallel) thay vì tuần tự → nhanh hơn nhiều. Dẫn đến BERT, GPT, T5, và toàn bộ hệ sinh thái LLM hiện đại. RNN dần bị thay thế trong NLP, nhưng vẫn được dùng cho time series và embedded systems.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tại sao vẫn học RNN khi đã có Transformer?</span>
      <ul>
        <li><strong>Nền tảng:</strong> Hiểu RNN/LSTM là tiền đề để hiểu tại sao Transformer ra đời</li>
        <li><strong>Vẫn hữu ích:</strong> RNN/LSTM nhẹ hơn Transformer cho bài toán chuỗi ngắn, tài nguyên hạn chế (embedded, mobile)</li>
        <li><strong>Time series:</strong> LSTM vẫn là baseline mạnh cho dự đoán chuỗi thời gian</li>
        <li><strong>Tư duy:</strong> Khái niệm hidden state, gate, attention từ RNN được kế thừa trong Transformer</li>
      </ul>
    </div>
  </div>

  <div class="key-takeaway">
    <h3>Tóm tắt Bài 22.1</h3>
    <ul>
      <li><strong>FNN thất bại</strong> với dữ liệu tuần tự vì thiếu bộ nhớ và không xử lý được chuỗi có độ dài biến đổi</li>
      <li><strong>Sequential Data</strong> = dữ liệu mà thứ tự quan trọng: text, time series, audio, video, DNA</li>
      <li><strong>Hidden State (h_t)</strong> = "bộ nhớ" của RNN, mã hóa thông tin tóm tắt từ tất cả input đã thấy</li>
      <li><strong>Công thức RNN:</strong> $h_t = \\tanh(W_{hh} \\\\cdot h_{t-1} + W_{xh} \\\\cdot x_t + b_h)$</li>
      <li><strong>Parameter Sharing:</strong> cùng 1 bộ weights cho mọi bước thời gian → xử lý chuỗi bất kỳ độ dài</li>
      <li><strong>5 kiểu RNN:</strong> One-to-One, One-to-Many, Many-to-One, Many-to-Many (synced), Many-to-Many (encoder-decoder)</li>
      <li><strong>Lịch sử:</strong> 1982 Hopfield → 1986 Elman → 1997 LSTM → 2014 GRU → 2017 Transformer thay thế</li>
    </ul>
  </div>
</div>
    `,
    defaultCode: ''
  },
];

const ch22_01: Chapter = {
  id: 'ch22_01',
  title: '22.1. Tại Sao Cần RNN? — Dữ Liệu Chuỗi & Bộ Nhớ',
  introduction: 'Nền tảng về Recurrent Neural Network: tại sao cần RNN, dữ liệu chuỗi, hidden state, kiến trúc cơ bản, và các kiểu RNN.',
  lessons: ch22_01_lessons,
};

export default ch22_01;
