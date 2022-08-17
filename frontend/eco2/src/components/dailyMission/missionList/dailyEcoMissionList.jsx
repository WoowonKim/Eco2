//React
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

//Store
import { postMission, trending } from "../../../store/mission/missionMainSlice";
import { getFavorite, putFavorite } from "../../../store/mission/favoriteSlice";

//Component
import DailyCustomMissionList from "./dailyCustomMissionList";
import CateOneList from "./cateOneList";
import CateTwoList from "./cateTwoList";
import CateThreeList from "./cateThreeList";
import CateFourList from "./cateFourList";
import CateFiveList from "./cateFiveList";

// CSS
import styles from "./dailyMissionDetail.module.css";
import axiosService from "../../../store/axiosService";

const DailyEcoMissionList = ({ id, ecomissionList, customMake, setFamissionList, famissionList }) => {
  const missionValue = customMake !== 0 ? true : false;
  const [list, getList] = useState(missionValue); //미션 목록과 커스텀 미션을 구분하기 위한 State

  const [favoriteArr, setFavoriteArr] = useState([]); // 즐겨찾기 화면노출을 위한 State
  const [cnt, setCnt] = useState(0); //리렌더링을 방지하기 위한 State
  const [trendingMission, setTrendingMission] = useState(null);
  const favoriteTrue = true; // 서버 연동에 필요한 값 : 미션목록 이 true여서
  const favoriteBoolean = false; // 서버에 삭제 요청에 필요한 값 : 삭제할 때 false값을 전달 하기 위함.

  const [faDelete, setFaDelete] = useState(false);
  const [faAdd, setFaAdd] = useState(false);
  const [faIdArr, setFaIdArr] = useState([]);
  const [trend, setTrend] = useState([]);
  const [famiAdd, setFamiAdd] = useState(false);
  const [cateNum, setCateNum] = useState(0);

  const [cateOne, setCateOne] = useState([]);
  const [cateTwo, setCateTwo] = useState([]);
  const [cateThree, setCateThree] = useState([]);
  const [cateFour, setCateFour] = useState([]);
  const [cateFive, setCateFive] = useState([]);

  const categoryOne = ecomissionList.filter((it) => it.category === 1);
  const categoryTwo = ecomissionList.filter((it) => it.category === 2);
  const categoryThree = ecomissionList.filter((it) => it.category === 3);
  const categoryFour = ecomissionList.filter((it) => it.category === 4);
  const categoryFive = ecomissionList.filter((it) => it.category === 5);

  const dispatch = useDispatch();
  const ul = useRef();

  /**
   * 서버의 즐겨찾기 목록을 갖고 오기 위한 함수.
   * id : id가 접속 되었을 때 첫 번째 렌더링
   * cnt : cnt 값이 변경 될 때 마다 렌더링 => 현재 완성X 한박자 느리게 화면에 노출됨.
   * ==> 추가시 새로고침으로 임시적으로 해결 상태
   */
  useEffect(() => {
    dispatch(getFavorite({ id: id })).then((res) => {
      if (res.payload.status === 200) {
        setFavoriteArr(res.payload.missionList);
      }
    });
  }, [faDelete, faAdd, famiAdd]);

  useEffect(() => {
    axiosService.get("/daily/trending").then((res) => {
      setTrendingMission(res.data.trendingList);
    });
  }, []);

  useEffect(() => {
    let a;
    let b = window.setInterval(() => {
      ul.current.style.transitionDuration = "400ms";
      ul.current.style.marginTop = "-34px";
      a = window.setTimeout(() => {
        ul.current.style.transitionDuration = "";
        ul.current.style.marginTop = "";
        ul.current.appendChild(ul.current.querySelector("li:first-child"));
      }, 400);
    }, 1500);
    return () => {
      clearInterval(b);
      clearTimeout(a);
    };
  }, []);

  /**
   * 즐겨찾기에서 미션 등록하는 함수.
   */
  const favoMissionSub = (id, faId) => {
    faIdArr.push(faId);
    dispatch(postMission({ id, dailyMissionList: faIdArr })).then((res) => {
      if (res.payload?.status === 200) {
        setFamiAdd(!famiAdd);
        setFamissionList(!famissionList);
      }
    });
  };

  /**
   * 즐겨찾기 목록에서 삭제 하기 위한 함수.
   */
  const onDeleButton = (id, favoriteBoolean, faId, favoriteTrue) => {
    dispatch(
      putFavorite({
        id,
        likeFlag: favoriteBoolean,
        missionType: favoriteTrue,
        missionId: faId,
      })
    ).then((res) => {
      if (res.payload.status === 200) {
        setFaDelete(!faDelete);
      }
    });
  };

  useEffect(() => {
    if (id === 0) {
      return;
    }
    dispatch(trending()).then((res) => {
      if (res.payload.status === 200) {
        setTrend(res.payload.trendingList);
      }
    });
  }, []);

  useEffect(() => {
    setCateOne(categoryOne);
    setCateTwo(categoryTwo);
    setCateThree(categoryThree);
    setCateFour(categoryFour);
    setCateFive(categoryFive);
  }, []);

  const testNum = (number) => {
    setCateNum(number);
  };

  return (
    <div className={styles.topRoot}>
      <div className={styles.Font}>
        <p>오늘은 어떤 도전을 해볼까?</p>
      </div>

      {trendingMission && (
        <fieldset>
          <legend className={styles.word}>Trending</legend>
          <div className={styles.rolling}>
            <ul ref={ul} className={styles.rolling_list}>
              {trendingMission.map((e, i) => {
                return (
                  <li key={i} className={styles.li}>
                    {i + 1} . {e.mission.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </fieldset>
      )}

      <div>
        <span className={styles.favoriteHead}>즐겨찾기</span>
        <hr className={styles.favoriteLine} />

        <div className={styles.favoritescroll}>
          {favoriteArr.length > 0 ? (
            <div>
              {favoriteArr.map((it, idx) => (
                <div key={idx} className={styles.content}>
                  <div>
                    <span className={styles.itemFont}>{it.title}</span>
                  </div>
                  <div>
                    <i
                      className={`${"fa-solid fa-plus"} ${styles.favoriteadd}`}
                      onClick={() => {
                        const faId = it.id;
                        favoMissionSub(id, faId);
                      }}
                    ></i>
                    <i
                      className={`${"fa-solid fa-trash-can"} ${styles.favoritetrash}`}
                      onClick={() => {
                        const faId = it.id;
                        onDeleButton(id, favoriteBoolean, faId, favoriteTrue);
                      }}
                    ></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className={styles.zeroFavorite}>즐겨찾기가 현재 비어있습니다.</p>
              <p> (오늘의 미션으로 이동 시 비어있을수 있습니다!)</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.headCheck}>
        <ul className={styles.headType}>
          <li className={`${styles.liType} ${list ? styles.active : null}`}>
            {" "}
            <span
              className={styles.listType}
              onClick={() => {
                getList(true);
                setCateNum(0);
              }}
            >
              {" "}
              기본{" "}
            </span>
          </li>
          <li className={`${styles.liType} ${!list ? styles.active : null}`}>
            {" "}
            <span
              className={styles.listType}
              onClick={() => {
                getList(false);
              }}
            >
              {" "}
              내목록{" "}
            </span>
          </li>
        </ul>
      </div>
      <div>
        {list === true ? (
          <div>
            {cateNum === 0 ? (
              <div className={styles.cateFlex}>
                <div className={styles.cateListOne}>
                  <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf1.png`} className={styles.leafSize}></img>
                  <span
                    onClick={() => {
                      testNum(1);
                    }}
                  >
                    실천하기
                  </span>
                </div>
                <div className={styles.cateListTwo}>
                  <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf2.png`} className={styles.leafSize}></img>
                  <span
                    onClick={() => {
                      testNum(2);
                    }}
                  >
                    사용하기
                  </span>
                </div>
                <div className={styles.cateListThree}>
                  <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf3.png`} className={styles.leafSize}></img>
                  <span
                    onClick={() => {
                      testNum(3);
                    }}
                  >
                    절약하기
                  </span>
                </div>
                <div className={styles.cateListFour}>
                  <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf4.png`} className={styles.leafSize}></img>
                  <span
                    onClick={() => {
                      testNum(4);
                    }}
                  >
                    구매하기
                  </span>
                </div>
                <div className={styles.cateListFive}>
                  <img src={process.env.PUBLIC_URL + `/tree_leaves/Leaf5.png`} className={styles.leafSize}></img>
                  <span
                    onClick={() => {
                      testNum(5);
                    }}
                  >
                    재활용하기
                  </span>
                </div>
              </div>
            ) : cateNum === 1 ? (
              <div>
                <CateOneList
                  favoriteArr={favoriteArr}
                  id={id}
                  categoryOne={categoryOne}
                  setCateNum={setCateNum}
                  cnt={cnt}
                  setCnt={setCnt}
                  faAdd={faAdd}
                  setFaAdd={setFaAdd}
                />
              </div>
            ) : cateNum === 2 ? (
              <CateTwoList id={id} categoryTwo={categoryTwo} setCateNum={setCateNum} cnt={cnt} setCnt={setCnt} faAdd={faAdd} setFaAdd={setFaAdd} />
            ) : cateNum === 3 ? (
              <CateThreeList id={id} categoryThree={categoryThree} setCateNum={setCateNum} cnt={cnt} setCnt={setCnt} faAdd={faAdd} setFaAdd={setFaAdd} />
            ) : cateNum === 4 ? (
              <CateFourList id={id} categoryFour={categoryFour} setCateNum={setCateNum} cnt={cnt} setCnt={setCnt} faAdd={faAdd} setFaAdd={setFaAdd} />
            ) : (
              <CateFiveList id={id} categoryFive={categoryFive} setCateNum={setCateNum} cnt={cnt} setCnt={setCnt} faAdd={faAdd} setFaAdd={setFaAdd} />
            )}
          </div>
        ) : (
          <div>
            <DailyCustomMissionList id={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyEcoMissionList;
