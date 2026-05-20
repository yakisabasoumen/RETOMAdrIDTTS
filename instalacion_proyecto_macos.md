# Guía de Instalación del Proyecto en macOS

## 1. Requisitos Previos

- Python 3 (preferiblemente 3.11 o superior)
- npm o Corepack / Yarn
- Git o acceso al repositorio

---

## 2. Backend (Django REST API)

**Carpeta:** `consultasWeb310/restapi_project`

```bash
cd ~/Desktop/RETOMAdrIDTTS/consultasWeb310
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python restapi_project/manage.py migrate
python restapi_project/manage.py runserver 0.0.0.0:8000
```

---

## 3. Frontend (React + Vite)

**Carpeta:** `consultasWebFront/consultasTTSfront`

```bash
cd ~/Desktop/RETOMAdrIDTTS/consultasWebFront/consultasTTSfront
npm install
npm run dev
```

---

## 4. Notas Importantes

- El backend permite CORS para `localhost:5173`
- Si usas Apple Silicon, revisa la compatibilidad de `torch` y `torchaudio`
- Node.js puede instalarse con Homebrew:

```bash
brew install node
```

---

## 5. Resumen Rápido

### Backend
```bash
pip install -r requirements.txt
python restapi_project/manage.py migrate
python restapi_project/manage.py runserver
```

### Frontend
```bash
npm install
npm run dev
```
