#[cfg(test)]
mod tests {
    use std::fs;

    #[test]
    fn test_traffic_light_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_traffic_light = code.contains("enum TrafficLight");
        assert!(has_traffic_light, "Bạn chưa định nghĩa enum TrafficLight!");

        let has_red = code.contains("Red");
        let has_yellow = code.contains("Yellow");
        let has_green = code.contains("Green");
        assert!(has_red && has_yellow && has_green,
            "TrafficLight phải có Red, Yellow, Green!");
    }

    #[test]
    fn test_get_action_function() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_get_action = code.contains("fn get_action");
        assert!(has_get_action, "Bạn chưa định nghĩa hàm get_action!");

        let has_match = code.contains("match");
        assert!(has_match, "Phải sử dụng match!");
    }

    #[test]
    fn test_season_enum() {
        let code = fs::read_to_string("main.rs").expect("Unable to read main.rs");

        let has_season = code.contains("enum Season");
        assert!(has_season, "Bạn chưa định nghĩa enum Season!");
    }
}
