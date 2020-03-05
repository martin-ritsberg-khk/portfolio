window.addEventListener('load', () => {
    const navBtns = document.querySelectorAll('.main-nav-btn[data-section]');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebarToggle = document.querySelector('#sidebar-toggle-btn');
    let urlParams = new URLSearchParams(window.location.search);
    let initPage = urlParams.get('page') || '';

    console.log(sidebarToggle)
    
    function navBtnClick(navBtn, skipHistory){
        if(navBtn.classList.contains('timeout') || navBtn.classList.contains('active')){
            return
        }

        contentSections.forEach(section => {
            section.classList.add('hidden');
        })
        navBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('timeout');
        })
        navBtn.classList.add('active');
        
        let sectionName = navBtn.dataset.section;
        setTimeout(()=>{
            document.querySelector('#'+sectionName).classList.remove('hidden');
            navBtns.forEach(btn => {
                btn.classList.remove('timeout');
            })
            if(!skipHistory){
                window.history.pushState('', 'Portfolio - Martin Ritsberg', window.location.origin + window.location.pathname + '?page=' + sectionName);
            }
        }, 1000)
    }

    function sidebarToggleClick(){
        if(sidebarToggle.classList.contains('collapsed')){
            sidebarToggle.classList.remove('collapsed');
            document.querySelector('#sidebar').classList.remove('collapsed');
        } else {
            sidebarToggle.classList.add('collapsed');
            document.querySelector('#sidebar').classList.add('collapsed');
        }
    }

    navBtns.forEach(navBtn => {
        navBtn.addEventListener('click', event => {
            event.preventDefault();
            navBtnClick(navBtn);
        })
        if((navBtn.dataset.section == initPage && !navBtn.classList.contains('active')) || (navBtn.dataset.section == 'about' && initPage == '')){
            navBtnClick(navBtn, true);
        }
    })

    window.addEventListener('popstate', ()=>{
        urlParams = new URLSearchParams(window.location.search);
        initPage = urlParams.get('page') || '';
        navBtns.forEach(navBtn => {
            if((navBtn.dataset.section == initPage && !navBtn.classList.contains('active')) || (navBtn.dataset.section == 'about' && initPage == '')){
                navBtnClick(navBtn, true);
            }
        })
    })

    sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        console.log('tere')
        sidebarToggleClick();
    })
    
    document.querySelector('body').classList.remove('preload');
})