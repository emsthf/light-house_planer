import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
display: flex;
`;

const PageBtn = styled.button`
padding: 0.4rem 0.8rem;
border: none;
background: #416dea;
color: #fff;
margin: 0 0.2rem;
&:hover {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
}
&:active {
    background: linear-gradient(315deg, #89d8d3, #416dea 74%);
    box-shadow: 0 3px 10px #999;
}
&[data-index] {
    background: #89d8d3;
}
`;


function Pagination({total, limit, page, setPage}) {

    const numPages = Math.ceil(total / limit);

    return ( 
        <Nav>
            {
                Array(numPages).fill().map((num, i) => (
                    <PageBtn key={i + 1} onClick={() => setPage(i + 1)} data-index={page === i + 1 ? i + 1 : null}>{parseInt(i + 1)}</PageBtn>
                ))
            }
        </Nav>
     );
}

export default Pagination;