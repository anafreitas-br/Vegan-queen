import React, { useEffect, useState } from 'react';


const Burger = () => {

     const token = localStorage.getItem('token')
     const [menuBurger, setMenuBurger] = useState('');
  
   

    useEffect (() => {
        fetch('https://lab-api-bq.herokuapp.com/products', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            "Authorization": `${token}`
          },
        })
        .then((response) => response.json())
        .then((json) => {
            console.log (json)
          const burger = json.filter(item => item.type === 'all-day')
        //   const burgerSlice = burger.slice([2,3])
        //   let list = []
        //   list = list.map(burgerSlice)
          setMenuBurger(burger)
        })
      })


      return (
        <div className="Burger">
          <div className="MenuBurger">

            {menuBurger && menuBurger.map(function (item) {
                    return (
                        <div className="printScreen" key={item.name} name={item.name} id={item.id} price={item.price}>
                            <p className="nameProduct">{item.name} {item.flavor} {item.complement} R$ {item.price},00
                            <button className="btnAdd"> Adicionar</button></p>
                        
                        </div>
                    );
                })}
            
                            
              <button className="btnFinal">Finalizar</button>
             
              
           
          </div>
        </div>
      );
    }



export default Burger;