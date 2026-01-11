0) 자기소개/프로젝트 한 줄 요약(필살기)
🇯🇵

既存のlocalStorageベースのCRUDログアプリを運用し、JSONでexportしたデータをNext.js(API Routes)+MongoDBに移行(import)して永続化しました。開発中に500エラーやMongoDB SRV(DNS)問題もログベースで原因を特定して解決しました。

🇰🇷

기존 localStorage 기반 CRUD 로그 앱을 운영하다가 JSON으로 export한 데이터를 Next.js(API Routes)+MongoDB로 이관(import)하여 영구 저장 구조로 확장했습니다. 개발 과정에서 500 에러와 MongoDB SRV(DNS) 문제도 로그 기반으로 원인을 특정해 해결했습니다.

1) このプロジェクトは何ですか？（프로젝트 설명）
🇯🇵 Q

このプロジェクトは何を作りましたか？

🇯🇵 A

学習ログを記録するWebアプリです。
最初はlocalStorageでCRUDを実装しましたが、ログが増えてくると端末依存になるため、JSON export → Next.js API → MongoDBに移行して、どこからでも閲覧・記録できる構成にしました。

🇰🇷 Q

이 프로젝트는 무엇을 만들었나요?

🇰🇷 A

학습 로그를 기록하는 웹앱입니다.
처음에는 localStorage로 CRUD를 구현했지만, 기록이 늘어나면서 기기 종속 문제가 있어서 JSON export → Next.js API → MongoDB로 이관하여 어디서든 열람/기록할 수 있는 구조로 확장했습니다.

2) なぜNext.jsを選びましたか？（Next 선택 이유）
🇯🇵 Q

なぜNext.jsを使ったんですか？Viteではなく？

🇯🇵 A

Viteはフロントエンド構築には最適ですが、DB連携をするとAPIサーバーを別で運用する必要があります。
今回は「記録＝永続化」が目的だったので、Next.jsでAPI Routesを作ってMongoDBを接続し、フルスタック構成を1つのプロジェクトで完結させました。

🇰🇷 Q

왜 Vite가 아니라 Next.js를 선택했나요?

🇰🇷 A

Vite는 프론트엔드 구축에는 좋지만 DB 연동을 하려면 API 서버를 별도로 운영해야 합니다.
이번 프로젝트는 “기록의 영구 저장”이 목적이라 Next.js로 API Routes를 만들고 MongoDB에 연결하여 풀스택 구성을 하나의 프로젝트로 끝내는 방식이 더 적합했습니다.

3) データ移行(import)はどうやりましたか？（핵심 포인트)
🇯🇵 Q

localStorageのデータをMongoDBへどうやって移行しましたか？

🇯🇵 A

まずlocalStorageのログをJSONファイルとしてexportしました。
次にNext.js側でImport API(/api/import)を作成して、JSONをアップロードするとMongoDBにinsertManyする仕組みにしました。既存のdate(作成日)もそのまま保持できるように設計しました。

🇰🇷 Q

localStorage 데이터를 MongoDB로 어떻게 옮겼나요?

🇰🇷 A

먼저 localStorage 로그를 JSON 파일로 export 했습니다.
그 다음 Next.js에서 Import API(/api/import)를 만들고 JSON을 업로드하면 MongoDB에 insertMany로 저장되도록 구현했습니다. 기존 date(작성일)도 그대로 보존하도록 설계했습니다.

4) CRUDの設計を説明してください（구조 설명)
🇯🇵 Q

CRUDの設計はどうなっていますか？

🇯🇵 A

クライアントは/api/logsに対して通信します。

GET /api/logs：検索・フィルター込み一覧

POST /api/logs：新規作成

PATCH /api/logs/:id：更新

DELETE /api/logs/:id：削除
Next.jsのRoute Handlerで処理し、MongoDBのcollectionに反映しています。

🇰🇷 Q

CRUD 설계는 어떻게 되어 있나요?

🇰🇷 A

클라이언트는 /api/logs에 통신합니다.

GET /api/logs : 검색/필터 포함 목록 조회

POST /api/logs : 신규 생성

PATCH /api/logs/:id : 수정

DELETE /api/logs/:id : 삭제
Next.js Route Handler에서 처리하고 MongoDB collection에 반영합니다.

5) 500エラーの原因と解決（실무형 질문 1순위)
🇯🇵 Q

500エラーが発生した時、どうやって原因を特定しましたか？

🇯🇵 A

