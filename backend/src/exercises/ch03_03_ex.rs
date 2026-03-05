#[cfg(test)]
mod tests {
    // Gọi hàm con của user luôn trong file main.rs do cùng module context
    #[test]
    fn test_calculate_volume() {
        assert_eq!(super::calculate_volume(1, 1, 1), 1, "Tính toán sai thể tích");
        assert_eq!(super::calculate_volume(2, 3, 4), 24, "Tính toán sai thể tích");
        assert_eq!(super::calculate_volume(5, 5, 5), 125, "Tính toán sai thể tích");
    }
}
