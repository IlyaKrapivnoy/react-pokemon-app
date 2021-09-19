import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GetPokemon } from '../actions/pokemonActions';
import _ from 'lodash';

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector((state) => state.Pokemon);

    useEffect(() => {
        dispatch(GetPokemon(pokemonName));
    }, []);

    const ShowData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            return <p>have data</p>;
        }

        if (pokemonState.loading) {
            return <p>Loading...</p>;
        }

        if (pokemonState.errorMsg !== '') {
            return <p>{pokemonState.errorMsg}</p>;
        }

        return <p>error getting pokemon</p>;
    };

    return (
        <div>
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    );
};

export default Pokemon;
