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
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class AlarmService {
    public static final String COLLECTION_NAME = "alarm";
    public static final String SUB_COLLECTION_NAME = "common";

    public String insertAlarm(FirebaseAlarm alarm) {
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMdd-HHmmss"));

        return insertAlarm(alarm, currentTime + "_" + UUID.randomUUID().toString(), SUB_COLLECTION_NAME);
    }

    public String insertAlarm(FirebaseAlarm alarm, String alarmId, String alarmType) {
        Firestore firestore = FirestoreClient.getFirestore();

        alarm.setId(alarmId);

        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME)
                .document(alarm.getUserId().toString()).collection(alarmType)
                .document(alarmId).set(alarm);

        return alarm.getId();
    }

    public DocumentSnapshot findAlarmByUserIdAndAlarmId(Long id, String alarmId) throws ExecutionException, InterruptedException {
        return findAlarmByUserIdAndAlarmId(id, alarmId, SUB_COLLECTION_NAME);
    }

    public DocumentSnapshot findAlarmByUserIdAndAlarmId(Long id, String alarmId, String alarmType) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = firestore.collection(COLLECTION_NAME)
                .document(id.toString()).collection(alarmType)
                .document(alarmId).get();
        return apiFuture.get();
    }

    public void deleteAlarm(Long id, String alarmId) {
        deleteAlarm(id, alarmId, SUB_COLLECTION_NAME);
    }

    public void deleteAlarm(Long id, String alarmId, String alarmType) {
        Firestore firestore = FirestoreClient.getFirestore();
        firestore.collection(COLLECTION_NAME)
                .document(id.toString()).collection(alarmType)
                .document(alarmId).delete();
    }

    public boolean isRequested(Long senderId, Long receiverId) throws ExecutionException, InterruptedException {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<DocumentSnapshot> apiFuture = firestore.collection(COLLECTION_NAME).document(receiverId.toString())
                .collection("friendRequest").document(senderId.toString()).get();

        return apiFuture.get().exists();
    }
}
