import express from "express";
import { SERVER_PORT } from "../global/environment";
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

  private static _instance: Server;

  public app: express.Application;
  public port: number;

  public io: socketIO.Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;

    this.httpServer = new http.Server(this.app);
    this.io = socketIO(this.httpServer);

    this.escucharSockets();

  }

  public static get instance () {

    return this._instance || (this._instance = new this());

  }

  private escucharSockets() {

    // console.log('Escuchando conexiones - SOCKETS');

    this.io.on('connection', cliente => {

      console.log('Cliente conectado');

      // Conectar cliente
      socket.conectarCliente(cliente);

      // Desconectar
      socket.desconectar( cliente, this.io);

      // Recibir mensajes
      socket.mensaje( cliente, this.io );

      // Recibir usuario
      socket.usuario(cliente, this.io);

      // Emitir Usuarios
      socket.obtenerUsuarios(cliente, this.io);

    });

  }

  start(callback: any) {
    this.httpServer.listen(this.port, callback);
  }
}
