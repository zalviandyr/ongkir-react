# React + Golang

## Setup local

1. Clone this project
2. Install **frontend dependencies**
   ```
   yarn
   ```
3. Install **backend packages**
   ```
   go mod tidy
   ```
4. Copy `backend/config.env.example` to `backend/config.env`
5. Run **frontend**
   ```
   yarn dev
   ```
6. Run **backend**
   ```
   go run main.go
   ```

## Build local

1. Follow step 1-4
2. Build **frontend**
   ```
   yarn build
   ```
3. Build **backend**
   ```
   go build main.go
   ```
4. Run

## Frontend

Folder `frontend`

## Backend

Folder `backend`
