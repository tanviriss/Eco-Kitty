import { NextResponse } from 'next/server';
import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    console.log('Barcode received:', code);
    if (!code) {
      return NextResponse.json({ error: 'No barcode provided' }, { status: 400 });
    }

    const response = await axios.get(`https://go-upc.com/search?q=${code}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const name = $('.product-name').text().trim();
    const imageUrl = $('.product-image img').attr('src');

    const productInfo = {
      name: name || '',
      imageUrl: imageUrl || '',
    };

    console.log('Product info scraped:', productInfo);

    if (!productInfo.name && !productInfo.imageUrl) {
      return NextResponse.json({ error: 'No product information found' }, { status: 404 });
    }

    // Get carbon footprint information from OpenAI
    const carbonFootprint = await getCarbonFootprintInfo(productInfo.name);

    // Get recycling information from OpenAI
    const recycleInfo = await getRecycleInfo(productInfo.name);

    return NextResponse.json({ ...productInfo, carbonFootprint, recycleInfo });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

async function getCarbonFootprintInfo(productName: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides information about the carbon footprint of products."
        },
        {
          role: "user",
          content: `What is the carbon footprint of ${productName}? Please provide a brief, informative answer.`
        }
      ],
    });

    return completion.choices[0].message.content || "Unable to determine carbon footprint information.";
  } catch (error) {
    console.error('Error getting carbon footprint info:', error);
    return "Error retrieving carbon footprint information.";
  }
}

async function getRecycleInfo(productName: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that provides information about recycling and which bins to throw out products."
        },
        {
          role: "user",
          content: `Is the product and the procuts bag/container/box recylable? if either of them are what bin should they be thrown in. Consider toxic/electric disposals and such: ${productName}? Please provide a brief, informative answer.`
        }
      ],
    });

    return completion.choices[0].message.content || "Unable to determine recycling information.";
  } catch (error) {
    console.error('Error getting recycling info:', error);
    return "Error retrieving recycling information.";
  }
}