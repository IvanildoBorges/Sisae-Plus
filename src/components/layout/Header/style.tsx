import styled, { keyframes } from "styled-components";

/* Animação de rotação como uma moeda */
const spin = keyframes`
    0% { 
        transform: rotateY(0);
    }
    50% { 
        transform: rotateY(180deg);
    }
    100% { 
        transform: rotateY(360deg);
    }
`;

export const HeaderContainer = styled.header`
    &#header {
        background-color: var(--cor-do-cabecalho);
        padding: 0.625rem var(--espaco);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: fixed;
        width: 100%;
        height: var(--altura-do-cabecalho);
    }
`;

export const Navbar = styled.nav`
    &.navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }
`;

export const NavHeader = styled.div`
    &.navbar-header {
        display: flex;
        align-items: center;
        gap: var(--espaco);
    }

    .navbar-brand {
        font-size: 1.5rem;
    }
`;

export const ToggleHamburguer = styled.button`
    &.navbar-toggle {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 1.875rem;
        height: 1.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        z-index: 10;
    }

    .icon-bar {
        width: 100%;
        height: 3px;
        background-color: var(--cor-secundaria);
        border-radius: 5px;
        transition: all var(--transicao);
        transform: rotate(0); /* Quando o menu está fechado (estado normal) */
    }

    /* Quando o botão estiver ativo (menu aberto), aplica a transformação para "xis" */
    &.navbar-toggle.active .icon-bar:nth-child(1) {
        transform: translateY(10px) rotate(45deg);
    }

    &.navbar-toggle.active .icon-bar:nth-child(2) {
        opacity: 0; /* Esconde o traço do meio */
    }

    &.navbar-toggle.active .icon-bar:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
    }

    /* A transição deve ser suave entre os estados */
    &.navbar-toggle .icon-bar {
        transition: transform var(--transicao), opacity var(--transicao);
    }

    &.navbar-toggle:hover {
        .icon-bar {
            transition: all var(--transicao);
            background-color: var(--cor-do-hover);
        }
    }
`;

export const Aside = styled.aside`
    &.navbar-collapse {
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: var(--cor-do-cabecalho);
        height: 100dvh;
        width: 4.875rem;
        margin-top: var(--altura-do-cabecalho);
        padding: 2rem var(--espaco);
        transition: width var(--transicao-abrir-fechar-modal), background-color var(--transicao-esmaecer), color var(--transicao-esmaecer);
        flex-direction: column;
        overflow: hidden;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
    }

    &.navbar-collapse.active {
        width: 14dvw;
        box-shadow: 4px 80px 64px rgba(0, 0, 0, 0.5);

        .nav-link {
            gap: var(--espaco-menor);
        }

        .nav-span {
            width: calc(100% - 32px); /* largura do link menos o icone */
            scale: 1;
        }
    }

    @media screen and (max-width: 768px) {
        &.navbar-collapse {
            width: 100dvw;
            transform: translateX(-100dvw);
            transition: transform var(--transicao-abrir-fechar-modal), background-color var(--transicao-esmaecer), color var(--transicao-esmaecer);
            box-shadow: none;
        }

        &.navbar-collapse.active {
            width: 100dvw;
            transform: translateX(0);
        }
    }
`;

export const MenuList = styled.ul`
    &.nav {
        display: flex;
        flex-direction: column;
        gap: var(--espaco);
    }
`;

export const NavLink = styled.a`
    &.nav-link {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--cor-secundaria);
    }

    .nav-span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        scale: 0;
        width: 0;
        transition: all var(--transicao-abrir-fechar-modal);
    }

    &.nav-link:hover {
        color: var(--cor-do-hover);
        transition: all var(--transicao);

        .icon {
            fill: var(--cor-do-hover);
        }

        .nav-span {
            transition: all var(--transicao);
            color: var(--cor-do-hover);
        }
    }

    &.nav-link.active {
        color: var(--cor-primaria);
        font-weight: 700;

        .icon {
            fill: var(--cor-primaria);
            animation: ${spin} 0.5s ease-out; /* Duração de 0.5s para uma rotação rápida */
        }
    }

    &.nav-link.active:hover {
        color: var(--cor-do-hover);

        .icon {
            fill: var(--cor-do-hover);
        }
    }
`;

export const ToggleTheme = styled.button`
    &#dark-mode-toggle {
        background: transparent;
        border: none;
        border-radius: 100%;
        padding: 4px;
    }

    .dark-mode-icon {
        fill: var(--cor-secundaria);
        transition: all var(--transicao);
    }

    &#dark-mode-toggle:hover {
        background: var(--cor-do-hover);

        .dark-mode-icon {
            fill: var(--cor-invariavel);
        }
    }
`;