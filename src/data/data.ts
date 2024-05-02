import axios from "axios";

export async function fetchData(page: number, pageSize: number) {
    await axios.get(`http://hn.algolia.com/api/v1/search_by_date?page=${page}&hitsPerPage=${pageSize}`).then(x => {
        const result = x.data.hits;
        return result;
    })
  }