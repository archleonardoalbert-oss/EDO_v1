package main

import (
	"os/exec"
	"strings"
	"syscall"
)

func desligar(cmd *exec.Cmd) { cmd.SysProcAttr = &syscall.SysProcAttr{Setsid: true} }

func abrirNavegador(u string) error { return exec.Command("open", u).Run() }

func avisar(texto string) {
	t := strings.NewReplacer(`\`, `\\`, `"`, `\"`).Replace(texto)
	exec.Command("osascript", "-e", `display alert "Biblioteca de EDO" message "`+t+`" as critical`).Run()
}
