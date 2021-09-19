import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

const PokemonList = () => {
    const dispatch = useDispatch();
    const pokemonList = useSelector((state) => state.PokemonList);

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
