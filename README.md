# KARAAGE STAND — GitHub Pages + Firebase

このフォルダーの中身をGitHubリポジトリの**ルート直下**へアップロードして公開します。HTMLはFirebase JavaScript SDKのCompat CDN版を利用するため、npmやビルド作業は不要です。
※ またこのWebサイト製作にあたり生成AIの"ChatGPT"と"Gemini"を使用しています。ご了承くださいませ。

## 1. ファイル構成

```text
index.html  ###このサイトの大元でここにCSSやJSが書かれています。
firebase-config.js #### 簡潔に述べるとFireBaseというデータベースサービスは不特定多数のユーザーが当サイトでアクションをするときの受け皿になっています。
firestore.rules
storage.rules
firebase.json
.nojekyll
README.md　　#### ReadMeファイルには、基本的に伝えたいこと、導入手順などが書かれています
01.png
02.png
03.png
04.png　### 当サイトで使用している画像です。画像サイズは横×縦=1920×1080pxです。
05.png
06.png
07.png
08.png
AprilGothicOne-R_v1.01.ttf ### 当サイトで使用させて頂いている"エイプリル"という名前のフォントです。
```

画像とフォントは `index.html` と同じ階層に置きます。`images/` や `Fonts/` などのサブフォルダーは使いません。

**注意：今回の作業環境には画像8枚とエイプリルフォントの実ファイルが添付されていなかったため、ZIPには入っていません。** 手元のPNGを `01.png` ～ `08.png` に、フォントを `AprilGothicOne-R_v1.01.ttf` にしてルートへ追加してください。画像は1920×1080pxを想定しています。

## 2. Firebaseプロジェクトを作成する

