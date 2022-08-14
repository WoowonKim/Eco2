import React, { useEffect, useState } from "react";
import FeedList from "../../components/feed/feedList/FeedList";
import styles from "./MainFeed.module.css";
import { Link } from "react-router-dom";
import { postList } from "../../store/post/postSlice";
import { useDispatch } from "react-redux";

const MainFeed = () => {
  const [feeds, setFeeds] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("scroll-container").scrollTop = 0;
    dispatch(postList()).then((res) => {
      console.log(res);
      if (res.payload?.status === 200) {
        setFeeds(res.payload.postListDtos);
      }
    });
  }, []);
  return (
    <div className={styles.mainFeed}>
      <div className={styles.session1}>
        <Link to={`/mainFeed/${"do"}`} state={{ category: 1, feeds }}>
          <div className={styles.do1}>
            <div className={styles.do1Title}>
              <i className={`fa-solid fa-person-walking fa-1x`}></i><span> 실천하기</span>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.session2}>
        <Link to={`/mainFeed/${"do"}`} state={{ category: 2, feeds }}>
          <div className={styles.do2}>
            <div className={styles.do2Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i><span> 사용하기</span>
            </div>
          </div>
        </Link>
        <Link to={`/mainFeed/${"do"}`} state={{ category: 3, feeds }}>
          <div className={styles.do3}>
            <div className={styles.do3Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i><span> 절약하기</span>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.session3}>
        <Link to={`/mainFeed/${"do"}`} state={{ category: 4, feeds }}>
          <div className={styles.do4}>
            <div className={styles.do4Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i><span> 구매하기</span>
            </div>
          </div>
        </Link>
        <Link to={`/mainFeed/${"do"}`} state={{ category: 5, feeds }}>
          <div className={styles.do5}>
            <div className={styles.do5Title}>
              <i className={`fa-solid fa-cookie-bite fa-1x`}> </i><span> 재활용하기</span>
            </div>
          </div>
        </Link>
      </div>
    </div>

    // <div id="scroll-container">
    //   <div className={styles.container}>
    //     <div className={styles.title}>
    //       <i className={`fa-solid fa-person-walking fa-2x ${styles.iconDo}`}></i>
    //       <h2 className={styles.text}>실천하기</h2>

    //       <Link
    //         to={`/mainFeed/${"do"}`}
    //         className={styles.link}
    //         state={{ category: 1, feeds }}
    //       >
    //         <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>

    //       </Link>
    //     </div>
    //     <div className={styles.list}>
    //       <FeedList category={1} display={"list"} feeds={feeds} />
    //     </div>
    //   </div>
    //   <div className={styles.container}>
    //     <div className={styles.title}>
    //       <i className={`fa-solid fa-cookie-bite fa-2x ${styles.iconUse}`}></i>
    //       <h2 className={styles.text}>사용하기</h2>
    //       <Link
    //         to={`/mainFeed/${"use"}`}
    //         className={styles.link}
    //         state={{ category: 2, feeds }}
    //       >
    //         <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}

    //       </Link>
    //     </div>
    //     <div className={styles.list}>
    //       <FeedList category={2} display={"list"} feeds={feeds} />
    //     </div>
    //   </div>
    //   <div className={styles.container}>
    //     <div className={styles.title}>
    //       <i className={`fa-solid fa-arrows-down-to-line fa-2x ${styles.iconSave}`}></i>
    //       <h2 className={styles.text}>절약하기</h2>
    //       <Link
    //         to={`/mainFeed/${"save"}`}
    //         className={styles.link}
    //         state={{ category: 3, feeds }}
    //       >
    //         <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}

    //       </Link>
    //     </div>
    //     <div className={styles.list}>
    //       <FeedList category={3} display={"list"} feeds={feeds} />
    //     </div>
    //   </div>
    //   <div className={styles.container}>
    //     <div className={styles.title}>
    //       <i className={`fa-solid fa-basket-shopping fa-2x ${styles.iconBuy}`}></i>
    //       <h2 className={styles.text}>구매하기</h2>
    //       <Link
    //         to={`/mainFeed/${"buy"}`}
    //         className={styles.link}
    //         state={{ category: 4, feeds }}
    //       >
    //         <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}

    //       </Link>
    //     </div>
    //     <div className={styles.list}>
    //       <FeedList category={4} display={"list"} feeds={feeds} />
    //     </div>
    //   </div>
    //   <div className={styles.container}>
    //     <div className={styles.title}>
    //       <i className={`fa-solid fa-recycle fa-2x ${styles.iconRecycle}`}></i>
    //       <h2 className={styles.text}>재활용하기</h2>
    //       <Link
    //         to={`/mainFeed/${"recycle"}`}
    //         className={styles.link}
    //         state={{ category: 5, feeds }}
    //       >
    //         <i className={`fa-solid fa-circle-plus ${styles.plusIcon}`}></i>{" "}

    //       </Link>
    //     </div>
    //     <div className={styles.list}>
    //       <FeedList category={5} display={"list"} feeds={feeds} />
    //     </div>
    //   </div>
    // </div>
  );
};

export default MainFeed;
