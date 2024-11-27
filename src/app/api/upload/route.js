import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  const formData = await req.formData();
  const file = formData.get('file');
  const filename = formData.get('filename');

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const filePath = path.join(uploadsDir, filename);

  fs.mkdirSync(uploadsDir, { recursive: true });
  
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ message: 'Archivo guardado exitosamente', filePath });
};
