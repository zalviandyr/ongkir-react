package middleware

import (
	"embed"
	"io/fs"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func NewStaticMiddleware(webDir embed.FS, nameDir string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		staticFiles, _ := fs.Sub(webDir, nameDir)
		fileserver := http.FileServer(http.FS(staticFiles))
		path := ctx.Request.URL.Path

		file, err := http.FS(staticFiles).Open(path)
		// if file doesn't exist
		if err != nil {
			if strings.Contains(path, "api") {
				// if contains api, just forward to another route
				return
			} else {
				// if no route, forward to static files
				ctx.FileFromFS("index.html", http.FS(staticFiles))
				return
			}
		}
		defer file.Close()

		fileserver.ServeHTTP(ctx.Writer, ctx.Request)
	}
}
