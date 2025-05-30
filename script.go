package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

var code = `// Example JavaScript code
conole.log("\Hello from JavaScript!\");
`

func main() {
	// Create temporary directory
	tempDir, err := os.MkdirTemp("", "code-runner")
	if err != nil {
		fmt.Printf("Error: Failed to create temp directory: %v\n", err)
		os.Exit(1)
	}
	defer os.RemoveAll(tempDir) // Clean up when done

	// Write JS file
	filePath := filepath.Join(tempDir, "script.js")
	if err := os.WriteFile(filePath, []byte(code), 0644); err != nil {
		fmt.Printf("Error: Failed to write JS file: %v\n", err)
		os.Exit(1)
	}

	// Execute JavaScript
	runCmd := exec.Command("node", filePath)
	output, err := runCmd.CombinedOutput()
	if err != nil {
		fmt.Printf("Error in JavaScript execution:\n%s\n", output)
		os.Exit(1)
	}

	// Print successful output
	fmt.Printf("%s", output)
}
