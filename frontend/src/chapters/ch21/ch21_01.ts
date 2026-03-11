// =====================================================
// Chương 21: MẠNG NEURAL NETWORK (Neural Networks)
// Bài 1: NỀN TẢNG MACHINE LEARNING, PERCEPTRON & DATA PIPELINE
//
// ĐÂY LÀ BÀI HỌC NỀN TẢNG - TOÀN BỘ KIẾN THỨC CỐT LÕI
// Mục tiêu của bài học này:
// 1. Hiểu sâu Machine Learning: Supervised, Unsupervised, Reinforcement Learning
// 2. Neuron sinh học → Neuron nhân tạo: giải phẫu từng thành phần
// 3. Perceptron: cấu tạo, công thức, hạn chế XOR, Learning Rule
// 4. Tensor: Scalar, Vector, Matrix, Rank, Shape, Phép toán
// 5. Data Pipeline: Encoding, Normalization, Splitting, Batching
// 6. Ví dụ code Rust chi tiết từng dòng cho mỗi khái niệm
// =====================================================

import { Lesson, Chapter } from '../../courses';

// =====================================================
// PHẦN LÝ THUYẾT - TỔNG HỢP KIẾN THỨC ĐẦY ĐỦ
// =====================================================

const ch21_01_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: MACHINE LEARNING LÀ GÌ? - GIẢI THÍCH TOÀN DIỆN
  // ==========================================================
  {
    id: 'ch21_01_01',
    title: '1. Machine Learning là gì? Neural Network nằm ở đâu?',
    duration: '30 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">psychology</span> 1. Machine Learning là gì? Neural Network nằm ở đâu trong bản đồ AI?</h2>

  <!-- ========================================= -->
  <!-- 1.1. LẬP TRÌNH TRUYỀN THỐNG VS ML        -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">lightbulb</span> 1.1. Lập trình truyền thống vs Machine Learning</h3>
  
  <p>Trước khi nói về Neural Network, ta cần hiểu <strong>Machine Learning (ML)</strong> - nền tảng mà Neural Network được xây dựng trên đó. <strong>Machine Learning</strong> là một nhánh của Trí Tuệ Nhân Tạo (AI), cho phép máy tính <strong>"học" từ dữ liệu</strong> mà không cần lập trình viên viết code cho từng tình huống cụ thể.</p>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">code</span></div>
      <h4>Lập trình truyền thống</h4>
      <p><strong>Input + RULES (do con người viết) &rarr; Output</strong></p>
      <p><em>Quy trình:</em></p>
      <ol>
        <li>Lập trình viên phân tích bài toán</li>
        <li>Viết từng quy tắc IF/ELSE bằng tay</li>
        <li>Test và sửa lỗi thủ công</li>
        <li>Khi có tình huống mới → phải viết thêm code</li>
      </ol>
      <p><em>Ví dụ cụ thể - Bộ lọc Email Spam:</em></p>
      <ul>
        <li>Rule 1: Nếu chứa từ "Viagra" → Spam</li>
        <li>Rule 2: Nếu sender trong blacklist → Spam</li>
        <li>Rule 3: Nếu có hơn 5 link → Spam</li>
        <li>Rule 4: Nếu toàn chữ HOA → Spam</li>
        <li>... phải viết hàng trăm rules</li>
      </ul>
      <p><strong>Nhược điểm:</strong> Con người không thể lường trước tất cả tình huống. Spammer thay đổi chiến thuật liên tục → rules cũ bị vô hiệu hóa.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">model_training</span></div>
      <h4>Machine Learning</h4>
      <p><strong>Input + Output (dữ liệu mẫu) &rarr; RULES (máy tự học)</strong></p>
      <p><em>Quy trình:</em></p>
      <ol>
        <li>Thu thập dữ liệu có nhãn (ví dụ: 100,000 email đã được đánh dấu spam/không spam)</li>
        <li>Đưa dữ liệu vào mô hình ML</li>
        <li>Mô hình TỰ TÌM RA patterns và rules</li>
        <li>Khi có dữ liệu mới → mô hình tự cập nhật</li>
      </ol>
      <p><em>Ví dụ cụ thể - ML lọc Email Spam:</em></p>
      <ul>
        <li>Cho máy xem 100,000 email spam và 100,000 email không spam</li>
        <li>Máy TỰ phát hiện: "email spam thường có nhiều link, chữ hoa, sender lạ..."</li>
        <li>Máy TỰ tạo ra bộ lọc phức tạp hơn con người có thể viết</li>
        <li>Khi spammer thay đổi → train lại với dữ liệu mới</li>
      </ul>
      <p><strong>Ưu điểm:</strong> Phát hiện patterns mà con người không nhìn thấy. Tự thích nghi với dữ liệu mới.</p>
    </div>
  </div>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">stars</span>
    <div class="callout-content">
      <span class="callout-title">Sự khác biệt cốt lõi</span>
      <p>Lập trình truyền thống: Con người viết rules → máy chấp hành.</p>
      <p>Machine Learning: Con người cung cấp dữ liệu → máy TỰ tìm ra rules.</p>
      <p>Đây là sự đảo ngược hoàn toàn tư duy lập trình. Thay vì "dạy máy làm gì", ta "cho máy dữ liệu để nó tự học".</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.2. BA LOẠI MACHINE LEARNING             -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">category</span> 1.2. Ba loại Machine Learning chính</h3>
  
  <p>Machine Learning được chia thành 3 nhánh chính dựa trên cách dữ liệu được cung cấp cho mô hình:</p>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">school</span></div>
      <h4>Supervised Learning (Học có giám sát)</h4>
      <p><strong>Đặc điểm:</strong> Có cả DỮ LIỆU và NHÃN (đáp án).</p>
      <p><em>Giống như:</em> Học sinh làm bài tập có đáp án. Mỗi bài sai, thầy giáo chỉ ra lỗi.</p>
      <p><strong>Hai dạng bài toán:</strong></p>
      <ul>
        <li><strong>Classification (Phân loại):</strong> Output là loại rời rạc.<br/>
        VD: Email → Spam/Không Spam, Ảnh → Chó/Mèo/Chim.<br/>
        Thuật toán: Logistic Regression, SVM, Decision Trees, Neural Networks.</li>
        <li><strong>Regression (Hồi quy):</strong> Output là số liên tục.<br/>
        VD: Diện tích nhà → Giá 5 tỷ, Số năm kinh nghiệm → Lương 30 triệu.<br/>
        Thuật toán: Linear Regression, Polynomial Regression, Neural Networks.</li>
      </ul>
      <p><strong>Ví dụ thực tế:</strong></p>
      <ul>
        <li>Gmail phân loại email spam (Classification)</li>
        <li>YouTube đề xuất video (Recommendation = Classification)</li>
        <li>Dự đoán giá Bitcoin ngày mai (Regression)</li>
        <li>Phát hiện ung thư từ ảnh X-quang (Classification)</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">travel_explore</span></div>
      <h4>Unsupervised Learning (Không giám sát)</h4>
      <p><strong>Đặc điểm:</strong> Chỉ có DỮ LIỆU, KHÔNG có nhãn. Máy tự tìm cấu trúc ẩn.</p>
      <p><em>Giống như:</em> Cho một đống đồ chơi lẫn lộn, tự phân loại mà không ai chỉ cách.</p>
      <p><strong>Các dạng bài toán:</strong></p>
      <ul>
        <li><strong>Clustering (Phân cụm):</strong> Gom nhóm dữ liệu tương tự.<br/>
        VD: Phân nhóm khách hàng theo thói quen mua sắm.<br/>
        Thuật toán: K-Means, DBSCAN, Hierarchical Clustering.</li>
        <li><strong>Dimensionality Reduction (Giảm chiều):</strong> Nén dữ liệu nhiều chiều về ít chiều.<br/>
        VD: Nén ảnh 1000 pixel về 50 features quan trọng nhất.<br/>
        Thuật toán: PCA, t-SNE, UMAP, Autoencoders.</li>
        <li><strong>Anomaly Detection (Phát hiện bất thường):</strong> Tìm dữ liệu "lạ".<br/>
        VD: Phát hiện giao dịch gian lận trong hàng triệu giao dịch ngân hàng.</li>
      </ul>
      <p><strong>Ví dụ thực tế:</strong></p>
      <ul>
        <li>Spotify gom nhóm bài hát theo thể loại (Clustering)</li>
        <li>Phát hiện giao dịch bất thường thẻ tín dụng (Anomaly Detection)</li>
        <li>Nén ảnh mà vẫn giữ chất lượng (Dimensionality Reduction)</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">sports_esports</span></div>
      <h4>Reinforcement Learning (Học tăng cường)</h4>
      <p><strong>Đặc điểm:</strong> Học bằng THỬ VÀ SAI, nhận thưởng/phạt từ môi trường.</p>
      <p><em>Giống như:</em> Dạy chó: làm đúng → cho bánh, làm sai → phạt. Chó tự tìm ra hành vi tốt nhất.</p>
      <p><strong>Các thành phần:</strong></p>
      <ul>
        <li><strong>Agent:</strong> Người chơi (AI đang học)</li>
        <li><strong>Environment:</strong> Thế giới xung quanh Agent</li>
        <li><strong>State:</strong> Trạng thái hiện tại của thế giới</li>
        <li><strong>Action:</strong> Hành động Agent thực hiện</li>
        <li><strong>Reward:</strong> Phần thưởng/phạt sau mỗi hành động</li>
        <li><strong>Policy:</strong> Chiến lược mà Agent học được</li>
      </ul>
      <p><strong>Ví dụ thực tế:</strong></p>
      <ul>
        <li>AlphaGo đánh cờ vây thắng nhà vô địch thế giới</li>
        <li>Xe tự lái Tesla (điều khiển lái, ga, phanh)</li>
        <li>Robot học đi bộ (thử hàng triệu lần cho đến khi đi được)</li>
        <li>AI chơi game Atari (chỉ nhìn screen pixels, tự học chơi)</li>
      </ul>
    </div>
  </div>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">info</span>
    <div class="callout-content">
      <span class="callout-title">Neural Network nằm ở đâu?</span>
      <p>Neural Network (mạng nơ-ron) chủ yếu được dùng trong <strong>Supervised Learning</strong> - ta cho nó dữ liệu và đáp án, nó tự tìm ra quy luật. Tuy nhiên, Neural Network cũng được dùng trong cả 3 nhánh:</p>
      <ul>
        <li><strong>Supervised:</strong> CNN phân loại ảnh, RNN dịch ngôn ngữ</li>
        <li><strong>Unsupervised:</strong> Autokencoders nén dữ liệu, GANs tạo ảnh giả</li>
        <li><strong>Reinforcement:</strong> DQN (Deep Q-Network) chơi game Atari</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.3. TRAINING DATA VS TEST DATA           -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">dataset</span> 1.3. Training Data vs Test Data - Tại sao phải chia dữ liệu?</h3>
  
  <p>Khi có dữ liệu (ví dụ 10,000 ảnh), ta KHÔNG BAO GIỜ cho máy học toàn bộ. Phải chia ra:</p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tập dữ liệu</th>
        <th>Tỷ lệ</th>
        <th>Mục đích</th>
        <th>Khi nào dùng</th>
        <th>Ví dụ thực tế</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Training Set</strong></td>
        <td>60-80%</td>
        <td>Máy "học" từ đây</td>
        <td>Trong quá trình training</td>
        <td>Giống học sinh làm bài tập trong sách</td>
      </tr>
      <tr>
        <td><strong>Validation Set</strong></td>
        <td>10-20%</td>
        <td>Điều chỉnh hyperparameters</td>
        <td>Sau mỗi epoch training</td>
        <td>Giống học sinh làm đề thi thử</td>
      </tr>
      <tr>
        <td><strong>Test Set</strong></td>
        <td>10-20%</td>
        <td>Đánh giá cuối cùng</td>
        <td>CHỈ dùng 1 lần cuối</td>
        <td>Giống học sinh đi thi đại học THẬT</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">Overfitting vs Underfitting</span>
      <p><strong>Overfitting (Học vẹt):</strong> Mô hình thuộc lòng dữ liệu training, nhưng gặp dữ liệu mới thì sai be bét. Giống học sinh chỉ thuộc đáp án bài tập, ra đề mới là bó tay.</p>
      <p><strong>Underfitting (Học kém):</strong> Mô hình quá đơn giản, không nắm được pattern. Giống học sinh đọc qua 1 lần rồi đi thi.</p>
      <p><strong>Mục tiêu:</strong> Tìm điểm cân bằng - mô hình đủ phức tạp để học pattern, nhưng không quá phức tạp để thuộc lòng noise (nhiễu).</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.4. NEURON SINH HỌC                      -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">biotech</span> 1.4. Neuron sinh học - Cơ sở cảm hứng</h3>
  
  <p>Neural Network nhân tạo <strong>mô phỏng</strong> quá trình gửi/nhận tín hiệu của não bộ. Não người có khoảng <strong>86 tỷ neuron</strong>, mỗi neuron kết nối với khoảng <strong>7,000 neuron khác</strong> thông qua <strong>synapse</strong>.</p>

  <div class="definition-block">
    <span class="definition-term">Cách hoạt động của neuron sinh học</span>
    <ol>
      <li><strong>Thu nhận tín hiệu:</strong> Dendrites (nhánh nhận) thu tín hiệu điện từ các neuron khác.</li>
      <li><strong>Tích lũy:</strong> Cell body (thân tế bào) tổng hợp tất cả tín hiệu nhận được.</li>
      <li><strong>Quyết định:</strong> Nếu tổng tín hiệu vượt quá ngưỡng (threshold) → neuron "bắn" (fire).</li>
      <li><strong>Truyền đi:</strong> Axon (sợi trục) truyền tín hiệu đến các neuron tiếp theo qua synapse.</li>
    </ol>
  </div>

  <div class="definition-block">
    <span class="definition-term">Nguyên tắc Hebb (1949): "Neurons that fire together, wire together"</span>
    <p>Những neuron cùng "bắn" tín hiệu sẽ có kết nối <strong>mạnh hơn</strong>. Đây là cơ chế hình thành trí nhớ và học tập.</p>
    <p><em>Ví dụ:</em> Lần đầu chạm lửa → đau → neuron "lửa" và neuron "đau" cùng bắn → kết nối mạnh lên. Lần sau chỉ nhìn lửa → não tự liên kết đến "đau" → rụt tay lại.</p>
    <p><em>Trong AI:</em> Khi mô hình dự đoán đúng, các weights (kết nối) được tăng cường. Dự đoán sai → weights bị giảm. Đây chính là quá trình "learning" (học).</p>
  </div>

  <h4>Bảng so sánh Neuron sinh học vs Neuron nhân tạo</h4>
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Thành phần sinh học</th>
        <th>Thành phần AI</th>
        <th>Ký hiệu</th>
        <th>Vai trò chi tiết</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Dendrites</strong> (Nhánh nhận)</td>
        <td>Inputs</td>
        <td>$x_1, x_2, ..., x_n$</td>
        <td>Thu thập dữ liệu đầu vào. Mỗi input là 1 feature (đặc trưng) của dữ liệu. VD: pixel của ảnh, từ trong câu, giá cổ phiếu.</td>
      </tr>
      <tr>
        <td><strong>Synapse</strong> (Khớp nối)</td>
        <td>Weights</td>
        <td>$w_1, w_2, ..., w_n$</td>
        <td>Quyết định "Mức độ quan trọng" của từng input. Weight lớn = input quan trọng. Weight nhỏ = input ít ảnh hưởng. Weight âm = input có tác dụng ngược.</td>
      </tr>
      <tr>
        <td><strong>Cell body</strong> (Thân TB)</td>
        <td>Weighted Sum</td>
        <td>$z = \\sum w_i x_i + b$</td>
        <td>Tổng hợp tất cả tín hiệu: nhân mỗi input với weight tương ứng, cộng tất cả lại, cộng thêm bias.</td>
      </tr>
      <tr>
        <td><strong>Threshold</strong> (Ngưỡng)</td>
        <td>Bias</td>
        <td>$b$</td>
        <td>Điều chỉnh "ngưỡng kích hoạt" của neuron. Bias dương → dễ kích hoạt (dễ bắn). Bias âm → khó kích hoạt. Giống như chỉnh ngưỡng nhạy của cảm biến khói.</td>
      </tr>
      <tr>
        <td><strong>Axon hillock</strong> (Đồi sợi trục)</td>
        <td>Activation Function</td>
        <td>$f(z)$</td>
        <td>Quyết định neuron có "bắn" hay không và bắn mạnh cỡ nào. Chuyển tổng z thành output y. Tạo tính phi tuyến cho mạng (cực kỳ quan trọng).</td>
      </tr>
      <tr>
        <td><strong>Axon</strong> (Sợi trục)</td>
        <td>Output</td>
        <td>$y = f(z)$</td>
        <td>Kết quả cuối cùng truyền ra ngoài. Output của neuron này trở thành input của neuron tiếp theo.</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 1.5. UNIVERSAL APPROXIMATION THEOREM       -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">memory</span> 1.5. Định Lý Xấp Xỉ Phổ Quát (Universal Approximation Theorem)</h3>
  
  <div class="definition-block">
    <span class="definition-term">Universal Approximation Theorem (Cybenko, 1989; Hornik, 1991)</span>
    <p>Một Neural Network với <strong>ít nhất 1 hidden layer</strong> chứa đủ số neurons và sử dụng activation function phi tuyến có thể <strong>xấp xỉ BẤT KỲ</strong> hàm số liên tục nào trên một miền compact với độ chính xác tùy ý.</p>
  </div>

  <p><strong>Giải thích đơn giản:</strong></p>
  <ul>
    <li>Về mặt lý thuyết, Neural Network có thể "học" bất kỳ mối quan hệ nào giữa input và output.</li>
    <li>Muốn phân biệt chó/mèo? NN làm được.</li>
    <li>Muốn dự đoán giá nhà? NN làm được.</li>
    <li>Muốn dịch tiếng Anh sang tiếng Việt? NN làm được.</li>
  </ul>

  <p><strong>Nhưng có 2 vấn đề:</strong></p>
  <ol>
    <li><strong>Theorem chỉ nói "CÓ THỂ"</strong>, không nói "làm sao để tìm" weights đúng. Đó là lý do ta phải "train" mô hình - tìm bộ weights tối ưu.</li>
    <li><strong>"Đủ số neurons"</strong> có thể là rất nhiều. Với bài toán phức tạp, cần hàng triệu neurons → cần nhiều data và GPU mạnh.</li>
  </ol>

  <div class="callout callout-info">
    <span class="material-symbols-outlined">lightbulb</span>
    <div class="callout-content">
      <span class="callout-title">Tại sao dùng Deep Network (nhiều layers) thay vì 1 layer rộng?</span>
      <p>Theo lý thuyết, 1 hidden layer đủ rộng có thể xấp xỉ bất kỳ hàm nào. Nhưng trong thực tế:</p>
      <ul>
        <li><strong>Deep (nhiều layers):</strong> Mỗi layer học 1 mức trừu tượng. Layer 1 học cạnh/góc, Layer 2 học hình dạng, Layer 3 học vật thể → hiệu quả hơn.</li>
        <li><strong>Wide (1 layer rộng):</strong> Cần số neurons khổng lồ (có thể tăng theo hàm mũ) để xấp xỉ cùng một hàm. Không hiệu quả.</li>
      </ul>
      <p>Đó là lý do "Deep Learning" (học sâu = nhiều layers) vượt trội hơn mạng nông (shallow network).</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.6. NEURAL NETWORK GIẢI QUYẾT BÀI TOÁN GÌ -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">apps</span> 1.6. Neural Network giải quyết bài toán gì?</h3>
  
  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">category</span></div>
      <h4>Classification (Phân loại)</h4>
      <p>Dự đoán một loại rời rạc (categorical).</p>
      <p><strong>Binary Classification:</strong> 2 lớp (Spam/Không Spam, Bệnh/Không Bệnh)</p>
      <p><strong>Multi-class Classification:</strong> Nhiều lớp (Chó/Mèo/Chim/Cá)</p>
      <p><em>Output layer:</em> Sigmoid (binary) hoặc Softmax (multi-class)</p>
      <p><em>Loss function:</em> Binary Cross-Entropy hoặc Categorical Cross-Entropy</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">ssid_chart</span></div>
      <h4>Regression (Hồi quy)</h4>
      <p>Dự đoán số thực liên tục.</p>
      <p><em>Ví dụ:</em> Dự đoán giá nhà, dự đoán nhiệt độ ngày mai, dự đoán doanh thu.</p>
      <p><em>Output layer:</em> Linear (không activation hoặc Identity)</p>
      <p><em>Loss function:</em> MSE (Mean Squared Error) hoặc MAE (Mean Absolute Error)</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">auto_fix_high</span></div>
      <h4>Generation (Sinh mới)</h4>
      <p>Tạo dữ liệu mới từ patterns đã học.</p>
      <p><em>Ví dụ:</em> ChatGPT viết văn, DALL-E vẽ ảnh, Midjourney thiết kế.</p>
      <p><em>Kiến trúc:</em> Transformers, GANs, VAEs, Diffusion Models</p>
      <p><em>Đặc biệt:</em> Không chỉ học patterns, mà còn học phân phối xác suất của dữ liệu.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">workspaces</span></div>
      <h4>Sequence-to-Sequence</h4>
      <p>Biến đổi một chuỗi thành chuỗi khác.</p>
      <p><em>Ví dụ:</em> Dịch thuật (Anh→Việt), Tóm tắt văn bản, Chuyển giọng nói thành text.</p>
      <p><em>Kiến trúc:</em> Encoder-Decoder, Transformers</p>
      <p><em>Đặc biệt:</em> Input và output có thể khác độ dài.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.7. LỊCH SỬ PHÁT TRIỂN                    -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">history</span> 1.7. Lịch sử phát triển Neural Networks</h3>
  
  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>1943 - McCulloch-Pitts Neuron</h4>
        <p>Warren McCulloch (nhà thần kinh học) và Walter Pitts (nhà logic học) đề xuất mô hình toán học đầu tiên của neuron. Mô hình MCP neuron rất đơn giản: nhận inputs nhị phân (0 hoặc 1), tính tổng, so với ngưỡng. Nhưng KHÔNG CÓ khả năng học (weights cố định).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>1949 - Nguyên tắc Hebb</h4>
        <p>Donald Hebb đề xuất cơ chế học: "Neurons that fire together, wire together". Đây là nền tảng lý thuyết cho việc điều chỉnh weights dựa trên dữ liệu.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>1958 - Perceptron (Frank Rosenblatt)</h4>
        <p>Rosenblatt tạo Perceptron - neuron nhân tạo đầu tiên CÓ THỂ HỌC. Perceptron có thể phân loại dữ liệu linearly separable. Tuy nhiên, năm 1969, Minsky & Papert chứng minh Perceptron đơn lớp KHÔNG THỂ giải quyết XOR → AI Winter lần 1 (1969-1986).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>1986 - Backpropagation popularized</h4>
        <p>Rumelhart, Hinton và Williams phổ biến Backpropagation - thuật toán tính gradient hiệu quả cho multi-layer networks. Kết hợp với Gradient Descent, cho phép huấn luyện mạng nhiều lớp lần đầu tiên.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>1998 - LeNet-5 (Yann LeCun)</h4>
        <p>Convolutional Neural Network (CNN) đầu tiên thành công trong thực tế. LeNet-5 nhận diện chữ viết tay trên séc ngân hàng. Là tiền thân của mọi CNN hiện đại.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">6</div>
      <div class="step-content">
        <h4>2012 - AlexNet & Kỷ nguyên Deep Learning</h4>
        <p>Alex Krizhevsky thắng ImageNet bằng Deep CNN (AlexNet), giảm error rate từ 26% xuống 15.3%. GPU computing (NVIDIA CUDA) cho phép training mạng sâu. Đánh dấu sự bùng nổ của Deep Learning.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">7</div>
      <div class="step-content">
        <h4>2017 - Transformers ("Attention is All You Need")</h4>
        <p>Google công bố kiến trúc Transformer với cơ chế Self-Attention. Thay thế hoàn toàn RNN/LSTM cho NLP. Dẫn đến BERT (2018), GPT-2 (2019), GPT-3 (2020), GPT-4 (2023), và toàn bộ hệ sinh thái LLM hiện tại.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">8</div>
      <div class="step-content">
        <h4>2022-2026 - Kỷ nguyên AI toàn diện</h4>
        <p>ChatGPT (2022) đưa AI đến hàng tỷ người. Diffusion Models (Stable Diffusion, DALL-E) tạo ảnh. Multimodal AI (GPT-4V, Gemini) xử lý cả text, ảnh, video, code. AI trở thành công cụ thiết yếu trong mọi ngành.</p>
      </div>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 1.8. CẤU TRÚC ĐIỂN HÌNH CỦA NN             -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">schema</span> 1.8. Cấu trúc điển hình của Neural Network</h3>
  
  <div class="image-showcase">
    <img src="/images/ch21/nn_layers_correct.png" alt="Neural Network Component Layers" />
    <div class="image-caption"><span class="material-symbols-outlined">info</span> Sơ đồ cấu tạo một mạng Neural Network 2 Hidden Layers</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">login</span></div>
      <h4>Input Layer (Lớp đầu vào)</h4>
      <p><strong>Vai trò:</strong> Nhận dữ liệu thô và chuyển tiếp cho hidden layers.</p>
      <p><strong>Không tính toán gì:</strong> Input layer chỉ pass-through data.</p>
      <p><strong>Số neurons:</strong> = Số features của dữ liệu.</p>
      <p><em>VD:</em> Ảnh 28x28 pixels grayscale → 784 input neurons. Ảnh 224x224 RGB → 150,528 input neurons.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">layers</span></div>
      <h4>Hidden Layer(s) (Lớp ẩn)</h4>
      <p><strong>Vai trò:</strong> Trích xuất đặc trưng (features) từ data ở nhiều mức trừu tượng.</p>
      <p><strong>Số layers:</strong> 1 (shallow) → hàng trăm (deep). Càng sâu → càng trừu tượng.</p>
      <p><strong>Số neurons mỗi layer:</strong> Hyperparameter cần tuning.</p>
      <p><em>VD nhận diện ảnh:</em></p>
      <ul>
        <li>Hidden Layer 1: Phát hiện cạnh, góc, đường thẳng</li>
        <li>Hidden Layer 2: Ghép cạnh thành hình dạng (tam giác, tròn, vuông)</li>
        <li>Hidden Layer 3: Ghép hình thành bộ phận (mắt, mũi, tai)</li>
        <li>Hidden Layer 4: Nhận diện tổng thể (mặt người, mặt chó)</li>
      </ul>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">logout</span></div>
      <h4>Output Layer (Lớp đầu ra)</h4>
      <p><strong>Vai trò:</strong> Đưa ra dự đoán cuối cùng.</p>
      <p><strong>Số neurons:</strong> Phụ thuộc bài toán.</p>
      <ul>
        <li>Binary Classification: 1 neuron (Sigmoid → xác suất 0~1)</li>
        <li>Multi-class (10 lớp): 10 neurons (Softmax → 10 xác suất)</li>
        <li>Regression: 1 neuron (Linear → số thực)</li>
      </ul>
    </div>
  </div>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">psychology</span></div>
    <h3>Tóm tắt bài 1</h3>
    <p>Neural Network về bản chất là một hàm số toán học khổng lồ $f(X; W, b)$ có khả năng <strong>tự điều chỉnh các tham số (Weights & Biases)</strong> để <strong>biến Input thành Output</strong> chính xác nhất thông qua việc học từ dữ liệu mẫu. Quá trình điều chỉnh này gọi là "Training" (huấn luyện).</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// VÍ DỤ MINH HỌA: NEURAL NETWORK ĐƠN GIẢN NHẤT
// Bài toán: Dự đoán giá nhà dựa trên diện tích
// =====================================================
//
// Đây là ví dụ đơn giản nhất của Neural Network:
// - 1 input (diện tích)
// - 1 output (giá nhà)
// - Không có hidden layer (chỉ là linear regression)
//
// Cấu trúc: y = w * x + b
// Trong đó:
//   - x là input (diện tích m²)
//   - w là weight (trọng số - mỗi m² tăng thêm, giá tăng bao nhiêu?)
//   - b là bias (giá cơ bản không phụ thuộc diện tích)
//   - y là output (giá nhà dự đoán, triệu đồng)
//
// Mục tiêu: Tìm w và b sao cho y ≈ giá thực tế
// =====================================================

fn main() {
    // =========================================================
    // BƯỚC 1: CHUẨN BỊ DỮ LIỆU HUẤN LUYỆN
    // =========================================================
    // Dữ liệu về các căn nhà đã bán:
    // - Diện tích (m²): x (input/feature)
    // - Giá bán (triệu đồng): y (output/label/ground truth)
    
    // Mảng chứa diện tích (input)
    let dien_tich: Vec<f64> = vec![50.0, 80.0, 100.0, 120.0, 150.0, 200.0, 250.0, 300.0];
    
    // Mảng chứa giá nhà tương ứng (output thực tế)
    // Quy luật ẩn: giá ≈ 3 * diện_tích (3 triệu/m²)
    let gia_that: Vec<f64> = vec![150.0, 240.0, 300.0, 360.0, 450.0, 600.0, 750.0, 900.0];
    
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║              DỮ LIỆU HUẤN LUYỆN - GIÁ NHÀ                    ║");
    println!("╠══════════════════════════════════════════════════════════════╣");
    println!("║  STT  │  Diện tích (m²)  │  Giá thực tế (triệu)            ║");
    println!("╠═══════╪══════════════════╪═════════════════════════════════╣");
    
    for i in 0..dien_tich.len() {
        println!("║   {}   │      {:>5}       │        {:>6}                    ║",
                 i + 1,
                 dien_tich[i] as i32,
                 gia_that[i] as i32);
    }
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // BƯỚC 2: KHỞI TẠO WEIGHTS VÀ BIAS
    // =========================================================
    // Neural Network cần "đoán" các tham số w và b.
    // Ban đầu, ta không biết giá trị đúng, nên khởi tạo tùy ý.
    // Thường khởi tạo gần 0 hoặc random nhỏ.
    
    // Weight (trọng số) - ban đầu đặt = 0
    // Ý nghĩa: Mỗi m² tăng thêm → giá tăng w triệu
    let w: f64 = 0.0;
    
    // Bias (độ lệch) - ban đầu đặt = 0
    // Ý nghĩa: Giá cơ bản của nhà (không phụ thuộc diện tích)
    let b: f64 = 0.0;
    
    println!("\\n╔══════════════════════════════════════════════════════════════╗");
    println!("║              TRẠNG THÁI BAN ĐẦU CỦA MODEL                     ║");
    println!("╠══════════════════════════════════════════════════════════════╣");
    println!("║  Công thức: y = w * x + b                                      ║");
    println!("║  w (weight) = {:.1}                                             ║", w);
    println!("║  b (bias)   = {:.1}                                             ║", b);
    println!("║                                                                ║");
    println!("║  Vấn đề: Model dự đoán TẤT CẢ nhà có giá = 0                  ║");
    println!("║  vì w=0, b=0 → y = 0*x + 0 = 0                                ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // BƯỚC 3: DỰ ĐOÁN VÀ TÍNH SAI SỐ
    // =========================================================
    println!("\\n╔══════════════════════════════════════════════════════════════╗");
    println!("║              DỰ ĐOÁN BAN ĐẦU (TẤT CẢ SAI!)                    ║");
    println!("╠══════════════════════════════════════════════════════════════╣");
    println!("║  Diện tích │ Giá thực │ Dự đoán  │ Sai số  │ Sai số²         ║");
    println!("╠════════════╪══════════╪══════════╪═════════╪═════════════════╣");
    
    let mut tong_sai_so_binh_phuong = 0.0;
    
    for i in 0..dien_tich.len() {
        // FORWARD PASS (Lan truyền xuôi):
        // Tính giá dự đoán = w * diện_tích + b
        let gia_du_doan = w * dien_tich[i] + b;
        
        // Tính sai số (error) = giá_thực - giá_dự_đoán
        let sai_so = gia_that[i] - gia_du_doan;
        
        // Bình phương sai số (squared error)
        // Tại sao bình phương?
        // 1. Loại bỏ dấu âm (sai cao hay thấp đều xấu)
        // 2. Phạt nặng sai số lớn: 20² = 400 > 10² = 100
        let sai_so_bp = sai_so * sai_so;
        tong_sai_so_binh_phuong += sai_so_bp;
        
        println!("║  {:>5} m²  │ {:>6}   │ {:>6}   │ {:>6}  │ {:>10}       ║",
                 dien_tich[i] as i32,
                 gia_that[i] as i32,
                 gia_du_doan as i32,
                 sai_so as i32,
                 sai_so_bp as i64);
    }
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // BƯỚC 4: TÍNH LOSS (HÀM MẤT MÁT)
    // =========================================================
    // Loss = MSE (Mean Squared Error) = Trung bình sai số bình phương
    // MSE = (1/n) * Σ(y_thực - y_dự_đoán)²
    
    let n = dien_tich.len() as f64;
    let mse = tong_sai_so_binh_phuong / n;
    
    // RMSE (Root MSE) = căn bậc hai MSE → cùng đơn vị với output
    let rmse = mse.sqrt();
    
    println!("\\n╔══════════════════════════════════════════════════════════════╗");
    println!("║              TỔNG KẾT SAI SỐ (LOSS)                            ║");
    println!("╠══════════════════════════════════════════════════════════════╣");
    println!("║  Công thức MSE = (1/n) × Σ(y_thực - y_dự_đoán)²               ║");
    println!("║                                                                ║");
    println!("║  Tổng sai số bình phương = {:>12}                          ║", tong_sai_so_binh_phuong as i64);
    println!("║  Số mẫu (n) = {}                                                ║", n as i32);
    println!("║  MSE = {:>12}                                              ║", mse as i64);
    println!("║  RMSE = {:.1} (sai trung bình {:.0} triệu)                   ║", rmse, rmse);
    println!("║                                                                ║");
    println!("║  Mục tiêu: Giảm MSE → 0 (hoặc càng nhỏ càng tốt)             ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // BƯỚC 5: THỬ VỚI WEIGHT TỐT HƠN
    // =========================================================
    println!("\\n=== THỬ ĐẶT w=3.0, b=0.0 (đoán mỗi m² giá 3 triệu) ===");
    
    let w_tot = 3.0;
    let b_tot = 0.0;
    let mut mse_tot = 0.0;
    
    for i in 0..dien_tich.len() {
        let du_doan = w_tot * dien_tich[i] + b_tot;
        let err = gia_that[i] - du_doan;
        mse_tot += err * err;
        println!("  Nhà {}m² → Dự đoán: {} triệu, Thực tế: {} triệu, Sai: {}",
                 dien_tich[i] as i32, du_doan as i32, gia_that[i] as i32, err as i32);
    }
    mse_tot /= n;
    
    println!("\\n  MSE khi w=3, b=0: {}", mse_tot);
    println!("  MSE giảm từ {} → {} (tuyệt vời!)", mse as i64, mse_tot as i64);
    println!("\\n=== KẾT LUẬN ===");
    println!("  Model ban đầu (w=0, b=0): DỞ TỆ, MSE khổng lồ");
    println!("  Model thử (w=3, b=0): CHÍNH XÁC HOÀN HẢO, MSE = 0");
    println!("\\n  Vấn đề: Làm sao TỰ ĐỘNG tìm w=3 mà không đoán bừa?");
    println!("  Đáp án: GRADIENT DESCENT → sẽ học ở bài sau!");
}`
  },
  // ==========================================================
  // LESSON 2: PERCEPTRON - GIẢI PHẪU TOÀN DIỆN
  // ==========================================================
  {
    id: 'ch21_01_02',
    title: '2. Perceptron - Đơn vị cơ bản nhất của Neural Network',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">psychology</span> 2. Perceptron - Đơn vị cơ bản nhất của Neural Network</h2>

  <!-- ========================================= -->
  <!-- 2.1. PERCEPTRON LÀ GÌ                     -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">help</span> 2.1. Perceptron là gì?</h3>
  
  <div class="definition-block">
    <span class="definition-term">Định nghĩa</span>
    <p><strong>Perceptron</strong> là đơn vị tính toán cơ bản nhất của Neural Network, được phát minh bởi Frank Rosenblatt năm 1958 tại Cornell Aeronautical Laboratory. Nó là mô hình toán học mô phỏng hoạt động của một neuron sinh học đơn lẻ.</p>
    <p>Perceptron nhận nhiều inputs, nhân mỗi input với weight tương ứng, cộng tất cả lại cùng bias, qua activation function, và cho ra 1 output duy nhất.</p>
  </div>

  <p><strong>Tại sao Perceptron quan trọng?</strong></p>
  <ul>
    <li>Nó là "viên gạch" đầu tiên cấu thành Neural Network</li>
    <li>Mọi Neural Network phức tạp nhất (GPT-4, Gemini) đều được xây từ hàng tỷ "Perceptron" xếp chồng</li>
    <li>Hiểu Perceptron = hiểu nền tảng của toàn bộ Deep Learning</li>
  </ul>

  <!-- ========================================= -->
  <!-- 2.2. CẤU TRÚC TOÁN HỌC                    -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">architecture</span> 2.2. Cấu trúc toán học của Perceptron</h3>
  
  <div class="image-showcase">
    <img src="/images/ch21/perceptron_model_1773152558045.png" alt="Sơ đồ mô hình Perceptron" />
    <div class="image-caption">Mô hình Perceptron với Inputs, Weights, Bias và Activation Function</div>
  </div>

  <div class="formula-block my-4 p-4 bg-indigo-50 border-indigo-300">
    <h4>Công thức toán học chi tiết:</h4>
    <p><strong>Bước 1 - Weighted Sum (Tổng có trọng số):</strong></p>
    <p class="font-mono text-lg">$z = w_1 x_1 + w_2 x_2 + ... + w_n x_n + b$</p>
    <p class="font-mono text-lg">$z = \\sum_{i=1}^{n} w_i x_i + b$</p>
    <p class="font-mono text-lg">$z = W^T \\cdot X + b$ (Dạng ma trận)</p>
    <p class="mt-3"><strong>Bước 2 - Activation Function:</strong></p>
    <p class="font-mono text-lg">$y = f(z)$</p>
    <p class="mt-3"><strong>Kết hợp:</strong></p>
    <p class="font-mono text-lg">$y = f(W^T \\cdot X + b)$</p>
  </div>

  <p><strong>Trong đó:</strong></p>
  <ul>
    <li>$X = [x_1, x_2, ..., x_n]^T$ là vector input (cột)</li>
    <li>$W = [w_1, w_2, ..., w_n]^T$ là vector weights (cột)</li>
    <li>$b$ là bias (scalar)</li>
    <li>$z$ là weighted sum (scalar)</li>
    <li>$f$ là activation function</li>
    <li>$y$ là output (scalar)</li>
  </ul>

  <!-- ========================================= -->
  <!-- 2.3. GIẢI THÍCH TỪNG THÀNH PHẦN           -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">info</span> 2.3. Giải thích chi tiết từng thành phần</h3>

  <h4>a) Inputs (Đầu vào) - $X$</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Là gì:</strong> Dữ liệu đưa vào Perceptron. <strong>PHẢI là dạng số.</strong></p>
      <p><strong>Từ đâu ra:</strong> Từ dữ liệu thô (raw data) sau khi preprocessing (tiền xử lý).</p>
      <p><strong>Ví dụ cụ thể:</strong></p>
      <ul>
        <li>Nhận diện ảnh 28x28: 784 inputs (mỗi pixel = 1 input, giá trị 0~255)</li>
        <li>Dự đoán giá nhà: 5 inputs (diện tích, số phòng, vị trí, tuổi nhà, tầng)</li>
        <li>Phân loại email: 1000 inputs (tần số xuất hiện của 1000 từ phổ biến nhất)</li>
      </ul>
      <p><strong>Lưu ý:</strong> Dữ liệu phi số (text, ảnh, âm thanh) phải được chuyển thành số trước khi đưa vào.</p>
    </div>
  </div>

  <h4>b) Weights (Trọng số) - $W$</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Là gì:</strong> Hệ số nhân quyết định mức độ quan trọng của từng input.</p>
      <p><strong>Ý nghĩa:</strong></p>
      <ul>
        <li><strong>Weight dương lớn (+5.0):</strong> Input này RẤT quan trọng, tỷ lệ thuận với output</li>
        <li><strong>Weight dương nhỏ (+0.1):</strong> Input này ít quan trọng</li>
        <li><strong>Weight ≈ 0:</strong> Input này gần như không ảnh hưởng</li>
        <li><strong>Weight âm (-3.0):</strong> Input này tỷ lệ NGHỊCH với output</li>
      </ul>
      <p><strong>Ai quyết định giá trị weight?</strong> KHÔNG phải con người. Weights được máy tự điều chỉnh qua quá trình training (Gradient Descent + Backpropagation).</p>
      <p><strong>Khởi tạo:</strong> Ban đầu weights được set random nhỏ (vd: Gaussian với mean=0, std=0.01). Trong quá trình training, weights thay đổi dần để giảm loss.</p>
      <p><strong>Ví dụ dự đoán giá nhà:</strong></p>
      <ul>
        <li>w_diện_tích = +3.0 (diện tích tăng → giá tăng mạnh)</li>
        <li>w_số_phòng = +1.5 (nhiều phòng → giá cao hơn)</li>
        <li>w_tuổi_nhà = -0.5 (nhà cũ → giá giảm)</li>
        <li>w_tầng = +0.2 (tầng cao hơn → giá cao hơn nhẹ)</li>
      </ul>
    </div>
  </div>

  <h4>c) Bias (Độ lệch) - $b$</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Là gì:</strong> Một số được cộng thêm vào weighted sum, KHÔNG phụ thuộc vào input.</p>
      <p><strong>Tại sao cần bias?</strong></p>
      <p>Không có bias, đường phân chia (decision boundary) LUÔN đi qua gốc tọa độ (0,0). Bias cho phép dịch chuyển đường phân chia lên/xuống/trái/phải.</p>
      <p><em>Tương tự toán học:</em></p>
      <ul>
        <li>Không bias: $y = wx$ (đường thẳng đi qua gốc)</li>
        <li>Có bias: $y = wx + b$ (đường thẳng cắt trục y tại b)</li>
      </ul>
      <p><strong>Ví dụ:</strong> Dự đoán giá nhà. Ngay cả nhà 0m² (không tồn tại) cũng có giá cơ bản > 0 (giá đất). Bias đại diện cho giá cơ bản này.</p>
    </div>
  </div>

  <h4>d) Weighted Sum (Tổng có trọng số) - $z$</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Công thức:</strong> $z = \\sum_{i=1}^{n} w_i x_i + b$</p>
      <p><strong>Ví dụ số:</strong></p>
      <p>Dự đoán "Nên mua nhà không?" với 3 yếu tố:</p>
      <ul>
        <li>Giá rẻ ($x_1 = 0.8$, weight $w_1 = +2.0$) → đóng góp: $0.8 \\times 2.0 = 1.6$</li>
        <li>Vị trí tốt ($x_2 = 0.9$, weight $w_2 = +1.5$) → đóng góp: $0.9 \\times 1.5 = 1.35$</li>
        <li>Nhà cũ ($x_3 = 0.7$, weight $w_3 = -1.0$) → đóng góp: $0.7 \\times (-1.0) = -0.7$</li>
        <li>Bias $b = -1.0$</li>
      </ul>
      <p>$z = 1.6 + 1.35 + (-0.7) + (-1.0) = 1.25$</p>
      <p>$z > 0$ → Nên mua (nếu dùng Step activation)</p>
    </div>
  </div>

  <h4>e) Activation Function (Hàm kích hoạt) - $f()$</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Vai trò chính:</strong></p>
      <ol>
        <li><strong>Tạo phi tuyến tính:</strong> Không có activation, mạng nhiều lớp = mạng 1 lớp (tuyến tính sụp đổ).</li>
        <li><strong>Giới hạn output:</strong> Ngăn output bùng nổ ra vô cùng.</li>
        <li><strong>Mô phỏng "bắn" neuron:</strong> Quyết định neuron có activate hay không.</li>
      </ol>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 2.4. ACTIVATION FUNCTIONS PHỔ BIẾN         -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">trending_up</span> 2.4. Activation Functions phổ biến (tổng quan)</h3>

  <div class="activation-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
    <div class="image-showcase" style="margin: 0;">
      <img src="/images/ch21/act_step.png" alt="Step Function" style="width: 100%; border-radius: 8px;" />
    </div>
    <div class="image-showcase" style="margin: 0;">
      <img src="/images/ch21/act_linear.png" alt="Linear Function" style="width: 100%; border-radius: 8px;" />
    </div>
    <div class="image-showcase" style="margin: 0;">
      <img src="/images/ch21/act_sigmoid.png" alt="Sigmoid Function" style="width: 100%; border-radius: 8px;" />
    </div>
    <div class="image-showcase" style="margin: 0;">
      <img src="/images/ch21/act_tanh.png" alt="Tanh Function" style="width: 100%; border-radius: 8px;" />
    </div>
    <div class="image-showcase" style="margin: 0;">
      <img src="/images/ch21/act_relu.png" alt="ReLU Function" style="width: 100%; border-radius: 8px;" />
    </div>
    <div class="image-showcase" style="margin: 0;">
      <img src="/images/ch21/act_leaky_relu.png" alt="Leaky ReLU Function" style="width: 100%; border-radius: 8px;" />
    </div>
    <div class="image-showcase" style="margin: 0;">
      <img src="/images/ch21/act_gelu.png" alt="GELU Function" style="width: 100%; border-radius: 8px;" />
    </div>
  </div>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Hàm</th>
        <th>Công thức</th>
        <th>Range</th>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
        <th>Dùng khi</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Step</strong></td>
        <td>$f(z) = \\begin{cases} 1 & z \\geq 0 \\\\ 0 & z < 0 \\end{cases}$</td>
        <td>{0, 1}</td>
        <td>Đơn giản nhất</td>
        <td>Đạo hàm = 0 → không thể dùng Gradient Descent</td>
        <td>Perceptron gốc (lịch sử)</td>
      </tr>
      <tr>
        <td><strong>Sigmoid</strong></td>
        <td>$f(z) = \\frac{1}{1+e^{-z}}$</td>
        <td>(0, 1)</td>
        <td>Output là xác suất, smooth, differentiable</td>
        <td>Vanishing Gradient ở 2 đầu, output không center tại 0</td>
        <td>Output layer cho Binary Classification</td>
      </tr>
      <tr>
        <td><strong>Tanh</strong></td>
        <td>$f(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$</td>
        <td>(-1, 1)</td>
        <td>Center tại 0, stronger gradients</td>
        <td>Vẫn bị Vanishing Gradient</td>
        <td>Hidden layers (trước ReLU ra đời)</td>
      </tr>
      <tr>
        <td><strong>ReLU</strong></td>
        <td>$f(z) = max(0, z)$</td>
        <td>[0, ∞)</td>
        <td>Tính nhanh, không vanishing gradient cho z>0</td>
        <td>Dead ReLU (neuron chết khi z<0)</td>
        <td>Hidden layers (phổ biến nhất hiện nay)</td>
      </tr>
      <tr>
        <td><strong>Leaky ReLU</strong></td>
        <td>$f(z) = max(0.01z, z)$</td>
        <td>(-∞, ∞)</td>
        <td>Khắc phục Dead ReLU</td>
        <td>Kém hơn GELU/SiLU trong thực tế</td>
        <td>Hidden layers (thay thế ReLU)</td>
      </tr>
      <tr>
        <td><strong>Softmax</strong></td>
        <td>$f(z_i) = \\frac{e^{z_i}}{\\sum e^{z_j}}$</td>
        <td>(0, 1), tổng = 1</td>
        <td>Chuẩn hóa thành phân phối xác suất</td>
        <td>Chỉ dùng ở output layer</td>
        <td>Output layer cho Multi-class Classification</td>
      </tr>
      <tr>
        <td><strong>GELU</strong></td>
        <td>$f(z) = z \\cdot \\Phi(z)$</td>
        <td>(-0.17, ∞)</td>
        <td>Smooth, kết hợp kết quả tuyến tính và xác suất, siêu vượt trội ở NLP</td>
        <td>Tính toán hơi phức tạp hơn ReLU</td>
        <td>Modern Transformers (BERT, GPT), ViT, State-of-the-Art models</td>
      </tr>
      <tr>
        <td><strong>GELU</strong></td>
        <td>$f(z) = z \\cdot \\Phi(z)$</td>
        <td>(-0.17, ∞)</td>
        <td>Smooth, kết hợp kết quả tuyến tính và xác suất, siêu vượt trội ở NLP</td>
        <td>Tính toán hơi phức tạp hơn ReLU</td>
        <td>Modern Transformers (BERT, GPT), ViT, State-of-the-Art models</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 2.5. PERCEPTRON CÓ THỂ LÀM GÌ?            -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">calculate</span> 2.5. Perceptron đơn lớp có thể làm gì?</h3>

  <p>Perceptron đơn lớp thực chất đang vẽ <strong>một đường thẳng</strong> (2D) hoặc <strong>một mặt phẳng</strong> (3D) hoặc <strong>một hyperplane</strong> (nD) để phân chia dữ liệu thành 2 nhóm.</p>

  <div class="features-grid">
    <div class="feature-card">
      <h4>Làm được: AND Gate</h4>
      <p>AND: Output = 1 chỉ khi TẤT CẢ inputs = 1</p>
      <table class="comparison-table">
        <thead><tr><th>$x_1$</th><th>$x_2$</th><th>AND</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td>0</td></tr>
          <tr><td>1</td><td>0</td><td>0</td></tr>
          <tr><td>1</td><td>1</td><td><strong>1</strong></td></tr>
        </tbody>
      </table>
      <p>Weights: $w_1=1, w_2=1, b=-1.5$</p>
      <p>Đường phân chia: $x_1 + x_2 = 1.5$ → chỉ (1,1) vượt ngưỡng.</p>
    </div>
    <div class="feature-card">
      <h4>Làm được: OR Gate</h4>
      <p>OR: Output = 1 khi ÍT NHẤT 1 input = 1</p>
      <table class="comparison-table">
        <thead><tr><th>$x_1$</th><th>$x_2$</th><th>OR</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>0</td><td>0</td></tr>
          <tr><td>0</td><td>1</td><td><strong>1</strong></td></tr>
          <tr><td>1</td><td>0</td><td><strong>1</strong></td></tr>
          <tr><td>1</td><td>1</td><td><strong>1</strong></td></tr>
        </tbody>
      </table>
      <p>Weights: $w_1=1, w_2=1, b=-0.5$</p>
      <p>Đường phân chia: $x_1 + x_2 = 0.5$ → trừ (0,0) đều vượt ngưỡng.</p>
    </div>
    <div class="feature-card">
      <h4>Làm được: NOT Gate</h4>
      <p>NOT: Đảo ngược input</p>
      <table class="comparison-table">
        <thead><tr><th>$x$</th><th>NOT</th></tr></thead>
        <tbody>
          <tr><td>0</td><td><strong>1</strong></td></tr>
          <tr><td>1</td><td>0</td></tr>
        </tbody>
      </table>
      <p>Weights: $w=-1, b=0.5$</p>
      <p>$z = -x + 0.5$. Khi $x=0$: $z=0.5>0$ → output 1. Khi $x=1$: $z=-0.5<0$ → output 0.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 2.6. XOR PROBLEM - GIỚI HẠN SÂU CỦA PERCEPTRON -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">shape_line</span> 2.6. Bài toán XOR - Giới hạn của Perceptron đơn lớp</h3>

  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">Linear Separability (Khả năng phân tách tuyến tính)</span>
      <p>Perceptron đơn lớp CHỈ có thể phân loại dữ liệu <strong>linearly separable</strong> - tức là có thể vẽ MỘT đường thẳng (hoặc mặt phẳng trong không gian nhiều chiều) để tách 2 nhóm dữ liệu.</p>
      <p>AND và OR: dữ liệu nằm gọn 2 bên đường thẳng → OK.</p>
      <p>XOR: dữ liệu nằm chéo nhau → KHÔNG thể tách bằng 1 đường thẳng.</p>
    </div>
  </div>

  <div class="features-grid my-4">
    <div class="feature-card">
      <h4>XOR Gate - Bất khả thi với Perceptron đơn lớp</h4>
      <table class="comparison-table">
        <thead><tr><th>$x_1$</th><th>$x_2$</th><th>XOR</th><th>Giải thích</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>0</td><td>0</td><td>Cùng là 0 → giống nhau → output 0</td></tr>
          <tr><td>0</td><td>1</td><td><strong>1</strong></td><td>Khác nhau → output 1</td></tr>
          <tr><td>1</td><td>0</td><td><strong>1</strong></td><td>Khác nhau → output 1</td></tr>
          <tr><td>1</td><td>1</td><td>0</td><td>Cùng là 1 → giống nhau → output 0</td></tr>
        </tbody>
      </table>
      <p class="mt-3"><strong>Tại sao không tách được?</strong></p>
      <p>Vẽ 4 điểm lên mặt phẳng 2D:</p>
      <pre>
    x₂
    │
 1  │   ●(0,1)=1       ○(1,1)=0
    │
 0  │   ○(0,0)=0       ●(1,0)=1
    └──────────────── x₁
        0              1
      </pre>
      <p>Nhóm output=1: (0,1) và (1,0) → nằm CHÉO nhau</p>
      <p>Nhóm output=0: (0,0) và (1,1) → nằm CHÉO nhau</p>
      <p>Không có đường thẳng nào cắt qua mà tách được 2 nhóm. Đây là <strong>chứng minh toán học</strong> rằng Perceptron đơn lớp thất bại.</p>
    </div>
  </div>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">crisis_alert</span>
    <div class="callout-content">
      <span class="callout-title">AI Winter (1969-1986)</span>
      <p>Năm 1969, Marvin Minsky và Seymour Papert công bố cuốn sách "Perceptrons" chứng minh giới hạn XOR. Hậu quả: Nguồn tài trợ nghiên cứu AI bị cắt đứt gần như hoàn toàn. Hàng loạt nhà nghiên cứu bỏ lĩnh vực. AI rơi vào "mùa đông" kéo dài gần 20 năm.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 2.7. PERCEPTRON LEARNING RULE               -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">school</span> 2.7. Perceptron Learning Rule (Quy tắc học của Perceptron)</h3>

  <p>Mặc dù Perceptron có giới hạn, thuật toán học của nó là nền tảng cho tất cả thuật toán học hiện đại.</p>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Khởi tạo</h4>
        <p>Set weights random nhỏ, bias = 0. Chọn learning rate $\\eta$ (thường 0.01 ~ 0.1).</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Forward Pass</h4>
        <p>Tính output: $\\hat{y} = f(W^T \\cdot X + b)$</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Tính Error</h4>
        <p>$error = y_{true} - \\hat{y}$</p>
        <p>Nếu error = 0 → dự đoán đúng, không cần update.</p>
        <p>Nếu error ≠ 0 → dự đoán sai, cần sửa weights.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Update Weights</h4>
        <p>$w_i \\leftarrow w_i + \\eta \\cdot error \\cdot x_i$</p>
        <p>$b \\leftarrow b + \\eta \\cdot error$</p>
        <p><strong>Giải thích:</strong></p>
        <ul>
          <li>$\\eta$ (eta) = learning rate: tốc độ học. Lớn → học nhanh nhưng dao động. Nhỏ → học chậm nhưng ổn định.</li>
          <li>$error \\cdot x_i$: Nếu input $x_i$ lớn VÀ error lớn → cần sửa weight $w_i$ nhiều hơn.</li>
          <li>Dấu của error quyết định tăng/giảm weight.</li>
        </ul>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>Lặp lại</h4>
        <p>Lặp bước 2-4 cho tất cả samples trong dataset. Một lượt qua toàn bộ dataset = 1 <strong>epoch</strong>. Lặp nhiều epochs cho đến khi hội tụ (error ≈ 0).</p>
      </div>
    </div>
  </div>

  <div class="definition-block mt-4">
    <span class="definition-term">Perceptron Convergence Theorem (Rosenblatt, 1962)</span>
    <p>Nếu dữ liệu <strong>linearly separable</strong>, thuật toán Perceptron Learning Rule <strong>đảm bảo hội tụ</strong> trong số bước hữu hạn. Nghĩa là: nếu tồn tại bộ weights chia đúng 100% dữ liệu, Perceptron SẼ tìm ra bộ weights đó.</p>
    <p><strong>Nhấn mạnh quan trọng:</strong> Chỉ hội tụ khi dữ liệu linearly separable. Với XOR (not linearly separable), thuật toán sẽ chạy mãi mãi không bao giờ hội tụ.</p>
  </div>

  <!-- ========================================= -->
  <!-- 2.8. MULTI-LAYER PERCEPTRON                 -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">layers</span> 2.8. Từ Perceptron đến Multi-Layer Perceptron (MLP)</h3>

  <p>Giải pháp cho XOR: Xếp chồng nhiều lớp Perceptron.</p>

  <div class="image-showcase">
    <img src="/images/ch21/mlp_xor_correct.png" alt="Multi-Layer Perceptron XOR" />
    <div class="image-caption">Từ Perceptron đơn lẻ → MLP nhiều tầng: Giải bài toán XOR bằng 1 lớp ẩn</div>
  </div>

  <div class="callout callout-info">
    <span class="material-symbols-outlined">lightbulb</span>
    <div class="callout-content">
      <span class="callout-title">Giải XOR bằng MLP</span>
      <p>XOR = (x₁ OR x₂) AND NOT(x₁ AND x₂)</p>
      <p>Phân tách: Dùng 2 Perceptron ở hidden layer:</p>
      <ul>
        <li>Neuron H1: tính OR (x₁, x₂)</li>
        <li>Neuron H2: tính NAND (NOT AND) (x₁, x₂)</li>
      </ul>
      <p>Rồi 1 Perceptron output: tính AND (H1, H2)</p>
      <p>Kết quả: 2 đường thẳng cắt chéo nhau tạo vùng phân chia phức tạp → giải được XOR!</p>
    </div>
  </div>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">psychology</span></div>
    <h3>Từ khoá: DEPTH (Chiều sâu)</h3>
    <p>"<strong>Deep</strong>" trong Deep Learning ám chỉ số lượng <strong>Hidden Layers</strong>. Mỗi layer thêm vào cho phép mạng học patterns phức tạp hơn, trừu tượng hơn. Ví dụ nhận diện ảnh: Layer 1 → cạnh/góc, Layer 2 → hình dạng, Layer 3 → bộ phận, Layer 4 → đối tượng hoàn chỉnh.</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// PERCEPTRON - CÀI ĐẶT CHI TIẾT TỪNG DÒNG
// =====================================================
//
// File này implement Perceptron từ zero trong Rust:
// 1. Định nghĩa struct Perceptron
// 2. Implement constructor, activation, predict
// 3. Implement learning rule (tự học!)
// 4. Test với AND, OR, NOT gates
// 5. Chứng minh XOR thất bại
//
// =====================================================

// =====================================================
// PHẦN 1: ĐỊNH NGHĨA CẤU TRÚC PERCEPTRON
// =====================================================

struct Perceptron {
    // weights: vector chứa trọng số cho từng input
    // Ví dụ: 2 inputs → weights có 2 phần tử
    // weights[0] tương ứng input thứ 1
    // weights[1] tương ứng input thứ 2
    weights: Vec<f64>,
    
    // bias: hệ số điều chỉnh (1 số duy nhất)
    // Cộng vào weighted sum trước khi qua activation
    bias: f64,
    
    // learning_rate: tốc độ học (eta)
    // Lớn → học nhanh nhưng dao động
    // Nhỏ → học chậm nhưng ổn định
    learning_rate: f64,
}

// =====================================================
// PHẦN 2: IMPLEMENT CÁC PHƯƠNG THỨC
// =====================================================

impl Perceptron {
    // ===== HÀM TẠO (CONSTRUCTOR) =====
    // Tạo Perceptron mới với số input cho trước
    fn new(num_inputs: usize, learning_rate: f64) -> Self {
        // Khởi tạo weights = 0 (cho đơn giản)
        // Trong thực tế nên random nhỏ
        let weights = vec![0.0; num_inputs];
        let bias = 0.0;
        
        Perceptron { weights, bias, learning_rate }
    }
    
    // ===== HÀM KÍCH HOẠT (STEP FUNCTION) =====
    // Perceptron gốc dùng Step Function:
    // - z >= 0 → output 1 (neuron bắn)
    // - z < 0  → output 0 (neuron im)
    fn activation(&self, z: f64) -> i32 {
        if z >= 0.0 { 1 } else { 0 }
    }
    
    // ===== FORWARD PASS - DỰ ĐOÁN =====
    // Tính output từ input:
    // 1. Weighted sum: z = w₁x₁ + w₂x₂ + ... + b
    // 2. Activation: y = step(z)
    fn predict(&self, inputs: &[f64]) -> i32 {
        // Kiểm tra: số inputs phải = số weights
        assert_eq!(inputs.len(), self.weights.len(),
            "Số inputs ({}) phải = số weights ({})",
            inputs.len(), self.weights.len());
        
        // Tính weighted sum
        let mut z = self.bias;
        for i in 0..inputs.len() {
            z += self.weights[i] * inputs[i];
        }
        
        // Qua activation function
        self.activation(z)
    }
    
    // ===== TRAINING - TỰ HỌC! =====
    // Perceptron Learning Rule:
    //   error = y_true - y_predicted
    //   w_i = w_i + learning_rate * error * x_i
    //   b = b + learning_rate * error
    fn train(&mut self, inputs: &[f64], target: i32) {
        // Bước 1: Dự đoán 
        let prediction = self.predict(inputs);
        
        // Bước 2: Tính error
        let error = target - prediction;
        
        // Bước 3: Update weights (chỉ khi sai)
        if error != 0 {
            for i in 0..self.weights.len() {
                // w_i += eta * error * x_i
                self.weights[i] += self.learning_rate * error as f64 * inputs[i];
            }
            // b += eta * error
            self.bias += self.learning_rate * error as f64;
        }
    }
    
    // ===== IN THÔNG TIN =====
    fn print_info(&self) {
        print!("  Weights: [");
        for (i, w) in self.weights.iter().enumerate() {
            if i > 0 { print!(", "); }
            print!("{:.2}", w);
        }
        println!("]  Bias: {:.2}", self.bias);
    }
}

// =====================================================
// PHẦN 3: HÀM MAIN - DEMO ĐẦY ĐỦ
// =====================================================

fn main() {
    println!("╔════════════════════════════════════════════════════════════════╗");
    println!("║      PERCEPTRON - ĐƠN VỊ CƠ BẢN CỦA NEURAL NETWORK           ║");
    println!("╚════════════════════════════════════════════════════════════════╝");

    // Training data cho các logic gates
    let inputs = vec![
        vec![0.0, 0.0],
        vec![0.0, 1.0],
        vec![1.0, 0.0],
        vec![1.0, 1.0],
    ];

    // ===== VÍ DỤ 1: HỌC AND GATE =====
    println!("\\n┌────────────────────────────────────────────┐");
    println!("│  VÍ DỤ 1: PERCEPTRON TỰ HỌC AND GATE        │");
    println!("└────────────────────────────────────────────┘");
    
    let and_targets = vec![0, 0, 0, 1]; // AND truth table
    let mut and_p = Perceptron::new(2, 0.1);
    
    println!("  Trước training:");
    and_p.print_info();
    
    // Training 20 epochs
    for epoch in 0..20 {
        let mut errors = 0;
        for i in 0..inputs.len() {
            let pred = and_p.predict(&inputs[i]);
            if pred != and_targets[i] { errors += 1; }
            and_p.train(&inputs[i], and_targets[i]);
        }
        if errors == 0 {
            println!("  Hội tụ tại epoch {}!", epoch + 1);
            break;
        }
    }
    
    println!("  Sau training:");
    and_p.print_info();
    println!("  Test AND Gate:");
    for i in 0..inputs.len() {
        let result = and_p.predict(&inputs[i]);
        println!("    [{}, {}] → {} (expected: {})", 
            inputs[i][0] as i32, inputs[i][1] as i32, result, and_targets[i]);
    }

    // ===== VÍ DỤ 2: HỌC OR GATE =====
    println!("\\n┌────────────────────────────────────────────┐");
    println!("│  VÍ DỤ 2: PERCEPTRON TỰ HỌC OR GATE          │");
    println!("└────────────────────────────────────────────┘");
    
    let or_targets = vec![0, 1, 1, 1]; // OR truth table
    let mut or_p = Perceptron::new(2, 0.1);
    
    for epoch in 0..20 {
        let mut errors = 0;
        for i in 0..inputs.len() {
            let pred = or_p.predict(&inputs[i]);
            if pred != or_targets[i] { errors += 1; }
            or_p.train(&inputs[i], or_targets[i]);
        }
        if errors == 0 {
            println!("  Hội tụ tại epoch {}!", epoch + 1);
            break;
        }
    }
    
    println!("  Weights sau training:");
    or_p.print_info();
    println!("  Test OR Gate:");
    for i in 0..inputs.len() {
        let result = or_p.predict(&inputs[i]);
        println!("    [{}, {}] → {} (expected: {})", 
            inputs[i][0] as i32, inputs[i][1] as i32, result, or_targets[i]);
    }

    // ===== VÍ DỤ 3: XOR - THẤT BẠI =====
    println!("\\n┌────────────────────────────────────────────┐");
    println!("│  VÍ DỤ 3: XOR GATE - PERCEPTRON THẤT BẠI!     │");
    println!("└────────────────────────────────────────────┘");
    
    let xor_targets = vec![0, 1, 1, 0]; // XOR truth table
    let mut xor_p = Perceptron::new(2, 0.1);
    
    let mut converged = false;
    for epoch in 0..100 { // Thử 100 epochs!
        let mut errors = 0;
        for i in 0..inputs.len() {
            let pred = xor_p.predict(&inputs[i]);
            if pred != xor_targets[i] { errors += 1; }
            xor_p.train(&inputs[i], xor_targets[i]);
        }
        if errors == 0 {
            println!("  Hội tụ tại epoch {}!", epoch + 1);
            converged = true;
            break;
        }
    }
    
    if !converged {
        println!("  KHÔNG HỘI TỤ sau 100 epochs!");
        println!("  → XOR không linearly separable");
        println!("  → Perceptron đơn lớp KHÔNG THỂ giải XOR");
        println!("  → CẦN Multi-Layer Perceptron (MLP)!");
    }
    
    println!("  Test XOR Gate (kết quả sai):");
    for i in 0..inputs.len() {
        let result = xor_p.predict(&inputs[i]);
        let status = if result == xor_targets[i] { "OK" } else { "SAI!" };
        println!("    [{}, {}] → {} (expected: {}) [{}]", 
            inputs[i][0] as i32, inputs[i][1] as i32, result, xor_targets[i], status);
    }
    
    println!("\\n=== TỔNG KẾT ===");
    println!("  ✓ Perceptron TỰ HỌC THÀNH CÔNG: AND, OR");
    println!("  ✗ Perceptron THẤT BẠI VỚI: XOR");
    println!("  → Giải pháp: Multi-Layer Perceptron (nhiều lớp)");
    println!("  → Thuật toán training: Backpropagation (bài tiếp theo)");
}`
  },
  // ==========================================================
  // LESSON 3: TENSOR - CẤU TRÚC DỮ LIỆU CỦA DEEP LEARNING
  // ==========================================================
  {
    id: 'ch21_01_03',
    title: '3. Tensor - Cấu trúc dữ liệu nền tảng của Deep Learning',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">grid_on</span> 3. Tensor - Cấu trúc dữ liệu nền tảng của Deep Learning</h2>

  <p>Mọi dữ liệu trong Deep Learning đều được biểu diễn dưới dạng <strong>Tensor</strong>. Hiểu Tensor là chìa khóa để hiểu cách Neural Network xử lý thông tin.</p>

  <!-- ========================================= -->
  <!-- 3.1. SCALAR, VECTOR, MATRIX               -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">data_array</span> 3.1. Từ Scalar đến Tensor - Hệ thống phân cấp</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tên gọi</th>
        <th>Rank (Số chiều)</th>
        <th>Shape</th>
        <th>Ví dụ Toán</th>
        <th>Ví dụ trong ML</th>
        <th>Code Rust</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Scalar</strong></td>
        <td>0</td>
        <td>()</td>
        <td>$x = 5.0$</td>
        <td>Loss value, learning rate, accuracy</td>
        <td><code>let x: f64 = 5.0;</code></td>
      </tr>
      <tr>
        <td><strong>Vector</strong></td>
        <td>1</td>
        <td>(n,)</td>
        <td>$\\vec{v} = [1, 2, 3]$</td>
        <td>1 sample data, weights của 1 neuron, bias vector</td>
        <td><code>let v = vec![1.0, 2.0, 3.0];</code></td>
      </tr>
      <tr>
        <td><strong>Matrix</strong></td>
        <td>2</td>
        <td>(m, n)</td>
        <td>$M = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$</td>
        <td>Batch of samples, weight matrix giữa 2 layers</td>
        <td><code>let m = vec![vec![1.0, 2.0], vec![3.0, 4.0]];</code></td>
      </tr>
      <tr>
        <td><strong>3D Tensor</strong></td>
        <td>3</td>
        <td>(d, m, n)</td>
        <td>Khối 3 chiều</td>
        <td>Ảnh RGB (3, H, W), batch of sequences</td>
        <td>Vec&lt;Vec&lt;Vec&lt;f64&gt;&gt;&gt;</td>
      </tr>
      <tr>
        <td><strong>4D Tensor</strong></td>
        <td>4</td>
        <td>(b, c, h, w)</td>
        <td>-</td>
        <td>Batch ảnh: (batch_size, channels, height, width). VD: [32, 3, 224, 224] = 32 ảnh RGB 224x224</td>
        <td>-</td>
      </tr>
      <tr>
        <td><strong>5D Tensor</strong></td>
        <td>5</td>
        <td>(b, t, c, h, w)</td>
        <td>-</td>
        <td>Batch video: (batch, time, channels, height, width)</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 3.2. RANK VÀ SHAPE                         -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">straighten</span> 3.2. Rank và Shape - Hai thuộc tính cốt lõi</h3>

  <div class="features-grid">
    <div class="feature-card">
      <h4>Rank (Hạng / Số chiều)</h4>
      <p><strong>Định nghĩa:</strong> Số lượng trục (axes) của tensor. Bao nhiêu lần bạn cần indexing để đến 1 phần tử.</p>
      <ul>
        <li>Scalar: rank 0 → không cần index (<code>x</code>)</li>
        <li>Vector: rank 1 → cần 1 index (<code>v[i]</code>)</li>
        <li>Matrix: rank 2 → cần 2 index (<code>M[i][j]</code>)</li>
        <li>3D Tensor: rank 3 → cần 3 index (<code>T[i][j][k]</code>)</li>
      </ul>
      <p><strong>Trong PyTorch:</strong> <code>tensor.dim()</code> hoặc <code>tensor.ndim</code></p>
    </div>
    <div class="feature-card">
      <h4>Shape (Hình dạng / Kích thước)</h4>
      <p><strong>Định nghĩa:</strong> Tuple chứa kích thước mỗi chiều. Cho biết mỗi trục dài bao nhiêu.</p>
      <p><strong>Ví dụ chi tiết:</strong></p>
      <ul>
        <li><code>[1, 2, 3]</code> → shape (3,): vector 3 phần tử</li>
        <li><code>[[1,2],[3,4],[5,6]]</code> → shape (3, 2): ma trận 3 hàng 2 cột</li>
        <li>Ảnh RGB 224x224 → shape (3, 224, 224): 3 kênh màu × 224 cao × 224 rộng</li>
        <li>Batch 32 ảnh → shape (32, 3, 224, 224): 32 ảnh × 3 kênh × 224 × 224</li>
      </ul>
      <p><strong>Trong PyTorch:</strong> <code>tensor.shape</code> hoặc <code>tensor.size()</code></p>
    </div>
  </div>

  <p><strong>Tổng số phần tử = tích tất cả các chiều trong shape:</strong></p>
  <ul>
    <li>Shape (3,) → 3 phần tử</li>
    <li>Shape (3, 2) → 3 × 2 = 6 phần tử</li>
    <li>Shape (3, 224, 224) → 3 × 224 × 224 = 150,528 phần tử</li>
    <li>Shape (32, 3, 224, 224) → 32 × 150,528 = 4,816,896 phần tử</li>
  </ul>

  <!-- ========================================= -->
  <!-- 3.3. PHÉP TOÁN TENSOR                       -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">calculate</span> 3.3. Các phép toán trên Tensor</h3>

  <h4>a) Phép cộng (Element-wise Addition)</h4>
  <div class="formula-block my-3 p-3 bg-blue-50 border-blue-200">
    <p>Hai tensor CÙNG shape → cộng từng phần tử tương ứng:</p>
    <p class="font-mono">$[1, 2, 3] + [4, 5, 6] = [5, 7, 9]$</p>
    <p class="font-mono mt-2">$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} + \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 6 & 8 \\\\ 10 & 12 \\end{bmatrix}$</p>
  </div>

  <h4>b) Tích vô hướng (Dot Product)</h4>
  <div class="formula-block my-3 p-3 bg-green-50 border-green-200">
    <p>Hai vector cùng độ dài → nhân từng cặp rồi cộng:</p>
    <p class="font-mono">$\\vec{a} \\cdot \\vec{b} = \\sum_{i=1}^{n} a_i \\times b_i$</p>
    <p class="font-mono mt-2">$[1, 2, 3] \\cdot [4, 5, 6] = 1 \\times 4 + 2 \\times 5 + 3 \\times 6 = 4 + 10 + 18 = 32$</p>
    <p class="mt-2"><strong>Trong Neural Network:</strong> Dot product = weighted sum (chính là phép tính cốt lõi của mỗi neuron!)</p>
    <p class="font-mono">$z = W \\cdot X = w_1 x_1 + w_2 x_2 + ... + w_n x_n$</p>
  </div>

  <h4>c) Nhân ma trận (Matrix Multiplication)</h4>
  <div class="formula-block my-3 p-3 bg-purple-50 border-purple-200">
    <p><strong>Điều kiện:</strong> Ma trận A có shape (m, k), ma trận B có shape (k, n) → Kết quả C có shape (m, n).</p>
    <p><strong>Số cột A phải = số hàng B.</strong></p>
    <p class="font-mono mt-2">
      $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} \\times \\begin{bmatrix} 5 & 6 \\\\ 7 & 8 \\end{bmatrix} = \\begin{bmatrix} 1 \\times 5 + 2 \\times 7 & 1 \\times 6 + 2 \\times 8 \\\\ 3 \\times 5 + 4 \\times 7 & 3 \\times 6 + 4 \\times 8 \\end{bmatrix} = \\begin{bmatrix} 19 & 22 \\\\ 43 & 50 \\end{bmatrix}$
    </p>
    <p class="mt-2"><strong>Trong Neural Network:</strong> Forward pass qua 1 layer = nhân ma trận!</p>
    <p class="font-mono">$H = f(X \\cdot W + B)$</p>
    <p>X shape (batch, input_dim) × W shape (input_dim, output_dim) → H shape (batch, output_dim)</p>
  </div>

  <h4>d) Broadcasting</h4>
  <div class="formula-block my-3 p-3 bg-yellow-50 border-yellow-200">
    <p><strong>Broadcasting:</strong> Cho phép phép toán giữa tensors KHÁC shape bằng cách "mở rộng" tensor nhỏ hơn.</p>
    <p class="font-mono mt-2">Vector + Scalar: $[1, 2, 3] + 5 = [6, 7, 8]$ (5 được broadcast thành [5, 5, 5])</p>
    <p class="font-mono mt-1">Matrix + Vector: $\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix} + [10, 20] = \\begin{bmatrix} 11 & 22 \\\\ 13 & 24 \\end{bmatrix}$</p>
    <p class="mt-2"><strong>Trong NN:</strong> Bias addition dùng broadcasting. Bias shape (output_dim,) được cộng vào mỗi sample trong batch.</p>
  </div>

  <h4>e) Reshape / View</h4>
  <div class="formula-block my-3 p-3 bg-gray-50 border-gray-200">
    <p><strong>Reshape:</strong> Thay đổi shape mà KHÔNG thay đổi data. Tổng số phần tử phải giữ nguyên.</p>
    <p class="font-mono mt-2">Shape (2, 3) → (3, 2): ✓ (6 = 6)</p>
    <p class="font-mono">Shape (2, 3) → (6,): ✓ (6 = 6) [Flatten]</p>
    <p class="font-mono">Shape (2, 3) → (1, 6): ✓ (6 = 6)</p>
    <p class="font-mono">Shape (2, 3) → (4, 2): ✗ (6 ≠ 8)</p>
    <p class="mt-2"><strong>Trong CNN:</strong> Sau Conv layers → Flatten → Feed vào Fully Connected layers.</p>
    <p>Shape (batch, channels, H, W) → reshape → (batch, channels × H × W)</p>
  </div>

  <!-- ========================================= -->
  <!-- 3.4. TENSOR TRONG THỰC TẾ                   -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">image</span> 3.4. Tensor trong các bài toán thực tế</h3>

  <table class="comparison-table">
    <thead>
      <tr><th>Loại dữ liệu</th><th>Shape điển hình</th><th>Giải thích</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Dữ liệu bảng (Tabular)</strong></td>
        <td>(samples, features)</td>
        <td>VD: 1000 bệnh nhân × 10 chỉ số xét nghiệm → (1000, 10)</td>
      </tr>
      <tr>
        <td><strong>Ảnh grayscale</strong></td>
        <td>(batch, 1, H, W)</td>
        <td>VD: 64 ảnh MNIST 28×28 → (64, 1, 28, 28)</td>
      </tr>
      <tr>
        <td><strong>Ảnh RGB</strong></td>
        <td>(batch, 3, H, W)</td>
        <td>VD: 32 ảnh ImageNet 224×224 → (32, 3, 224, 224)</td>
      </tr>
      <tr>
        <td><strong>Text (sau tokenization)</strong></td>
        <td>(batch, seq_len)</td>
        <td>VD: 16 câu, mỗi câu 512 tokens → (16, 512), mỗi token là integer ID</td>
      </tr>
      <tr>
        <td><strong>Text embeddings</strong></td>
        <td>(batch, seq_len, embed_dim)</td>
        <td>VD: 16 câu × 512 tokens × 768 embedding → (16, 512, 768)</td>
      </tr>
      <tr>
        <td><strong>Video</strong></td>
        <td>(batch, time, C, H, W)</td>
        <td>VD: 8 video × 30 frames × 3 channels × 256 × 256</td>
      </tr>
      <tr>
        <td><strong>Audio (Mel spectrogram)</strong></td>
        <td>(batch, channels, freq, time)</td>
        <td>VD: 16 audio clips × 1 channel × 128 freq bins × 300 time steps</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: `// =====================================================
// DEMO TENSOR OPERATIONS TRONG RUST
// =====================================================
//
// Implement từ zero:
// 1. Scalar operations
// 2. Vector operations (dot product, add)
// 3. Matrix operations (multiply, transpose)
// 4. Shape checking
//
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║         TENSOR OPERATIONS - TỪ ZERO ĐẾN HERO                 ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // 1. SCALAR (Rank 0)
    // =========================================================
    println!("\\n=== 1. SCALAR (Rank 0) ===");
    let learning_rate: f64 = 0.01;
    let loss: f64 = 2.456;
    println!("  Learning rate: {}", learning_rate);
    println!("  Loss: {}", loss);
    println!("  Rank: 0, Shape: ()");
    
    // =========================================================
    // 2. VECTOR (Rank 1)
    // =========================================================
    println!("\\n=== 2. VECTOR OPERATIONS (Rank 1) ===");
    
    // Vector addition
    let a = vec![1.0, 2.0, 3.0];
    let b = vec![4.0, 5.0, 6.0];
    let sum: Vec<f64> = a.iter().zip(b.iter()).map(|(x, y)| x + y).collect();
    println!("  a = {:?}", a);
    println!("  b = {:?}", b);
    println!("  a + b = {:?}", sum);
    
    // Dot product (= weighted sum trong neuron!)
    let dot: f64 = a.iter().zip(b.iter()).map(|(x, y)| x * y).sum();
    println!("  a · b = {} (1×4 + 2×5 + 3×6 = 4 + 10 + 18 = 32)", dot);
    println!("  Rank: 1, Shape: ({})", a.len());
    
    // Ý nghĩa trong NN
    println!("\\n  [Ý nghĩa trong Neural Network]");
    let inputs = vec![0.5, 0.8, 0.3]; // 3 inputs
    let weights = vec![2.0, -1.0, 0.5]; // 3 weights
    let bias = 0.1;
    
    // Weighted sum = dot(inputs, weights) + bias
    let z: f64 = inputs.iter()
        .zip(weights.iter())
        .map(|(x, w)| x * w)
        .sum::<f64>() + bias;
    
    println!("  inputs  = {:?}", inputs);
    println!("  weights = {:?}", weights);
    println!("  bias = {}", bias);
    println!("  z = inputs · weights + bias");
    println!("    = {} × {} + {} × {} + {} × {} + {}",
        inputs[0], weights[0], inputs[1], weights[1], inputs[2], weights[2], bias);
    println!("    = {} + {} + {} + {}",
        inputs[0] * weights[0], inputs[1] * weights[1], inputs[2] * weights[2], bias);
    println!("    = {:.2}", z);
    
    // =========================================================
    // 3. MATRIX (Rank 2)
    // =========================================================
    println!("\\n=== 3. MATRIX OPERATIONS (Rank 2) ===");
    
    // Matrix as Vec<Vec<f64>>
    let mat_a = vec![
        vec![1.0, 2.0],
        vec![3.0, 4.0],
    ];
    let mat_b = vec![
        vec![5.0, 6.0],
        vec![7.0, 8.0],
    ];
    
    println!("  Matrix A (shape 2×2):");
    for row in &mat_a {
        println!("    {:?}", row);
    }
    
    println!("  Matrix B (shape 2×2):");
    for row in &mat_b {
        println!("    {:?}", row);
    }
    
    // Matrix multiplication
    let rows_a = mat_a.len();
    let cols_a = mat_a[0].len();
    let cols_b = mat_b[0].len();
    
    let mut result = vec![vec![0.0; cols_b]; rows_a];
    for i in 0..rows_a {
        for j in 0..cols_b {
            for k in 0..cols_a {
                result[i][j] += mat_a[i][k] * mat_b[k][j];
            }
        }
    }
    
    println!("\\n  A × B (Matrix Multiplication):");
    for row in &result {
        println!("    {:?}", row);
    }
    println!("  Kiểm tra: [1×5+2×7, 1×6+2×8 ; 3×5+4×7, 3×6+4×8]");
    println!("           = [19, 22 ; 43, 50] ✓");
    
    // Transpose
    let rows = mat_a.len();
    let cols = mat_a[0].len();
    let mut transposed = vec![vec![0.0; rows]; cols];
    for i in 0..rows {
        for j in 0..cols {
            transposed[j][i] = mat_a[i][j];
        }
    }
    println!("\\n  Transpose(A):");
    for row in &transposed {
        println!("    {:?}", row);
    }
    
    // =========================================================
    // 4. FORWARD PASS 1 LAYER (Matrix form)
    // =========================================================
    println!("\\n=== 4. FORWARD PASS = MATRIX MULTIPLICATION ===");
    
    // 2 samples, mỗi sample 3 features
    let x_batch = vec![
        vec![1.0, 0.5, 0.3], // sample 1
        vec![0.2, 0.8, 0.6], // sample 2
    ];
    
    // Weight matrix: 3 inputs → 2 outputs
    let w_layer = vec![
        vec![0.1, 0.4],  // weights from input 1 to output 1,2
        vec![0.3, 0.2],  // weights from input 2 to output 1,2
        vec![0.5, 0.1],  // weights from input 3 to output 1,2
    ];
    
    let b_layer = vec![0.1, -0.1]; // bias for each output
    
    println!("  X_batch shape: (2, 3) - 2 samples, 3 features");
    println!("  W shape: (3, 2) - 3 inputs, 2 outputs");
    println!("  b shape: (2,) - 2 biases");
    
    // Z = X × W + b
    let batch_size = x_batch.len();
    let output_dim = w_layer[0].len();
    let input_dim = w_layer.len();
    
    let mut z_batch = vec![vec![0.0; output_dim]; batch_size];
    for i in 0..batch_size {
        for j in 0..output_dim {
            z_batch[i][j] = b_layer[j]; // Start with bias
            for k in 0..input_dim {
                z_batch[i][j] += x_batch[i][k] * w_layer[k][j];
            }
        }
    }
    
    println!("\\n  Z = X × W + b:");
    for (i, row) in z_batch.iter().enumerate() {
        println!("    Sample {}: [{:.3}, {:.3}]", i+1, row[0], row[1]);
    }
    
    // Apply ReLU activation
    println!("\\n  After ReLU activation (max(0, z)):");
    for (i, row) in z_batch.iter().enumerate() {
        let activated: Vec<f64> = row.iter().map(|&z| if z > 0.0 { z } else { 0.0 }).collect();
        println!("    Sample {}: [{:.3}, {:.3}]", i+1, activated[0], activated[1]);
    }
    
    println!("\\n  → Đây chính là 1 Forward Pass qua 1 layer!");
    println!("  → Neural Network = nhiều lần phép toán này nối tiếp nhau");
}`
  },
  // ==========================================================
  // LESSON 4: DATA ENCODING - CHUYỂN ĐỔI DỮ LIỆU PHI SỐ
  // ==========================================================
  {
    id: 'ch21_01_04',
    title: '4. Data Encoding - Chuyển đổi dữ liệu phi số thành số',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">swap_horiz</span> 4. Data Encoding - Chuyển đổi dữ liệu phi số thành số</h2>

  <p>Neural Network chỉ hiểu <strong>SỐ</strong>. Mọi dữ liệu phi số (text, danh mục, màu sắc...) phải được chuyển thành dạng số trước khi đưa vào mô hình. Quá trình này gọi là <strong>Encoding</strong>.</p>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">priority_high</span>
    <div class="callout-content">
      <span class="callout-title">Tại sao không đưa text trực tiếp vào Neural Network?</span>
      <p>Máy tính lưu trữ mọi thứ dưới dạng số nhị phân (0 và 1). Neural Network thực hiện các phép toán số học (nhân, cộng). Nếu input là "Chó", "Mèo", "Chim" - máy không biết nhân "Chó" × 0.5 là bao nhiêu!</p>
      <p>Do đó, mọi categorical data phải được encode (mã hóa) thành số trước.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 4.1. LABEL ENCODING                        -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">label</span> 4.1. Label Encoding (Mã hóa nhãn)</h3>

  <div class="definition-block">
    <span class="definition-term">Định nghĩa</span>
    <p>Gán mỗi danh mục một số nguyên duy nhất.</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr><th>Danh mục gốc</th><th>Label Encoded</th></tr>
    </thead>
    <tbody>
      <tr><td>Chó</td><td>0</td></tr>
      <tr><td>Mèo</td><td>1</td></tr>
      <tr><td>Chim</td><td>2</td></tr>
      <tr><td>Cá</td><td>3</td></tr>
    </tbody>
  </table>

  <p><strong>Ưu điểm:</strong></p>
  <ul>
    <li>Đơn giản, dễ implement</li>
    <li>Tiết kiệm bộ nhớ (1 số thay vì nhiều cột)</li>
    <li>Phù hợp cho dữ liệu có thứ tự (ordinal): Thấp < Trung bình < Cao</li>
  </ul>

  <p><strong>Nhược điểm nghiêm trọng:</strong></p>
  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">Vấn đề thứ tự giả</span>
      <p>Label Encoding tạo ra thứ tự không tồn tại. Ví dụ: Chó=0, Mèo=1, Chim=2.</p>
      <p>Model có thể hiểu sai: "Chim (2) > Mèo (1) > Chó (0)" hoặc "Chim - Chó = 2 × khoảng cách Mèo - Chó".</p>
      <p>Thực tế: Chó, Mèo, Chim là 3 loài bình đẳng, KHÔNG có thứ tự nào!</p>
      <p><strong>Khi nào dùng Label Encoding:</strong> Chỉ khi danh mục CÓ THỨ TỰ tự nhiên.</p>
      <ul>
        <li>Kích cỡ: S=0, M=1, L=2, XL=3 ✓ (có thứ tự)</li>
        <li>Học vấn: THPT=0, CĐ=1, ĐH=2, ThS=3, TS=4 ✓ (có thứ tự)</li>
        <li>Màu sắc: Đỏ=0, Xanh=1, Vàng=2 ✗ (KHÔNG có thứ tự)</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 4.2. ONE-HOT ENCODING                      -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">toggle_on</span> 4.2. One-Hot Encoding (Mã hóa nhị phân)</h3>

  <div class="definition-block">
    <span class="definition-term">Định nghĩa</span>
    <p>Tạo N cột nhị phân (0/1) cho N danh mục. Mỗi danh mục được biểu diễn bằng 1 vector có đúng 1 phần tử = 1, còn lại = 0.</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr><th>Danh mục</th><th>is_Chó</th><th>is_Mèo</th><th>is_Chim</th><th>is_Cá</th><th>Vector</th></tr>
    </thead>
    <tbody>
      <tr><td>Chó</td><td><strong>1</strong></td><td>0</td><td>0</td><td>0</td><td>[1, 0, 0, 0]</td></tr>
      <tr><td>Mèo</td><td>0</td><td><strong>1</strong></td><td>0</td><td>0</td><td>[0, 1, 0, 0]</td></tr>
      <tr><td>Chim</td><td>0</td><td>0</td><td><strong>1</strong></td><td>0</td><td>[0, 0, 1, 0]</td></tr>
      <tr><td>Cá</td><td>0</td><td>0</td><td>0</td><td><strong>1</strong></td><td>[0, 0, 0, 1]</td></tr>
    </tbody>
  </table>

  <p><strong>Ưu điểm:</strong></p>
  <ul>
    <li>Không tạo thứ tự giả - mỗi danh mục hoàn toàn bình đẳng</li>
    <li>Khoảng cách Euclidean giữa mọi cặp danh mục đều bằng nhau ($\\sqrt{2}$)</li>
    <li>Model không bị "confuse" bởi quan hệ thứ tự không tồn tại</li>
    <li>Phù hợp cho dữ liệu nominal (không thứ tự): Màu sắc, Quốc gia, Loài vật</li>
  </ul>

  <p><strong>Nhược điểm:</strong></p>
  <ul>
    <li><strong>Curse of Dimensionality:</strong> N danh mục → N cột mới. Nếu có 10,000 danh mục (VD: 10,000 từ vựng) → 10,000 cột → bộ nhớ khổng lồ, model chậm</li>
    <li><strong>Sparse Matrix:</strong> Hầu hết giá trị = 0 → lãng phí bộ nhớ</li>
    <li>Giải pháp cho N lớn: dùng <strong>Embedding</strong> (sẽ học ở phần Transformers)</li>
  </ul>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">tips_and_updates</span>
    <div class="callout-content">
      <span class="callout-title">Khi nào dùng One-Hot vs Label Encoding?</span>
      <table class="comparison-table">
        <thead><tr><th>Tiêu chí</th><th>Label Encoding</th><th>One-Hot Encoding</th></tr></thead>
        <tbody>
          <tr><td>Dữ liệu có thứ tự (ordinal)</td><td>✓ Phù hợp</td><td>✗ Mất thông tin thứ tự</td></tr>
          <tr><td>Dữ liệu không thứ tự (nominal)</td><td>✗ Tạo thứ tự giả</td><td>✓ Phù hợp</td></tr>
          <tr><td>Số danh mục ít (< 20)</td><td>OK</td><td>✓ Tốt nhất</td></tr>
          <tr><td>Số danh mục nhiều (> 100)</td><td>OK</td><td>✗ Quá nhiều cột → dùng Embedding</td></tr>
          <tr><td>Tree-based models (Random Forest, XGBoost)</td><td>✓ Hoạt động tốt</td><td>OK nhưng chậm hơn</td></tr>
          <tr><td>Neural Networks</td><td>✗ Thường bị sai</td><td>✓ Chuẩn mực</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 4.3. EMBEDDING                              -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">hub</span> 4.3. Embedding - Kỹ thuật mã hóa hiện đại</h3>

  <div class="definition-block">
    <span class="definition-term">Embedding là gì?</span>
    <p>Thay vì one-hot vector thưa thớt (sparse) với N chiều, Embedding nén mỗi danh mục thành vector dày đặc (dense) với D chiều (D &lt;&lt; N). Giá trị trong vector được <strong>model tự học</strong> trong quá trình training.</p>
  </div>

  <table class="comparison-table">
    <thead>
      <tr><th>Phương pháp</th><th>Biểu diễn "Chó"</th><th>Số chiều</th><th>Đặc điểm</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>One-Hot (10,000 loài)</td>
        <td>[0, 0, ..., 1, ..., 0, 0]</td>
        <td>10,000</td>
        <td>Sparse, mỗi loài cách đều nhau</td>
      </tr>
      <tr>
        <td>Embedding (128-d)</td>
        <td>[0.23, -0.45, 0.12, ..., 0.67]</td>
        <td>128</td>
        <td>Dense, loài giống nhau ở gần nhau</td>
      </tr>
    </tbody>
  </table>

  <p><strong>Ưu điểm vượt trội của Embedding:</strong></p>
  <ul>
    <li><strong>Tiết kiệm bộ nhớ:</strong> 10,000 → 128 chiều (giảm ~78 lần)</li>
    <li><strong>Học được quan hệ ngữ nghĩa:</strong> "Chó" và "Sói" sẽ có vector gần nhau (vì chúng xuất hiện trong ngữ cảnh tương tự)</li>
    <li><strong>Nền tảng của NLP hiện đại:</strong> Word2Vec, GloVe, BERT, GPT đều dùng Embedding</li>
  </ul>

  <p><em>Ví dụ nổi tiếng của Word2Vec:</em></p>
  <p class="font-mono">Embedding("King") - Embedding("Man") + Embedding("Woman") ≈ Embedding("Queen")</p>
  <p>Embedding đã học được rằng "King" và "Queen" có quan hệ giống "Man" và "Woman"!</p>

  <!-- ========================================= -->
  <!-- 4.4. ENCODING CHO CÁC KIỂU DỮ LIỆU       -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">conversion_path</span> 4.4. Encoding cho các kiểu dữ liệu khác nhau</h3>

  <table class="comparison-table">
    <thead>
      <tr><th>Kiểu dữ liệu</th><th>Ví dụ</th><th>Cách encode</th><th>Chi tiết</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Số liên tục</strong></td>
        <td>Tuổi, Chiều cao, Lương</td>
        <td>Giữ nguyên (normalize)</td>
        <td>Đã là số → chỉ cần normalize (Min-Max hoặc Z-Score)</td>
      </tr>
      <tr>
        <td><strong>Nhị phân</strong></td>
        <td>Giới tính (Nam/Nữ)</td>
        <td>0/1</td>
        <td>Nam=0, Nữ=1 (hoặc ngược lại)</td>
      </tr>
      <tr>
        <td><strong>Có thứ tự</strong></td>
        <td>Kích cỡ (S/M/L/XL)</td>
        <td>Label Encoding</td>
        <td>S=0, M=1, L=2, XL=3</td>
      </tr>
      <tr>
        <td><strong>Không thứ tự (ít loại)</strong></td>
        <td>Màu (Đỏ/Xanh/Vàng)</td>
        <td>One-Hot</td>
        <td>Đỏ=[1,0,0], Xanh=[0,1,0], Vàng=[0,0,1]</td>
      </tr>
      <tr>
        <td><strong>Không thứ tự (nhiều loại)</strong></td>
        <td>Quốc gia (195 nước)</td>
        <td>Embedding</td>
        <td>Mỗi nước → vector 32-d (học được)</td>
      </tr>
      <tr>
        <td><strong>Text</strong></td>
        <td>Câu văn</td>
        <td>Tokenize + Embedding</td>
        <td>Tách thành tokens → look up Embedding table</td>
      </tr>
      <tr>
        <td><strong>Ảnh</strong></td>
        <td>Ảnh 224x224 RGB</td>
        <td>Pixel values / 255</td>
        <td>Chia cho 255 để normalize về [0, 1]</td>
      </tr>
      <tr>
        <td><strong>Ngày tháng</strong></td>
        <td>2024-03-15</td>
        <td>Tách thành features</td>
        <td>year, month, day, day_of_week, is_weekend, quarter...</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: `// =====================================================
// DATA ENCODING - IMPLEMENT TỪ ZERO TRONG RUST
// =====================================================
//
// Implement 3 loại encoding:
// 1. Label Encoding
// 2. One-Hot Encoding
// 3. Ví dụ thực tế encode dataset
//
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║         DATA ENCODING - CHUYỂN ĐỔI DỮ LIỆU PHI SỐ           ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // 1. LABEL ENCODING
    // =========================================================
    println!("\\n=== 1. LABEL ENCODING ===");
    println!("  Dữ liệu danh mục: [Chó, Mèo, Chim, Cá, Mèo, Chó, Chim]");
    
    // Giả lập label encoding
    let categories = vec!["Chó", "Mèo", "Chim", "Cá", "Mèo", "Chó", "Chim"];
    let unique = vec!["Chó", "Mèo", "Chim", "Cá"]; // thứ tự xuất hiện đầu tiên
    
    print!("  Label Encoded: [");
    for (i, cat) in categories.iter().enumerate() {
        // Tìm index trong unique
        let label = unique.iter().position(|&x| x == *cat).unwrap();
        if i > 0 { print!(", "); }
        print!("{}", label);
    }
    println!("]");
    
    println!("  Mapping:");
    for (i, cat) in unique.iter().enumerate() {
        println!("    {} → {}", cat, i);
    }
    
    println!("\\n  ⚠️ Vấn đề: Model có thể hiểu sai rằng Cá(3) > Chim(2) > Mèo(1) > Chó(0)");
    println!("  → Giải pháp: Dùng One-Hot Encoding");

    // =========================================================
    // 2. ONE-HOT ENCODING
    // =========================================================
    println!("\\n=== 2. ONE-HOT ENCODING ===");
    println!("  4 danh mục → 4 cột nhị phân\\n");
    
    let num_categories = unique.len();
    
    println!("  {:6} │ is_Chó │ is_Mèo │ is_Chim │ is_Cá │ Vector", "Loài");
    println!("  ───────┼────────┼────────┼─────────┼───────┼──────────────");
    
    for cat in &unique {
        let idx = unique.iter().position(|&x| x == *cat).unwrap();
        
        // Tạo one-hot vector
        let mut one_hot = vec![0; num_categories];
        one_hot[idx] = 1;
        
        print!("  {:6} │", cat);
        for val in &one_hot {
            print!("   {}    │", val);
        }
        println!(" {:?}", one_hot);
    }
    
    // Khoảng cách giữa các vector
    println!("\\n  Khoảng cách Euclidean giữa mọi cặp:");
    println!("  Chó↔Mèo: sqrt((1-0)² + (0-1)² + 0 + 0) = sqrt(2) ≈ 1.414");
    println!("  Chó↔Chim: sqrt((1-0)² + 0 + (0-1)² + 0) = sqrt(2) ≈ 1.414");
    println!("  Chó↔Cá:   sqrt((1-0)² + 0 + 0 + (0-1)²) = sqrt(2) ≈ 1.414");
    println!("  → Mọi cặp đều cách đều nhau. Hoàn toàn bình đẳng! ✓");

    // =========================================================
    // 3. VÍ DỤ THỰC TẾ: ENCODE DATASET DỰ ĐOÁN GIÁ NHÀ
    // =========================================================
    println!("\\n=== 3. VÍ DỤ THỰC TẾ: ENCODE DATASET DỰ ĐOÁN GIÁ NHÀ ===");
    
    println!("\\n  Dữ liệu gốc (raw data):");
    println!("  ┌──────────┬──────────┬───────────┬──────────┐");
    println!("  │ Diện tích│ Số phòng │ Vị trí    │ Giá (tỷ) │");
    println!("  ├──────────┼──────────┼───────────┼──────────┤");
    println!("  │ 80 m²    │ 3        │ Quận 1    │ 5.0      │");
    println!("  │ 120 m²   │ 4        │ Quận 7    │ 4.5      │");
    println!("  │ 60 m²    │ 2        │ Thủ Đức   │ 2.0      │");
    println!("  │ 200 m²   │ 5        │ Quận 1    │ 10.0     │");
    println!("  └──────────┴──────────┴───────────┴──────────┘");
    
    println!("\\n  Sau encoding (One-Hot cho Vị trí):");
    println!("  ┌──────────┬──────────┬─────────┬─────────┬──────────┬──────────┐");
    println!("  │ Diện tích│ Số phòng │ is_Q1   │ is_Q7   │ is_ThĐức │ Giá (tỷ) │");
    println!("  ├──────────┼──────────┼─────────┼─────────┼──────────┼──────────┤");
    println!("  │ 80       │ 3        │ 1       │ 0       │ 0        │ 5.0      │");
    println!("  │ 120      │ 4        │ 0       │ 1       │ 0        │ 4.5      │");
    println!("  │ 60       │ 2        │ 0       │ 0       │ 1        │ 2.0      │");
    println!("  │ 200      │ 5        │ 1       │ 0       │ 0        │ 10.0     │");
    println!("  └──────────┴──────────┴─────────┴─────────┴──────────┴──────────┘");
    
    println!("\\n  Input tensor shape: (4, 5)");
    println!("  - 4 samples");
    println!("  - 5 features: diện_tích, số_phòng, is_Q1, is_Q7, is_ThĐức");
    println!("\\n  Output tensor shape: (4, 1)");
    println!("  - 4 samples, 1 giá trị giá nhà");
    
    println!("\\n  → Bước tiếp theo: Normalize các features (bài tiếp theo)");
    println!("  → Vì diện_tích (60~200) và is_Q1 (0~1) có scale khác nhau rất nhiều!");
}`
  },
  // ==========================================================
  // LESSON 5: DATA NORMALIZATION - CHUẨN HÓA DỮ LIỆU
  // ==========================================================
  {
    id: 'ch21_01_05',
    title: '5. Data Normalization - Chuẩn hóa dữ liệu',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">electric_meter</span> 5. Data Normalization - Tại sao phải chuẩn hóa dữ liệu?</h2>

  <!-- ========================================= -->
  <!-- 5.1. VẤN ĐỀ CỦA DỮ LIỆU THÔ              -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">crisis_alert</span> 5.1. Vấn đề chết người của dữ liệu thô</h3>

  <p>Xét dataset dự đoán giá nhà với 3 features:</p>
  <table class="comparison-table">
    <thead>
      <tr><th>Feature</th><th>Min</th><th>Max</th><th>Scale</th></tr>
    </thead>
    <tbody>
      <tr><td>Diện tích (m²)</td><td>30</td><td>500</td><td>Hàng trăm</td></tr>
      <tr><td>Số phòng</td><td>1</td><td>10</td><td>Hàng đơn vị</td></tr>
      <tr><td>Thu nhập hàng tháng (VNĐ)</td><td>5,000,000</td><td>200,000,000</td><td>Hàng triệu</td></tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">3 hậu quả nghiêm trọng khi không normalize</span>
      <ol>
        <li><strong>Feature thống trị:</strong> Thu nhập (5-200 triệu) sẽ chi phối hoàn toàn weighted sum, lấn át Số phòng (1-10). Model học được chủ yếu từ Thu nhập, bỏ qua các features khác.</li>
        <li><strong>Gradient không ổn định:</strong> Weighted sum $z = w_1 \\times 500 + w_2 \\times 10 + w_3 \\times 200,000,000$. Gradient theo $w_3$ sẽ lớn gấp 400,000 lần gradient theo $w_2$. Learning rate phù hợp cho $w_2$ thì quá nhỏ cho $w_3$ và ngược lại.</li>
        <li><strong>Hội tụ chậm hoặc không hội tụ:</strong> Loss landscape trở nên dài hẹp (ellipsoid) thay vì tròn (spherical). Gradient Descent phải "zigzag" rất nhiều lần mới đến minimum → training chậm 10-100 lần.</li>
      </ol>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">shape_line</span></div>
      <h4>Không normalize: Loss Landscape hẹp dài</h4>
      <p>Gradient phải zigzag hàng ngàn bước (giống đáy thung lũng hẹp):</p>
      <div class="image-showcase" style="margin: 10px 0;">
        <img src="/images/ch21/gradient_descent_valley_1773153973142.png" alt="Gradient Descent Valley" style="width: 100%; border-radius: 8px;" />
      </div>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">circle</span></div>
      <h4>Có normalize: Loss Landscape tròn đều</h4>
      <p>Gradient đi thẳng đến đích:</p>
      <pre>
      w₂ │     ___
         │    /   \\
         │   |  ●  |  ← tròn đều
         │    \\___/     đi thẳng minimum
         └──────────── w₁
      </pre>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 5.2. MIN-MAX NORMALIZATION                  -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">compress</span> 5.2. Min-Max Normalization (Scaling về [0, 1])</h3>

  <div class="definition-block">
    <span class="definition-term">Công thức</span>
    <p class="font-mono text-lg">$X_{norm} = \\frac{X - X_{min}}{X_{max} - X_{min}}$</p>
    <p class="mt-2">Kết quả: Mọi giá trị nằm trong khoảng <strong>[0, 1]</strong></p>
    <p>$X_{min}$ → 0.0, $X_{max}$ → 1.0, giá trị ở giữa tỷ lệ tuyến tính.</p>
  </div>

  <p><strong>Ví dụ tính toán chi tiết:</strong></p>
  <table class="comparison-table">
    <thead>
      <tr><th>Diện tích (m²)</th><th>Tính toán</th><th>Kết quả</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>30 (min)</td>
        <td>$(30 - 30) / (500 - 30) = 0 / 470$</td>
        <td><strong>0.000</strong></td>
      </tr>
      <tr>
        <td>100</td>
        <td>$(100 - 30) / (500 - 30) = 70 / 470$</td>
        <td><strong>0.149</strong></td>
      </tr>
      <tr>
        <td>250</td>
        <td>$(250 - 30) / (500 - 30) = 220 / 470$</td>
        <td><strong>0.468</strong></td>
      </tr>
      <tr>
        <td>500 (max)</td>
        <td>$(500 - 30) / (500 - 30) = 470 / 470$</td>
        <td><strong>1.000</strong></td>
      </tr>
    </tbody>
  </table>

  <p><strong>Ưu điểm:</strong></p>
  <ul>
    <li>Kết quả trong [0, 1] → dễ hiểu, dễ so sánh</li>
    <li>Bảo toàn tỷ lệ và phân phối ban đầu</li>
    <li>Phù hợp khi biết rõ min/max (VD: pixel 0-255 → chia 255)</li>
  </ul>

  <p><strong>Nhược điểm:</strong></p>
  <ul>
    <li><strong>Nhạy cảm với outliers:</strong> Nếu có 1 giá trị cực lớn (VD: nhà 10,000 m²), mọi giá trị khác bị nén về gần 0</li>
    <li><strong>Giới hạn cứng:</strong> Dữ liệu test có giá trị nằm ngoài [min, max] sẽ ra ngoài [0, 1]</li>
    <li>Không phù hợp khi dữ liệu có outliers đáng kể</li>
  </ul>

  <!-- ========================================= -->
  <!-- 5.3. Z-SCORE STANDARDIZATION                -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">bar_chart</span> 5.3. Z-Score Standardization (Chuẩn hóa theo phân phối)</h3>

  <div class="definition-block">
    <span class="definition-term">Công thức</span>
    <p class="font-mono text-lg">$X_{std} = \\frac{X - \\mu}{\\sigma}$</p>
    <p class="mt-2">Trong đó:</p>
    <ul>
      <li>$\\mu$ = <strong>Mean (Trung bình)</strong> = $\\frac{1}{n} \\sum_{i=1}^{n} x_i$</li>
      <li>$\\sigma$ = <strong>Standard Deviation (Độ lệch chuẩn)</strong> = $\\sqrt{\\frac{1}{n} \\sum (x_i - \\mu)^2}$</li>
    </ul>
    <p>Kết quả: <strong>Mean = 0, Std = 1</strong> (phân phối chuẩn tắc)</p>
  </div>

  <p><strong>Ví dụ tính toán chi tiết từng bước:</strong></p>
  <p>Dữ liệu: Lương hàng tháng (triệu VNĐ) = [5, 10, 15, 60, 10]</p>
  
  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Bước 1: Tính Mean ($\\mu$)</h4>
        <p class="font-mono">$\\mu = (5 + 10 + 15 + 60 + 10) / 5 = 100 / 5 = 20$</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Bước 2: Tính phương sai (Variance)</h4>
        <p class="font-mono">$\\sigma^2 = [(5-20)^2 + (10-20)^2 + (15-20)^2 + (60-20)^2 + (10-20)^2] / 5$</p>
        <p class="font-mono">$= [225 + 100 + 25 + 1600 + 100] / 5 = 2050 / 5 = 410$</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Bước 3: Tính Standard Deviation ($\\sigma$)</h4>
        <p class="font-mono">$\\sigma = \\sqrt{410} \\approx 20.25$</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Bước 4: Áp dụng Z-Score</h4>
        <table class="comparison-table">
          <thead><tr><th>Lương gốc</th><th>$(X - \\mu) / \\sigma$</th><th>Z-Score</th><th>Ý nghĩa</th></tr></thead>
          <tbody>
            <tr><td>5 triệu</td><td>$(5 - 20) / 20.25$</td><td><strong>-0.741</strong></td><td>Dưới trung bình 0.74 độ lệch chuẩn</td></tr>
            <tr><td>10 triệu</td><td>$(10 - 20) / 20.25$</td><td><strong>-0.494</strong></td><td>Dưới trung bình 0.49 độ lệch chuẩn</td></tr>
            <tr><td>15 triệu</td><td>$(15 - 20) / 20.25$</td><td><strong>-0.247</strong></td><td>Gần trung bình</td></tr>
            <tr><td>60 triệu</td><td>$(60 - 20) / 20.25$</td><td><strong>+1.975</strong></td><td>Trên trung bình 1.97 độ lệch chuẩn (outlier!)</td></tr>
            <tr><td>10 triệu</td><td>$(10 - 20) / 20.25$</td><td><strong>-0.494</strong></td><td>Dưới trung bình 0.49 độ lệch chuẩn</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <p><strong>Kiểm tra:</strong> Mean of Z-Scores = $(-0.741 - 0.494 - 0.247 + 1.975 - 0.494) / 5 \\approx 0$. ✓</p>

  <p><strong>Ưu điểm:</strong></p>
  <ul>
    <li>Ít nhạy cảm với outliers hơn Min-Max (outlier chỉ bị đẩy xa, không nén toàn bộ phân phối)</li>
    <li>Không có giới hạn cứng → dữ liệu mới extrapolate tốt hơn</li>
    <li>Tất cả features có cùng scale (mean=0, std=1) → Gradient Descent hội tụ nhanh</li>
    <li>Phù hợp nhất cho hầu hết Neural Networks</li>
  </ul>

  <p><strong>Nhược điểm:</strong></p>
  <ul>
    <li>Không có giới hạn rõ ràng (giá trị có thể < -3 hoặc > +3)</li>
    <li>Giả định dữ liệu gần phân phối chuẩn (normal distribution)</li>
  </ul>

  <!-- ========================================= -->
  <!-- 5.4. SO SÁNH CÁC PHƯƠNG PHÁP               -->
  <!-- ========================================= -->  
  <h3><span class="material-symbols-outlined">compare_arrows</span> 5.4. So sánh tổng hợp các phương pháp Normalization</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Phương pháp</th>
        <th>Công thức</th>
        <th>Range</th>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
        <th>Khi nào dùng</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Min-Max</strong></td>
        <td>$\\frac{X-X_{min}}{X_{max}-X_{min}}$</td>
        <td>[0, 1]</td>
        <td>Đơn giản, giữ tỷ lệ</td>
        <td>Nhạy outliers</td>
        <td>Ảnh (pixel/255), dữ liệu không outliers</td>
      </tr>
      <tr>
        <td><strong>Z-Score</strong></td>
        <td>$\\frac{X-\\mu}{\\sigma}$</td>
        <td>(-∞, ∞)</td>
        <td>Robust, hội tụ nhanh</td>
        <td>Giả định normal dist</td>
        <td>Neural Networks (mặc định), dữ liệu có outliers nhẹ</td>
      </tr>
      <tr>
        <td><strong>Robust Scaling</strong></td>
        <td>$\\frac{X-median}{IQR}$</td>
        <td>(-∞, ∞)</td>
        <td>Không bị ảnh hưởng outliers</td>
        <td>Phức tạp hơn</td>
        <td>Dữ liệu có nhiều outliers</td>
      </tr>
      <tr>
        <td><strong>Max Abs Scaling</strong></td>
        <td>$\\frac{X}{|X_{max}|}$</td>
        <td>[-1, 1]</td>
        <td>Bảo toàn sparse structure</td>
        <td>Nhạy outliers</td>
        <td>Sparse data, data đã center</td>
      </tr>
      <tr>
        <td><strong>Log Transform</strong></td>
        <td>$\\log(1 + X)$</td>
        <td>[0, ∞)</td>
        <td>Giảm skewness</td>
        <td>Chỉ cho X ≥ 0</td>
        <td>Dữ liệu skewed (giá nhà, lương, dân số)</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 5.5. BATCH NORMALIZATION                    -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">tune</span> 5.5. Batch Normalization (Chuẩn hóa trong mạng)</h3>

  <div class="definition-block">
    <span class="definition-term">Batch Normalization (Ioffe & Szegedy, 2015)</span>
    <p>Khác với các phương pháp trên (normalize DATA trước khi đưa vào mạng), Batch Normalization normalize <strong>bên trong mạng</strong>, tại mỗi layer, trong quá trình training.</p>
  </div>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Tính mean và variance của mini-batch</h4>
        <p>$\\mu_B = \\frac{1}{m} \\sum_{i=1}^{m} x_i$</p>
        <p>$\\sigma_B^2 = \\frac{1}{m} \\sum_{i=1}^{m} (x_i - \\mu_B)^2$</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Normalize</h4>
        <p>$\\hat{x}_i = \\frac{x_i - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$</p>
        <p>$\\epsilon$ (epsilon) ~ $10^{-5}$: tránh chia cho 0</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Scale và Shift (learnable parameters)</h4>
        <p>$y_i = \\gamma \\hat{x}_i + \\beta$</p>
        <p>$\\gamma$ (scale) và $\\beta$ (shift) được <strong>model tự học</strong>.</p>
        <p>Tại sao cần γ, β? Vì normalize về mean=0, std=1 có thể quá "nghiêm ngặt". γ, β cho phép model tự quyết định mức normalize phù hợp.</p>
      </div>
    </div>
  </div>

  <p><strong>Lợi ích của Batch Normalization:</strong></p>
  <ul>
    <li><strong>Training nhanh hơn 5-10 lần:</strong> Gradient ổn định, cho phép dùng learning rate lớn hơn</li>
    <li><strong>Giảm Internal Covariate Shift:</strong> Output mỗi layer ổn định → layer sau dễ học hơn</li>
    <li><strong>Regularization nhẹ:</strong> Noise từ mini-batch statistics giúp giảm overfitting (nhẹ)</li>
    <li><strong>Ít phụ thuộc weight initialization:</strong> Normalize bù đắp cho khởi tạo kém</li>
  </ul>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">psychology</span></div>
    <h3>Quy tắc ngón cái</h3>
    <p><strong>Luôn normalize dữ liệu trước khi đưa vào Neural Network.</strong> Với hầu hết trường hợp, Z-Score Standardization là lựa chọn mặc định. Với ảnh, dùng Min-Max (chia 255). Bên trong mạng, dùng Batch Normalization ở mỗi layer.</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// DATA NORMALIZATION - IMPLEMENT TỪ ZERO TRONG RUST
// =====================================================
//
// Implement chi tiết:
// 1. Min-Max Normalization
// 2. Z-Score Standardization
// 3. So sánh kết quả
// 4. Ứng dụng cho bài toán dự đoán giá nhà
//
// =====================================================

// =====================================================
// PHẦN 1: HÀM THỐNG KÊ CƠ BẢN
// =====================================================

/// Tính trung bình (mean) của mảng số
/// Formula: μ = (1/n) × Σxᵢ
fn mean(data: &[f64]) -> f64 {
    let sum: f64 = data.iter().sum();
    sum / data.len() as f64
}

/// Tính độ lệch chuẩn (standard deviation)
/// Formula: σ = sqrt((1/n) × Σ(xᵢ - μ)²)
fn std_dev(data: &[f64]) -> f64 {
    let avg = mean(data);
    let variance: f64 = data.iter()
        .map(|x| {
            let diff = x - avg;
            diff * diff  // (xᵢ - μ)²
        })
        .sum::<f64>() / data.len() as f64;
    variance.sqrt()
}

/// Tìm giá trị nhỏ nhất
fn min(data: &[f64]) -> f64 {
    data.iter().cloned().fold(f64::INFINITY, f64::min)
}

/// Tìm giá trị lớn nhất
fn max(data: &[f64]) -> f64 {
    data.iter().cloned().fold(f64::NEG_INFINITY, f64::max)
}

// =====================================================
// PHẦN 2: CÁC HÀM NORMALIZATION
// =====================================================

/// Min-Max Normalization: Scale về [0, 1]
/// Formula: X_norm = (X - X_min) / (X_max - X_min)
fn min_max_normalize(data: &[f64]) -> Vec<f64> {
    let min_val = min(data);
    let max_val = max(data);
    let range = max_val - min_val;
    
    if range == 0.0 {
        // Tất cả giá trị giống nhau → trả về 0
        return vec![0.0; data.len()];
    }
    
    data.iter().map(|x| (x - min_val) / range).collect()
}

/// Z-Score Standardization: Mean=0, Std=1
/// Formula: X_std = (X - μ) / σ
fn z_score_normalize(data: &[f64]) -> Vec<f64> {
    let mu = mean(data);
    let sigma = std_dev(data);
    
    if sigma == 0.0 {
        return vec![0.0; data.len()];
    }
    
    data.iter().map(|x| (x - mu) / sigma).collect()
}

// =====================================================
// PHẦN 3: MAIN - DEMO ĐẦY ĐỦ
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║       DATA NORMALIZATION - SO SÁNH CÁC PHƯƠNG PHÁP            ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // DATASET: DỮ LIỆU DỰ ĐOÁN GIÁ NHÀ (3 features)
    // =========================================================
    let dien_tich = vec![30.0, 80.0, 120.0, 200.0, 500.0];
    let so_phong = vec![1.0, 3.0, 4.0, 5.0, 8.0];
    let thu_nhap = vec![5_000_000.0, 15_000_000.0, 30_000_000.0, 60_000_000.0, 200_000_000.0];
    
    println!("\\n=== DỮ LIỆU THÔ (RAW DATA) ===");
    println!("  {:>4} │ {:>12} │ {:>8} │ {:>15}", "STT", "Diện tích", "Số phòng", "Thu nhập");
    println!("  ─────┼──────────────┼──────────┼─────────────────");
    for i in 0..dien_tich.len() {
        println!("  {:>4} │ {:>10.0} m² │ {:>8.0} │ {:>13.0} đ",
            i+1, dien_tich[i], so_phong[i], thu_nhap[i]);
    }
    
    println!("\\n  ⚠️ Vấn đề: Scale khác nhau cực kỳ:");
    println!("    Diện tích: 30 ~ 500 (range = 470)");
    println!("    Số phòng: 1 ~ 8 (range = 7)");
    println!("    Thu nhập: 5M ~ 200M (range = 195M)");
    println!("    → Thu nhập sẽ THỐNG TRỊ weighted sum!");

    // =========================================================
    // 1. MIN-MAX NORMALIZATION
    // =========================================================
    println!("\\n╔══════════════════════════════════════════╗");
    println!("║     1. MIN-MAX NORMALIZATION [0, 1]          ║");
    println!("╚══════════════════════════════════════════╝");
    
    let dt_mm = min_max_normalize(&dien_tich);
    let sp_mm = min_max_normalize(&so_phong);
    let tn_mm = min_max_normalize(&thu_nhap);
    
    println!("  {:>4} │ {:>12} │ {:>8} │ {:>10}", "STT", "Diện tích", "Số phòng", "Thu nhập");
    println!("  ─────┼──────────────┼──────────┼────────────");
    for i in 0..dien_tich.len() {
        println!("  {:>4} │ {:>12.4} │ {:>8.4} │ {:>10.4}",
            i+1, dt_mm[i], sp_mm[i], tn_mm[i]);
    }
    println!("\\n  ✓ Tất cả features nằm trong [0, 1]");
    println!("  ✓ Không feature nào thống trị");

    // =========================================================
    // 2. Z-SCORE STANDARDIZATION
    // =========================================================
    println!("\\n╔══════════════════════════════════════════╗");
    println!("║     2. Z-SCORE STANDARDIZATION (μ=0, σ=1)    ║");
    println!("╚══════════════════════════════════════════╝");
    
    let dt_zs = z_score_normalize(&dien_tich);
    let sp_zs = z_score_normalize(&so_phong);
    let tn_zs = z_score_normalize(&thu_nhap);
    
    println!("  {:>4} │ {:>12} │ {:>8} │ {:>10}", "STT", "Diện tích", "Số phòng", "Thu nhập");
    println!("  ─────┼──────────────┼──────────┼────────────");
    for i in 0..dien_tich.len() {
        println!("  {:>4} │ {:>12.4} │ {:>8.4} │ {:>10.4}",
            i+1, dt_zs[i], sp_zs[i], tn_zs[i]);
    }
    
    // Kiểm tra mean và std
    println!("\\n  Kiểm tra:");
    println!("    Mean(Diện tích) = {:.4} (≈ 0 ✓)", mean(&dt_zs));
    println!("    Std(Diện tích) = {:.4} (≈ 1 ✓)", std_dev(&dt_zs));
    println!("    Mean(Thu nhập) = {:.4} (≈ 0 ✓)", mean(&tn_zs));
    println!("    Std(Thu nhập) = {:.4} (≈ 1 ✓)", std_dev(&tn_zs));
    
    // =========================================================
    // 3. SO SÁNH TRỰC TIẾP
    // =========================================================
    println!("\\n╔══════════════════════════════════════════╗");
    println!("║          SO SÁNH 2 PHƯƠNG PHÁP                ║");
    println!("╚══════════════════════════════════════════╝");
    
    println!("  Thu nhập mẫu thứ 5 (gốc: 200,000,000 VNĐ):");
    println!("    Min-Max: {:.4} (trong [0,1])", tn_mm[4]);
    println!("    Z-Score: {:.4} (outlier: cách mean {} sigma)", tn_zs[4], tn_zs[4].abs() as i32);
    println!("\\n  → Z-Score cho thấy rõ: mẫu 5 là OUTLIER (xa trung bình)");
    println!("  → Min-Max chỉ cho thấy: mẫu 5 là cực đại (=1.0)");

    println!("\\n=== KẾT LUẬN ===");
    println!("  ✓ LUÔN normalize dữ liệu trước khi đưa vào Neural Network");
    println!("  ✓ Z-Score là lựa chọn MẶC ĐỊNH cho hầu hết trường hợp");
    println!("  ✓ Min-Max khi biết rõ giới hạn (vd: pixel 0-255)");
    println!("  ✓ Normalize từng feature RIÊNG BIỆT (không trộn lẫn)");
}`
  },
  // ==========================================================
  // LESSON 6: DATA SPLITTING, BATCHING & PIPELINE
  // ==========================================================
  {
    id: 'ch21_01_06',
    title: '6. Data Splitting & Batching - Quy trình xử lý dữ liệu hoàn chỉnh',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">splitscreen</span> 6. Data Splitting, Batching & Pipeline hoàn chỉnh</h2>

  <!-- ========================================= -->
  <!-- 6.1. DATA SPLITTING CHI TIẾT               -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">content_cut</span> 6.1. Data Splitting - Chia dữ liệu (chi tiết)</h3>

  <p>Phần 1 đã giới thiệu sơ lược Train/Test split. Ở đây ta đi sâu vào từng chiến lược chia dữ liệu và tại sao mỗi chiến lược quan trọng.</p>

  <h4>a) Hold-out Split (Chia đơn giản)</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Phương pháp:</strong> Chia dataset thành 3 phần cố định.</p>
      <pre>
  Toàn bộ dataset (100%)
  ├── Training Set (60-80%): Model học từ đây
  ├── Validation Set (10-20%): Tuning hyperparameters
  └── Test Set (10-20%): Đánh giá cuối cùng (CHỈ DÙNG 1 LẦN)
      </pre>
      <p><strong>Ví dụ cụ thể:</strong></p>
      <p>Dataset 10,000 ảnh chó mèo:</p>
      <ul>
        <li>Training: 7,000 ảnh → Model xem và học patterns</li>
        <li>Validation: 1,500 ảnh → Sau mỗi epoch, test trên validation để xem overfitting chưa? Có cần giảm learning rate không? Có cần thêm Dropout không?</li>
        <li>Test: 1,500 ảnh → Cuối cùng, khi đã chốt model, test lần cuối để báo cáo accuracy cuối cùng</li>
      </ul>
      <p><strong>Ưu điểm:</strong> Đơn giản, nhanh.</p>
      <p><strong>Nhược điểm:</strong> Kết quả phụ thuộc vào cách chia (may rủi). Với dataset nhỏ (< 1000 mẫu) kết quả không đáng tin cậy.</p>
    </div>
  </div>

  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">Lỗi nghiêm trọng: Data Leakage</span>
      <p><strong>Data Leakage (Rò rỉ dữ liệu)</strong> xảy ra khi thông tin từ Test Set "rò rỉ" vào Training Set. Hậu quả: Model đạt accuracy cao giả, thực tế performance tệ.</p>
      <p><strong>Ví dụ Data Leakage phổ biến:</strong></p>
      <ul>
        <li><strong>Normalize TRƯỚC khi split:</strong> Nếu tính mean/std trên TOÀN BỘ dataset (bao gồm test), thì mean/std đã "nhìn thấy" test data → leakage!</li>
        <li><strong>Đúng:</strong> Split trước → Tính mean/std chỉ trên Training Set → Dùng mean/std đó để transform Validation và Test Set.</li>
        <li><strong>Duplicate samples:</strong> 1 ảnh xuất hiện cả trong train và test → model "thuộc bài" → accuracy cao giả.</li>
        <li><strong>Temporal leakage:</strong> Trong time series, nếu dùng dữ liệu tương lai để dự đoán quá khứ → leakage.</li>
      </ul>
    </div>
  </div>

  <h4>b) K-Fold Cross Validation</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Phương pháp:</strong> Chia dataset thành K phần bằng nhau (folds). Lần lượt dùng mỗi fold làm test, còn lại làm train. Lặp K lần → K kết quả → lấy trung bình.</p>
      <pre>
  Dataset chia 5 folds (K=5):
  
  Lần 1: [TEST] [Train] [Train] [Train] [Train]  → Acc = 85%
  Lần 2: [Train] [TEST] [Train] [Train] [Train]  → Acc = 87%
  Lần 3: [Train] [Train] [TEST] [Train] [Train]  → Acc = 84%
  Lần 4: [Train] [Train] [Train] [TEST] [Train]  → Acc = 86%
  Lần 5: [Train] [Train] [Train] [Train] [TEST]  → Acc = 88%
  
  Kết quả cuối: Mean Acc = 86% ± 1.4%
      </pre>
      <p><strong>Ưu điểm:</strong></p>
      <ul>
        <li>Sử dụng TOÀN BỘ dữ liệu cho cả training và testing (mỗi mẫu được test 1 lần)</li>
        <li>Kết quả ổn định hơn hold-out (ít phụ thuộc cách chia)</li>
        <li>Cho biết variance (mô hình ổn định không? ± bao nhiêu %)</li>
      </ul>
      <p><strong>Nhược điểm:</strong> Train K lần → tốn thời gian K lần. K=5 phổ biến, K=10 cho dataset nhỏ.</p>
    </div>
  </div>

  <h4>c) Stratified Split</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Vấn đề:</strong> Nếu chia ngẫu nhiên, có thể training set toàn chó, test set toàn mèo → bias!</p>
      <p><strong>Giải pháp:</strong> Stratified split đảm bảo tỷ lệ mỗi class <strong>giống nhau</strong> trong train/test.</p>
      <pre>
  Dataset: 700 chó + 300 mèo (tỷ lệ 7:3)
  
  Random split (có thể xảy ra):
    Train: 650 chó + 150 mèo (81% chó) ← LỆch!
    Test:   50 chó + 150 mèo (25% chó) ← LỆch!
  
  Stratified split (đảm bảo):
    Train: 560 chó + 240 mèo (70% chó) ← Đúng tỷ lệ!
    Test:  140 chó +  60 mèo (70% chó) ← Đúng tỷ lệ!
      </pre>
      <p><strong>Khi nào PHẢI dùng Stratified:</strong> Khi dataset imbalanced (mất cân bằng). VD: 95% email bình thường, 5% spam.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 6.2. BATCHING                               -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">view_module</span> 6.2. Batching - Chia dữ liệu thành lô nhỏ</h3>

  <p>Với dataset lớn (hàng triệu mẫu), không thể load toàn bộ vào RAM/GPU. Giải pháp: chia thành <strong>mini-batches</strong>.</p>

  <div class="definition-block">
    <span class="definition-term">Các khái niệm quan trọng</span>
    <ul>
      <li><strong>Batch Size:</strong> Số samples trong 1 batch. Thường: 32, 64, 128, 256.</li>
      <li><strong>Iteration (Step):</strong> 1 lần update weights = process 1 batch.</li>
      <li><strong>Epoch:</strong> 1 lượt đi qua TOÀN BỘ dataset = n_samples / batch_size iterations.</li>
    </ul>
  </div>

  <p><strong>Ví dụ tính toán:</strong></p>
  <table class="comparison-table">
    <thead>
      <tr><th>Thông số</th><th>Giá trị</th></tr>
    </thead>
    <tbody>
      <tr><td>Tổng số samples</td><td>10,000</td></tr>
      <tr><td>Batch size</td><td>32</td></tr>
      <tr><td>Iterations per epoch</td><td>10,000 / 32 = <strong>312.5 → 313</strong> iterations</td></tr>
      <tr><td>Số epochs training</td><td>100</td></tr>
      <tr><td>Tổng iterations</td><td>313 × 100 = <strong>31,300</strong> lần update weights</td></tr>
    </tbody>
  </table>

  <h4>So sánh các chiến lược batch:</h4>
  <table class="comparison-table">
    <thead>
      <tr><th>Chiến lược</th><th>Batch Size</th><th>Ưu điểm</th><th>Nhược điểm</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Batch GD</strong></td>
        <td>= N (toàn bộ)</td>
        <td>Gradient chính xác, hội tụ mượt</td>
        <td>Chậm, tốn RAM, dễ bị stuck</td>
      </tr>
      <tr>
        <td><strong>Stochastic GD</strong></td>
        <td>= 1</td>
        <td>Update nhanh, thoát local minima</td>
        <td>Gradient noisy, dao động mạnh</td>
      </tr>
      <tr>
        <td><strong>Mini-batch GD</strong></td>
        <td>16 ~ 256</td>
        <td>Cân bằng tốc độ + ổn định. Tận dụng GPU parallelism</td>
        <td>Cần chọn batch size phù hợp</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">tips_and_updates</span>
    <div class="callout-content">
      <span class="callout-title">Batch size ảnh hưởng gì?</span>
      <ul>
        <li><strong>Batch lớn (256, 512):</strong> Gradient ổn định, training nhanh (tận dụng GPU). Nhưng dễ overfit, hội tụ đến sharp minima (generalization kém).</li>
        <li><strong>Batch nhỏ (16, 32):</strong> Gradient noisy → regularization tự nhiên. Hội tụ đến flat minima (generalization tốt hơn). Nhưng training chậm hơn.</li>
        <li><strong>Quy tắc ngón cái:</strong> Bắt đầu với batch_size=32. Tăng nếu GPU đủ memory. Giảm nếu overfit.</li>
      </ul>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 6.3. SHUFFLING                              -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">shuffle</span> 6.3. Data Shuffling - Xáo trộn dữ liệu</h3>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">priority_high</span>
    <div class="callout-content">
      <span class="callout-title">Tại sao phải xáo trộn dữ liệu mỗi epoch?</span>
      <p>Nếu dữ liệu không được shuffle, model có thể học thứ tự thay vì nội dung.</p>
      <p><strong>Ví dụ:</strong> Dataset ảnh: 1000 ảnh chó → 1000 ảnh mèo (sắp theo loài).</p>
      <ul>
        <li>Batch 1-31: Toàn ảnh chó → model nghĩ "mọi thứ đều là chó"</li>
        <li>Batch 32-62: Toàn ảnh mèo → model quiz "mọi thứ đều là mèo"</li>
        <li>→ Model dao động điên rồ, không bao giờ hội tụ!</li>
      </ul>
      <p><strong>Sau khi shuffle:</strong> Mỗi batch có lẫn cả chó và mèo → gradient đại diện cho toàn bộ phân phối → training ổn định.</p>
    </div>
  </div>

  <p><strong>Quy tắc shuffle:</strong></p>
  <ul>
    <li><strong>Training data:</strong> Shuffle mỗi epoch (khác thứ tự mỗi lần).</li>
    <li><strong>Validation/Test data:</strong> KHÔNG cần shuffle (vì không training, thứ tự không ảnh hưởng).</li>
    <li><strong>Time Series:</strong> KHÔNG ĐƯỢC shuffle (thứ tự thời gian quan trọng).</li>
  </ul>

  <!-- ========================================= -->
  <!-- 6.4. DATA PIPELINE TỔNG HỢP                -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">account_tree</span> 6.4. Data Pipeline hoàn chỉnh (End-to-End)</h3>

  <p>Tổng hợp tất cả bước từ dữ liệu thô đến input cho Neural Network:</p>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Thu thập dữ liệu (Data Collection)</h4>
        <p>Từ database, API, CSV, web scraping, sensors, user input...</p>
        <p>Kết quả: Raw dataset (có thể lộn xộn, thiếu, sai)</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Làm sạch (Data Cleaning)</h4>
        <ul>
          <li>Xử lý giá trị thiếu (missing values): bỏ, điền mean/median/mode, dùng model dự đoán</li>
          <li>Xử lý duplicates: kiểm tra và loại bỏ bản ghi trùng</li>
          <li>Sửa lỗi format: VD "1,000" → 1000, "N/A" → NaN</li>
          <li>Xử lý outliers: Cắt (clip), biến đổi (log), hoặc giữ nguyên (nếu có ý nghĩa)</li>
        </ul>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Feature Engineering</h4>
        <ul>
          <li>Tạo features mới từ features cũ: VD price_per_sqm = price / area</li>
          <li>Binning: Tuổi → [Trẻ, Trung niên, Già]</li>
          <li>Interaction features: area × rooms</li>
          <li>Polynomial features: $x^2$, $x^3$</li>
        </ul>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Encoding</h4>
        <p>Chuyển categorical → numerical (Label, One-Hot, Embedding)</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>Chia dữ liệu (Split)</h4>
        <p>Train / Validation / Test (trước khi normalize!)</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">6</div>
      <div class="step-content">
        <h4>Normalization</h4>
        <p>Fit trên Train → Transform Train, Val, Test</p>
        <p><strong>QUAN TRỌNG:</strong> Chỉ tính mean/std/min/max trên TRAINING SET. Dùng giá trị đó để transform Val/Test.</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">7</div>
      <div class="step-content">
        <h4>Chuyển thành Tensors</h4>
        <p>Convert sang tensor format mà framework yêu cầu (torch.Tensor, tf.Tensor)</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">8</div>
      <div class="step-content">
        <h4>DataLoader (Batching + Shuffling)</h4>
        <p>Chia thành mini-batches, shuffle mỗi epoch (training), load vào GPU.</p>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <span class="material-symbols-outlined">code</span>
    <div class="callout-content">
      <span class="callout-title">Pipeline trong PyTorch (tham khảo)</span>
      <pre style="font-size: 12px;">
# 1. Load data
df = pd.read_csv("houses.csv")

# 2. Clean
df = df.dropna()

# 3. Feature engineering
df["price_per_m2"] = df["price"] / df["area"]

# 4. Encode
df = pd.get_dummies(df, columns=["location"])

# 5. Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y)

# 6. Normalize (fit on train only!)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)  # fit + transform
X_test = scaler.transform(X_test)         # transform only (dùng mean/std từ train)

# 7. Convert to tensors
X_train = torch.FloatTensor(X_train)
y_train = torch.FloatTensor(y_train)

# 8. DataLoader
train_dataset = TensorDataset(X_train, y_train)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
      </pre>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// DATA PIPELINE HOÀN CHỈNH - IMPLEMENT TRONG RUST
// =====================================================
//
// End-to-end pipeline:
// 1. Raw data → Clean
// 2. Feature Engineering
// 3. Encode
// 4. Split (Train/Test)
// 5. Normalize (fit on train, transform both)
// 6. Batch
// 7. Forward pass thử
//
// =====================================================

use std::collections::HashMap;

// =====================================================
// PHẦN 1: STRUCT CHO DATASET VÀ PIPELINE
// =====================================================

/// Một sample trong dataset
#[derive(Clone, Debug)]
struct Sample {
    features: Vec<f64>,
    label: f64,
}

/// Dataset = tập hợp samples
struct Dataset {
    samples: Vec<Sample>,
    feature_names: Vec<String>,
}

/// Scaler để normalize (lưu mean/std cho Z-Score)
struct ZScoreScaler {
    means: Vec<f64>,
    stds: Vec<f64>,
    fitted: bool,
}

// =====================================================
// PHẦN 2: IMPLEMENT METHODS
// =====================================================

impl ZScoreScaler {
    fn new() -> Self {
        ZScoreScaler {
            means: vec![],
            stds: vec![],
            fitted: false,
        }
    }
    
    /// FIT: Tính mean và std từ dữ liệu (CHỈ DÙNG TRAINING DATA)
    fn fit(&mut self, data: &[Vec<f64>]) {
        if data.is_empty() { return; }
        
        let n_features = data[0].len();
        let n_samples = data.len() as f64;
        
        self.means = vec![0.0; n_features];
        self.stds = vec![0.0; n_features];
        
        // Tính mean cho từng feature
        for sample in data {
            for j in 0..n_features {
                self.means[j] += sample[j];
            }
        }
        for j in 0..n_features {
            self.means[j] /= n_samples;
        }
        
        // Tính std cho từng feature
        for sample in data {
            for j in 0..n_features {
                let diff = sample[j] - self.means[j];
                self.stds[j] += diff * diff;
            }
        }
        for j in 0..n_features {
            self.stds[j] = (self.stds[j] / n_samples).sqrt();
            if self.stds[j] == 0.0 { self.stds[j] = 1.0; } // tránh chia 0
        }
        
        self.fitted = true;
    }
    
    /// TRANSFORM: Áp dụng normalization (dùng mean/std đã fit)
    fn transform(&self, data: &[Vec<f64>]) -> Vec<Vec<f64>> {
        assert!(self.fitted, "Phải fit() trước khi transform()!");
        
        data.iter().map(|sample| {
            sample.iter().enumerate().map(|(j, &x)| {
                (x - self.means[j]) / self.stds[j]
            }).collect()
        }).collect()
    }
}

/// Chia train/test theo tỷ lệ
fn train_test_split(
    features: &[Vec<f64>],
    labels: &[f64],
    test_ratio: f64
) -> (Vec<Vec<f64>>, Vec<f64>, Vec<Vec<f64>>, Vec<f64>) {
    let n = features.len();
    let test_size = (n as f64 * test_ratio) as usize;
    let train_size = n - test_size;
    
    // Lưu ý: trong thực tế phải shuffle trước khi split!
    // Ở đây để đơn giản ta split tuần tự
    let x_train = features[..train_size].to_vec();
    let y_train = labels[..train_size].to_vec();
    let x_test = features[train_size..].to_vec();
    let y_test = labels[train_size..].to_vec();
    
    (x_train, y_train, x_test, y_test)
}

/// Chia dataset thành batches
fn create_batches(features: &[Vec<f64>], labels: &[f64], batch_size: usize) 
    -> Vec<(Vec<Vec<f64>>, Vec<f64>)> 
{
    let n = features.len();
    let mut batches = Vec::new();
    
    let mut start = 0;
    while start < n {
        let end = std::cmp::min(start + batch_size, n);
        let batch_x = features[start..end].to_vec();
        let batch_y = labels[start..end].to_vec();
        batches.push((batch_x, batch_y));
        start = end;
    }
    
    batches
}

// =====================================================
// PHẦN 3: MAIN - DEMO PIPELINE ĐẦY ĐỦ
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║       DATA PIPELINE HOÀN CHỈNH - TỪ THÔ ĐẾN TENSOR           ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // BƯỚC 1: RAW DATA (Dự đoán giá nhà)
    // =========================================================
    println!("\\n=== BƯỚC 1: RAW DATA ===");
    
    // Features: [diện_tích, số_phòng, tuổi_nhà]
    let raw_features = vec![
        vec![50.0,  2.0,  5.0],
        vec![80.0,  3.0, 10.0],
        vec![100.0, 3.0,  2.0],
        vec![120.0, 4.0, 15.0],
        vec![150.0, 4.0,  8.0],
        vec![200.0, 5.0,  1.0],
        vec![250.0, 5.0, 20.0],
        vec![300.0, 6.0,  3.0],
        vec![80.0,  2.0, 12.0],
        vec![180.0, 4.0,  6.0],
    ];
    // Labels: Giá nhà (tỷ đồng)
    let raw_labels = vec![1.5, 2.4, 3.5, 3.2, 4.0, 7.0, 5.5, 9.0, 2.0, 5.5];
    
    println!("  {} mẫu, {} features/mẫu", raw_features.len(), raw_features[0].len());
    println!("  Features: [diện_tích, số_phòng, tuổi_nhà]");
    for (i, (f, l)) in raw_features.iter().zip(raw_labels.iter()).enumerate() {
        println!("    Mẫu {}: {:?} → {:.1} tỷ", i+1, f, l);
    }

    // =========================================================
    // BƯỚC 2: SPLIT TRAIN/TEST (80/20)
    // =========================================================
    println!("\\n=== BƯỚC 2: SPLIT (80% train, 20% test) ===");
    
    let (x_train, y_train, x_test, y_test) = 
        train_test_split(&raw_features, &raw_labels, 0.2);
    
    println!("  Training set: {} mẫu", x_train.len());
    println!("  Test set: {} mẫu", x_test.len());

    // =========================================================
    // BƯỚC 3: NORMALIZE (fit on train, transform both)
    // =========================================================
    println!("\\n=== BƯỚC 3: NORMALIZE (Z-Score) ===");
    
    let mut scaler = ZScoreScaler::new();
    
    // FIT chỉ trên training data!
    scaler.fit(&x_train);
    
    println!("  Fitted trên training data:");
    let names = vec!["diện_tích", "số_phòng", "tuổi_nhà"];
    for (i, name) in names.iter().enumerate() {
        println!("    {}: mean={:.2}, std={:.2}", name, scaler.means[i], scaler.stds[i]);
    }
    
    // TRANSFORM cả train và test (dùng mean/std từ train!)
    let x_train_norm = scaler.transform(&x_train);
    let x_test_norm = scaler.transform(&x_test);
    
    println!("\\n  Training data sau normalize:");
    for (i, sample) in x_train_norm.iter().enumerate() {
        println!("    Mẫu {}: [{:.3}, {:.3}, {:.3}]", 
            i+1, sample[0], sample[1], sample[2]);
    }
    
    println!("\\n  Test data sau normalize:");
    for (i, sample) in x_test_norm.iter().enumerate() {
        println!("    Mẫu {}: [{:.3}, {:.3}, {:.3}]", 
            i+1, sample[0], sample[1], sample[2]);
    }

    // =========================================================
    // BƯỚC 4: BATCHING
    // =========================================================
    println!("\\n=== BƯỚC 4: BATCHING (batch_size=3) ===");
    
    let batch_size = 3;
    let batches = create_batches(&x_train_norm, &y_train, batch_size);
    
    println!("  {} batches tạo từ {} training samples", batches.len(), x_train_norm.len());
    for (i, (bx, by)) in batches.iter().enumerate() {
        println!("\\n  Batch {} ({} samples):", i+1, bx.len());
        for (j, (x, y)) in bx.iter().zip(by.iter()).enumerate() {
            println!("    [{:.3}, {:.3}, {:.3}] → {:.1} tỷ",
                x[0], x[1], x[2], y);
        }
    }

    // =========================================================
    // BƯỚC 5: FORWARD PASS THỬ (1 layer, random weights)
    // =========================================================
    println!("\\n=== BƯỚC 5: THỬ FORWARD PASS VỚI BATCH ĐẦU TIÊN ===");
    
    // Random weights cho 3 inputs → 1 output
    let weights = vec![0.5, 0.3, -0.2]; // 3 weights
    let bias = 0.1;
    
    let first_batch = &batches[0];
    println!("  Weights: {:?}, Bias: {}", weights, bias);
    println!("  Kết quả Forward Pass:");
    
    for (i, (x, y_true)) in first_batch.0.iter().zip(first_batch.1.iter()).enumerate() {
        // z = w₁x₁ + w₂x₂ + w₃x₃ + b
        let z: f64 = x.iter()
            .zip(weights.iter())
            .map(|(xi, wi)| xi * wi)
            .sum::<f64>() + bias;
        
        // ReLU activation
        let y_pred = if z > 0.0 { z } else { 0.0 };
        let error = y_true - y_pred;
        
        println!("    Mẫu {}: z={:.3}, relu(z)={:.3}, y_true={:.1}, error={:.3}",
            i+1, z, y_pred, y_true, error);
    }
    
    println!("\\n=== PIPELINE HOÀN TẤT ===");
    println!("  Raw data → Split → Normalize → Batch → Forward Pass → Done!");
    println!("  Bước tiếp theo: BACKWARD PASS (tính gradient) → UPDATE WEIGHTS");
    println!("  → Lặp lại nhiều epochs cho đến khi loss giảm về gần 0");
}`
  },
  // ==========================================================
  // LESSON 7: FEATURE ENGINEERING & FEATURE SELECTION
  // ==========================================================
  {
    id: 'ch21_01_07',
    title: '7. Feature Engineering & Selection - Nghệ thuật tạo và chọn đặc trưng',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">auto_fix_high</span> 7. Feature Engineering & Selection</h2>

  <p><strong>Feature Engineering</strong> là quá trình tạo, biến đổi, và chọn lọc features (đặc trưng) từ dữ liệu thô để cải thiện hiệu suất mô hình. Đây là bước <strong>quan trọng nhất</strong> trong Machine Learning truyền thống (trước Deep Learning).</p>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">format_quote</span>
    <div class="callout-content">
      <span class="callout-title">"Coming up with features is difficult, time-consuming, requires expert knowledge. Applied machine learning is basically feature engineering." — Andrew Ng</span>
      <p>Trích lời Andrew Ng (Stanford, Coursera): Tạo features chiếm 80% thời gian làm ML.</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 7.1. FEATURE ENGINEERING                    -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">construction</span> 7.1. Feature Engineering - Tạo features mới</h3>

  <h4>a) Interaction Features (Tương tác giữa features)</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Ý tưởng:</strong> Kết hợp 2+ features để tạo feature mới chứa thông tin mà features gốc riêng lẻ không có.</p>
      <p><strong>Ví dụ dự đoán giá nhà:</strong></p>
      <table class="comparison-table">
        <thead><tr><th>Feature gốc</th><th>Feature mới</th><th>Ý nghĩa</th></tr></thead>
        <tbody>
          <tr><td>diện_tích, giá</td><td><strong>giá_per_m²</strong> = giá / diện_tích</td><td>Đơn giá theo diện tích</td></tr>
          <tr><td>diện_tích, số_phòng</td><td><strong>m²_per_phòng</strong> = diện_tích / số_phòng</td><td>Diện tích trung bình mỗi phòng</td></tr>
          <tr><td>chiều_dài, chiều_rộng</td><td><strong>diện_tích</strong> = dài × rộng</td><td>Diện tích tính từ kích thước</td></tr>
          <tr><td>vĩ_độ, kinh_độ</td><td><strong>khoảng_cách_trung_tâm</strong></td><td>Khoảng cách đến trung tâm thành phố</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <h4>b) Polynomial Features (Đặc trưng đa thức)</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Ý tưởng:</strong> Thêm $x^2, x^3, x_1 \\times x_2$ để model học được quan hệ phi tuyến.</p>
      <p><strong>Ví dụ:</strong></p>
      <p>Gốc: $[x_1, x_2]$</p>
      <p>Polynomial degree 2: $[x_1, x_2, x_1^2, x_1 x_2, x_2^2]$</p>
      <p>Polynomial degree 3: $[x_1, x_2, x_1^2, x_1 x_2, x_2^2, x_1^3, x_1^2 x_2, x_1 x_2^2, x_2^3]$</p>
      <p><strong>Ưu điểm:</strong> Linear model + Polynomial features ≈ Polynomial Regression → học được đường cong.</p>
      <p><strong>Nhược diểm:</strong> Số features tăng cực nhanh. 10 features degree 3 → 286 features! → Overfitting.</p>
      <p><strong>Lưu ý:</strong> Với Neural Networks (đã phi tuyến sẵn), thường KHÔNG cần polynomial features.</p>
    </div>
  </div>

  <h4>c) Binning / Discretization (Phân nhóm)</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Ý tưởng:</strong> Chuyển số liên tục thành nhóm rời rạc.</p>
      <table class="comparison-table">
        <thead><tr><th>Tuổi gốc</th><th>Nhóm tuổi</th><th>Encoded</th></tr></thead>
        <tbody>
          <tr><td>5, 12, 17</td><td>Trẻ em (0-17)</td><td>0</td></tr>
          <tr><td>22, 30, 45</td><td>Trưởng thành (18-59)</td><td>1</td></tr>
          <tr><td>65, 78, 90</td><td>Cao tuổi (60+)</td><td>2</td></tr>
        </tbody>
      </table>
      <p><strong>Khi nào dùng:</strong> Khi quan hệ không tuyến tính theo từng khoảng. VD: Bảo hiểm y tế thay đổi theo nhóm tuổi, không theo từng tuổi.</p>
    </div>
  </div>

  <h4>d) Date/Time Features</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Trích xuất từ timestamp:</strong></p>
      <table class="comparison-table">
        <thead><tr><th>Timestamp gốc</th><th>Features trích xuất</th></tr></thead>
        <tbody>
          <tr>
            <td>2024-03-15 14:30:00</td>
            <td>
              <ul>
                <li>year = 2024</li>
                <li>month = 3</li>
                <li>day = 15</li>
                <li>hour = 14</li>
                <li>day_of_week = 5 (Thứ 6)</li>
                <li>is_weekend = 0</li>
                <li>quarter = 1</li>
                <li>is_month_start = 0</li>
                <li>is_month_end = 0</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <p><strong>Cyclical encoding</strong> cho hour, day_of_week, month:</p>
      <p>$sin\\_hour = \\sin(2\\pi \\times hour / 24)$</p>
      <p>$cos\\_hour = \\cos(2\\pi \\times hour / 24)$</p>
      <p>Tại sao? Vì hour=23 và hour=0 gần nhau (đều nửa đêm), nhưng Label Encoding cho 23 và 0 cách xa nhau.</p>
    </div>
  </div>

  <h4>e) Text Features</h4>
  <div class="features-grid">
    <div class="feature-card">
      <p><strong>Các phương pháp tạo features từ text:</strong></p>
      <table class="comparison-table">
        <thead><tr><th>Phương pháp</th><th>Mô tả</th><th>Kết quả</th></tr></thead>
        <tbody>
          <tr><td><strong>Bag of Words</strong></td><td>Đếm tần số mỗi từ</td><td>Vector sparse, bỏ qua thứ tự</td></tr>
          <tr><td><strong>TF-IDF</strong></td><td>Tần số × nghịch tần số trong corpus</td><td>Highlight từ quan trọng trong document</td></tr>
          <tr><td><strong>Word2Vec</strong></td><td>Embedding dense 100-300d</td><td>Từ tương tự → vector gần nhau</td></tr>
          <tr><td><strong>BERT/GPT</strong></td><td>Contextual embedding</td><td>"bank" trong "river bank" ≠ "bank account"</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 7.2. FEATURE SELECTION                      -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">filter_list</span> 7.2. Feature Selection - Chọn features quan trọng</h3>

  <p><strong>Tại sao cần chọn features?</strong></p>
  <ul>
    <li><strong>Curse of Dimensionality:</strong> Quá nhiều features → cần nhiều data hơn → dễ overfit</li>
    <li><strong>Noise:</strong> Features vô nghĩa thêm noise → giảm accuracy</li>
    <li><strong>Tốc độ:</strong> Ít features → training nhanh hơn</li>
    <li><strong>Interpretability:</strong> Ít features → dễ hiểu model hơn</li>
  </ul>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">filter_1</span></div>
      <h4>Filter Methods</h4>
      <p>Đánh giá features ĐỘC LẬP với model.</p>
      <ul>
        <li><strong>Correlation:</strong> Loại features tương quan cao (> 0.9) với nhau (redundant)</li>
        <li><strong>Variance Threshold:</strong> Loại features có variance thấp (ít thay đổi → ít thông tin)</li>
        <li><strong>Chi-squared test:</strong> Đo mối quan hệ giữa feature và label</li>
      </ul>
      <p><em>Nhanh, nhưng bỏ qua tương tác giữa features.</em></p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">filter_2</span></div>
      <h4>Wrapper Methods</h4>
      <p>Thử kết hợp features và đánh giá bằng model.</p>
      <ul>
        <li><strong>Forward Selection:</strong> Bắt đầu 0 features → thêm dần feature tốt nhất</li>
        <li><strong>Backward Elimination:</strong> Bắt đầu tất cả → loại dần feature kém nhất</li>
        <li><strong>Recursive Feature Elimination (RFE):</strong> Train model → loại feature ít quan trọng nhất → lặp</li>
      </ul>
      <p><em>Chính xác hơn filter, nhưng tốn thời gian gấp N lần.</em></p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">filter_3</span></div>
      <h4>Embedded Methods</h4>
      <p>Feature selection tích hợp trong quá trình training.</p>
      <ul>
        <li><strong>L1 Regularization (Lasso):</strong> Đẩy weights vô nghĩa về 0 → tự động loại features</li>
        <li><strong>Tree-based Importance:</strong> Random Forest cho biết feature nào quan trọng nhất</li>
      </ul>
      <p><em>Cân bằng tốt giữa tốc độ và accuracy.</em></p>
    </div>
  </div>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">lightbulb</span>
    <div class="callout-content">
      <span class="callout-title">Neural Networks và Feature Engineering</span>
      <p>Một trong những lý do Deep Learning thành công vượt bậc: <strong>Neural Networks TỰ ĐỘNG học features tốt hơn con người tạo</strong> (representation learning).</p>
      <ul>
        <li><strong>ML truyền thống:</strong> Con người tạo features thủ công → tốn thời gian, cần domain knowledge</li>
        <li><strong>Deep Learning:</strong> Đưa raw data vào → mạng TỰ học features → từ cạnh, góc → hình dạng → đối tượng</li>
      </ul>
      <p>Tuy nhiên, thực tế cho thấy: <strong>Feature engineering + Neural Network vẫn tốt hơn Neural Network alone</strong> trong nhiều bài toán tabular (dữ liệu bảng).</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 7.3. DATA AUGMENTATION                      -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">add_photo_alternate</span> 7.3. Data Augmentation (Tăng cường dữ liệu)</h3>

  <p>Khi dataset nhỏ, ta có thể <strong>tạo thêm dữ liệu mới</strong> từ dữ liệu có sẵn bằng cách biến đổi.</p>

  <h4>Augmentation cho ảnh:</h4>
  <table class="comparison-table">
    <thead><tr><th>Kỹ thuật</th><th>Mô tả</th><th>Ví dụ</th></tr></thead>
    <tbody>
      <tr><td><strong>Horizontal Flip</strong></td><td>Lật ngang ảnh</td><td>Ảnh chó nhìn sang phải → nhìn sang trái</td></tr>
      <tr><td><strong>Rotation</strong></td><td>Xoay ±15°</td><td>Ảnh chó nghiêng nhẹ</td></tr>
      <tr><td><strong>Crop</strong></td><td>Cắt ngẫu nhiên 80-100% diện tích</td><td>Zoom vào một phần ảnh</td></tr>
      <tr><td><strong>Color Jitter</strong></td><td>Thay đổi brightness, contrast, saturation</td><td>Ảnh sáng hơn/tối hơn</td></tr>
      <tr><td><strong>Cutout/Erasing</strong></td><td>Xóa ô vuông ngẫu nhiên</td><td>Che mất 1 phần ảnh → model phải học nhìn phần còn lại</td></tr>
      <tr><td><strong>Mixup</strong></td><td>Trộn 2 ảnh với tỷ lệ λ</td><td>0.7×ảnh_chó + 0.3×ảnh_mèo = ảnh blend, label = 0.7 chó + 0.3 mèo</td></tr>
    </tbody>
  </table>

  <h4>Augmentation cho text:</h4>
  <table class="comparison-table">
    <thead><tr><th>Kỹ thuật</th><th>Ví dụ</th></tr></thead>
    <tbody>
      <tr><td><strong>Synonym Replacement</strong></td><td>"Hôm nay trời đẹp" → "Ngày nay trời tươi"</td></tr>
      <tr><td><strong>Random Insertion</strong></td><td>"Tôi ăn cơm" → "Tôi thường ăn cơm"</td></tr>
      <tr><td><strong>Random Deletion</strong></td><td>"Tôi rất thích ăn cơm" → "Tôi thích ăn cơm"</td></tr>
      <tr><td><strong>Back Translation</strong></td><td>"Hello world" → dịch sang tiếng Pháp → dịch lại tiếng Anh</td></tr>
    </tbody>
  </table>

  <div class="callout callout-info">
    <span class="material-symbols-outlined">rule</span>
    <div class="callout-content">
      <span class="callout-title">Quy tắc Augmentation</span>
      <ol>
        <li>CHỈ áp dụng cho <strong>Training data</strong>. KHÔNG augment Validation/Test.</li>
        <li>Augmentation phải <strong>giữ nguyên label</strong>. Lật ảnh chó → vẫn là chó.</li>
        <li>Augmentation phải <strong>hợp lý</strong>. Xoay 180° ảnh chữ "6" → thành "9" → SAI label!</li>
      </ol>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// FEATURE ENGINEERING & DATA AUGMENTATION - DEMO RUST
