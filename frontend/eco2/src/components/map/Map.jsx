/* global kakao */
import React, { useEffect, useMemo, useState } from "react";
import { getLocation } from "../../utils";
import styles from "./Map.module.css";

const Map = ({ makeFlag, open }) => {
  const [lat, setLat] = useState(33.450701);
  const [lon, setLon] = useState(126.570667);
  let map;
  useEffect(() => {
    getLocation().then((res) => {
      //내위치를 구한다.
      setLat(res.latitude);
      setLon(res.longitude);
      var locPosition = new kakao.maps.LatLng(lat, lon);
      displayMarker(locPosition);
    });
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 5,
    };
    map = new kakao.maps.Map(container, options);
    function displayMarker(locPosition) {
      // 마커를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        new kakao.maps.Size(24, 35)
      );
      var marker = new kakao.maps.Marker({
        map: map,
        image: markerImage,
        position: locPosition,
        zIndex: 0,
      });
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
    // 마커를 생성하고 지도위에 표시하는 함수입니다
    function addMarker(position) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: position,
      });
      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);
    }
    var circle = new kakao.maps.Circle({
      center: new kakao.maps.LatLng(lat, lon), // 원의 중심좌표 입니다
      radius: 500, // 미터 단위의 원의 반지름입니다
      strokeWeight: 0, // 선의 두께입니다
      strokeColor: "#75B8FA", // 선의 색깔입니다
      strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "dashed", // 선의 스타일 입니다
      fillColor: "#CFE7FF", // 채우기 색깔입니다
      fillOpacity: 0.5, // 채우기 불투명도 입니다
    });
    circle.setMap(map);

    if (makeFlag) {
      kakao.maps.event.addListener(circle, "click", function (mouseEvent) {
        // 클릭한 위치에 마커를 표시합니다
        addMarker(mouseEvent.latLng);
        open(true);
      });
    }
  }, [lat, makeFlag]);
  return (
    <div className={styles.map_wrap}>
      <div id="map" className={styles.map}></div>
      <div className={styles.map_my_position}>
        <span
          id="btnMyPosiotion"
          className={styles.btn_my_position}
          onClick={() => {
            map.setCenter(new kakao.maps.LatLng(lat, lon));
          }}
        >
          내 위치
        </span>
      </div>
    </div>
  );
};

export default Map;
