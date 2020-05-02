//этот массив ассоциативный
var books = {};

// аналог window onload
$(document).ready(function(){
    //при нажатии на кнопку добавить, выполняется функция addBookToLibrary
    $('#modal-add-book-ok').on('click', addBookToLibrary);

});

function addBookToLibrary(){
    // serializeArray метод проходится по всей форме и вытягивает информацию со всех элеметов, имеющих name
     var formData = $('form').serializeArray();
     console.log(formData);

     // этот массив не ассоциативный, что бы создать его создаем новый массив, куда записываю ключ-значение
     var newArray = [];
     for (key in formData){
         newArray[formData[key]['name']] = formData[key]['value'];
     }
     console.log(newArray);
     
     //генерируем артикул, так как у нас настоящих нет, то мы генерируем случайно
     var randomArticle = Math.round(Math.random()*100000);
     books[randomArticle] = newArray;
     console.log(books);
     //закрыть модальное окно после нажатия кнопки add
     $('#modal-add-book').modal('hide');
     //функция для отрисовки книги в браузере
     drawBook(randomArticle);
}

function drawBook(article){
    //создаем часть разметки для вставки обложки книги а браузере
     var div = document.createElement('div');
     div.className = "col-lg-3 book";
     div.setAttribute('data', article);
 
     //создаем обложку
     var cover = document.createElement('div');
     cover.className= "book-cover";
     cover.style.backgroundImage = `url(${books[article]['book-cover']})`;

     // создаю название книги
     var bookName = document.createElement('h4');
     bookName.className = "book-title";
     bookName.innerHTML = books[article]['book-name'];

     // создаю год книги
     var bookYear = document.createElement('p');
     bookYear.className = "book-year";
     bookYear.innerHTML = books[article]['book-year'];

     div.appendChild(cover);
     div.appendChild(bookName);
     div.appendChild(bookYear);

     $('.book-panel').append(div);

}