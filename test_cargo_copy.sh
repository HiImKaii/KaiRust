mkdir -p test_cargo1
cd test_cargo1
cat << 'TOML' > Cargo.toml
[package]
name = "test_run"
version = "0.1.0"
edition = "2021"
[dependencies]
rand = "0.8"
TOML
mkdir -p src
echo 'fn main() {}' > src/main.rs
cargo build --release

echo "--- Copying to test_cargo2 ---"
cd ..
cp -a test_cargo1 test_cargo2
cd test_cargo2
echo 'fn main() { println!("Hello"); }' > src/main.rs
time cargo build --release
