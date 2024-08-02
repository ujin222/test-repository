// 홈페이지 이름(title) 바꾸기

export function changeTitle(str) {
  const titleElement = document.getElementsByTagName("title")[0];
  titleElement.innerHTML = str;
}
