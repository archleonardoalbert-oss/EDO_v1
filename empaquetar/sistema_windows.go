package main

import (
	"os/exec"
	"syscall"
	"unsafe"
)

const crearSinVentana = 0x08000000 // CREATE_NO_WINDOW

func desligar(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true, CreationFlags: crearSinVentana | syscall.CREATE_NEW_PROCESS_GROUP}
}

func abrirNavegador(u string) error {
	// sin desligar: ocultar rundll32 ocultaría también la ventana del navegador que abre
	return exec.Command("rundll32", "url.dll,FileProtocolHandler", u).Start()
}

func avisar(texto string) {
	t, _ := syscall.UTF16PtrFromString(texto)
	c, _ := syscall.UTF16PtrFromString("Biblioteca de EDO")
	syscall.NewLazyDLL("user32.dll").NewProc("MessageBoxW").Call(0, uintptr(unsafe.Pointer(t)), uintptr(unsafe.Pointer(c)), 0x10)
}
