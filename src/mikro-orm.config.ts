import { __prod__ } from "./contants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';




export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User],
    dbName: 'myDB',
    type: 'postgresql',
    user: 'postgres',
    password: '1234',
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];