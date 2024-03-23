
import { filtersFetching, filtersFetched, filtersFetchingError } from "../components/heroesFilters/heroesFilterSlice";


export const fetchFiltered = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

