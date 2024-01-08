document.addEventListener('DOMContentLoaded', function() {
  const confirmButtons = document.querySelectorAll('.confirm');
  const purchases = {}; 

  confirmButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const product = button.closest('.product');
      const productName = product.querySelector('.name').textContent;
      const productSize = product.querySelector('.size').textContent;
      const productPrice = parseFloat(product.querySelector('.price').textContent.replace('S/', '').trim()); 
      const quantity = parseInt(product.querySelector('.quantity-text').textContent);
      const totalPrice = productPrice * quantity; 

      
      const personName = prompt('Por favor, introduce tu nombre:');

      
      if (purchases[personName]) {
        
        purchases[personName].push({ productName, productSize, productPrice, totalPrice, quantity });
      } else {
        
        purchases[personName] = [{ productName, productSize, productPrice, totalPrice, quantity }];
      }

      
      const message = `Has agregado a Deuda De: ${productName}, ${productSize}, Precio total: S/${totalPrice.toFixed(2)}, Cantidad: ${quantity}, Comprado por: ${personName}`;
      alert(message);

      
      updateContainer();
    });
  });

  function updateContainer() {
    const container = document.getElementById('container');
    container.innerHTML = ''; 

    
    for (const personName in purchases) {
      const personPurchases = purchases[personName];
      const personInfo = document.createElement('div');
      const personNameSpan = document.createElement('span');
      personNameSpan.classList.add('personName');
      personNameSpan.style.fontWeight = 'bold'; 
      personNameSpan.textContent = personName + ":"; 
      personInfo.appendChild(personNameSpan); 

      
      personPurchases.forEach(purchase => {
        const purchaseInfo = document.createElement('div');
        purchaseInfo.textContent = `• x${purchase.quantity} ${purchase.productName} ${purchase.productSize} Total = S/${purchase.totalPrice.toFixed(2)}`;
        personInfo.appendChild(purchaseInfo);
      });

      
      const totalPurchasePrice = personPurchases.reduce((total, purchase) => total + purchase.totalPrice, 0);
      const totalInfo = document.createElement('div');
      totalInfo.textContent = `Monto Total a Deber = S/${totalPurchasePrice.toFixed(2)}`;
      personInfo.appendChild(totalInfo);

      container.appendChild(personInfo);

      const payButton = document.createElement('button');
      payButton.textContent = '❌ Borrar Deuda';
      payButton.classList.add('btn')
      payButton.addEventListener('click', function() {
        // Eliminar la deuda de la persona
        delete purchases[personName];
        // Actualizar la visualización
        updateContainer();
      });
      personInfo.appendChild(payButton);

      container.appendChild(personInfo);

    }
  }

  const decreaseButtons = document.querySelectorAll('.decrease');
  const increaseButtons = document.querySelectorAll('.increase');
  const quantityTexts = document.querySelectorAll('.quantity-text');

  decreaseButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
      let currentValue = parseInt(quantityTexts[index].textContent);
      if (currentValue > 0) {
        quantityTexts[index].textContent = currentValue - 1;
      }
    });
  });

  increaseButtons.forEach(function(button, index) {
    button.addEventListener('click', function() {
      let currentValue = parseInt(quantityTexts[index].textContent);
      quantityTexts[index].textContent = currentValue + 1;
    });
  });
});

