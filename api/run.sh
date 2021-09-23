go install github.com/cespare/reflex@latest
go install
reflex -r "\.go$" -s -- sh -c "go mod tidy; go run ."