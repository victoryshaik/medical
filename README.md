# Medical Lab Test Management - Sample App
Simple Node.js + Express application (SQLite) with basic CRUD for Patients and Tests.
Includes a Jenkinsfile for CI pipeline, Dockerfile, docker-compose.yml and tests (Jest + Supertest).

## Structure
- app.js                 - Express app entry
- db.js                  - SQLite helper
- routes/patients.js     - Patients endpoints
- routes/tests.js        - Tests (lab tests) endpoints
- package.json
- Dockerfile
- docker-compose.yml
- Jenkinsfile
- tests/app.test.js
- README.md

## Run locally
1. Install Node.js (>=16)
2. npm install
3. npm start
The server will run on http://localhost:3000

## Run tests
npm test

## Jenkins
The provided `Jenkinsfile` demonstrates a pipeline:
- checkout
- npm install
- run tests
- build Docker image (no push)
- archive artifact (zip)

## Notes
- This is a minimal sample for CI demonstration and not production-ready.
- SQLite DB file `data/medlab.db` is created at runtime.
