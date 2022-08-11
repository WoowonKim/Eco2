/* global kakao */
import React, { useEffect, useRef, useState } from "react";
import { getLocation } from "../../utils";
import styles from "./Map.module.css";

const Map = ({ makeFlag, open }) => {
  const [lat, setLat] = useState(33.450701);
  const [lon, setLon] = useState(126.570667);
  const [questMarkers, setQuestMarkers] = useState([
    { La: 127.35375221326012, Ma: 36.35524897554767 },
    { La: 127.34753975918593, Ma: 36.35119389270093 },
    { La: 127.35074429523057, Ma: 36.35031940093884 },
    { La: 127.34903313341236, Ma: 36.35630821632346 },
  ]);
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

  function getMyLocation() {
    getLocation().then((res) => {
      console.log("위치구했다.");
      //내위치를 구한다.
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
      level: 5,
    };
    const map = new kakao.maps.Map(container.current, options);
    setKakaoMap(map);
    getMyLocation();
  }, [container]);

  // 내위치에 마크와 원을 입력하는 이펙트
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    console.log("내위치 마커찍기");
    var locPosition = new kakao.maps.LatLng(lat, lon);
    var markerImage = new kakao.maps.MarkerImage(
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
      new kakao.maps.Size(24, 35)
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

  //기존 마커 데이터를 지도에 표시하는 이펙트
  useEffect(() => {
    if (kakaoMap === null) {
      return;
    }
    console.log("퀘스트마커를 찍자");
    const positions = questMarkers.map(
      (pos) => new kakao.maps.LatLng(pos.Ma, pos.La)
    );
    positions.map(
      (position) => new kakao.maps.Marker({ map: kakaoMap, position })
    );
  }, [kakaoMap, questMarkers]);

  //생성하기를 누르면 핀을 찍을 수 있게 해주는 이펙트
  useEffect(() => {
    function addMarker(position) {
      var marker = new kakao.maps.Marker({
        position: position,
      });
      marker.setMap(kakaoMap);
    }
    if (makeFlag) {
      kakao.maps.event.addListener(mapCircle, "click", function (mouseEvent) {
        console.log("잠좀 자자");
        addMarker(mouseEvent.latLng);
        console.log(mouseEvent.latLng);
        open(true);
      });
    }
  }, [kakaoMap, makeFlag]);
  return (
    <div className={styles.map_wrap}>
      <div ref={container} id="map" className={styles.map}></div>
      <div className={styles.map_my_position}>
        <span
          id="btnMyPosiotion"
          className={styles.btn_my_position}
          onClick={() => {
            kakaoMap.setCenter(new kakao.maps.LatLng(lat, lon));
          }}
        >
          내 위치
        </span>
      </div>
    </div>
  );
};

export default Map;
