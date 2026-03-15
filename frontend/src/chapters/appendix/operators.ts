import { Lesson } from '../../courses';

export const operators: Lesson = {
            id: 'appendix-b',
            title: 'Appendix B: Operators và Symbols',
            duration: '45 phút',
            type: 'theory',
            content: `
<p>Phụ lục này chứa một glossary của cú pháp Rust, bao gồm operators và các symbols khác xuất hiện một mình hoặc trong ngữ cảnh của paths, generics, trait bounds, macros, attributes, comments, tuples, và brackets.</p>

<h3 class="task-heading">Operators</h3>
<p>Bảng B-1 chứa các operators trong Rust, một ví dụ về cách operator xuất hiện trong ngữ cảnh, một giải thích ngắn, và liệu operator đó có overloadable hay không. Nếu một operator có thể overload, trait relevant để sử dụng để overload operator đó được liệt kê.</p>

<h4 class="task-heading">Bảng B-1: Operators</h4>

<table>
  <thead>
    <tr>
      <th>Operator</th>
      <th>Ví dụ</th>
      <th>Giải thích</th>
      <th>Overloadable?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>!</td>
      <td>ident!(...), ident!{...}, ident![...]</td>
      <td>Macro expansion</td>
      <td></td>
    </tr>
    <tr>
      <td>!</td>
      <td>!expr</td>
      <td>Bitwise or logical complement</td>
      <td>Not</td>
    </tr>
    <tr>
      <td>!=</td>
      <td>expr != expr</td>
      <td>Nonequality comparison</td>
      <td>PartialEq</td>
    </tr>
    <tr>
      <td>%</td>
      <td>expr % expr</td>
      <td>Arithmetic remainder</td>
      <td>Rem</td>
    </tr>
    <tr>
      <td>%=</td>
      <td>var %= expr</td>
      <td>Arithmetic remainder and assignment</td>
      <td>RemAssign</td>
    </tr>
    <tr>
      <td>&</td>
      <td>&expr, &mut expr</td>
      <td>Borrow</td>
      <td></td>
    </tr>
    <tr>
      <td>&</td>
      <td>&type, &mut type, &'a type, &'a mut type</td>
      <td>Borrowed pointer type</td>
      <td></td>
    </tr>
    <tr>
      <td>&</td>
      <td>expr & expr</td>
      <td>Bitwise AND</td>
      <td>BitAnd</td>
    </tr>
    <tr>
      <td>&=</td>
      <td>var &= expr</td>
      <td>Bitwise AND and assignment</td>
      <td>BitAndAssign</td>
    </tr>
    <tr>
      <td>&&</td>
      <td>expr && expr</td>
      <td>Short-circuiting logical AND</td>
      <td></td>
    </tr>
    <tr>
      <td>*</td>
      <td>expr * expr</td>
      <td>Arithmetic multiplication</td>
      <td>Mul</td>
    </tr>
    <tr>
      <td>*=</td>
      <td>var *= expr</td>
      <td>Arithmetic multiplication and assignment</td>
      <td>MulAssign</td>
    </tr>
    <tr>
      <td>*</td>
      <td>*expr</td>
      <td>Dereference</td>
      <td>Deref</td>
    </tr>
    <tr>
      <td>*</td>
      <td>*const type, *mut type</td>
      <td>Raw pointer</td>
      <td></td>
    </tr>
    <tr>
      <td>+</td>
      <td>trait + trait, 'a + trait</td>
      <td>Compound type constraint</td>
      <td></td>
    </tr>
    <tr>
      <td>+</td>
      <td>expr + expr</td>
      <td>Arithmetic addition</td>
      <td>Add</td>
    </tr>
    <tr>
      <td>+=</td>
      <td>var += expr</td>
      <td>Arithmetic addition and assignment</td>
      <td>AddAssign</td>
    </tr>
    <tr>
      <td>,</td>
      <td>expr, expr</td>
      <td>Argument and element separator</td>
      <td></td>
    </tr>
    <tr>
      <td>-</td>
      <td>- expr</td>
      <td>Arithmetic negation</td>
      <td>Neg</td>
    </tr>
    <tr>
      <td>-</td>
      <td>expr - expr</td>
      <td>Arithmetic subtraction</td>
      <td>Sub</td>
    </tr>
    <tr>
      <td>-=</td>
      <td>var -= expr</td>
      <td>Arithmetic subtraction and assignment</td>
      <td>SubAssign</td>
    </tr>
    <tr>
      <td>-></td>
      <td>fn(...) -> type, |…| -> type</td>
      <td>Function and closure return type</td>
      <td></td>
    </tr>
    <tr>
      <td>.</td>
      <td>expr.ident</td>
      <td>Field access</td>
      <td></td>
    </tr>
    <tr>
      <td>.</td>
      <td>expr.ident(expr, ...)</td>
      <td>Method call</td>
      <td></td>
    </tr>
    <tr>
      <td>.</td>
      <td>expr.0, expr.1, ...</td>
      <td>Tuple indexing</td>
      <td></td>
    </tr>
    <tr>
      <td>..</td>
      <td>.., expr.., ..expr, expr..expr</td>
      <td>Right-exclusive range literal</td>
      <td>PartialOrd</td>
    </tr>
    <tr>
      <td>..=</td>
      <td>..=expr, expr..=expr</td>
      <td>Right-inclusive range literal</td>
      <td>PartialOrd</td>
    </tr>
    <tr>
      <td>..</td>
      <td>..expr</td>
      <td>Struct literal update syntax</td>
      <td></td>
    </tr>
    <tr>
      <td>..</td>
      <td>variant(x, ..), struct_type { x, .. }</td>
      <td>"And the rest" pattern binding</td>
      <td></td>
    </tr>
    <tr>
      <td>...</td>
      <td>expr...expr</td>
      <td>(Deprecated, dùng ..= thay vì) Trong pattern: inclusive range pattern</td>
      <td></td>
    </tr>
    <tr>
      <td>/</td>
      <td>expr / expr</td>
      <td>Arithmetic division</td>
      <td>Div</td>
    </tr>
    <tr>
      <td>/=</td>
      <td>var /= expr</td>
      <td>Arithmetic division and assignment</td>
      <td>DivAssign</td>
    </tr>
    <tr>
      <td>:</td>
      <td>pat: type, ident: type</td>
      <td>Constraints</td>
      <td></td>
    </tr>
    <tr>
      <td>:</td>
      <td>ident: expr</td>
      <td>Struct field initializer</td>
      <td></td>
    </tr>
    <tr>
      <td>:</td>
      <td>'a: loop {...}</td>
      <td>Loop label</td>
      <td></td>
    </tr>
    <tr>
      <td>;</td>
      <td>expr;</td>
      <td>Statement and item terminator</td>
      <td></td>
    </tr>
    <tr>
      <td>;</td>
      <td>[...; len]</td>
      <td>Part of fixed-size array syntax</td>
      <td></td>
    </tr>
    <tr>
      <td><<</td>
      <td>expr << expr</td>
      <td>Left-shift</td>
      <td>Shl</td>
    </tr>
    <tr>
      <td><<=</td>
      <td>var <<= expr</td>
      <td>Left-shift and assignment</td>
      <td>ShlAssign</td>
    </tr>
    <tr>
      <td><</td>
      <td>expr < expr</td>
      <td>Less than comparison</td>
      <td>PartialOrd</td>
    </tr>
    <tr>
      <td><=</td>
      <td>expr <= expr</td>
      <td>Less than or equal to comparison</td>
      <td>PartialOrd</td>
    </tr>
    <tr>
      <td>=</td>
      <td>var = expr, ident = type</td>
      <td>Assignment/equivalence</td>
      <td></td>
    </tr>
    <tr>
      <td>==</td>
      <td>expr == expr</td>
      <td>Equality comparison</td>
      <td>PartialEq</td>
    </tr>
    <tr>
      <td=>></td>
      <td>pat => expr</td>
      <td>Part of match arm syntax</td>
      <td></td>
    </tr>
    <tr>
      <td>></td>
      <td>expr > expr</td>
      <td>Greater than comparison</td>
      <td>PartialOrd</td>
    </tr>
    <tr>
      <td>>=</td>
      <td>expr >= expr</td>
      <td>Greater than or equal to comparison</td>
      <td>PartialOrd</td>
    </tr>
    <tr>
      <td>>></td>
      <td>expr >> expr</td>
      <td>Right-shift</td>
      <td>Shr</td>
    </tr>
    <tr>
      <td>>>=</td>
      <td>var >>= expr</td>
      <td>Right-shift and assignment</td>
      <td>ShrAssign</td>
    </tr>
    <tr>
      <td>@</td>
      <td>ident @ pat</td>
      <td>Pattern binding</td>
      <td></td>
    </tr>
    <tr>
      <td>^</td>
      <td>expr ^ expr</td>
      <td>Bitwise exclusive OR</td>
      <td>BitXor</td>
    </tr>
    <tr>
      <td>^=</td>
      <td>var ^= expr</td>
      <td>Bitwise exclusive OR and assignment</td>
      <td>BitXorAssign</td>
    </tr>
    <tr>
      <td>|</td>
      <td>pat | pat</td>
      <td>Pattern alternatives</td>
      <td></td>
    </tr>
    <tr>
      <td>|</td>
      <td>expr | expr</td>
      <td>Bitwise OR</td>
      <td>BitOr</td>
    </tr>
    <tr>
      <td>|=</td>
      <td>var |= expr</td>
      <td>Bitwise OR and assignment</td>
      <td>BitOrAssign</td>
    </tr>
    <tr>
      <td>||</td>
      <td>expr || expr</td>
      <td>Short-circuiting logical OR</td>
      <td></td>
    </tr>
    <tr>
      <td>?</td>
      <td>expr?</td>
      <td>Error propagation</td>
      <td></td>
    </tr>
  </tbody>
</table>

<h3 class="task-heading">Non-operator Symbols</h3>
<p>Các bảng sau chứa tất cả các symbols không hoạt động như operators; tức là, chúng không hoạt động như một function hoặc method call.</p>

<h4 class="task-heading">Bảng B-2: Stand-alone Syntax</h4>
<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>'ident</td>
      <td>Named lifetime hoặc loop label</td>
    </tr>
    <tr>
      <td>Digits immediately followed by u8, i32, f64, usize, v.v...</td>
      <td>Numeric literal of specific type</td>
    </tr>
    <tr>
      <td>"..."</td>
      <td>String literal</td>
    </tr>
    <tr>
      <td>r"...", r#"..."#, r##"..."##, v.v...</td>
      <td>Raw string literal; escape characters not processed</td>
    </tr>
    <tr>
      <td>b"..."</td>
      <td>Byte string literal; constructs an array of bytes instead of a string</td>
    </tr>
    <tr>
      <td>br"...", br#"..."#, br##"..."##, v.v...</td>
      <td>Raw byte string literal; combination of raw and byte string literal</td>
    </tr>
    <tr>
      <td>'...'</td>
      <td>Character literal</td>
    </tr>
    <tr>
      <td>b'...'</td>
      <td>ASCII byte literal</td>
    </tr>
    <tr>
      <td>|…| expr</td>
      <td>Closure</td>
    </tr>
    <tr>
      <td>!</td>
      <td>Always-empty bottom type for diverging functions</td>
    </tr>
    <tr>
      <td>_</td>
      <td>"Ignored" pattern binding; also used to make integer literals readable</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-3: Path-Related Syntax</h4>
<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>ident::ident</td>
      <td>Namespace path</td>
    </tr>
    <tr>
      <td>::path</td>
      <td>Path relative to the crate root (that is, an explicitly absolute path)</td>
    </tr>
    <tr>
      <td>self::path</td>
      <td>Path relative to the current module (that is, an explicitly relative path)</td>
    </tr>
    <tr>
      <td>super::path</td>
      <td>Path relative to the parent of the current module</td>
    </tr>
    <tr>
      <td>type::ident, &lt;type as trait&gt;::ident</td>
      <td>Associated constants, functions, and types</td>
    </tr>
    <tr>
      <td>&lt;type&gt;::...</td>
      <td>Associated item for a type that cannot be directly named</td>
    </tr>
    <tr>
      <td>trait::method(...)</td>
      <td>Disambiguating a method call by naming the trait that defines it</td>
    </tr>
    <tr>
      <td>type::method(...)</td>
      <td>Disambiguating a method call by naming the type for which it's defined</td>
    </tr>
    <tr>
      <td>&lt;type as trait&gt;::method(...)</td>
      <td>Disambiguating a method call by naming the trait and type</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-4: Generics</h4>
<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>path&lt;...&gt;</td>
      <td>Specifies parameters to a generic type in a type</td>
    </tr>
    <tr>
      <td>path::&lt;...&gt;, method::&lt;...&gt;</td>
      <td>Specifies parameters to a generic type, function, or method in an expression</td>
    </tr>
    <tr>
      <td>fn ident&lt;...&gt; ...</td>
      <td>Define generic function</td>
    </tr>
    <tr>
      <td>struct ident&lt;...&gt; ...</td>
      <td>Define generic structure</td>
    </tr>
    <tr>
      <td>enum ident&lt;...&gt; ...</td>
      <td>Define generic enumeration</td>
    </tr>
    <tr>
      <td>impl&lt;...&gt; ...</td>
      <td>Define generic implementation</td>
    </tr>
    <tr>
      <td>for&lt;...&gt; type</td>
      <td>Higher ranked lifetime bounds</td>
    </tr>
    <tr>
      <td>&lt;ident=type&gt;</td>
      <td>A generic type where one or more associated types have specific assignments</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-5: Trait Bound Constraints</h4>
<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>T: U</td>
      <td>Generic parameter T constrained to types that implement U</td>
    </tr>
    <tr>
      <td>T: 'a</td>
      <td>Generic type T must outlive lifetime 'a</td>
    </tr>
    <tr>
      <td>T: 'static</td>
      <td>Generic type T contains no borrowed references other than 'static ones</td>
    </tr>
    <tr>
      <td>'b: 'a</td>
      <td>Generic lifetime 'b must outlive lifetime 'a</td>
    </tr>
    <tr>
      <td>T: ?Sized</td>
      <td>Allow generic type parameter to be a dynamically sized type</td>
    </tr>
    <tr>
      <td>'a + trait, trait + trait</td>
      <td>Compound type constraint</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-6: Macros and Attributes</h4>
<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>#[meta]</td>
      <td>Outer attribute</td>
    </tr>
    <tr>
      <td>#![meta]</td>
      <td>Inner attribute</td>
    </tr>
    <tr>
      <td>$ident</td>
      <td>Macro substitution</td>
    </tr>
    <tr>
      <td>$ident:kind</td>
      <td>Macro metavariable</td>
    </tr>
    <tr>
      <td>$(...)...</td>
      <td>Macro repetition</td>
    </tr>
    <tr>
      <td>ident!(...), ident!{...}, ident![...]</td>
      <td>Macro invocation</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-7: Comments</h4>
<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>//</td>
      <td>Line comment</td>
    </tr>
    <tr>
      <td>//!</td>
      <td>Inner line doc comment</td>
    </tr>
    <tr>
      <td>///</td>
      <td>Outer line doc comment</td>
    </tr>
    <tr>
      <td>/*...*/</td>
      <td>Block comment</td>
    </tr>
    <tr>
      <td>/*!...*/</td>
      <td>Inner block doc comment</td>
    </tr>
    <tr>
      <td>/**...*/</td>
      <td>Outer block doc comment</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-8: Parentheses</h4>
<table>
  <thead>
    <tr>
      <th>Symbol</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>()</td>
      <td>Empty tuple (aka unit), both literal and type</td>
    </tr>
    <tr>
      <td>(expr)</td>
      <td>Parenthesized expression</td>
    </tr>
    <tr>
      <td>(expr,)</td>
      <td>Single-element tuple expression</td>
    </tr>
    <tr>
      <td>(type,)</td>
      <td>Single-element tuple type</td>
    </tr>
    <tr>
      <td>(expr, ...)</td>
      <td>Tuple expression</td>
    </tr>
    <tr>
      <td>(type, ...)</td>
      <td>Tuple type</td>
    </tr>
    <tr>
      <td>expr(expr, ...)</td>
      <td>Function call expression; also used to initialize tuple structs and tuple enum variants</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-9: Curly Brackets</h4>
<table>
  <thead>
    <tr>
      <th>Context</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{...}</td>
      <td>Block expression</td>
    </tr>
    <tr>
      <td>Type {...}</td>
      <td>Struct literal</td>
    </tr>
  </tbody>
</table>

<h4 class="task-heading">Bảng B-10: Square Brackets</h4>
<table>
  <thead>
    <tr>
      <th>Context</th>
      <th>Giải thích</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[...]</td>
      <td>Array literal</td>
    </tr>
    <tr>
      <td>[expr; len]</td>
      <td>Array literal containing len copies of expr</td>
    </tr>
    <tr>
      <td>[type; len]</td>
      <td>Array type containing len instances of type</td>
    </tr>
    <tr>
      <td>expr[expr]</td>
      <td>Collection indexing; overloadable (Index, IndexMut)</td>
    </tr>
    <tr>
      <td>expr[..], expr[a..], expr[..b], expr[a..b]</td>
      <td>Collection indexing pretending to be collection slicing</td>
    </tr>
  </tbody>
</table>
`,
            defaultCode: `// Operators and Symbols Examples

fn main() {
    // Arithmetic operators
    let a = 10;
    let b = 3;
    println!("a + b = {}", a + b);  // Addition
    println!("a - b = {}", a - b);  // Subtraction
    println!("a * b = {}", a * b);  // Multiplication
    println!("a / b = {}", a / b);  // Division
    println!("a % b = {}", a % b);  // Remainder

    // Comparison operators
    println!("a == b: {}", a == b);
    println!("a != b: {}", a != b);
    println!("a < b: {}", a < b);
    println!("a > b: {}", a > b);

    // Logical operators
    let x = true;
    let y = false;
    println!("x && y: {}", x && y);
    println!("x || y: {}", x || y);
    println!("!x: {}", !x);

    // Bitwise operators
    let c = 5;  // binary 101
    let d = 3;  // binary 011
    println!("c & d = {}", c & d);  // Bitwise AND
    println!("c | d = {}", c | d);  // Bitwise OR
    println!("c ^ d = {}", c ^ d);  // Bitwise XOR
    println!("c << 1 = {}", c << 1); // Left shift
    println!("c >> 1 = {}", c >> 1); // Right shift

    // Range operators
    let range = 1..5;       // 1, 2, 3, 4
    let inclusive = 1..=5;  // 1, 2, 3, 4, 5
    println!("Range: {:?}", range.collect::<Vec<_>>());
    println!("Inclusive: {:?}", inclusive.collect::<Vec<_>>());

    // Compound assignment
    let mut e = 10;
    e += 5;
    println!("e += 5: {}", e);
    e -= 3;
    println!("e -= 3: {}", e);

    // Tuple indexing
    let tuple = (1, "hello", 3.14);
    println!("tuple.0 = {}", tuple.0);
    println!("tuple.1 = {}", tuple.1);

    // Dereference
    let f = 5;
    let ptr = &f;
    println!("*ptr = {}", *ptr);

    println!("\\nOperators and symbols example completed!");
}
`,
            expectedOutput: `a + b = 13
a - b = 7
a * b = 30
a / b = 3
a % b = 1
a == b: false
a != b: true
a < b: false
a > b: true
x && y: false
x || y: true
!x: false
c & d = 1
c | d = 7
c ^ d = 6
c << 1 = 10
c >> 1 = 2
Range: [1, 2, 3, 4]
Inclusive: [1, 2, 3, 4, 5]
e += 5: 15
e -= 3: 12
tuple.0 = 1
tuple.1 = hello
*ptr = 5

Operators and symbols example completed!`
        };
