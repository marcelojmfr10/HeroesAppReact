import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // no funcionó por la versión de react-router
  // const query = queryString.parse(location.search);
  // console.log(query);

  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get('q') ? searchParams.get('q') : '';

  const heroes = getHeroesByName(busqueda);

  const showSearch = (busqueda.length === 0);
  const showError = (busqueda.length > 0 && heroes.length === 0);

  const { searchText, onInputChange } = useForm({
    searchText: busqueda
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // if (searchText.trim().length <= 1) return;
    // console.log('desde testing');

    navigate(`?q=${searchText}`);
  }


  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">

        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form action="" onSubmit={onSearchSubmit} aria-label="form">
            <input type="text" placeholder="Search a hero" className="form-control" name="searchText"
              autoComplete="off" value={searchText} onChange={onInputChange} />
            <button className="btn btn-outline-primary mt-1">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {/* {
            (busqueda === '') ? (<div className="alert alert-primary">Search a hero</div>) 
            : (heroes.length === 0) && (<div className="alert alert-danger">
              No hero with <b>{searchParams.get('q')}</b>
            </div>)
          } */}

          <div aria-label="searchHero" className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? '' : 'none' }}>
            Search a hero</div>

          <div aria-label="errorHero" className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? '' : 'none' }}>
            No hero with <b>{searchParams.get('q')}</b>
          </div>

          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }


        </div>
      </div>



    </>
  )
}


