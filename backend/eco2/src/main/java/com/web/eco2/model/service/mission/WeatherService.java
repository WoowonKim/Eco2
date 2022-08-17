package com.web.eco2.model.service.mission;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.eco2.domain.dto.mission.UltraShortNowcast;
import com.web.eco2.util.WeatherUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class WeatherService {
    @Autowired
    private WeatherUtil weatherUtil;

    @Autowired
    private ObjectMapper objectMapper;

    public String getCurrentDo(String lat, String lng) throws IOException {
        System.out.println(weatherUtil.getKakaoReverseGeocodeUrl(lat, lng));
        URL url = new URL(weatherUtil.getKakaoReverseGeocodeUrl(lat, lng));
        URLConnection conn = url.openConnection();
        conn.setRequestProperty("Authorization", "KakaoAK " + weatherUtil.getKakaoRestKey());
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

        JSONObject object = objectMapper.readValue(br, JSONObject.class);
        System.out.println(object.get("document"));

        return "";
    }

    public Map<String, Integer> getAirInformation(String doo, LocalDateTime time) throws IOException {
        Map<String, Integer> map = new HashMap<>();

        URL url = new URL(weatherUtil.getDustForcastUrl(time));
        System.out.println(url);
        JsonNode jsonNode = objectMapper.readTree(url);

        System.out.println(jsonNode.toPrettyString());

        return map;
    }

    public UltraShortNowcast getUltraSrtNcst(String lat, String lng, String time) throws IOException {
        Map<String, Double> info = new HashMap<>();

        LocalDateTime localDateTime = stringToTime(time);

        Map<String, Object> items = getWeatherInformation(lat, lng, localDateTime, "Ncst");
        if (items == null) {
            return null;
        }

        for (Map<String, String> item : (List<Map<String, String>>) items.get("item")) {
            info.put(item.get("category"), Double.parseDouble(item.get("obsrValue")));
        }
        return UltraShortNowcast.builder()
                .temperature(info.get("T1H")).rainAmount(info.get("RN1"))
                .windAmount(info.get("WSD")).humidity(info.get("REH")).build();
    }

    private LocalDateTime stringToTime(String time) {
        String[] dateAndTime = time.split("T");
        List<Integer> yearMonthDay = Arrays.stream(dateAndTime[0].split("-")).map(Integer::parseInt).collect(Collectors.toList());
        List<Integer> hourMinute = Arrays.stream(dateAndTime[1].split(":")).map(Integer::parseInt).collect(Collectors.toList());

        return LocalDateTime.of(yearMonthDay.get(0), yearMonthDay.get(1), yearMonthDay.get(2), hourMinute.get(0), hourMinute.get(1));
    }

    public List<?> getUltraSrtFcst(String lat, String lng, String time) throws IOException {
        List<Object> t = new ArrayList<>();

        LocalDateTime localDateTime = stringToTime(time);

        Map<String, Object> item = getWeatherInformation(lat, lng, localDateTime, "Fcst");

        return t;
    }

    private Map<String, Object> getWeatherInformation(String lat, String lng, LocalDateTime time, String type) throws IOException {
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

        Map<String, Object> m = objectMapper.convertValue(jsonNode.get("response")
                .get("body").get("items"), Map.class);
        return m;
    }

    public static void main(String[] args) {
        try {
            new WeatherService().getAirInformation("대전", LocalDateTime.now());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
