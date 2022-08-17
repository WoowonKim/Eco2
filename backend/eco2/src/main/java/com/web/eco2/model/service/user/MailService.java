package com.web.eco2.model.service.user;

import com.web.eco2.domain.dto.user.MailRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@Slf4j
public class MailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private RedisService redisService;

    public MailRequest getMailRequest(String email) {
        String code = getMailCode();
        MailRequest mail = new MailRequest();

        mail.setEmail(email);
        mail.setTitle("Eco2 이메일 인증 안내");
        mail.setMessage("안녕하세요. Eco2의 이메일 인증 안내 메일입니다. 회원님의 인증 코드는 " + code + " 입니다. 인증 유효 시간은 5분입니다.");
        mail.setCode(code);
        return mail;
    }

    public String getMailCode() {
        String code = "";
        Random random = new Random();

        for (int i = 0; i < 3; i++) {
            int alpha = random.nextInt(25) + 65;
            code += (char) alpha;
        }
        int num = random.nextInt(9999) + 1000;
        code += num;

        System.out.println(code);
        return code;
    }

    public void sendMail(String email) {
        MailRequest mail = getMailRequest(email);
        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(mail.getEmail());
        message.setFrom("Eco2@gmail.com");
        message.setSubject(mail.getTitle());
        message.setText(mail.getMessage());

        if (verifyMail(mail.getCode()) != null) { //인증코드가 중복일 때
            sendMail(email);
            return;
        }

        redisService.setDataExpire(mail.getCode(), email, 60 * 5L);
        javaMailSender.send(message);
        log.debug(email + " 이메일 발송 완료");
    }

    public String verifyMail(String code) {
        return redisService.getData(code);
    }

    public void verifyMailSuccess(String code) {
        redisService.deleteData(code);
    }
}
