import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '../components/Button/Button';
import InnerHeader from './InnerHeader';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import home from '../img/home.png'
import Modal from './Modal';


const OrderKitchen = () => {
  const professional = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState('');
  const ordersList = useRef(false);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [warning, setWarning] = useState('');

  const handleSubmit = (itemId) => {
    fetch(`https://lab-api-bq.herokuapp.com/orders/${itemId}`, {
      method: "PUT",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `${token}`
      },
      body: JSON.stringify({
        "status": `Entregue`
      })
    })
      .then((response) => response.json())
      .then(() => {
        setWarning("Pedido finalizado com sucesso")
        setIsModalVisible(true)
      })
  }

  const getOrders = useCallback(async () => {
    fetch("https://lab-api-bq.herokuapp.com/orders", {
      headers: {
        "accept": "application/json",
        "Authorization": `${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const order = json
          .filter(item => item.status === `Pronto`)
          .map(item => {
            item.Products.map(item => {
              if (item.flavor === "carne" & item.complement === "queijo") {
                item.flavor = "sabor beterraba e feijão"
                item.complement = "Com queijo de castanhas"
              } else if (item.flavor === "carne" & item.complement === "ovo") {
                item.flavor = "sabor beterraba e feijão"
                item.complement = "Com ovo vegetal"
              } else if (item.flavor === "carne") {
                item.flavor = "sabor beterraba e feijão"
              } else if (item.flavor === "frango" & item.complement === "queijo") {
                item.flavor = "sabor shimeji e paris"
                item.complement = "Com queijo de castanhas"
              } else if (item.flavor === "frango" & item.complement === "ovo") {
                item.flavor = "sabor shimeji e paris"
                item.complement = "Com ovo vegetal"
              } else if (item.flavor === "frango") {
                item.flavor = "sabor shimeji e paris"
              } else if (item.flavor === "vegetariano" & item.complement === "queijo") {
                item.flavor = "sabor falafel"
                item.complement = "Com queijo de castanhas"
              } else if (item.flavor === "vegetariano" & item.complement === "ovo") {
                item.flavor = "sabor falafel"
                item.complement = "Com ovo vegetal"
              } else if (item.flavor === "vegetariano") {
                item.flavor = "sabor falafel"
              } else if (item.name === "Café com leite") {
                item.name = "Café com leite vegetal"
              } else if (item.name === "Misto quente") {
                item.name = "Sanduiche natural"
              } else if (item.name === "Café americano") {
                item.name = "Café puro"
              }
              return item
            })
            return item
          })
        setOrder(order)
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      })
    // eslint-disable-next-line
  }, [order, token])

  useEffect(() => {
    if (!ordersList.current) {
      getOrders();
      ordersList.current = true;
    }
    return () => { ordersList.current = false }
    // eslint-disable-next-line
  }, [getOrders]);

  return (
    <>
      <InnerHeader professional={professional} />
      <Link to="/hall">
        <img className="btnHome" alt="botão para salão" src={home} type="submit" onClick={(() => "/hall")} />
      </Link>
      <div className="kitchen">
        {loading ?
          (
            <Loading />
          ) : (
            <div className="ordersList">
              {order && order.map(function (item) {
                return (
                  <div className="EachOrder eachDetail" key={item.id}>
                    <p>Status: {item.status} | Cliente: {item.client_name} | Mesa: {item.table}</p>
                    <p>Data e hora: {item.createdAt}</p>
                    <div className="printScreennameProduct">Produtos: {item.Products.map(function (product) {
                      return (
                        <div key={item.id}>
                          <p>{product.name} {product.flavor} {product.complement} - Quantidade: {product.qtd}</p>
                        </div>
                      )
                    })}
                    </div>
                    <Button onClick={() => handleSubmit(item.id)}>Pedido Entregue</Button>
                  </div>
                )
              }
              )}
            </div>
          )}
      </div>
      <div className="modalC">
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>
            <h1>{warning}</h1>
          </Modal>
        ) : null}
      </div>
    </>
  )
}

export default OrderKitchen;