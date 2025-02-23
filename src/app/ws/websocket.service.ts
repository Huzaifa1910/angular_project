import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: Socket;

  constructor() {}

  connect(userId: string) {
    if (this.socket) {
      this.socket.disconnect(); // Ensure no previous connection exists
    }

    const config: SocketIoConfig = {
      url: 'http://localhost:5000', // Flask WebSocket URL
      options: {
        query: { userId: userId } // Pass userId to server
      }
    };

    this.socket = new Socket(config);

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket with userId:', userId);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }

  sendMessage(message: string) {
    if (this.socket) {
      this.socket.emit('message', message);
    } else {
      console.error('Socket is not initialized!');
    }
  }

  getMessages(): Observable<string> {
    return new Observable(observer => {
      if (!this.socket) {
        console.error('Socket is not initialized! Call connect() first.');
        return;
      }

      this.socket.on('message', (msg: string) => {
        observer.next(msg); // Pass received messages to subscribers
      });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket');
    }
  }
}
