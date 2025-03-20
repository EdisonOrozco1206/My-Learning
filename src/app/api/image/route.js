import { NextResponse } from "next/server";
import formidable from "formidable";
import path from "path";
import { promises as fs } from "fs";

const readFile = (req, saveLocally) => {
  return new Promise((resolve, reject) => {
    const options = {};

    if (saveLocally) {
      options.uploadDir = path.join(process.cwd(), "/public/images");
      options.filename = (_name, _ext, part) => {
        return Date.now().toString() + "_" + part.originalFilename;
      };
    }

    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export async function POST(req) {
  try {
    const dir = path.join(process.cwd(), "/public/images");
    try {
      await fs.readdir(dir);
    } catch {
      await fs.mkdir(dir);
    }

    await readFile(req, true);
    return NextResponse.json({ done: "ok" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
