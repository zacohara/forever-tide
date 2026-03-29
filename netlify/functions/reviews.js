import { getStore } from "@netlify/blobs";

export default async (req) => {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,POST", "Access-Control-Allow-Headers": "Content-Type" };
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });

  const store = getStore("ft-reviews");

  if (req.method === "GET") {
    try {
      const { blobs } = await store.list();
      const reviews = [];
      for (const blob of blobs) {
        const data = await store.get(blob.key, { type: "json" });
        if (data && data.approved !== false) reviews.push(data);
      }
      reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      return new Response(JSON.stringify(reviews), { status: 200, headers });
    } catch (err) {
      return new Response(JSON.stringify([]), { status: 200, headers });
    }
  }

  if (req.method === "POST") {
    try {
      const data = await req.json();
      const id = `review-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      await store.setJSON(id, { ...data, id, approved: true, created_at: new Date().toISOString() });
      return new Response(JSON.stringify({ success: true, id }), { status: 200, headers });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
    }
  }

  return new Response("Method not allowed", { status: 405, headers });
};

export const config = { path: "/api/reviews" };
