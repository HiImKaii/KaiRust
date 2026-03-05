import { Lesson } from '../../courses';

export const ch06_02: Lesson = {
            id: 'ch06-02',
            title: '6.2 Sức mạnh của match Control Flow',
            duration: '40 phút',
            type: 'practice',
            content: `
<p>Rust có một cấu trúc điều khiển luồng (Control flow construct) cực kì mạnh tên là <strong>match</strong>. Nó so sánh đối sánh giá trị của mình với một loạt các pattern khác và dùng code bên trong pattern tương đồng. Pattern được cung cấp có thể là literal, có thể là biến variable bình thường, wildcard,... Bạn có thể coi nó tương tự như bộ định tuyến tiền đúc (Coin Sorting Machine), nếu kích thước của tiền xu nào thả vào mà vừa vặn nhất cho nó, xu đó rớt vô chiếc rổ đó. Máy compile sẽ đi kiểm tra MỌI CÂU CHI TIẾT TỪ TRÊN XUỐNG DƯỚI nếu thấy trúng phóc thì chạy, ko trúng phóc thì xuống pattern tiếp.</p>

<h3 class="task-heading">Cú pháp cấu trúc Match</h3>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin { // So sánh với Coin enum
        Coin::Penny => { // Chạy một cặp ngoặc nhọn thực thi
            println!("Lucky penny!");
            1 // Implicit return
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}</code></pre>
</div>

<h3 class="task-heading">Giải Phóng Value bằng Match đối với Data Enum</h3>
<p>Điểm đáng sợ và mạnh chà bá của Match là mình có thể xài nó để Extract nốt các Data đang mắc kẹt nùi trong Variant của Enum.</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>#[derive(Debug)]
enum UsState {
    Alabama,
    Alaska,
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState), // Bây giờ Quarter nó nắm môt cái data UsState
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => { // Pattern bắt lấy cục state đem ra rút ruột và in
            println!("Quater này có nắm state là {:?}", state);
            25
        }
    }
}</code></pre>
</div>

<h3 class="task-heading">Matching cho Option&lt;T&gt;</h3>
<p>Như nãy mình có bàn thì Option&lt;T&gt; giấu giá trị của T vào bên trong Variant <code>Some</code>, do đó để rút value ra thì cái Match giải quyết cái rột!!!</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn plus_one(x: Option&lt;i32&gt;) -> Option&lt;i32&gt; {
    match x {
        None => None, // Nếu x truyền vào rỗng thì return nguyên bộ none
        Some(i) => Some(i + 1), // Nếu Some có value i32, tao bắt giá trị biến đó làm param cho i, rồi cộng i+1 sau đó nhét nó lại thành một Variant Some(i+1)
    }
}

let five = Some(5);
let six = plus_one(five); // ra Some(6)
let none = plus_one(None); // ra None
</code></pre>
</div>
<div class="cyber-alert info">
  <strong>Ghi nhớ siêu to khổng lồ của Option Match:</strong> Rust <strong>KHÔNG CHO PHÉP XÓT.</strong> Nếu bạn <code>match</code> một biến Option&lt;T&gt; mà quên không định nghĩa cái pattern Catch cho <code>None =&gt;</code>, Máy Compiler auto ERROR sập cấm Biên Dịch. Rust đã đánh hơi việc nếu ko có <code>None =&gt;</code> thì sẽ gây ra NullPtrError (thứ đã huỷ diệt tỷ đôla) ở runtime!!!!
</div>

<h3 class="task-heading">Pattern Catch-All</h3>
<p>Khi mà những biến mình ko cần check (nhiều quá). Tụi mình được quyền gom lại thành cái pattern bắt tụi còn dư (Catch-all) bằng việc đặt cho cái còn lại một cái tên rồi chạy nó ở Cuối Cùng. (Để ko cần xài lại biến dư - ta ghi bằng <code>_</code> Placeholder để vứt nó đi).</p>
<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let dice_roll = 9; // Biến xí ngầu
match dice_roll {
    3 => add_fancy_hat(),
    7 => remove_fancy_hat(),
    other => move_player(other), // nếu tui roll ra số 9, nó sẽ gọi move_player(9)
    // _ => reroll_dice(), // nếu tao ko cần xài số dư kia tui gán biến vô danh _ (tránh compiler error)
    // _ => (), // Nếu tụi bây muốn những con số kì lạ (không phải 3-7) bị bỏ rơi, trả về hàm () vô danh!
}</code></pre>
</div>
`,
            defaultCode: `fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn describe_number(n: i32) -> &'static str {
    match n {
        1 => "một",
        2 => "hai",
        3 => "ba",
        4..=10 => "từ bốn đến mười",
        _ => "khác", // wildcard (bắt mọi kết quả khác, nếu ko thì lỗi compile liền)
    }
}

fn main() {
    // Match với Option
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
    println!("five + 1 = {:?}", six);
    println!("None + 1 = {:?}", none);

    // Match với ranges
    for i in 0..12 {
        println!("{i} -> {}", describe_number(i));
    }
}
`,
            expectedOutput: 'five + 1 = Some(6)\nNone + 1 = None\n0 -> khác\n1 -> một\n2 -> hai\n3 -> ba\n4 -> từ bốn đến mười\n5 -> từ bốn đến mười\n6 -> từ bốn đến mười\n7 -> từ bốn đến mười\n8 -> từ bốn đến mười\n9 -> từ bốn đến mười\n10 -> từ bốn đến mười\n11 -> khác'
        };