// =====================================================
//
// 1. Tạo interaction features
// 2. Polynomial features
// 3. Binning
// 4. Correlation analysis
// 5. Simple data augmentation
//
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║       FEATURE ENGINEERING - NGHỆ THUẬT TẠO ĐẶC TRƯNG         ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // RAW DATA: Nhà ở HCM
    // =========================================================
    println!("\\n=== RAW DATA ===");
    
    let dien_tich = vec![50.0, 80.0, 120.0, 200.0, 300.0];
    let so_phong = vec![2.0, 3.0, 4.0, 5.0, 6.0];
    let tuoi_nha = vec![20.0, 10.0, 5.0, 1.0, 15.0];
    let tang = vec![3.0, 5.0, 10.0, 15.0, 4.0];
    let gia = vec![1.5, 2.5, 4.0, 8.0, 5.0]; // tỷ đồng
    
    println!("  {:>3} │ {:>7} │ {:>6} │ {:>5} │ {:>4} │ {:>5}",
        "STT", "DT(m²)", "Phòng", "Tuổi", "Tầng", "Giá");
    println!("  ────┼─────────┼────────┼───────┼──────┼──────");
    for i in 0..dien_tich.len() {
        println!("  {:>3} │ {:>7.0} │ {:>6.0} │ {:>5.0} │ {:>4.0} │ {:>5.1}",
            i+1, dien_tich[i], so_phong[i], tuoi_nha[i], tang[i], gia[i]);
    }

    // =========================================================
    // 1. INTERACTION FEATURES
    // =========================================================
    println!("\\n=== 1. INTERACTION FEATURES ===");
    
    println!("  Tạo features mới từ kết hợp features cũ:\\n");
    
    // Feature mới 1: Diện tích per phòng
    let dt_per_phong: Vec<f64> = dien_tich.iter()
        .zip(so_phong.iter())
        .map(|(d, p)| d / p)
        .collect();
    
    // Feature mới 2: Giá per m²
    let gia_per_m2: Vec<f64> = gia.iter()
        .zip(dien_tich.iter())
        .map(|(g, d)| g / d * 1000.0) // triệu/m²
        .collect();
    
    // Feature mới 3: Tổng diện tích sàn = diện tích × số tầng
    let tong_san: Vec<f64> = dien_tich.iter()
        .zip(tang.iter())
        .map(|(d, t)| d * t)
        .collect();
    
    println!("  {:>3} │ {:>10} │ {:>12} │ {:>10}",
        "STT", "m²/phòng", "giá(tr)/m²", "tổng sàn");
    println!("  ────┼────────────┼──────────────┼────────────");
    for i in 0..dien_tich.len() {
        println!("  {:>3} │ {:>10.1} │ {:>12.2} │ {:>10.0}",
            i+1, dt_per_phong[i], gia_per_m2[i], tong_san[i]);
    }

    // =========================================================
    // 2. POLYNOMIAL FEATURES
    // =========================================================
    println!("\\n=== 2. POLYNOMIAL FEATURES (degree 2) ===");
    println!("  Gốc: [x₁ = diện_tích, x₂ = số_phòng]");
    println!("  Poly: [x₁, x₂, x₁², x₁×x₂, x₂²]\\n");
    
    println!("  {:>3} │ {:>5} │ {:>5} │ {:>8} │ {:>7} │ {:>5}",
        "STT", "x₁", "x₂", "x₁²", "x₁×x₂", "x₂²");
    println!("  ────┼───────┼───────┼──────────┼─────────┼───────");
    for i in 0..dien_tich.len() {
        let x1 = dien_tich[i];
        let x2 = so_phong[i];
        println!("  {:>3} │ {:>5.0} │ {:>5.0} │ {:>8.0} │ {:>7.0} │ {:>5.0}",
            i+1, x1, x2, x1*x1, x1*x2, x2*x2);
    }
    println!("\\n  2 features → 5 features (tăng 2.5 lần)");
    println!("  Degree 3 sẽ tạo 9 features, Degree 4 tạo 14 features...");
    println!("  → Cẩn thận Curse of Dimensionality!");

    // =========================================================
    // 3. BINNING (DISCRETIZATION)
    // =========================================================
    println!("\\n=== 3. BINNING (PHÂN NHÓM) ===");
    println!("  Tuổi nhà → Nhóm\\n");
    
    for i in 0..tuoi_nha.len() {
        let tuoi = tuoi_nha[i];
        let nhom = if tuoi <= 3.0 {
            "Mới (0-3)"
        } else if tuoi <= 10.0 {
            "Trung (4-10)"
        } else {
            "Cũ (11+)"
        };
        
        let bin_code = if tuoi <= 3.0 { 0 } else if tuoi <= 10.0 { 1 } else { 2 };
        println!("  Nhà {}: tuổi = {:>2.0} → {} → code = {}",
            i+1, tuoi, nhom, bin_code);
    }

    // =========================================================
    // 4. CORRELATION ANALYSIS
    // =========================================================
    println!("\\n=== 4. CORRELATION (TƯƠNG QUAN) ===");
    
    // Tính correlation đơn giản giữa diện tích và giá
    let n = dien_tich.len() as f64;
    let mean_dt: f64 = dien_tich.iter().sum::<f64>() / n;
    let mean_gia: f64 = gia.iter().sum::<f64>() / n;
    
    let mut cov = 0.0;
    let mut var_dt = 0.0;
    let mut var_gia = 0.0;
    
    for i in 0..dien_tich.len() {
        let dx = dien_tich[i] - mean_dt;
        let dy = gia[i] - mean_gia;
        cov += dx * dy;
        var_dt += dx * dx;
        var_gia += dy * dy;
    }
    
    let correlation = cov / (var_dt.sqrt() * var_gia.sqrt());
    
    println!("  Correlation(diện_tích, giá) = {:.4}", correlation);
    println!("  Ý nghĩa: {}", 
        if correlation > 0.8 { "Tương quan MẠNH dương (+)" }
        else if correlation > 0.5 { "Tương quan TRUNG BÌNH dương" }
        else if correlation > 0.0 { "Tương quan YẾU dương" }
        else { "Tương quan âm" });
    
    // Tính correlation tuổi nhà vs giá
    let mean_tuoi: f64 = tuoi_nha.iter().sum::<f64>() / n;
    let mut cov2 = 0.0;
    let mut var_tuoi = 0.0;
    
    for i in 0..tuoi_nha.len() {
        let dx = tuoi_nha[i] - mean_tuoi;
        let dy = gia[i] - mean_gia;
        cov2 += dx * dy;
        var_tuoi += dx * dx;
    }
    
    let corr_tuoi = cov2 / (var_tuoi.sqrt() * var_gia.sqrt());
    println!("  Correlation(tuổi_nhà, giá) = {:.4}", corr_tuoi);
    println!("  Ý nghĩa: {}", 
        if corr_tuoi < -0.5 { "Nhà càng cũ → giá càng THẤP (tương quan âm mạnh)" }
        else if corr_tuoi < 0.0 { "Tương quan âm yếu" }
        else { "Tương quan dương" });

    // =========================================================
    // 5. DATA AUGMENTATION (Ví dụ đơn giản)
    // =========================================================
    println!("\\n=== 5. DATA AUGMENTATION (VÍ DỤ ĐƠN GIẢN) ===");
    println!("  Thêm noise nhỏ vào data để tạo samples mới:\\n");
    
    println!("  Gốc: diện_tích = {:?}", dien_tich);
    
    // Thêm Gaussian noise ±5%
    let augmented: Vec<Vec<f64>> = (0..3).map(|aug_idx| {
        dien_tich.iter().map(|&x| {
            // Giả lập noise (deterministic cho demo)
            let noise_factor = 1.0 + (aug_idx as f64 - 1.0) * 0.05;
            (x * noise_factor * 10.0).round() / 10.0
        }).collect()
    }).collect();
    
    for (i, aug) in augmented.iter().enumerate() {
        println!("  Aug {}: {:?}", i+1, aug);
    }
    
    println!("\\n  5 samples gốc → 5 + 15 = 20 samples (×4 data!)");
    println!("  ⚠️ CHỈ augment Training data, KHÔNG augment Test data!");

    println!("\\n=== TỔNG KẾT Feature Engineering ===");
    println!("  1. Interaction: Kết hợp features (×, ÷, −)");
    println!("  2. Polynomial: Thêm x², x³ cho quan hệ phi tuyến");
    println!("  3. Binning: Nhóm số liên tục thành danh mục");
    println!("  4. Correlation: Loại features thừa (>0.9 correlation)");
    println!("  5. Augmentation: Tạo data mới từ data cũ");
}`
  },
  // ==========================================================
  // LESSON 8: FULL FORWARD PASS END-TO-END
  // ==========================================================
  {
    id: 'ch21_01_08',
    title: '8. Forward Pass End-to-End - Từ dữ liệu thô đến dự đoán',
    duration: '90 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">play_arrow</span> 8. Forward Pass End-to-End - Hành trình dữ liệu qua Neural Network</h2>

  <p>Bây giờ chúng ta sẽ kết hợp TẤT CẢ kiến thức từ bài 1-7 để theo dõi một ví dụ hoàn chỉnh: dữ liệu đi vào Neural Network như thế nào và cho ra kết quả gì.</p>

  <!-- ========================================= -->
  <!-- 8.1. BÀI TOÁN                               -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">task_alt</span> 8.1. Bài toán: Phân loại email Spam/Không Spam</h3>

  <div class="definition-block">
    <span class="definition-term">Mô tả bài toán</span>
    <p><strong>Input:</strong> Một email với các đặc trưng đã trích xuất.</p>
    <p><strong>Output:</strong> Email này là Spam (1) hay Không Spam (0)?</p>
    <p><strong>Loại bài toán:</strong> Binary Classification (Supervised Learning)</p>
  </div>

  <h4>Dữ liệu mẫu (đã feature engineering):</h4>
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Feature</th>
        <th>Mô tả</th>
        <th>Kiểu</th>
        <th>Range gốc</th>
        <th>Email mẫu</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>$x_1$: num_links</td><td>Số hyperlinks trong email</td><td>Số nguyên</td><td>0 ~ 50</td><td><strong>8</strong></td></tr>
      <tr><td>$x_2$: num_caps</td><td>% chữ viết HOA</td><td>Số thực</td><td>0 ~ 100</td><td><strong>45.2</strong></td></tr>
      <tr><td>$x_3$: has_attachment</td><td>Có file đính kèm?</td><td>Nhị phân</td><td>0, 1</td><td><strong>1</strong></td></tr>
      <tr><td>$x_4$: word_count</td><td>Số từ trong email</td><td>Số nguyên</td><td>1 ~ 5000</td><td><strong>147</strong></td></tr>
      <tr><td>$x_5$: sender_known</td><td>Sender có trong contact?</td><td>Nhị phân</td><td>0, 1</td><td><strong>0</strong></td></tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 8.2. KIẾN TRÚC MẠNG                        -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">schema</span> 8.2. Kiến trúc mạng Neural Network</h3>

  <div class="image-showcase">
    <img src="/images/ch21/spam_nn_architecture.png" alt="Kiến trúc mạng Neural Network phân loại Spam" />
    <div class="image-caption">Kiến trúc mạng: Input (5) → Hidden 1 (4, ReLU) → Hidden 2 (3, ReLU) → Output (1, Sigmoid)</div>
  </div>

  <p><strong>Tóm tắt kiến trúc:</strong></p>
  <table class="comparison-table">
    <thead><tr><th>Layer</th><th>Inputs</th><th>Outputs</th><th>Params (W+b)</th><th>Activation</th></tr></thead>
    <tbody>
      <tr><td>Input</td><td>-</td><td>5</td><td>0</td><td>-</td></tr>
      <tr><td>Hidden 1</td><td>5</td><td>4</td><td>5×4 + 4 = <strong>24</strong></td><td>ReLU</td></tr>
      <tr><td>Hidden 2</td><td>4</td><td>3</td><td>4×3 + 3 = <strong>15</strong></td><td>ReLU</td></tr>
      <tr><td>Output</td><td>3</td><td>1</td><td>3×1 + 1 = <strong>4</strong></td><td>Sigmoid</td></tr>
    </tbody>
    <tfoot>
      <tr><td colspan="3"><strong>Tổng parameters:</strong></td><td><strong>43</strong></td><td></td></tr>
    </tfoot>
  </table>

  <!-- ========================================= -->
  <!-- 8.3. BƯỚC 1: NORMALIZE INPUT               -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">tune</span> 8.3. Bước 1: Normalize Input</h3>

  <p>Raw input: $X_{raw} = [8, 45.2, 1, 147, 0]$</p>
  <p>Giả sử đã tính mean và std từ training set:</p>

  <table class="comparison-table">
    <thead><tr><th>Feature</th><th>Raw</th><th>Mean (μ)</th><th>Std (σ)</th><th>Z-Score</th><th>Tính toán</th></tr></thead>
    <tbody>
      <tr><td>num_links</td><td>8</td><td>3.5</td><td>4.2</td><td><strong>1.071</strong></td><td>(8 - 3.5) / 4.2</td></tr>
      <tr><td>num_caps</td><td>45.2</td><td>20.0</td><td>15.3</td><td><strong>1.647</strong></td><td>(45.2 - 20) / 15.3</td></tr>
      <tr><td>has_attachment</td><td>1</td><td>0.3</td><td>0.46</td><td><strong>1.522</strong></td><td>(1 - 0.3) / 0.46</td></tr>
      <tr><td>word_count</td><td>147</td><td>250</td><td>180</td><td><strong>-0.572</strong></td><td>(147 - 250) / 180</td></tr>
      <tr><td>sender_known</td><td>0</td><td>0.6</td><td>0.49</td><td><strong>-1.224</strong></td><td>(0 - 0.6) / 0.49</td></tr>
    </tbody>
  </table>

  <p>$X_{norm} = [1.071, 1.647, 1.522, -0.572, -1.224]$</p>

  <!-- ========================================= -->
  <!-- 8.4. BƯỚC 2: HIDDEN LAYER 1                -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">layers</span> 8.4. Bước 2: Hidden Layer 1 (5 → 4, ReLU)</h3>

  <p>Giả sử weights $W_1$ shape (5, 4) và bias $b_1$ shape (4,):</p>

  <div class="formula-block my-3 p-3 bg-blue-50 border-blue-200">
    <p><strong>Phép tính:</strong></p>
    <p class="font-mono">$z_1 = X_{norm} \\cdot W_1 + b_1$</p>
    <p>Mỗi neuron trong hidden layer 1 tính:</p>
    <ul>
      <li>$z_1[0] = x_1 \\times w_{1,0} + x_2 \\times w_{2,0} + x_3 \\times w_{3,0} + x_4 \\times w_{4,0} + x_5 \\times w_{5,0} + b_0$</li>
      <li>$z_1[1] = x_1 \\times w_{1,1} + x_2 \\times w_{2,1} + ... + b_1$</li>
      <li>$z_1[2] = ...$</li>
      <li>$z_1[3] = ...$</li>
    </ul>
  </div>

  <p>Giả sử sau tính toán: $z_1 = [2.35, -0.87, 1.42, 0.15]$</p>
  <p><strong>Áp dụng ReLU:</strong> $h_1 = max(0, z_1) = [2.35, 0, 1.42, 0.15]$</p>
  <p>Neuron thứ 2 ($z = -0.87 < 0$) bị "tắt" (Dead neuron trong ReLU).</p>

  <!-- ========================================= -->
  <!-- 8.5. BƯỚC 3: HIDDEN LAYER 2                -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">layers</span> 8.5. Bước 3: Hidden Layer 2 (4 → 3, ReLU)</h3>

  <p>Input: $h_1 = [2.35, 0, 1.42, 0.15]$ (output từ layer 1)</p>
  <p>$z_2 = h_1 \\cdot W_2 + b_2$</p>
  <p>Giả sử: $z_2 = [1.89, -0.32, 0.78]$</p>
  <p><strong>ReLU:</strong> $h_2 = [1.89, 0, 0.78]$</p>

  <!-- ========================================= -->
  <!-- 8.6. BƯỚC 4: OUTPUT LAYER                   -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">logout</span> 8.6. Bước 4: Output Layer (3 → 1, Sigmoid)</h3>

  <p>Input: $h_2 = [1.89, 0, 0.78]$</p>
  <p>$z_{out} = h_2 \\cdot W_3 + b_3 = 1.89 \\times 0.6 + 0 \\times (-0.3) + 0.78 \\times 0.4 + 0.1$</p>
  <p>$z_{out} = 1.134 + 0 + 0.312 + 0.1 = 1.546$</p>
  
  <p><strong>Áp dụng Sigmoid:</strong></p>
  <p class="font-mono">$\\hat{y} = \\sigma(z_{out}) = \\frac{1}{1 + e^{-1.546}} = \\frac{1}{1 + 0.2133} = \\frac{1}{1.2133} = 0.824$</p>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">gavel</span>
    <div class="callout-content">
      <span class="callout-title">Kết quả dự đoán</span>
      <p>$\\hat{y} = 0.824$ → Mô hình dự đoán email này có xác suất <strong>82.4% là SPAM</strong>.</p>
      <p>Thường dùng threshold=0.5: $\\hat{y} > 0.5$ → dự đoán SPAM (1).</p>
      <p>→ Dự đoán: <strong>SPAM</strong> ✓</p>
    </div>
  </div>

  <!-- ========================================= -->
  <!-- 8.7. BƯỚC 5: TÍNH LOSS                      -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">monitoring</span> 8.7. Bước 5: Tính Loss</h3>

  <p>Giả sử label thực ($y_{true}$) = 1 (email này thực sự là spam).</p>
  
  <div class="formula-block my-3 p-3 bg-red-50 border-red-200">
    <p><strong>Binary Cross-Entropy Loss:</strong></p>
    <p class="font-mono">$L = -[y \\log(\\hat{y}) + (1-y) \\log(1-\\hat{y})]$</p>
    <p class="font-mono mt-2">$L = -[1 \\times \\log(0.824) + 0 \\times \\log(1-0.824)]$</p>
    <p class="font-mono">$L = -\\log(0.824) = -(-0.1936) = 0.1936$</p>
    <p class="mt-2"><strong>Ý nghĩa:</strong> Loss = 0.1936 (khá nhỏ, dự đoán gần đúng). Nếu dự đoán hoàn hảo ($\\hat{y}=1$), Loss = 0. Nếu dự đoán hoàn toàn sai ($\\hat{y}=0$), Loss → ∞.</p>
  </div>

  <!-- ========================================= -->
  <!-- 8.8. TỔNG KẾT TOÀN BỘ                      -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">summarize</span> 8.8. Tổng kết toàn bộ quá trình</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">1</div>
      <div class="step-content">
        <h4>Raw Data</h4>
        <p>$[8, 45.2, 1, 147, 0]$ → Các số thô, scale khác nhau</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">2</div>
      <div class="step-content">
        <h4>Normalize (Z-Score)</h4>
        <p>$[1.071, 1.647, 1.522, -0.572, -1.224]$ → Cùng scale, mean≈0, std≈1</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">3</div>
      <div class="step-content">
        <h4>Hidden Layer 1 (ReLU)</h4>
        <p>$[2.35, 0, 1.42, 0.15]$ → Trích xuất features level 1</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">4</div>
      <div class="step-content">
        <h4>Hidden Layer 2 (ReLU)</h4>
        <p>$[1.89, 0, 0.78]$ → Trích xuất features level 2 (trừu tượng hơn)</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">5</div>
      <div class="step-content">
        <h4>Output (Sigmoid)</h4>
        <p>$0.824$ → Xác suất spam = 82.4% → Dự đoán: SPAM</p>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">6</div>
      <div class="step-content">
        <h4>Loss (BCE)</h4>
        <p>$0.1936$ → Sai số nhỏ → Dự đoán khá tốt</p>
      </div>
    </div>
  </div>

  <div class="callout callout-info">
    <span class="material-symbols-outlined">next_plan</span>
    <div class="callout-content">
      <span class="callout-title">Tiếp theo: Backward Pass (Backpropagation)</span>
      <p>Forward Pass chỉ là NỬA BÀI. Nó cho ra dự đoán và loss. Để model "HỌC", cần Backward Pass:</p>
      <ol>
        <li>Tính gradient: $\\frac{\\partial L}{\\partial W}$ (Loss thay đổi bao nhiêu khi W thay đổi?)</li>
        <li>Update weights: $W \\leftarrow W - \\eta \\times \\frac{\\partial L}{\\partial W}$</li>
        <li>Lặp lại Forward → Backward → Update hàng ngàn/triệu lần</li>
      </ol>
      <p>→ Chi tiết ở các bài tiếp theo: Gradient Descent (21.5), Backpropagation (21.6)</p>
    </div>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// FULL FORWARD PASS - END TO END IMPLEMENTATION
// =====================================================
//
// Implement Neural Network 3 layers hoàn chỉnh từ zero:
// Input (5) → Hidden1 (4, ReLU) → Hidden2 (3, ReLU) → Output (1, Sigmoid)
//
// Bao gồm:
// 1. Normalize input
// 2. Forward pass qua 3 layers
// 3. Tính loss
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║    FULL FORWARD PASS - NEURAL NETWORK TỪ ZERO                 ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    
    // =========================================================
    // BƯỚC 1: RAW INPUT - Email cần phân loại
    // =========================================================
    println!("\\n=== BƯỚC 1: RAW INPUT ===");
    let raw_input = vec![8.0, 45.2, 1.0, 147.0, 0.0];
    let feature_names = vec!["num_links", "pct_caps", "has_attach", "word_count", "sender_known"];
    
    println!("  Email features (raw):");
    for (name, val) in feature_names.iter().zip(raw_input.iter()) {
        println!("    {:>14}: {:.1}", name, val);
    }
    
    // Label thực tế
    let y_true = 1.0; // Spam
    println!("  Label thực tế: {} (Spam)", y_true);

    // =========================================================
    // BƯỚC 2: NORMALIZE (Z-Score)
    // =========================================================
    println!("\\n=== BƯỚC 2: NORMALIZE (Z-Score) ===");
    
    // Mean và Std đã tính từ Training Set
    let means = vec![3.5, 20.0, 0.3, 250.0, 0.6];
    let stds = vec![4.2, 15.3, 0.46, 180.0, 0.49];
    
    let x: Vec<f64> = raw_input.iter()
        .zip(means.iter())
        .zip(stds.iter())
        .map(|((val, mean), std)| (val - mean) / std)
        .collect();
    
    println!("  Normalized input:");
    for (name, val) in feature_names.iter().zip(x.iter()) {
        println!("    {:>14}: {:.4}", name, val);
    }

    // =========================================================
    // BƯỚC 3: DEFINE NETWORK WEIGHTS (giả lập đã train xong)
    // =========================================================
    println!("\\n=== BƯỚC 3: NETWORK ARCHITECTURE ===");
    println!("  Input(5) → Hidden1(4,ReLU) → Hidden2(3,ReLU) → Output(1,Sigmoid)");
    
    // Layer 1: 5 inputs → 4 outputs
    // W1 shape: (5, 4) - mỗi cột = weights cho 1 neuron hidden
    let w1 = vec![
        vec![ 0.35,  0.12, -0.45,  0.28],  // weights từ x1
        vec![ 0.42, -0.33,  0.18,  0.51],  // weights từ x2
        vec![-0.15,  0.67,  0.29, -0.38],  // weights từ x3
        vec![ 0.22, -0.11,  0.44,  0.16],  // weights từ x4
        vec![-0.55,  0.39, -0.22,  0.33],  // weights từ x5
    ];
    let b1 = vec![0.1, -0.2, 0.15, 0.05];
    
    // Layer 2: 4 inputs → 3 outputs
    let w2 = vec![
        vec![ 0.45, -0.28,  0.33],
        vec![-0.12,  0.56, -0.41],
        vec![ 0.38,  0.22,  0.15],
        vec![-0.33,  0.44,  0.28],
    ];
    let b2 = vec![0.05, -0.1, 0.08];
    
    // Layer 3 (Output): 3 inputs → 1 output
    let w3 = vec![
        vec![0.6],
        vec![-0.3],
        vec![0.4],
    ];
    let b3 = vec![0.1];
    
    // Đếm tổng params
    let total_params = 5*4 + 4 + 4*3 + 3 + 3*1 + 1;
    println!("  Tổng parameters: {}", total_params);

    // =========================================================
    // BƯỚC 4: FORWARD PASS - LAYER 1
    // =========================================================
    println!("\\n=== BƯỚC 4: HIDDEN LAYER 1 ===");
    
    // z1 = X · W1 + b1
    let mut z1 = vec![0.0; 4];
    for j in 0..4 {
        z1[j] = b1[j];
        for i in 0..5 {
            z1[j] += x[i] * w1[i][j];
        }
    }
    
    println!("  z1 (weighted sum):");
    for (i, z) in z1.iter().enumerate() {
        println!("    h{}: z = {:.4}", i+1, z);
    }
    
    // ReLU activation
    let h1: Vec<f64> = z1.iter().map(|&z| if z > 0.0 { z } else { 0.0 }).collect();
    
    println!("  h1 (after ReLU):");
    for (i, h) in h1.iter().enumerate() {
        let status = if *h == 0.0 { " ← DEAD (ReLU killed)" } else { "" };
        println!("    h{}: {:.4}{}", i+1, h, status);
    }

    // =========================================================
    // BƯỚC 5: FORWARD PASS - LAYER 2
    // =========================================================
    println!("\\n=== BƯỚC 5: HIDDEN LAYER 2 ===");
    
    let mut z2 = vec![0.0; 3];
    for j in 0..3 {
        z2[j] = b2[j];
        for i in 0..4 {
            z2[j] += h1[i] * w2[i][j];
        }
    }
    
    let h2: Vec<f64> = z2.iter().map(|&z| if z > 0.0 { z } else { 0.0 }).collect();
    
    println!("  z2: [{:.4}, {:.4}, {:.4}]", z2[0], z2[1], z2[2]);
    println!("  h2 (ReLU): [{:.4}, {:.4}, {:.4}]", h2[0], h2[1], h2[2]);

    // =========================================================
    // BƯỚC 6: FORWARD PASS - OUTPUT LAYER (Sigmoid)
    // =========================================================
    println!("\\n=== BƯỚC 6: OUTPUT LAYER (Sigmoid) ===");
    
    let mut z_out = b3[0];
    for i in 0..3 {
        z_out += h2[i] * w3[i][0];
    }
    
    // Sigmoid: σ(z) = 1 / (1 + e^(-z))
    let y_pred = 1.0 / (1.0 + (-z_out).exp());
    
    println!("  z_out = {:.4}", z_out);
    println!("  σ(z_out) = 1 / (1 + e^({:.4})) = {:.4}", -z_out, y_pred);
    println!("  ŷ = {:.4} ({:.1}% xác suất là Spam)", y_pred, y_pred * 100.0);

    // =========================================================
    // BƯỚC 7: DỰ ĐOÁN VÀ LOSS
    // =========================================================
    println!("\\n=== BƯỚC 7: KẾT QUẢ ===");
    
    let threshold = 0.5;
    let prediction = if y_pred > threshold { 1 } else { 0 };
    let label = if prediction == 1 { "SPAM" } else { "KHÔNG SPAM" };
    
    println!("  Dự đoán: {} (threshold={})", label, threshold);
    println!("  Thực tế: {}", if y_true == 1.0 { "SPAM" } else { "KHÔNG SPAM" });
    println!("  Đúng/Sai: {}", if prediction as f64 == y_true { "ĐÚNG ✓" } else { "SAI ✗" });
    
    // Binary Cross-Entropy Loss
    let epsilon = 1e-7; // tránh log(0)
    let y_pred_clip = y_pred.max(epsilon).min(1.0 - epsilon);
    let bce_loss = -(y_true * y_pred_clip.ln() + (1.0 - y_true) * (1.0 - y_pred_clip).ln());
    
    println!("\\n  Binary Cross-Entropy Loss:");
    println!("    L = -[y×ln(ŷ) + (1-y)×ln(1-ŷ)]");
    println!("    L = -[{:.0} × ln({:.4}) + {:.0} × ln({:.4})]",
        y_true, y_pred_clip, 1.0 - y_true, 1.0 - y_pred_clip);
    println!("    L = {:.4}", bce_loss);
    
    println!("\\n  Ý nghĩa Loss:");
    println!("    L ≈ 0: Dự đoán gần hoàn hảo");
    println!("    L ≈ 0.5-1.0: Dự đoán trung bình");
    println!("    L > 2: Dự đoán tệ");
    println!("    L → ∞: Dự đoán hoàn toàn ngược (0 vs 1)");

    // =========================================================
    // BƯỚC 8: TỔNG KẾT
    // =========================================================
    println!("\\n╔══════════════════════════════════════════════════════════════╗");
    println!("║                    TỔNG KẾT FORWARD PASS                       ║");
    println!("╠══════════════════════════════════════════════════════════════╣");
    println!("║  Raw: [8, 45.2, 1, 147, 0]                                     ║");
    println!("║  ↓ Normalize (Z-Score)                                         ║");
    println!("║  [{:.3}, {:.3}, {:.3}, {:.3}, {:.3}]           ║", x[0], x[1], x[2], x[3], x[4]);
    println!("║  ↓ Layer 1 (5→4, ReLU)                                         ║");
    println!("║  [{:.3}, {:.3}, {:.3}, {:.3}]                              ║", h1[0], h1[1], h1[2], h1[3]);
    println!("║  ↓ Layer 2 (4→3, ReLU)                                         ║");
    println!("║  [{:.3}, {:.3}, {:.3}]                                      ║", h2[0], h2[1], h2[2]);
    println!("║  ↓ Output (3→1, Sigmoid)                                       ║");
    println!("║  ŷ = {:.4} → {} (Loss = {:.4})                      ║", y_pred, label, bce_loss);
    println!("║                                                                ║");
    println!("║  Tiếp theo: Backward Pass → tính gradient → update W, b        ║");
    println!("║  → Lặp nhiều lần cho đến khi Loss giảm tối thiểu              ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
}`
  },
  // ==========================================================
  // LESSON 8B: OVERFITTING VS UNDERFITTING - VẤN ĐỀ MUÔN THUỞ
  // ==========================================================
  {
    id: 'ch21_01_08b',
    title: '8B. Overfitting vs Underfitting - Vấn đề muôn thuở của ML',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">balance</span> 8B. Overfitting vs Underfitting</h2>

  <p>Đây là vấn đề QUAN TRỌNG NHẤT mà mọi ML practitioner đều gặp phải. Một model có thể thất bại theo 2 cách: quá đơn giản (underfitting) hoặc quá phức tạp (overfitting).</p>

  <!-- ========================================= -->
  <!-- UNDERFITTING                                -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">trending_flat</span> Underfitting (Dưới khớp / Học kém)</h3>

  <div class="definition-block">
    <span class="definition-term">Định nghĩa</span>
    <p>Model <strong>quá đơn giản</strong> để nắm bắt patterns trong dữ liệu. Giống học sinh không nắm được bài vì nội dung quá khó hoặc không đủ thời gian học.</p>
  </div>

  <p><strong>Biểu hiện:</strong></p>
  <ul>
    <li>Training accuracy THẤP (model không học được gì từ training data)</li>
    <li>Validation accuracy THẤP (hiển nhiên, vì đã không học được)</li>
    <li>Loss cao cả trên train lẫn validation</li>
  </ul>

  <p><strong>Nguyên nhân:</strong></p>
  <ul>
    <li>Model quá ít neurons/layers (capacity thấp)</li>
    <li>Training quá ít epochs (chưa kịp học)</li>
    <li>Learning rate quá cao (nhảy qua nhảy lại, không hội tụ)</li>
    <li>Features không đủ thông tin (cần feature engineering tốt hơn)</li>
    <li>Regularization quá mạnh (model bị ép quá đơn giản)</li>
  </ul>

  <p><strong>Cách khắc phục:</strong></p>
  <ul>
    <li>Tăng complexity: thêm layers, thêm neurons</li>
    <li>Train lâu hơn (nhiều epochs hơn)</li>
    <li>Giảm learning rate</li>
    <li>Thêm features (feature engineering)</li>
    <li>Giảm regularization</li>
  </ul>

  <!-- ========================================= -->
  <!-- OVERFITTING                                 -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">trending_up</span> Overfitting (Quá khớp / Học vẹt)</h3>

  <div class="definition-block">
    <span class="definition-term">Định nghĩa</span>
    <p>Model <strong>học thuộc lòng</strong> training data, bao gồm cả noise và chi tiết không quan trọng. Giống học sinh thuộc đáp án nhưng không hiểu bài - đổi đề là không làm được.</p>
  </div>

  <p><strong>Biểu hiện:</strong></p>
  <ul>
    <li>Training accuracy RẤT CAO (99%+) nhưng Validation accuracy THẤP HƠN NHIỀU</li>
    <li>Gap lớn giữa train loss và validation loss</li>
    <li>Validation loss bắt đầu TĂNG trong khi train loss vẫn tiếp tục GIẢM</li>
  </ul>

  <table class="comparison-table">
    <thead><tr><th>Epoch</th><th>Train Loss</th><th>Val Loss</th><th>Nhận xét</th></tr></thead>
    <tbody>
      <tr><td>1</td><td>2.5</td><td>2.6</td><td>Bình thường - cả 2 đều giảm</td></tr>
      <tr><td>10</td><td>0.8</td><td>0.9</td><td>Tốt - cả 2 giảm song song</td></tr>
      <tr><td>50</td><td>0.2</td><td>0.5</td><td>⚠️ Gap bắt đầu lớn</td></tr>
      <tr><td>100</td><td>0.05</td><td>0.8</td><td>🚨 OVERFITTING! Val loss tăng lại!</td></tr>
      <tr><td>200</td><td>0.01</td><td>1.2</td><td>🚨 Nghiêm trọng! Nên dừng ở epoch 50</td></tr>
    </tbody>
  </table>

  <p><strong>Nguyên nhân:</strong></p>
  <ul>
    <li>Model quá phức tạp (quá nhiều parameters so với lượng data)</li>
    <li>Training quá nhiều epochs</li>
    <li>Dataset quá nhỏ (model "thuộc" hết được)</li>
    <li>Thiếu regularization</li>
    <li>Data có nhiều noise → model học cả noise</li>
  </ul>

  <p><strong>Cách khắc phục:</strong></p>
  <ul>
    <li><strong>Early Stopping:</strong> Dừng training khi val loss bắt đầu tăng</li>
    <li><strong>Dropout:</strong> Tắt random 20-50% neurons mỗi forward pass → model không phụ thuộc 1 neuron</li>
    <li><strong>L1/L2 Regularization:</strong> Phạt weights quá lớn → giữ model đơn giản</li>
    <li><strong>Data Augmentation:</strong> Tạo thêm data → model có nhiều data hơn để học</li>
    <li><strong>Giảm model size:</strong> Bớt layers, bớt neurons</li>
    <li><strong>Batch Normalization:</strong> Regularization effect nhẹ</li>
  </ul>

  <!-- ========================================= -->
  <!-- BIAS-VARIANCE TRADEOFF                      -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">balance</span> Bias-Variance Tradeoff</h3>

  <div class="callout callout-important">
    <span class="material-symbols-outlined">priority_high</span>
    <div class="callout-content">
      <span class="callout-title">Bias-Variance Tradeoff</span>
      <p><strong>Bias:</strong> Sai số do model quá đơn giản → bỏ qua patterns quan trọng → UNDERFITTING.</p>
      <p><strong>Variance:</strong> Sai số do model quá nhạy cảm với training data cụ thể → OVerfitting.</p>
      <p><strong>Tradeoff:</strong> Giảm Bias → tăng Variance (và ngược lại). Mục tiêu: tìm điểm CÂN BẰNG.</p>
    </div>
  </div>

  <div class="image-showcase">
    <img src="/images/ch21/bias_variance_tradeoff.png" alt="Bias-Variance Tradeoff: Underfitting vs Good Fit vs Overfitting" />
    <div class="image-caption">Từ trái sang: Underfitting (High Bias) → Good Fit → Overfitting (High Variance)</div>
  </div>

  <!-- ========================================= -->
  <!-- SO SÁNH                                     -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">compare_arrows</span> So sánh tổng hợp</h3>

  <table class="comparison-table">
    <thead>
      <tr><th>Tiêu chí</th><th>Underfitting</th><th>Good Fit</th><th>Overfitting</th></tr>
    </thead>
    <tbody>
      <tr><td>Train Accuracy</td><td>Thấp</td><td>Cao</td><td>Rất cao (99%+)</td></tr>
      <tr><td>Val Accuracy</td><td>Thấp</td><td>Cao (gần train)</td><td>Thấp (xa train)</td></tr>
      <tr><td>Train-Val Gap</td><td>Nhỏ (cả 2 tệ)</td><td>Nhỏ (cả 2 tốt)</td><td>Lớn</td></tr>
      <tr><td>Model Complexity</td><td>Quá thấp</td><td>Vừa đủ</td><td>Quá cao</td></tr>
      <tr><td>Bias</td><td>Cao</td><td>Thấp</td><td>Thấp</td></tr>
      <tr><td>Variance</td><td>Thấp</td><td>Thấp</td><td>Cao</td></tr>
      <tr><td>Giải pháp</td><td>Tăng complexity</td><td>Giữ nguyên!</td><td>Regularization, more data</td></tr>
    </tbody>
  </table>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">psychology</span></div>
    <h3>Chiến lược thực hành</h3>
    <ol>
      <li><strong>Bắt đầu với model đơn giản</strong> → kiểm tra underfitting.</li>
      <li><strong>Tăng complexity dần</strong> → cho đến khi train accuracy đủ cao.</li>
      <li><strong>Nếu thấy overfitting</strong> (val loss tăng) → thêm Dropout, Early Stopping, Data Augmentation.</li>
      <li><strong>Luôn theo dõi val loss</strong> song song với train loss. Val loss là "kim chỉ nam".</li>
    </ol>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// OVERFITTING vs UNDERFITTING - DEMO TRỰC QUAN
// =====================================================
//
// Simulate training process và theo dõi:
// - Training loss qua từng epoch
// - "Validation loss" (giả lập)
// - Phát hiện overfitting
//
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║   OVERFITTING vs UNDERFITTING - SIMULATION                     ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    
    // Simulate training process
    println!("\\n=== SIMULATION: TRAINING 50 EPOCHS ===");
    println!("  {:>5} │ {:>10} │ {:>10} │ {:>5} │ {:>15}",
        "Epoch", "Train Loss", "Val Loss", "Gap", "Trạng thái");
    println!("  ──────┼────────────┼────────────┼───────┼─────────────────");
    
    let mut best_val_loss = f64::MAX;
    let mut best_epoch = 0;
    let mut patience_counter = 0;
    let patience = 5; // Early stopping patience
    
    for epoch in 1..=50 {
        // Simulate: train loss giảm dần
        let train_loss = 2.5 * (-0.08 * epoch as f64).exp() + 0.05;
        
        // Simulate: val loss giảm rồi tăng lại (overfitting)
        let val_loss = if epoch <= 20 {
            2.5 * (-0.06 * epoch as f64).exp() + 0.3
        } else {
            0.4 + 0.03 * (epoch as f64 - 20.0) // bắt đầu tăng!
        };
        
        let gap = val_loss - train_loss;
        
        let status = if epoch <= 5 {
            "Đang học..."
        } else if gap < 0.3 {
            "Tốt ✓"
        } else if gap < 0.5 {
            "⚠️ Gap tăng"
        } else {
            "🚨 OVERFITTING!"
        };
        
        // Early stopping check
        if val_loss < best_val_loss {
            best_val_loss = val_loss;
            best_epoch = epoch;
            patience_counter = 0;
        } else {
            patience_counter += 1;
        }
        
        // In mỗi 5 epochs + epoch quan trọng
        if epoch % 5 == 0 || epoch == 1 || epoch == best_epoch || patience_counter == patience {
            println!("  {:>5} │ {:>10.4} │ {:>10.4} │ {:.3} │ {}",
                epoch, train_loss, val_loss, gap, status);
        }
        
        if patience_counter >= patience && epoch > 25 {
            println!("\\n  ⛔ EARLY STOPPING tại epoch {}!", epoch);
            println!("  Best validation loss: {:.4} tại epoch {}", best_val_loss, best_epoch);
            break;
        }
    }
    
    println!("\\n=== PHÂN TÍCH ===");
    println!("  Epoch 1-20: Cả train và val loss đều giảm → Model đang HỌC");
    println!("  Epoch 20+: Train loss tiếp tục giảm, val loss TĂNG LẠI");
    println!("  → Model bắt đầu THUỘC LÒNG training data (overfitting)!");
    println!("  → Nên dùng model tại epoch {} (val loss thấp nhất)", best_epoch);
    
    println!("\\n=== GIẢI PHÁP ===");
    println!("  1. Early Stopping: Dừng khi val loss không giảm {} epochs liên tiếp", patience);
    println!("  2. Dropout: Tắt random neurons → mỗi forward pass khác nhau");
    println!("  3. L2 Regularization: Thêm penalty ||W||² vào loss");
    println!("  4. Data Augmentation: Tạo thêm training data");
    println!("  5. Reduce model size: Bớt layers/neurons nếu quá phức tạp");
}`
  },
  // ==========================================================
  // LESSON 9: THUẬT NGỮ CỐT LÕI & TÓM TẮT TOÀN DIỆN
  // ==========================================================
  {
    id: 'ch21_01_09',
    title: '9. Thuật ngữ cốt lõi & Tóm tắt toàn diện',
    duration: '60 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2><span class="material-symbols-outlined">menu_book</span> 9. Thuật ngữ cốt lõi & Tóm tắt toàn diện</h2>

  <p>Bài cuối này tổng hợp toàn bộ thuật ngữ và khái niệm đã học, giúp bạn có cái nhìn hệ thống và tra cứu nhanh.</p>

  <!-- ========================================= -->
  <!-- 9.1. BẢNG THUẬT NGỮ A-Z                     -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">sort_by_alpha</span> 9.1. Bảng thuật ngữ A-Z</h3>

  <table class="comparison-table">
    <thead>
      <tr><th>Thuật ngữ</th><th>Tiếng Việt</th><th>Ký hiệu</th><th>Giải thích</th></tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Activation Function</strong></td>
        <td>Hàm kích hoạt</td>
        <td>$f(z)$</td>
        <td>Hàm phi tuyến áp dụng lên weighted sum. Quyết định neuron có "bắn" hay không. Các loại: Sigmoid, Tanh, ReLU, Softmax.</td>
      </tr>
      <tr>
        <td><strong>Backpropagation</strong></td>
        <td>Lan truyền ngược</td>
        <td>-</td>
        <td>Thuật toán tính gradient hiệu quả bằng chain rule. Tính $\\partial L / \\partial W$ cho mọi layer từ output lùi về input.</td>
      </tr>
      <tr>
        <td><strong>Batch</strong></td>
        <td>Lô dữ liệu</td>
        <td>-</td>
        <td>Nhóm samples được xử lý cùng lúc. Batch size = số samples/batch. Thường: 32, 64, 128.</td>
      </tr>
      <tr>
        <td><strong>Batch Normalization</strong></td>
        <td>Chuẩn hóa theo batch</td>
        <td>-</td>
        <td>Normalize output mỗi layer theo statistics của mini-batch. Giúp training nhanh và ổn định hơn.</td>
      </tr>
      <tr>
        <td><strong>Bias</strong></td>
        <td>Độ lệch</td>
        <td>$b$</td>
        <td>Hằng số cộng thêm vào weighted sum. Cho phép dịch chuyển decision boundary. Mỗi neuron có 1 bias.</td>
      </tr>
      <tr>
        <td><strong>Binary Cross-Entropy</strong></td>
        <td>Entropy chéo nhị phân</td>
        <td>BCE</td>
        <td>Loss function cho binary classification. $L = -[y\\log\\hat{y} + (1-y)\\log(1-\\hat{y})]$</td>
      </tr>
      <tr>
        <td><strong>Classification</strong></td>
        <td>Phân loại</td>
        <td>-</td>
        <td>Bài toán dự đoán loại rời rạc (Spam/Không Spam, Chó/Mèo). Output là xác suất thuộc mỗi class.</td>
      </tr>
      <tr>
        <td><strong>CNN</strong></td>
        <td>Mạng tích chập</td>
        <td>-</td>
        <td>Convolutional Neural Network - kiến trúc chuyên cho xử lý ảnh. Dùng convolution filters trượt qua ảnh.</td>
      </tr>
      <tr>
        <td><strong>Cross-Validation</strong></td>
        <td>Kiểm định chéo</td>
        <td>K-Fold</td>
        <td>Chia data thành K phần, lần lượt dùng mỗi phần làm test. Đánh giá model ổn định hơn hold-out split.</td>
      </tr>
      <tr>
        <td><strong>Data Augmentation</strong></td>
        <td>Tăng cường dữ liệu</td>
        <td>-</td>
        <td>Tạo data mới từ data cũ bằng biến đổi (flip, rotate, crop ảnh). Chỉ cho training set.</td>
      </tr>
      <tr>
        <td><strong>Data Leakage</strong></td>
        <td>Rò rỉ dữ liệu</td>
        <td>-</td>
        <td>Khi thông tin từ test set rò rỉ vào training → accuracy cao giả. Lỗi nghiêm trọng nhất trong ML.</td>
      </tr>
      <tr>
        <td><strong>Deep Learning</strong></td>
        <td>Học sâu</td>
        <td>DL</td>
        <td>Nhánh ML dùng Neural Networks nhiều layers (deep). Tự học features từ raw data.</td>
      </tr>
      <tr>
        <td><strong>Dot Product</strong></td>
        <td>Tích vô hướng</td>
        <td>$a \\cdot b$</td>
        <td>Nhân từng cặp phần tử rồi cộng: $\\sum a_i b_i$. Phép tính cốt lõi của mỗi neuron.</td>
      </tr>
      <tr>
        <td><strong>Embedding</strong></td>
        <td>Nhúng</td>
        <td>-</td>
        <td>Biểu diễn danh mục/từ bằng vector dense (dày đặc), giá trị được model tự học. Nền tảng NLP.</td>
      </tr>
      <tr>
        <td><strong>Epoch</strong></td>
        <td>Kỷ nguyên học</td>
        <td>-</td>
        <td>1 lượt đi qua TOÀN BỘ training set. Training thường chạy 10-1000 epochs.</td>
      </tr>
      <tr>
        <td><strong>Feature</strong></td>
        <td>Đặc trưng</td>
        <td>$x_i$</td>
        <td>Một thuộc tính/cột của dữ liệu. VD: diện tích, tuổi, pixel. Đầu vào cho model.</td>
      </tr>
      <tr>
        <td><strong>Feature Engineering</strong></td>
        <td>Kỹ thuật tạo đặc trưng</td>
        <td>-</td>
        <td>Quá trình tạo, biến đổi, chọn lọc features để cải thiện model. Interaction, Polynomial, Binning...</td>
      </tr>
      <tr>
        <td><strong>Forward Pass</strong></td>
        <td>Lan truyền xuôi</td>
        <td>-</td>
        <td>Quá trình tính output từ input: $X \\rightarrow z_1 \\rightarrow h_1 \\rightarrow z_2 \\rightarrow ... \\rightarrow \\hat{y}$</td>
      </tr>
      <tr>
        <td><strong>Gradient</strong></td>
        <td>Đạo hàm/Gradient</td>
        <td>$\\nabla$</td>
        <td>Đạo hàm riêng của Loss theo mỗi parameter. Chỉ hướng tăng nhanh nhất của Loss.</td>
      </tr>
      <tr>
        <td><strong>Gradient Descent</strong></td>
        <td>Hạ gradient</td>
        <td>GD</td>
        <td>Thuật toán tối ưu: $W = W - \\eta \\nabla L$. Đi ngược hướng gradient để giảm loss.</td>
      </tr>
      <tr>
        <td><strong>Hidden Layer</strong></td>
        <td>Lớp ẩn</td>
        <td>-</td>
        <td>Layer giữa Input và Output. Trích xuất features ở nhiều mức trừu tượng. "Deep" = nhiều hidden layers.</td>
      </tr>
      <tr>
        <td><strong>Hyperparameter</strong></td>
        <td>Siêu tham số</td>
        <td>-</td>
        <td>Thông số do CON NGƯỜI chọn trước khi training: learning rate, batch size, số layers, số neurons/layer.</td>
      </tr>
      <tr>
        <td><strong>Input Layer</strong></td>
        <td>Lớp đầu vào</td>
        <td>-</td>
        <td>Layer đầu tiên, nhận raw/normalized data. Số neurons = số features.</td>
      </tr>
      <tr>
        <td><strong>Label</strong></td>
        <td>Nhãn</td>
        <td>$y$</td>
        <td>Đáp án/giá trị đúng trong Supervised Learning. VD: ảnh này là "Chó", giá nhà là 5 tỷ.</td>
      </tr>
      <tr>
        <td><strong>Learning Rate</strong></td>
        <td>Tốc độ học</td>
        <td>$\\eta$</td>
        <td>Bước nhảy mỗi lần update weights. Lớn → học nhanh, dao động. Nhỏ → ổn định, chậm. Thường: 0.001~0.01.</td>
      </tr>
      <tr>
        <td><strong>Linear</strong></td>
        <td>Tuyến tính</td>
        <td>-</td>
        <td>Quan hệ đường thẳng: $y = wx + b$. Perceptron đơn lớp chỉ học được linear boundaries.</td>
      </tr>
      <tr>
        <td><strong>Loss Function</strong></td>
        <td>Hàm mất mát</td>
        <td>$L$</td>
        <td>Đo khoảng cách giữa dự đoán ($\\hat{y}$) và thực tế ($y$). Mục tiêu: giảm Loss tối thiểu.</td>
      </tr>
      <tr>
        <td><strong>Matrix</strong></td>
        <td>Ma trận</td>
        <td>$M$</td>
        <td>Tensor rank 2 (bảng 2 chiều). Shape (rows, cols). Dùng chứa weight matrix.</td>
      </tr>
      <tr>
        <td><strong>Min-Max Scaling</strong></td>
        <td>Chuẩn hóa tối thiểu-tối đa</td>
        <td>-</td>
        <td>Scale data về [0, 1]: $(X - X_{min}) / (X_{max} - X_{min})$</td>
      </tr>
      <tr>
        <td><strong>MLP</strong></td>
        <td>Perceptron nhiều lớp</td>
        <td>-</td>
        <td>Multi-Layer Perceptron. Neural Network cơ bản: Input → Hidden(s) → Output. Giải được XOR.</td>
      </tr>
      <tr>
        <td><strong>MSE</strong></td>
        <td>Sai số bình phương trung bình</td>
        <td>-</td>
        <td>Mean Squared Error: $\\frac{1}{n}\\sum(y - \\hat{y})^2$. Loss cho Regression.</td>
      </tr>
      <tr>
        <td><strong>Neuron</strong></td>
        <td>Nơ-ron</td>
        <td>-</td>
        <td>Đơn vị tính toán: nhận inputs, nhân weights, cộng bias, qua activation. Lấy cảm hứng từ não bộ.</td>
      </tr>
      <tr>
        <td><strong>Non-linear</strong></td>
        <td>Phi tuyến</td>
        <td>-</td>
        <td>Quan hệ KHÔNG phải đường thẳng. Activation functions tạo phi tuyến → NN học được bài toán phức tạp.</td>
      </tr>
      <tr>
        <td><strong>Normalization</strong></td>
        <td>Chuẩn hóa</td>
        <td>-</td>
        <td>Scale features về cùng range. LUÔN normalize trước khi đưa vào NN. Min-Max hoặc Z-Score.</td>
      </tr>
      <tr>
        <td><strong>One-Hot Encoding</strong></td>
        <td>Mã hóa nhị phân</td>
        <td>-</td>
        <td>N danh mục → N cột nhị phân. Mỗi danh mục = vector có đúng 1 phần tử = 1.</td>
      </tr>
      <tr>
        <td><strong>Output Layer</strong></td>
        <td>Lớp đầu ra</td>
        <td>-</td>
        <td>Layer cuối, cho ra dự đoán. Activation: Sigmoid (binary), Softmax (multi-class), Linear (regression).</td>
      </tr>
      <tr>
        <td><strong>Overfitting</strong></td>
        <td>Quá khớp / Học vẹt</td>
        <td>-</td>
        <td>Model học thuộc training data (loss train rất thấp) nhưng test trên data mới tệ.</td>
      </tr>
      <tr>
        <td><strong>Parameter</strong></td>
        <td>Tham số</td>
        <td>$W, b$</td>
        <td>Giá trị MÁY TỰ HỌC: weights và biases. Khác với hyperparameter (do con người chọn).</td>
      </tr>
      <tr>
        <td><strong>Perceptron</strong></td>
        <td>Perceptron</td>
        <td>-</td>
        <td>Neuron nhân tạo đầu tiên (Rosenblatt, 1958). Single layer, chỉ giải được linearly separable.</td>
      </tr>
      <tr>
        <td><strong>Rank</strong></td>
        <td>Hạng của Tensor</td>
        <td>-</td>
        <td>Số chiều/axes. 0=scalar, 1=vector, 2=matrix, 3=3D tensor, 4=batch ảnh...</td>
      </tr>
      <tr>
        <td><strong>Regression</strong></td>
        <td>Hồi quy</td>
        <td>-</td>
        <td>Bài toán dự đoán giá trị liên tục. VD: dự đoán giá nhà, nhiệt độ.</td>
      </tr>
      <tr>
        <td><strong>ReLU</strong></td>
        <td>Đơn vị tuyến tính chỉnh lưu</td>
        <td>$max(0,z)$</td>
        <td>Rectified Linear Unit. Activation phổ biến nhất: z>0 giữ nguyên, z≤0 → 0. Nhanh, hiệu quả.</td>
      </tr>
      <tr>
        <td><strong>Reshape</strong></td>
        <td>Thay đổi hình dạng</td>
        <td>-</td>
        <td>Thay đổi shape tensor mà giữ nguyên data. Tổng phần tử phải bằng nhau.</td>
      </tr>
      <tr>
        <td><strong>Scalar</strong></td>
        <td>Vô hướng</td>
        <td>-</td>
        <td>Tensor rank 0 = 1 số duy nhất. VD: loss=0.5, learning_rate=0.01.</td>
      </tr>
      <tr>
        <td><strong>Shape</strong></td>
        <td>Hình dạng Tensor</td>
        <td>-</td>
        <td>Tuple kích thước mỗi chiều. VD: (32, 3, 224, 224) = 32 ảnh RGB 224×224.</td>
      </tr>
      <tr>
        <td><strong>Shuffle</strong></td>
        <td>Xáo trộn</td>
        <td>-</td>
        <td>Xáo trộn thứ tự data mỗi epoch. Ngăn model học thứ tự thay vì nội dung.</td>
      </tr>
      <tr>
        <td><strong>Sigmoid</strong></td>
        <td>Sigmoid</td>
        <td>$\\sigma(z)$</td>
        <td>$1/(1+e^{-z})$. Ép output về (0,1). Dùng cho binary classification output layer.</td>
      </tr>
      <tr>
        <td><strong>Softmax</strong></td>
        <td>Softmax</td>
        <td>-</td>
        <td>$e^{z_i} / \\sum e^{z_j}$. Tạo phân phối xác suất (tổng = 1). Dùng cho multi-class output.</td>
      </tr>
      <tr>
        <td><strong>Supervised Learning</strong></td>
        <td>Học có giám sát</td>
        <td>-</td>
        <td>Có data + label. Model học mapping input→output. VD: ảnh → "chó", nhà → giá.</td>
      </tr>
      <tr>
        <td><strong>Tensor</strong></td>
        <td>Tensor</td>
        <td>-</td>
        <td>Cấu trúc dữ liệu đa chiều. Generalization: scalar→vector→matrix→3D→...→nD.</td>
      </tr>
      <tr>
        <td><strong>Training</strong></td>
        <td>Huấn luyện</td>
        <td>-</td>
        <td>Quá trình điều chỉnh W, b để giảm Loss. Forward → Loss → Backward → Update → Lặp.</td>
      </tr>
      <tr>
        <td><strong>Underfitting</strong></td>
        <td>Dưới khớp / Học kém</td>
        <td>-</td>
        <td>Model quá đơn giản, không học được pattern. Loss train và test đều cao.</td>
      </tr>
      <tr>
        <td><strong>Unsupervised Learning</strong></td>
        <td>Học không giám sát</td>
        <td>-</td>
        <td>Chỉ có data, không có label. Máy tự tìm cấu trúc ẩn. VD: clustering, anomaly detection.</td>
      </tr>
      <tr>
        <td><strong>Vector</strong></td>
        <td>Vector</td>
        <td>$\\vec{v}$</td>
        <td>Tensor rank 1 = mảng 1 chiều. VD: [1.5, -0.3, 2.1]. Chứa 1 sample hoặc 1 set weights.</td>
      </tr>
      <tr>
        <td><strong>Weight</strong></td>
        <td>Trọng số</td>
        <td>$W$</td>
        <td>Hệ số nhân quyết định tầm quan trọng input. Dương=đồng tình, Âm=phản đối. Model tự học.</td>
      </tr>
      <tr>
        <td><strong>Weighted Sum</strong></td>
        <td>Tổng có trọng số</td>
        <td>$z$</td>
        <td>$z = \\sum w_i x_i + b$. Phép tính cốt lõi mỗi neuron trước khi qua activation.</td>
      </tr>
      <tr>
        <td><strong>XOR Problem</strong></td>
        <td>Bài toán XOR</td>
        <td>-</td>
        <td>Bài toán chứng minh giới hạn Perceptron đơn lớp. Không linearly separable. Cần multi-layer.</td>
      </tr>
      <tr>
        <td><strong>Z-Score</strong></td>
        <td>Điểm Z / Chuẩn hóa</td>
        <td>-</td>
        <td>$(X - \\mu) / \\sigma$. Scale data về mean=0, std=1. Phương pháp mặc định cho NN.</td>
      </tr>
    </tbody>
  </table>

  <!-- ========================================= -->
  <!-- 9.2. CÔNG THỨC QUAN TRỌNG                   -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">functions</span> 9.2. Tổng hợp công thức quan trọng</h3>

  <h4>Neuron cơ bản:</h4>
  <div class="formula-block my-3 p-3 bg-blue-50 border-blue-200">
    <p class="font-mono">$z = W^T \\cdot X + b = \\sum_{i=1}^{n} w_i x_i + b$</p>
    <p class="font-mono">$y = f(z)$ (f = activation function)</p>
  </div>

  <h4>Activation Functions:</h4>
  <div class="formula-block my-3 p-3 bg-green-50 border-green-200">
    <p class="font-mono">Step: $f(z) = \\begin{cases} 1 & z \\geq 0 \\\\ 0 & z < 0 \\end{cases}$</p>
    <p class="font-mono mt-1">Sigmoid: $\\sigma(z) = \\frac{1}{1 + e^{-z}}$ &emsp; Range: (0, 1)</p>
    <p class="font-mono mt-1">Tanh: $\\tanh(z) = \\frac{e^z - e^{-z}}{e^z + e^{-z}}$ &emsp; Range: (-1, 1)</p>
    <p class="font-mono mt-1">ReLU: $f(z) = \\max(0, z)$ &emsp; Range: [0, ∞)</p>
    <p class="font-mono mt-1">Softmax: $f(z_i) = \\frac{e^{z_i}}{\\sum_j e^{z_j}}$ &emsp; Range: (0, 1), tổng = 1</p>
  </div>

  <h4>Loss Functions:</h4>
  <div class="formula-block my-3 p-3 bg-red-50 border-red-200">
    <p class="font-mono">MSE = $\\frac{1}{n} \\sum (y_i - \\hat{y}_i)^2$ &emsp; (Regression)</p>
    <p class="font-mono mt-1">BCE = $-\\frac{1}{n} \\sum [y_i \\log \\hat{y}_i + (1-y_i) \\log(1-\\hat{y}_i)]$ &emsp; (Binary Classification)</p>
    <p class="font-mono mt-1">CCE = $-\\sum_{c} y_c \\log \\hat{y}_c$ &emsp; (Multi-class Classification)</p>
  </div>

  <h4>Normalization:</h4>
  <div class="formula-block my-3 p-3 bg-purple-50 border-purple-200">
    <p class="font-mono">Min-Max: $X_{norm} = \\frac{X - X_{min}}{X_{max} - X_{min}}$ &emsp; Range: [0, 1]</p>
    <p class="font-mono mt-1">Z-Score: $X_{std} = \\frac{X - \\mu}{\\sigma}$ &emsp; Mean=0, Std=1</p>
    <p class="font-mono mt-1">BatchNorm: $\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma_B^2 + \\epsilon}}$, &emsp; $y = \\gamma \\hat{x} + \\beta$</p>
  </div>

  <h4 class="mt-4">Gradient Descent:</h4>
  <div class="image-showcase" style="margin: 10px 0;">
    <img src="/images/ch21/gradient_descent_3d_1773152807591.png" alt="Gradient Descent 3D" style="max-width: 400px; border-radius: 8px;" />
  </div>
  <div class="formula-block my-3 p-3 bg-yellow-50 border-yellow-200">
    <p class="font-mono">$W \\leftarrow W - \\eta \\cdot \\frac{\\partial L}{\\partial W}$</p>
    <p class="font-mono mt-1">$b \\leftarrow b - \\eta \\cdot \\frac{\\partial L}{\\partial b}$</p>
    <p class="mt-2">$\\eta$ = Learning rate, $\\frac{\\partial L}{\\partial W}$ = gradient (đạo hàm riêng Loss theo W)</p>
  </div>

  <h4>Perceptron Learning Rule:</h4>
  <div class="formula-block my-3 p-3 bg-gray-50 border-gray-200">
    <p class="font-mono">$w_i \\leftarrow w_i + \\eta \\cdot (y_{true} - \\hat{y}) \\cdot x_i$</p>
    <p class="font-mono mt-1">$b \\leftarrow b + \\eta \\cdot (y_{true} - \\hat{y})$</p>
  </div>

  <!-- ========================================= -->
  <!-- 9.3. SƠ ĐỒ TÓM TẮT                        -->
  <!-- ========================================= -->
  <h3><span class="material-symbols-outlined">account_tree</span> 9.3. Sơ đồ tóm tắt nội dung bài học</h3>

  <!-- Phần 1: Machine Learning Overview -->
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #334155;">
    <h4 style="color: #38bdf8; margin: 0 0 16px 0; font-size: 1.05rem;">
      <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 6px;">schema</span>
      Phần 1: Machine Learning Overview
    </h4>
    <div style="text-align: center;">
      <!-- Top chain -->
      <div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
        <span style="background: #7c3aed; color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">AI</span>
        <span style="color: #64748b;">→</span>
        <span style="background: #2563eb; color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Machine Learning</span>
        <span style="color: #64748b;">→</span>
        <span style="background: #0891b2; color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Deep Learning</span>
        <span style="color: #64748b;">→</span>
        <span style="background: #059669; color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Neural Networks</span>
      </div>
      <!-- Arrow down -->
      <div style="color: #64748b; margin-bottom: 12px;">▼</div>
      <!-- 3 branches -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        <div style="background: #1e3a5f; border-radius: 10px; padding: 12px; border: 1px solid #2563eb40;">
          <p style="color: #60a5fa; font-weight: 700; margin: 0 0 8px 0; font-size: 0.85rem;">Supervised</p>
          <p style="color: #94a3b8; font-size: 0.75rem; margin: 0; line-height: 1.5;">Classification<br>Regression</p>
        </div>
        <div style="background: #1e3a3f; border-radius: 10px; padding: 12px; border: 1px solid #0891b240;">
          <p style="color: #22d3ee; font-weight: 700; margin: 0 0 8px 0; font-size: 0.85rem;">Unsupervised</p>
          <p style="color: #94a3b8; font-size: 0.75rem; margin: 0; line-height: 1.5;">Clustering<br>Dim. Reduction</p>
        </div>
        <div style="background: #2d1e3f; border-radius: 10px; padding: 12px; border: 1px solid #7c3aed40;">
          <p style="color: #a78bfa; font-weight: 700; margin: 0 0 8px 0; font-size: 0.85rem;">Reinforcement</p>
          <p style="color: #94a3b8; font-size: 0.75rem; margin: 0; line-height: 1.5;">Agent + Env<br>Reward</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Phần 2: Neural Network Architecture -->
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #334155;">
    <h4 style="color: #34d399; margin: 0 0 16px 0; font-size: 1.05rem;">
      <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 6px;">hub</span>
      Phần 2: Neural Network Architecture
    </h4>
    <!-- Flow chain -->
    <div style="display: flex; align-items: stretch; justify-content: center; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
      <div style="background: #1e3a5f; border-radius: 10px; padding: 10px 14px; border: 1px solid #2563eb40; text-align: center; min-width: 80px;">
        <p style="color: #60a5fa; font-weight: 700; margin: 0; font-size: 0.8rem;">Input</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 4px 0 0 0;">$X$ (Data)</p>
      </div>
      <span style="color: #64748b; display: flex; align-items: center; font-size: 1.2rem;">→</span>
      <div style="background: #1e3a3f; border-radius: 10px; padding: 10px 14px; border: 1px solid #0891b240; text-align: center; min-width: 80px;">
        <p style="color: #22d3ee; font-weight: 700; margin: 0; font-size: 0.8rem;">Linear</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 4px 0 0 0;">$z = WX + b$</p>
      </div>
      <span style="color: #64748b; display: flex; align-items: center; font-size: 1.2rem;">→</span>
      <div style="background: #3f1e2d; border-radius: 10px; padding: 10px 14px; border: 1px solid #e1195740; text-align: center; min-width: 80px;">
        <p style="color: #fb7185; font-weight: 700; margin: 0; font-size: 0.8rem;">Activation</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 4px 0 0 0;">$h = f(z)$</p>
      </div>
      <span style="color: #64748b; display: flex; align-items: center; font-size: 1.2rem;">→</span>
      <div style="background: #1e3a3f; border-radius: 10px; padding: 10px 14px; border: 1px solid #0891b240; text-align: center; min-width: 80px;">
        <p style="color: #22d3ee; font-weight: 700; margin: 0; font-size: 0.8rem;">Linear</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 4px 0 0 0;">$z = Wh + b$</p>
      </div>
      <span style="color: #64748b; display: flex; align-items: center; font-size: 1.2rem;">→ ...</span>
      <span style="color: #64748b; display: flex; align-items: center; font-size: 1.2rem;">→</span>
      <div style="background: #1e3f1e; border-radius: 10px; padding: 10px 14px; border: 1px solid #05966940; text-align: center; min-width: 80px;">
        <p style="color: #34d399; font-weight: 700; margin: 0; font-size: 0.8rem;">Output</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 4px 0 0 0;">$\\hat{y}$ (Prediction)</p>
      </div>
    </div>
    <!-- Legend -->
    <div style="display: flex; justify-content: center; gap: 16px; margin-top: 12px; flex-wrap: wrap;">
      <span style="color: #64748b; font-size: 0.7rem;"><span style="color: #22d3ee;">●</span> Weights + Bias</span>
      <span style="color: #64748b; font-size: 0.7rem;"><span style="color: #fb7185;">●</span> Non-linear</span>
      <span style="color: #64748b; font-size: 0.7rem;"><span style="color: #34d399;">●</span> Prediction + Loss</span>
    </div>
  </div>

  <!-- Phần 3: Data Pipeline -->
  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: 12px; padding: 24px; margin-bottom: 20px; border: 1px solid #334155;">
    <h4 style="color: #f59e0b; margin: 0 0 16px 0; font-size: 1.05rem;">
      <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 6px;">conversion_path</span>
      Phần 3: Data Pipeline
    </h4>
    <!-- Pipeline steps -->
    <div style="display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
      <span style="background: #92400e; color: #fde68a; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Raw Data</span>
      <span style="color: #64748b;">→</span>
      <span style="background: #065f46; color: #6ee7b7; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Clean</span>
      <span style="color: #64748b;">→</span>
      <span style="background: #1e3a5f; color: #93c5fd; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Feature Eng</span>
      <span style="color: #64748b;">→</span>
      <span style="background: #4c1d95; color: #c4b5fd; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Encode</span>
      <span style="color: #64748b;">→</span>
      <span style="background: #7f1d1d; color: #fca5a5; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600;">Split</span>
    </div>
    <!-- Arrow down -->
    <div style="text-align: center; color: #64748b; margin-bottom: 12px;">▼</div>
    <!-- Bottom flow -->
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; text-align: center;">
      <div style="background: #1e293b; border-radius: 10px; padding: 12px; border: 1px solid #f59e0b40;">
        <p style="color: #fbbf24; font-weight: 700; margin: 0; font-size: 0.85rem;">Train / Val / Test</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 6px 0 0 0;">Chia tập dữ liệu</p>
      </div>
      <div style="background: #1e293b; border-radius: 10px; padding: 12px; border: 1px solid #0891b240;">
        <p style="color: #22d3ee; font-weight: 700; margin: 0; font-size: 0.85rem;">Normalize → Batch</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 6px 0 0 0;">Fit on train only</p>
      </div>
      <div style="background: #1e293b; border-radius: 10px; padding: 12px; border: 1px solid #05966940;">
        <p style="color: #34d399; font-weight: 700; margin: 0; font-size: 0.85rem;">Forward Pass</p>
        <p style="color: #94a3b8; font-size: 0.7rem; margin: 6px 0 0 0;">→ Prediction</p>
      </div>
    </div>
  </div>

  <div class="key-takeaway">
    <div class="key-takeaway-icon"><span class="material-symbols-outlined">emoji_events</span></div>
    <h3>Xin chúc mừng! Bạn đã hoàn thành bài nền tảng.</h3>
    <p>Bạn đã nắm được toàn bộ kiến thức cốt lõi cần thiết để hiểu Neural Networks hoạt động. Từ Machine Learning là gì, qua Perceptron, Tensor, đến Data Pipeline hoàn chỉnh.</p>
    <p><strong>Bài tiếp theo:</strong> Activation Functions (chi tiết), Loss Functions, Gradient Descent & Optimizers, Backpropagation - mỗi bài sẽ đào sâu vào từng chủ đề.</p>
  </div>
</div>
    `,
    defaultCode: `// =====================================================
// BÀI TẬP TỔNG HỢP - KIỂM TRA HIỂU BIẾT
// =====================================================
//
// Implement mini Neural Network từ zero với:
// 1. Data preparation (normalize, encode)
// 2. Network definition (weights, biases)
// 3. Forward pass (tính prediction)
// 4. Loss calculation
// 5. Manual weight update (1 step Gradient Descent)
//
// Bài toán: Dự đoán sinh viên ĐẬU hay RỚT dựa trên:
// - Điểm thi lý thuyết (0-100)
// - Điểm bài tập (0-100)
// - Số buổi vắng (0-30)
// =====================================================

fn main() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║  BÀI TẬP TỔNG HỢP: DỰ ĐOÁN ĐẬU/RỚT BẰNG NEURAL NETWORK     ║");
    println!("╚══════════════════════════════════════════════════════════════╝");

    // =========================================================
    // 1. RAW DATA
    // =========================================================
    println!("\\n=== 1. DỮ LIỆU THÔ ===");
    
    // [điểm_lý_thuyết, điểm_bài_tập, số_buổi_vắng]
    let raw_data = vec![
        (vec![85.0, 90.0,  2.0], 1.0),  // Đậu
        (vec![40.0, 50.0, 15.0], 0.0),  // Rớt
        (vec![70.0, 80.0,  5.0], 1.0),  // Đậu
        (vec![30.0, 35.0, 20.0], 0.0),  // Rớt
        (vec![90.0, 95.0,  1.0], 1.0),  // Đậu
        (vec![55.0, 45.0, 12.0], 0.0),  // Rớt
        (vec![75.0, 70.0,  3.0], 1.0),  // Đậu
        (vec![45.0, 40.0, 18.0], 0.0),  // Rớt
    ];
    
    println!("  {:>3} │ {:>6} │ {:>6} │ {:>6} │ {:>8}",
        "STT", "Lý th.", "BT", "Vắng", "Kết quả");
    println!("  ────┼────────┼────────┼────────┼──────────");
    for (i, (features, label)) in raw_data.iter().enumerate() {
        let result = if *label == 1.0 { "ĐẬU" } else { "RỚT" };
        println!("  {:>3} │ {:>6.0} │ {:>6.0} │ {:>6.0} │ {:>8}",
            i+1, features[0], features[1], features[2], result);
    }

    // =========================================================
    // 2. SPLIT: 6 train + 2 test
    // =========================================================
    println!("\\n=== 2. SPLIT DATA ===");
    let train_data = &raw_data[..6];
    let test_data = &raw_data[6..];
    println!("  Training: {} mẫu, Test: {} mẫu", train_data.len(), test_data.len());

    // =========================================================
    // 3. NORMALIZE (Z-Score, fit on train only)
    // =========================================================
    println!("\\n=== 3. NORMALIZE (Z-Score) ===");
    
    // Tính mean, std từ training data
    let n_train = train_data.len() as f64;
    let mut means = vec![0.0; 3];
    let mut stds = vec![0.0; 3];
    
    for (features, _) in train_data {
        for j in 0..3 { means[j] += features[j]; }
    }
    for j in 0..3 { means[j] /= n_train; }
    
    for (features, _) in train_data {
        for j in 0..3 {
            let diff = features[j] - means[j];
            stds[j] += diff * diff;
        }
    }
    for j in 0..3 { stds[j] = (stds[j] / n_train).sqrt(); }
    
    let feature_names = ["Lý thuyết", "Bài tập", "Vắng"];
    for j in 0..3 {
        println!("  {}: mean={:.1}, std={:.1}", feature_names[j], means[j], stds[j]);
    }
    
    // Normalize train data
    let train_norm: Vec<(Vec<f64>, f64)> = train_data.iter().map(|(f, l)| {
        let norm: Vec<f64> = f.iter().enumerate()
            .map(|(j, &x)| (x - means[j]) / stds[j])
            .collect();
        (norm, *l)
    }).collect();
    
    // Normalize test data (dùng mean/std từ train!)
    let test_norm: Vec<(Vec<f64>, f64)> = test_data.iter().map(|(f, l)| {
        let norm: Vec<f64> = f.iter().enumerate()
            .map(|(j, &x)| (x - means[j]) / stds[j])
            .collect();
        (norm, *l)
    }).collect();

    // =========================================================
    // 4. DEFINE NETWORK
    // =========================================================
    println!("\\n=== 4. NETWORK: Input(3) → Hidden(4, ReLU) → Output(1, Sigmoid) ===");
    
    // Layer 1: 3 → 4
    let w1 = vec![
        vec![ 0.5, -0.3,  0.2,  0.4],
        vec![ 0.3,  0.6, -0.1,  0.2],
        vec![-0.4, -0.2, -0.5, -0.3],
    ];
    let b1 = vec![0.1, 0.0, 0.1, -0.1];
    
    // Layer 2: 4 → 1
    let w2 = vec![vec![0.5], vec![-0.3], vec![0.4], vec![0.2]];
    let b2 = vec![0.0];
    
    let total_params = 3*4 + 4 + 4*1 + 1;
    println!("  Tổng parameters: {}", total_params);

    // =========================================================
    // 5. FORWARD PASS + LOSS cho tất cả training samples
    // =========================================================
    println!("\\n=== 5. FORWARD PASS (Training data) ===");
    
    let mut total_loss = 0.0;
    let mut correct = 0;
    
    for (i, (x, y_true)) in train_norm.iter().enumerate() {
        // Layer 1: z1 = X·W1 + b1, h1 = ReLU(z1)
        let mut h1 = vec![0.0; 4];
        for j in 0..4 {
            let mut z = b1[j];
            for k in 0..3 { z += x[k] * w1[k][j]; }
            h1[j] = if z > 0.0 { z } else { 0.0 }; // ReLU
        }
        
        // Layer 2: z2 = h1·W2 + b2, y_pred = Sigmoid(z2)
        let mut z_out = b2[0];
        for k in 0..4 { z_out += h1[k] * w2[k][0]; }
        let y_pred = 1.0 / (1.0 + (-z_out).exp()); // Sigmoid
        
        // Loss
        let eps = 1e-7;
        let yp = y_pred.max(eps).min(1.0 - eps);
        let loss = -(y_true * yp.ln() + (1.0 - y_true) * (1.0 - yp).ln());
        total_loss += loss;
        
        let predicted_class = if y_pred > 0.5 { 1.0 } else { 0.0 };
        if predicted_class == *y_true { correct += 1; }
        
        let status = if predicted_class == *y_true { "✓" } else { "✗" };
        let label_true = if *y_true == 1.0 { "Đậu" } else { "Rớt" };
        let label_pred = if predicted_class == 1.0 { "Đậu" } else { "Rớt" };
        
        println!("  Mẫu {}: ŷ={:.4}, pred={}, true={} {} loss={:.4}",
            i+1, y_pred, label_pred, label_true, status, loss);
    }
    
    let avg_loss = total_loss / train_norm.len() as f64;
    let accuracy = correct as f64 / train_norm.len() as f64 * 100.0;
    
    println!("\\n  Training Results:");
    println!("    Average Loss: {:.4}", avg_loss);
    println!("    Accuracy: {}/{} = {:.1}%", correct, train_norm.len(), accuracy);

    // =========================================================
    // 6. TEST
    // =========================================================
    println!("\\n=== 6. TEST DATA ===");
    
    let mut test_correct = 0;
    for (i, (x, y_true)) in test_norm.iter().enumerate() {
        let mut h1 = vec![0.0; 4];
        for j in 0..4 {
            let mut z = b1[j];
            for k in 0..3 { z += x[k] * w1[k][j]; }
            h1[j] = if z > 0.0 { z } else { 0.0 };
        }
        
        let mut z_out = b2[0];
        for k in 0..4 { z_out += h1[k] * w2[k][0]; }
        let y_pred = 1.0 / (1.0 + (-z_out).exp());
        
        let predicted_class = if y_pred > 0.5 { 1.0 } else { 0.0 };
        if predicted_class == *y_true { test_correct += 1; }
        
        let status = if predicted_class == *y_true { "✓" } else { "✗" };
        println!("  Test {}: ŷ={:.4}, pred={}, true={} {}",
            i+1, y_pred,
            if predicted_class == 1.0 { "Đậu" } else { "Rớt" },
            if *y_true == 1.0 { "Đậu" } else { "Rớt" },
            status);
    }
    
    println!("  Test Accuracy: {}/{} = {:.1}%",
        test_correct, test_norm.len(),
        test_correct as f64 / test_norm.len() as f64 * 100.0);

    println!("\\n=== TỔNG KẾT ===");
    println!("  Đây là Neural Network VỚI WEIGHTS RANDOM (chưa train).");
    println!("  Accuracy chưa cao vì weights chưa được tối ưu.");
    println!("  Để training thực sự, cần:");
    println!("    1. Backward Pass: Tính gradient ∂L/∂W");
    println!("    2. Gradient Descent: W = W - η × ∂L/∂W");
    println!("    3. Lặp hàng ngàn lần → Loss giảm → Accuracy tăng");
    println!("  → Sẽ học chi tiết ở bài 21.5 (Gradient Descent) và 21.6 (Backpropagation)");
}`
  },
];

