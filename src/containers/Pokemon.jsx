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
    }, [dispatch, pokemonName]);

    const ShowData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];
            return (
                <div className={'pokemon-wrapper'}>
                    <div className={'item'}>
                        <h2>Sprites</h2>
                        <img
                            src={pokeData.sprites.front_default}
                            alt='pokemon'
                        />
                        <img
                            src={pokeData.sprites.back_default}
                            alt='pokemon'
                        />
                        <img src={pokeData.sprites.front_shiny} alt='pokemon' />
                        <img src={pokeData.sprites.back_shiny} alt='pokemon' />
                    </div>
                    <div className={'item'}>
                        <h2>Stats</h2>
                        {pokeData.stats.map((el) => (
                            <p>
                                {el.stat.name}: {el.base_stat}
                            </p>
                        ))}
                    </div>
                    <div className={'item'}>
                        <h2>Abilities</h2>
                        {pokeData.abilities.map((el) => (
                            <p>{el.ability.name}</p>
                        ))}
                    </div>
                </div>
            );
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
        <div className={'poke'}>
            <h1>{pokemonName}</h1>
            {ShowData()}
        </div>
    );
};

export default Pokemon;
