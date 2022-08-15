import React, { useState } from "react";
import styles from "./DetailModal.module.css";
import FeedList from "../../feed/feedList/FeedList";
import { getUserId } from "../../../store/user/common";
import axiosService from "../../../store/axiosService";
import { useDispatch } from "react-redux";
import { deleteQuest, getQuestList } from "../../../store/quest/questSlice";
const DetailModal = (props) => {
  // 열기, 닫기
  const { open, close, questDetail, openPost, questDetailFeeds } = props;
  let finishDate = questDetail ? questDetail.finishTime.slice(0, 10) : null;
  let finishTime = questDetail ? questDetail.finishTime.slice(11, 16) : null;
  let currUser = getUserId();
  let dispatch = useDispatch();
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>
            참여하기
            {currUser == questDetail.user.id && !questDetail.participated ? (
              <button
                onClick={() => {
                  dispatch(deleteQuest(questDetail.id));
                  close();
                }}
                className={styles.delete}
              >
                삭제하기
              </button>
            ) : null}
          </header>
          <main className={styles.main}>
            <div className={styles.info}>
              <h2>미션! {questDetail.mission.title}</h2>
              <div className={styles.endTime}>
                미션 종료 : {finishDate}/{finishTime}
              </div>
              <div className={styles.endTime}>
                {questDetail.participantCount}/{questDetail.achieveCount}명이
                참가했어요
              </div>
              <div>{questDetail.content}</div>
            </div>
          </main>
          <footer>
            {questDetail.achieveFlag ? (
              <button type="button" className={styles.close} onClick={close}>
                이미 완료된 퀘스트입니다.
              </button>
            ) : questDetail.participated ? (
              <>
                <button type="button" className={styles.close} onClick={close}>
                  이미 참여한 퀘스트입니다.
                </button>
              </>
            ) : (
              <>
                <button className={styles.create} onClick={openPost}>
                  인증하기
                </button>
                <button className={styles.close} onClick={close}>
                  참여안하기
                </button>
              </>
            )}
          </footer>
          {questDetailFeeds !== null && questDetailFeeds.length > 0 && (
            <>
              <div>참여자 인증글</div>
              <FeedList
                display={"list"}
                feeds={questDetailFeeds}
                category={questDetail.mission.category}
              ></FeedList>
            </>
          )}
        </section>
      ) : null}
    </div>
  );
};

export default DetailModal;
