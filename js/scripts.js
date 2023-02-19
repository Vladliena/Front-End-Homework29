const input = document.querySelector('input');
input.addEventListener('keypress', numberSearch);
const section = document.getElementsByClassName('post&comment')[0]

function numberSearch(el) {
    if (el.key === 'Enter') {
        if (input.value > 100 || input.value < 1) {
            return false
        } else {
            getPost()
        }
    }
}

function getPost() {
    const inputValue = document.querySelector('input').value
    fetch(`https://jsonplaceholder.typicode.com/posts/${inputValue}`)
        .then(res => res.json())
        .then((res) => {
            const post = document.createElement('H1');
            post.innerHTML = res.title
            while (section.children[0]) section.children[0].remove()
            section.appendChild(post)
            if (post) {
                createButton()
            }
        })
        .catch(err => {
            console.log('Error', err)
        })
}

function createButton () {
    const commentButton = document.createElement('button');
    commentButton.setAttribute('type', 'button');
    commentButton.appendChild(document.createTextNode('Get comments'))
    commentButton.style.padding = '10px 10x'
    section.appendChild(commentButton)
    commentButton.addEventListener('click', comments)
}

function comments() {
    const inputValue = document.querySelector('input').value
    fetch(`https://jsonplaceholder.typicode.com/posts/${inputValue}/comments`)
        .then(res => res.json())
        .then(com => {
            while (section.children[2]) section.children[2].remove()
            for (let i = 0; i < com.length; i++) {
                const p = document.createElement('p');
                p.innerHTML = com[i].body
                section.appendChild(p)
            }
        })
        .catch(err => {
            console.log('Error', err)
        })
}