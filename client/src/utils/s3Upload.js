export async function uploadFileToS3(file, folderName) {
  const { url } = await fetch(`http://localhost:8080/presignedurl`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      folderName,               
      fileName: file.name,
      fileType: file.type,
    }),
  }).then(async (res) => {
    if (!res.ok) throw new Error("Failed to get presigned URL");
 
    return res.json()
  });
  
  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file, 
  });

  if (!uploadRes.ok) {
    throw new Error("Upload to S3 failed");
  }

}