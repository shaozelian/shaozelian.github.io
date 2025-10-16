---
layout: post
author: Shao Zelian
title: Hover cards with HTML and CSS
category: Technologies
tags: Web-Development
excerpt: Hover cards with HTML and CSS
---

<style>

.card-container{
    width: 1000px;
    position: relative;
    display: flex;
    justify-content: space-between;
    background-color: darkgrey;
    padding: 30px;
}

.card-container .card{
    position: relative;
    cursor: pointer;
    background: transparent;
}

.card-container .card .face{
    width: 300px;
    height: 200px;
    transition: 0.5s;
}

.card-container .card .face.face1{
    position: relative;
    background: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    transform: translateY(100px);
}

.card-container .card:hover .face.face1{
    background: #ff0057;
    transform: translateY(0);
}

.card-container .card .face.face1 .content{
    opacity: 0.2;
    transition: 0.5s;
}

.card-container .card:hover .face.face1 .content{
    opacity: 1;
}

.card-container .card .face.face1 .content img{
    max-width: 100px;
    filter: invert(100%) sepia(100%) saturate(1000%) hue-rotate(180deg) brightness(100%) contrast(100%);
}

.card-container .card .face.face1 .content h3{
    margin: 10px 0 0;
    padding: 0;
    color: #fff;
    text-align: center;
    font-size: 1.5em;
}

.card-container .card .face.face2{
    position: relative;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px);
}

.card-container .card:hover .face.face2{
    transform: translateY(0);
}

.card-container .card .face.face2 .content p{
    margin: 0;
    padding: 0;
    color: #000;
}

.card-container .card .face.face2 .content a{
    margin: 15px 0 0;
    display:  inline-block;
    text-decoration: none;
    font-weight: 900;
    color: #333;
    padding: 5px;
    border: 1px solid #333;
}

.card-container .card .face.face2 .content a:hover{
    background: #333;
    color: #fff;
}
    </style>

 <div class="card-container">
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="/assets/images/materials/Design.png" width="128px"/>
                    <h3>Design</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                        <a href="#">Read More</a>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="/assets/images/materials/Code.png" width="128px"/>
                    <h3>Code</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                        <a href="#">Read More</a>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="face face1">
                <div class="content">
                    <img src="/assets/images/materials/Launch.png" width="128px">
                    <h3>Launch</h3>
                </div>
            </div>
            <div class="face face2">
                <div class="content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum cumque minus iste veritatis provident at.</p>
                        <a href="#">Read More</a>
                </div>
            </div>
        </div>
    </div>
