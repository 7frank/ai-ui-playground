// src/stores/apiKeyStore.ts
import { writable } from 'svelte/store';

export const apiKey = writable<string>('');
