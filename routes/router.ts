import { Router, Request, Response } from "express";
import Server from '../clases/server';

const router = Router();

router.get("/mensajes", (req: Request, resp: Response) => {
  resp.json({
    ok: true,
    mensaje: "Todo esta bien!!!"
  });
});

router.post("/mensajes", (req: Request, resp: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo
  };

  const server = Server.instance;

  server.io.emit('nuevo-mensaje', payload);

  resp.json({
    ok: true,
    cuerpo,
    de
  });
});


router.post("/mensajes/:id", (req: Request, resp: Response) => {

  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo
  };

  const server = Server.instance;
  
  server.io.in(id).emit('mensaje-privado', payload);

  resp.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});

export default router;
