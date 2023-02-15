import { writable } from 'svelte/store'
export const last_ping = writable(0)
export const last_pong = writable(0)
