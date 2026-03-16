// Exercise - ch18_13_ex: FFI String Conversion

use std::ffi::CString;

fn main() {
    let s = CString::new("Hello").unwrap();
    println!("CString: {:?}", s);
}
