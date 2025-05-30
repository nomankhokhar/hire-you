package service

import (
	"code_runner/types"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

func RunCode(codeRunner types.CodeRunner) (string, error) {
	tempDir, err := os.MkdirTemp("", "code-runner")
	if err != nil {
		return "", fmt.Errorf("failed to create temporary directory: %v", err)
	}
	// defer os.RemoveAll(tempDir)

	var filePath, className string
	var runCmd *exec.Cmd

	// Use code as-is
	code := codeRunner.Code + "\n"

	switch codeRunner.Language {
	case "js":
		filePath = filepath.Join(tempDir, "script.js")
		if err := os.WriteFile(filePath, []byte(code), 0644); err != nil {
			return "", fmt.Errorf("failed to write JS file: %v", err)
		}
		runCmd = exec.Command("node", filePath)

	case "python":
		filePath = filepath.Join(tempDir, "script.py")
		if err := os.WriteFile(filePath, []byte(code), 0644); err != nil {
			return "", fmt.Errorf("failed to write Python file: %v", err)
		}
		runCmd = exec.Command("python", filePath)

	case "java":
		filePath = filepath.Join(tempDir, "script.java")
		if err := os.WriteFile(filePath, []byte(code), 0644); err != nil {
			return "", fmt.Errorf("failed to write Java file: %v", err)
		}

		// Compile
		compileCmd := exec.Command("javac", filePath)
		compileOut, err := compileCmd.CombinedOutput()
		if err != nil {
			return string(compileOut), fmt.Errorf("compilation failed: %v", err)
		}

		// Run
		runCmd = exec.Command("java", "-cp", tempDir, className)

	default:
		return "", fmt.Errorf("unsupported language: %s", codeRunner.Language)
	}

	output, err := runCmd.CombinedOutput()

	if err != nil {
		return "", fmt.Errorf("execution failed: %v, output: %s", err, output)
	}
	return string(output), err
}
