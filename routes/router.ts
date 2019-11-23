import { Router, Request, Response } from "express";

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

  resp.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});

export default router;
