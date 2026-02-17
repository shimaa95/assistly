export async function executeGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const response = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Apikey ${process.env.GRAPHQL_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    cache: 'no-store',
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0]?.message || 'GraphQL Error');
  }

  return data;
}

export default executeGraphQL;
