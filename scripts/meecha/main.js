

//ユーザアイコン
const usericon = document.getElementById("usericon");

//ユーザ情報取得処理
async function get_userinfo() {
    try {
        //りくえすと　
        const req = await AccessPost(uinfo_url, {});

        //403の時
        if (req.status == 403) {
            //ログインに戻る
            window.location.href = "./login.html";
            return;
        }

        //ユーザデータ取得
        const userinfo = await req.json();

        //アイコンURL
        usericon.src = GetIconUrl(userinfo["userid"]);

        //ユーザid設定
        UserID = userinfo["userid"];
    } catch (error) {
        //エラー処理
        console.log(error);

        //ログインに戻る
        window.location.href = "./login.html";
        return;
    }
}

get_userinfo();

ws_event_div.addEventListener(ws_event_key, function (evt) {
    const payload = evt.detail["Payload"];
    switch (evt.detail["Command"]) {
        case "near_friend": {
            console.log(payload);
            if (payload["is_first"]) {
                toastr.info(`${payload["unane"]}さんが近くにいます`, "通知", {});
            }
        }
    };
})