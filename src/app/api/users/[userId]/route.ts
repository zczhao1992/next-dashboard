export function GET(req: Request, { params }: { params: { userId: string } }) {
  return Response.json({ userId: params.userId });
}
