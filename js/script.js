'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('Link was clicked', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('znaleziony artykul', targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');

}









const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '4',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.list.authors';



  function generateTitleLinks(customSelector = ''){
  console.log('Funkcja generateTitleLinks zostala wykonana');
  console.log('customSelector: ', customSelector);
    
  /* remove contents of titleList */
  
  const titleList = document.querySelector(optTitleListSelector);  
  
  function clearMessages(){
    titleList.innerHTML = '';
  }
  clearMessages();
  

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('optArticleSelector + customSelector: ', optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
  /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element */
    const titleElement = article.querySelector(optTitleSelector);

    /* get the title from the title element */

    const articleTitle = titleElement.innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */

    html = html + linkHTML;

    console.log('licznik', html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();


function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999,
  }
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  console.log('params', params);
  return params;
}

function calculateTagClass(count, params){
  const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * optCloudClassCount + 1 );
  return optCloudClassPrefix + classNumber;
}


function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ' + articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('atricle Tags Array: ', articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      console.log(tag);
      /* generate HTML of the link */
      const linkTag = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      console.log('linkTag: ', linkTag);
      /* add generated code to html variable */
      html = html + linkTag;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('tags Wrapper:', tagsWrapper);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);


  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags */
  for (let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '"><span>' + tag + '</span></a></li>' + ' (' + allTags[tag] + ') ';
    console.log('allTagsHTML', allTagsHTML);
  }
  /* [NEW] END LOOP: for each tag in allTags; */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}
generateTags();



function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  console.log(event);
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('clicked href attribute', href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log('tag: ' + tag);
  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('.list-horizontal a.active[href^="#tag-"]');
  console.log('all tag links with class active: ', activeTags);
  /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){
      /* remove class active */
      activeTag.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
      console.log('links activated:', tagLink.classList.add('active'));
    /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.list-horizontal a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();




function generateAuthors(){
    /* [NEW] create a new variable allTags with an empty object */
    let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    /* make html variable with empty string */
    let html = '';
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* generate HTML of the link */
    const linkAuthor = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    console.log('linkAuthor: ', linkAuthor);
    /* add generated code to html variable */
    html = html + linkAuthor;
    /* insert HTML of the author into the author wrapper */
    authorWrapper.innerHTML = html;
          /* [NEW] check if this link is NOT already in allAuthors */
          if(!allAuthors.hasOwnProperty(articleAuthor)){
            /* [NEW] add tag to allTags object */
            allAuthors[articleAuthor] = 1;
          } else {
            allAuthors[articleAuthor]++;
          }
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all authors HTML code */
  let allAuthorsHTML = '';
  /* [NEW] START LOOP: for each author in allAuthors */
  for (let author in allAuthors){
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsHTML += '<li><a href="#author-' + author + '" class="">' + author + '</a> (' + allAuthors[author] + ')</li>';
  /* [NEW] END LOOP: for each author in allAuthors */
  }
  /* [NEW] add html from allAuthorsHTML to authorsList */
  authorsList.innerHTML = allAuthorsHTML;
}

generateAuthors();



function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log('author:', author);
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('.post-author a.active[href^="#author-"]');
  console.log('activeAuthors: ', activeAuthors);
  /* START LOOP: for each active tag link */
  for(let activeAuthor of activeAuthors){
    /* remove class active */
    activeAuthor.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
    console.log(authorLink);
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('.post-author a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let authorLink of authorLinks){
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();