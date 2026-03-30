// Simple reviews backend using Netlify Blobs (built-in, no import needed)
export default async (req, context) => {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
  if (req.method === "OPTIONS") return new Response(null, {status:204,headers});

  try {
    const store = context.blobStore || null;
    
    if (req.method === "GET") {
      // Return seed reviews for now - will be replaced with blob/supabase storage
      const seed = []; // Live reviews will populate here
      return new Response(JSON.stringify(seed), {status:200,headers});
    }

    if (req.method === "POST") {
      const data = await req.json();
      console.log("REVIEW:", JSON.stringify(data));
      return new Response(JSON.stringify({success:true}), {status:200,headers});
    }
  } catch(err) {
    return new Response(JSON.stringify({error:err.message}), {status:500,headers});
  }
  return new Response("Method not allowed",{status:405,headers});
};
export const config = { path: "/api/reviews" };
