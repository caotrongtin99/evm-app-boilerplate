import { pinata } from "@/lib";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    const validateFile = (file: File) => {
      if (file.size > MAX_FILE_SIZE) {
        throw new Error("File too large");
      }
    };

    validateFile(file);

    const { cid } = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json(url, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
