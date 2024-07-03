'use server';

const FetchData = async (URL) => {
  try {
    const response = await fetch(URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch projects data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects data:', error);
    return [];
  }
};

export default FetchData;
