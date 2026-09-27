import os

def build():
    with open('app.bundle.js', 'r', encoding='utf-8') as f:
        bundle_code = f.read()

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Eco-Smart Kerala | Haritha Karma Sena & LSGD Waste Management</title>
  
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌴</text></svg>">

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      darkMode: 'class',
      theme: {{
        extend: {{
          fontFamily: {{
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
          }},
          animation: {{
            'fade-in': 'fadeIn 0.25s ease-out forwards',
          }},
          keyframes: {{
            fadeIn: {{
              '0%': {{ opacity: '0', transform: 'translateY(6px)' }},
              '100%': {{ opacity: '1', transform: 'translateY(0)' }},
            }}
          }}
        }}
      }}
    }}
  </script>

  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>

  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <style>
    .custom-bin-marker, .depot-marker {{
      background: transparent;
      border: none;
    }}
    .leaflet-popup-content-wrapper {{
      border-radius: 1rem;
      padding: 0.25rem;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      border: 1px solid #e2e8f0;
    }}
    .leaflet-popup-content {{
      margin: 0.75rem 0.85rem;
      line-height: 1.4;
    }}
    .leaflet-container {{
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }}
    ::-webkit-scrollbar {{
      width: 6px;
      height: 6px;
    }}
    ::-webkit-scrollbar-track {{
      background: #f1f5f9;
    }}
    ::-webkit-scrollbar-thumb {{
      background: #cbd5e1;
      border-radius: 9999px;
    }}
    ::-webkit-scrollbar-thumb:hover {{
      background: #94a3b8;
    }}
    .dark ::-webkit-scrollbar-track {{
      background: #0f172a;
    }}
    .dark ::-webkit-scrollbar-thumb {{
      background: #334155;
    }}
  </style>
</head>
<body class="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 antialiased min-h-screen transition-colors duration-200">
  <div id="root"></div>

  <script type="text/babel">
{bundle_code}
  </script>
</body>
</html>"""

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)

    print("Successfully generated self-contained index.html with Dark Mode & Portal Auth!")

if __name__ == '__main__':
    build()
