const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || 'v1';

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

// API Version Endpoint
app.get('/api/version', (req, res) => {
  res.json({ version: VERSION, status: 'Healthy', timestamp: new Date() });
});

// Liveness and Readiness probe endpoint for Minikube/Kubernetes
app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// Fallback to SPA index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Smart Event Portal (${VERSION}) running on port ${PORT}`);
});
