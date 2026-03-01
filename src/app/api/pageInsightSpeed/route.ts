
export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_PageSpeed_Insights_API; // Your API key from environment variables
  const websiteUrl = 'https://etutor4me.vercel.app/'; // Your website URL

  // URL encode the website URL
  const encodedUrl = encodeURIComponent(websiteUrl);
  
  const fullUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&key=${apiKey}`;

  try {
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch PageSpeed data' }), { status: 500 });
    }
    
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching PageSpeed data' }), { status: 500 });
  }
}
