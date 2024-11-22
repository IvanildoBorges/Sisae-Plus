import React, { useEffect, useState } from "react";
import {
  Aside,
  HeaderContainer,
  MenuList,
  Navbar,
  NavHeader,
  NavLink,
  ToggleHamburguer,
  ToggleTheme
} from "./style";

const Header: React.FC = () => {
  const lua = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#343a40" class="dark-mode-icon"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z"/></svg>';
  const sol = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff" class="dark-mode-icon"><path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Z"/></svg>';
  const [estadoDoBotaoTema, setEstadoDoBotaoTema] = useState(carregaEstado);

  function carregaEstado(): boolean {
    const estadoLocal = localStorage.getItem("estadoDoBotaoTema");

    try {
      // pega o estado persistido e converte num formato objeto
      if (estadoLocal) {
        return JSON.parse(estadoLocal);
      } else {
        return false; 
      }
      
    } catch (error) {
        console.error("Erro ao carregar estado inicial do botão de tema: ", error);
        return false;
    }
  }

  function abreOuFechaMenuLateral() {
    const menuLateral = document.querySelector('#navbar-collapse');
    const botaoHamburguer = document.querySelector('.navbar-toggle');

    if (botaoHamburguer && menuLateral) {
      botaoHamburguer.classList.toggle('active');
      menuLateral.classList.toggle('active');
    }
  }

  function atualizaTema() {
    const botaoTrocaTema = document.getElementById('dark-mode-toggle');
    
    try {
      if (botaoTrocaTema) {
        if (estadoDoBotaoTema === false) {
            document.documentElement.setAttribute('data-theme', 'light');
            botaoTrocaTema.innerHTML = sol;
            botaoTrocaTema.setAttribute('title', 'Modo Claro Ativo');
            localStorage.setItem("estadoDoBotaoTema", JSON.stringify(estadoDoBotaoTema)); // Salva o novo estado em string
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            botaoTrocaTema.innerHTML = lua;
            botaoTrocaTema.setAttribute('title', 'Modo Escuro Ativo');
            localStorage.setItem("estadoDoBotaoTema", JSON.stringify(estadoDoBotaoTema)); // Salva o novo estado em string
        }

        setEstadoDoBotaoTema(!carregaEstado()); // inverte estado
      }
    } catch (error) {
        console.error("Erro ao alternar o tema: ", error);
    }
  }

  useEffect(() => {
    atualizaTema();
  }, []);

  return (
    <HeaderContainer id="header">
        <Navbar className="navbar">
            <NavHeader className="navbar-header">
                <ToggleHamburguer className="navbar-toggle" aria-label="Botão de navegação hamburguer" title="Menu" onClick={() => abreOuFechaMenuLateral()}>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </ToggleHamburguer>
                <a className="navbar-brand nav-link" title="Ir para Inicio" href="/">SisAE</a>
            </NavHeader>
            <ToggleTheme id="dark-mode-toggle" aria-label="Toggle Dark Mode" className="cta" onClick={() => atualizaTema()}>
                <svg></svg>
            </ToggleTheme>
            <Aside className="navbar-collapse" id="navbar-collapse">
                <MenuList className="nav">
                    <li>
                        <NavLink href="#" aria-label="Login" className="nav-link active" title="Login">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#67E86C" className="icon"><path d="M320-360h320v-22q0-45-44-71.5T480-480q-72 0-116 26.5T320-382v22Zm160-160q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520ZM320-120v-80H160q-33 0-56.5-23.5T80-280v-480q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v480q0 33-23.5 56.5T800-200H640v80H320Z"/></svg> <span className="nav-span">Login</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#" aria-label="Cadastro de aluno" className="nav-link" title="Cadastro">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#67E86C" className="icon"><path d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Z"/></svg> <span className="nav-span">Cadastro</span>
                        </NavLink>
                    </li>
                    <li><div className="separador"></div></li>
                    <li>
                        <NavLink href="#" className="nav-link" title="Manual do Aluno">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="icon"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg> <span className="nav-span">Manual do Aluno</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="nav-link" title="Reenvio de instruções de confirmação">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="icon"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg> <span className="nav-span">Reenvio de instruções</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink href="#" className="nav-link" title="Sincronizar email com Q-Academico">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="icon"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg> <span className="nav-span">Sincronizar email</span>
                        </NavLink>
                    </li>
                </MenuList>
            </Aside>
        </Navbar>
    </HeaderContainer>
  );
};

export default Header;
