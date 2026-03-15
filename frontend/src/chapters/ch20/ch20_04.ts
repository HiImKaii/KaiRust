import { Lesson } from '../../courses';

export const ch20_04: Lesson = {
            id: '20-04',
            title: '20.4 Advanced Functions và Closures',
            duration: '30 phút',
            type: 'theory',
            content: `
<p>Phần này khám phá một số tính năng nâng cao liên quan đến functions và closures, bao gồm function pointers và returning closures.</p>

<h3 class="task-heading">Function Pointers</h3>
<p>Chúng ta đã nói về cách truyền closures cho functions; bạn cũng có thể truyền regular functions cho functions! Kỹ thuật này hữu ích khi bạn muốn truyền một function bạn đã định nghĩa thay vì định nghĩa một closure mới. Functions coerce thành kiểu fn (với chữ f viết thường), không nên nhầm lẫn với Fn closure trait. Kiểu fn được gọi là function pointer. Truyền functions với function pointers sẽ cho phép bạn sử dụng functions như arguments cho các functions khác.</p>

<p>Cú pháp để chỉ định rằng một parameter là một function pointer tương tự như của closures, như được hiển thị trong Listing 20-28, nơi chúng ta đã định nghĩa một function add_one thêm 1 vào parameter của nó. Function do_twice nhận hai parameters: một function pointer đến bất kỳ function nào nhận một i32 parameter và trả về một i32, và một giá trị i32. Function do_twice gọi function f hai lần, truyền cho nó giá trị arg, sau đó cộng hai kết quả function call lại với nhau. Function main gọi do_twice với các arguments add_one và 5.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

fn main() {
    let answer = do_twice(add_one, 5);

    println!("The answer is: {answer}");
}</code></pre>
</div>
<p><em>Listing 20-28: Sử dụng kiểu fn để chấp nhận một function pointer như một argument</em></p>

<p>Code này in "The answer is: 12". Chúng ta chỉ định rằng parameter f trong do_twice là một fn nhận một parameter có kiểu i32 và trả về một i32. Sau đó chúng ta có thể gọi f trong body của do_twice. Trong main, chúng ta có thể truyền tên function add_one làm argument đầu tiên cho do_twice.</p>

<p>Không giống như closures, fn là một kiểu thay vì một trait, vì vậy chúng ta chỉ định fn như kiểu parameter trực tiếp thay vì khai báo một generic type parameter với một trong các Fn traits như một trait bound.</p>

<p>Function pointers implement tất cả ba closure traits (Fn, FnMut, và FnOnce), có nghĩa là bạn luôn có thể truyền một function pointer như một argument cho một function mong đợi một closure. Tốt nhất là viết functions sử dụng một generic type và một trong các closure traits để functions của bạn có thể chấp nhận hoặc functions hoặc closures.</p>

<p>Tuy nhiên, một ví dụ về nơi bạn chỉ muốn chấp nhận fn và không phải closures là khi giao diện với external code không có closures: C functions có thể nhận functions như arguments, nhưng C không có closures.</p>

<p>Như một ví dụ về nơi bạn có thể sử dụng một closure được định nghĩa inline hoặc một named function, hãy xem xét một ví dụ về method map được cung cấp bởi Iterator trait trong thư viện chuẩn. Để sử dụng method map để chuyển một vector của numbers thành một vector của strings, chúng ta có thể sử dụng một closure, như trong Listing 20-29.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec&lt;String&gt; =
    list_of_numbers.iter().map(|i| i.to_string()).collect();</code></pre>
</div>
<p><em>Listing 20-29: Sử dụng một closure với method map để chuyển numbers thành strings</em></p>

<p>Hoặc chúng ta có thể đặt tên một function như argument cho map thay vì closure. Listing 20-30 cho thấy điều này sẽ trông như thế nào.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec&lt;String&gt; =
    list_of_numbers.iter().map(ToString::to_string).collect();</code></pre>
</div>
<p><em>Listing 20-30: Sử dụng function ToString::to_string với method map để chuyển numbers thành strings</em></p>

<p>Lưu ý rằng chúng ta phải sử dụng fully qualified syntax mà chúng ta đã nói trong phần "Advanced Traits" vì có nhiều functions available có tên là to_string.</p>

<p>Ở đây, chúng ta đang sử dụng function to_string được định nghĩa trong ToString trait, mà thư viện chuẩn đã implement cho bất kỳ type nào implement Display.</p>

<p>Nhớ lại từ phần "Enum Values" trong Chương 6 rằng tên của mỗi enum variant mà chúng ta định nghĩa cũng trở thành một initializer function. Chúng ta có thể sử dụng các initializer functions này như function pointers mà implement các closure traits, có nghĩa là chúng ta có thể chỉ định các initializer functions như arguments cho các methods mong đợi closures, như được thấy trong Listing 20-31.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>enum Status {
    Value(u32),
    Stop,
}

let list_of_statuses: Vec&lt;Status&gt; = (0u32..20).map(Status::Value).collect();</code></pre>
</div>
<p><em>Listing 20-31: Sử dụng một enum initializer với method map để tạo một Status instance từ numbers</em></p>

<h3 class="task-heading">Returning Closures</h3>
<p>Closures được đại diện bởi traits, có nghĩa là bạn không thể return closures trực tiếp. Trong hầu hết các trường hợp bạn muốn return một trait, bạn có thể sử dụng concrete type implement trait đó như giá trị trả về của function. Tuy nhiên, bạn thường không thể làm điều đó với closures vì chúng không có một concrete type có thể return; bạn không được phép sử dụng function pointer fn như một return type nếu closure capture bất kỳ giá trị nào từ scope của nó.</p>

<p>Thay vào đó, bạn thường sử dụng cú pháp impl Trait mà chúng ta đã học trong Chương 10. Bạn có thể return bất kỳ function type nào, sử dụng Fn, FnOnce, và FnMut. Ví dụ, code trong Listing 20-32 sẽ biên dịch tốt.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn returns_closure() -> impl Fn(i32) -> i32 {
    |x| x + 1
}</code></pre>
</div>
<p><em>Listing 20-32: Returning một closure từ một function sử dụng cú pháp impl Trait</em></p>

<p>Tuy nhiên, như chúng ta đã lưu ý trong phần "Inferring and Annotating Closure Types" trong Chương 13, mỗi closure cũng là type riêng biệt của nó. Nếu bạn cần làm việc với nhiều functions có cùng signature nhưng implementations khác nhau, bạn sẽ cần sử dụng một trait object cho chúng.</p>

<div class="code-snippet">
  <span class="code-lang">rust</span>
  <pre><code>fn returns_closure() -> Box&lt;dyn Fn(i32) -> i32&gt; {
    Box::new(|x| x + 1)
}

fn returns_initialized_closure(init: i32) -> Box&lt;dyn Fn(i32) -> i32&gt; {
    Box::new(move |x| x + init)
}</code></pre>
</div>
<p><em>Listing 20-34: Tạo một Vec&lt;T&gt; của closures được định nghĩa bởi functions trả về Box&lt;dyn Fn&gt; để chúng có cùng kiểu</em></p>

<p>Code này sẽ biên dịch tốt. Để biết thêm về trait objects, tham khảo phần "Using Trait Objects To Abstract over Shared Behavior" trong Chương 18.</p>
`,
            defaultCode: `// Function Pointers Examples

fn add_one(x: i32) -> i32 {
    x + 1
}

fn add_two(x: i32) -> i32 {
    x + 2
}

fn do_three_times(f: fn(i32) -> i32, value: i32) -> i32 {
    f(f(f(value)))
}

// Returning Closures
fn returns_closure() -> impl Fn(i32) -> i32 {
    |x| x + 1
}

fn returns_closure_with_capture(init: i32) -> impl Fn(i32) -> i32 + 'static {
    move |x| x + init
}

// Using Box<dyn Fn> for multiple closures
fn return_boxed_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x * 2)
}

fn main() {
    // Function Pointers
    let num = 5;
    let result = do_three_times(add_one, num);
    println!("{} + 1 + 1 + 1 = {}", num, result);

    // Using function pointers with map
    let numbers = vec![1, 2, 3, 4, 5];
    let strings: Vec<String> = numbers.iter().map(|i| i.to_string()).collect();
    println!("Numbers as strings: {:?}", strings);

    // Using named function with map
    let numbers2 = vec![1, 2, 3];
    let squared: Vec<i32> = numbers2.iter().map(|&x| x * x).collect();
    println!("Squared: {:?}", squared);

    // Returning Closures
    let closure = returns_closure();
    println!("Closure result: {}", closure(10));

    let closure2 = returns_closure_with_capture(100);
    println!("Closure with capture: {}", closure2(50));

    // Box<dyn Fn>
    let boxed_fn = return_boxed_closure();
    println!("Boxed closure: {}", boxed_fn(7));

    // Using closures with enums
    enum Status {
        Value(u32),
        Stop,
    }

    let statuses: Vec<Status> = (0u32..5).map(Status::Value).collect();
    println!("Status values: {:?}", statuses);

    println!("\\nAdvanced Functions & Closures completed!");
}
`,
            expectedOutput: `5 + 1 + 1 + 1 = 8
Numbers as strings: ["1", "2", "3", "4", "5"]
Squared: [1, 4, 9]
Closure result: 11
Closure with capture: 150
Boxed closure: 14
Status values: [Value(0), Value(1), Value(2), Value(3), Value(4)]

Advanced Functions & Closures completed!`
        };
