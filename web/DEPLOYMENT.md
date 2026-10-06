# 🚀 Deployment Guide - WhatsApp Device Connection Website

## Option 1: Deploy on Render (Recommended)

### Step 1: Push to GitHub
The code is already pushed. Go to: https://github.com/mistershubhamkumar/shubham-x-md

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo `mistershubhamkumar/shubham-x-md`

### Step 3: Configure Render
- **Name**: `levanter-device-dashboard`
- **Root Directory**: `web`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `DEVICE_PORT`: `5000`
  - `BOT_API_URL`: `http://your-bot-url:3000` (or your live bot URL)
  - `API_KEY`: `your-secret-key-here`
  - `NODE_ENV`: `production`

### Step 4: Deploy
Click "Create Web Service" → Render auto-deploys

**Your URL will be**: `https://levanter-device-dashboard.onrender.com`

---

## Option 2: Deploy on Heroku

### Step 1: Create Heroku Account
https://www.heroku.com

### Step 2: Install Heroku CLI
```bash
npm install -g heroku
heroku login
```

### Step 3: Create Heroku App
```bash
cd web
heroku create levanter-device-dashboard
```

### Step 4: Set Environment Variables
```bash
heroku config:set DEVICE_PORT=5000
heroku config:set BOT_API_URL=http://your-bot-url:3000
heroku config:set API_KEY=your-secret-key-here
heroku config:set NODE_ENV=production
```

### Step 5: Deploy
```bash
git push heroku master
```

**Your URL will be**: `https://levanter-device-dashboard.herokuapp.com`

---

## Option 3: Deploy on Railway.app

### Step 1: Sign Up
https://railway.app

### Step 2: Create New Project
- Click "New Project" → "Deploy from GitHub"
- Select `mistershubhamkumar/shubham-x-md`

### Step 3: Configure
- **Root Directory**: `web`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Step 4: Add Variables
```
DEVICE_PORT=5000
BOT_API_URL=http://your-bot-url:3000
API_KEY=your-secret-key-here
NODE_ENV=production
```

### Step 5: Deploy
Railway auto-deploys

**Your domain** will be generated automatically

---

## Option 4: Deploy on Replit

### Step 1: Go to Replit
https://replit.com

### Step 2: Import from GitHub
- Click "Import repository"
- Paste: `https://github.com/mistershubhamkumar/shubham-x-md`

### Step 3: Configure
- Open `web/package.json`
- Edit `.env.example` → `.env`
- Add your variables

### Step 4: Run
```bash
cd web
npm install
npm start
```

**Your URL** will be shown in Replit

---

## Option 5: Self-Host on VPS

### Prerequisites
- Ubuntu/Debian VPS
- Node.js 20+
- PM2 or systemd

### Step 1: SSH into VPS
```bash
ssh root@your-vps-ip
```

### Step 2: Clone Repository
```bash
cd /opt
git clone https://github.com/mistershubhamkumar/shubham-x-md.git
cd shubham-x-md/web
```

### Step 3: Install Dependencies
```bash
npm install --production
```

### Step 4: Create .env File
```bash
cat > .env << EOF
DEVICE_PORT=5000
BOT_API_URL=http://your-bot-url:3000
API_KEY=your-secret-key
NODE_ENV=production
EOF
```

### Step 5: Start with PM2
```bash
npm install -g pm2
pm2 start server.js --name "levanter-device-dashboard"
pm2 save
pm2 startup
```

### Step 6: Setup Nginx Reverse Proxy
```bash
sudo apt install nginx
```

Create `/etc/nginx/sites-available/default`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

Your site: `http://your-domain.com`

---

## 🎯 Quick Start (Recommended: Render)

### Fastest Way to Deploy:

1. **Go to**: https://render.com/register
2. **Sign in with GitHub**
3. **Click "New" → "Web Service"**
4. **Select repo**: `mistershubhamkumar/shubham-x-md`
5. **Settings**:
   - Root Directory: `web`
   - Build: `npm install`
   - Start: `npm start`
6. **Environment** (add these):
   ```
   DEVICE_PORT=5000
   BOT_API_URL=http://your-bot-url:3000
   API_KEY=your-secret-key
   NODE_ENV=production
   ```
7. **Click Deploy** ✅

**Your live site**: `https://levanter-device-dashboard.onrender.com`

---

## 🔗 Connect Your Bot

After deployment, update your bot's `.env`:

```env
DEVICE_DASHBOARD_URL=https://levanter-device-dashboard.onrender.com
API_MODE=true
API_KEY=your-secret-key
```

The dashboard will now connect to your live bot! 🎉

---

## 📊 Monitoring

### Check Logs on Render:
1. Go to your Render dashboard
2. Select your service
3. Click "Logs"

### Check Logs on VPS:
```bash
pm2 logs levanter-device-dashboard
```

---

## 🆘 Troubleshooting

### Dashboard shows "Disconnected"
- Check if `BOT_API_URL` is correct
- Verify bot is running on that URL
- Check if `API_KEY` matches

### Port already in use
```bash
lsof -i :5000
kill -9 <PID>
```

### Need to restart?
```bash
pm2 restart levanter-device-dashboard
# or on Render: just push a new commit
```

---

## 🎉 Done!

Your WhatsApp Device Connection Dashboard is live!

📱 Open the URL and start connecting WhatsApp devices to your Levanter bot.
