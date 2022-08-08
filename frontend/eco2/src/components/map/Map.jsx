/* global kakao */
import { add } from "date-fns";
import React, { useEffect, useState } from "react";
import { getLocation } from "../../utils";
import styles from "./Map.module.css";

const Map = ({ makeFlag }) => {
  const [lat, setLat] = useState(33.450701);
  const [lon, setLon] = useState(126.570667);
  const [markers, setmarkers] = useState([]);
  let map;

  let clickHandler = (event) => {
    console.log(event);
    addMarker(event.latLng);
  };

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
    if (makeFlag) {
      window.kakao.maps.event.addListener(map, "click", clickHandler);
    }
    return () => {
      window.kakao.maps.event.removeListener(map, "click", clickHandler);
    };
  }, [lat, lon, makeFlag]);

  function addMarker(position) {
    console.log("called addMarker");
    console.log(position);
    let marker = new window.kakao.maps.Marker({
      position: position,
    });
    marker.setMap(map);
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
