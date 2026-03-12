import { Lesson, Chapter } from '../../courses';

const ch23_08_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: ỨNG DỤNG THỰC TẾ
  // ==========================================================
  {
    id: 'ch23_08_01',
    title: '1. Sức mạnh phổ quát của Transformer',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Ứng dụng Thực tiễn (Real-world Applications)</h2>

  <p>Gần như 100% các đột phá AI lớn từ năm 2020 trở đi đều xoay quanh một lõi duy nhất: <strong>Kiến trúc Transformer</strong>.</p>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Mô Hình Ngôn Ngữ Lớn (LLMs)</h4>
      <p>Từ ChatGPT của OpenAI, Gemini của Google tới LLaMA của Meta. Khả năng "Hiểu luật ngôn ngữ" để trả lời câu hỏi, dịch thuật, lập luận logic như con người. Bản chất đều là mô hình Decode-Only cực lớn đè lên lõi Transformer năm 2017.</p>
    </div>
    <div class="concept-card">
      <h4>Sinh sinh học và Y Tế (Biology)</h4>
      <p>AlphaFold 2 (DeepMind) đã phá đảo khả năng dự đoán cấu trúc Protein của nhân loại. Dãy Axit Amin cũng chỉ là token. AlphaFold dùng module Evoformer dựa trên gốc Attention cực mượt mà.</p>
    </div>
    <div class="concept-card">
      <h4>Đồng sáng tạo Code (Copilot/Coding AI)</h4>
      <p>Github Copilot, Cursor AI và vô vàn IDE tân tiến chèn Transformer vào lõi, đọc toàn bộ Code Workspace để auto-complete, gỡ lỗi và refactor hoàn hảo như một chuyên gia Senior.</p>
    </div>
    <div class="concept-card">
      <h4>Đa phương thức (Multi-modal)</h4>
      <p>Như mô hình Gemini hiện nay, đầu vào không chỉ Text. Bạn đẩy thẳng Voice, Video, và Image vào chung Transformer. Mọi thứ được ép thành luồng Token chung rồi Attention với nhau. Viết prompt bằng Hình! Hỏi bằng Video!</p>
    </div>
  </div>

  <div class="callout callout-important">
    <div class="callout-content">
      <span class="callout-title">"The Bitter Lesson" (Bài học cay đắng) của Rich Sutton</span>
      <p>Nhiều thập kỷ, các nhà logic học cố gắng "nhồi nhét" kiến thức chuyên ngành (hard-code rule) của y, sinh học, ngôn ngữ vào mô hình AI. Nhưng bài học cay đắng là... Dùng <strong>phương pháp tổng quát (General Method)</strong> kết hợp <strong>Thuật toán tính toán Mở rộng (Compute scale dồn vào Search/Learning)</strong> luôn đánh gục mọi cách hard-code tinh tế! Transformer chứng minh điều này mạnh nhất.</p>
    </div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: TỔNG KẾT HÀNH TRÌNH TỪ PERCEPTRON ĐẾN LLM
  // ==========================================================
  {
    id: 'ch23_08_02',
    title: '2. Nhìn lại hành trình: Từ Neural Cơ bản đến Attention',
    duration: '15 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Tóm tắt Hành trình Deep Learning (Phần Sequence)</h2>

  <p>Bạn đã trải qua một hành trình tri thức cực kỳ dài và đồ sộ. Hãy đúc kết lịch sử bằng cách nhìn rõ quá trình tiến hóa của AI khi xử lý chuỗi (Sequence):</p>

  <table class="comparison-table text-sm">
    <thead>
      <tr>
        <th>Thế hệ</th>
        <th>Kiến trúc mạng</th>
        <th>Vấn đề cốt lõi</th>
        <th>Cách giải quyết</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><strong>Perceptron / FNN (MLP)</strong></td>
        <td>Không có bộ nhớ. Đọc đoạn văn mà không lưu giữ bối cảnh, chữ đứng độc lập. Tham số cố định không thể mở rộng theo time.</td>
        <td>Xây dựng vòng lặp đệ quy. Truyền Memory Hidden State ngược lại thành Input.</td>
      </tr>
      <tr>
        <td>2</td>
        <td><strong>RNN (Recurrent NN)</strong></td>
        <td>Bị Vanishing Gradient! Khó nhớ quá khứ xa. Chuỗi dịch máy dài sẽ bị quên bẵng mất đại từ đứng ở tuốt đầu câu.</td>
        <td>Chèn các "Gate" (Cửa xoay) và Cell State thành luồng cao tốc xuyên thủng thời gian.</td>
      </tr>
      <tr>
        <td>3</td>
        <td><strong>LSTM / GRU</strong></td>
        <td>Đỉnh cao của thời đại. Nhưng bị <strong>nút cổ chai (Bottleneck)</strong>: Ép toàn bộ nguyên câu truyện dài chui qua 1 Vector độ dài 512. Chậm do phải đợi tính chữ trước mới lo được chữ sau (O(T)).</td>
        <td>Tháo tung cổ chai, Decoder không dùng 1 Vector mà <strong>nhìn chằm chằm</strong> (Attend) vào TẤT CẢ các chữ ở Encoder.</td>
      </tr>
      <tr>
        <td>4</td>
        <td><strong>Seq2Seq + Attention (Bahdanau)</strong></td>
        <td>Tốt hơn rất nhiều, nhưng lõi vẫn chạy LSTM (chạy tuần tự không song song). Thời gian huấn luyện siêu lâu, không rèn trên TPU/GPU hiệu năng cao được.</td>
        <td>Xóa bỏ RNN! Drop hoàn toàn khái niệm Time-step! Gom toàn bộ làm Ma Trận khổng lồ. <strong>"Attention Is All You Need"</strong>!</td>
      </tr>
      <tr>
        <td>5</td>
        <td><strong>Transformer (2017)</strong></td>
        <td>Ra đời hoàn hảo. Hỗ trợ song song phần cứng, nhồi 1 triệu token cũng chỉ là MatMul. Global Context cho Tấn Cả các Cặp chữ Cùng Lúc (Self-Attention).</td>
        <td>Trở thành nền móng Tôn Giáo của AI Thế kỷ 21!</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-tip">
    <div class="callout-content">
      <span class="callout-title">Tại sao chúng ta phải học từ Perceptron?</span>
      <p>Nếu bạn vứt thẳng vào học Transformer ngay, bạn sẽ bị ngợp vào rừng ma trận Q,K,V mà không hiểu nguồn gốc. Chính việc đi từ hạn chế của FNN, tới sự bí bách vòng lặp RNN, sang nghẽn cổ chai LSTM, bạn mới hiểu "Causal Mask" hay "Self-Attention" là thiên tài như thế nào khi nó <strong>Bức phá Mọi giới hạn vật lý</strong> của thời đại trước đó!</p>
    </div>
  </div>

  <hr />

  <div class="key-takeaway">
    <h3>Bạn đã hoàn thành Chương 23!</h3>
    <ul class="space-y-2 mt-2">
      <li>Bạn đã xé vụn cấu trúc mạng tinh túy nhất của thập kỷ này: <strong>Nắm rõ Positional Encoding</strong> để chống mù vị trí.</li>
      <li>Hiểu sâu gốc lõi <strong>Multi-Head Query-Key-Value ($QK^T / \\sqrt{d_k} \\times V$)</strong> để moi móc sự liên quan từ Text dài.</li>
      <li>Phân tách rõ ràng luồng <strong>Autoregressive qua Causal Mask Matrix</strong> trong Decoder Generation.</li>
      <li>Và thấy rõ cách <strong>Scaling Law cùng Decoder-Only</strong> thai nghén ra AI Trí Tuệ Tổng Quát Nhân Tạo (AGI) tương lai.</li>
    </ul>
    <p class="font-bold text-center mt-6 text-xl text-green-700">Chúc mừng bạn đã chinh phục đỉnh núi Transformer!</p>
  </div>
</div>
    `,
    defaultCode: ''
  }
];

const ch23_08: Chapter = {
  id: 'ch23_08',
  title: '23.8. Ứng Dụng \& Tổng Kết Hành Trình',
  introduction: 'Trạm dừng chân cuối cùng của khối kiến thức Deep Learning Tự nhiên. Nhìn lại hành trình đi từ bóng tối Perceptron của thập niên 60 bùng nổ đến LLM chói sáng của hiện tại.',
  lessons: ch23_08_lessons,
};

export default ch23_08;
