export async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data: T } | never> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_API_TOKEN;
  const version = process.env.SHOPIFY_API_VERSION;

  if (!domain || !token || !version) {
    throw new Error('Shopify environment variables are not properly configured.');
  }

  const endpoint = `https://${domain}/admin/api/${version}/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const body = await response.json();

  if (body.errors) {
    console.error('Shopify API Errors:', body.errors);
    throw new Error(body.errors[0].message);
  }

  return body;
}

export async function getProducts() {
  const query = `
    query GetProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            descriptionHtml
            handle
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query });
  return response.data.products.edges.map((edge: any) => edge.node);
}

export async function searchProducts(searchQuery: string) {
  const query = `
    query SearchProducts($searchQuery: String!) {
      products(first: 10, query: $searchQuery) {
        edges {
          node {
            id
            title
            descriptionHtml
            handle
            priceRangeV2 {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query, variables: { searchQuery } });
  return response.data.products.edges.map((edge: any) => edge.node);
}

export async function getProduct(productId: string) {
  const query = `
    query GetProduct($id: ID!) {
      product(id: $id) {
        id
        title
        descriptionHtml
        handle
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price
              inventoryQuantity
            }
          }
        }
      }
    }
  `;

  const response = await shopifyFetch<any>({ query, variables: { id: productId } });
  return response.data.product;
}
