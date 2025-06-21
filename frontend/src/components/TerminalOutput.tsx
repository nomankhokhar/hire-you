"use client";

import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { Button } from "@/components/ui/button";

export const TerminalOutput = ({ output }: { output: string }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const termInstance = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    if (!termInstance.current) {
      const term = new Terminal({
        convertEol: true,
        disableStdin: true,
        theme: {
          background: "#1e1e1e",
        },
      });

      term.open(terminalRef.current);
      termInstance.current = term;
    }

    termInstance.current.clear();
    termInstance.current.write(output.replace(/\n/g, "\r\n"));
  }, [output]);

  return (
    <div className="rounded shadow-lg border border-gray-700 bg-black">
        <div className="flex justify-between items-center p-2 bg-gray-800 rounded-t">
            <h2 className="text-white font-semibold">Terminal Output</h2>
            <Button
            variant="outline"
            size="icon"
            className="p-2"
            onClick={() => {
                if (termInstance.current) {
                termInstance.current.clear();
                }
            }}
            >
            Clear
            </Button>
        </div>
      <div ref={terminalRef} className="w-full h-full" />
    </div>
  );
};
