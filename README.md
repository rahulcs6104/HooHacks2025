# HooHacks2025

For this application, we would need to run both the front end and backend locally

# FOR BACKEND
Run these in the back-end directory in the console/terminal (instructions for Mac) ( cd backend ):<br/>
python3 -m venv venv<br/>
source venv/bin/activate<br/>
pip install -r requirements.txt<br/>
uvicorn main:app --host 127.0.0.1 --port 8000 --reload  <br/>
Make sure the port of the backend is always 8000 and no other port<br/>

# FOR FRONTEND:
Unzip the cream-website-final.zip file<br/>
Run these in the front-end directory in the console/terminal (instructions for Mac) ( cd cream-website-final ):<br/>
python3 -m venv venv<br/>
source venv/bin/activate<br/>
npm install --legacy-peer-deps<br/>
npm run dev<br/>


