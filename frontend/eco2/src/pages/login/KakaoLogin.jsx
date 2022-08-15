import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosService from "../../store/axiosService";
import {
  removeUserSession,
  setAccessToken,
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
        if (!res.payload.user.name) {
          setUserEmail(false, res.payload.user.email);
          setUserId(false, res.payload.user.id);
          setAccessToken(false, res.payload.accessToken);
          navigate("/ecoName");
        } else {
          setUserEmail(false, res.payload.user.email);
          setUserId(false, res.payload.user.id);
          setUserName(false, res.payload.user?.name);
          setAccessToken(false, res.payload.accessToken);

          window.location.replace("/mainTree");
        }
      } else if (res.payload.status === 202) {
        alert(res.payload.msg);
        navigate("/");
      } else if (res.payload.status === 203) {
        alert(res.payload.msg);
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT}&scope=account_email`;
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
