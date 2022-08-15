/* global kakao */
import React, { useEffect, useRef, useState } from "react";
import { createQuest, getQuestList } from "../../store/quest/questSlice";
import { getLocation } from "../../utils";
import styles from "./Map.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/";
const Map = ({
  openCreateModal,
  makeFlag,
  payload,
  openDeatailModal,
  setCount,
  setMakeFlag,
  count,
  name,
}) => {
  let dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const [lat, setLat] = useState(33.450701);
  const [lon, setLon] = useState(126.570667);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [mapCircle, setMapCircle] = useState(
    new kakao.maps.Circle({
      center: new kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
      radius: 500, // 미터 단위의 원의 반지름입니다
      strokeWeight: 0, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "dashed", // 선의 스타일 입니다
      fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillOpacity: 0.5, // 채우기 불투명도 입니다
    })
  );
  const questMarkers = useSelector((state) => state.quest);
  function getMyLocation() {
    getLocation().then((res) => {
      setLat(res.latitude);
      setLon(res.longitude);
    });
  }
  //초기 맵 객체 생성 이펙트
  const container = useRef();
  useEffect(() => {
    console.log("map 생성");
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      draggable: true,
      level: 5,
    };
    const map = new kakao.maps.Map(container.current, options);
    setKakaoMap(map);
    getMyLocation();
    dispatch(getQuestList());
  }, [container]);
  // 내위치에 마크와 원을 입력하는 이펙트
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    var locPosition = new kakao.maps.LatLng(lat, lon);
    const imageSrc = process.env.PUBLIC_URL + "/questImg/home.png";
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      new kakao.maps.Size(35, 35)
    );
    var marker = new kakao.maps.Marker({
      map: kakaoMap,
      image: markerImage,
      position: locPosition,
      zIndex: 0,
    });
    const circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
      radius: 500, // 미터 단위의 원의 반지름입니다
      strokeWeight: 0, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "dashed", // 선의 스타일 입니다
      fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillOpacity: 0.5, // 채우기 불투명도 입니다
    });
    setMapCircle(circle);
    kakaoMap.setCenter(locPosition);
    console.log("영역 표시");
    circle.setMap(kakaoMap);
  }, [kakaoMap, lat]);
  let markers = [];
  //기존 마커 데이터를 지도에 표시하는 이펙트
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    questMarkers.data
      .filter((quest) => {
        return !quest.finishFlag;
      })
      .map((quest) => {
        const imageSrc = process.env.PUBLIC_URL + "/questImg/gps.png";
        var markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          new kakao.maps.Size(35, 35)
        );

        let position = new kakao.maps.LatLng(quest.lng * 1, quest.lat * 1);
        let marker = new kakao.maps.Marker({
          map: kakaoMap,
          image: markerImage,
          position,
        });

        kakao.maps.event.addListener(marker, "click", function () {
          openDeatailModal(quest.id);
        });
        markers.push(marker);
        let lat1 = position.La * 0.017453;
        let lng1 = position.Ma * 0.017453;
        let lat2 = lon * 0.017453;
        let lng2 = lat * 0.017453;
        let dist =
          6378137 *
          Math.acos(
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
              Math.sin(lat1) * Math.sin(lat2)
          );
        console.log(dist);
        if (dist < 500) {
          setCounter((counter) => counter + 1);
        }
      });
    return () => {
      markers.map((marker) => {
        marker.setMap(null);
      });
      setCounter(0);
    };
  }, [kakaoMap, questMarkers]);
  //핀을 찍을 수 있게 해주는 이펙트
  useEffect(() => {
    setCount(counter);
  }, [counter]);
  useEffect(() => {
    let clickHandler = function (event) {
      let quest = payload;
      quest.lat = event.latLng.La.toString();
      quest.lng = event.latLng.Ma.toString();
      console.log(quest);
      dispatch(createQuest(quest));
      setMakeFlag(false);
    };
    console.log(payload);
    if (makeFlag) {
      kakao.maps.event.addListener(mapCircle, "click", clickHandler);
    }
    return () => {
      kakao.maps.event.removeListener(mapCircle, "click", clickHandler);
    };
  }, [kakaoMap, makeFlag]);
  return (
    <div className={styles.map_wrap}>
      <div ref={container} id="map" className={styles.map}></div>
      <div className={styles.title}>
        <div className={styles.userCount}>
          <p className={styles.text}>
            {name}님 주변에는 현재 {count}개의 퀘스트가 있습니다.
          </p>
        </div>
        <div className={styles.map_my_position}>
          <div
            id="btnMyPosiotion"
            className={styles.btn_my_position}
            onClick={() => {
              kakaoMap.setCenter(new kakao.maps.LatLng(lat, lon));
            }}
          >
            <i className="fa-solid fa-location-arrow"></i>
          </div>
        </div>
        <div className={styles.createQuest}>
          오늘의 퀘스트를 생성하고 함께 참여해보세요!
          <div
            className={styles.createButton}
            onClick={() => {
              openCreateModal();
            }}
          >
            {/* <div className={styles.createButton}>
            {makeFlag ? "취소하기" : "생성하기"} */}
            생성하기{" "}
            <i
              className={`${"fa-solid fa-circle-plus"} ${styles.plusIcon}`}
            ></i>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
