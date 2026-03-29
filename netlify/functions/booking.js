import { getStore } from "@netlify/blobs";

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type" } });
  }
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  
  try {
    const data = await req.json();
    const store = getStore("ft-bookings");
    const id = `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await store.setJSON(id, { ...data, id, created_at: new Date().toISOString() });
    return new Response(JSON.stringify({ success: true, id }), { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
  }
};

export const config = { path: "/api/booking" };
