package com.web.eco2.model.service.mission;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.eco2.util.WeatherUtil;
import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class WeatherService {
//    @Autowired
    private WeatherUtil weatherUtil;
//    private WeatherUtil weatherUtil = new WeatherUtil();

//    @Autowired
    private ObjectMapper objectMapper;
//    private ObjectMapper objectMapper = new ObjectMapper();

    public List<?> getAirInformation(LocalDateTime time) throws IOException {
        List<Object> t = new ArrayList<>();

        URL url = new URL(weatherUtil.getDustForcastUrl(time));
        System.out.println(url);
        JsonNode jsonNode = objectMapper.readTree(url);

        System.out.println(jsonNode.toPrettyString());

        return t;
    }

    public List<?> getUltraSrtNcst(String lat, String lng, LocalDateTime time) throws IOException {
        List<Object> t = new ArrayList<>();

        JsonNode jsonNode = getWeatherInformation(lat, lng, time, "Ncst");

        return t;
    }

    public List<?> getUltraSrtFcst(String lat, String lng, LocalDateTime time) throws IOException {
        List<Object> t = new ArrayList<>();

        JsonNode jsonNode = getWeatherInformation(lat, lng, time, "Fcst");

        return t;
    }

    private JsonNode getWeatherInformation(String lat, String lng, LocalDateTime time, String type) throws IOException {
        URL url;
        JsonNode jsonNode;

        long minusHour = 0L;
        do {
            if (minusHour == 2) {
                // 1시간 전 정보까지 없으면 없는 정보로 생각
                return null;
            }

            // 1시간 전의 예보 가져오기
            url = new URL(weatherUtil.setUltraSrtUrl(lat, lng, time.minusHours(minusHour++), type));
            System.out.println(url);
            jsonNode = objectMapper.readTree(url);
        } while (!jsonNode.get("response").get("header").get("resultCode").asText().equals("00"));

        System.out.println(jsonNode.toPrettyString());

        return jsonNode;
    }

    public static void main(String[] args) {
        try {
//            new WeatherService().getUltraSrtFcst("36.360584", "127.343837", LocalDateTime.now());
            new WeatherService().getAirInformation(LocalDateTime.now());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
