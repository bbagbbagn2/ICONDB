# ⚡ 클라이언트 3분 배포

## 1️⃣ 서버 배포 확인

Render 대시보드에서 배포된 서버 URL 복사:

```
https://your-icondb-server.onrender.com
```

## 2️⃣ 환경변수 생성

```bash
cd client

# .env.production 파일에서:
# - VITE_API_URL = Render 서버 URL (필수)
# - VITE_CLIENT_URL = 나중에 Vercel에서 생성됨 (임시값 OK)

cat > .env.production << EOF
VITE_API_URL=https://your-icondb-server.onrender.com
VITE_CLIENT_URL=https://your-project.vercel.app
EOF
```

## 3️⃣ 빌드 & 푸시

```bash
npm run build
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

## 4️⃣ Vercel 배포

1. **[vercel.com](https://vercel.com)** → GitHub 로그인
2. **Add New** → **Project**
3. `icondb-client` 선택
4. **Environment Variables**:
   - `VITE_API_URL` = 서버 URL
   - `VITE_CLIENT_URL` = 임시값 (deploy 후 수정)
5. **Deploy**

## 5️⃣ 배포 완료 후 수정 (중요!)

배포가 완료되면 실제 URL이 생성됨:

```
https://your-actual-project-name.vercel.app
```

Vercel 대시보드에서:

1. **Settings** → **Environment Variables**
2. `VITE_CLIENT_URL`을 실제 Vercel URL로 수정
3. **Deployments** → **Redeploy** (재배포)

## ✅ 배포 완료!

```
🎉 https://your-project.vercel.app
```

---

**자세한 가이드**: DEPLOYMENT_GUIDE.md 참조
