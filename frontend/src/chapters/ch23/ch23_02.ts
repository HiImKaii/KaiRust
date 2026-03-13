import { Lesson, Chapter } from '../../courses';

const ch23_02_lessons: Lesson[] = [
  // ==========================================================
  // LESSON 1: TOKEN EMBEDDING
  // ==========================================================
  {
    id: 'ch23_02_01',
    title: '1. Token Embedding — Từ số nguyên tới vector',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>1. Token Embedding trong Transformer</h2>

  <p>Transformer xử lý text bằng cách chuyển mỗi token (từ/subword) thành vector số thực. Quá trình này giống Word Embedding trong RNN (Chương 22), nhưng có vài điểm khác biệt quan trọng:</p>
  <ul style="margin-top: 8px;">
    <li><strong>Xử lý song song vs tuần tự:</strong> Transformer xử lý toàn bộ câu cùng lúc (parallel processing), trong khi RNN xử lý tuần tự từng từ một — giúp Transformer train nhanh hơn nhiều lần</li>
    <li><strong>Positional Encoding:</strong> Transformer cần thêm Positional Encoding để mã hóa thứ tự từ, vì self-attention không tự động biết vị trí. RNN có sẵn thông tin vị trí trong hidden state theo thứ tự xử lý</li>
    <li><strong>Embedding dimension lớn hơn:</strong> Transformer thường dùng 512-1024 dimensions để capture nhiều relationships phức tạp hơn, trong khi RNN thường dùng 128-256</li>
    <li><strong>Quy mô tham số:</strong> Transformer có thể scale lên hàng tỷ tham số (như GPT-4, LLaMA), trong khi RNN gặp khó khăn khi scale up do sequential processing</li>
    <li><strong>Long-range dependencies:</strong> Transformer dùng self-attention (O(1) distance) để capture relationships giữa các từ ở xa, trong khi RNN gặp van- gradient khi xử lý sequence dài</li>
    <li><strong>Giới hạn sequence length:</strong> Transformer bị giới hạn bởi quadratic complexity của attention (O(n²) với n là độ dài sequence), trong khi RNN xử lý được sequence rất dài nhưng với tốc độ chậm</li>
  </ul>

  <h3>1.1. Quy trình 3 bước</h3>

  <div class="steps-container">
    <div class="step-card">
      <div class="step-number">①</div>
      <div class="step-content">
        <h4>Tokenization</h4>
        <p>Text "Tôi yêu AI" → Tokens: ["Tôi", "yêu", "AI"]. Mỗi token được gán 1 ID số nguyên từ vocabulary.</p>
        <div class="definition-block">
          <span class="definition-term">Vocabulary là gì?</span>
          <p>Tập hợp tất cả tokens có trong corpus. Ví dụ vocab có 30,000 tokens:</p>
          <p>vocab = {"[PAD]": 0, "[UNK]": 1, "[CLS]": 2, "[SEP]": 3, "Tôi": 42, "yêu": 105, "AI": 7831, ...}</p>
        </div>
        <p><strong>Special tokens:</strong></p>
        <ul>
          <li><strong>[PAD]</strong>: Padding — đệm câu ngắn cho cùng độ dài batch</li>
          <li><strong>[UNK]</strong>: Unknown — từ không có trong vocab</li>
          <li><strong>[CLS]</strong>: Classification — token đầu câu (BERT dùng)</li>
          <li><strong>[SEP]</strong>: Separator — phân cách 2 câu</li>
          <li><strong>[SOS]</strong> / <strong>[EOS]</strong>: Start/End of sequence</li>
        </ul>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">②</div>
      <div class="step-content">
        <h4>Embedding Lookup</h4>
        <p>Ma trận embedding $E \\in \\mathbb{R}^{|V| \\times d_{model}}$ với $|V|$ = vocab size, $d_{model}$ = embedding dimension.</p>
        <div class="formula-block">
          <p>$x_i = E[\\text{token\\_id}_i] \\in \\mathbb{R}^{d_{model}}$</p>
        </div>
        <p><strong>Ví dụ với $d_{model}=4$:</strong></p>
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Embedding Vector</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>42 ("Tôi")</td>
              <td>[0.12, -0.34, 0.56, -0.21]</td>
            </tr>
            <tr>
              <td>105 ("yêu")</td>
              <td>[0.78, 0.23, -0.45, 0.91]</td>
            </tr>
            <tr>
              <td>7831 ("AI")</td>
              <td>[-0.11, 0.67, 0.33, -0.89]</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="step-card">
      <div class="step-number">③</div>
      <div class="step-content">
        <h4>Scaling</h4>
        <p>Paper gốc nhân embedding với $\\sqrt{d_{model}}$:</p>
        <div class="formula-block">
          <p>$x_i = E[\\text{token\\_id}_i] \\times \\sqrt{d_{model}}$</p>
        </div>
        <div class="callout callout-tip">
          <div class="callout-content">
            <span class="callout-title">Tại sao cần scaling?</span>
            <p>Embedding values ban đầu rất nhỏ (thường từ Gaussian N(0, 0.02)). Khi $d_{model}=512$, std ≈ 0.02 → variance ≈ 0.0004.</p>
            <p>Positional Encoding có range [-1, 1]. Nhân với $\\sqrt{512} \\approx 22.6$ → embedding variance ≈ 0.0004 × 512 = 0.2, gần với PE hơn.</p>
            <p>Kết quả: embedding + PE có scale tương đương → training ổn định hơn.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h3>1.2. Tokenization chi tiết — Từ văn bản đến số nguyên</h3>

  <p>Trước khi embedding được áp dụng, văn bản đầu vào phải trải qua bước <strong>Tokenization</strong> — quá trình chia nhỏ văn bản thành các đơn vị (tokens) có ý nghĩa. Đây là bước nền tảng nhưng thường bị bỏ qua, và nó ảnh hưởng trực tiếp đến chất lượng của mô hình.</p>

  <h4>1.2.1. Tại sao Tokenization quan trọng?</h4>

  <div class="definition-block">
    <span class="definition-term">Tokenization là gì?</span>
    <p>Tokenization là quá trình chuyển đổi một chuỗi văn bản (string) thành một chuỗi các số nguyên (token IDs). Mỗi số nguyên đại diện cho một token trong <strong>Vocabulary</strong> — từ điển của mô hình.</p>
  </div>

  <!-- Sơ đồ Pipeline -->
  <div class="image-showcase">
    <svg width="800" height="180" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrow-pipeline" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6"/>
        </marker>
      </defs>

      <!-- Step 1: Text -->
      <rect x="20" y="50" width="150" height="80" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
      <text x="95" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Input Text</text>
      <text x="95" y="105" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="11">"Con mèo"</text>

      <!-- Arrow 1 -->
      <line x1="170" y1="90" x2="210" y2="90" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-pipeline)"/>

      <!-- Step 2: Tokens -->
      <rect x="220" y="50" width="150" height="80" rx="8" fill="#1e293b" stroke="#8b5cf6" stroke-width="2"/>
      <text x="295" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Tokenizer</text>
      <text x="295" y="105" text-anchor="middle" fill="#c4b5fd" font-family="monospace" font-size="11">["Con", "mèo"]</text>

      <!-- Arrow 2 -->
      <line x1="370" y1="90" x2="410" y2="90" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-pipeline)"/>

      <!-- Step 3: IDs -->
      <rect x="420" y="50" width="150" height="80" rx="8" fill="#1e293b" stroke="#06b6d4" stroke-width="2"/>
      <text x="495" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Vocab IDs</text>
      <text x="495" y="105" text-anchor="middle" fill="#67e8f9" font-family="monospace" font-size="11">[142, 879]</text>

      <!-- Arrow 3 -->
      <line x1="570" y1="90" x2="610" y2="90" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-pipeline)"/>

      <!-- Step 4: Embeddings -->
      <rect x="620" y="50" width="160" height="80" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
      <text x="700" y="80" text-anchor="middle" fill="#fff" font-family="monospace" font-size="13">Embeddings</text>
      <text x="700" y="105" text-anchor="middle" fill="#6ee7b7" font-family="monospace" font-size="11">[d_model vector]</text>

      <!-- Labels -->
      <text x="95" y="35" text-anchor="middle" fill="#64748b" font-size="10">String</text>
      <text x="295" y="35" text-anchor="middle" fill="#64748b" font-size="10">Tokens</text>
      <text x="495" y="35" text-anchor="middle" fill="#64748b" font-size="10">Token IDs</text>
      <text x="700" y="35" text-anchor="middle" fill="#64748b" font-size="10">Dense Vectors</text>
    </svg>
    <div class="image-caption">Hình 1: Tokenization Pipeline — Từ văn bản đến vector embedding</div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">text_fields</span></div>
      <h4>Input</h4>
      <p><code>"Con mèo đen ăn cá"</code></p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">transform</span></div>
      <h4>Tokenization</h4>
      <p><code>["Con", "mèo", "đen", "ăn", "cá"]</code></p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">tag</span></div>
      <h4>Vocabulary Lookup</h4>
      <p><code>[142, 879, 2341, 56, 901]</code></p>
    </div>
  </div>

  <h4>1.2.2. Các phương pháp Tokenization</h4>

  <p>Có nhiều cách để chia văn bản thành tokens, mỗi cách có ưu nhược điểm riêng phù hợp với từng hoàn cảnh.</p>

  <h5>a) Word-Level Tokenization — Chia theo từ</h5>

  <p>Phương pháp đơn giản nhất: mỗi từ trong câu trở thành một token. Ví dụ, từ "unhappiness" sẽ được giữ nguyên thành một token duy nhất. Cách này dễ hiểu và dễ implement vì mỗi token mang ý nghĩa ngữ nghĩa rõ ràng — người đọc có thể hiểu ngay token đó có nghĩa gì.</p>

  <p>Tuy nhiên, Word-Level có nhược điểm nghiêm trọng. Đầu tiên, vocabulary trở nên cực kỳ lớn vì phải chứa mọi từ có trong ngôn ngữ — tiếng Anh có khoảng 1-5 triệu từ, tiếng Việt còn nhiều hơn. Thứ hai, vấn đề OOV (Out-of-Vocabulary) trở nên nghiêm trọng: bất kỳ từ nào không có trong vocabulary sẽ bị thay thế bằng token đặc biệt [UNK], khiến model mất hoàn toàn thông tin về từ đó. Khi gặp từ "multimodal" mà không có trong vocab, model chỉ biết đó là một từ không xác định, không thể phân biệt được với bất kỳ từ lạ nào khác. Thứ ba, các từ có cùng gốc từ như "run", "running", "ran" bị xử lý hoàn toàn riêng biệt, khiến model khó học được mối quan hệ ngữ nghĩa giữa chúng.</p>

  <h5>b) Character-Level Tokenization — Chia theo ký tự</h5>

  <p>Character-Level là phương pháp đối lập hoàn toàn: mỗi ký tự (chữ cái, số, dấu câu) trở thành một token. Ví dụ, từ "hello" được chia thành 5 tokens ["h", "e", "l", "l", "o"].</p>

  <p>Cách này giải quyết được vấn đề OOV vì bất kỳ từ mới nào cũng có thể được biểu diễn bằng các ký tự có sẵn. Vocabulary trở nên cực kỳ nhỏ gọn, chỉ khoảng 50-200 tokens tùy ngôn ngữ. Tuy nhiên, cái giá phải trả là sequence trở nên rất dài — một từ 5 ký tự trở thành 5 tokens, một câu 20 từ có thể trở thành 100 tokens. Điều này khiến việc học các patterns ngữ nghĩa ở level ký tự trở nên khó khăn hơn nhiều, đồng thời tốn kém tài nguyên compute và bộ nhớ trong quá trình training.</p>

  <h5>c) Subword-Level Tokenization — Cân bằng giữa từ và ký tự</h5>

  <p>Nhìn vào hai phương pháp trên, ta thấy có một trade-off rõ ràng: Word-Level giữ được ngữ nghĩa nhưng gặp vấn đề OOV và vocabulary quá lớn, trong khi Character-Level giải quyết OOV nhưng sequence quá dài và khó học. Subword-Level Tokenization chính là giải pháp lai, tìm cách cân bằng giữa hai thái cực này.</p>

  <p>Ý tưởng cốt lõi rất đơn giản: thay vì giữ nguyên từ hoặc chia nhỏ hoàn toàn thành ký tự, ta sẽ tự động tìm ra mức độ chia tối ưu dựa trên tần suất xuất hiện của các đơn vị trong dữ liệu huấn luyện. Những từ phổ biến (xuất hiện nhiều lần) sẽ được giữ nguyên thành một token duy nhất, những từ hiếm sẽ bị tách thành nhiều subwords nhỏ hơn, và những từ hoàn toàn mới có thể được tách đến mức chỉ còn ký tự. Đây là phương pháp tiêu chuẩn trong hầu hết các mô hình Transformer hiện đại như BERT, GPT, T5 hay LLaMA.</p>

  <p>Ví dụ với từ "unhappiness", Word-Level sẽ giữ nguyên nếu có trong vocabulary hoặc thay bằng [UNK] nếu không có, trong khi các thuật toán subword sẽ tách nó thành các đơn vị nhỏ hơn như ["un", "happi", "ness"] với BPE hoặc ["un", "happi", "##ness"] với WordPiece (ký tự ## biểu thị đây là phần tiếp theo của từ trước đó). Cách này vừa giải quyết được OOV — vì bất kỳ từ mới nào cũng có thể được tách từ các subwords đã có trong vocabulary — vừa giữ được sequence ở độ dài hợp lý.</p>

  <!-- So sánh các thuật toán Subword -->
  <h4>1.2.3. Subword-Level Tokenization</h4>

  <p>Có 3 thuật toán subword phổ biến nhất, mỗi thuật toán có cách tiếp cận khác nhau để tìm ra mức độ chia tối ưu.</p>

  <p><strong>BPE (Byte Pair Encoding)</strong> là thuật toán đơn giản nhất, được phát minh từ năm 1994 như một phương pháp nén dữ liệu. BPE hoạt động bằng cách tìm cặp tokens xuất hiện nhiều nhất trong corpus và gộp chúng thành một token mới, lặp lại cho đến khi đạt vocabulary size mong muốn. Thuật toán này được GPT, GPT-2, GPT-3 và LLaMA sử dụng.</p>

  <p><strong>WordPiece</strong> phức tạp hơn BPE. Thay vì chọn cặp xuất hiện nhiều nhất, nó chọn cặp có likelihood cao nhất dựa trên language model — cách này chính xác hơn nhưng chậm hơn. Đây là lựa chọn của BERT, DistilBERT và Electra.</p>

  <p><strong>SentencePiece</strong> khác biệt ở chỗ nó không cần pre-tokenize (tự xử lý space như ký tự bình thường), đồng thời hỗ trợ subword regularization (thêm noise khi train) — phù hợp với multilingual models như T5, ALBERT, mBERT, XLNet.</p>

  <p>Ví dụ với từ "unhappiness", BPE tách thành ["un", "happi", "ness"], WordPiece tách thành ["un", "happi", "##ness"] (ký tự ## biểu thị đây là phần tiếp theo của từ trước), còn SentencePiece cũng tách thành ["un", "happi", "ness"] như BPE.</p>

  <p>Tổng quan, BPE phù hợp cho text generation vì đơn giản và nhanh, WordPiece phù hợp cho classification vì độ chính cao, còn SentencePiece phù hợp cho multilingual models vì không phụ thuộc vào cách tokenize của từng ngôn ngữ.</p>

  <p>Về ưu nhược điểm, subword tokenization giải quyết được vấn đề OOV — bất kỳ từ mới nào cũng có thể được tách từ các subwords đã có trong vocabulary. Vocabulary size cũng ở mức vừa phải (30-50K tokens) thay vì hàng triệu như word-level. Tuy nhiên, cách này phức tạp hơn word-level và việc tokenization tốn thời gian hơn. Ngoài ra, một số từ bị tách ra có thể mất đi ngữ nghĩa gốc — ví dụ "eating" có thể bị tách thành ["eat", "##ing"], model vẫn hiểu nhưng không còn nguyên vẹn như một từ.</p>

  <p>Để hiểu rõ hơn, xem ví dụ thực tế với corpus gồm các từ "running", "runner", "runs", "unhappiness", "happily" trong hình dưới đây:</p>

  <div class="image-showcase">
    <img src="/images/ch23/bpe_visualizer.png" alt="BPE Tokenization Example" />
    <div class="image-caption">Hình: Ví dụ BPE Tokenization — Model học được morphological patterns từ dữ liệu huấn luyện</div>
  </div>

  <p>Quan sát hình trên cho thấy model có thể học được mối quan hệ giữa các từ cùng gốc — "run" + "##ning", "##ner", "##s" đều liên quan đến hành động chạy, "happi" + "ly", "ness" liên quan đến trạng thái vui vẻ. Đây chính là khả năng học morphological patterns mà word-level và character-level không có được.</p>

  <h5>c) Chi tiết thuật toán BPE</h5>

  <p>BPE được phát minh bởi Gage năm 1994 như một thuật toán nén dữ liệu. Ý tưởng rất đơn giản: thay thế cặp ký tự xuất hiện nhiều nhất bằng một ký tự mới, từ đó giảm kích thước file vì các cặp phổ biến được biểu diễn gọn hơn. Đến năm 2016, các nhà nghiên cứu nhận ra ý tưởng này có thể áp dụng cho NLP — thay vì nén text, ta dùng nó để tự động tạo vocabulary tối ưu. Đây là lý do GPT, GPT-2, GPT-3 và LLaMA đều sử dụng BPE.</p>

  <p>Về mặt thuật toán, BPE hoạt động theo 3 bước lặp đi lặp lại. Đầu tiên, ta khởi tạo vocabulary với tất cả các ký tự đơn có trong corpus. Tiếp theo, ta đếm tần suất của tất cả các cặp tokens liên tiếp (ví dụ "th", "he", "en" trong từ "then"), tìm cặp xuất hiện nhiều nhất, và gộp chúng thành một token mới được thêm vào vocabulary. Cuối cùng, ta cập nhật corpus bằng cách thay thế cặp cũ bằng token mới vừa tạo. Quá trình này lặp lại cho đến khi vocabulary đạt kích thước mong muốn (thường là 30-50K tokens). Kết quả là những từ xuất hiện nhiều lần như "the" sẽ được ghép thành một token duy nhất, trong khi những từ hiếm như "unhappiness" sẽ bị tách thành "un" + "happi" + "ness" — tự động tìm ra mức độ chia tối ưu dựa trên dữ liệu huấn luyện.</p>

  <p style="margin: 16px 0 8px 0;"><strong>Pseudocode:</strong></p>

  <div class="formula-block-small" style="text-align: left;">
    <strong>Thuật toán BPE (Pseudocode)</strong>
    <pre style="background: var(--bg-soft); padding: 16px; border-radius: 8px; overflow-x: auto; margin-top: 12px; font-size: 0.8rem;"><code># Input: corpus (danh sách các từ), vocab_size (kích thước vocabulary mong muốn)
# Output: vocabulary (danh sách các tokens)

# Bước 1: Khởi tạo vocabulary với các ký tự đơn
vocabulary = get_all_unique_characters(corpus)

WHILE length(vocabulary) < vocab_size DO
    # Bước 2: Đếm tần suất của mỗi cặp tokens
    pairs = count_all_pairs(corpus)

    # Bước 3: Tìm cặp phổ biến nhất
    most_frequent_pair = find_most_frequent(pairs)

    # Bước 4: Gộp cặp đó thành token mới
    new_token = merge_pair(most_frequent_pair)
    vocabulary.add(new_token)

    # Cập nhật corpus: thay thế cặp cũ bằng token mới
    corpus = replace_pairs_in_corpus(corpus, most_frequent_pair, new_token)
END WHILE

RETURN vocabulary</code></pre>
  </div>

  <p style="margin: 24px 0 8px 0;"><strong>Ví dụ chi tiết với Corpus gồm nhiều từ:</strong></p>

  <p>Giả sử ta có corpus gồm các từ sau (đã được lowercase và tách thành characters):</p>

  <div class="formula-block-small" style="text-align: left;">
    <strong>Corpus ban đầu:</strong>
    <p style="margin-top: 8px; font-family: var(--font-mono); font-size: 0.85rem;">
      "low", "low", "low", "lower", "lowest", "lower"<br/>
      → Character-level: ["l","o","w"], ["l","o","w"], ["l","o","w"], ["l","o","w","e","r"], ["l","o","w","e","s","t"], ["l","o","w","e","r"]
    </p>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <p style="font-weight: 600; margin-bottom: 8px;">Lần 1: Tìm cặp phổ biến nhất</p>
      <p style="font-size: 0.9rem;">Đếm tất cả các cặp trong corpus:</p>
      <table style="width: 100%; font-size: 0.8rem; margin-top: 8px;">
        <tr><td>"lo": 6 lần</td><td>"ow": 6 lần</td></tr>
        <tr><td>"we": 3 lần</td><td>"er": 3 lần</td></tr>
        <tr><td>"st": 1 lần</td><td>"es": 1 lần</td></tr>
      </table>
      <p style="font-size: 0.85rem; color: var(--color-purple); margin-top: 8px;">→ Cặp phổ biến nhất: "lo" và "ow" (cùng 6 lần)</p>
    </div>
    <div class="concept-card">
      <p style="font-weight: 600; margin-bottom: 8px;">Lần 1: Gộp "lo" → "low"</p>
      <p style="font-size: 0.9rem;">Gộp cặp "lo" thành token mới:</p>
      <p style="font-family: var(--font-mono); font-size: 0.85rem; margin-top: 8px;">"lo" → "low"</p>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">Vocabulary thêm: <strong>"low"</strong></p>
      <p style="font-size: 0.85rem; color: var(--text-muted);">Corpus mới: ["low","w"], ["low","w"], ["low","w"], ["low","w","e","r"], ["low","w","e","s","t"], ["low","w","e","r"]</p>
    </div>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <p style="font-weight: 600; margin-bottom: 8px;">Lần 2: Tiếp tục tìm cặp</p>
      <p style="font-size: 0.9rem;">Đếm lại các cặp:</p>
      <table style="width: 100%; font-size: 0.8rem; margin-top: 8px;">
        <tr><td>"ow": 6 lần</td><td>"we": 3 lần</td></tr>
        <tr><td>"er": 3 lần</td><td>"es": 1 lần</td></tr>
        <tr><td>"st": 1 lần</td><td></td></tr>
      </table>
      <p style="font-size: 0.85rem; color: var(--color-purple); margin-top: 8px;">→ Cặp phổ biến nhất: "ow" (6 lần)</p>
    </div>
    <div class="concept-card">
      <p style="font-weight: 600; margin-bottom: 8px;">Lần 2: Gộp "ow" → "low"</p>
      <p style="font-size: 0.9rem;">Gộp "ow" thành token mới:</p>
      <p style="font-family: var(--font-mono); font-size: 0.85rem; margin-top: 8px;">"ow" → "low" (gộp vào token "low" đã có!)</p>
      <p style="font-size: 0.85rem; color: var(--color-purple); margin-top: 8px;">→ Từ "low" xuất hiện 6 lần, nên được giữ nguyên!</p>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">Corpus mới: ["low"], ["low"], ["low"], ["low","e","r"], ["low","e","s","t"], ["low","e","r"]</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">lightbulb</span>
    <div class="callout-content">
      <span class="callout-title">Quan sát quan trọng!</span>
      <ul>
        <li>"low" xuất hiện 6 lần → trở thành 1 token hoàn chỉnh</li>
        <li>"er" xuất hiện 3 lần → vẫn tách riêng</li>
        <li>"est" chỉ xuất hiện 1 lần → không đủ phổ biến để gộp</li>
      </ul>
    </div>
  </div>

  <p style="margin: 24px 0 8px 0;"><strong>Tại sao BPE hiệu quả?</strong></p>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Loại từ</th>
        <th>Cách xử lý</th>
        <th>Ví dụ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Từ phổ biến</strong></td>
        <td>Giữ nguyên thành 1 token</td>
        <td>"the", "is", "low" → 1 token</td>
      </tr>
      <tr>
        <td><strong>Từ hiếm</strong></td>
        <td>Tách thành subwords</td>
        <td>"unhappiness" → ["un", "happi", "ness"]</td>
      </tr>
      <tr>
        <td><strong>Từ hoàn toàn mới</strong></td>
        <td>Tách đến khi thành characters</td>
        <td>"XYZ123" → ["X", "Y", "Z", "1", "2", "3"]</td>
      </tr>
    </tbody>
  </table>

  <div class="callout callout-warning">
    <span class="material-symbols-outlined">warning</span>
    <div class="callout-content">
      <span class="callout-title">Vocab Size quan trọng như thế nào?</span>
      <ul>
        <li><strong>Vocab nhỏ (10K)</strong>: Nhiều từ bị tách nhỏ → sequence dài, model khó học</li>
        <li><strong>Vocab lớn (50K)</strong>: Từ phổ biến giữ nguyên → sequence ngắn, hiệu quả</li>
        <li><strong>Vocab quá lớn (100K+)</strong>: Rare tokens chiếm memory, có thể overfit</li>
      </ul>
    </div>
  </div>

  <h5>d) Vocabulary và Special Tokens</h5>

  <p>Mỗi model có một <strong>Vocabulary cố định</strong> — danh sách tất cả tokens mà model hiểu. Ngoài các từ thông thường, vocab còn chứa các <strong>special tokens</strong>:</p>

  <div class="formula-block-small" style="text-align: left;">
    <strong>Vocabulary Structure (ví dụ GPT-2, vocab size = 50257):</strong>
    <pre style="background: var(--bg-soft); padding: 16px; border-radius: 8px; overflow-x: auto; margin-top: 12px; font-size: 0.85rem;"><code>{
  0:   "[PAD]"  # Padding - đệm câu ngắn
  1:   "[UNK]"  # Unknown - từ không nhận diện
  2:   "[BOS]"  # Beginning of Sequence
  3:   "[EOS]"  # End of Sequence
  4:   "[CLS]"  # Classification (BERT)
  5:   "[SEP]"  # Separator
  6:   "[MASK]" # Mask (BERT)
  ...
  50256: "hello"
}</code></pre>
  </div>

  <div class="concept-grid">
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">padding</span></div>
      <p style="font-weight: 600; margin-bottom: 8px;">[PAD] — Padding</p>
      <p>Đệm câu ngắn để batch có cùng độ dài. Thường được bỏ qua trong attention.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">help</span></div>
      <p style="font-weight: 600; margin-bottom: 8px;">[UNK] — Unknown</p>
      <p>Thay thế từ không có trong vocab. Subword giảm thiểu [UNK] đáng kể.</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">first_page</span></div>
      <p style="font-weight: 600; margin-bottom: 8px;">[BOS] / [SOS]</p>
      <p>Bắt đầu sequence. Cho model biết "bắt đầu từ đây".</p>
    </div>
    <div class="concept-card">
      <div class="concept-icon"><span class="material-symbols-outlined">last_page</span></div>
      <p style="font-weight: 600; margin-bottom: 8px;">[EOS] / [SEP]</p>
      <p>Kết thúc sequence hoặc phân cách 2 câu (trong pair tasks).</p>
    </div>
  </div>

  <div class="callout callout-tip">
    <span class="material-symbols-outlined">lightbulb</span>
    <div class="callout-content">
      <span class="callout-title">Tokenizer trong thực tế</span>
      <p>Các model hiện đại sử dụng pre-trained tokenizers:</p>
      <ul>
        <li><strong>GPT-2:</strong> BPE, vocab=50257</li>
        <li><strong>BERT:</strong> WordPiece, vocab=30522</li>
        <li><strong>LLaMA:</strong> SentencePiece, vocab=32000</li>
        <li><strong>T5:</strong> SentencePiece, vocab=32128</li>
      </ul>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">Tóm tắt luồng xử lý</span>
    <p><strong>Text → Tokenization → Token IDs → Embedding Layer → Token Embeddings</strong></p>
    <ol>
      <li>Input text: <code>"Con mèo"</code></li>
      <li>Tokenizer chia: <code>["Con", "mèo"]</code></li>
      <li>Map sang IDs: <code>[142, 879]</code></li>
      <li>Embedding lookup: <code>E[142], E[879]</code> (mỗi cái là vector $d_{model}$ chiều)</li>
      <li>Final input: <code>[embedding_142, embedding_879]</code></li>
    </ol>
  </div>

  <h3>1.3. Các tham số embedding</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Tham số</th>
        <th>Giá trị (Base)</th>
        <th>Giá trị (Big)</th>
        <th>Ý nghĩa</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Vocabulary size |V|</strong></td>
        <td>~30,000-50,000</td>
        <td>~50,000-100,000</td>
        <td>Số tokens trong từ điển</td>
      </tr>
      <tr>
        <td><strong>Embedding dim</strong></td>
        <td>512</td>
        <td>1024</td>
        <td>Kích thước vector mỗi token</td>
      </tr>
      <tr>
        <td><strong>Parameters</strong></td>
        <td>~15-25M</td>
        <td>~50-100M</td>
        <td>$|V| \\times d_{model}$</td>
      </tr>
    </tbody>
  </table>

  <div class="definition-block">
    <span class="definition-term">Embedding được học như thế nào?</span>
    <p>Giống như Word2Vec, embedding matrix $E$ là <strong>learnable parameter</strong>. Trong quá trình training, gradient backpropagation qua toàn bộ network sẽ cập nhật $E$ để embedding reflect ngữ nghĩa (từ相近 có embedding gần nhau trong không gian vector).</p>
  </div>

  <p>Về mặt toán học, embedding layer đơn giản là một <strong>linear transformation</strong> với ma trận trọng số $E \in \mathbb{R}^{|V| \times d_{model}}$. Khi nhận vào token ID, ta thực hiện phép tra cứu (lookup) để lấy hàng tương ứng trong ma trận. Đây là cách implement hiệu quả nhất vì không cần one-hot encode trước — thay vì nhân ma trận $E$ với vector one-hot (toàn số 0 trừ 1 vị trí), ta trực tiếp index vào hàng tương ứng. PyTorch gọi đây là <code>nn.Embedding</code>, TensorFlow gọi là <code>tf.keras.layers.Embedding</code>.</p>

  <p>Việc chọn vocabulary size là một bài toán tối ưu hóa. Nếu vocabulary quá nhỏ (dưới 10,000 tokens), phần lớn từ sẽ bị tách nhỏ thành nhiều subwords, khiến sequence trở nên dài và model khó học các patterns ngữ nghĩa. Ngược lại, vocabulary quá lớn (trên 100,000) sẽ tạo ra nhiều rare tokens xuất hiện rất ít trong dữ liệu huấn luyện, gây lãng phí bộ nhớ và có thể dẫn đến overfitting. Các model hiện đại như BERT dùng 30,522 tokens, GPT-2 dùng 50,257 tokens, LLaMA dùng 32,000 tokens — con số 30-50K được coi là sweet spot cho hầu hết ứng dụng.</p>

  <p>Embedding dimension $d_{model}$ quyết định <strong>model capacity</strong> — khả năng biểu diễn các relationships phức tạp giữa concepts. Dimension nhỏ (128-256) như trong RNN truyền thống limit khả năng capture nuanced relationships, trong khi dimension lớn (512-1024) cho phép model học được nhiều patterns hơn nhưng đòi hỏi nhiều dữ liệu và compute hơn. Transformer "Attention Is All You Need" gốc dùng $d_{model}=512$, các phiên bản "big" dùng 1024. Công thức tính số parameters cho embedding layer là $|V| \times d_{model}$ — với vocab 30K và dim 512, ta có khoảng 15.3 triệu parameters, chiếm khoảng 10-20% tổng số parameters của toàn model.</p>

  <p>Một câu hỏi quan trọng trong thực hành là <strong>fine-tune hay freeze embedding</strong>. Trong nhiều trường hợp, người ta sử dụng pretrained embeddings (Word2Vec, GloVe, FastText) và giữ nguyên (freeze) trong quá trình huấn luyện model mới — cách này tiết kiệm compute và hiệu quả khi dữ liệu huấn luyện hạn chế. Tuy nhiên, nếu domain của task mới khác biệt đáng kể so với dữ liệu pretrained (ví dụ: biomedical text vs general text), việc fine-tune embedding (cho phép cập nhật weights) thường cho kết quả tốt hơn vì model có thể học representations phù hợp với domain mới.</p>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 2: VẤN ĐỀ VỊ TRÍ
  // ==========================================================
  {
    id: 'ch23_02_02',
    title: '2. Vấn đề vị trí — Self-Attention không biết thứ tự',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>2. Tại sao cần Positional Encoding?</h2>

  <h3>2.1. Self-Attention là phép toán "bag of words"</h3>

  <div class="callout callout-warning">
    <div class="callout-content">
      <span class="callout-title">Permutation Invariance — nhược điểm ẩn</span>
      <p>Self-Attention tính $\\text{softmax}(QK^T/\\sqrt{d_k})V$ — chỉ phụ thuộc vào <strong>nội dung</strong> các token, không phụ thuộc <strong>vị trí</strong>. Nếu hoán đổi thứ tự input: "mèo cắn chó" vs "chó cắn mèo" → Self-Attention cho <strong>cùng output</strong>!</p>
    </div>
  </div>

  <div class="definition-block">
    <span class="definition-term">So sánh: RNN tự biết vị trí</span>
    <p>RNN xử lý <strong>tuần tự</strong>: $h_t = f(h_{t-1}, x_t)$. Token thứ 3 nhận hidden state đã qua 2 tokens trước → <strong>vị trí được mã hóa ngầm</strong> trong hidden state.</p>
    <p>Transformer <strong>bỏ recurrence</strong> → mất thông tin vị trí → phải <strong>thêm vào explicitly</strong>.</p>
  </div>

  <h3>2.2. Giải pháp: Cộng vị trí vào embedding</h3>

  <div class="formula-block">
    <h4>Final Input:</h4>
    <p>$\text{Input}_i = \text{TokenEmbed}(x_i) + \text{PE}(\text{pos}_i)$</p>
    <p>Cộng (element-wise addition) giữa embedding và positional encoding. Cả 2 đều có kích thước $d_{model}$.</p>
  </div>

  <div class="image-showcase">
    <img src="/images/ch23/positional_encoding_concept.png" alt="Positional Encoding Concept" />
    <div class="image-caption">Hình 1: Token Embedding + Positional Encoding = Final Input</div>
  </div>
</div>
    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 3: SINUSOIDAL PE
  // ==========================================================
  {
    id: 'ch23_02_03',
    title: '3. Sinusoidal Positional Encoding — Công thức sin/cos',
    duration: '20 phút',
    type: 'theory',
    content: `
<div class="article-content">
<div class="article-content">
  <h2>3. Mã hóa vị trí Sinusoidal — Công thức sin/cos</h2>

  <p>Vaswani et al. (2017) đề xuất dùng hàm sin và cos với tần số khác nhau để mã hóa vị trí. Đây là phương pháp <strong>không cần học</strong> — hoàn toàn deterministic, có thể generalize cho sequences dài hơn training.</p>

  <h3>3.1. Công thức</h3>

  <div class="formula-block">
    <h4>Định nghĩa Sinusoidal PE:</h4>
    <p>$PE_{(pos, 2i)} = \\sin\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p>$PE_{(pos, 2i+1)} = \\cos\\left(\\frac{pos}{10000^{2i/d_{model}}}\\right)$</p>
    <p>Trong đó:</p>
    <ul>
      <li>$pos$ = vị trí token (0, 1, 2, ...)</li>
      <li>$i$ = chiều encoding (0, 1, ..., $d_{model}/2 - 1$)</li>
      <li>$d_{model}$ = kích thước embedding (thường là 512)</li>
    </ul>
  </div>

  <h3>3.2. Ý nghĩa hình học</h3>

  <div class="concept-grid">
    <div class="concept-card">
      <h4>Tần số giảm theo chiều</h4>
      <p>Chiều $i=0$: period = $2\\pi$ → tần số cao, thay đổi nhanh → phù hợp với vị trí gần nhau</p>
      <p>Chiều $i=d_{model}/2-1$: period = $2\\pi \\cdot 10000$ → tần số cực thấp, thay đổi rất chậm → phù hợp với vị trí xa</p>
      <p>Giống hệ thập phân: chữ số hàng đơn vị thay đổi liên tục, hàng nghìn thay đổi chậm.</p>
    </div>
    <div class="concept-card">
      <h4>Cặp sin-cos tạo tọa độ góc</h4>
      <p>Cặp $(PE_{2i}, PE_{2i+1}) = (\\sin(\\omega), \\/cos(\\omega))$ là một điểm trên <strong>đường tròn đơn vị</strong>.</p>
      <p>$PE_{pos+k}$ có thể biểu diễn từ $PE_{pos}$ qua <strong>phép biến đổi tuyến tính</strong> → model dễ dàng học được <strong>vị trí tương đối (relative position)</strong>.</p>
    </div>
  </div>

  <h3>3.3. Relative Position qua Sinusoidal</h3>

  <div class="definition-block">
    <span class="definition-term">Tại sao Sinusoidal encode relative position tốt?</span>
    <p>Dùng công thức cộng góc:</p>
    <p>$\\sin(a+b) = \\sin(a)\\cos(b) + \\cos(a)\\sin(b)$</p>
    <p>$\\cos(a+b) = \\cos(a)\\cos(b) - \\sin(a)\\sin(b)$</p>
    <p>Điều này có nghĩa: $PE_{pos+k}$ có thể được tính từ $PE_{pos}$ nhân với ma trận xoay. Model có thể học "khoảng cách $k$" thông qua weights.</p>
  </div>

  <h3>3.4. Minh họa trực quan</h3>

  <div class="image-showcase">
    <img src="/images/ch23/positional_encoding_heatmap.png" alt="Positional Encoding Heatmap" />
    <div class="image-caption">Hình 2: Heatmap Sinusoidal PE — 128 positions × 64 dims. Trục X: chiều encoding (tần số giảm dần). Trục Y: vị trí token</div>
  </div>

  <h3>3.5. Ví dụ số cụ thể</h3>

  <div class="definition-block">
    <span class="definition-term">Tính toán với $d_{model} = 4$, positions 0, 1, 2</span>
    <p>Với $i = 0$: tần số $\\omega = 1/10000^0 = 1$</p>
    <p>Với $i = 1$: tần số $\\omega = 1/10000^{2/4} = 1/10000^{0.5} = 1/100 = 0.01$</p>
    <p><strong>Position 0:</strong></p>
    <p>$PE(0) = [\\sin(0), \\/cos(0), \\sin(0), \\cos(0)] = [0, 1, 0, 1]$</p>
    <p><strong>Position 1:</strong></p>
    <p>$PE(1) = [\\sin(1), \\/cos(1), \\sin(0.01), \\cos(0.01)] = [0.84, 0.54, 0.01, 1.00]$</p>
    <p><strong>Position 2:</strong></p>
    <p>$PE(2) = [\\sin(2), \\/cos(2), \\sin(0.02), \\cos(0.02)] = [0.91, -0.42, 0.02, 1.00]$</p>
    <p><strong>Nhận xét:</strong></p>
    <ul>
      <li>Chiều 0-1 (tần số cao): thay đổi mạnh qua mỗi position</li>
      <li>Chiều 2-3 (tần số thấp): thay đổi rất chậm</li>
    </ul>
  </div>

  <h3>3.6. Ưu và nhược điểm</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Ưu điểm</th>
        <th>Nhược điểm</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Không cần học, không tốn tham số</td>
        <td>Encode absolute position, không phải relative</td>
      </tr>
      <tr>
        <td>Extrapolate được cho sequence dài hơn training</td>
        <td>Không có bias cho position > max_len</td>
      </tr>
      <tr>
        <td>Relative position được encode ngầm qua sin/cos relationship</td>
        <td>Khó học position > 1000 hiệu quả</td>
      </tr>
    </tbody>
  </table>
</div>

    `,
    defaultCode: ''
  },
  // ==========================================================
  // LESSON 4: CÁC LOẠI PE KHÁC
  // ==========================================================
  {
    id: 'ch23_02_04',
    title: '4. Learned PE, RoPE — Xu hướng hiện đại',
    duration: '10 phút',
    type: 'theory',
    content: `
<div class="article-content">
  <h2>4. Các phương pháp Positional Encoding khác</h2>

  <h3>4.1. Learned Positional Embedding</h3>

  <div class="definition-block">
    <span class="definition-term">Học vị trí thay vì tính</span>
    <p>Thay vì dùng sin/cos cố định, tạo ma trận $P \\in \\mathbb{R}^{T_{max} \\times d_{model}}$ làm <strong>learnable parameter</strong>. Mỗi hàng là PE cho 1 vị trí, được cập nhật qua SGD như weight thường.</p>
    <p>Dùng trong: <strong>BERT</strong>, <strong>GPT-2</strong>. Nhược điểm: không generalize được cho sequences dài hơn $T_{max}$ trong training.</p>
  </div>

  <h3>4.2. RoPE — Rotary Position Embedding</h3>

  <div class="definition-block">
    <span class="definition-term">Su et al., 2021 — Dùng trong LLaMA, Gemma, Mistral</span>
    <p>Thay vì <strong>cộng</strong> PE vào embedding, RoPE <strong>xoay</strong> (rotate) Q và K vectors theo vị trí:</p>
    <p>$q'_m = R_\\theta(m) \\cdot q_m$, &nbsp; $k'_n = R_\\theta(n) \\cdot k_n$</p>
    <p>Trong đó $R_\\theta(m)$ là ma trận xoay theo góc $m \\cdot \\theta_i$. Ưu điểm: $q'_m \\cdot k'_n$ chỉ phụ thuộc vào <strong>khoảng cách tương đối $m - n$</strong> → tự nhiên encode relative position.</p>
  </div>

  <h3>4.3. So sánh</h3>

  <table class="comparison-table">
    <thead>
      <tr>
        <th>Phương pháp</th>
        <th>Dùng trong</th>
        <th>Absolute/Relative</th>
        <th>Extrapolate?</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Sinusoidal</strong></td>
        <td>Transformer gốc</td>
        <td>Absolute</td>
        <td>Có (lý thuyết)</td>
      </tr>
      <tr>
        <td><strong>Learned</strong></td>
        <td>BERT, GPT-2</td>
        <td>Absolute</td>
        <td>Không</td>
      </tr>
      <tr>
        <td><strong>RoPE</strong></td>
        <td>LLaMA, Gemma, Mistral</td>
        <td>Relative</td>
        <td>Tốt hơn (với NTK scaling)</td>
      </tr>
      <tr>
        <td><strong>ALiBi</strong></td>
        <td>BLOOM</td>
        <td>Relative (bias)</td>
        <td>Tốt</td>
      </tr>
    </tbody>
  </table>
</div>
    `,
    defaultCode: ''
  },
];

const ch23_02: Chapter = {
  id: 'ch23_02',
  title: '23.2. Input Processing — Embedding & Positional Encoding',
  introduction: 'Token Embedding, Positional Encoding (Sinusoidal sin/cos), Learned PE, RoPE — cách Transformer biết thứ tự tokens.',
  lessons: ch23_02_lessons,
};

export default ch23_02;
