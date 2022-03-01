

/*  function paginated_fetch(
  url = is_required("url"), // Improvised required argument in JS
  page = 1,
  previousResponse = []
) {
  return fetch(`${url}&page=${page}`) // Append the page number to the base URL
    .then(response => response.json())
    .then(newResponse => {
      const response = [...previousResponse, ...newResponse]; // Combine the two arrays

      if (newResponse.length !== 0) {
        page++;

        return paginated_fetch(url, page, response);
      }

      return response;
    });
}

beers = paginated_fetch(`https://api.magicthegathering.io/v1/cards?`)  */




 