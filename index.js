const express = require('express');
const path = require('path');

const app = express();

// Set the static files location, e.g., 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Main Server is running on http://localhost:${PORT}`);
});