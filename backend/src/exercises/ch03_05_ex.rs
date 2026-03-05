#[cfg(test)]
mod tests {
    #[test]
    fn test_is_even() {
        assert_eq!(super::is_even(2), true, "2 phải là số chẵn");
        assert_eq!(super::is_even(3), false, "3 phải là số lẻ");
        assert_eq!(super::is_even(0), true, "0 phải là số chẵn");
        assert_eq!(super::is_even(-4), true, "-4 phải là số chẵn");
        assert_eq!(super::is_even(-5), false, "-5 phải là số lẻ");
    }
}
