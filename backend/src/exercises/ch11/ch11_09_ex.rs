// Exercise - ch11_09_ex: Testing with Result

fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Cannot divide by zero".to_string())
    } else {
        Ok(a / b)
    }
}

fn sqrt(n: f64) -> Result<f64, String> {
    if n < 0.0 {
        Err("Cannot take sqrt of negative".to_string())
    } else {
        Ok(n.sqrt())
    }
}

fn run_tests() -> Result<(), String> {
    // Test divide OK case
    let result = divide(10.0, 2.0)?;
    assert!((result - 5.0).abs() < 0.001);

    let result = divide(9.0, 3.0)?;
    assert!((result - 3.0).abs() < 0.001);

    // Test sqrt OK case
    let result = sqrt(16.0)?;
    assert!((result - 4.0).abs() < 0.001);

    let result = sqrt(2.0)?;
    assert!((result - 1.414).abs() < 0.01);

    Ok(())
}

fn main() {
    run_tests().unwrap();
    println!("Result tests passed!");
}
