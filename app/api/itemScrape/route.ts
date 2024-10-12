import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    console.log('Barcode received:', code);

    const response = await axios.get(`https://go-upc.com/search?q=${code}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);

    // Update to use the correct selectors
    const name = $('.product-name').text();
    const imageUrl = $('.product-image img').attr('src');

    const productInfo = {
      name: name || '',
      imageUrl: imageUrl || '',
    };

    console.log('Product info scraped:', productInfo);

    return NextResponse.json(productInfo);
  } catch (error) {
    console.error('Error scraping product info:', error);
    return NextResponse.json({ error: 'Failed to scrape product information' }, { status: 500 });
  }
}