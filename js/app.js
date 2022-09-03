const loadNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
    catch (e) {
        console.log(e);
    }
}

const displayNews = (news) => {
    diplayNewsLength(news);
    toggleSpinner(true);
    // console.log(news);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    // display no news found 
    const noNews = document.getElementById('no-found-news');
    if (news.length === 0) {
        noNews.classList.remove('d-none');
    } else {
        noNews.classList.add('d-none')
    }
    const array = news;
    const array1 = array.sort((a, b) => b.total_view - a.total_view);
    // console.log(array1)
    news.forEach(newsPortal => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div onclick="loadNewsDetails('${newsPortal._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"
         class="card mb-3">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${newsPortal.thumbnail_url}" class="img-fluid h-100 w-100 rounded-start"
                        alt="...">
                </div>
                <div class="col-md-9 d-flex justify-content-center">
                    <div class="card-body lh-1">
                        <h5 class="card-title fw-bold fs-4">${newsPortal.title}</h5>
                        <p class="card-text text-muted">${newsPortal.details.length >= 100 ? newsPortal.details.slice(0, 500) + '...' : 'no data'}</p>
                        <div class="d-flex align-items-center justify-content-between margin-top">
                            <div class="d-flex align-items-center">
                                <div>
                                    <img style='width: 50px; border-radius:50px; height: 50px;' 
                                    src="${newsPortal.author.img}" alt="">
                                </div>
                                <h5 class="fs-6 mx-2">${newsPortal.author.name ? newsPortal.author.name : 'No Author Name'}<br>
                                    <small class="text-muted">${newsPortal.author.published_date}</small>
                                </h5>
                            </div>
                        <div>
                                <span><i class="fa-solid fa-eye"></i> ${newsPortal.total_view} Views</span>
                            </div>
                            <div class='d-none d-md-inline-block'>
                                <i class="fa-solid text-warning fa-star"></i>
                                <i class="fa-solid text-warning fa-star"></i>
                                <i class="fa-solid text-warning fa-star"></i>
                                <i class="fa-solid text-warning fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <div class="icon d-none d-md-inline-block">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    });
    // stop spinner loader 
    toggleSpinner(false)
}

const diplayNewsLength = (news) => {
    const newsLength = news.length;
    const length = document.getElementById('news-length');
    length.innerText = newsLength;
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}

const loadNewsDetails = async (NewsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${NewsId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (e) {
        console.log(e);
    }
}
const displayNewsDetails = (newsDetails) => {
    // console.log(newsDetails);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = newsDetails.title;
    const phoneDetails = document.getElementById('news-details');
    phoneDetails.innerHTML = `
    <div>
    <img style='width: 50px; border-radius:50px; height: 50px;' 
    src="${newsDetails.author.img}" alt="">
    </div>
    <h5 class="fs-6 mx-2">${newsDetails.author.name ? newsDetails.author.name : 'No Author Name'}<br>
    <small class="text-muted">${newsDetails.author.published_date}</small>
    </h5>
    <div>
    <span><i class="fa-solid fa-eye"></i> ${newsDetails.total_view ? newsDetails.total_view : 'No '} Views</span>
    </div>
    <p class="card-text text-muted">${newsDetails.details}</p>
    `;

}
