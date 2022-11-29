#!/usr/bin/env bash
go install github.com/cespare/reflex@latest
go install
go mod tidy; go run .
# reflex -r "\.go$" -s -- sh -c "go mod tidy; go run ."