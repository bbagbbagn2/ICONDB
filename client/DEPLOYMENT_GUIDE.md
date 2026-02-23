# 🚀 ICONDB 클라이언트 배포 가이드

프론트엔드를 Vercel 또는 Netlify에 배포합니다.

## 📋 필수 사항

- GitHub 계정
- Vercel 또는 Netlify 계정 (무료)
- 서버 배포 완료 (API URL 필요)

---

## 🔧 Step 1: 배포 준비

### 1-1. 서버 URL 확인

Render/Railway 배포된 서버 URL:

```
https://your-icondb-server.onrender.com
```

### 1-2. 환경변수 파일 생성

```bash
cd client

# .env.production 파일 생성
cat > .env.production << EOF
VITE_API_URL=https://your-icondb-server.onrender.com
VITE_CLIENT_URL=https://your-frontend-url.vercel.app
EOF
```

### 1-3. 빌드 테스트

```bash
# 의존성 설치
npm install

# 프로덕션 빌드
npm run build

# 빌드 결과 확인
ls -la dist/
```

✅ `dist/` 폴더가 생성되면 성공!

---

## 🚀 선택지 1: Vercel 배포 (권장, 가장 쉬움)

### 1-1. GitHub 저장소 준비

```bash
cd client

# Git 초기화
git init
git add .
git commit -m "Initial client commit"
git branch -M main

# GitHub에 푸시
git remote add origin https://github.com/your-username/icondb-client.git
git push -u origin main
```

### 1-2. Vercel 배포

1. **[vercel.com](https://vercel.com)** 방문
2. **GitHub으로 로그인**
3. **Add New** → **Project**
4. **Import Git Repository** → 자신의 `icondb-client` 선택
5. **Import**

### 1-3. 설정

**Project Settings:**

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 1-4. 환경변수 설정

**Environment Variables** 탭에서:

```
VITE_API_URL=https://your-icondb-server.onrender.com
VITE_CLIENT_URL=https://your-project.vercel.app
```

### 1-5. 배포

**Deploy** 클릭 → 자동 배포 시작

**배포 완료!**

```
🎉 https://your-project.vercel.app
```

---

## 🚀 선택지 2: Netlify 배포 (대안)

### 2-1. Netlify 설정

1. **[netlify.com](https://netlify.com)** 방문
2. **GitHub으로 로그인**
3. **Add new site** → **Import an existing project**
4. **GitHub** 선택 → 저장소 선택

### 2-2. 빌드 설정

**Build settings:**

- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 2-3. 환경변수 설정

**Site settings** → **Build & deploy** → **Environment**

```
VITE_API_URL=https://your-icondb-server.onrender.com
VITE_CLIENT_URL=https://your-project.netlify.app
```

### 2-4. 재배포

**Trigger deploy** → 수동 배포

**배포 완료!**

```
🎉 https://your-project.netlify.app
```

---

## 🔄 배포 후 설정

### API URL 확인

배포된 클라이언트에서:

1. 브라우저 개발자 도구 열기 (F12)
2. **Console** 탭
3. 로그 확인: `🔗 API URL: https://your-server.onrender.com`

### CORS 설정 확인

서버의 `.env.production`에서:

```env
CLIENT_URL=https://your-project.vercel.app
```

올바르게 설정되어 있는지 확인하세요.

---

## 🔗 자동 배포 설정

### GitHub 연결 (Vercel/Netlify)

**자동 배포 활성화:**

1. Vercel/Netlify 대시보드
2. **Settings** → **Git Integration**
3. main 브랜치에 푸시하면 자동 배포

**배포 자동화:**

```bash
# 코드 수정 후
git add .
git commit -m "Update features"
git push origin main

# → Vercel/Netlify에서 자동 배포 시작
```

---

## 🐛 배포 후 문제 해결

### "API 연결 불가"

**확인사항:**

- [ ] `VITE_API_URL` 환경변수 설정됨
- [ ] 서버가 배포되어 있음
- [ ] 서버 URL이 정확함 (https:// 포함)
- [ ] CORS 설정 확인 (CLIENT_URL)

**해결방법:**

```bash
# 1. 환경변수 재확인
# Vercel/Netlify 대시보드 → Settings → Environment Variables

# 2. 서버 URL 테스트
curl https://your-server-url/

# 3. 응답 확인
# {"message": "ICONDB Server is running on port 5000"}
```

### "이미지 로딩 안 됨"

**확인사항:**

- [ ] Supabase Storage 버킷이 Public인지 확인
- [ ] 버킷 이름이 `icondb`인지 확인
- [ ] S3 CDN URL이 아닌 Supabase URL 사용

### "로그인 후 페이지 안 보임"

**원인:**

- CORS 설정 오류
- 세션 쿠키 전송 안 됨

**해결:**

```javascript
// src/config/apiClient.js 확인
// withCredentials: true 설정 필수
```

---

## 📊 배포 상태 모니터링

### Vercel 대시보드

- **Analytics** 탭: 방문자, 성능 볼 수 있음
- **Deployments** 탭: 배포 히스토리 확인
- **Logs** 탭: 에러 로그 확인

### Netlify 대시보드

- **Analytics** 탭: 성능 지표
- **Deploys** 탭: 배포 상태 및 로그
- **Functions** 탭: 서버리스 함수 (필요시)

---

## 🔐 프로덕션 보안 체크리스트

배포 전 확인:

- [ ] 환경변수에 민감한 정보 노출 안 됨
- [ ] API_URL이 프로덕션 서버 주소
- [ ] HTTPS 사용 (Vercel/Netlify 자동)
- [ ] CORS 올바르게 설정
- [ ] 빌드 결과 최적화됨 (`dist/` 폴더 크기 확인)

```bash
# 빌드 크기 확인
du -sh dist/
# 일반적으로 1-3MB
```

---

## 📈 성능 최적화

### 빌드 최적화

`client/vite.config.js`에서:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser",
    sourcemap: false, // 프로덕션에서 비활성화
  },
});
```

### 이미지 최적화

- SVG 파일 압축
- PNG/JPEG 웹 포맷 변환
- 썸네일 생성

---

## 🔄 환경별 배포 설정

| 환경         | VITE_API_URL                  | VITE_CLIENT_URL           |
| ------------ | ----------------------------- | ------------------------- |
| **개발**     | `http://localhost:5000`       | `http://localhost:3000`   |
| **프로덕션** | `https://api.example.com`     | `https://app.example.com` |
| **Vercel**   | `https://server.onrender.com` | `https://app.vercel.app`  |
| **Netlify**  | `https://server.onrender.com` | `https://app.netlify.app` |

