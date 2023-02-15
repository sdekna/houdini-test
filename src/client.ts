import { HoudiniClient, type RequestHandler } from '$houdini';
import { subscription } from '$houdini/plugins'
import { createClient, CloseCode } from "graphql-ws";
import { last_ping, last_pong } from '$lib/stores';

export default new HoudiniClient({
    url: 'https://hasura.abbas.aero/v1/graphql',
    plugins: [
        subscription(() => createClient({
            url: "wss://hasura.abbas.aero/v1/graphql",
            retryAttempts: Infinity,
            shouldRetry: () => true,
            keepAlive: 10000,
            on: {
                ping: () => {
                    last_ping.set(Date.now());
                },
                pong: () => {
                    last_pong.set(Date.now());
                }
            }
        })
        )
    ]
})
