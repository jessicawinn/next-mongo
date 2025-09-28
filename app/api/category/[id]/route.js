import dbConnect from "@/lib/db";
import Category from "@/models/Category";

export async function GET(request, { params }) {
  await dbConnect();
  const category = await Category.findById(params.id);
  if (!category) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(category);
}

export async function PUT(request, { params }) {
  await dbConnect();
  const body = await request.json();
  const category = await Category.findByIdAndUpdate(params.id, body, { new: true });
  if (!category) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(category);
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const category = await Category.findByIdAndDelete(params.id);
  if (!category) {
    return new Response("Not found", { status: 404 });
  }
  return Response.json(category);
}