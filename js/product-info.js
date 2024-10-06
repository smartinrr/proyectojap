function renderStars(score) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
         stars += '<i class="bi bi-star-fill"></i>'; // Estrella llena
        } else {
            stars += '<i class="bi bi-star"></i>'; // Estrella vacía
        }
    }
    return stars;
}

document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del producto guardado en localStorage
    const productId = localStorage.getItem('id');

    if (productId) {
        // Dirección de la API
        const apiUrl = `https://japceibal.github.io/emercado-api/products/${productId}.json`;
        const commentsApiUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

        // Realizar la solicitud a la API para obtener los datos del producto
        fetch(apiUrl)
            .then(response => response.json())
            .then(producto => {
                // Aquí accedemos al producto que está dentro de la propiedad "products" del JSON

                // Actualizar los detalles del producto en la página
                document.getElementById('product-name').textContent = producto.name;
                document.getElementById('category').textContent = `Categoría: ${producto.category}`;
                document.getElementById('description').textContent = `Descripción: ${producto.description}`;
                document.getElementById('sold').textContent = `Vendidos: ${producto.soldCount}`;

                // Actualizar la imagen principal
                const mainImage = document.querySelector('.main-image img');
                mainImage.src = producto.images[0]; // Primera imagen como imagen principal

                // Limpiar cualquier miniatura anterior
                const thumbnailsContainer = document.querySelector('.product-images');
                thumbnailsContainer.innerHTML = ''; // Limpiar las miniaturas previas

                // Generar dinámicamente las miniaturas
                producto.images.forEach((imagen, index) => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagen;
                    imgElement.alt = `Imagen miniatura ${index + 1}`;
                    imgElement.addEventListener('click', () => {
                        // Cambiar la imagen principal al hacer clic en la miniatura
                        mainImage.src = imagen;
                    });
                    thumbnailsContainer.appendChild(imgElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos del producto:', error);
            });
 // Solicitud para obtener los comentarios del producto
        fetch(commentsApiUrl)
            .then(response => response.json())
            .then(comentarios => {
                const commentsContainer = document.getElementById('comments-container');
                commentsContainer.innerHTML = ''; // Limpiar los comentarios previos

                comentarios.forEach(comentario => {
                    const commentElement = document.createElement('div');
                    commentElement.classList.add('comment');
                    
 const starsHtml = renderStars(comentario.score);
                    
                    commentElement.innerHTML = `
                        <p><strong>Usuario:</strong> ${comentario.user}</p>
                        <p><strong>Calificación:</strong> ${starsHtml} </p>
                        <p><strong>Comentario:</strong> ${comentario.description}</p>
                        <p><strong>Fecha:</strong> ${comentario.dateTime}</p>
                    `;

                    commentsContainer.appendChild(commentElement);
                });
            })
            .catch(error => {
                console.error('Error al obtener los comentarios:', error);
            });
    } else {
        console.error('Producto no encontrado en localStorage');
    }

//Solicitud pitar-despintar estrellas
     const stars = document.querySelectorAll(".star");

    stars.forEach(function(star, index) {
        star.addEventListener("click", function() {
            for (let i=0; i<=index; i++) {
                stars[i].classList.add("checked");
            }
            for (let i=index+1; i<stars.length; i++) {
                stars[i].classList.remove("checked");
            }
    })
})

});

