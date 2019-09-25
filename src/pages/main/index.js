import React, { Component } from 'react'; 
import api from '../../services/api'

import './styles.css'; 

export default class Main extends Component{
    state ={
        users:[],
        userInfo:{},
        page: 1,
    };
    
    //metodo de ciclo de vida componentDidMount, logo que o componente for exibido em tela
    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/people?page=${page}`);
        const { results, ...userInfo } = response.data;
        this.setState({ users: results, userInfo, page });
    };
    
    prevPage = () =>{
        const { page, userInfo } = this.state;

        if(page === 1) return;


        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, userInfo } = this.state;

        if(page === userInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }

    render() {

        //tenho que trazer as variaveis neste "import"
        const { users, page, userInfo } = this.state;

        return (
            //nao funciona pq meu request nao é uma lista e sim uma string apenas            
            <div className="user-list">
                {users.map(user => (
                    //<h2 key={user.species}>{user.name}</h2>
                    <article key={user.url}>
                        <strong>{user.name}</strong>
                        <p>{user.gender}</p>
                        <p>{user.birth_year}</p>
                
                        <a href="">Acessar</a>
                        
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === userInfo.pages} onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )};
    }