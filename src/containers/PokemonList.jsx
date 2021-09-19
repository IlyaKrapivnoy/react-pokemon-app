import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useEffect } from 'react';
import { GetPokemonList } from '../actions/pokemonActions';

const PokemonList = () => {
    const dispatch = useDispatch();
    const pokemonList = useSelector((state) => state.PokemonList);
    useEffect(() => {
        FetchData(1);
    });

    const FetchData = (page = 1) => {
        dispatch(GetPokemonList(page));
    };

    const ShowData = () => {
        if (!_.isEmpty(pokemonList.data)) {
            return <div>have data</div>;
        }

        if (pokemonList.loading) {
            return <p>Loading...</p>;
        }

        if (pokemonList.errorMsg !== '') {
            return <p>{pokemonList.errorMsg}</p>;
        }

        return <p>unable to get data</p>;
    };

    return <div>{ShowData()}</div>;
};

export default PokemonList;
