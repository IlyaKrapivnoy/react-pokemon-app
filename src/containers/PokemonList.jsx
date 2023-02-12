import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { GetPokemonList } from '../actions/pokemonActions';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const PokemonList = (props) => {
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const pokemonList = useSelector((state) => state.PokemonList);
    useEffect(() => {
        FetchData(1);
    }, []);

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page));
    };

    const ShowData = () => {
        if (pokemonList.loading) {
            return <p className='loading'>Loading...</p>;
        }

        if (!_.isEmpty(pokemonList.data)) {
            return (
                <div className={'list-wrapper'}>
                    {pokemonList.data.map((el) => (
                        <div className={'pokemon-item'}>
                            <p>{el.name}</p>
                            <Link to={`/pokemon/${el.name}`}>View</Link>
                        </div>
                    ))}
                </div>
            );
        }

        if (pokemonList.errorMsg !== '') {
            return <p>{pokemonList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return (
        <>
            <div className='search-wrapper'>
                <p>Search</p>
                <input
                    type='text'
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={() => props.history.push(`/pokemon/${search}`)}
                >
                    Search
                </button>
            </div>
            {ShowData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    pageCount={Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => FetchData(data.selected + 1)}
                    containerClassName={'pagination'}
                    pageLinkClassName={'page-link'}
                    activeLinkClassName={'active-page-link'}
                    previousLinkClassName={'prev'}
                    nextLinkClassName={'next'}
                />
            )}
        </>
    );
};

export default PokemonList;
