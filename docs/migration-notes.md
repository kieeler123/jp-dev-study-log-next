10) Next.js 버전으로 확장한 이유

원본의 설계를 유지한 채로 확장하기 위해 Next.js + MongoDB로 마이그레이션했다.

LocalStorage는 기기 종속 → 서버 저장 필요

데이터 축적량 증가 → DB 필요

어느 기기에서든 기록 가능하도록 배포 필요

원본 버전에서 이미 CRUD 구조가 잡혀 있었기 때문에
Next.js 버전은 “기능 추가”가 아니라 저장소/배포 확장에 집중할 수 있었다.

11) ToDo (개인)

원본 버전 백업 유지

JSON export 기능 유지

Next.js 버전에서 import 기능 안정화

UI 커스터마이징(Theme)로 확장