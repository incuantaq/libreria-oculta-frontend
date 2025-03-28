const decreaseStock = (metadata: any) => ({
  ...metadata,
  fields:{
    ...metadata.fields,
    "items": {
        "en-US": metadata.fields.items["en-US"] - 1,
    },
  }
})

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url)

  const bookId = searchParams.get("id")

  try {
    const metadata = await fetch(`https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/${bookId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_BEARER_TOKEN}`,
      },
    });

    const response = await metadata.json();
    
    const webhookMetadata = decreaseStock(response);
    return new Response(JSON.stringify(webhookMetadata), { status: 200 });
  } catch (error) {
    
  }


  return new Response("Hello, world!")
}
export async function POST(req: Request): Promise<Response> {
  const body = await req.json();

  try {
    return new Response("demo", { status: 200 });
  } catch (error) {
    
  }


  return new Response("Hello, world!")
}

