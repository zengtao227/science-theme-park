/**
 * Coop P2P Service — PeerJS WebRTC wrapper
 * Implements a host/guest model:
 *  - Host creates a room, broadcasts quest state and score
 *  - Guest joins using the 6-char room code
 *  - Both exchange answer updates, check results
 *
 * Message protocol:
 *  { type: 'QUEST_SYNC', payload: CoopQuestState }
 *  { type: 'ANSWER_UPDATE', payload: { slotId: string, value: string } }
 *  { type: 'ANSWER_SUBMIT', payload: { correct: boolean } }
 *  { type: 'NEXT_QUEST', payload: undefined }
 *  { type: 'PARTNER_READY', payload: undefined }
 *  { type: 'PING', payload: undefined }
 */

export interface CoopQuestState {
    moduleCode: string;
    questId: string;
    promptLatex: string;
    expressionLatex: string;
    slots: Array<{ id: string; labelLatex: string; placeholder: string; expected: number | string }>;
    correctLatex: string;
}

export type CoopMessageType =
    | 'QUEST_SYNC'
    | 'ANSWER_UPDATE'
    | 'ANSWER_SUBMIT'
    | 'NEXT_QUEST'
    | 'PARTNER_READY'
    | 'PING'
    | 'PONG';

export interface CoopMessage {
    type: CoopMessageType;
    payload?: unknown;
}

export type CoopRole = 'host' | 'guest';

export type CoopEventHandler = {
    onConnected: (role: CoopRole) => void;
    onDisconnected: () => void;
    onMessage: (msg: CoopMessage) => void;
    onError: (err: string) => void;
};

class CoopService {
    private peer: any = null;
    private conn: any = null;
    private role: CoopRole = 'host';
    private handlers: CoopEventHandler | null = null;

    async createRoom(roomCode: string, handlers: CoopEventHandler): Promise<string> {
        if (typeof window === 'undefined') throw new Error('Client only');
        const { Peer } = await import('peerjs');

        this.handlers = handlers;
        this.role = 'host';

        return new Promise((resolve, reject) => {
            // PeerJS peer ID = room code so guests can connect directly
            this.peer = new Peer(`nexus-coop-${roomCode}`, {
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                    ],
                },
            });

            this.peer.on('open', (id: string) => {
                resolve(roomCode);
            });

            this.peer.on('connection', (conn: any) => {
                this.conn = conn;
                this._setupConn(conn);
                handlers.onConnected('host');
            });

            this.peer.on('error', (err: any) => {
                reject(err.message || 'Peer error');
                handlers.onError(err.message || 'Connection failed');
            });
        });
    }

    async joinRoom(roomCode: string, handlers: CoopEventHandler): Promise<void> {
        if (typeof window === 'undefined') throw new Error('Client only');
        const { Peer } = await import('peerjs');

        this.handlers = handlers;
        this.role = 'guest';

        return new Promise((resolve, reject) => {
            this.peer = new Peer({
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                    ],
                },
            });

            this.peer.on('open', () => {
                const conn = this.peer.connect(`nexus-coop-${roomCode}`, { reliable: true });
                this.conn = conn;
                this._setupConn(conn);

                conn.on('open', () => {
                    handlers.onConnected('guest');
                    resolve();
                });

                conn.on('error', (err: any) => {
                    reject(err.message || 'Failed to connect to host');
                });
            });

            this.peer.on('error', (err: any) => {
                reject(err.message || 'Peer creation failed');
                handlers.onError(err.message || 'Cannot reach host. Check the room code.');
            });
        });
    }

    private _setupConn(conn: any) {
        conn.on('data', (data: any) => {
            if (this.handlers && typeof data === 'object' && data.type) {
                this.handlers.onMessage(data as CoopMessage);
            }
        });

        conn.on('close', () => {
            this.handlers?.onDisconnected();
        });

        conn.on('error', (err: any) => {
            this.handlers?.onError(err?.message || 'Connection error');
        });
    }

    send(msg: CoopMessage) {
        if (this.conn && this.conn.open) {
            this.conn.send(msg);
        }
    }

    disconnect() {
        this.conn?.close();
        this.peer?.destroy();
        this.conn = null;
        this.peer = null;
        this.handlers = null;
    }

    isConnected(): boolean {
        return this.conn?.open === true;
    }

    getRole(): CoopRole {
        return this.role;
    }
}

// Singleton
export const coopService = new CoopService();
