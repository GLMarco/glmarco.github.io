// Seleciona o campo de entrada da pesquisa
var searchInput = document.getElementById("search-input");

// Adiciona um ouvinte de evento ao campo de entrada da pesquisa
searchInput.addEventListener("keyup", function() {
  // Obtém o valor do campo de entrada da pesquisa
  var term = searchInput.value.toLowerCase();
  
  // Seleciona as linhas da tabela que contêm o nome da equipe
  var rows = document.querySelectorAll("#ranking-table tbody tr");
  
  // Loop através de todas as linhas da tabela
  for (var i = 0; i < rows.length; i++) {
    var name = rows[i].querySelector("td:nth-child(2)").textContent.toLowerCase();
    
    // Verifica se o nome da equipe contém o termo de pesquisa
    if (name.indexOf(term) != -1) {
      // Exibe a linha da tabela se o nome da equipe contém o termo de pesquisa
      rows[i].style.display = "";
    } else {
      // Oculta a linha da tabela se o nome da equipe não contém o termo de pesquisa
      rows[i].style.display = "none";
    }
  }
  
  // Se o campo de pesquisa estiver vazio, restaura a tabela original
  if (term == "") {
    // Seleciona todas as linhas da tabela
    var rows = document.querySelectorAll("#ranking-table tbody tr");
    
    // Loop através de todas as linhas da tabela e exibe-as
    for (var i = 0; i < rows.length; i++) {
      rows[i].style.display = "";
    }
  }
});

// Seleciona o cabeçalho da tabela
var tableHeader = document.querySelector("#ranking-table thead tr");

// Adiciona um ouvinte de evento ao cabeçalho da tabela
tableHeader.addEventListener("click", function(event) {
  // Verifica se o clique foi no cabeçalho da tabela
  if (event.target.tagName.toLowerCase() === "th") {
    // Seleciona a coluna a ser ordenada
    var columnIndex = event.target.cellIndex;
    
    // Seleciona as linhas da tabela
    var rows = document.querySelectorAll("#ranking-table tbody tr");
    
    // Converte as linhas da tabela em uma matriz
    var rowsArray = Array.prototype.slice.call(rows, 0);
    
    // Ordena a matriz de acordo com o valor da coluna selecionada
    rowsArray.sort(function(row1, row2) {
      var value1 = row1.querySelectorAll("td")[columnIndex].textContent.toLowerCase();
      var value2 = row2.querySelectorAll("td")[columnIndex].textContent.toLowerCase();
      if (value1 < value2) {
        return -1;
      } else if (value1 > value2) {
        return 1;
      } else {
        return 0;
      }
    });
    
    // Inverte a ordem de classificação se a coluna já estiver classificada
    if (event.target.classList.contains("asc")) {
      rowsArray.reverse();
      event.target.classList.remove("asc");
      event.target.classList.add("desc");
    } else {
      event.target.classList.remove("desc");
      event.target.classList.add("asc");
    }
    
    // Adiciona as linhas ordenadas de volta à tabela
    var tableBody = document.querySelector("#ranking-table tbody");
    tableBody.innerHTML = "";
    for (var i = 0; i < rowsArray.length; i++) {
      tableBody.appendChild(rowsArray[i]);
    }
  }
});
