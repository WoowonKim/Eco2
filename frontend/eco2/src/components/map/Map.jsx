/* global kakao */
import React, { useEffect, useState } from "react";
import { getLocation } from "../../utils";
import styles from "./Map.module.css";

const { kakao } = window;

const Map = () => {
  const [lat, setLat] = useState(35.85133);
  const [lon, setLon] = useState(127.734086);
  const [message, setMessage] = useState("test");

  useEffect(() => {
    const container = document.getElementById("map");

    const options = {
      center: new window.kakao.maps.LatLng(lat, lon),
      level: 7,
    };
    const map = new window.kakao.maps.Map(container, options);

    console.log("loading kakaomap");
    getLocation().then((res) => {
      setLat(res.latitude);
      setLon(res.longitude);

      const pos = new kakao.maps.LatLng(res.latitude, res.lognitude);
      const marker = new kakao.maps.Marker({
        map: map,
        position: pos,
      });
    });
  }, [lat]);
  return (
    <div>
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Map;
