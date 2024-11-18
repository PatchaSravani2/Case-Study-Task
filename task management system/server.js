const Hapi = require('@hapi/hapi');
const Basic = require('@hapi/basic');
const routes = require('./route');

const users = {
    admin: {
        username: 'admin',
        password: 'password123' 
    }
};

const validate = async (request, username, password, h) => {
    const user = users[username];
    if (!user || user.password !== password) {
        return { isValid: false, credentials: null };
    }
    const credentials = { username: user.username };
    return { isValid: true, credentials };
};

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(Basic);

    server.auth.strategy('simple', 'basic', { validate });

    server.auth.default('simple');

    // Register routes
    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled promise rejection:', err);
});

init();
