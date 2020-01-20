import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Product extends Component {
  state = {
    product: {},

  };

  async componentDidMount() {
    //acessar os parametros da rota com this.props.match.params
    const { id } = this.props.match.params;

    const response = await api.get(`/products/${id}`);
    //preenchendo o product com response.data
    this.setState({ product: response.data });
  }

  render(){
    //mostrar os dados 
    const { product } = this.state;

    return (
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>
        Url: <a href={product.url}>{product.url}</a>
        </p>
      </div>      

    );
  }
}