//ITO YUNG DYNAMIC PAGE AREA! DITO MO LAGAY YUNG MGA DIFFERENT PAGES NG APPLICATION MO, SO INSTEAD OF LINKING HTML TO OTHER HTML,
//DYNAMICALLY NA SILA MAG RERENDER, SO ISANG HTML LANG ANG GAMIT NATIN!
//!!!Mas efficient kung nag framework ako like REACT, but I'd like to challenge myself building fully dynamic webapp by just vanillas HTML,CSS,JS


//After mage register ni user! ibabalik yung login form
let registerToLoginFormTransition = () => {
    let registerPage = document.querySelector('#registerPage')
    registerPage.style.opacity = '0'

    setTimeout(() => {
        registerPage.style.display = 'none'
    }, 200)


    let loginPage = document.querySelector('#loginPage')
    loginPage.style.display = 'flex'
    setTimeout(() => {
        loginPage.style.opacity = '1'
    }, 200)
}

//Ito yung maglalagay ng mainPage sa may Application ko! pag nakalogin na!
let mainPage = () => {
    console.log("Logged in!")

    // let cookie = document.cookie

    // let auth = cookie.split(' ')
    // console.log(cookie)

    // let index = auth.findIndex(iteration => iteration.includes('cookieId'))
    // let cookieCheck = auth[index].split('=')[1]

    let userInfo

    let cookieCheck = localStorage.getItem('cookieId')
    console.log(cookieCheck)

    let fetchData = async () => {
        let URL = `https://notesifytalamobackend.onrender.com/api/${cookieCheck}`

        try {
            let res = await fetch(URL)
            if (!res.ok) {
                let errorMes = res.json()
                throw new Error(errorMes.message)
            }
            let data = await res.json()
            userInfo = data
        } catch (error) {
            console.log(error)
        }
    }
    fetchData()

    setTimeout(() => {
        console.log(userInfo)
    }, 1000)


    //clear screen
    let body = document.querySelector('body')
    body.innerHTML = ''

    //Generate dashboard template
    let template = document.createElement('div')
    template.id = 'template'

    { // navigation bar sa gilid
        let leftNav = document.createElement('div')
        leftNav.id = 'leftNavigation'

        let leftLogoArea = document.createElement('div')
        leftLogoArea.id = 'logo-area'
        leftLogoArea.innerText = 'Notesify'

        leftNav.appendChild(leftLogoArea)
        {
            let buttonArea = document.createElement('div')
            buttonArea.id = 'button-area'

            let btn1 = document.createElement('div')
            btn1.classList.add('navBtn')
            btn1.id = 'home'
            let img1 = document.createElement('img')
            img1.src = './dashboard/img/assetHome.png'
            img1.title = 'Home'
            btn1.appendChild(img1)


            let btn2 = document.createElement('div')
            btn2.classList.add('navBtn')
            btn2.id = 'registerUser'
            let img2 = document.createElement('img')
            img2.src = './dashboard/img/findAsset.png'
            img2.title = 'Registered User'
            btn2.appendChild(img2)

            let btn3 = document.createElement('div')
            btn3.classList.add('navBtn')
            btn3.id = 'info'
            let img3 = document.createElement('img')
            img3.src = './dashboard/img/asset1.png'
            img3.title = 'User Info'
            btn3.appendChild(img3)

            buttonArea.appendChild(btn1)
            buttonArea.appendChild(btn2)
            buttonArea.appendChild(btn3)

            leftNav.appendChild(buttonArea)
        }

        { //logout area
            let logoutArea = document.createElement('div')
            logoutArea.id = 'logout-area'

            let btnLogout = document.createElement('div')
            btnLogout.classList.add('navBtn')
            btnLogout.id = 'logout'
            let img3 = document.createElement('img')
            img3.src = './dashboard/img/logoutAsset.png'
            img3.title = 'Logout'
            btnLogout.appendChild(img3)

            logoutArea.appendChild(btnLogout)

            leftNav.appendChild(logoutArea)
        }



        template.appendChild(leftNav)
    }

    let mainTemplate = document.createElement('div')
    mainTemplate.id = 'main-template'

    template.appendChild(mainTemplate)

    body.appendChild(template)

    {// scripts
        //Logout 
        let logout = document.querySelector('#logout')
        logout.addEventListener('click', (e) => {
            console.log('press logout')
            e.preventDefault();

            let fetchLogout = async () => {
                let URL = `https://notesifytalamobackend.onrender.com/api/logout/${cookieCheck}`;

                try {
                    let res = await fetch(URL, {
                        method: 'GET',
                        credentials: 'include' // This is important to include cookies
                    });

                    if (!res.ok) {
                        let errorMes = await res.json();
                        throw new Error(errorMes.message);
                    }

                    let logoutData = await res.json();

                    window.location.href = 'https://notesifytalamo.onrender.com'
                    // window.location.href = 'http://localhost:7979'// babalik sa main page!

                } catch (error) {
                    console.log(error.message);
                }
            };

            fetchLogout();
        });
    }

    {//buttons


        {//MAIN DASHBOARD
            let home = document.querySelector('#home')
            home.addEventListener('click', (e) => {
                e.preventDefault()

                let mainTemplate = document.getElementById('main-template')

                if (mainTemplate.childElementCount !== 0) {

                    mainTemplate.innerHTML = ''

                }

                let templateHome = document.createElement('div')
                templateHome.id = 'homeDashboard'
                templateHome.classList.add('btn-main-template')

                {
                    let text = document.createElement('text')
                    text.innerText = 'News Feed'
                    text.classList.add('reg-users-text')
                    // text.id='regUserTextRes'
                    // text.style.position = 'absolute'
                    // text.style.left = '0'
                    // text.style.top = '-4%'
                    templateHome.appendChild(text)
                }

                {// Add new Post
                    let newPost = document.createElement('div')
                    newPost.innerText = 'ADD POST'
                    newPost.style.width = '200px'
                    newPost.style.height = '50px'
                    newPost.style.backgroundColor = '#FF8901'
                    newPost.style.position = 'absolute'
                    newPost.style.right = '5%'
                    newPost.style.top = '-3%'
                    newPost.style.display = 'flex'
                    newPost.style.alignItems = 'center'
                    newPost.style.justifyContent = 'center'
                    newPost.style.borderRadius = '30px'
                    newPost.style.fontWeight = '800'
                    newPost.style.color = 'white'
                    newPost.style.cursor = 'pointer'
                    newPost.id = 'home-newPost'

                    templateHome.appendChild(newPost)

                    newPost.addEventListener('click', (e) => {
                        e.preventDefault()

                        let mainTemplate = document.querySelector('#main-template')


                        let addPostTemplate = document.createElement('div');
                        addPostTemplate.id = 'addPostTemplate';
                        addPostTemplate.style.width = '100vw';
                        addPostTemplate.style.height = '100vh';
                        addPostTemplate.style.backgroundColor = 'green';
                        addPostTemplate.style.position = 'absolute';
                        addPostTemplate.style.background = 'rgba(255, 255, 255, 0.1)';
                        addPostTemplate.style.backdropFilter = 'blur(6px)';
                        addPostTemplate.style.display = 'flex'
                        addPostTemplate.style.alignItems = 'center'
                        addPostTemplate.style.justifyContent = 'center'

                        addPostTemplate.addEventListener('click', (e) => {

                            mainTemplate.childNodes.forEach(element => {
                                if (element.id === 'addPostTemplate') {
                                    mainTemplate.removeChild(element)
                                }
                            })
                        });

                        let inputBoxPost = document.createElement('div')
                        inputBoxPost.style.width = '700px'
                        inputBoxPost.style.height = '500px'
                        inputBoxPost.style.backgroundColor = 'white'
                        inputBoxPost.style.borderRadius = '20px'
                        inputBoxPost.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.2)';
                        inputBoxPost.style.display = 'flex'
                        inputBoxPost.style.alignItems = 'center'
                        inputBoxPost.style.justifyContent = 'center'
                        inputBoxPost.style.flexDirection = 'column'
                        inputBoxPost.style.position = 'relative'
                        inputBoxPost.style.overflow = 'hidden'
                        inputBoxPost.classList.add('inputBoxPostRes')
                        inputBoxPost.addEventListener('click', (e) => {
                            e.stopPropagation()
                        })


                        let textAboveBoxPost = document.createElement('text')
                        textAboveBoxPost.innerText = "CREATE POST"
                        textAboveBoxPost.style.position = 'absolute'
                        textAboveBoxPost.style.left = '50%'
                        textAboveBoxPost.style.transform = 'translateX(-50%)'
                        textAboveBoxPost.style.top = '4%'
                        textAboveBoxPost.style.fontWeight = '800'


                        let form = document.createElement('form')
                        form.style.display = 'flex'
                        form.style.alignItems = 'center'
                        form.style.justifyContent = 'flex-start'
                        form.style.width = '100%'
                        form.style.height = '100%'
                        form.style.flexDirection = 'column'
                        form.style.position = 'relative'
                        form.style.top = '14%'
                        form.style.gap = '1rem'


                        let textArea = document.createElement('textarea')
                        textArea.style.width = '90%'
                        textArea.style.height = '65%'
                        textArea.style.fontSize = '24px'
                        textArea.style.fontWeight = '600'
                        textArea.style.textIndent = '10px'
                        textArea.style.border = 'none'
                        textArea.placeholder = "What's on your mind?"
                        textArea.style.resize = 'none'
                        textArea.id = 'textArea'
                        textArea.setAttribute('required', 'true');


                        let button = document.createElement('button')
                        button.style.width = '90%'
                        button.innerText = 'SUBMIT'
                        button.style.border = 'none'
                        button.style.height = '50px'
                        button.style.cursor = 'pointer'
                        button.style.borderRadius = '15px'
                        button.style.backgroundColor = '#FF8901'
                        button.style.fontWeight = '800'
                        button.style.fontSize = '22px'

                        form.appendChild(textArea)
                        form.appendChild(button)

                        form.addEventListener('keydown', function (e) {
                            console.log(e.key)
                            if (e.key === 'enter' && !e.shiftKey) {
                                if (textArea.value.trim().length === 0) {
                                    e.preventDefault();  // Prevent default behavior (adding a newline)
                                    alert('Please input something inside');
                                } else {
                                    form.dispatchEvent(new Event('submit'));  // Manually trigger the submit event
                                }
                            }
                        });

                        form.addEventListener('submit', (e) => {
                            e.preventDefault()

                            mainTemplate.childNodes.forEach(element => {
                                if (element.id === 'addPostTemplate') {
                                    mainTemplate.removeChild(element)
                                }
                            })

                            // console.log(userInfo.success.username) To check sa console kung nagana ba
                            // console.log(textArea.value)

                            let obj = {
                                name: userInfo.success.username,
                                content: textArea.value
                            }

                            let fetchPost = async () => {
                                let url = 'https://notesifytalamobackend.onrender.com/postRoutes/addPost'

                                try {
                                    let res = await fetch(url, {
                                        method: 'POST',
                                        headers: {
                                            'content-type': 'application/json'
                                        },
                                        body: JSON.stringify(obj)
                                    })

                                    if (!res.ok) throw new error('Error with fetchPost')
                                } catch (error) {
                                    console.log(error.message)
                                }
                            }
                            fetchPost()

                            textArea.value = ''
                        })

                        inputBoxPost.appendChild(form)
                        inputBoxPost.appendChild(textAboveBoxPost)

                        addPostTemplate.appendChild(inputBoxPost)

                        mainTemplate.appendChild(addPostTemplate)


                    })
                }

                //Ito naman yung request para makuha yung mga messages ng lahat ng nasa newsfeed



                {//Ito yung template sa loob
                    let container = document.createElement('div')
                    container.id = 'home-container'
                    container.style.display = 'flex'
                    container.style.alignItems = 'center'
                    container.style.justifyContent = 'center'
                    container.style.overflowY = 'auto'

                    let innerContainer = document.createElement('div')
                    innerContainer.id = 'homeInnerContainer'
                    innerContainer.style.display = 'flex'
                    innerContainer.style.flexDirection = 'column-reverse'
                    innerContainer.style.alignItems = 'center'
                    innerContainer.style.justifyContent = 'flex-end'
                    innerContainer.style.gap = '1rem'
                    innerContainer.style.flexGrow = '1'
                    innerContainer.style.overflowY = 'auto'
                    innerContainer.style.width = '100%'
                    innerContainer.style.marginTop = 'auto'


                    container.appendChild(innerContainer)


                    let fetchAllPost = async () => {
                        let url = 'https://notesifytalamobackend.onrender.com/postRoutes/allPost'

                        try {
                            let res = await fetch(url)
                            if (!res.ok) throw new error(error.message)

                            let data = await res.json()
                            return data
                        } catch (error) {
                            console.log(error.message)
                        }
                    }

                    let renderPostBox = async () => {
                        innerContainer.innerHTML = ''

                        let postInfos = await fetchAllPost()

                        postInfos.forEach(element => {
                            let postBox = document.createElement('div')
                            postBox.style.height = '550px'
                            postBox.style.width = '550px'
                            postBox.style.backgroundColor = '#F0F2F5'
                            postBox.style.borderRadius = '15px'
                            postBox.style.position = 'relative'
                            postBox.classList.add('postBoxRes')

                            let profileSection = document.createElement('div')
                            profileSection.style.width = '90%'
                            profileSection.style.height = '80px'
                            profileSection.style.position = 'absolute'
                            profileSection.style.top = '4%'
                            profileSection.style.backgroundColor = 'white'
                            profileSection.style.left = '50%'
                            profileSection.style.transform = 'translateX(-50%)'

                            let profileSectionName = document.createElement('text')
                            profileSectionName.style.width = '150px'
                            profileSectionName.style.width = '40pz'
                            profileSectionName.style.position = 'absolute'
                            profileSectionName.style.transform = 'translateY(-50%)'
                            profileSectionName.style.top = '50%'
                            profileSectionName.style.left = '10%'
                            profileSectionName.style.fontSize = '24px'
                            profileSectionName.style.fontWeight = '800'
                            profileSectionName.innerText = element.name

                            let dateSection = document.createElement('text')
                            dateSection.style.width = '100px'
                            dateSection.style.position = 'absolute'
                            dateSection.style.transform = 'translateY(-50%)'
                            dateSection.style.top = '50%'
                            dateSection.style.right = '0%'
                            dateSection.style.fontSize = '10px'
                            dateSection.style.fontWeight = '800'
                            dateSection.innerText = element.createdAt

                            profileSection.appendChild(dateSection)
                            profileSection.appendChild(profileSectionName)

                            let mainSectionBox = document.createElement('div')
                            mainSectionBox.style.width = '90%'
                            mainSectionBox.style.height = '60%'
                            mainSectionBox.style.backgroundColor = 'white'
                            mainSectionBox.style.position = 'absolute'
                            mainSectionBox.style.left = '50%'
                            mainSectionBox.style.transform = 'translateX(-50%)'
                            mainSectionBox.style.top = '20%'
                            mainSectionBox.style.display = 'flex'
                            mainSectionBox.style.alignItems = 'center'
                            mainSectionBox.style.justifyContent = 'center'
                            mainSectionBox.style.fontWeight = '800'
                            mainSectionBox.style.fontSize = '24px'
                            mainSectionBox.innerText = element.content

                            let interactionSection = document.createElement('div')
                            interactionSection.style.width = '90%'
                            interactionSection.style.height = '70px'
                            interactionSection.style.backgroundColor = 'white'
                            interactionSection.style.position = 'absolute'
                            interactionSection.style.left = '50%'
                            interactionSection.style.transform = 'translateX(-50%)'
                            interactionSection.style.bottom = '5%'
                            interactionSection.style.borderRadius = '15px'
                            interactionSection.style.display = 'flex'
                            interactionSection.style.alignItems = 'center'
                            interactionSection.style.justifyContent = 'space-around '

                            {
                                let like = document.createElement('div')
                                like.style.width = '70px'
                                like.style.height = '50px'
                                like.style.backgroundColor = 'lightgrey'
                                like.innerText = 'Like'
                                like.style.display = 'flex'
                                like.style.alignItems = 'center'
                                like.style.justifyContent = 'center'
                                like.style.cursor = 'pointer'
                                like.style.borderRadius = '15px'
                                like.style.fontWeight = '800'
                                like.classList.add('likeRes')

                                like.addEventListener('click', (e) => {
                                    e.preventDefault()
                                    let para1 = element._id
                                    let para2 = element.name

                                    let url = `https://notesifytalamobackend.onrender.com/postRoutes/${para1}/${para2}`

                                    let sendFetch = async () => {
                                        try {
                                            let res = await fetch(url, {
                                                method: 'PATCH',
                                                headers: {
                                                    "content-type": 'application/json'
                                                }
                                            })

                                            if (!res.ok) throw new Error('error')
                                            let data = await res.json()
                                            console.log(data)

                                        } catch (error) {
                                            console.warn()
                                        }
                                    }
                                    sendFetch()
                                    renderPostBox()
                                })

                                //LOGIC FOR COMMENT SECTION AREA
                                let comment = document.createElement('div')
                                comment.style.width = '70px'
                                comment.style.height = '50px'
                                comment.style.backgroundColor = 'lightgrey'
                                comment.innerText = 'Comments'
                                comment.style.display = 'flex'
                                comment.style.alignItems = 'center'
                                comment.style.justifyContent = 'center'
                                comment.style.cursor = 'pointer'
                                comment.style.borderRadius = '15px'
                                comment.style.fontSize = '12px'
                                comment.style.fontWeight = '800'
                                comment.classList.add('likeRes')

                                //Ito yung logic for the comment ituloy mo nalang
                                comment.addEventListener('click', () => {

                                    // console.log(`Post ni ${element.name} at ${element._id}, nag comment si ${userInfo.success.username}`)

                                    e.preventDefault()
                                    let mainTemplate = document.querySelector('#main-template')

                                    let commentTemplate = document.createElement('div');
                                    commentTemplate.id = 'commentTemplate';
                                    commentTemplate.style.width = '100vw';
                                    commentTemplate.style.height = '100vh';
                                    commentTemplate.style.backgroundColor = 'green';
                                    commentTemplate.style.position = 'absolute';
                                    commentTemplate.style.background = 'rgba(255, 255, 255, 0.1)';
                                    commentTemplate.style.backdropFilter = 'blur(6px)';
                                    commentTemplate.style.display = 'flex'
                                    commentTemplate.style.alignItems = 'center'
                                    commentTemplate.style.justifyContent = 'center'

                                    commentTemplate.addEventListener('click', (e) => {
                                        mainTemplate.childNodes.forEach(element => {
                                            if (element.id === 'commentTemplate') {
                                                mainTemplate.removeChild(element)
                                            }
                                        })
                                    });

                                    let inputBoxPost = document.createElement('div')
                                    // inputBoxPost.style.position='absolute'
                                    
                                    inputBoxPost.style.height = '500px'
                                    inputBoxPost.style.backgroundColor = 'white'
                                    inputBoxPost.style.borderRadius = '20px'
                                    inputBoxPost.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.2)';
                                    inputBoxPost.style.display = 'flex'
                                    inputBoxPost.style.alignItems = 'center'
                                    inputBoxPost.style.justifyContent = 'center'
                                    inputBoxPost.style.flexDirection = 'column'
                                    inputBoxPost.style.position = 'relative'
                                    inputBoxPost.style.top='-12%'
                                    inputBoxPost.style.overflow = 'hidden'
                                    inputBoxPost.id = 'commentBoxRes'
                                    inputBoxPost.addEventListener('click', (e) => {
                                        e.stopPropagation()
                                    })

                                    let commentSecTopText = document.createElement('text')
                                    commentSecTopText.style.fontSize = '15px'
                                    commentSecTopText.style.position = 'absolute'
                                    commentSecTopText.style.left = '50%'
                                    commentSecTopText.style.transform = 'translateX(-50%)'
                                    commentSecTopText.style.top = '3%'
                                    commentSecTopText.style.fontWeight = '800'
                                    commentSecTopText.innerText = 'COMMENTS'

                                    //Dito malalagay yung comments
                                    let commentsArea = document.createElement('div')
                                    commentsArea.id = 'commentsArea'
                                    commentsArea.style.position = 'absolute'
                                    commentsArea.style.width = '100%'
                                    commentsArea.style.height = '400px'
                                    // commentsArea.style.backgroundColor = 'red'
                                    commentsArea.style.top = '10%'
                                    commentsArea.style.display = 'flex'
                                    commentsArea.style.alignItems = 'center'
                                    commentsArea.style.justifyContent = 'flex-start'
                                    commentsArea.style.flexDirection = 'column'
                                    commentsArea.style.overflowY = 'scroll'
                                    commentsArea.style.paddingTop = 'auto'
                                    // commentsArea.style.paddingTop = '100px'
                                    // commentsArea.style.paddngBottom = '5%'


                                    let formCommmentSec = document.createElement('form')
                                    formCommmentSec.style.width = '100%'
                                    formCommmentSec.style.height = '50px'
                                    formCommmentSec.style.position = 'absolute'
                                    formCommmentSec.style.bottom = '0%'
                                    // formCommmentSec.style.backgroundColor = 'green'
                                    formCommmentSec.style.display = 'flex'
                                    formCommmentSec.style.alignItems = 'center'
                                    formCommmentSec.style.justifyContent = 'space-around'


                                    {
                                        let commentsInput = document.createElement('input')
                                        commentsInput.style.width = '90%'
                                        commentsInput.style.height = '30px'
                                        commentsInput.style.position = 'relative'
                                        commentsInput.id = 'commentsInput'

                                        let commentsInputOk = document.createElement('button')
                                        commentsInputOk.type = 'submit'
                                        commentsInputOk.style.width = '50px'
                                        commentsInputOk.style.height = '30px'
                                        commentsInputOk.style.backgroundColor = 'lightblue'
                                        commentsInputOk.style.border = '1px solid black'
                                        commentsInputOk.style.borderRadius = '5px'
                                        commentsInputOk.style.cursor = 'pointer'

                                        commentsInputOk.addEventListener('click', (e) => {
                                            e.preventDefault()

                                            let url = `https://notesifytalamobackend.onrender.com/comments/add/${element._id}`

                                            commentApiStructure = {// dito ilalagay yung request
                                                "commenter": `${userInfo.success.username}`,
                                                "comment": `${commentsInput.value}`
                                            }

                                            let commentApiReqFetch = async () => {
                                                try {
                                                    let req = await fetch(url, {
                                                        method: "POST",
                                                        headers: {
                                                            "content-type": "application/json",
                                                        },
                                                        body: JSON.stringify(commentApiStructure)
                                                    })
                                                    let res = req.json()
                                                    // console.log(res)
                                                } catch (error) {
                                                    console.warn
                                                }
                                            }

                                            commentApiReqFetch()
                                            // console.log(commentApiStructure)
                                            // console.log(url)
                                            commentsInput.value = ''

                                        })

                                        let requestComments = async (id, date) => {
                                            let urlApiGetComment = `https://notesifytalamobackend.onrender.com/comments/check/${id}`
                                            try {
                                                let req = await fetch(urlApiGetComment, {
                                                    method: "GET",
                                                    headers: {
                                                        "content-type": "application/json"
                                                    }
                                                })
                                                if (!req.ok) throw new Error('Invalid')
                                                let res = await req.json()

                                                let commentsArea = document.querySelector('#commentsArea')
                                                commentsArea.innerHTML = ''

                                                res.forEach(element => {
                                                    let box = document.createElement('div')
                                                    box.style.width = '95%'
                                                    box.style.backgroundColor = '#F0F2F5'
                                                    box.style.minHeight = '50px'; // Use minHeight to ensure a flexible height
                                                    box.style.position = 'relative'
                                                    box.style.flexShrink = '0'
                                                    box.style.display = 'flex'
                                                    box.style.alignItems = 'space-between'
                                                    box.style.justifyContent = 'center'
                                                    box.style.borderRadius = '15px'
                                                    box.style.marginTop = '15px'
                                                    box.style.marginBottom = '15px'
                                                    box.id = 'boxRes'

                                                    let nameArea = document.createElement('p')
                                                    // nameArea.style.backgroundColor='pink'
                                                    nameArea.innerText = `${element.commenter}`
                                                    nameArea.style.width = '15%'
                                                    nameArea.style.height = '100%'
                                                    nameArea.style.textAlign = 'center'
                                                    nameArea.style.margin = '0'
                                                    nameArea.style.display='flex'
                                                    nameArea.style.alignItems='center'
                                                    nameArea.style.justifyContent='center'

                                                    let text = document.createElement('p')
                                                    // text.style.backgroundColor='blue'
                                                    text.style.width = '70%'
                                                    text.style.height = '100%'
                                                    text.style.textAlign = 'center'
                                                    text.style.fontSize = '12px'
                                                    text.innerText = `${element.comment}`
                                                    text.style.margin = '0'

                                                    let dateTime = document.createElement('p')
                                                    // dateTime.style.backgroundColor='yellow'
                                                    dateTime.style.width = '15%'
                                                    dateTime.style.height = '100%'
                                                    dateTime.style.textAlign = 'center'
                                                    dateTime.style.fontSize = '12px'
                                                    dateTime.innerText = `${element.date.split('T')[0]}`
                                                    dateTime.style.margin = '0'
                                                    dateTime.style.display='flex'
                                                    dateTime.style.alignItems='center'
                                                    dateTime.style.justifyContent='center'

                                                    box.appendChild(nameArea)
                                                    box.appendChild(text)
                                                    box.appendChild(dateTime)

                                                    commentsArea.appendChild(box)
                                                })

                                                console.log(res)
                                            } catch (error) {
                                                console.warn(error)
                                            }

                                        }

                                        console.log(element._id)


                                        if (mainTemplate.innerHTML !== '') {
                                            intervalId = setInterval(() => {

                                                requestComments(element._id, element.date);

                                                // Check if commentTemplate exists in mainTemplate
                                                let commentTemplate = mainTemplate.querySelector('#commentTemplate');
                                                if (!commentTemplate) {
                                                    clearInterval(intervalId);
                                                }
                                            }, 1000);
                                        }


                                        formCommmentSec.appendChild(commentsInput)
                                        formCommmentSec.appendChild(commentsInputOk)

                                    }

                                    inputBoxPost.appendChild(commentSecTopText)
                                    inputBoxPost.appendChild(commentsArea)
                                    inputBoxPost.appendChild(formCommmentSec)


                                    commentTemplate.appendChild(inputBoxPost)
                                    mainTemplate.appendChild(commentTemplate)
                                })


                                let likeCount = document.createElement('text')
                                likeCount.classList.add('likeCountRes')
                                likeCount.innerText = `${element.likes} People liked this Post`

                                interactionSection.appendChild(like)
                                interactionSection.appendChild(comment)
                                interactionSection.appendChild(likeCount)
                            }

                            postBox.appendChild(profileSection)
                            postBox.appendChild(mainSectionBox)
                            postBox.appendChild(interactionSection)

                            innerContainer.appendChild(postBox)

                        })
                    }

                    renderPostBox()
                    templateHome.appendChild(container)
                }


                mainTemplate.appendChild(templateHome)

            })

        }

        {//REGISTERED USER
            let registerUser = document.querySelector('#registerUser')
            registerUser.addEventListener('click', async (e) => {
                e.preventDefault()

                let mainTemplate = document.getElementById('main-template')


                if (mainTemplate.childElementCount !== 0) {

                    mainTemplate.innerHTML = ''
                }

                let templateRegUser = document.createElement('div')
                templateRegUser.id = 'registerUserDashboard'
                templateRegUser.classList.add('btn-main-template')

                {
                    let text = document.createElement('text')
                    text.innerText = 'Registered Users'
                    text.classList.add('reg-users-text')
                    text.id = 'regUserRes'
                    templateRegUser.appendChild(text)
                }

                {//Ito yung template sa loob
                    let container = document.createElement('div') //Ito yung container sa loob
                    container.id = 'regUser-container'

                    let topArea = document.createElement('div') // ito yung taas ng container design
                    topArea.id = 'top-area'
                    { // mga text lang to sa loob ng topArea
                        let text1 = document.createElement('text')
                        text1.classList.add('top-area-text')
                        text1.innerText = 'Name'

                        let text2 = document.createElement('text')
                        text2.classList.add('top-area-text')
                        text2.innerText = 'Date Created'

                        let text3 = document.createElement('text')
                        text3.classList.add('top-area-text')
                        text3.innerText = 'Curerent Status'

                        let text4 = document.createElement('text')
                        text4.classList.add('top-area-text')
                        text4.innerText = 'Message'

                        topArea.appendChild(text1)
                        topArea.appendChild(text2)
                        topArea.appendChild(text3)
                        topArea.appendChild(text4)
                    }

                    let mainArea = document.createElement('div') // ito yung main body kung san nakalagay yung mga user
                    mainArea.id = 'main-area'
                    {

                        let fetchAllUser = async () => {
                            let url = 'https://notesifytalamobackend.onrender.com/api/all'
                            try {
                                let res = await fetch(url)
                                if (!res.ok) throw new error('Error with fetch line 135 dashboard.js')
                                let data = await res.json()
                                return data
                            } catch (error) {
                                console.log(error.message)
                            }
                        }
                        let data = await fetchAllUser()
                        // console.log(data)

                        data.forEach((element) => {
                            let box = document.createElement('div')
                            box.classList.add('box-regUser')

                            let boxInisde1 = document.createElement('div')
                            boxInisde1.classList.add('box-regUser-inside')
                            boxInisde1.innerText = element.username

                            let boxInisde2 = document.createElement('div')
                            boxInisde2.classList.add('box-regUser-inside')
                            boxInisde2.innerText = element.createdAt.split('T')[0]

                            let boxInisde3 = document.createElement('div')
                            boxInisde3.classList.add('box-regUser-inside')
                            if (element.status === 'online') {
                                boxInisde3.style.color = 'green'
                                boxInisde3.style.fontWeight = '800'
                            } else {
                                boxInisde3.style.color = 'red'
                            }
                            boxInisde3.innerText = element.status


                            let boxInisde4 = document.createElement('div')
                            boxInisde4.classList.add('box-regUser-inside')
                            boxInisde4.style.width = '15%'
                            // boxInisde4.style.backgroundColor = 'red'
                            boxInisde4.style.position = 'relative'
                            boxInisde4.style.display = 'flex'
                            boxInisde4.style.alignItems = 'center'
                            boxInisde4.style.justifyContent = 'center'

                            {

                                if (element.username !== userInfo.success.username) {
                                    let boxInisdeBox4 = document.createElement('img')
                                    boxInisdeBox4.style.width = '35px'
                                    boxInisdeBox4.style.height = '35px'
                                    boxInisdeBox4.style.padding = '3%'
                                    boxInisdeBox4.style.borderRadius = '15px'
                                    boxInisdeBox4.style.cursor = 'pointer'
                                    boxInisdeBox4.style.backgroundColor = '#FF8901'
                                    boxInisdeBox4.src = './userInfo/img/messageAsset.png'

                                    boxInisdeBox4.addEventListener('click', (e) => {
                                        e.preventDefault()

                                        console.log('i got clicked, dito dapat nakalagay yung message')
                                    })

                                    boxInisde4.appendChild(boxInisdeBox4)
                                }

                            }


                            box.appendChild(boxInisde1)
                            box.appendChild(boxInisde2)
                            box.appendChild(boxInisde3)
                            box.appendChild(boxInisde4)


                            mainArea.appendChild(box)
                        })



                    }

                    container.appendChild(topArea)
                    container.appendChild(mainArea)

                    templateRegUser.appendChild(container)
                }






                mainTemplate.appendChild(templateRegUser)
            })
        }

        {//INFO
            let info = document.querySelector('#info')
            info.addEventListener('click', (e) => {
                e.preventDefault()

                let mainTemplate = document.getElementById('main-template')


                if (mainTemplate.childElementCount !== 0) {

                    mainTemplate.innerHTML = ''
                }
                //ITO yung sa template nung info!
                let templateInfo = document.createElement('div')
                templateInfo.id = 'infoDashboard'
                templateInfo.classList.add('btn-main-template')

                //Ito yung code para sa name dun sa pinakataas
                {
                    let customer = document.createElement('div')
                    customer.classList.add('customerText')
                    customer.innerText = 'User / '

                    let customerText = document.createElement('div')
                    customerText.innerText = userInfo.success.username
                    customerText.classList.add('customerTextName')
                    customerText.style.display = 'inline'

                    customer.appendChild(customerText)
                    templateInfo.appendChild(customer)
                }

                // ito yung container nung 3 box
                {
                    let boxContainer = document.createElement('div')
                    boxContainer.style.flexShrink = '0'
                    boxContainer.style.width = '100%'
                    boxContainer.style.height = '30%'
                    boxContainer.style.display = 'flex'
                    boxContainer.style.alignItems = 'center'
                    boxContainer.style.justifyContent = 'space-around'
                    boxContainer.style.backgroundColor = 'lightgrey'

                    // para sa date created area ko
                    let box1 = document.createElement('div')
                    box1.classList.add('box')
                    let text1 = document.createElement('text')
                    text1.innerHTML = 'Date Created'
                    text1.classList.add('box-text-grey')
                    box1.appendChild(text1)
                    let text1Val = document.createElement('text')
                    text1Val.innerText = userInfo.success.createdAt.split('T')[0]
                    text1Val.classList.add('box-text-value')
                    box1.appendChild(text1Val)



                    let box2 = document.createElement('div')
                    box2.classList.add('box')

                    let box3 = document.createElement('div')
                    box3.classList.add('box')

                    boxContainer.appendChild(box1)
                    boxContainer.appendChild(box2)
                    boxContainer.appendChild(box3)

                    templateInfo.appendChild(boxContainer)
                }

                {//Ito yung template sa loob
                    let container = document.createElement('div')
                    container.id = 'info-container'
                    container.style.display = 'flex'
                    container.style.alignItems = 'center'
                    container.style.justifyContent = 'center'
                    container.style.overflowY = 'auto'
                    container.style.width = '100%'

                    let innerContainer = document.createElement('div')
                    innerContainer.style.display = 'flex'
                    innerContainer.style.flexDirection = 'column-reverse'
                    innerContainer.style.alignItems = 'center'
                    innerContainer.style.justifyContent = 'flex-end'
                    // innerContainer.style.gap = '1rem'
                    innerContainer.style.flexGrow = '1'
                    innerContainer.style.overflowY = 'auto'
                    innerContainer.style.width = '100%'
                    innerContainer.style.marginTop = 'auto'


                    container.appendChild(innerContainer)


                    let fetchAllPost = async () => {
                        let url = `https://notesifytalamobackend.onrender.com/postRoutes/${userInfo.success.username}`

                        try {
                            let res = await fetch(url, {
                                method: "PUT",
                                headers: {
                                    "content-type": "applicaiton/json"
                                }
                            }
                            )
                            if (!res.ok) throw new error(error.message)

                            let data = await res.json()
                            return data.success
                        } catch (error) {
                            console.log(error.message)
                        }
                    }

                    let renderPostBox = async () => {
                        let postInfos = await fetchAllPost()

                        postInfos.forEach(element => {
                            let postBox = document.createElement('div')
                            postBox.style.height = '550px'
                            postBox.style.width = '550px'
                            postBox.style.backgroundColor = '#F0F2F5'
                            // postBox.style.flexShrink = '0'
                            postBox.style.borderRadius = '15px'
                            postBox.style.position = 'relative'
                            postBox.style.marginTop = '50px'
                            postBox.style.marginBottom = '50px'
                            postBox.classList.add('infoBoxesRes')

                            let profileSection = document.createElement('div')
                            profileSection.style.width = '90%'
                            profileSection.style.height = '80px'
                            profileSection.style.position = 'absolute'
                            profileSection.style.top = '4%'
                            profileSection.style.backgroundColor = 'white'
                            profileSection.style.left = '50%'
                            profileSection.style.transform = 'translateX(-50%)'

                            // let profileSectionCircle = document.createElement('div')
                            // profileSectionCircle.style.height = '70px'
                            // profileSectionCircle.style.width = '70px'
                            // profileSectionCircle.style.position = 'absolute'
                            // profileSectionCircle.style.top = '50%'
                            // profileSectionCircle.style.backgroundColor = 'green'
                            // profileSectionCircle.style.transform = 'translateY(-50%)'
                            // profileSectionCircle.style.borderRadius = '50%'
                            // profileSectionCircle.style.left = '3%'
                            // profileSectionCircle.classList.add('profileSectionCircleRes')

                            let profileSectionName = document.createElement('text')
                            profileSectionName.style.width = '150px'
                            profileSectionName.style.width = '40pz'
                            profileSectionName.style.position = 'absolute'
                            profileSectionName.style.transform = 'translateY(-50%)'
                            profileSectionName.style.top = '50%'
                            profileSectionName.style.left = '10%'
                            profileSectionName.style.fontSize = '24px'
                            profileSectionName.style.fontWeight = '800'
                            profileSectionName.innerText = element.name

                            let dateSection = document.createElement('text')
                            dateSection.style.width = '100px'
                            dateSection.style.height = '80px'
                            dateSection.style.position = 'absolute'
                            dateSection.style.transform = 'translateY(-50%)'
                            dateSection.style.top = '50%'
                            dateSection.style.right = '0%'
                            dateSection.style.fontSize = '15px'
                            dateSection.style.fontWeight = '200'
                            dateSection.innerText = element.createdAt.split('T')[0]
                            dateSection.style.display = 'flex'
                            dateSection.style.alignItems = 'center'
                            dateSection.style.justifyContent = 'center'
                            dateSection.classList.add('dateSectionRes')

                            profileSection.appendChild(dateSection)
                            profileSection.appendChild(profileSectionName)
                            // profileSection.appendChild(profileSectionCircle)



                            let mainSectionBox = document.createElement('div')
                            mainSectionBox.style.width = '90%'
                            mainSectionBox.style.height = '60%'
                            mainSectionBox.style.backgroundColor = 'white'
                            mainSectionBox.style.position = 'absolute'
                            mainSectionBox.style.left = '50%'
                            mainSectionBox.style.transform = 'translateX(-50%)'
                            mainSectionBox.style.top = '20%'
                            mainSectionBox.style.display = 'flex'
                            mainSectionBox.style.alignItems = 'center'
                            mainSectionBox.style.justifyContent = 'center'
                            mainSectionBox.style.fontWeight = '800'
                            mainSectionBox.style.fontSize = '20px'
                            mainSectionBox.innerText = element.content

                            let interactionSection = document.createElement('div')
                            interactionSection.style.width = '90%'
                            interactionSection.style.height = '70px'
                            interactionSection.style.backgroundColor = 'white'
                            interactionSection.style.position = 'absolute'
                            interactionSection.style.left = '50%'
                            interactionSection.style.transform = 'translateX(-50%)'
                            interactionSection.style.bottom = '5%'
                            interactionSection.style.borderRadius = '15px'
                            interactionSection.style.display = 'flex'
                            interactionSection.style.alignItems = 'center'
                            interactionSection.style.justifyContent = 'center'

                            postBox.appendChild(profileSection)
                            postBox.appendChild(mainSectionBox)
                            postBox.appendChild(interactionSection)

                            innerContainer.appendChild(postBox)
                        })
                    }

                    renderPostBox()

                    templateInfo.appendChild(container)
                }

                //wag buburahin to, ito nagkakabit ng lahat ng code dun sa main template
                mainTemplate.appendChild(templateInfo)

            })

        }


    }

}



