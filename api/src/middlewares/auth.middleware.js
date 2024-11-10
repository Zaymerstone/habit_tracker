// // КАК ПОСЫЛАТЬ ТОКЕН С КЛИЕНТА ЧАТ ГПТ
// // НА ФРОНТЕ БЕРЕМ ТОКЕН С ЛОКАЛ СТОРАДЖ И НА БЕКЕ ЧИТАЕМ ТОКЕН И ПРОВЕРЯЕМ
// // Retrieve token from local storage
// const token = localStorage.getItem('token');

// // Set Authorization header
// axios.get('http://your-backend-url/protected-route', {
//     headers: {
//         'Authorization': `Bearer ${token}`
//     }
// })
// .then(response => console.log(response.data))
// .catch(error => console.error('Error:', error));

// // БЕК МИДЛВАРА ДЛЯ ЧЕК ТОКЕНА
// const jwt = require('jsonwebtoken');

// // Middleware to verify token
// function verifyToken(req, res, next) {
//     // Get the token from the Authorization header
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(403).json({ error: 'No token provided' });
//     }

//     // Extract the token part after "Bearer"
//     const token = authHeader.split(' ')[1]; // чтобы скипнуть Беарер и заэкстрактить сам токен
//     if (!token) {
//         return res.status(403).json({ error: 'Invalid token format' });
//     }

//     // Verify the token
//     jwt.verify(token, 'your-secret-key', (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ error: 'Invalid token' });
//         }
//         // If token is valid, save the decoded data to req.user for use in other routes
//         req.user = decoded;
//         next();
//     });
// }
