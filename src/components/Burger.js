import React, { useEffect, useState } from 'react';
import InnerHeader from '../components/InnerHeader'
import Command from './Command';

const Burger = () => {

    const token = localStorage.getItem('token')
    const [menuBurger, setMenuBurger] = useState('');
    const professional = localStorage.getItem("name");
    //const [pedido, setPedido] = useState(JSON.parse(localStorage.getItem("pedido")));
    const [pedido, setPedido] = useState([])

    useEffect(() => {
        fetch('https://lab-api-bq.herokuapp.com/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${token}`
            },
        })
            .then((response) => response.json())
            .then((json) => {
                const burger = json.filter(item => item.type === 'all-day')
                setMenuBurger(burger)
            })
    }, [token]);

    useEffect(() => {
        console.log(pedido)
    }, [pedido])

    const adicionar = (event) => {
        event.preventDefault();
        const parent = event.target.parentNode.parentNode;
        const complement = parent.getAttribute("complement");
        const flavor = parent.getAttribute('flavor');
        const id = parent.getAttribute('id');
        const name = parent.getAttribute('name');
        const price = parent.getAttribute('price');

        const objeto = {
            id: id,
            name: name,
            flavor: flavor,
            complement: complement,
            price: price,
            qtd: 1
        }
        setPedido(obj => [...obj, objeto])
    };

    const qtdAdd = (novoPedido, objeto) => {
        if (novoPedido.includes(objeto)) {
            objeto.qtd ++
            setPedido([...novoPedido])
        } else {
            objeto.qtd = 1
            setPedido([...novoPedido])
        }
    }

    return (
        <div className="Burger">
            <InnerHeader professional={professional} />
            <div className="MenuBurger">
                {menuBurger && menuBurger.map(function (item) {
                    return (
                        <div className="printScreen" key={item.id} id={item.id} name={item.name} flavor={item.flavor} complement={item.complement} price={item.price} >
                            <p className="nameProduct">{item.name} {item.flavor} {item.complement} R$ {item.price},00
                            <button className="btnAdd" onClick={adicionar}> + </button></p>
                        </div>
                    );
                })}

                <Command pedido={pedido} setPedido={setPedido} />

            </div>
        </div>
    );
}

export default Burger;











