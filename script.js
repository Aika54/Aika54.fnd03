'use strict'
// 1行目に記載している 'use strict' は削除しないでください
const defaultAccounts = [
  {
    username: "admin",
    password: "password",
    nickname: "ちゃかん",
    birthday: "2003年5月4日",
    mbti: "ENFP",
    place: "愛知",
    favorite: "アニメ・料理🍳",
    image:"Icon.JPEG"
  },
  {
    username: "mayogohan",
    password: "pass1234",
    nickname: "まよごん",
    birthday: "2002年9月25日",
    mbti: "INTP",
    place: "愛知",
    favorite: "音楽・ゲーム🎮",
    image:"Mayo.JPEG"
  },
  {
    username: "maotanien",
    password: "pass1234",
    nickname: "まっちゃ",
    birthday: "2001年6月11日",
    mbti: "ENFP",
    place: "愛知",
    favorite: "食べること・歌う🎵",
    image:"Mao.JPEG"
  }
];

//アカウントの登録
if (localStorage.getItem("accounts") === null) {
  localStorage.setItem(
    "accounts",
    JSON.stringify(defaultAccounts)
  );
}

const loginForm = document.querySelector("#login-form");
const inputName = document.querySelector("#username");
const inputPass = document.querySelector("#password");
const loginError = document.querySelector("#login-error");

const welcomeScreen = document.querySelector("#welcome-screen");
const mypage = document.querySelector("#mypage");

const displayName = document.querySelector("#display-name");
const profileName = document.querySelector("#profile-name");
const logoutButton = document.querySelector("#logout-button");

// MyPageを表示する関数
function showMyPage(name) {
  displayName.textContent = name;
  profileName.textContent = name;

  // ログイン画面を非表示に
  welcomeScreen.classList.add("hidden");
  mypage.classList.remove("hidden");
}

// ログインの処理、名前の取得
loginForm.addEventListener("submit", function (event) {
  loginError.textContent = "";
  //フォームの送信をキャンセル
  event.preventDefault();

  //空だったらページを移動させない
  if (inputName === "" || inputPass === "") {
    alert("必須項目を入力してください！");
    return;
  }

  let loginJudge = false;
  const name = inputName.value;
  const pass = inputPass.value;
  //保存されてるアカウントを取得
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  for (const account of accounts) {
    if (account["username"] === name && account["password"] === pass) {
      loginJudge = true;
      localStorage.setItem("loginUser", account["nickname"]);
      inputPass.value = "";
      inputName.value = "";
      showMyPage(account["nickname"]);
      console.log(account);
      showProfile(account);
    }
  }
  if (!loginJudge) {
    loginError.textContent = "アカウント名またはパスワードが違います";
  }

});

//プロフィール情報を表示
function showProfile(account) {
  document.getElementById("birthday").textContent = account.birthday || "未設定";

  document.getElementById("mbti").textContent = account.mbti || "未設定";

  document.getElementById("place").textContent = account.place || "未設定";

  document.getElementById("favorite").textContent = account.favorite || "未設定";

  document.querySelector("img").src = `../pictures/${account.image}`;
}

// 前回のニックネームがあれば情報を復元
const savedNickname = localStorage.getItem("loginUser");
if (savedNickname) {
  showMyPage(savedNickname);
}

// 退出ボタンが押されたときにログインに戻る
logoutButton.addEventListener("click", function () {
  localStorage.removeItem("loginUser");
  // localStorage.removeItem("accounts");

  // マイページを非表示に
  mypage.classList.add("hidden");
  welcomeScreen.classList.remove("hidden");

});