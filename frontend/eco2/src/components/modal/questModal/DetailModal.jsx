import React from "react";
import styles from "./DetailModal.module.css";
import FeedList from "../../feed/feedList/FeedList";
import { getUserId } from "../../../store/user/common";
import { useDispatch } from "react-redux";
import { deleteQuest } from "../../../store/quest/questSlice";
const DetailModal = (props) => {
  // 열기, 닫기
  const { open, close, questDetail, openPost, questDetailFeeds, setLikeCount } = props;
  let finishDate = questDetail ? questDetail.finishTime.slice(0, 10) : null;
  let finishTime = questDetail ? questDetail.finishTime.slice(11, 16) : null;
  let currUser = getUserId();
  let dispatch = useDispatch();
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}>
      {open ? (
        <section>
          <main className={styles.main}>
            {currUser == questDetail.user.id && !questDetail.participated ? (
              <div
                onClick={() => {
                  dispatch(deleteQuest(questDetail.id));
                  close();
                }}
                className={styles.deleteButton}
              >
                <i className={`fa-solid fa-trash-can-arrow-up ${styles.deleteIcon}`}></i>
              </div>
            ) : null}

            <div className={styles.info}>
              <div className={styles.title}>미션! {questDetail.mission.title}</div>
              <div className={styles.content}>{questDetail.content}</div>
              <div className={styles.endTime}>
                {finishDate} {finishTime}에 종료됩니다! 놓치지말고 참여하세요!
              </div>
              <div className={styles.endTime}>
                {questDetail.participantCount}/{questDetail.achieveCount}명이 참가했어요
              </div>
            </div>
          </main>
          <footer>
            {questDetail.achieveFlag ? (
              <>
                <button type="button" className={styles.already}>
                  이미 완료된 퀘스트입니다.
                </button>
                <button className={styles.close} onClick={close}>
                  닫기
                </button>
              </>
            ) : questDetail.participated ? (
              <>
                <button type="button" className={styles.already}>
                  이미 참여한 퀘스트입니다.
                </button>
                <button className={styles.close} onClick={close}>
                  닫기
                </button>
              </>
            ) : (
              <>
                <button className={styles.create} onClick={openPost}>
                  참여하기
                </button>
                <button className={styles.close} onClick={close}>
                  닫기
                </button>
              </>
            )}
          </footer>
          {questDetailFeeds !== null && questDetailFeeds.length > 0 && (
            <>
              <div className={styles.post}>참여자 인증글</div>
              <FeedList display={"list"} feeds={questDetailFeeds} category={questDetail.mission.category} setLikeCount={setLikeCount}></FeedList>
            </>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default DetailModal;
