import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Main extends Component {
  //Armazenando Dados
  state = {
    products: [],
    productInfo: {},
    //página que está a aplicação
    page: 1,
  }
  //este componente é como se fosse um método executado, assim que o componente for mostrado em tela
  //quando utilizamos métodos que pertencem ao react, como render(), componentDidMount()
  //pode-se utilizar esse modelo de função normal, named function
  componentDidMount() {
    this.loadProducts();
  }
  //quando criamos funções nossa, utiliza-se o modelo Arrow Functions
  //para acessar a varivel this, precisa desse modelo, pois se não utilizar
  //nao vai conseguir enxergar o escopo da variavel this, não vai conseguir
  //referenciar a classe e acessar outros métodos e variaveis
  //por isso utiliza o Arrom Function
  //pq ele não sobrescreve o valor do this
  loadProducts = async (page = 1) => {
    //acessando a api
    const response = await api.get(`/products?page=${page}`);
    //pegando variavel docs e armazenando todo o resto(...) dentro do productInfo
    const { docs, ...productInfo } = response.data;
    //pegando a contagem de produtos do docs, e setando no state
    // this.setState({ products: response.data.docs });
    this.setState({ products: docs, productInfo, page });

    console.log(response.data.docs);  
  };

  prevPage = () => {
    const { page, productInfo } =  this.state;

    if(page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    //quando der um next page, vai buscar qual é a pagina atual(page) e o productInfo 
    const { page, productInfo } =  this.state;
    //verifica se está na última página
    if (page === productInfo.pages) return;
    //se não tiver na última página
    //pageNumber recebe a a próxima página
    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  render() {
    const { products, page, productInfo } = this.state;

  //recalculando a contagem 
  // return <h1>Contagem de Produtos: {this.state.products.length}</h1>
  return (
     <div className="product-list">
       {products.map(product => (
        //vai dar um erro no console, então se adiciona uma key dentro do <h2>
        //pq quando utiliza o map ele pede uma key para cada produto
        //colocando no h2 um key={product._id}, _id é o id de cada produto
        // <h2 key={product._id}>{product.title}</h2>
          <article key={product._id}>            
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
       ))}
       <div className="actions">
         <button disabled={page === 1} onClick={this.prevPage}>
           Anterior
         </button>
         <button disabled={page === productInfo.pages} onClick={this.nextPage}>
           Próximo
         </button>
       </div>
     </div>
    );
  }
}