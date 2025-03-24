
const POST_GRAPHQL_FIELDS = `
  title
  coverImage {
    url
  }
  author
  excerpt
  unitPrice
  sys {
    id
  }
  categoryId
  slug
  items
`;


async function fetchGraphQL(query: string, preview = false): Promise<any> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, //ENV???
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { tags: ["posts"] },
    },
  )/* .then((response) => response.json()); */
  return await response.json()
}

function extractPost(fetchResponse: any): any {
  return fetchResponse?.data?.postCollection?.items?.[0];
}

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data?.pinturaCollection?.items || fetchResponse?.data?.bookCollection?.items;
}
function extractPostEntriesREST(fetchResponse: any): any[] {
  console.log("AAAAAAA", fetchResponse)
  return fetchResponse?.items || [];
}

export async function getPreviewPostBySlug(slug: string | null): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true,
  );
  return extractPost(await entry);
}

type CollectionType = 'book' | 'pintura';
export async function getAllPosts(isDraftMode: boolean, collectionType: CollectionType): Promise<any[]> {
  console.log("ENTERED getAllPosts")
  const entries = await fetchGraphQL(
    `query {
      bookCollection( preview: false) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode,
  );
  console.log("AAAAAAA", extractPostEntries(entries))
  return extractPostEntries(entries);
}

export async function getAllPostsREST(isDraftMode: boolean, collectionType: CollectionType): Promise<any[]> {
  const response = await fetch(
    `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=book`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_BEARER_TOKEN}`,      },
      next: { tags: ["postsDemo"] },
    },
  )

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data: any = await response.json();
  return extractPostEntriesREST(data);;
}



export async function getPostAndMorePosts(
  slug: string,
  preview: boolean,
): Promise<any> {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
        preview ? "true" : "false"
      }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  );
  /* const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
        preview ? "true" : "false"
      }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview,
  ); */
  return {
    post: extractPost(entry),
    /* morePosts: extractPostEntries(entries), */
  };
}
