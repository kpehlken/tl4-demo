import express, {Request, Response} from 'express';
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 8081;
const JWT_SECRET = "secret";

function decodeToken(token: string) {
    if (!token) {
        return null;
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    const decoded: any = jwt.verify(token, JWT_SECRET, {
        algorithms: ['HS256'],
    });

    if(decoded?.scope) {
        decoded.scope = decoded.scope.reduce((acc: string, scope: string) => acc + scope + " ", "");
    }

    return decoded;
}

function isTokenValid(token: string): boolean {
    if (!token) {
        return false;
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET, {
            algorithms: ['HS256'],
        });
        return true;
    } catch(err) {
        return false;
    }
}

app.use(express.json());

app.post("/", (req: Request, res: Response) => {

    const { headers, ...rest } = req.body;
    console.log("RECIEVED ", rest);

    const routerRequest = req.body;
    const forwardedHeaders = req.body.headers;

    if(routerRequest.stage === "RouterRequest") {
        const authHeader = forwardedHeaders["authorization"]?.[0];

        if(isTokenValid(authHeader)) {
            routerRequest.context.entries["apollo::authentication::jwt_claims"] = decodeToken(authHeader);
        }
    } else if(routerRequest.stage === "SupergraphRequest") {
        const policies = routerRequest.context.entries["apollo::authorization::required_policies"]
        if(policies) {
            console.log(policies);
            for (const [key, value] of Object.entries(policies)) {
                policies[key] = true;
            }
        }
    }

    console.log("SENDING: ", routerRequest.context);
     return res.json(routerRequest);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
