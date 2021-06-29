const getJSON = async(url) => {
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access
        }
    });
    let result = await resp.json();
    if (resp.ok) result.success = true;
    else result.success = false;
    return result;
};

const postJSON = async(url, method, obj) => {
    const resp = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access
        },
        body: JSON.stringify(obj)
    });
    console.log(resp);
    const result = await resp.json();
    console.log(result);
    if (resp.ok) result.success = true;
    else result.success = false;
    return result;
};

const deleteJSON = async(url) => {
    const resp = await fetch(url, {
        method: "DELETE",
        headers: {
            "content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access
        },
    });
    return resp;
};

const postFormData = async(url, method, formData) => {
    const resp = await fetch(url, {
        method: method,
        headers: {
            Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).access,
        },
        body: formData
    });
    console.log(resp);
    const result = await resp.json();
    if (resp.ok) result.success = true;
    else result.success = false;
    return result;
};

//Handling the menu bar while scrolling
const menuScroll = () => {
    const menu = document.querySelector(".menuMobile");
    const menuBtn = document.querySelector(".menuBtn");
    if (menu) {
        if (window.scrollY > 224) {
            menu.style.opacity = "1";
            menuBtn.style.opacity = "1";
        } else {
            menu.style.opacity = "0";
            menuBtn.style.opacity = "0";
        }
    }
};

const homePageScroll = () => {
    let scrollIndex = window.scrollY;
    return () => {
        //Handling the search bar while scrolling
        const searchBar = document.querySelector(".searchBar");
        if (searchBar) {
            const img = searchBar.querySelector("img");
            const ul = searchBar.querySelector("ul");

            if ((window.scrollY > scrollIndex) || window.scrollY === 0) {
                searchBar.classList.remove("changeStyle");
                img.style.display = "block";
                ul.style.paddingLeft = "0px";
            } else {
                searchBar.classList.add("changeStyle");
                img.style.display = "none";
                ul.style.paddingLeft = "10px";
            }
        }

        //Handling the menu bar while scrolling
        menuScroll();

        scrollIndex = window.scrollY;
    };
};

export { homePageScroll, menuScroll, getJSON, postJSON, postFormData, deleteJSON };