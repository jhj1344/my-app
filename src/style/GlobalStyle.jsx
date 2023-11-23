import { createGlobalStyle } from "styled-components";



const GlobalStyle = createGlobalStyle`
    /* v2.0 | 20110126
  http://meyerweb.com/eric/tools/css/reset/ 
  License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	/* font: inherit; */
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
	text-decoration: none;
}
img{
	display: block;
	width: 100%;
}
.container{
    max-width: 1280px;
    margin: 0px auto;
	padding: 100px 0px;
}

.productList{
    display: flex;
    gap: 24px 5%;
    flex-wrap: wrap;
    li{
        flex-shrink: 0;
        flex-basis: 30%;
		.productsItem{
			display: flex;
			flex-direction: column;
			gap: 20px;
			.textWrap{
				display: flex;
				flex-direction: column;
				gap: 10px;
				.itemTitle{
					font-size: 20px;
					font-weight: normal;
					transition: 500ms;
					color: rgba(0,0,0,0.5);
				}
				.itemFlex{
					display: flex;
					justify-content: space-between;
				}
			}
		}
    }
}

//detail page
.detailPage{
	max-width: 1024px;
	display: flex;
	gap: 40px;
	margin: 0px auto;
	.detailImg{
		max-width: 400px;
		img{
			width: 100%;
			display: block;
		}
	}
	.detailText{
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		h2{
			font-size: 24px;
			width: 100%;
			font-weight: normal;
			border-bottom: solid 1px #ddd;
			padding-bottom: 16px;
		}
		p{
			width: 100%;
			padding-bottom: 16px;
			color: rgba(0,0,0,0.7);
			display: flex;
			font-size: 20px;
			span{
				padding-left: 100px;
			}
		}

		.detailOpt{
			width: 100%;
			display: flex;
			align-items: center;
			label{
				font-size: 20px;
				color: rgba(0,0,0,0.7);
			}
			select{
				margin-left: 100px;
				width: 100px;
				padding: 6px 12px;
				background: transparent;
				border: solid 1px black;
				border-radius: 3px;
			}
		}
		.detailBtns{
			display: flex;
			gap: 16px;
			margin-top: auto;
			flex-direction: column;
			button{
				width: 100%;
				height: 50px;
				border-radius: 5px; 
				border: none;
				font-weight: bold;
				font-size: 20px;
				color: #fff;
				
			}
			.cartBtn{
				background: lightgray;

			}
			.buyBtn{
				background: darkblue;

			}
		}
	}
}

//cart
.cartList{
	display: flex;
	flex-direction: column;
	gap: 20px;
	border-top: solid 1px #ddd;
	padding: 24px 0px;
	li{
		display: flex;
		align-items: center;
		border-bottom: solid 1px #ddd;
		padding: 12px 0px;
		gap: 12px;
		img{
			width: 100px;
			display: block;
		}
	}

}
//search result
.searchForm{
	width: 100%;
	height: 50px;
	margin-bottom: 50px;
	background: white;
	border: none;
	font-size: 30px;
	border-radius: 10px;
	padding-left: 30px;
	box-sizing: border-box;
}
.searchResultList{
	display: flex;
	gap: 12px;
	flex-direction: column;
	li{
		>div{
			display: flex;
			gap: 30px;
			align-items: center;
			padding: 12px 0px;
			border-bottom: solid 1px #ddd;
		}

	}
	img{
		width: 100px;
	}
}


`

export default GlobalStyle;