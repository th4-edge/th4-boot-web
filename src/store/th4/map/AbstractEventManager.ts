import EventManager = th4.map.EventManager;


export abstract class AbstractEventManager implements EventManager{

    protected listeners: Map<string, Function[]> = new Map();

    protected onceListeners: Map<string, Function[]> = new Map();

    off(event: string, callback: Function): void {
        const listeners = this.listeners.get(event);
        if (listeners) {
            const index = listeners.indexOf(callback);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }

    on(event: string, callback: Function): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        if(!this.listeners.get(event)?.includes(callback)){
            this.listeners.get(event)?.push(callback);
        }

    }

    once(event: string, callback: Function): void {
        if (!this.onceListeners.has(event)) {
            this.onceListeners.set(event, []);
        }
        this.onceListeners.get(event)?.push(callback);
    }
    _emit(event: string, data: any,args?:any): void {
        const listeners = this.listeners.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(data,args));
        }
        const onceListeners = this.onceListeners.get(event);
        if (onceListeners) {
            onceListeners.forEach(listener => listener(data,args));
            onceListeners.length = 0;
        }
    }
}