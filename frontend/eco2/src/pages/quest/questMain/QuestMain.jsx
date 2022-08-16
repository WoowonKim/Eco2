import React, { useEffect, useState } from "react";
import Map from "../../../components/map/Map";
import { getUserName, getUserId } from "../../../store/user/common";
import styles from "./QuestMain.module.css";
import QuestModal from "../../../components/modal/questModal/QuestModal";
import DetailModal from "../../../components/modal/questModal/DetailModal";
import PostModal from "../../../components/modal/questModal/PostModal";
import axiosService from "../../../store/axiosService";
import ConfirmModal from "../../../components/modal/confirmModal/ConfirmModal";
const QuestMain = () => {
  const name = getUserName();
  const [count, setCount] = useState(0);
  const [makeFlag, setMakeFlag] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [questList, setQuestList] = useState(null);
  const [payload, setPayload] = useState(null);
  const [questDetail, setQuestDetail] = useState(null);
  const [questDetailFeeds, setQuestDetailFeeds] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [content, setContent] = useState("");
  useEffect(() => {
    axiosService.get("/mission/quest").then((res) => {
      setQuestList(res.data.missions);
    });
  }, [likeCount]);
  const openCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const openDetailModal = (id) => {
    axiosService
      .get(`/quest/detail/${id}/${getUserId()}`)
      .then((res) => {
        console.log(res.data.quest);
        setQuestDetail(res.data.quest);
        axiosService.get(`quest/${res.data.quest.id}`).then((r) => {
          console.log(r.data.questPosts);
          setQuestDetailFeeds(r.data.questPosts);
        });
      })
      .finally(() => {
        setDetailModal(true);
      });
  };
  const closeDetailModal = () => {
    setDetailModal(false);
  };
  const openPostModal = () => {
    setPostModal(true);
  };
  const closePostModal = () => {
    setPostModal(false);
  };

  useEffect(
    (id) => {
      if (!id) {
        return;
      }
      openDetailModal(id);
    },

    [likeCount]
  );
  return (
    <div>
      <Map
        makeFlag={makeFlag}
        setCreateModal={setCreateModal}
        openCreateModal={openCreateModal}
        openDeatailModal={openDetailModal}
        setMakeFlag={setMakeFlag}
        payload={payload}
        setCount={setCount}
        name={name}
        count={count}
        setConfirm={setConfirm}
        setContent={setContent}
      />
      <QuestModal
        open={createModal}
        close={closeCreateModal}
        header="Modal heading"
        questList={questList}
        setPayload={setPayload}
        setMakeFlag={setMakeFlag}
      ></QuestModal>
      {questDetail && (
        <DetailModal
          open={detailModal}
          close={closeDetailModal}
          openPost={openPostModal}
          questDetail={questDetail}
          questDetailFeeds={questDetailFeeds}
          setLikeCount={setLikeCount}
        ></DetailModal>
      )}
      {questDetail && (
        <PostModal
          open={postModal}
          questDetail={questDetail}
          close={closePostModal}
          closeDetail={closeDetailModal}
        ></PostModal>
      )}
      {confirm && (
        <ConfirmModal
          closeModal={() => {
            setConfirm(!confirm);
          }}
          title={""}
          content={content}
        ></ConfirmModal>
      )}
    </div>
  );
};

export default QuestMain;
