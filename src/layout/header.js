import React from "react";


function Header(){
    return(
        <div
        id="intro-example"
        class="p-5 text-center bg-image"
        style={{
            backgroundImage: `url('https://mdbcdn.b-cdn.net/img/new/slides/041.webp')`,
            height: "100%",
            width: "100%"
        }}
        >
            <div class="mask" style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                height: "550px"
            }}>
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div class="text-white">
                        <h1 class="mb-3">Learn Bootstrap 5 with MDB</h1>
                        <h5 class="mb-4">Best & free guide of responsive web design</h5>
                        <a
                        class="btn btn-outline-light btn-lg m-2"
                        href="https://www.youtube.com/watch?v=c9B4TPnak1A"
                        role="button"
                        rel="nofollow"
                        target="_blank"
                        >Start tutorial</a
                        >
                        <a
                        class="btn btn-outline-light btn-lg m-2"
                        href="https://mdbootstrap.com/docs/standard/"
                        target="_blank"
                        role="button"
                        >Download MDB UI KIT</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;