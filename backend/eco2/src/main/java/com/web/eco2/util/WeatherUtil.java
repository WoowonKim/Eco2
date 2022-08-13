package com.web.eco2.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoField;
import java.time.temporal.TemporalField;
import java.util.Arrays;

@Component
public class WeatherUtil {
    @Value("${api.weather.key}")
	private String WEATHER_SERVICE_KEY;

    @Value("${api.air.key}")
	private String AIR_SERVICE_KEY;

    @Value("${kakao-client-id}")
    private String KAKAO_KEY;

    private static final String ULTRA_SRT_BASE_URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrt";
    private static final String AIR_INQUERY_BASE_URL = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/";

    private static final String KAKAO_BASE_URL = "https://dapi.kakao.com/v2/local/geo/coord2address.json";

    private final int XO = 43; // 기준점 X좌표 (GRID)
    private final int YO = 136; // 기준점 Y좌표 (GRID)

    private final double D2RAD = 0.017453;

    public int[] convertLatLng2XY(double lat, double lng) {
        int[] xy = new int[2];

        double re = 6371.00877 / 5; // 지구 반경 / 격자 간격 (km)
        double slat1 = 30 * 0.017453; // 투명 위도1 (rad)
        double slat2 = 60 * 0.017453; // 투명 위도2 (rad)
        double olon = 126 * 0.017453; // 기준 경도 (rad)
        double olat = 38 * 0.017453; // 기준 위도 (rad)

        double sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
        double sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
        sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
        double ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
        ro = re * sf / Math.pow(ro, sn);

        double ra = Math.tan(Math.PI * 0.25 + (lat) * D2RAD * 0.5);
        ra = re * sf / Math.pow(ra, sn);
        double theta = lng * D2RAD - olon;
        if (theta > Math.PI) theta -= 2.0 * Math.PI;
        if (theta < -Math.PI) theta += 2.0 * Math.PI;
        theta *= sn;
        xy[0] = (int) Math.floor(ra * Math.sin(theta) + XO + 0.5);
        xy[1] = (int) (ro - ra * Math.cos(theta) + YO + 0.5);

        return xy;
    }

    public String getKakaoReverseGeocodeUrl(String lat, String lng) {
        String url = KAKAO_BASE_URL;

        StringBuffer query = new StringBuffer("?");
        addQuery(query, "x", lng);
        addQuery(query, "y", lat);

        return url + query.toString();
    }

    public String getKakaoRestKey() {
        return KAKAO_KEY;
    }

    public String setUltraSrtUrl(String lat, String lng, LocalDateTime time, String type) {
        return ULTRA_SRT_BASE_URL + type + setWeatherQuery(lat, lng, time);
    }

    private String setWeatherQuery(String lat, String lng, LocalDateTime time) {
        StringBuffer query = new StringBuffer("?");
        addQuery(query, "serviceKey", WEATHER_SERVICE_KEY);

        String[] baseDateAndTime = getBaseDateAndTime(time);
        addQuery(query, "base_date", baseDateAndTime[0]);
        addQuery(query, "base_time", baseDateAndTime[1]);

        int[] xy = convertLatLng2XY(Double.parseDouble(lat), Double.parseDouble(lng));
        addQuery(query, "nx", Integer.toString(xy[0]));
        addQuery(query, "ny", Integer.toString(xy[1]));

        addQuery(query, "dataType", "JSON");
        addQuery(query, "numOfRows", "60");

        return query.toString();
    }

    private void addQuery(StringBuffer url, String key, String value) {
        if (url.charAt(url.length() - 1) != '?') {
            url.append("&");
        }
        url.append(key).append("=").append(value);
    }

    public String getDustForcastUrl(LocalDateTime time) {
        String ret = AIR_INQUERY_BASE_URL + "getMinuDustFrcstDspth";

        StringBuffer query = new StringBuffer("?");
        addQuery(query, "serviceKey", AIR_SERVICE_KEY);
        addQuery(query, "returnType", "json");
        addQuery(query, "searchDate", convertAirTime(time));

        return ret + query.toString();
    }

    private String convertAirTime(LocalDateTime time) {
        return time.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    /**
     * 날짜와 시각을 YYYYMMDD, HHMM 형식으로 반환
     *
     * @param now 변환하고자 하는 LocalDateTime
     * @return <code>ret[0]</code>: YYYYMMDD <br> <code>ret[1]</code>: HHMM
     */
    private String[] getBaseDateAndTime(LocalDateTime now) {
        String[] ret = new String[2];

        ret[0] = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        ret[1] = now.format(DateTimeFormatter.ofPattern("HHmm"));
//        String timeString = now.format(DateTimeFormatter.ISO_DATE_TIME);
//        String[] splitedDateTime = timeString.split("T");

//        ret[0] = splitedDateTime[0].replace("-", "");
//        ret[1] = splitedDateTime[1].replace(":", "").substring(0, 4);

        return ret;
    }

    public static void main(String[] args) {
        WeatherUtil instance = new WeatherUtil();
        // 경위도 > 격자 변환 테스트
        System.out.println(Arrays.toString(instance.convertLatLng2XY(33.450700761312206, 126.57066121198349)));
        System.out.println(Arrays.toString(instance.getBaseDateAndTime(LocalDateTime.now())));
        // 현재 시각과 제일 가까운 정각 / 30분 가져오기 테스트
//		LocalDateTime now = LocalDateTime.of(2022, 1, 1, 0, 11);
//		System.out.println(Arrays.toString(instance.getBaseDateAndTime(true, now)));
    }

}
