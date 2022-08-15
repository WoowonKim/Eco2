import React from "react";

const CustomModal = () => {
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div
      className={open ? `${styles.openModal} ${styles.modal}` : styles.modal}
    >
      {open ? (
        <section>
          <header>나만의 미션 생성하기</header>
          <main className={styles.main}>
            {/* 카테고리 설정할 곳 */}
            <select
              name="mission"
              onChange={e => {
                console.log(e.target.value);
                setQNum(e.target.value);
                payload.missionId = e.target.value;
              }}
              className={styles.selectBox}
            >
              {questList.map((item, i) => {
                return (
                  <option value={item.id} key={i}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <fieldset className={styles.fieldset}>
              <legend style={{ textAlign: "start" }}>
                미션 주제를 작성해주세요
              </legend>
              <textarea
                id="content"
                className={styles.contentBox}
                onChange={e => {
                  payload.content = e.target.value;
                }}
              />
            </fieldset>
          </main>
          <footer>
            <button
              className={styles.create}
              onClick={() => {
                console.log(payload);
                setPayload(payload);
                close();
                setMakeFlag(true);
              }}
            >
              생성하기
            </button>
            <button className={styles.close} onClick={close}>
              취소하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default CustomModal;
