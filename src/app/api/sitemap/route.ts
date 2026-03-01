// app/api/sitemap/route.ts
import { MetadataRoute } from 'next'
import { NextResponse } from 'next/server';

 function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://etutor4me.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'daily', // Adjust based on your content update frequency
      priority: 1.0,
    },
   
  ]
}

export const GET = async () => {
  try {
    const sitemapData = sitemap();
    return new NextResponse(JSON.stringify(sitemapData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error:any) {
    console.error(error.message);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};