import React, { useEffect, useState } from "react";
import {
  accountSetting,
  accountSettingChange,
} from "../../../store/user/accountSlice";
import styles from "./Settings.module.css";
import { useDispatch } from "react-redux";

const Settings = ({ email }) => {
  const [checked, setChecked] = useState({
    publicFlag: false,
    commentAlarmFlag: false,
    chatAlarmFlag: false,
    darkmodeFlag: false,
  });

  const dispatch = useDispatch();

  const onClick = () => {
    // 토글로 변경된 유저 설정 return
    dispatch(
      accountSettingChange({
        email,
        publicFlag: checked.publicFlag,
        commentAlarmFlag: checked.commentAlarmFlag,
        chatAlarmFlag: checked.chatAlarmFlag,
        darkmodeFlag: checked.darkmodeFlag,
      })
    );
  };
  useEffect(() => {
    // 계정 설정 불러오기
    dispatch(accountSetting({ email })).then((res) => {
      setChecked({
        ...checked,
        publicFlag: res.payload.userSetting.publicFlag,
        commentAlarmFlag: res.payload.userSetting.commentAlarmFlag,
        chatAlarmFlag: res.payload.userSetting.chatAlarmFlag,
        darkmodeFlag: res.payload.userSetting.darkmodeFlag,
      });
    });
  }, []);
  return (
    <div>
      <div className={styles.setting}>
        <div className={styles.settingGroup}>
          <p className={styles.settingTitle}>계정 비공개</p>
          <p className={styles.settingContent}>
            계정을 비공개로 설정하면 다른 유저들이 게시물을 볼 수 없습니다.
          </p>
        </div>
        <div className={styles.toggleGroup}>
          <input
            type="checkbox"
            id="publicFlag"
            hidden
            className={styles.toggle}
            onClick={() => {
              let data = { ...checked };
              data.publicFlag = !checked.publicFlag;
              setChecked(data);
            }}
            defaultChecked={checked.publicFlag}
          />
          <label htmlFor="publicFlag" className={styles.toggleSwitch}>
            <span className={styles.toggleButton}></span>
          </label>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.setting}>
        <div className={styles.settingGroup}>
          <p className={styles.settingTitle}>게시물 댓글</p>
          <p className={styles.settingContent}>
            게시물 댓글 알림을 끄면 게시물에 댓글이 달려도 알림이 가지 않습니다.
          </p>
        </div>
        <div className={styles.toggleGroup}>
          <input
            type="checkbox"
            id="commentAlarmFlag"
            hidden
            className={styles.toggle}
            onClick={() => {
              let data = { ...checked };
              data.commentAlarmFlag = !checked.commentAlarmFlag;
              setChecked(data);
            }}
            defaultChecked={checked.commentAlarmFlag}
          />
          <label htmlFor="commentAlarmFlag" className={styles.toggleSwitch}>
            <span className={styles.toggleButton}></span>
          </label>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.setting}>
        <div className={styles.settingGroup}>
          <p className={styles.settingTitle}>채팅</p>
          <p className={styles.settingContent}>
            채팅 알림을 끄면 채팅 팝업 알림이 가지 않습니다.
          </p>
        </div>
        <div className={styles.toggleGroup}>
          <input
            type="checkbox"
            id="chatAlarmFlag"
            hidden
            className={styles.toggle}
            onClick={() => {
              let data = { ...checked };
              data.chatAlarmFlag = !checked.chatAlarmFlag;
              setChecked(data);
            }}
            defaultChecked={checked.chatAlarmFlag}
          />
          <label htmlFor="chatAlarmFlag" className={styles.toggleSwitch}>
            <span className={styles.toggleButton}></span>
          </label>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.setting}>
        <div className={styles.settingGroup}>
          <p className={styles.settingTitle}>다크모드</p>
        </div>
        <div className={styles.toggleGroup}>
          <input
            type="checkbox"
            id="darkmodeFlag"
            hidden
            className={styles.toggle}
            onClick={() => {
              let data = { ...checked };
              data.darkmodeFlag = !checked.darkmodeFlag;
              setChecked(data);
            }}
            defaultChecked={checked.darkmodeFlag}
          />
          <label htmlFor="darkmodeFlag" className={styles.toggleSwitch}>
            <span className={styles.toggleButton}></span>
          </label>
        </div>
      </div>
      <button className={styles.settingButton} onClick={onClick}>
        설정 저장하기
      </button>
    </div>
  );
};

export default Settings;
