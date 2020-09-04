function memo() {
  const submit = document.getElementById("submit");     //送信ボタン（id="submit"）の要素を取得
  submit.addEventListener("click", (e) => {     //送信ボタンをクリックしたときのイベントハンドラー（処理）を記述
    const formData = new FormData(document.getElementById("form"));   //フォームに入力されたデータを読み込んで変数formDataに代入
    const XHR = new XMLHttpRequest();   //XMLHttpRequest（はがき）を作成
    XHR.open("POST", "/posts", true);   //どんなリクエストにするか指定
    XHR.responseType = "json";          //レスポンスのデータ形式をJSONに指定
    XHR.send(formData);                 //ハガキ(XHR)にフォームに入力されたデータを書いてリクエスト送信！
    XHR.onload = () => {      //レスポンスが返ってきた後の処理↓
      if (XHR.status != 200) {      //エラーが起きたときのエラー文と処理中断
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;   //レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");   //HTMLを「描画する場所」を指定する際に使用する「描画する親要素」のlistの要素を取得(28行目で使う)
      const formText = document.getElementById("content");    //メモの入力フォームをリセットするため。この処理が終了した時に、入力フォームの文字は入ったままになってしまうため、リセットする必要があります。
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);      //「メモとして描画する部分のHTML」を定義し、list要素の直後(afterend)にHTML(19行目)を挿入する。
      formText.value = ""     //入力フォームを空にリセットしてくれる。
    };
    e.preventDefault();   //JavaScriptの処理と、コントローラーのcreateアクションが、重複しないように送信処理をキャンセルする。
  });
}
window.addEventListener("load", memo);