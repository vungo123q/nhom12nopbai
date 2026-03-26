# ĐÁ BÓNG VUI (Theme + Docker)

Web tĩnh chủ đề bóng đá chạy bằng Nginx trong Docker.

## Build

```bash
docker build -t da-bong-vui .
```

## Run

```bash
docker run --rm -p 8080:80 da-bong-vui
```

Truy cập:
- http://localhost:8080

## Run bằng docker-compose

```bash
docker compose up --build
```

Stop:
```bash
docker compose down
```

