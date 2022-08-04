package com.web.eco2.model.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final StringRedisTemplate stringRedisTemplate;

    public String getData(String key) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public List<Long> getListData(String key) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        return convertStringToList(valueOperations.get(key));
    }

    public void setData(String key, String value) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    public void setListData(String key, List<Long> value) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, convertListToString(value));
    }

    public void setDataExpire(String key, String value, long duration) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    public void setListDataExpire(String key, List<Long> value, long duration) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, convertListToString(value), expireDuration);
    }

    public void deleteData(String key) {
        stringRedisTemplate.delete(key);
    }

    private String convertListToString(List<Long> list) {
        if(list == null) return null;

        StringBuffer stringBuffer = new StringBuffer();
        for (Long item : list) {
            stringBuffer.append(item).append(",");
        }
        stringBuffer.setLength(stringBuffer.length()-1);
        return stringBuffer.toString();
    }

    private List<Long> convertStringToList(String str) {
        if(str == null) return null;
        return Arrays.stream(str.split(",")).map(Long::parseLong).collect(Collectors.toList());
    }
}
