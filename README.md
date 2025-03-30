# HooHacks2025

#for this application we would need to run both the front end and backend locally

#FOR BACKEND##########################:
#run these in the back-end directory in the console/terminal (instruction for mac) ( cd backend ) :
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 127.0.0.1 --port 8000 --reload  
# make sure the port of the backend is alwasy 8000 and no other port

#FOR FRONTEND##########################:
#run these in the front-end directory in the console/terminal (instruction for mac) ( cd cream-website-final ) :
python3 -m venv venv
source venv/bin/activate
npm install --legacy-peer-deps
npm run dev