// =====================================================
// EXPORT MODULE
// =====================================================

export const ch21_01: Chapter = {
  id: 'ch21_01',
  title: '21.1. Nền Tảng Machine Learning, Perceptron & Data Pipeline',
  introduction: `
    <h2>Khởi thủy Nền Văn Minh Deep Learning</h2>
    <p>Đây là bài học nền tảng bao trùm toàn bộ kiến thức cốt lõi mà bạn cần trước khi bước vào thế giới Neural Networks. Mỗi phần đều được giải thích chi tiết với ví dụ cụ thể, công thức toán học, và code Rust minh họa.</p>

    <h3>Yêu cầu trước khi học</h3>
    <ul>
      <li><strong>Toán học cơ bản:</strong> Phép nhân/cộng ma trận, đạo hàm cơ bản, hàm mũ ($e^x$), logarithm tự nhiên ($\\ln$).</li>
      <li><strong>Rust cơ bản:</strong> Biết đọc code Rust: struct, impl, Vec, vòng lặp for/while, hàm fn.</li>
      <li><strong>Tư duy logic:</strong> Hiểu khái niệm true/false, AND/OR/NOT.</li>
      <li><strong>Không cần kinh nghiệm ML:</strong> Bài học bắt đầu từ zero, giải thích mọi thuật ngữ từ đầu.</li>
    </ul>

    <h3>Nội dung chi tiết (9 bài học)</h3>
    <ul>
      <li><strong>Bài 1:</strong> Machine Learning là gì? Ba loại ML (Supervised, Unsupervised, Reinforcement). Neuron sinh học vs nhân tạo. Universal Approximation Theorem. Lịch sử phát triển Neural Networks từ 1943 đến nay. Cấu trúc điển hình Input/Hidden/Output layers.</li>
      <li><strong>Bài 2:</strong> Perceptron - đơn vị cơ bản nhất. Cấu trúc toán học chi tiết ($z = W^T X + b$). Giải thích từng thành phần (Inputs, Weights, Bias, Activation). 6 loại Activation Functions. Bài toán XOR và giới hạn tuyến tính. Perceptron Learning Rule. Multi-Layer Perceptron.</li>
      <li><strong>Bài 3:</strong> Tensor - cấu trúc dữ liệu nền tảng. Scalar, Vector, Matrix, 3D/4D/5D Tensors. Rank và Shape. Phép toán: Cộng, Dot Product, Nhân Ma Trận, Broadcasting, Reshape. Tensor trong các bài toán thực tế (ảnh, text, video).</li>
      <li><strong>Bài 4:</strong> Data Encoding - chuyển đổi dữ liệu phi số. Label Encoding (mã hóa nhãn). One-Hot Encoding (mã hóa nhị phân). Embedding (biểu diễn dense vector). Encoding cho từng kiểu dữ liệu: số, text, ảnh, ngày tháng.</li>
      <li><strong>Bài 5:</strong> Data Normalization - tại sao phải chuẩn hóa dữ liệu trước khi đưa vào Neural Network. Min-Max Normalization (scale về [0,1]). Z-Score Standardization (mean=0, std=1). Robust Scaling (dùng median/IQR). Batch Normalization (normalize bên trong mạng). So sánh tổng hợp các phương pháp với ưu/nhược điểm cụ thể.</li>
      <li><strong>Bài 6:</strong> Data Splitting & Batching - quy trình xử lý dữ liệu hoàn chỉnh. Hold-out Split (đơn giản). K-Fold Cross Validation (đáng tin cậy). Stratified Split (cho imbalanced data). Data Leakage (lỗi nghiêm trọng cần tránh). Mini-batch, SGD, Batch GD so sánh. Shuffling - tại sao phải xáo trộn. Data Pipeline end-to-end 8 bước hoàn chỉnh.</li>
      <li><strong>Bài 7:</strong> Feature Engineering & Selection - nghệ thuật tạo và chọn đặc trưng. Interaction features (kết hợp). Polynomial features (đa thức). Binning (phân nhóm). Date/Time features (trích xuất thời gian). Text features (Bag of Words, TF-IDF, Word2Vec, BERT). Filter/Wrapper/Embedded methods. Data Augmentation cho ảnh và text.</li>
      <li><strong>Bài 8:</strong> Forward Pass End-to-End - theo dõi dữ liệu đi qua Neural Network 3 layers từ A→Z. Bài toán phân loại email Spam. Normalize → Hidden 1 (ReLU) → Hidden 2 (ReLU) → Output (Sigmoid) → Loss (BCE). Tính toán từng bước cụ thể với con số.</li>
      <li><strong>Bài 9:</strong> Tổng hợp & thuật ngữ cốt lõi. Bảng 50+ thuật ngữ A-Z (Tiếng Anh ↔ Tiếng Việt ↔ Công thức). Tổng hợp 15+ công thức quan trọng. Sơ đồ tóm tắt toàn bộ bài học. Bài tập tổng hợp: implement mini Neural Network hoàn chỉnh cho bài toán dự đoán đậu/rớt.</li>
    </ul>

    <h3>Mục tiêu sau bài học</h3>
    <ul>
      <li>Hiểu hoàn toàn cách Neural Network hoạt động ở mức toán học: từ input → weighted sum → activation → output → loss</li>
      <li>Biết cách chuẩn bị dữ liệu từ thô đến sẵn sàng training: Clean → Encode → Split → Normalize → Batch</li>
      <li>Nắm vững các khái niệm cốt lõi: Weights, Bias, Activation Functions, Loss Functions, Tensor, Normalization, Gradient Descent</li>
      <li>Có thể implement Perceptron, Normalization, Data Pipeline, và Forward Pass từ zero trong Rust</li>
      <li>Hiểu được giới hạn Perceptron đơn lớp (XOR Problem) và tại sao cần Multi-Layer Perceptron</li>
      <li>Phân biệt rõ ràng: Parameter vs Hyperparameter, Overfitting vs Underfitting, Supervised vs Unsupervised</li>
      <li>Sẵn sàng cho các bài tiếp theo: Activation Functions chi tiết (21.2), Loss Functions (21.3), Gradient Descent (21.5), Backpropagation (21.6)</li>
    </ul>

    <h3>Các câu hỏi thường gặp (FAQ)</h3>
    <ul>
      <li><strong>Q: Tôi cần biết toán nhiều không?</strong><br/>A: Cần biết cộng, nhân, đạo hàm cơ bản. Bài học giải thích mọi công thức từng bước. Không cần proof toán formal.</li>
      <li><strong>Q: Deep Learning khác Machine Learning thế nào?</strong><br/>A: Deep Learning là MỘT NHÁNH của Machine Learning, dùng Neural Networks nhiều layers (deep). ML bao gồm cả các phương pháp không dùng NN như Decision Tree, SVM, KNN.</li>
      <li><strong>Q: Tại sao dùng Rust mà không phải Python?</strong><br/>A: Rust giúp hiểu rõ từng bước tính toán ở mức thấp (no magic). Trong thực tế, Python + PyTorch/TensorFlow phổ biến hơn vì có GPU acceleration. Nhưng hiểu Rust implementation → hiểu bản chất sâu hơn.</li>
      <li><strong>Q: Bao lâu hoàn thành bài này?</strong><br/>A: Khoảng 8-12 giờ học nghiêm túc. Mỗi bài con ~60-90 phút. Nên đọc kỹ lý thuyết → chạy code → tự sửa code để thử nghiệm.</li>
      <li><strong>Q: Neural Network thực tế có gì khác bài học?</strong><br/>A: Bài học dùng for loops cho rõ ràng. Thực tế dùng matrix operations (BLAS) trên GPU, nhanh hơn triệu lần. Framework (PyTorch) lo phần optimization, ta chỉ cần define architecture.</li>
      <li><strong>Q: Activation Function nào nên dùng?</strong><br/>A: Hidden layers: ReLU (mặc định). Output: Sigmoid (binary classification), Softmax (multi-class), Linear (regression). Chi tiết hơn ở bài 21.2.</li>
    </ul>

    <h3>Lộ trình học chương 21 (Roadmap)</h3>
    <ul>
      <li><strong>21.1 (Bài này):</strong> Nền tảng ML, Perceptron, Tensor, Data Pipeline ← Bạn đang ở đây</li>
      <li><strong>21.2:</strong> Activation Functions chi tiết - Sigmoid, Tanh, ReLU, Leaky ReLU, GELU, SiLU, Swish</li>
      <li><strong>21.3:</strong> Loss Functions & Optimizers - MSE, Cross-Entropy, Adam, SGD, RMSProp</li>
      <li><strong>21.4:</strong> Convolutional Neural Networks (CNN) - Conv2D, Pooling, Stride, Padding</li>
      <li><strong>21.5:</strong> Gradient Descent & Backpropagation - Chain Rule, Computational Graph</li>
      <li><strong>21.6:</strong> Recurrent Neural Networks (RNN) - LSTM, GRU, Sequence Modeling</li>
      <li><strong>21.7:</strong> Transformers & Attention - Self-Attention, Multi-Head, Positional Encoding</li>
      <li><strong>21.8:</strong> Practical Deep Learning - Regularization, Dropout, Learning Rate Scheduling, Transfer Learning</li>
      <li><strong>21.9:</strong> Dự án thực hành - Xây dựng model hoàn chỉnh trên dataset thực tế</li>
    </ul>
  `,
  lessons: ch21_01_lessons,
};

export default ch21_01;