let registerForm = document.querySelector('#registerForm')
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let username = document.getElementById('usernameRegister').value
    let password = document.getElementById('passwordRegister').value
    let confirmPassword = document.getElementById('cPasswordRegister').value
    if (password !== confirmPassword) {
        alert("Password is not the same")
        document.getElementById('passwordRegister').value = ''
        document.getElementById('cPasswordRegister').value = ''
        return
    }

    let fetchRegister = async () => {
        let URL = "https://notesifytalamobackend.onrender.com/api/register"

        let obj = {
            "user": username,
            "pass": password
        }

        let req = new Request(URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj)

        })

        try {
            let res = await fetch(req)

            if (!res.ok) {
                let errorData = await res.json()
                throw new Error(errorData.error)
            }

            registerToLoginFormTransition()


        } catch (error) {
            alert(error.message)
        }
    }

    fetchRegister()


})

let loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let username = document.getElementById('usernameLogin').value;
    let password = document.getElementById('passwordLogin').value;

    let obj = {
        user: username,
        pass: password
    }

    let fetchLogin = async () => {
        let URL = "https://notesifytalamobackend.onrender.com/api/login"

        let req = new Request(URL, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj),
            credentials: 'include' // This is important to include cookies
        })

        try {
            let res = await fetch(req)

            if (!res.ok) {
                let errorData = await res.json()
                throw new Error(errorData.error)
            }

            let data = await res.json()
            console.log(data.success)

            localStorage.setItem('cookieId', data.success)

            setTimeout(() => {
                mainPage()
            }, 3000);

        } catch (error) {
            alert(error.message)
        }
    }

    fetchLogin()
})