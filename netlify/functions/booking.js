export default async (req) => {
  const headers = {"Content-Type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
  if (req.method === "OPTIONS") return new Response(null, {status:204,headers});
  if (req.method !== "POST") return new Response("Method not allowed",{status:405});
  try {
    const data = await req.json();
    // Send booking notification email via mailto fallback
    // Data is captured in Netlify function logs for now
    console.log("BOOKING:", JSON.stringify(data));
    return new Response(JSON.stringify({success:true,message:"Booking received"}),{status:200,headers});
  } catch(err) {
    return new Response(JSON.stringify({error:err.message}),{status:500,headers});
  }
};
export const config = { path: "/api/booking" };
