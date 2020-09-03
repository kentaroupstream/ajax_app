function check() {
  const posts = document.querySelectorAll(".post");     //querySelectorAllメソッドで、postをクラス名にもつ要素を取得できます。postというクラス名を持つ要素はメモの数だけ存在します。
  posts.forEach(function (post) {                       //要素1つずつに対して、「クリック」した際に動作する処理を記述します。
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {              //まずは、forEachを記述して、それぞれの要素への処理を記述する場所を用意します。
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;          
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);   //1000ミリ秒（１秒）に１回check関数を実行します。