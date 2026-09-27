"""
Eco-Smart Kerala - 1-Click Local Demo Server
Run this script with: python run_demo.py or py run_demo.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

# Ensure UTF-8 output encoding on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        try:
            sys.stderr.write(f"[Eco-Smart Server] {self.address_string()} - {format % args}\n")
        except Exception:
            pass

def main():
    os.chdir(DIRECTORY)
    # Allow port reuse immediately
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 65)
        print("[*] Eco-Smart Kerala Web Application Demo")
        print(f"[+] Server running at: {url}")
        print("[-] Serving files from:", DIRECTORY)
        print("[!] Press Ctrl+C in this terminal to stop the server")
        print("=" * 65)
        
        try:
            webbrowser.open(url)
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server. Goodbye!")
            httpd.shutdown()

if __name__ == "__main__":
    main()
