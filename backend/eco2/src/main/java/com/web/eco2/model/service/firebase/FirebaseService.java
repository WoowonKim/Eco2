package com.web.eco2.model.service.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FirebaseService {
    private FirebaseApp app;

    @PostConstruct
    public void initialize() {
        // TODO: 클래스 패스로 변환
//        System.out.println(System.class.getResource(""));
        try {
            FileInputStream serviceAccount = new FileInputStream("path/to/serviceAccountKey.json");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            app = FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            e.printStackTrace();
        }
//        try {
//            FirebaseOptions options = FirebaseOptions.builder()
//                    .setCredentials(GoogleCredentials.fromStream(System.class.getResourceAsStream("fb_key.json")))
//                    .build();
//            FirebaseApp.initializeApp(options);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

    @Bean
    public FirebaseAuth getFirebaseAuth(){
        return FirebaseAuth.getInstance(app);
    }
}
