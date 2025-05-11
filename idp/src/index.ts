import express, {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bcrypt from 'bcrypt';


// Initialize Express app
const app = express();
const PORT =  3000;
const JWT_SECRET = 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());


interface User {
    id: number;
    username: string;
    password: string;
}

// Simple in-memory user database
const users: User[] = [];

// Authentication middleware
const authenticateToken = (req: Request, res: Response, next: Function) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.body.user = user;
        next();
    });
};

// Register a new user
app.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Check if username already exists
        if (users.find(user => user.username === username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser: User = {
            id: users.length + 1,
            username,
            password: hashedPassword
        };

        users.push(newUser);

        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login route - issues JWT token
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, roles } = req.body;

        // Find user
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username, roles },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
});

app.get('/protected', authenticateToken, (req: Request, res: Response) => {
    res.json({
        message: 'This is a protected route',
        user: req.body.user
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
