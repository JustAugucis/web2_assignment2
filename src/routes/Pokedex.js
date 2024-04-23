import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState(null);

  function ProductRow({ product, onPokemonClick  }) {
    return (
      <tr>
        <td onClick={() => onPokemonClick(product.name)}>{product.name}</td>
      </tr>
    );
  }
  
  function ProductTable({ products, onPokemonClick }) {
    const rows = [];
    let lastCategory = null;
  
    products.forEach((product) => {
      rows.push(<ProductRow product={product} key={product.name} onPokemonClick={onPokemonClick} />);
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  
  function PokemonList({ products, onPokemonClick }) {
    return (
      <div>
        <ProductTable products={products} onPokemonClick={onPokemonClick} />
      </div>
    );
  }

  useEffect(() => {
    getListOfPokemons();
  }, [offset]); // Run whenever offset changes

  function getListOfPokemons() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const pkmnList = JSON.parse(xhr.responseText).results;
        const pokemonNames = pkmnList.map(pokemon => ({ name: pokemon.name }));
        setPokemonList(pokemonNames);
      } else {
        displayError("Response was not OK!");
      }
    };
    xhr.onerror = () => displayError("Network Error!");
    xhr.send();
  }

  function displayError(message) {
    console.error(message);
  }

  function handleNextClick() {
    setOffset(offset + 10);
  }

  function handlePreviousClick() {
    if (offset >= 10) {
      setOffset(offset - 10);
    }
  }

  function handlePokemonClick(name) {
    // Fetch detailed information about the clicked Pokemon and update the UI
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${name}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const pokemonData = JSON.parse(xhr.responseText);
        console.log("Clicked Pokemon:", pokemonData);
      
        const { id, height, weight, abilities, types, stats } = pokemonData;

        // Extract ability names
        const abilityNames = abilities.map(ability => ability.ability.name);
        const typeNames = types.map(type => type.type.name);
        const statObjs = stats.map(stat => stat.stat.name + " " + stat.base_stat);
  
        // Update the UI with the detailed information of the clicked Pokemon
        setSelected({ name, id, height, weight, abilities: abilityNames, typeNames, statObjs });
        
      } else {
        displayError("Response was not OK!");
      }
    };
    xhr.onerror = () => displayError("Network Error!");
    xhr.send();
  }

  return (
    <div className="container">
      <div>

      <div className="half-screen">
      <PokemonList products={pokemonList} onPokemonClick={handlePokemonClick} />
        <div>
            <div>{offset} - {offset+10}</div>
            <button onClick={handlePreviousClick}>Previous</button>
            <button onClick={handleNextClick}>Next</button>
          </div>
        </div >
        <div className="half-screen">
          {selected && (
            <div>
              <h2>Selected Pokemon:</h2>
              <p>Name: {selected.name}</p>
              <p>ID: {selected.id}</p>
              <p>Height: {selected.height}</p>
              <p>Weight: {selected.weight}</p>
              <p>Abilities: {selected.abilities.join(', ')}</p>
              <p>typeNames: {selected.typeNames.join(', ')}</p>
              <p>statObjs: {selected.statObjs.join(', ')}</p>
            </div>
      )}
          </div>
        </div>
      </div>
  );
}

export default App;
