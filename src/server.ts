import path from 'path';
import serve from 'koa-static';
import {Origins, Server} from "boardgame.io/server";
import Tarok from "./game/Tarok";


// const PORT = parseInt(process.env.PORT!) || 8000;
const server = Server({
    games: [Tarok],
    origins: [Origins.LOCALHOST],
})
//
// server.run(8000, () => {
//     console.log(`Serving at: http://localhost:${8000}`);
// });

const frontEndAppBuildPath = path.resolve(__dirname, '../build')
server.app.use(serve(frontEndAppBuildPath))
server.run(8000, () => {
    server.app.use(
        async (ctx, next) => {
            await serve(frontEndAppBuildPath)(
                Object.assign(ctx, {path: 'index.html'}), next
            )
        }
    )
})
