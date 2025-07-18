import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    nama,
    username,
    email,
    password,
    tempat_lahir,
    tanggal_lahir,
    jenis_kelamin,
  } = req.body;

  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existing) return res.status(400).json({ message: "Email atau Username sudah digunakan" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      nama,
      username,
      email,
      password: hashed,
      tempat_lahir,
      tanggal_lahir: new Date(tanggal_lahir),
      jenis_kelamin,
    },
  });

  return res.status(200).json({ message: "Registrasi berhasil", user });
}
