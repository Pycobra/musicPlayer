import styled, { css } from "styled-components";
import { Link } from "react-router-dom";


export const getHeadersHeight = props => {
    const headerHeight = document.querySelector('.header-3')
    console.log(headerHeight)
}
export const ContainerStyles = styled.section`
    width:100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position:absolute;
    z-index:1;
    top:20vh;
    margin-top: 5px;
    left: 0;
    ${getHeadersHeight}
`;



// export const ButtonStyles = css`
//     background-color: black;
//     color: white;
//     border: none;

//     &:hover {
//             background-color: white;
//             color: black;
//             border: 1px solid black;
//           }
// `;
 
// export const InvertedCustomButton2 = css`
//     width: 80%;
//     opacity: 0.7;
//     padding: 0 5PX;
//     position: absolute;
//     top:255px;
//     background-color: black;
//     color: white;
//     border:none;

//     &:hover{
//             background-color: white;
//             color: black;
//             border:1px solid black;
//           }
// `;
// export const InvertedCustomButton = css`
//     background-color: white;
//     color: black;
//     border:1px solid black;
//     width: 80%;
//     opacity: 0.7;
//     position: absolute;
//     top:255px;

//     &:hover{
//             background-color: black;
//             color: white;
//             border:none;
//           }
// `;

// export const GoogleCustomButton = css`
//     background-color: #4285f4;
//     color: white;
//     border: none;
//     margin-left: 10px;
    
//     &:hover {
//             background-color: #557ae8;
//           }
// `;

// const getButtonStyles = props => {
//     if(props.isGoogleSignIn){
//         return GoogleCustomButton
//     }
//     else if(props.inverted2){
//         return InvertedCustomButton2
//     }
//     return props.inverted ? InvertedCustomButton : ButtonStyles
// }

// export const CustomButtonStyle = styled.button`
//     min-width: 165px;
//     width: auto;
//     height: 50px;
//     letter-spacing: 0.5px;
//     line-height: 50px;
//     padding: 0 35px;
//     font-size: 15px;
//     text-transform: uppercase;
//     font-family: 'Open Sans Condensed';
//     font-weight: bolder;
//     cursor: pointer;
//     display: flex;
//     justify-content: center;

//     ${getButtonStyles}
// `;

