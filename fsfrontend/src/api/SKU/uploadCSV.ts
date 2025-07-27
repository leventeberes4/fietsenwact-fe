export async function uploadCSV(file: File): Promise<any> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/services/sku/file-upload?isUpsert=false", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to upload CSV");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    throw error;
  }
}
