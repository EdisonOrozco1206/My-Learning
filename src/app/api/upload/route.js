import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const POST = async (req, res) => {
  
  const formData = await req.formData();
  const file = formData.get('file');
  const filename = file.name

  const upload = await put(filename, file, {
    access: "public"
  })

  return NextResponse.json(upload);
};
