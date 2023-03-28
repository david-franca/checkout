import { api } from "@/config/api";
import { OnFinishValues } from "@/models/checkout.models";
import { NextApiRequest, NextApiResponse } from "next";

type FinishPayment = OnFinishValues & {
  hash_id: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data: FinishPayment = req.body;
    api
      .post("linkpagamento/payment", data, {
        params: { hash_id: data.hash_id },
      })
      .then((value) => {
        return res.status(200).json(value);
      })
      .catch((e) => {
        return res.status(500).json(e);
      });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
