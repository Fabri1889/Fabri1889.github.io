var getCharactersBtn = document.getElementById('getCharactersBtn');
var filterBtn = document.getElementById('filterBtn');
var charactersTable = document.getElementById('charactersTable');
var charactersBody = document.getElementById('charactersBody');
var nameInput = document.getElementById('nameInput');
var statusInput = document.getElementById('statusInput');
var speciesInput = document.getElementById('speciesInput');
var typeInput = document.getElementById('typeInput');
var genderInput = document.getElementById('genderInput');
var errorDiv = document.getElementById('error');
var clearBtn = document.getElementById('clearBtn');

function createCharacterRow(character) {
  var row = document.createElement('tr');
  row.innerHTML = '<td>' + character.name + '</td>' +
                  '<td>' + character.status + '</td>' +
                  '<td>' + character.species + '</td>' +
                  '<td>' + character.type + '</td>' +
                  '<td>' + character.gender + '</td>';
  return row;
}

function clearTable() {
  charactersBody.innerHTML = '';
}

function handleError(error) {
  errorDiv.textContent = 'Error al obtener los personajes';
}

function getCharacters() {
  clearTable();
  errorDiv.textContent = '';

  fetch('https://rickandmortyapi.com/api/character')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.results.forEach(function(character) {
        charactersBody.appendChild(createCharacterRow(character));
      });
    })
    .catch(function(error) {
      handleError(error);
    });
}

function filterCharacters() {
  clearTable();
  errorDiv.textContent = '';

  var name = nameInput.value.trim();
  var status = statusInput.value.trim();
  var species = speciesInput.value.trim();
  var type = typeInput.value.trim();
  var gender = genderInput.value.trim();

  var url = 'https://rickandmortyapi.com/api/character/?';

  if (name !== '') url += 'name=' + name + '&';
  if (status !== '') url += 'status=' + status + '&';
  if (species !== '') url += 'species=' + species + '&';
  if (type !== '') url += 'type=' + type + '&';
  if (gender !== '') url += 'gender=' + gender + '&';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      data.results.forEach(function(character) {
        charactersBody.appendChild(createCharacterRow(character));
      });
    })
    .catch(function(error) {
      handleError(error);
    });
}

clearBtn.addEventListener('click', function() {
  location.reload();
});


getCharactersBtn.addEventListener('click', getCharacters);
filterBtn.addEventListener('click', filterCharacters);
