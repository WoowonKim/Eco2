/* global kakao */
import React, { useEffect, useState } from "react";
import { getLocation } from "../../utils";
import styles from "./Map.module.css";

const Map = ({ makeFlag }) => {
  const [lat, setLat] = useState(33.450701);
  const [lon, setLon] = useState(126.570667);
  const [markers, setmarkers] = useState([]);
  let map;

  useEffect(() => {
    console.log("called useEffect");
    //지도를 담을 영역의 DOM 레퍼런스
    let container = document.getElementById("map");
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(lat, lon),
      level: 5,
    };
    //지도 생성 및 객체 리턴
    map = new window.kakao.maps.Map(container, options);
    let circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(lat, lon),
      radius: 500,
      fillColor: "#CFE7FF",
      fillOpacity: 0.5,
      strokeOpacity: 0,
    });
    circle.setMap(map);
    moveToMe();
  }, [lat, lon]);
  useEffect(() => {
    console.log(makeFlag);
    window.kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      // 클릭한 위치에 마커를 표시합니다
      let position = mouseEvent.latLng;
      console.log("called addMarker");
      // 마커를 생성합니다
      let marker = new window.kakao.maps.Marker({
        position: position,
      });
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
      // 생성된 마커를 배열에 추가합니다
      let copy = [...markers];
      copy.push(marker);
      setmarkers(marker);
    });
  }, []);
  function addMarker(position) {
    console.log("called addMarker");
    // 마커를 생성합니다
    let marker = new window.kakao.maps.Marker({
      position: position,
    });
    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    // 생성된 마커를 배열에 추가합니다
    let copy = [...markers];
    copy.push(marker);
    setmarkers(marker);
  }

  function moveToMe() {
    console.log("called movetome");
    getLocation().then((res) => {
      setLat(res.latitude);
      setLon(res.longitude);
      let moveLotLon = new window.kakao.maps.LatLng(
        res.latitude,
        res.longitude
      );
      map.panTo(moveLotLon);
      let imgSrc = process.env.PUBLIC_URL + "Reddot.png";
      let imgSize = new window.kakao.maps.Size(300, 300);
      let imgOption = { offset: new kakao.maps.Point(150, 150) };
      let markerImg = new window.kakao.maps.MarkerImage(
        imgSrc,
        imgSize,
        imgOption
      );
      let markerMe = new window.kakao.maps.Marker({
        position: moveLotLon,
        image: markerImg,
      });
      markerMe.setMap(null);
      markerMe.setMap(map);
    });
  }

  return (
    <div className={styles.map_wrap}>
      <div id="map" className={styles.map}></div>
      <div
        className={styles.map_my_position}
        onClick={() => {
          moveToMe();
        }}
      >
        <span id="btnMyPosiotion" className={styles.btn_my_position}>
          내 위치
        </span>
      </div>
    </div>
  );
};

export default Map;
