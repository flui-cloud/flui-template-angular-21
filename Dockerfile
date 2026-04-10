# #flui-managed
# syntax=docker/dockerfile:1.6

# ─── Stage 1: builder ──────────────────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# ─── Stage 2: runner (nginx) ───────────────────────────────────────────────
FROM nginx:1.27-alpine AS runner

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/flui-demo/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
