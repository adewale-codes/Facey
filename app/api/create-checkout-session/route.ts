import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const SHOPIFY_API_VERSION = '2023-10';
const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

type LineItem = { variantId: string; quantity: number };

export async function POST(request: Request) {
  const { lineItems } = (await request.json()) as { lineItems: LineItem[] };

  if (!Array.isArray(lineItems) || !lineItems.length) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
  }

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { checkoutUrl }
        userErrors { message }
      }
    }
  `;
  const variables = {
    input: {
      lines: lineItems.map(({ variantId, quantity }) => ({
        merchandiseId: variantId,
        quantity,
      })),
    },
  };

  const shopRes = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const json = await shopRes.json();
  console.log('Shopify cartCreate response:', JSON.stringify(json, null, 2));

  if (Array.isArray(json.errors) && json.errors.length) {
    return NextResponse.json(
      { error: json.errors[0].message },
      { status: 400 }
    );
  }

  const userErrors = json.data?.cartCreate?.userErrors || [];
  if (userErrors.length) {
    return NextResponse.json(
      { error: userErrors[0].message },
      { status: 400 }
    );
  }

  const checkoutUrl = json.data.cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    return NextResponse.json(
      { error: 'Unexpected error: no checkout URL returned' },
      { status: 500 }
    );
  }

  return NextResponse.json({ checkoutUrl });
}