1. [Firebase Console](https://console.firebase.google.com/) を開き、Googleアカウントでログインします。
2. 「プロジェクトを追加」から新しいプロジェクトを作成します。Analyticsはこのサイトの必須機能ではありません。
3. プロジェクトの概要でWebアプリ（`</>`）を追加します。アプリ名は `Karaage Stand` など任意で構いません。
4. 表示されたWebアプリ設定値を控えます。`apiKey`、`authDomain`、`projectId`、`messagingSenderId`、`appId` が必要です。

## 3. Authenticationを設定する

1. Firebase Consoleの「構築」→「Authentication」→「始める」を開きます。
2. 「Sign-in method」で **匿名（Anonymous）** を有効にします。来場者はアカウント登録なしで匿名認証されます。
3. 同じ画面で **メール／パスワード（Email/Password）** も有効にします。これは管理者ログイン用です。
4. Authenticationの「設定」→「承認済みドメイン」に、GitHub Pagesのホスト名を追加します。例：`your-account.github.io`。`https://` やリポジトリ名以下のパスは付けません。独自ドメインを使う場合はそのドメインも追加します。
5. 「ユーザー」タブから管理者用ユーザーを追加し、メールアドレスと強いパスワードを設定します。
6. 作成したユーザーの **UID** をコピーします。これは次の2か所に設定します。

匿名認証はFirebase Authenticationの匿名プロバイダーを利用します。Consoleでの有効化が必要です。

## 4. Firestore Databaseを作成する

1. Firebase Consoleの「構築」→「Firestore Database」→「データベースを作成」を開きます。
2. **本番環境モード** を選びます（あとで同梱ルールを公開します）。
3. ロケーションは原則として利用者に近い場所を選びます。日本向けなら `asia-northeast1`（東京）などを候補にします。データベース作成後、ロケーションは簡単には変更できません。
4. 作成後、「ルール」タブを開き、同梱の `firestore.rules` の内容を貼り付けて「公開」します。
5. `firestore.rules` 内の `REPLACE_WITH_ADMIN_USER_UID` を、手順3でコピーした管理者UIDに置き換えてから公開してください。

このサイトが利用するコレクションは次のとおりです。

- `comments`：レビュー本文、星評価、リアクション、返信、添付ファイル情報
- `feedback`：改善点・ダメ出し
- `siteState/counters`：購入報告数、待機列人数、おいしい投票数
- `queueUsers`：匿名ユーザーごとの待機列参加状態

## 5. firebase-config.js を編集する

`firebase-config.js` をテキストエディターで開き、Firebase ConsoleのWebアプリ設定を転記します。

```javascript
window.KARAAGE_FIREBASE_CONFIG = {
  apiKey: "FirebaseのapiKey",
  authDomain: "プロジェクトID.firebaseapp.com",
  projectId: "プロジェクトID",
  storageBucket: "",
  messagingSenderId: "messagingSenderId",
  appId: "appId"
};

window.KARAAGE_ADMIN_UID = "管理者ユーザーのUID";
```

実際のファイルにはコメント付きのひな形が入っています。`storageBucket` は、画像・動画共有を有効にしない限り空欄のままで構いません。

Firebase Web設定の `apiKey` はブラウザーに配布される公開識別子で、パスワードや秘密鍵ではありません。データ保護はFirestore/Storage Security Rulesで行います。サービスアカウントJSON、秘密鍵、管理者パスワードは絶対にHTMLやこのファイルへ書かないでください。

## 6. 画像・動画添付についての重要な料金条件

**Firestoreのコメント・返信・いいね／わるいね・改善点・購入報告・待機列・おいしい投票は、Spark（無料）プランを前提に構成しています。**

Cloud Firestoreの無料枠は、標準エディションの無料データベース1つについて、保存1GiB、読み取り50,000件/日、書き込み20,000件/日、削除20,000件/日、送信データ10GiB/月です。上限超過時にどうなるかはプランとサービスの条件を確認してください。

ただし、**Firebase Storageは2026年2月3日以降、Sparkプランでは利用できず、バケットを作成・利用するにはBlaze（従量課金）プランが必要**です。Blazeでも一定の無料利用枠がありますが、無料枠超過分は請求されます。したがって、画像・動画の来場者アップロードまで「請求先登録なしの完全無料」で実現することはできません。

### Sparkのまま使う場合

- `firebase-config.js` の `storageBucket` は空欄にします。
- 画像・動画の共有添付ボタンは自動的に無効になります。
- それ以外のFirestore共有機能は利用できます。

### 画像・動画の共有添付も使う場合

1. Blazeへの変更が必要です。Cloud Billingアカウントをリンクする前に、支払い方法と利用条件を確認してください。
2. Firebase Consoleの「Storage」からバケットを作成します。
3. 表示されたバケット名（新しい既定バケットは通常 `プロジェクトID.firebasestorage.app`）を `firebase-config.js` の `storageBucket` に設定します。
4. 同梱の `storage.rules` の `REPLACE_WITH_ADMIN_USER_UID` も管理者UIDに置き換え、Storageの「ルール」へ公開します。
5. 請求アラート／予算通知を設定します。予算アラートは通知であり、利用額を自動停止する上限ではありません。

画像は1ファイル8MBまで、動画は24MBまで、1投稿最大3ファイル・合計25MB以内の制限を付けています。公開投稿なので、人物が写るメディアの許可、著作権、プライバシーにも注意してください。

## 7. 管理者UIDをルールへ反映する

`REPLACE_WITH_ADMIN_USER_UID` を、**次の2ファイルで同じUIDへ置き換えます**。

- `firestore.rules`
- `storage.rules`（Storageを有効にする場合）

さらに `firebase-config.js` の `window.KARAAGE_ADMIN_UID` にも同じUIDを設定します。画面側のUID設定だけでは管理者権限になりません。実際の制限はSecurity Rules側で行います。

## 8. GitHub Pagesへ公開する

1. GitHubで新しいリポジトリを作ります。例：`karaage-stand`。
2. このフォルダーのファイルをリポジトリの **ルート直下** にアップロードします。`index.html` がトップ階層に必要です。
3. `index.html`、`firebase-config.js`、画像、フォントをコミットします。
4. GitHubリポジトリの「Settings」→「Pages」を開きます。
5. Build and deploymentのSourceを「Deploy from a branch」にし、Branchを `main`、Folderを `/(root)` にして保存します。
6. 数分後に表示される `https://アカウント名.github.io/リポジトリ名/` を開きます。
7. このホスト名（`アカウント名.github.io`）をFirebase Authenticationの承認済みドメインに追加します。

GitHub Pagesは公開元フォルダーのトップレベルに `index.html` などの入口ファイルを必要とします。

## 9. 公開前の動作確認

スマートフォン2台とPCなど、別々のブラウザーを使って確認します。

- ページを開き、ヘッダーのコメント件数がFirestoreの件数と一致する。
- コメント投稿が別端末にも反映される。
- いいね／わるいねを切り替えられ、連打による二重加算が起きない。
- 返信が別端末にも表示される。
- 改善点の投稿とスライドイン一覧が同期される。
- 「買ったよ！」で売上カウントが増える。
- 「並んでる！」で待機列が増え、「列から抜けた」で減る。
- 「おいしい！」投票が他端末にも反映される。
- 管理者アカウントのみ管理者パネルが表示され、全コメント削除が実行できる。
- Storageを有効にした場合、画像／動画のアップロード・表示・削除権限を確認する。
- CSVを出力し、日本語がExcelで文字化けしない。

**待機列について：** 「並んでる！」を押すと、そのブラウザーの匿名ユーザーIDに6分間の参加期限を付けます。参加中は90秒ごとに期限を延長し、「列から抜けた」で即時退出します。タブやブラウザーを閉じたり通信が切れたりして退出操作が届かなくても、期限が切れると人数から除外されます。バックグラウンド制限などで期限延長が止まった場合は、列から外れることがあるため、必要なら再度「並んでる！」を押してください。人数は自己申告ベースなので、実際の列と照合してください。

## 10. 無料枠・セキュリティの注意

- Firestore無料枠は無制限ではありません。リアルタイム監視は利用者・コメント数に応じて読み取りを消費します。
- 公開サイトなので、スパム・連続投稿・荒らしの可能性があります。匿名認証は本人確認ではありません。
- Firebase App Checkの導入を追加で検討してください。Security Rulesと併用する保護策で、Rulesの代わりにはなりません。
- 管理者用メール・パスワードは共有PCに保存しないでください。管理者作業後はログアウトしてください。
- 本サイトの売上カウントはボタンの報告回数でありPOSレジではありません。待機列も自己申告値です。正式な会計・列管理の唯一の情報源にしないでください。
- 投稿に個人情報を入力しないよう案内し、投稿内容を確認できる担当者を決めておいてください。

## 11. Firebase CLIでルールを公開する場合（任意）

Firebase CLIを使える場合は、このフォルダーで次のコマンドを実行します。

```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules
```

StorageをBlazeで有効にした場合のみ、追加で次を実行します。

```bash
firebase deploy --only storage
```

GitHub Pagesの公開そのものにはFirebase CLIは不要です。コンソールからルールを貼り付けて公開しても構いません。
