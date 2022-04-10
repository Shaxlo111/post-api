// O'zgaruvchilarni tanlab olish
let elUserCounter = document.querySelector(".user__count");
let elPostCounter = document.querySelector(".post__count");
let elCommentCounter = document.querySelector(".comment__count");

let elUserList = document.querySelector(".user__list");
let elPostList = document.querySelector(".post__list");
let elCommentList = document.querySelector(".comment__list");

let elUserName = document.querySelector(".user__username");
let elUserEmail = document.querySelector(".user__email");
let elUserCountry = document.querySelector(".user__country");
let elUserCompany = document.querySelector(".user__company");
let elUserWebsite = document.querySelector(".user__website");

let elPostName = document.querySelector(".post__username");
let elPostInfo = document.querySelector(".post__info");

let elCommentTitle = document.querySelector(".comment__title");
let elCommentEmail = document.querySelector(".comment__email");
let elCommentInfo = document.querySelector(".comment__info");

let elUserTemplate = document.querySelector("#user-template").content;
let elPostTemplate = document.querySelector("#post-template").content;
let elCommentTemplate = document.querySelector("#comment-template").content;


// // ASYNC funksiyani e'lon qilish
// async function fetchapi() {
//     let responce = await fetch("https://jsonplaceholder.typicode.com/users");
//     let result = await responce.json()
//     console.log(result);
// }
// fetchapi()

let storage = window.localStorage;

let storagePostId = JSON.parse(storage.getItem('arrayNode'))
let storageCommentId = JSON.parse(storage.getItem('arrayCommentNode'))
console.log(storageCommentId);


;(async function() {
    let responce = await fetch("https://jsonplaceholder.typicode.com/users");
    let data = await responce.json();
    console.log(data);
    renderUsers(data, elUserList)
})();

if (storagePostId) {
    ;(async function() {
        
        let responce = await fetch(`https://jsonplaceholder.typicode.com/user/${storagePostId}/posts`);
        let data = await responce.json();
        renderPosts(data, elPostList)
    })();
}

if (storageCommentId) {
    ;(async function() {
        
        let responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${storageCommentId}/comments`);
        let data = await responce.json();
        console.log(data);
        renderComments(data, elCommentList)
    })();
}

// Render users
function renderUsers(array, wrapper) {
    wrapper.innerHTML = null;
    
    let userFragment = document.createDocumentFragment();
    
    array.forEach( item => {
        let userTemplate = elUserTemplate.cloneNode(true)
        
        userTemplate.querySelector('.user__username').textContent = item.name
        userTemplate.querySelector('.user__username').dataset.userId = item.id
        userTemplate.querySelector('.user__email').textContent = item.email
        userTemplate.querySelector('.user__country').textContent = item.address.city
        userTemplate.querySelector('.user__company').textContent = item.company.name
        userTemplate.querySelector('.user__website').href = item.website
        userTemplate.querySelector('.user__website').textContent = item.website
        
        userFragment.appendChild(userTemplate)
    })
    
    wrapper.appendChild(userFragment)
    elUserCounter.textContent = array.length;
}




// Render posts
function renderPosts(array, wrapper) {
    wrapper.innerHTML = null
    elCommentList.innerHTML = null
    elCommentCounter.innerHTML = "0"
    
    
    let postFragment = document.createDocumentFragment();
    
    array.forEach( item => {
        let postTemplate = elPostTemplate.cloneNode(true)
        
        postTemplate.querySelector('.post__username').textContent = item.title
        postTemplate.querySelector('.post__username').dataset.postId = item.id
        postTemplate.querySelector('.post__info').textContent = item.body
        
        postFragment.appendChild(postTemplate)
    })
    
    wrapper.appendChild(postFragment)
    elPostCounter.textContent = array.length
    
}

// Render comments
function renderComments(array, wrapper) {
    wrapper.innerHTML = null;
    
    let commentFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        let commentTemplate = elCommentTemplate.cloneNode(true);
        
        commentTemplate.querySelector('.comment__title').textContent = item.name;
        commentTemplate.querySelector('.comment__email').textContent = item.email;
        commentTemplate.querySelector('.comment__info').textContent = item.body;
        
        commentFragment.appendChild(commentTemplate)
    })
    
    wrapper.appendChild(commentFragment)
    elCommentCounter.textContent = array.length
}

elUserList.addEventListener('click', evt => {
    
    let foundUserId = evt.target.dataset.userId
    
    if (foundUserId) {
        
        ;(async function() {
            
            let responce = await fetch(`https://jsonplaceholder.typicode.com/user/${foundUserId}/posts`);
            let data = await responce.json();
            renderPosts(data, elPostList)
            storage.setItem('arrayNode', JSON.stringify(foundUserId))
            
        })();
    }
})

elPostList.addEventListener('click', evt => {
    let foundCommentId = evt.target.dataset.postId
    
    ;(async function() {
        
        if (foundCommentId) {
            let responce = await fetch(`https://jsonplaceholder.typicode.com/posts/${foundCommentId}/comments`);
            let data = await responce.json();
            renderComments(data, elCommentList)
            storage.setItem('arrayCommentNode', JSON.stringify(foundCommentId))
            
        }
    })();
})






