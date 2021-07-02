import React, { Component } from "react";
import Pokecard from "./pokecard"
import "./pokedex.css"




class Pokedex extends Component {
    render() {
        let title;
		if (this.props.isWinner) {
			title = <h1 className="Pokedex-winner">Winning Hand</h1>;
		} else {
			title = <h1 className="Pokedex-loser">Losing Hand</h1>;
		}
        return (
            <div className="Pokedex">
                <h1>Pokedex</h1>
                {title}
				<h4>Total Experience: {this.props.exp}</h4>
                <card className="Pokedex-cards">
                    {this.props.pokemon.map((p) => (
                        <Pokecard id={p.id} name={p.name} type={p.type} exp={p.base_experience} />
                    ))}
                </card>
            </div>
        )
    }
}

export default Pokedex;