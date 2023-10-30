const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchBooks = async (name: string) => {
  try {
    const pageNumber = 1;
    const queryParams = [];
    if (name) {
      queryParams.push(`name=${name}`);
    }
    const queryString = queryParams.length > 0 ? `&${queryParams}` : "";
    const response = await fetch(
      `${API_BASE_URL}/api/character?page=${pageNumber}${queryString}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseBody = await response.json();
    return responseBody;
  } catch (e) {
    console.log(`HTTP error: ${e}`);
    throw new Error(`HTTP error: ${e}`);
  }
};
