package com.web.eco2.model.service.alarm;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.web.eco2.domain.entity.alarm.FirebaseAlarm;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class AlarmService {
    public static final String COLLECTION_NAME = "test";
    public static final String SUB_COLLECTION_NAME = "alarm";


    public String insertAlarm(FirebaseAlarm alarm) {
        Firestore firestore = FirestoreClient.getFirestore();

        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE);
        alarm.setId(currentTime + UUID.randomUUID().toString());

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME)
                .document(alarm.getUserId().toString()).collection(SUB_COLLECTION_NAME)
                .document(alarm.getId()).set(alarm);

        return alarm.getId();
    }

    public DocumentSnapshot findAlarmByUserIdAndAlarmId(Long id, String alarmId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = firestore.collection(COLLECTION_NAME)
                .document(id.toString()).collection(SUB_COLLECTION_NAME)
                .document(alarmId).get();
        return apiFuture.get();
    }

    public void deleteAlarm(Long id, String alarmId) {
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection(COLLECTION_NAME)
                .document(id.toString()).collection(SUB_COLLECTION_NAME)
                .document(alarmId).delete();
    }
}
