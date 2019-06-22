const origin = process.env.NODE_ENV === 'prod' ? 'https://domain' : 'http://localhost:4200';

export const config = {
    cookieOptions: {
        maxAge: 5 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        signed: true
    },
    corsOptions: {
        origin: [ origin ],
        credentials: true
    }
};
