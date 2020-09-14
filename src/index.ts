import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./contants";
import microConfig from './mikro-orm.config';
import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {
    const orm = await MikroORM.init(microConfig);

    await orm.getMigrator().up();

    const app = express();

    const appolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: () => ({ em: orm.em })
    });

    appolloServer.applyMiddleware({ app });

    app.listen(4010, () => {
        console.log(`✅ Server Started on Localhost:4010`);
    })

}

main().catch(err => {
    console.error(err);
});



