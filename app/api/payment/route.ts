async function updateSingleItem(query: string, preview = false): Promise<any> {
  return fetch(
    `https://api.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    },
  ).then((response) => response.json());
}

export async function POST(req: Request) {
  const body: {data: {id: string, type: string}} = await req.json();
  try{
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${body.data?.id!}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    });
    if (response.ok) {
      const data : { metadata: {info: string}} = await response.json();
      const bookMetadata = JSON.parse(data.metadata.info);
      console.log("bookMetadata", bookMetadata)

      /* const demo = await fetch(`https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries/${bookMetadata.sys.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
          "X-Contentful-Version": bookMetadata?.sys.version,
        },
        body: JSON.stringify(bookMetadata), 
      });

      console.log("shop updated", demo); */
      
    }
    
    return new Response(null, {status: 200}); 
    
  } catch (error) {
    console.log("error:", error);
    return new Response(null, {status: 500}); 
  }
}
