export async function fetchPost(
  url: string,
  postData: { [key: string]: any },
  envelope?: string
) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  return envelope ? data[envelope] || null : data;
}
