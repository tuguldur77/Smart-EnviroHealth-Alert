# 📘 스마트 환경·헬스케어 알리미 (Smart EnviroHealth Alert)
> 공공데이터포털(OpenAPI)을 활용한 스마트시티 헬스케어 서비스  
> On-Premise(Express.js + Axios) 기반 구현 프로젝트  

---

## 🌍 프로젝트 개요
**스마트 환경·헬스케어 알리미**는 기상청, 환경부, 질병관리청의 공공데이터를 활용하여  
사용자 위치 기반의 실시간 날씨, 대기오염, 건강 알림 정보를 제공하는 서비스입니다.  
이를 통해 시민들이 환경 변화에 신속하게 대응하고, 건강을 효율적으로 관리할 수 있도록 지원합니다.  

---

## ⚙️ 기술 스택

| 구분 | 사용 기술 |
|------|------------|
| **백엔드** | Node.js · Express.js · Axios · CORS · Dotenv |
| **프론트엔드** | HTML · CSS · JavaScript · Chart.js |
| **공공데이터 API** | 기상청 단기예보 API · 환경부 대기오염정보 API · (선택) 질병통계 API |
| **개발 환경** | On-Premise (Localhost) |
| **형상 관리** | Git + GitHub |

---

## 📁 폴더 구조
```bash
Smart-EnviroHealth-Alert/
│
├── server/
│ ├── index.js # Express 서버 진입점
│ ├── routes/
│ │ ├── weather.js # 기상청 데이터 라우트
│ │ ├── air.js # 환경부 대기오염 데이터 라우트
│ │ └── alert.js # 건강 알림 로직 라우트
│ ├── services/
│ │ ├── weatherService.js
│ │ ├── airService.js
│ │ └── alertService.js
│ └── .env # API 키 저장
│
├── public/
│ ├── index.html # 메인 화면
│ ├── style.css # 스타일시트
│ └── script.js # 클라이언트 스크립트
│
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 설치 및 실행 방법

### 1️⃣ 저장소 클론
```bash
git clone https://github.com/tuguldur77/Smart-EnviroHealth-Alert.git
cd Smart-EnviroHealth-Alert
```

### 2️⃣ 패키지 설치
```bash
npm install express axios cors dotenv
```

### 3️⃣ 서버 실행
```bash
node server/index.js
```
