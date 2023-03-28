import { api } from "@/config/api";
import { OnFinishValues } from "@/models/checkout.models";
import { NextApiRequest, NextApiResponse } from "next";

type FinishPayment = OnFinishValues & {
  hash_id: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.method);
  if (req.method === "POST") {
    try {
      const data: FinishPayment = req.body;
      const response = await api.post("linkpagamento/payment", data, {
        params: { hash_id: data.hash_id },
      });
      if (response.status === 200) {
        return res.status(200).json(response.data);
      }
      return res.status(404).json({ message: "Não encontrado" });
    } catch (error) {
      return res.status(500).json({ message: "Error: " + error });
    }
  }
  return res.status(405).end("Method not allowed");
}