---

## 📚 배포 후 다음 단계

1. **도메인 연결** (선택사항)
   - Vercel/Netlify에서 커스텀 도메인 추가
   - DNS 설정

2. **로그 모니터링**
   - Sentry 통합 (에러 추적)
   - Google Analytics (방문자 분석)

3. **성능 모니터링**
   - Vercel Analytics
   - Lighthouse 점수 확인

---

## 🆘 배포 실패 시

### Vercel 배포 실패

```
로그 확인:
1. Vercel 대시보드 → Deployments
2. 실패한 배포 클릭
3. Build logs 확인
```

#### 일반적인 오류

**1. "npm ERR! code ERESOLVE"**

```bash
# package-lock.json 삭제 후 재배포
rm package-lock.json
```

**2. "Missing environment variables"**

```
→ Vercel Settings → Environment Variables 다시 확인
```

**3. "Build timeout"**

```bash
# 의존성 정리
npm prune
# 캐시 삭제 후 재배포
```

---

## 💡 팁

### 빠른 배포 체크

```bash
# 1. 로컬 빌드 테스트
npm run build

# 2. 환경변수 확인
cat .env.production

# 3. Git 푸시
git push origin main

# 4. Vercel/Netlify 자동 배포 (1-3분)
```

### 한 줄 배포

```bash
# 전체 과정
npm run build && git add . && git commit -m "Deploy" && git push
```

---

## 📞 지원

문제 발생 시:

1. **[Vercel 문서](https://vercel.com/docs)**
2. **[Netlify 문서](https://docs.netlify.com)**
3. **[Vite 문서](https://vitejs.dev)**
4. **[React 문서](https://react.dev)**

---

**Happy Coding! 🎉**
