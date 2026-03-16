// Exercise - ch12_07_ex: Path Handling

use std::path::Path;

fn main() {
    let path = Path::new("/home/user/documents/file.txt");

    println!("File name: {:?}", path.file_name());
    println!("Extension: {:?}", path.extension());
    println!("Parent: {:?}", path.parent());
    println!("Is file: {}", path.is_file());
    println!("Is dir: {}", path.is_dir());

    let rel_path = Path::new("src/main.rs");
    println!("\nRelative path:");
    println!("File name: {:?}", rel_path.file_name());
    println!("Extension: {:?}", rel_path.extension());
}