ブラウザのNetworkで500を確認して、API route側にtry/catchとログを追加しました。
その結果、MongoDB接続のSRV解決が失敗していることがわかり、接続文字列やDNS/ネットワーク設定を確認して解決しました。原因を分離するために「フロント／API／DB」を順番に切り分けました。

🇰🇷 Q

500 에러가 발생했을 때 어떻게 원인을 찾았나요?

🇰🇷 A

브라우저 Network 탭에서 500을 확인하고 API route에 try/catch와 로그를 추가했습니다.
그 결과 MongoDB 접속 SRV(DNS) 해결이 실패하는 것을 확인했고, 연결 문자열과 DNS/네트워크 설정을 점검하여 해결했습니다. 원인을 분리하기 위해 프론트/API/DB 순서로 단계적으로 범위를 좁혔습니다.

6) MongoDBの接続情報はどう管理しましたか？（보안)
🇯🇵 Q

MongoDBの接続情報はどう管理しましたか？

🇯🇵 A

.env.localで管理し、クライアント側には公開しません。
Next.jsのRoute Handler（サーバー側）からのみMongoDBにアクセスするようにして、接続文字列が漏れない構成にしました。

🇰🇷 Q

MongoDB 접속 정보는 어떻게 관리했나요?

🇰🇷 A

.env.local로 관리하며 클라이언트에 노출되지 않도록 했습니다.
Next.js Route Handler(서버 측)에서만 MongoDB에 접근하도록 구성해 접속 문자열이 유출되지 않게 했습니다.

7) フィルター・検索はどこで処理していますか？
🇯🇵 Q

検索やフィルターはクライアントでやってますか？サーバーでやってますか？

🇯🇵 A

基本はサーバー側に寄せています。
GET /api/logs?filter=...&search=... のようにクエリを渡して、MongoDBで検索対象を絞って返します。ログが増えるほどクライアント処理よりサーバー処理の方が拡張しやすいと考えました。

🇰🇷 Q

검색/필터는 클라이언트에서 하나요? 서버에서 하나요?

🇰🇷 A

기본적으로 서버에서 처리합니다.
GET /api/logs?filter=...&search=... 형태로 쿼리를 전달하고 MongoDB에서 필터링해 결과만 반환합니다. 데이터가 늘어날수록 클라이언트 처리보다 서버 처리 쪽이 확장성이 좋다고 판단했습니다.

8) Importを複数回実行したら重複しませんか？（상급 질문)
🇯🇵 Q

Importを何回も実行したらデータが重複しませんか？

🇯🇵 A

現状はinsertManyなので重複の可能性はあります。
次の改善案としてlegacyIdやhashを使った重複防止、または「初回だけimport可能」に制限する設計を考えています。

🇰🇷 Q

Import를 여러 번 하면 중복 저장되지 않나요?

🇰🇷 A

현재는 insertMany 방식이라 중복 가능성이 있습니다.
개선 방향으로 legacyId 또는 hash 기반 중복 방지, 혹은 최초 1회만 import 가능하도록 제한하는 방식도 고려하고 있습니다.

9) 次に追加したい機能は？（성장 질문)
🇯🇵 Q

次に追加したい機能はありますか？

🇯🇵 A

優先順位は3つあります。

認証（ログイン）

ページネーションと並び替え

バックアップ/エクスポート（DB → JSON）
実際に運用するサービスとして継続できるように改善していきます。

🇰🇷 Q

다음으로 추가하고 싶은 기능이 있나요?

🇰🇷 A

우선순위는 3가지입니다.

인증(로그인)

페이지네이션과 정렬

백업/내보내기(DB → JSON)
실제로 운영 가능한 서비스 형태로 개선해나갈 예정입니다.

10) AIを使いましたか？（AI 질문 대비)
🇯🇵 Q

AIは使いましたか？

🇯🇵 A

はい、開発の補助ツールとして使用しました。ただし設計・検証・デバッグは自分で行いました。
特に環境変数、DB接続、500エラーの原因切り分けはログを見ながら対応しました。AIは反復作業のスピードを上げるために使っています。

🇰🇷 Q

AI를 사용했나요?

🇰🇷 A

네, 개발 보조 도구로 사용했습니다. 다만 설계/검증/디버깅은 제가 직접 진행했습니다.
특히 환경변수, DB 연결, 500 에러 원인 분리는 로그 기반으로 해결했습니다. AI는 반복 작업 속도를 높이기 위해 사용했습니다.