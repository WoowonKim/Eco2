import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosService from "../../store/axiosService";
import {
  removeUserSession,
  setUserEmail,
  setUserId,
  setUserName,
} from "../../store/user/common";
import { kakaoLogin } from "../../store/user/userSlice";

function KakaoLogin() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const code = searchParams.get("code");
  // 서버에서 코드 유효성 검증 받기
  if (code) {
    dispatch(
      kakaoLogin({
        idToken: code,
      })
    ).then((res) => {
      console.log(res);
      if (res.payload.status === 200) {
        axiosService.defaults.headers.common[
          "Auth-accessToken"
        ] = `${res.payload.accessToken}`;
        if (!res.payload.user.name) {
          setUserEmail(false, res.payload.user.email);
          setUserId(false, res.payload.user.id);
          navigate("/ecoName");
        } else {
          setUserEmail(false, res.payload.user.email);
          setUserId(false, res.payload.user.id);
          setUserName(false, res.payload.user?.name);
          navigate("/mainTree");
        }
      } else if (res.payload.status === 202) {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=http://localhost:3000/kakao&scope=account_email`;
      } else {
        removeUserSession();
        navigate("/");
      }
    });
  } else {
    console.log("카카오 로그인 실패: token 받아오지 못함");
    navigate("/");
  }
}

export default KakaoLogin;
