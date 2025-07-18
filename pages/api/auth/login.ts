import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(400).json({ message: "Username tidak ditemukan" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Password salah" });

    return res.status(200).json({
    message: "Login sukses",
    user: {
        id: user.id,
        nama: user.nama,
        username: user.username,
        email: user.email,
        tempat_lahir: user.tempat_lahir,
        tanggal_lahir: user.tanggal_lahir,
        jenis_kelamin: user.jenis_kelamin,
    },
    });

}
