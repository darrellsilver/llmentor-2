const apiRoute = '/api/analyze-workflow-transcript-analysis/upload-request'

interface PostUploadData {
  file: File,
  speakerCount: number,
}

export async function postUploadRequest(data: PostUploadData) {
  const body = new FormData();
  body.append('file', data.file);
  body.append('speakerCount', data.speakerCount.toString());

  const result = await fetch(apiRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  })

  return await result.json()
}

interface GetUploadData {
  id: string,
}

export async function getUploadRequest(data: GetUploadData) {
  const url = `${apiRoute}?id=${data.id}`

  const result = await fetch(url, {
    headers: {
      'Accept': 'application/json',
    },
  })

  return await result.json();
}

