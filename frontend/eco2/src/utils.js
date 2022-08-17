// EcoName 길이 검사
export const nameLengthValidation = (value) => {
  if (value.length < 3 || value.length > 8) {
    return true;
  }
  return false;
};

// 비밀번호 유효성 검사
export const passwordValidationCheck = (value) => {
  const passwordRegex = /^.*(?=^.{6,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return !passwordRegex.test(value);
};

// 이메일 유효성 검사
export const emailValidationCheck = (value) => {
  const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return !emailRegex.test(value);
};

// 사용자의 현재 위치 받아오기
export async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const now = new Date();
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            err: 0,
            time: now.toLocaleDateString(),
            timeTwo: now.toISOString().substring(0, 16),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          resolve({
            err: -1,
            latitude: -1,
            longitude: -1,
          });
        },
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
      );
    } else {
      reject({ error: -2, latitude: -1, longitude: -1 });
    }
  });
}
